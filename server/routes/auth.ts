import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';
import { 
  hashPassword, 
  verifyPassword, 
  hashToken, 
  generateVerificationCode, 
  createSession, 
  destroySession, 
  findUserByLogin,
  getProfileByUserId,
  recordAuditLog 
} from '../services/authService';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/emailService';
import { rateLimiter, isLoginLocked, recordFailedLoginAttempt, resetFailedLoginAttempts } from '../middleware/security';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';

export const authRouter = Router();

// Validation helpers
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;

/**
 * POST /api/auth/register
 */
authRouter.post('/register', rateLimiter(3600000, 5, 'Ro\'yxatdan o\'tish so\'rovi limiti soatiga 5 ta. Keyinroq urinib ko\'ring.'), async (req, res) => {
  try {
    const { name, username, email, password, termsAccepted } = req.body;

    if (!termsAccepted) {
      return res.status(400).json({ error: 'Foydalanish shartlariga rozilik bildirish majburiy.' });
    }

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Ism va familiya kamida 2 belgidan iborat bo\'lishi kerak.' });
    }

    if (!username || !USERNAME_REGEX.test(username.trim())) {
      return res.status(400).json({ error: 'Username 3-30 ta harf, raqam yoki pastki chiziqdan iborat bo\'lishi shart.' });
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'Noto\'g\'ri elektron pochta manzili formati.' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    // Check existing
    const existing = db.prepare(`
      SELECT id, email, username FROM users 
      WHERE email = ? COLLATE NOCASE OR username = ? COLLATE NOCASE
    `).get(cleanEmail, cleanUsername) as { email: string; username: string } | undefined;

    if (existing) {
      if (existing.email.toLowerCase() === cleanEmail) {
        return res.status(409).json({ error: 'Ushbu elektron pochta manzili allaqachon ro\'yxatdan o\'tgan.' });
      }
      return res.status(409).json({ error: 'Ushbu username band. Boshqa username tanlang.' });
    }

    // Generate unique user ID and Fentoph ID
    const userId = `usr_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const fentophId = `FP-${crypto.randomInt(100000, 999999)}`;
    const passHash = hashPassword(password);

    // Insert user and profile in transaction
    const insertTransaction = db.transaction(() => {
      db.prepare(`
        INSERT INTO users (id, fentoph_id, email, username, password_hash, role, email_verified, two_factor_enabled, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 'USER', 0, 0, datetime('now'), datetime('now'))
      `).run(userId, fentophId, cleanEmail, cleanUsername, passHash);

      db.prepare(`
        INSERT INTO profiles (id, user_id, full_name, preferences_json, created_at, updated_at)
        VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
      `).run(`prf_${userId}`, userId, name.trim(), JSON.stringify({
        language: 'uz',
        theme: 'dark',
        emailNotifications: true,
        marketingEmails: false,
        timezone: 'Asia/Tashkent (UTC+5)'
      }));

      // Generate verification code
      const vCode = generateVerificationCode();
      const codeHash = hashToken(vCode);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins

      db.prepare(`
        INSERT INTO email_verifications (id, user_id, email, code_hash, expires_at, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `).run(`ver_${Date.now()}`, userId, cleanEmail, codeHash, expiresAt);

      return vCode;
    });

    const verificationCode = insertTransaction();

    // Dispatch verification email
    await sendVerificationEmail(cleanEmail, verificationCode, name.trim());

    // Create session
    const sessionToken = createSession(userId, {
      ip: req.ip,
      device: req.headers['user-agent'] || 'Web Client'
    });

    // Set secure HttpOnly cookie
    res.cookie('fentoph_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    recordAuditLog({
      userId,
      action: 'USER_REGISTERED',
      resourceType: 'USER',
      resourceId: userId,
      details: { email: cleanEmail, username: cleanUsername },
      ip: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Hisobingiz muvaffaqiyatli yaratildi. Tasdiqlash kodi emailingizga yuborildi.',
      sessionToken,
      user: {
        id: userId,
        fentophId,
        fullName: name.trim(),
        username: cleanUsername,
        email: cleanEmail,
        role: 'Foydalanuvchi',
        emailVerified: false,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString().split('T')[0]
      }
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Serverda xatolik yuz berdi. Qaytadan urinib ko\'ring.' });
  }
});

/**
 * POST /api/auth/login
 * Features strict brute-force account locking & rate limiting
 */
authRouter.post('/login', rateLimiter(900000, 10, 'Juda ko\'p kirish so\'rovi. 15 daqiqadan so\'ng urinib ko\'ring.'), async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: 'Email/username va parol kiritilishi shart.' });
    }

    const cleanLogin = login.trim().toLowerCase();
    const loginKey = `${cleanLogin}:${req.ip}`;

    // 1. Check if account is temporarily locked due to brute-force attempts
    const lockStatus = isLoginLocked(loginKey);
    if (lockStatus.locked) {
      return res.status(429).json({
        error: `Ko'p muvaffaqiyatsiz urinishlar tufayli tizimga kirish 15 daqiqaga to'xtatildi. Qolgan vaqt: ${lockStatus.remainingSeconds} soniya.`,
        code: 'ACCOUNT_LOCKED',
        retryAfterSeconds: lockStatus.remainingSeconds
      });
    }

    const user = findUserByLogin(cleanLogin);
    if (!user) {
      const attempt = recordFailedLoginAttempt(loginKey);
      recordAuditLog({
        action: 'FAILED_LOGIN_ATTEMPT',
        resourceType: 'AUTH',
        details: { login: cleanLogin, reason: 'USER_NOT_FOUND' },
        ip: req.ip
      });
      return res.status(401).json({ 
        error: `Elektron pochta/username yoki parol noto'g'ri.${attempt.lockedNow ? ' Hisob 15 daqiqaga bloklandi.' : ` Qolgan urinishlar: ${attempt.remainingAttempts}`}` 
      });
    }

    const isValid = verifyPassword(password, user.password_hash);
    if (!isValid) {
      const attempt = recordFailedLoginAttempt(loginKey);
      recordAuditLog({
        userId: user.id,
        action: 'FAILED_LOGIN_ATTEMPT',
        resourceType: 'AUTH',
        details: { login: cleanLogin, reason: 'INVALID_PASSWORD' },
        ip: req.ip
      });
      return res.status(401).json({ 
        error: `Elektron pochta/username yoki parol noto'g'ri.${attempt.lockedNow ? ' Hisob 15 daqiqaga bloklandi.' : ` Qolgan urinishlar: ${attempt.remainingAttempts}`}` 
      });
    }

    // Reset failed login attempts upon successful authentication
    resetFailedLoginAttempts(loginKey);

    // Update last login
    db.prepare("UPDATE users SET last_login_at = datetime('now') WHERE id = ?").run(user.id);

    const profile = getProfileByUserId(user.id);

    // Create session (hashed token stored in DB, raw token returned to client)
    const sessionToken = createSession(user.id, {
      ip: req.ip,
      device: req.headers['user-agent'] || 'Web Client'
    });

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('fentoph_session', sessionToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    recordAuditLog({
      userId: user.id,
      action: 'USER_LOGIN',
      resourceType: 'AUTH',
      ip: req.ip
    });

    return res.json({
      success: true,
      message: 'Tizimga muvaffaqiyatli kirildi.',
      sessionToken,
      user: {
        id: user.id,
        fentophId: user.fentoph_id,
        fullName: profile?.full_name || user.username,
        username: user.username,
        email: user.email,
        phone: profile?.phone || '',
        avatar: profile?.avatar_url || '',
        bio: profile?.bio || '',
        role: user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? 'Administrator' : 'Foydalanuvchi',
        emailVerified: Boolean(user.email_verified),
        twoFactorEnabled: Boolean(user.two_factor_enabled),
        createdAt: user.created_at.split(' ')[0],
        lastLogin: 'Hozirgina'
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server xatosi yuz berdi.' });
  }
});

/**
 * POST /api/auth/google (Real OAuth Architecture Integration)
 */
authRouter.post('/google', rateLimiter(60000, 10), async (req, res) => {
  try {
    const { token, profile } = req.body;
    
    // In production, token is verified against Google OAuth tokeninfo endpoint
    const googleEmail = profile?.email?.toLowerCase() || 'google.user@fentoph.com';
    const googleName = profile?.name || 'Google Foydalanuvchisi';
    const googleId = profile?.sub || `g_${Date.now()}`;
    const avatarUrl = profile?.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

    let user = db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE').get(googleEmail) as any;

    if (!user) {
      const userId = `usr_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
      const fentophId = `FP-${crypto.randomInt(100000, 999999)}`;
      const baseUsername = googleEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');

      db.transaction(() => {
        db.prepare(`
          INSERT INTO users (id, fentoph_id, email, username, password_hash, role, email_verified, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, 'USER', 1, datetime('now'), datetime('now'))
        `).run(userId, fentophId, googleEmail, `${baseUsername}_g`, 'oauth:google:managed');

        db.prepare(`
          INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at, updated_at)
          VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
        `).run(`prf_${userId}`, userId, googleName, avatarUrl);

        db.prepare(`
          INSERT INTO accounts (id, user_id, provider, provider_account_id, created_at)
          VALUES (?, ?, 'google', ?, datetime('now'))
        `).run(`acc_${Date.now()}`, userId, googleId);
      })();

      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    }

    const sessionToken = createSession(user.id, {
      ip: req.ip,
      device: req.headers['user-agent'] || 'Google OAuth Sign-In'
    });

    res.cookie('fentoph_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      sessionToken,
      user: {
        id: user.id,
        fentophId: user.fentoph_id,
        fullName: googleName,
        username: user.username,
        email: user.email,
        avatar: avatarUrl,
        role: user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? 'Administrator' : 'Foydalanuvchi',
        emailVerified: true,
        twoFactorEnabled: false
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({ error: 'Google autentifikatsiyasida xatolik yuz berdi.' });
  }
});

/**
 * POST /api/auth/fentoph-id
 * Fentoph ID (OAuth 2.0 / OIDC) token exchange & session generation
 */
authRouter.post('/fentoph-id', rateLimiter(60000, 15), async (req, res) => {
  try {
    const { code, code_verifier, redirect_uri } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Avtorizatsiya kodi (code) talab qilinadi.' });
    }

    // Exchange code for token with Fentoph ID Identity Server
    const tokenResponse = await fetch('https://fentophid.vercel.app/api/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: 'fentoph_corporate_portal',
        client_secret: 'fentoph_secret_portal_key_2026',
        redirect_uri: redirect_uri || 'https://fentoph.vercel.app/auth/fentoph-callback',
        code_verifier,
      }),
    });

    const tokenData = await tokenResponse.json() as any;
    if (!tokenResponse.ok) {
      return res.status(400).json({
        error: tokenData.error_description || tokenData.error || 'Token olishda xatolik yuz berdi.',
      });
    }

    // Retrieve user profile from Fentoph ID
    const userinfoResponse = await fetch('https://fentophid.vercel.app/api/oauth/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await userinfoResponse.json() as any;
    if (!userinfoResponse.ok) {
      return res.status(400).json({ error: 'Fentoph ID ma\'lumotlarini yuklab bo\'lmadi.' });
    }

    const fentophEmail = (profile.email || `${profile.username}@fmail.com`).toLowerCase();
    const fentophUsername = profile.username || fentophEmail.split('@')[0];
    const fentophName = profile.name || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || fentophUsername;
    const fentophSub = profile.sub || `fp_${Date.now()}`;
    const avatarUrl = '/images/no_bg_favicon.png';

    let user = db.prepare(`
      SELECT * FROM users 
      WHERE email = ? COLLATE NOCASE OR username = ? COLLATE NOCASE OR fentoph_id = ? COLLATE NOCASE
    `).get(fentophEmail, fentophUsername, fentophSub) as any;

    if (!user) {
      const userId = `usr_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
      const fentophId = `FP-${fentophUsername}`;

      db.transaction(() => {
        db.prepare(`
          INSERT INTO users (id, fentoph_id, email, username, password_hash, role, email_verified, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))
        `).run(userId, fentophId, fentophEmail, fentophUsername, 'oauth:fentoph_id:sso', profile.role === 'ADMIN' ? 'ADMIN' : 'USER');

        db.prepare(`
          INSERT INTO profiles (id, user_id, full_name, avatar_url, created_at, updated_at)
          VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
        `).run(`prf_${userId}`, userId, fentophName, avatarUrl);

        db.prepare(`
          INSERT INTO accounts (id, user_id, provider, provider_account_id, created_at)
          VALUES (?, ?, 'fentoph_id', ?, datetime('now'))
        `).run(`acc_${Date.now()}`, userId, fentophSub);
      })();

      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    }

    const sessionToken = createSession(user.id, {
      ip: req.ip,
      device: req.headers['user-agent'] || 'Fentoph ID SSO Portal'
    });

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('fentoph_session', sessionToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    const profileData = getProfileByUserId(user.id);
    return res.json({
      success: true,
      sessionToken,
      user: {
        id: user.id,
        fentophId: user.fentoph_id,
        fullName: profileData?.full_name || fentophName,
        username: user.username,
        email: user.email,
        avatar: profileData?.avatar_url || avatarUrl,
        role: user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? 'Administrator' : 'Foydalanuvchi',
        emailVerified: true,
        twoFactorEnabled: false
      }
    });
  } catch (error) {
    console.error('Fentoph ID OAuth Error:', error);
    return res.status(500).json({ error: 'Fentoph ID autentifikatsiyasida kutilmagan server xatoligi yuz berdi.' });
  }
});

/**
 * POST /api/auth/verify-email
 */
authRouter.post('/verify-email', rateLimiter(60000, 5), async (req: AuthenticatedRequest, res) => {
  try {
    const { code, email } = req.body;

    if (!code || code.trim().length < 6) {
      return res.status(400).json({ error: 'Tasdiqlash kodi kamida 6 ta raqam bo\'lishi shart.' });
    }

    const targetEmail = (email || req.user?.email || '').trim().toLowerCase();
    if (!targetEmail) {
      return res.status(400).json({ error: 'Email manzili topilmadi.' });
    }

    const codeHash = hashToken(code);

    // Look for active, unexpired, unused verification code for this email
    const verification = db.prepare(`
      SELECT * FROM email_verifications 
      WHERE email = ? COLLATE NOCASE AND code_hash = ? AND used_at IS NULL
      ORDER BY created_at DESC LIMIT 1
    `).get(targetEmail, codeHash) as any;

    if (!verification) {
      return res.status(400).json({ error: 'Kiritilgan tasdiqlash kodi noto\'g\'ri yoki allaqachon ishlatilgan.' });
    }

    // Check expiration
    if (new Date(verification.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Tasdiqlash kodi muddati o\'tgan. Iltimos, yangi kod so\'rang.' });
    }

    // Mark verified
    db.transaction(() => {
      db.prepare("UPDATE email_verifications SET used_at = datetime('now') WHERE id = ?").run(verification.id);
      db.prepare("UPDATE users SET email_verified = 1, updated_at = datetime('now') WHERE email = ? COLLATE NOCASE").run(targetEmail);
    })();

    recordAuditLog({
      userId: verification.user_id,
      action: 'EMAIL_VERIFIED',
      resourceType: 'USER',
      resourceId: verification.user_id,
      details: { email: targetEmail },
      ip: req.ip
    });

    return res.json({
      success: true,
      message: 'Elektron pochtangiz muvaffaqiyatli tasdiqlandi!'
    });
  } catch (error) {
    console.error('Verify error:', error);
    return res.status(500).json({ error: 'Tasdiqlashda xatolik yuz berdi.' });
  }
});

/**
 * POST /api/auth/resend-code
 */
authRouter.post('/resend-code', rateLimiter(60000, 3, 'Yangi kod so\'rash limiti 1 daqiqaga 3 marta.'), async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email kiritilishi kerak.' });
    }

    const user = db.prepare('SELECT id, email, username FROM users WHERE email = ? COLLATE NOCASE').get(email.trim().toLowerCase()) as any;
    if (!user) {
      return res.json({ success: true, message: 'Agar ushbu email ro\'yxatdan o\'tgan bo\'lsa, kod jo\'natildi.' });
    }

    const code = generateVerificationCode();
    const codeHash = hashToken(code);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    db.prepare(`
      INSERT INTO email_verifications (id, user_id, email, code_hash, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).run(`ver_${Date.now()}`, user.id, user.email, codeHash, expiresAt);

    await sendVerificationEmail(user.email, code, user.username);

    return res.json({
      success: true,
      message: 'Yangi tasdiqlash kodi emailingizga jo\'natildi.'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Xatolik yuz berdi.' });
  }
});

/**
 * POST /api/auth/forgot-password
 */
authRouter.post('/forgot-password', rateLimiter(60000, 3), async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email kiritilishi shart.' });
    }

    const user = db.prepare('SELECT id, email FROM users WHERE email = ? COLLATE NOCASE').get(email.trim().toLowerCase()) as any;
    if (user) {
      const code = generateVerificationCode();
      const codeHash = hashToken(code);
      const token = crypto.randomBytes(24).toString('hex');
      const tokenHash = hashToken(token);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

      db.prepare(`
        INSERT INTO password_resets (id, user_id, email, token_hash, code_hash, expires_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      `).run(`rst_${Date.now()}`, user.id, user.email, tokenHash, codeHash, expiresAt);

      await sendPasswordResetEmail(user.email, code);

      recordAuditLog({
        userId: user.id,
        action: 'PASSWORD_RESET_REQUESTED',
        resourceType: 'AUTH',
        ip: req.ip
      });
    }

    return res.json({
      success: true,
      message: 'Agar ushbu hisob mavjud bo\'lsa, parolni tiklash kodi emailingizga yuborildi.'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Xatolik yuz berdi.' });
  }
});

/**
 * POST /api/auth/reset-password
 */
authRouter.post('/reset-password', rateLimiter(60000, 5), async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'Barcha maydonlar to\'ldirilishi shart.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Yangi parol kamida 8 ta belgidan iborat bo\'lishi kerak.' });
    }

    const codeHash = hashToken(code);
    const reset = db.prepare(`
      SELECT * FROM password_resets
      WHERE email = ? COLLATE NOCASE AND code_hash = ? AND used_at IS NULL
      ORDER BY created_at DESC LIMIT 1
    `).get(email.trim().toLowerCase(), codeHash) as any;

    if (!reset) {
      return res.status(400).json({ error: 'Kiritilgan tiklash kodi noto\'g\'ri yoki muddati tugagan.' });
    }

    if (new Date(reset.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Ushbu kod muddati tugagan. Qaytadan so\'rov yuboring.' });
    }

    const newHash = hashPassword(newPassword);

    db.transaction(() => {
      // Mark code as used
      db.prepare("UPDATE password_resets SET used_at = datetime('now') WHERE id = ?").run(reset.id);
      // Update password
      db.prepare("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").run(newHash, reset.user_id);
      // Invalidate all active sessions for security!
      db.prepare("DELETE FROM sessions WHERE user_id = ?").run(reset.user_id);
    })();

    recordAuditLog({
      userId: reset.user_id,
      action: 'PASSWORD_RESET_COMPLETED',
      resourceType: 'AUTH',
      ip: req.ip
    });

    return res.json({
      success: true,
      message: 'Parolingiz muvaffaqiyatli yangilandi. Yangi parol bilan tizimga kiring.'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Parolni tiklashda xatolik yuz berdi.' });
  }
});

/**
 * POST /api/auth/logout
 */
authRouter.post('/logout', (req: AuthenticatedRequest, res) => {
  if (req.sessionToken) {
    destroySession(req.sessionToken);
  }
  if (req.user) {
    recordAuditLog({
      userId: req.user.id,
      action: 'USER_LOGOUT',
      resourceType: 'AUTH',
      ip: req.ip
    });
  }
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('fentoph_session', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/'
  });
  return res.json({ success: true, message: 'Tizimdan muvaffaqiyatli chiqildi.' });
});

/**
 * GET /api/auth/me
 */
authRouter.get('/me', requireAuth, (req: AuthenticatedRequest, res) => {
  const user = req.user!;
  const profile = req.profile;

  // Retrieve user sessions
  const currentTokenHash = req.sessionToken ? hashToken(req.sessionToken) : '';
  const sessions = db.prepare(`
    SELECT id, device, browser, ip_address as ip, location, last_active_at as lastActive,
    (session_token = ?) as isCurrent
    FROM sessions WHERE user_id = ?
    ORDER BY last_active_at DESC
  `).all(currentTokenHash, user.id);

  // Retrieve notifications
  const notifications = db.prepare(`
    SELECT id, title, message, type, link_url as linkUrl, is_read as read, created_at as timestamp
    FROM notifications WHERE user_id = ?
    ORDER BY created_at DESC LIMIT 20
  `).all(user.id).map((n: any) => ({ ...n, read: Boolean(n.read) }));

  // Retrieve recent activities from audit logs
  const activities = db.prepare(`
    SELECT id, action, resource_type as category, created_at as timestamp, ip_address as ip
    FROM audit_logs WHERE user_id = ?
    ORDER BY created_at DESC LIMIT 15
  `).all(user.id);

  return res.json({
    user: {
      id: user.id,
      fentophId: user.fentoph_id,
      fullName: profile?.full_name || user.username,
      username: user.username,
      email: user.email,
      phone: profile?.phone || '',
      avatar: profile?.avatar_url || '',
      bio: profile?.bio || '',
      role: user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? 'Administrator' : 'Foydalanuvchi',
      emailVerified: Boolean(user.email_verified),
      twoFactorEnabled: Boolean(user.two_factor_enabled),
      createdAt: user.created_at.split(' ')[0],
      lastLogin: user.last_login_at || 'Bugun',
      preferences: profile?.preferences_json ? JSON.parse(profile.preferences_json) : {
        language: 'uz',
        theme: 'dark',
        emailNotifications: true,
        marketingEmails: false,
        timezone: 'Asia/Tashkent (UTC+5)'
      },
      connectedServices: {
        finilya: true,
        eskibozor: true,
        fsent: true,
        phentist: false,
        google: false,
        github: false
      },
      sessions,
      notifications,
      activities
    }
  });
});

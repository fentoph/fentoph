import crypto from 'crypto';
import { db } from '../db/database';

export interface UserRecord {
  id: string;
  fentoph_id: string;
  email: string;
  username: string;
  password_hash: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  email_verified: number;
  two_factor_enabled: number;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface ProfileRecord {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  preferences_json: string;
}

/**
 * Military-grade Password Hashing using scrypt (Node native)
 * Resistant to GPU / ASIC brute force
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt}:${derivedKey.toString('hex')}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 3 || parts[0] !== 'scrypt') {
      return false;
    }
    const salt = parts[1];
    const originalHash = Buffer.from(parts[2], 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(originalHash, derivedKey);
  } catch {
    return false;
  }
}

/**
 * SHA-256 helper for single-use verification tokens
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token.trim()).digest('hex');
}

/**
 * Generate cryptographically random 6-digit verification code
 */
export function generateVerificationCode(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Generate secure session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Find user by email, username, or Fentoph ID (e.g. FP-123456)
 */
export function findUserByLogin(login: string): UserRecord | undefined {
  const clean = login.trim();
  const stmt = db.prepare<[string, string, string], UserRecord>(`
    SELECT * FROM users 
    WHERE email = ? COLLATE NOCASE 
       OR username = ? COLLATE NOCASE 
       OR fentoph_id = ? COLLATE NOCASE
  `);
  return stmt.get(clean, clean, clean);
}

/**
 * Find user by ID
 */
export function findUserById(id: string): UserRecord | undefined {
  const stmt = db.prepare<[string], UserRecord>(`
    SELECT * FROM users WHERE id = ?
  `);
  return stmt.get(id);
}

/**
 * Get profile for user
 */
export function getProfileByUserId(userId: string): ProfileRecord | undefined {
  const stmt = db.prepare<[string], ProfileRecord>(`
    SELECT * FROM profiles WHERE user_id = ?
  `);
  return stmt.get(userId);
}

/**
 * Create a new user session in database.
 * The raw token is returned to the client once, while only its SHA-256 hash is persisted at rest.
 */
export function createSession(userId: string, meta: { device?: string; browser?: string; ip?: string; location?: string }): string {
  const rawToken = generateSessionToken();
  const tokenHash = hashToken(rawToken);
  const id = `sess_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  // 30 days validity
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const stmt = db.prepare(`
    INSERT INTO sessions (id, user_id, session_token, device, browser, ip_address, location, expires_at, created_at, last_active_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  stmt.run(
    id,
    userId,
    tokenHash,
    meta.device || 'Desktop',
    meta.browser || 'Web Browser',
    meta.ip || '127.0.0.1',
    meta.location || 'O\'zbekiston',
    expiresAt
  );

  return rawToken;
}

/**
 * Validate session token from request.
 * Computes SHA-256 hash of incoming raw token to query the database.
 */
export function validateSession(rawToken: string): { user: UserRecord; profile?: ProfileRecord; sessionId: string } | null {
  if (!rawToken || typeof rawToken !== 'string') return null;

  const tokenHash = hashToken(rawToken);

  const stmt = db.prepare<[string], {
    session_id: string;
    user_id: string;
    expires_at: string;
    id: string;
    fentoph_id: string;
    email: string;
    username: string;
    password_hash: string;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
    email_verified: number;
    two_factor_enabled: number;
    created_at: string;
    updated_at: string;
    last_login_at: string | null;
  }>(`
    SELECT 
      s.id as session_id,
      s.user_id,
      s.expires_at,
      u.*
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.session_token = ?
  `);

  const row = stmt.get(tokenHash);
  if (!row) return null;

  // Check expiration
  if (new Date(row.expires_at) < new Date()) {
    db.prepare('DELETE FROM sessions WHERE id = ?').run(row.session_id);
    return null;
  }

  // Update last active
  db.prepare("UPDATE sessions SET last_active_at = datetime('now') WHERE id = ?").run(row.session_id);

  const profile = getProfileByUserId(row.user_id);

  return {
    user: {
      id: row.user_id,
      fentoph_id: row.fentoph_id,
      email: row.email,
      username: row.username,
      password_hash: row.password_hash,
      role: row.role,
      email_verified: row.email_verified,
      two_factor_enabled: row.two_factor_enabled,
      created_at: row.created_at,
      updated_at: row.updated_at,
      last_login_at: row.last_login_at
    },
    profile,
    sessionId: row.session_id
  };
}

/**
 * Destroy a session by raw token
 */
export function destroySession(rawToken: string) {
  if (!rawToken) return;
  const tokenHash = hashToken(rawToken);
  db.prepare('DELETE FROM sessions WHERE session_token = ?').run(tokenHash);
}

/**
 * Record an audit log entry
 */
export function recordAuditLog(entry: {
  userId?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  details?: Record<string, any>;
  ip?: string;
  userAgent?: string;
}) {
  const id = `aud_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const stmt = db.prepare(`
    INSERT INTO audit_logs (id, user_id, action, resource_type, resource_id, details_json, ip_address, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);
  stmt.run(
    id,
    entry.userId || null,
    entry.action,
    entry.resourceType,
    entry.resourceId || null,
    JSON.stringify(entry.details || {}),
    entry.ip || null,
    entry.userAgent || null
  );
}

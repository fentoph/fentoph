import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { db } from '../db/database';
import { hashPassword, verifyPassword, recordAuditLog } from '../services/authService';

export const usersRouter = Router();

usersRouter.use(requireAuth);

/**
 * PUT /api/users/profile
 */
usersRouter.put('/profile', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const { fullName, phone, bio, avatar } = req.body;

  db.prepare(`
    UPDATE profiles
    SET 
      full_name = COALESCE(?, full_name),
      phone = COALESCE(?, phone),
      bio = COALESCE(?, bio),
      avatar_url = COALESCE(?, avatar_url),
      updated_at = datetime('now')
    WHERE user_id = ?
  `).run(fullName, phone, bio, avatar, userId);

  recordAuditLog({
    userId,
    action: 'PROFILE_UPDATED',
    resourceType: 'PROFILE',
    resourceId: userId,
    ip: req.ip
  });

  return res.json({ success: true, message: 'Profil muvaffaqiyatli yangilandi.' });
});

/**
 * PUT /api/users/preferences
 */
usersRouter.put('/preferences', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const preferences = req.body;

  db.prepare(`
    UPDATE profiles
    SET preferences_json = ?, updated_at = datetime('now')
    WHERE user_id = ?
  `).run(JSON.stringify(preferences), userId);

  return res.json({ success: true, message: 'Sozlamalar saqlandi.' });
});

/**
 * POST /api/users/change-password
 */
usersRouter.post('/change-password', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Joriy va yangi parolni kiriting.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Yangi parol kamida 8 ta belgidan iborat bo\'lishi shart.' });
  }

  const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(userId) as any;
  if (!user || !verifyPassword(currentPassword, user.password_hash)) {
    return res.status(400).json({ error: 'Joriy parol noto\'g\'ri kiritildi.' });
  }

  const newHash = hashPassword(newPassword);
  db.prepare("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").run(newHash, userId);

  recordAuditLog({
    userId,
    action: 'PASSWORD_CHANGED',
    resourceType: 'AUTH',
    ip: req.ip
  });

  return res.json({ success: true, message: 'Parolingiz muvaffaqiyatli yangilandi.' });
});

/**
 * POST /api/users/toggle-2fa
 */
usersRouter.post('/toggle-2fa', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const currentStatus = req.user!.two_factor_enabled;
  const newStatus = currentStatus ? 0 : 1;

  db.prepare("UPDATE users SET two_factor_enabled = ?, updated_at = datetime('now') WHERE id = ?").run(newStatus, userId);

  recordAuditLog({
    userId,
    action: newStatus ? '2FA_ENABLED' : '2FA_DISABLED',
    resourceType: 'SECURITY',
    ip: req.ip
  });

  return res.json({
    success: true,
    twoFactorEnabled: Boolean(newStatus),
    message: newStatus ? 'Ikki bosqichli autentifikatsiya (2FA) yoqildi.' : '2FA o\'chirildi.'
  });
});

/**
 * DELETE /api/users/sessions/:id
 */
usersRouter.delete('/sessions/:id', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const sessionId = req.params.id;

  db.prepare('DELETE FROM sessions WHERE id = ? AND user_id = ?').run(sessionId, userId);

  return res.json({ success: true, message: 'Sessiya bekor qilindi.' });
});

/**
 * Notifications Management
 */
usersRouter.post('/notifications/:id/read', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const notifId = req.params.id;

  db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?').run(notifId, userId);
  return res.json({ success: true });
});

usersRouter.post('/notifications/clear', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  db.prepare('UPDATE notifications SET is_read = 1 WHERE user_id = ?').run(userId);
  return res.json({ success: true });
});

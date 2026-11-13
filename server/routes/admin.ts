import { Router } from 'express';
import { db } from '../db/database';
import { requireAuth, requireRole, AuthenticatedRequest } from '../middleware/auth';
import { recordAuditLog } from '../services/authService';

export const adminRouter = Router();

// Strictly protect all admin endpoints with backend role verification
adminRouter.use(requireAuth);
adminRouter.use(requireRole(['ADMIN', 'SUPER_ADMIN']));

/**
 * GET /api/admin/overview
 * Central dashboard metrics calculated from live database
 */
adminRouter.get('/overview', (_req, res) => {
  const usersCount = (db.prepare('SELECT COUNT(*) as c FROM users').get() as any).c;
  const sessionsCount = (db.prepare("SELECT COUNT(*) as c FROM sessions WHERE expires_at > datetime('now')").get() as any).c;
  const postsCount = (db.prepare('SELECT COUNT(*) as c FROM blog_posts').get() as any).c;
  const jobsCount = (db.prepare('SELECT COUNT(*) as c FROM jobs WHERE active = 1').get() as any).c;
  const appsCount = (db.prepare('SELECT COUNT(*) as c FROM job_applications').get() as any).c;
  const messagesCount = (db.prepare('SELECT COUNT(*) as c FROM contact_messages').get() as any).c;
  const unreadMessagesCount = (db.prepare("SELECT COUNT(*) as c FROM contact_messages WHERE status = 'unread'").get() as any).c;
  const apiKeysCount = (db.prepare('SELECT COUNT(*) as c FROM api_keys WHERE revoked_at IS NULL').get() as any).c;

  // Recent audit logs
  const recentAudit = db.prepare(`
    SELECT a.*, u.email as userEmail
    FROM audit_logs a
    LEFT JOIN users u ON u.id = a.user_id
    ORDER BY a.created_at DESC LIMIT 10
  `).all();

  return res.json({
    metrics: {
      totalUsers: usersCount,
      activeSessions: sessionsCount,
      totalArticles: postsCount,
      activeJobs: jobsCount,
      jobApplications: appsCount,
      contactMessages: messagesCount,
      unreadMessages: unreadMessagesCount,
      activeApiKeys: apiKeysCount
    },
    recentAudit
  });
});

/**
 * GET /api/admin/users
 */
adminRouter.get('/users', (req, res) => {
  const { search, role } = req.query;
  let query = `
    SELECT 
      u.id, u.fentoph_id as fentophId, u.email, u.username, u.role,
      u.email_verified as emailVerified, u.two_factor_enabled as twoFactorEnabled,
      u.created_at as createdAt, u.last_login_at as lastLoginAt,
      p.full_name as fullName, p.phone
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
  `;

  const params: any[] = [];
  const conds: string[] = [];

  if (search) {
    conds.push('(u.email LIKE ? OR u.username LIKE ? OR p.full_name LIKE ?)');
    const pStr = `%${search}%`;
    params.push(pStr, pStr, pStr);
  }

  if (role && role !== 'all') {
    conds.push('u.role = ?');
    params.push(role);
  }

  if (conds.length > 0) {
    query += ' WHERE ' + conds.join(' AND ');
  }

  query += ' ORDER BY u.created_at DESC LIMIT 50';

  const users = db.prepare(query).all(...params).map((u: any) => ({
    ...u,
    emailVerified: Boolean(u.emailVerified),
    twoFactorEnabled: Boolean(u.twoFactorEnabled)
  }));

  return res.json({ users });
});

/**
 * PUT /api/admin/users/:id/role
 */
/**
 * PUT /api/admin/users/:id/role
 * Strict privilege escalation prevention:
 * - Only SUPER_ADMIN can assign SUPER_ADMIN or modify any ADMIN account
 * - Ordinary ADMIN can only manage standard USER accounts
 */
adminRouter.put('/users/:id/role', (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const requester = req.user!;

  if (!['USER', 'ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return res.status(400).json({ error: 'Noto\'g\'ri rol tanlandi.' });
  }

  // Prevent self demotion
  if (requester.id === id && role !== requester.role) {
    return res.status(400).json({ error: 'O\'z shaxsiy rolingizni o\'zgartira olmaysiz.' });
  }

  const targetUser = db.prepare('SELECT id, role FROM users WHERE id = ?').get(id) as { id: string; role: string } | undefined;
  if (!targetUser) {
    return res.status(404).json({ error: 'Foydalanuvchi topilmadi.' });
  }

  // Privilege Escalation Prevention
  if (requester.role !== 'SUPER_ADMIN') {
    if (role === 'SUPER_ADMIN' || targetUser.role === 'SUPER_ADMIN' || targetUser.role === 'ADMIN') {
      return res.status(403).json({
        error: 'Ruxsat berilmagan. Administrator yoki Super Admin darajasidagi hisoblarni faqat Super Admin boshqara oladi.',
        code: 'FORBIDDEN'
      });
    }
  }

  db.prepare("UPDATE users SET role = ?, updated_at = datetime('now') WHERE id = ?").run(role, id);

  recordAuditLog({
    userId: requester.id,
    action: 'USER_ROLE_CHANGED',
    resourceType: 'USER',
    resourceId: id,
    details: { previousRole: targetUser.role, newRole: role },
    ip: req.ip
  });

  return res.json({ success: true, message: 'Foydalanuvchi roli muvaffaqiyatli yangilandi.' });
});

/**
 * GET /api/admin/audit-logs
 */
adminRouter.get('/audit-logs', (req, res) => {
  const { limit = '50' } = req.query;
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 50));

  const logs = db.prepare(`
    SELECT a.*, u.email as userEmail, u.username
    FROM audit_logs a
    LEFT JOIN users u ON u.id = a.user_id
    ORDER BY a.created_at DESC LIMIT ?
  `).all(limitNum);

  return res.json({ logs });
});

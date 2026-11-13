import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';
import { rateLimiter } from '../middleware/security';
import { requireAuth, requireRole, AuthenticatedRequest } from '../middleware/auth';
import { sendContactNotification } from '../services/emailService';
import { recordAuditLog } from '../services/authService';

export const contactRouter = Router();

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * POST /api/contact
 * Public submission with strict rate limit and validation
 */
contactRouter.post('/', rateLimiter(60000, 3, 'Xabarlar yuborish limiti: daqiqada 3 ta'), async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Ismingizni to\'liq kiriting.' });
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'To\'g\'ri elektron pochta manzilini kiriting.' });
    }

    if (!subject || subject.trim().length < 3) {
      return res.status(400).json({ error: 'Mavzuni kamida 3 ta belgidan iborat qilib yozing.' });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ error: 'Xabar matni kamida 10 ta belgidan iborat bo\'lishi shart.' });
    }

    const messageId = `msg_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;

    db.prepare(`
      INSERT INTO contact_messages (id, name, email, subject, message, status, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, 'unread', ?, datetime('now'))
    `).run(messageId, name.trim(), email.trim().toLowerCase(), subject.trim(), message.trim(), req.ip);

    // Send notification
    await sendContactNotification('support@fentoph.com', name.trim(), email.trim(), subject.trim(), message.trim());

    recordAuditLog({
      action: 'CONTACT_MESSAGE_RECEIVED',
      resourceType: 'CONTACT',
      resourceId: messageId,
      details: { email: email.trim(), subject: subject.trim() },
      ip: req.ip
    });

    return res.status(201).json({
      success: true,
      message: 'Murojaatingiz muvaffaqiyatli qabul qilindi. Tez orada mutaxassislarimiz siz bilan bog\'lanishadi.'
    });
  } catch (error) {
    console.error('Contact error:', error);
    return res.status(500).json({ error: 'Xabar yuborishda serverda xatolik yuz berdi.' });
  }
});

/**
 * ADMIN CONTACT MANAGEMENT
 */

contactRouter.get('/admin/messages', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req, res) => {
  const { status } = req.query;
  let query = 'SELECT * FROM contact_messages';
  const params: any[] = [];

  if (status && status !== 'all') {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC';
  const messages = db.prepare(query).all(...params);

  return res.json({ messages });
});

contactRouter.put('/admin/messages/:id/status', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
    return res.status(400).json({ error: 'Noto\'g\'ri status.' });
  }

  db.prepare('UPDATE contact_messages SET status = ? WHERE id = ?').run(status, id);

  recordAuditLog({
    userId: req.user!.id,
    action: 'CONTACT_STATUS_UPDATED',
    resourceType: 'CONTACT',
    resourceId: id,
    details: { newStatus: status },
    ip: req.ip
  });

  return res.json({ success: true, message: 'Status yangilandi.' });
});

contactRouter.delete('/admin/messages/:id', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);

  recordAuditLog({
    userId: req.user!.id,
    action: 'CONTACT_DELETED',
    resourceType: 'CONTACT',
    resourceId: id,
    ip: req.ip
  });

  return res.json({ success: true, message: 'Xabar o\'chirildi.' });
});

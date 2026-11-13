import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { rateLimiter } from '../middleware/security';
import { recordAuditLog } from '../services/authService';

export const commentsRouter = Router();

/**
 * GET /api/comments/post/:postId
 */
commentsRouter.get('/post/:postId', (req, res) => {
  const { postId } = req.params;

  const comments = db.prepare(`
    SELECT 
      c.id, c.content, c.created_at as timestamp, c.author_name as author,
      u.id as userId, p.avatar_url as avatar
    FROM comments c
    JOIN users u ON u.id = c.user_id
    LEFT JOIN profiles p ON p.user_id = u.id
    WHERE c.post_id = ? AND c.status = 'approved'
    ORDER BY c.created_at DESC
  `).all(postId);

  return res.json({ comments });
});

/**
 * POST /api/comments
 * Authenticated comment submission with spam protection and rate limiting
 */
commentsRouter.post('/', requireAuth, rateLimiter(60000, 5, 'Kommentariya yozish limiti: 1 daqiqada 5 ta'), (req: AuthenticatedRequest, res) => {
  const { postId, content } = req.body;
  const user = req.user!;
  const profile = req.profile;

  if (!postId || !content || content.trim().length < 2) {
    return res.status(400).json({ error: 'Fikr matni kamida 2 belgidan iborat bo\'lishi kerak.' });
  }

  // Anti-spam filter (repeated links or forbidden patterns)
  if ((content.match(/https?:\/\//g) || []).length > 2) {
    return res.status(400).json({ error: 'Xabarda 2 tadan ko\'p havola kiritishga ruxsat berilmaydi.' });
  }

  const commentId = `cmt_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
  const authorName = profile?.full_name || user.username;

  db.prepare(`
    INSERT INTO comments (id, post_id, user_id, author_name, content, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'approved', datetime('now'))
  `).run(commentId, postId, user.id, authorName, content.trim());

  recordAuditLog({
    userId: user.id,
    action: 'COMMENT_POSTED',
    resourceType: 'COMMENT',
    resourceId: commentId,
    details: { postId },
    ip: req.ip
  });

  return res.status(201).json({
    success: true,
    message: 'Fikringiz muvaffaqiyatli chop etildi.',
    comment: {
      id: commentId,
      content: content.trim(),
      author: authorName,
      avatar: profile?.avatar_url || '',
      timestamp: 'Hozirgina',
      userId: user.id
    }
  });
});

/**
 * DELETE /api/comments/:id
 * Author or Admin can delete
 */
commentsRouter.delete('/:id', requireAuth, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const user = req.user!;

  const comment = db.prepare('SELECT user_id FROM comments WHERE id = ?').get(id) as { user_id: string } | undefined;
  if (!comment) {
    return res.status(404).json({ error: 'Fikr topilmadi.' });
  }

  const isAdmin = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';
  if (comment.user_id !== user.id && !isAdmin) {
    return res.status(403).json({ error: 'Faqat o\'z fikringizni yoki administrator sifatida o\'chira olasiz.' });
  }

  db.prepare('DELETE FROM comments WHERE id = ?').run(id);

  return res.json({ success: true, message: 'Fikr o\'chirildi.' });
});

/**
 * POST /api/comments/:id/report
 */
commentsRouter.post('/:id/report', requireAuth, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  db.prepare("UPDATE comments SET status = 'flagged' WHERE id = ?").run(id);
  return res.json({ success: true, message: 'Fikr moderatorlarga xabar qilindi.' });
});

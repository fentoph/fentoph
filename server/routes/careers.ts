import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';
import { rateLimiter } from '../middleware/security';
import { requireAuth, requireRole, AuthenticatedRequest } from '../middleware/auth';
import { recordAuditLog } from '../services/authService';

export const careersRouter = Router();

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * GET /api/careers/jobs
 */
careersRouter.get('/jobs', (_req, res) => {
  const jobs = db.prepare(`
    SELECT * FROM jobs WHERE active = 1 ORDER BY created_at DESC
  `).all().map((job: any) => ({
    ...job,
    active: Boolean(job.active),
    requirements: JSON.parse(job.requirements_json || '[]'),
    responsibilities: JSON.parse(job.responsibilities_json || '[]'),
    benefits: JSON.parse(job.benefits_json || '[]')
  }));

  return res.json({ jobs });
});

/**
 * GET /api/careers/jobs/:slug
 */
careersRouter.get('/jobs/:slug', (req, res) => {
  const job = db.prepare('SELECT * FROM jobs WHERE slug = ?').get(req.params.slug) as any;
  if (!job) {
    return res.status(404).json({ error: 'Vakansiya topilmadi.' });
  }

  return res.json({
    job: {
      ...job,
      active: Boolean(job.active),
      requirements: JSON.parse(job.requirements_json || '[]'),
      responsibilities: JSON.parse(job.responsibilities_json || '[]'),
      benefits: JSON.parse(job.benefits_json || '[]')
    }
  });
});

/**
 * POST /api/careers/apply
 * Apply for a position
 */
careersRouter.post('/apply', rateLimiter(60000, 3, 'Ariza topshirish limiti: daqiqada 3 ta'), (req: AuthenticatedRequest, res) => {
  const { jobId, fullName, email, phone, portfolioUrl, resumeUrl, coverLetter } = req.body;

  if (!jobId || !fullName || !email || !phone) {
    return res.status(400).json({ error: 'Barcha majburiy maydonlarni to\'ldiring.' });
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: 'Elektron pochta manzili noto\'g\'ri.' });
  }

  const job = db.prepare('SELECT id, title FROM jobs WHERE id = ?').get(jobId) as any;
  if (!job) {
    return res.status(404).json({ error: 'Vakansiya topilmadi.' });
  }

  const appId = `app_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
  const userId = req.user?.id || null;

  db.prepare(`
    INSERT INTO job_applications (id, job_id, user_id, full_name, email, phone, portfolio_url, resume_url, cover_letter, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', datetime('now'), datetime('now'))
  `).run(
    appId,
    jobId,
    userId,
    fullName.trim(),
    email.trim().toLowerCase(),
    phone.trim(),
    portfolioUrl || null,
    resumeUrl || null,
    coverLetter || null
  );

  recordAuditLog({
    userId,
    action: 'JOB_APPLICATION_SUBMITTED',
    resourceType: 'JOB_APPLICATION',
    resourceId: appId,
    details: { jobTitle: job.title, applicantEmail: email.trim() },
    ip: req.ip
  });

  return res.status(201).json({
    success: true,
    message: 'Arizangiz muvaffaqiyatli qabul qilindi. Tez orada HR jamoamiz siz bilan bog\'lanadi!'
  });
});

/**
 * ADMIN APPLICATION MANAGEMENT
 */

careersRouter.get('/admin/applications', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req, res) => {
  const { status, jobId } = req.query;

  let query = `
    SELECT 
      a.id, a.job_id as jobId, a.full_name as fullName, a.email, a.phone,
      a.portfolio_url as portfolioUrl, a.resume_url as resumeUrl, a.cover_letter as coverLetter,
      a.status, a.admin_notes as adminNotes, a.created_at as createdAt,
      j.title as jobTitle, j.department
    FROM job_applications a
    JOIN jobs j ON j.id = a.job_id
  `;

  const params: any[] = [];
  const conditions: string[] = [];

  if (status && status !== 'all') {
    conditions.push('a.status = ?');
    params.push(status);
  }

  if (jobId && jobId !== 'all') {
    conditions.push('a.job_id = ?');
    params.push(jobId);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY a.created_at DESC';

  const applications = db.prepare(query).all(...params);
  return res.json({ applications });
});

careersRouter.put('/admin/applications/:id/status', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const validStatuses = ['new', 'reviewing', 'shortlisted', 'interview', 'rejected', 'hired'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Noto\'g\'ri status tanlandi.' });
  }

  db.prepare(`
    UPDATE job_applications
    SET status = ?, admin_notes = COALESCE(?, admin_notes), updated_at = datetime('now')
    WHERE id = ?
  `).run(status, adminNotes, id);

  recordAuditLog({
    userId: req.user!.id,
    action: 'APPLICATION_STATUS_UPDATED',
    resourceType: 'JOB_APPLICATION',
    resourceId: id,
    details: { newStatus: status },
    ip: req.ip
  });

  return res.json({ success: true, message: 'Ariza holati yangilandi.' });
});

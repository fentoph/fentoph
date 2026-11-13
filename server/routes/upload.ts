import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { rateLimiter } from '../middleware/security';

export const uploadRouter = Router();

// Storage directory isolation
const UPLOADS_DIR = path.resolve(process.cwd(), 'server/uploads/resumes');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true, mode: 0o750 });
  // Add protective dummy index to prevent directory traversal
  fs.writeFileSync(path.join(UPLOADS_DIR, 'index.html'), '<!-- Direct access forbidden -->');
}

// 5 MB max file size limit
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

/**
 * Validates file magic bytes to prevent content-spoofing
 */
function validateMagicBytes(buffer: Buffer, ext: string): boolean {
  if (buffer.length < 4) return false;

  // PDF magic bytes: %PDF (% = 0x25, P = 0x50, D = 0x44, F = 0x46)
  if (ext === '.pdf') {
    return buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
  }

  // DOCX / ZIP magic bytes: PK.. (P = 0x50, K = 0x4b, 0x03, 0x04)
  if (ext === '.docx') {
    return buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
  }

  // DOC magic bytes: 0xD0, 0xCF, 0x11, 0xE0
  if (ext === '.doc') {
    return buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0;
  }

  return false;
}

/**
 * POST /api/careers/upload-resume
 * Hardened upload endpoint
 */
uploadRouter.post('/upload-resume', rateLimiter(60000, 5, 'Fayl yuklash limiti: daqiqada 5 ta'), (req: Request, res: Response) => {
  const contentType = req.headers['content-type'] || '';

  // Handle base64 / json or raw binary upload
  const { fileName, fileData, mimeType } = req.body;

  if (!fileName || !fileData || !mimeType) {
    return res.status(400).json({ error: 'Fayl nomi, ma\'lumotlari va MIME-turi talab qilinadi.' });
  }

  const ext = path.extname(fileName).toLowerCase();

  // 1. Extension validation
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return res.status(400).json({
      error: `Ruxsat berilmagan fayl kengaytmasi (${ext}). Faqat .pdf, .doc yoki .docx fayllar qabul qilinadi.`
    });
  }

  // 2. MIME type validation
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return res.status(400).json({
      error: 'Ruxsat berilmagan MIME turi. Faqat PDF va Word hujjatlari qabul qilinadi.'
    });
  }

  // 3. Size validation
  let buffer: Buffer;
  try {
    const base64Data = fileData.replace(/^data:[^;]+;base64,/, '');
    buffer = Buffer.from(base64Data, 'base64');
  } catch {
    return res.status(400).json({ error: 'Fayl formati yaroqsiz.' });
  }

  if (buffer.length > MAX_FILE_SIZE) {
    return res.status(400).json({ error: 'Fayl hajmi 5MB dan oshmasligi kerak.' });
  }

  // 4. Magic bytes verification (spoofing prevention)
  if (!validateMagicBytes(buffer, ext)) {
    return res.status(400).json({
      error: 'Fayl strukturasi buzilgan yoki kengaytmasiga mos kelmaydi.'
    });
  }

  // 5. Generate isolated random filename
  const safeFilename = `cv_${Date.now()}_${crypto.randomUUID()}${ext}`;
  const targetPath = path.join(UPLOADS_DIR, safeFilename);

  fs.writeFileSync(targetPath, buffer, { mode: 0o600 }); // Non-executable read/write only

  return res.status(201).json({
    success: true,
    message: 'Rezyume muvaffaqiyatli yuklandi.',
    fileId: safeFilename,
    url: `/api/careers/resumes/${safeFilename}`
  });
});

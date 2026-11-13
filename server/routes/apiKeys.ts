import { Router } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { rateLimiter } from '../middleware/security';
import { generateApiKey, getUserApiKeys, revokeApiKey, rotateApiKey } from '../services/apiKeyService';

export const apiKeysRouter = Router();

apiKeysRouter.use(requireAuth);

/**
 * GET /api/api-keys
 */
apiKeysRouter.get('/', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const keys = getUserApiKeys(userId);
  return res.json({ keys });
});

/**
 * POST /api/api-keys
 */
apiKeysRouter.post('/', rateLimiter(60000, 5), (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const { name, scopes, expiresInDays } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'API kalit nomini kiriting.' });
  }

  const result = generateApiKey(userId, name.trim(), scopes || ['read', 'write'], expiresInDays, req.ip);

  return res.status(201).json({
    success: true,
    message: 'Yangi API kalit yaratildi. Ushbu kalitni xavfsiz saqlang, u qayta ko\'rsatilmaydi!',
    apiKey: result
  });
});

/**
 * POST /api/api-keys/:id/revoke
 */
apiKeysRouter.post('/:id/revoke', (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const keyId = req.params.id;

  const success = revokeApiKey(userId, keyId, req.ip);
  if (!success) {
    return res.status(404).json({ error: 'API kalit topilmadi yoki allaqachon bekor qilingan.' });
  }

  return res.json({ success: true, message: 'API kalit muvaffaqiyatli bekor qilindi (Revoked).' });
});

/**
 * POST /api/api-keys/:id/rotate
 */
apiKeysRouter.post('/:id/rotate', rateLimiter(60000, 3), (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const keyId = req.params.id;

  const newKey = rotateApiKey(userId, keyId, req.ip);
  if (!newKey) {
    return res.status(404).json({ error: 'API kalit topilmadi.' });
  }

  return res.json({
    success: true,
    message: 'API kalit muvaffaqiyatli yangilandi (Rotated). Yangi kalitni saqlab oling.',
    apiKey: newKey
  });
});

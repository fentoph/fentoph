import { Router } from 'express';
import { rateLimiter } from '../middleware/security';
import { processAiQuery } from '../services/aiService';
import { AuthenticatedRequest } from '../middleware/auth';

export const aiRouter = Router();

/**
 * POST /api/ai/chat
 * Secure AI proxy with rate limiting and abuse defense
 */
aiRouter.post('/chat', rateLimiter(60000, 15, 'AI so\'rovlar limiti: daqiqada 15 ta'), async (req: AuthenticatedRequest, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Savol kiritilishi shart.' });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ error: 'Savol uzunligi 2000 belgidan oshmasligi kerak.' });
    }

    const result = await processAiQuery({ prompt: prompt.trim(), history });

    return res.json({
      reply: result.reply,
      suggestedActions: result.suggestedActions,
      provider: result.provider
    });
  } catch (error) {
    console.error('AI Route error:', error);
    return res.status(500).json({ error: 'AI assistent bilan bog\'lanishda xatolik yuz berdi.' });
  }
});

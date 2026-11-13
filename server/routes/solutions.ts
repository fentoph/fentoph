import { Router } from 'express';
import { db } from '../db/database';

export const solutionsRouter = Router();

solutionsRouter.get('/', (_req, res) => {
  const solutions = db.prepare('SELECT * FROM solutions ORDER BY title ASC').all().map((s: any) => ({
    ...s,
    metrics: JSON.parse(s.metrics_json || '[]'),
    features: JSON.parse(s.features_json || '[]'),
    benefits: JSON.parse(s.benefits_json || '[]')
  }));

  return res.json({ solutions });
});

solutionsRouter.get('/:slug', (req, res) => {
  const s = db.prepare('SELECT * FROM solutions WHERE slug = ?').get(req.params.slug) as any;
  if (!s) {
    return res.status(404).json({ error: 'Yechim topilmadi.' });
  }

  return res.json({
    solution: {
      ...s,
      metrics: JSON.parse(s.metrics_json || '[]'),
      features: JSON.parse(s.features_json || '[]'),
      benefits: JSON.parse(s.benefits_json || '[]')
    }
  });
});

import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';
import { requireAuth, requireRole, AuthenticatedRequest } from '../middleware/auth';
import { recordAuditLog } from '../services/authService';

export const productsRouter = Router();

/**
 * GET /api/products
 * Public listing
 */
productsRouter.get('/', (_req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY name ASC').all().map((p: any) => {
    const plans = db.prepare('SELECT * FROM product_plans WHERE product_id = ?').all(p.id).map((pl: any) => ({
      ...pl,
      popular: Boolean(pl.popular),
      features: JSON.parse(pl.features_json || '[]')
    }));

    return {
      ...p,
      features: JSON.parse(p.features_json || '[]'),
      screenshots: JSON.parse(p.screenshots_json || '[]'),
      faqs: JSON.parse(p.faqs_json || '[]'),
      plans
    };
  });

  return res.json({ products });
});

/**
 * GET /api/products/:slug
 */
productsRouter.get('/:slug', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug) as any;
  if (!product) {
    return res.status(404).json({ error: 'Mahsulot topilmadi.' });
  }

  const plans = db.prepare('SELECT * FROM product_plans WHERE product_id = ?').all(product.id).map((pl: any) => ({
    ...pl,
    popular: Boolean(pl.popular),
    features: JSON.parse(pl.features_json || '[]')
  }));

  return res.json({
    product: {
      ...product,
      features: JSON.parse(product.features_json || '[]'),
      screenshots: JSON.parse(product.screenshots_json || '[]'),
      faqs: JSON.parse(product.faqs_json || '[]'),
      plans
    }
  });
});

/**
 * ADMIN: POST /api/products
 */
productsRouter.post('/', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { name, tagline, description, badge, category, status, iconName, features, plans } = req.body;

  if (!name || !tagline || !description || !category) {
    return res.status(400).json({ error: 'Barcha asosiy maydonlarni to\'ldiring.' });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const productId = `prod_${Date.now()}`;

  db.transaction(() => {
    db.prepare(`
      INSERT INTO products (id, slug, name, tagline, description, badge, category, status, icon_name, features_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).run(productId, slug, name.trim(), tagline.trim(), description.trim(), badge || null, category, status || 'available', iconName || 'Box', JSON.stringify(features || []));

    if (Array.isArray(plans)) {
      for (const plan of plans) {
        const planId = `plan_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`;
        db.prepare(`
          INSERT INTO product_plans (id, product_id, name, price_uzs, period, description, features_json, popular, cta_label)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(planId, productId, plan.name, plan.priceUzs || 0, plan.period || 'oyiga', plan.description || '', JSON.stringify(plan.features || []), plan.popular ? 1 : 0, plan.ctaLabel || 'Boshlash');
      }
    }
  })();

  recordAuditLog({
    userId: req.user!.id,
    action: 'PRODUCT_CREATED',
    resourceType: 'PRODUCT',
    resourceId: productId,
    details: { name, slug },
    ip: req.ip
  });

  return res.status(201).json({ success: true, message: 'Yangi mahsulot saqlandi.', productId });
});

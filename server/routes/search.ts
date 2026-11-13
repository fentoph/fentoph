import { Router } from 'express';
import { db } from '../db/database';
import { rateLimiter } from '../middleware/security';

export const searchRouter = Router();

/**
 * GET /api/search?q=query
 */
searchRouter.get('/', rateLimiter(60000, 30), (req, res) => {
  const q = ((req.query.q as string) || '').trim().toLowerCase();

  if (!q || q.length < 2) {
    return res.json({ results: [] });
  }

  const results: any[] = [];
  const searchPattern = `%${q}%`;

  // 1. Search Products
  const products = db.prepare(`
    SELECT id, name, tagline, description, slug
    FROM products
    WHERE name LIKE ? OR tagline LIKE ? OR description LIKE ?
    LIMIT 4
  `).all(searchPattern, searchPattern, searchPattern) as any[];

  for (const p of products) {
    results.push({
      id: `prod_${p.id}`,
      title: p.name,
      snippet: p.tagline,
      category: 'Mahsulotlar',
      url: `/products/${p.slug}`,
      icon: 'Package'
    });
  }

  // 2. Search Blog Articles
  const articles = db.prepare(`
    SELECT id, title, excerpt, slug
    FROM blog_posts
    WHERE status = 'published' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)
    LIMIT 4
  `).all(searchPattern, searchPattern, searchPattern) as any[];

  for (const a of articles) {
    results.push({
      id: `blog_${a.id}`,
      title: a.title,
      snippet: a.excerpt,
      category: 'Blog',
      url: `/blog/${a.slug}`,
      icon: 'BookOpen'
    });
  }

  // 3. Search Solutions
  const solutions = db.prepare(`
    SELECT id, title, description, slug
    FROM solutions
    WHERE title LIKE ? OR description LIKE ?
    LIMIT 3
  `).all(searchPattern, searchPattern) as any[];

  for (const s of solutions) {
    results.push({
      id: `sol_${s.id}`,
      title: s.title,
      snippet: s.description,
      category: 'Yechimlar',
      url: `/solutions/${s.slug}`,
      icon: 'Layers'
    });
  }

  // 4. Static Pages & Docs matching
  const staticIndex = [
    { title: 'Kompaniya haqida (About)', snippet: 'Fentoph tarixi, missiyasi, qadriyatlari va jamoasi', category: 'Sahifalar', url: '/about', icon: 'FileText' },
    { title: 'Xavfsizlik Bayonnomasi', snippet: 'Hisob himoyasi, shifrlash va xavfsizlik standartlari', category: 'Xavfsizlik', url: '/security', icon: 'ShieldCheck' },
    { title: 'Karyera va Vakansiyalar', snippet: 'Fentoph jamoasiga qo\'shiling, ochiq ish o\'rinlari', category: 'Karyera', url: '/careers', icon: 'Briefcase' },
    { title: 'Aloqa va Qo\'llab-quvvatlash', snippet: 'Fentoph bosh ofisi bilan bog\'lanish', category: 'Aloqa', url: '/contact', icon: 'Mail' },
    { title: 'Texnik Hujjatlar (Docs)', snippet: 'API, SDK, Getting Started va qo\'llanmalar', category: 'Docs', url: '/docs', icon: 'Code' },
    { title: 'Fentoph ID SSO Qo\'llanmasi', snippet: 'Yagona hisob tizimi integratsiyasi', category: 'Docs', url: '/docs/sso-guide', icon: 'Key' },
    { title: 'Maxfiylik Siyosati (Privacy)', snippet: 'Shaxsiy ma\'lumotlar va maxfiylik kafolati', category: 'Huquqiy', url: '/privacy', icon: 'FileCheck' },
    { title: 'Foydalanish Shartlari (Terms)', snippet: 'Xizmatlardan foydalanish qoidalari', category: 'Huquqiy', url: '/terms', icon: 'FileCheck' }
  ];

  for (const page of staticIndex) {
    if (page.title.toLowerCase().includes(q) || page.snippet.toLowerCase().includes(q)) {
      results.push({
        id: `page_${page.url}`,
        ...page
      });
    }
  }

  return res.json({ results });
});

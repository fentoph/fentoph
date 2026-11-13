import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';
import { requireAuth, requireRole, AuthenticatedRequest } from '../middleware/auth';
import { recordAuditLog } from '../services/authService';

export const blogRouter = Router();

/**
 * GET /api/blog/categories
 */
blogRouter.get('/categories', (_req, res) => {
  const categories = db.prepare('SELECT * FROM blog_categories ORDER BY name ASC').all();
  return res.json({ categories });
});

/**
 * GET /api/blog
 * Public catalog: returns published posts with optional category, search, tag filters
 */
blogRouter.get('/', (req, res) => {
  const { category, search, tag, page = '1', limit = '10' } = req.query;
  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10) || 10));
  const offset = (pageNum - 1) * limitNum;

  let query = `
    SELECT 
      p.id, p.slug, p.title, p.excerpt, p.cover_image as coverImage,
      p.author_name as author, p.published_at as date, p.read_time_min as readTime,
      p.featured, p.views_count as views, p.status,
      c.name as categoryName, c.slug as categorySlug
    FROM blog_posts p
    JOIN blog_categories c ON c.id = p.category_id
    WHERE p.status = 'published'
  `;

  const params: any[] = [];

  if (category && category !== 'all') {
    query += ` AND c.slug = ?`;
    params.push(category);
  }

  if (search) {
    query += ` AND (p.title LIKE ? OR p.excerpt LIKE ? OR p.content LIKE ?)`;
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  // Count total for pagination
  const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
  const countRow = db.prepare(countQuery).get(...params) as { total: number };
  const total = countRow ? countRow.total : 0;

  query += ` ORDER BY p.featured DESC, p.published_at DESC LIMIT ? OFFSET ?`;
  params.push(limitNum, offset);

  const posts = db.prepare(query).all(...params).map((post: any) => {
    // Fetch tags
    const tags = db.prepare(`
      SELECT t.name FROM blog_tags t
      JOIN blog_post_tags pt ON pt.tag_id = t.id
      WHERE pt.post_id = ?
    `).all(post.id).map((t: any) => t.name);

    return {
      ...post,
      tags,
      category: post.categoryName,
      featured: Boolean(post.featured)
    };
  });

  return res.json({
    posts,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    }
  });
});

/**
 * GET /api/blog/:slug
 * Public post detail
 */
blogRouter.get('/:slug', (req, res) => {
  const { slug } = req.params;

  const post = db.prepare(`
    SELECT 
      p.id, p.slug, p.title, p.excerpt, p.content, p.cover_image as coverImage,
      p.author_name as author, p.published_at as date, p.read_time_min as readTime,
      p.featured, p.views_count as views, p.status,
      c.name as categoryName, c.slug as categorySlug
    FROM blog_posts p
    JOIN blog_categories c ON c.id = p.category_id
    WHERE p.slug = ?
  `).get(slug) as any;

  if (!post || post.status !== 'published') {
    return res.status(404).json({ error: 'Maqola topilmadi yoki hali chop etilmagan.' });
  }

  // Increment views
  db.prepare('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?').run(post.id);

  // Get tags
  const tags = db.prepare(`
    SELECT t.name FROM blog_tags t
    JOIN blog_post_tags pt ON pt.tag_id = t.id
    WHERE pt.post_id = ?
  `).all(post.id).map((t: any) => t.name);

  // Get related posts in same category
  const related = db.prepare(`
    SELECT id, slug, title, excerpt, cover_image as coverImage, published_at as date, read_time_min as readTime
    FROM blog_posts
    WHERE category_id = (SELECT category_id FROM blog_posts WHERE id = ?) AND id != ? AND status = 'published'
    ORDER BY published_at DESC LIMIT 3
  `).all(post.id, post.id);

  return res.json({
    post: {
      ...post,
      category: post.categoryName,
      tags,
      featured: Boolean(post.featured),
      views: post.views + 1
    },
    related
  });
});

/**
 * ADMIN CMS ROUTES
 */

/**
 * GET /api/blog/admin/all
 */
blogRouter.get('/admin/all', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (_req, res) => {
  const posts = db.prepare(`
    SELECT 
      p.id, p.slug, p.title, p.status, p.author_name as author,
      p.published_at as publishedAt, p.views_count as views, p.created_at as createdAt,
      c.name as categoryName
    FROM blog_posts p
    JOIN blog_categories c ON c.id = p.category_id
    ORDER BY p.created_at DESC
  `).all();

  return res.json({ posts });
});

/**
 * POST /api/blog
 * Create article
 */
blogRouter.post('/', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { title, excerpt, content, categoryId, coverImage, tags, status, readTime } = req.body;

  if (!title || !content || !categoryId) {
    return res.status(400).json({ error: 'Sarlavha, kontent va kategoriya kiritilishi shart.' });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + '-' + crypto.randomBytes(2).toString('hex');

  const postId = `post_${Date.now()}`;
  const authorName = req.profile?.full_name || req.user!.username;
  const postStatus = status === 'draft' ? 'draft' : 'published';
  const publishedAt = postStatus === 'published' ? new Date().toISOString().split('T')[0] : null;

  db.transaction(() => {
    db.prepare(`
      INSERT INTO blog_posts (id, slug, title, excerpt, content, cover_image, category_id, author_id, author_name, published_at, read_time_min, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).run(postId, slug, title.trim(), excerpt || title.substring(0, 160), content, coverImage || null, categoryId, req.user!.id, authorName, publishedAt, readTime || 5, postStatus);

    // Insert tags
    if (Array.isArray(tags)) {
      for (const tagName of tags) {
        if (!tagName.trim()) continue;
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        let tagRecord = db.prepare('SELECT id FROM blog_tags WHERE slug = ?').get(tagSlug) as { id: string } | undefined;
        if (!tagRecord) {
          const tagId = `tag_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`;
          db.prepare('INSERT INTO blog_tags (id, name, slug) VALUES (?, ?, ?)').run(tagId, tagName.trim(), tagSlug);
          tagRecord = { id: tagId };
        }
        db.prepare('INSERT OR IGNORE INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)').run(postId, tagRecord.id);
      }
    }
  })();

  recordAuditLog({
    userId: req.user!.id,
    action: 'BLOG_POST_CREATED',
    resourceType: 'BLOG_POST',
    resourceId: postId,
    details: { title, slug, status: postStatus },
    ip: req.ip
  });

  return res.status(201).json({
    success: true,
    message: 'Maqola muvaffaqiyatli yaratildi.',
    postId,
    slug
  });
});

/**
 * PUT /api/blog/:id
 * Update article
 */
blogRouter.put('/:id', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { title, excerpt, content, categoryId, coverImage, status, readTime, featured } = req.body;

  const existing = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id) as any;
  if (!existing) {
    return res.status(404).json({ error: 'Maqola topilmadi.' });
  }

  const publishedAt = status === 'published' && !existing.published_at 
    ? new Date().toISOString().split('T')[0] 
    : existing.published_at;

  db.prepare(`
    UPDATE blog_posts
    SET 
      title = COALESCE(?, title),
      excerpt = COALESCE(?, excerpt),
      content = COALESCE(?, content),
      category_id = COALESCE(?, category_id),
      cover_image = COALESCE(?, cover_image),
      status = COALESCE(?, status),
      read_time_min = COALESCE(?, read_time_min),
      featured = COALESCE(?, featured),
      published_at = ?,
      updated_at = datetime('now')
    WHERE id = ?
  `).run(title, excerpt, content, categoryId, coverImage, status, readTime, featured !== undefined ? (featured ? 1 : 0) : null, publishedAt, id);

  recordAuditLog({
    userId: req.user!.id,
    action: 'BLOG_POST_UPDATED',
    resourceType: 'BLOG_POST',
    resourceId: id,
    details: { status },
    ip: req.ip
  });

  return res.json({ success: true, message: 'Maqola yangilandi.' });
});

/**
 * DELETE /api/blog/:id
 */
blogRouter.delete('/:id', requireAuth, requireRole(['ADMIN', 'SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;

  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(id);

  recordAuditLog({
    userId: req.user!.id,
    action: 'BLOG_POST_DELETED',
    resourceType: 'BLOG_POST',
    resourceId: id,
    ip: req.ip
  });

  return res.json({ success: true, message: 'Maqola muvaffaqiyatli o\'chirildi.' });
});

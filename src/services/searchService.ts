import { SearchResult } from '../types';
import { PRODUCTS_DATA } from '../data/products';
import { SOLUTIONS_DATA } from '../data/solutions';
import { BLOG_POSTS } from '../data/blogs';
import { DOCS_ARTICLES } from '../data/docs';
import { apiClient } from './apiClient';

export const globalSearch = (query: string): SearchResult[] => {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  const results: SearchResult[] = [];

  // 1. Search Products
  PRODUCTS_DATA.forEach(p => {
    if (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.features.some(f => f.toLowerCase().includes(q))
    ) {
      results.push({
        id: `prod_${p.id}`,
        type: 'product',
        title: p.name,
        description: p.tagline,
        url: `/products/${p.id}`,
        category: p.categoryLabel,
        badge: p.badge || 'Mahsulot'
      });
    }
  });

  // 2. Search Solutions
  SOLUTIONS_DATA.forEach(s => {
    if (
      s.title.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    ) {
      results.push({
        id: `sol_${s.id}`,
        type: 'solution',
        title: s.title,
        description: s.subtitle,
        url: `/solutions/${s.id}`,
        category: s.category,
        badge: 'Yechim'
      });
    }
  });

  // 3. Search Blog Posts
  BLOG_POSTS.forEach(b => {
    if (
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q)) ||
      b.category.toLowerCase().includes(q)
    ) {
      results.push({
        id: `blog_${b.id}`,
        type: 'blog',
        title: b.title,
        description: b.excerpt,
        url: `/blog/${b.slug}`,
        category: b.category,
        badge: 'Maqola'
      });
    }
  });

  // 4. Search Documentation
  DOCS_ARTICLES.forEach(d => {
    if (
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.content.some(c => c.toLowerCase().includes(q))
    ) {
      results.push({
        id: `doc_${d.id}`,
        type: 'doc',
        title: d.title,
        description: d.description,
        url: `/docs/${d.slug}`,
        category: d.section,
        badge: 'Hujjat'
      });
    }
  });

  // 5. Static Pages
  const staticPages = [
    { title: 'Fentoph Bosh Sahifasi', desc: 'Asosiy qidiruv, ekotizim va mahsulotlar', url: '/', cat: 'Sahifa' },
    { title: 'Kompaniya Haqida', desc: 'Fentoph tarixi, missiyasi, jamoasi va bosqichlari', url: '/about', cat: 'Sahifa' },
    { title: 'Karyera Markazi', desc: 'Fentoph jamoasidagi ochiq ish o\'rinlari va vakansiyalar', url: '/careers', cat: 'Sahifa' },
    { title: 'Aloqa va Qo\'llab-quvvatlash', desc: 'Fentoph bilan bog\'lanish, ofis manzillari va FAQ', url: '/contact', cat: 'Sahifa' },
    { title: 'Xavfsizlik va Maxfiylik Bayonnomasi', desc: 'Zero-Knowledge, shifrlash va autentifikatsiya xavfsizligi', url: '/security', cat: 'Xavfsizlik' },
    { title: 'Fentoph Hisobi (ID)', desc: 'Yagona hisob yaratish va tizimga kirish', url: '/login', cat: 'Autentifikatsiya' },
    { title: 'Foydalanuvchi Boshqaruv Paneli (Dashboard)', desc: 'Shaxsiy profil, xavfsizlik va ulangan xizmatlar', url: '/dashboard', cat: 'Profil' },
  ];

  staticPages.forEach(sp => {
    if (sp.title.toLowerCase().includes(q) || sp.desc.toLowerCase().includes(q)) {
      results.push({
        id: `page_${sp.url}`,
        type: 'page',
        title: sp.title,
        description: sp.desc,
        url: sp.url,
        category: sp.cat,
        badge: 'Sahifa'
      });
    }
  });

  return results;
};

export const searchBackend = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.trim().length === 0) return [];
  try {
    const res = await apiClient.search(query);
    if (res && res.results && res.results.length > 0) {
      return res.results.map((r: any) => ({
        id: r.id,
        type: r.category.toLowerCase().includes('mahsulot') ? 'product' : r.category.toLowerCase().includes('blog') ? 'blog' : 'page',
        title: r.title,
        description: r.snippet,
        url: r.url,
        category: r.category,
        badge: r.category
      }));
    }
  } catch (err) {
    console.error('Backend search failed, fallback to local index:', err);
  }
  return globalSearch(query);
};

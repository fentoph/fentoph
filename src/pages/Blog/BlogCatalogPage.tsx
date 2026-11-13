import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { BLOG_POSTS } from '../../data/blogs';
import { BlogPost } from '../../types';
import { 
  Search, 
  BookOpen, 
  ArrowRight, 
  Heart, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const BlogCatalogPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'Strategiya va Falsafa', label: 'Strategiya' },
    { id: 'FinTex va Moliya', label: 'FinTex' },
    { id: 'E-Commerce', label: 'E-Commerce' },
    { id: 'Texnologiya va Xavfsizlik', label: 'Xavfsizlik' },
    { id: 'Sun\'iy Intellekt', label: 'Sun\'iy Intellekt' }
  ];

  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)));

  const filteredPosts = BLOG_POSTS.filter(post => {
    if (!post.published) return false;
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesTag && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          Fentoph Publications & Engineering
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Fentoph Rasmiy Blogi
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Kompaniya yangiliklari, arxitektura tahlillari, FinTech va sun'iy intellekt 
          bo'yicha muhandislarimizning maqolalari.
        </p>

        {/* Search & Categories */}
        <div className="pt-6 max-w-2xl mx-auto space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Maqolalarni kalit so'z yoki muallif bo'yicha qidirish..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === c.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Tags cloud */}
          <div className="flex flex-wrap items-center justify-center gap-1 text-[11px] font-mono pt-1">
            <span className="text-slate-500">Teglar:</span>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article Spotlight (if page 1 and no search) */}
      {currentPage === 1 && !searchQuery && selectedCategory === 'all' && selectedTag === 'all' && featuredPost && (
        <div
          onClick={() => navigate(`/blog/${featuredPost.slug}`)}
          className="cursor-pointer group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
        >
          <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-xs">
              Asosiy Maqola
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400">{featuredPost.category}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-medium">{featuredPost.author.name}</div>
                    <div className="text-[10px] text-slate-500">{featuredPost.author.role}</div>
                  </div>
                </div>
                <span className="font-mono">{featuredPost.date}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>{featuredPost.readTime} o'qish</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  O'qish <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map(post => (
          <div
            key={post.id}
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="cursor-pointer group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:bg-slate-900/90"
          >
            <div>
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-mono text-cyan-300 border border-slate-700">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="text-[11px] text-slate-500 font-mono">
                  {post.date} • {post.readTime}
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium truncate max-w-[140px]">
                {post.author.name}
              </span>
              <span className="text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                O'qish <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};

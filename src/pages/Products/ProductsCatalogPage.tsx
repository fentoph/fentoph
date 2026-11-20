import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { PRODUCTS_DATA } from '../../data/products';
import { 
  Layers, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Search,
  Filter,
  ShieldCheck,
  Star,
  Download,
  Zap,
  TrendingUp,
  Cpu,
  Lock,
  ChevronRight
} from 'lucide-react';

export const ProductsCatalogPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    { id: 'all', label: 'Barcha Mahsulotlar' },
    { id: 'fintech', label: 'FinTex va Moliya' },
    { id: 'ecommerce', label: 'E-Commerce AI' },
    { id: 'communication', label: 'Xavfsiz Aloqa' },
    { id: 'ai', label: 'Sun\'iy Intellekt' },
    { id: 'infrastructure', label: 'Infratuzilma & SSO' }
  ];

  const filtered = PRODUCTS_DATA.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16 relative">
      
      {/* Background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-600/15 blur-[130px] pointer-events-none rounded-full -z-10"></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-cyan-400 text-xs font-mono shadow-sm">
          <Layers className="w-3.5 h-3.5" />
          Fentoph Ekotizim Mahsulotlar Portfeli
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Har bir vazifa uchun mukammal vosita
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Kompaniyamizning har bir mahsuloti mustaqil yuqori unumdorlik bilan ishlaydi va 
          yagona Fentoph ID orqali boshqa mahsulotlar bilan uzviy integratsiya qilingan.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Mahsulot nomi yoki imkoniyatini qidirish..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => (
          <div
            key={product.id}
            className="group rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 space-y-6 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  {product.categoryLabel}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {product.badge || product.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-blue-400 mt-1">
                  {product.tagline}
                </p>
                <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features List */}
              <div className="pt-2 space-y-2 border-t border-slate-800/80">
                {product.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">Tarif</span>
                <span className="text-xs font-bold text-white">
                  {product.plans[0]?.price 
                    ? `${product.plans[0].price} ${product.plans[0].period || ''}` 
                    : 'Bepul boshlash'}
                </span>
              </div>

              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm group-hover:bg-blue-600"
              >
                <span>Batafsil</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ecosystem Synergy Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
            SSO & Integratsiya
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Yagona Fentoph ID — Barcha Mahsulotlarga Kalit
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Har bir mahsulot uchun alohida ro'yxatdan o'tish shart emas. Bitta Fentoph ID orqali Finilya, EskiBozor, Fsent va Phentist imkoniyatlaridan xavfsiz foydalaning.
          </p>
        </div>

        <button
          onClick={() => navigate('/register')}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Fentoph ID ochish</span>
        </button>
      </div>

    </div>
  );
};

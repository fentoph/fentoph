import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { PRODUCTS_DATA } from '../../data/products';
import { ProductCategory } from '../../types';
import { 
  Layers, 
  ArrowRight, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Search,
  Filter
} from 'lucide-react';

export const ProductsCatalogPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'fintech', label: 'FinTex va Moliya' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'communication', label: 'Aloqa & Xabarlar' },
    { id: 'ai', label: 'Sun\'iy Intellekt' },
    { id: 'infrastructure', label: 'Infratuzilma' }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          Fentoph Mahsulotlar Portfeli
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Barcha Fentoph Mahsulotlari
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Kompaniyamizning har bir mahsuloti mustaqil mukammal ishlaydi va 
          yagona Fentoph ID orqali boshqa mahsulotlar bilan uzviy bog'lanadi.
        </p>

        {/* Filter bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Mahsulotlarni qidirish..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
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
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => (
          <div
            key={product.id}
            className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:bg-slate-900/90 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {product.categoryLabel}
                </span>
                <span className="text-xs font-mono text-emerald-400">{product.badge}</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                <p className="text-xs font-semibold text-blue-400 mt-0.5">{product.tagline}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {product.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">Boshlang'ich</span>
                <span className="text-xs font-semibold text-white font-mono">{product.plans[0]?.price || 'Bepul'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  Batafsil <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

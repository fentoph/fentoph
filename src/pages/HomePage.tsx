import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS_DATA } from '../data/products';
import { BLOG_POSTS } from '../data/blogs';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Wallet, 
  ShoppingBag, 
  MessageSquare, 
  Cpu, 
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onOpenSearchWithQuery: (q: string) => void;
  onOpenAiWithPrompt: (p: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onOpenSearchWithQuery, 
  onOpenAiWithPrompt 
}) => {
  const { navigate } = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onOpenSearchWithQuery(searchInput.trim());
  };

  const handleAskAi = () => {
    const prompt = searchInput.trim() || 'Fentoph nima va u qanday mahsulotlarni taklif qiladi?';
    onOpenAiWithPrompt(prompt);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      
      {/* ========================================================
          CENTERED HERO: GOOGLE-INSPIRED MINIMALIST CENTERED SECTION
          ======================================================== */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-12 pb-20 max-w-4xl mx-auto w-full text-center">
        
        {/* Subtle Background Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-600/15 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Fentoph Logo Mark & Wordmark */}
        <div className="relative mb-8 select-none flex flex-col items-center group cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-2xl shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#080d16] rounded-[22px] flex items-center justify-center p-3">
              <img 
                src="/images/favicon.svg" 
                alt="Fentoph Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]" 
              />
            </div>
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white font-mono">
            FENTOPH
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium tracking-wide">
            Ertangi kun innovatsiyalari va intellektual texnologiyalar ekotizimi
          </p>
        </div>

        {/* Large Universal Search / AI Input Form */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative z-10 space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
            
            <div className="relative flex items-center bg-[#0d1522] border border-slate-700/80 rounded-2xl shadow-2xl px-4 sm:px-5 py-3.5 sm:py-4">
              <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Fentoph bo'ylab qidiring yoki AI-dan so'rang..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
              />
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className="hidden sm:inline-flex text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                  Ctrl+K
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: "Search Fentoph" & "AI Assistant" */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-white font-semibold text-xs sm:text-sm hover:border-slate-600 transition-all shadow-sm"
            >
              Search Fentoph
            </button>
            <button
              type="button"
              onClick={handleAskAi}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              AI Assistant
            </button>
          </div>
        </form>

        {/* Quick Access to Core Products */}
        <div className="mt-12 w-full max-w-2xl pt-6 border-t border-slate-800/60">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-4">
            Mahsulotlarga Tezkor Kirish
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'finilya', name: 'Finilya', cat: 'Moliya', icon: <Wallet className="w-4 h-4 text-emerald-400" /> },
              { id: 'eskibozor', name: 'EskiBozor', cat: 'Savdo', icon: <ShoppingBag className="w-4 h-4 text-amber-400" /> },
              { id: 'fsent', name: 'Fsent', cat: 'Xabar', icon: <MessageSquare className="w-4 h-4 text-blue-400" /> },
              { id: 'phentist', name: 'Phentist AI', cat: 'AI Core', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
              { id: 'fentoph-cloud', name: 'Fentoph ID', cat: 'SSO', icon: <ShieldCheck className="w-4 h-4 text-cyan-400" /> },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/products/${p.id}`)}
                className="group p-3 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all text-left flex flex-col justify-between"
              >
                <div className="mb-2 p-1.5 w-fit rounded-lg bg-slate-800/80 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{p.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{p.cat}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Metrics Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            150,000+ Faol ID hisoblari
          </span>
          <span>•</span>
          <span>99.99% Kafolatlangan Uptime</span>
          <span>•</span>
          <span>Zero-Knowledge Kiberxavfsizlik</span>
        </div>

      </section>

      {/* ========================================================
          BELOW THE FOLD: HIGHLIGHTS & ECOSYSTEM OVERVIEW
          ======================================================== */}
      <section className="border-t border-slate-800/80 bg-slate-950/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                Yagona Ekotizim
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                Fentoph Mahsulotlarining Kuchli Imkoniyatlari
              </h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-semibold flex items-center gap-1 group self-start md:self-auto"
            >
              Barcha mahsulotlar katalogi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS_DATA.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/products/${p.id}`)}
                className="cursor-pointer group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-200 hover:bg-slate-900/90"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      {p.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{p.badge}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 mt-1">
                    {p.tagline}
                  </p>
                  <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Batafsil ko'rish</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Solutions & Enterprise Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Biznes Uchun Yechimlar</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Kompaniyangiz jarayonlarini Fentoph bilan avtomatlashtiring
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Raqamli banking, e-commerce AI tahlili, harbiy darajada shifrlangan korporativ messenjer va sun'iy intellekt agentlari.
              </p>
            </div>
            <button
              onClick={() => navigate('/solutions')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Yechimlarni Ko'rish <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Latest from the Blog */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">Tahliliy Maqolalar</span>
                <h3 className="text-2xl font-bold text-white mt-1">Fentoph Engineering & Insights</h3>
              </div>
              <button
                onClick={() => navigate('/blog')}
                className="text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-semibold flex items-center gap-1 group"
              >
                Barcha maqolalar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="cursor-pointer group rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 w-full overflow-hidden relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-mono text-cyan-300 border border-slate-700">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="text-[11px] text-slate-500 font-mono">{post.date} • {post.readTime}</div>
                      <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 text-xs text-cyan-400 font-medium flex items-center gap-1">
                    O'qish <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

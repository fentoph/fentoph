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
  ChevronRight,
  Lock,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  Database,
  Terminal,
  CheckCircle2,
  KeyRound,
  Compass
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
  const [activeSolutionTab, setActiveSolutionTab] = useState<'finance' | 'commerce' | 'security' | 'ai'>('finance');

  const SUGGESTED_QUERIES = [
    { label: "Finilya moliyaviy tahlil", query: "Finilya moliya boshqaruvi va hisobotlar" },
    { label: "EskiBozor AI narx monitoringi", query: "EskiBozor intellektual savdo platformasi" },
    { label: "Fsent Signal shifrlash", query: "Fsent Double Ratchet xavfsiz messenjer" },
    { label: "Phentist avtomatlashtirish", query: "Phentist AI agentlar va katta modellar" },
    { label: "Fentoph ID xavfsizligi", query: "Fentoph ID yagona autentifikatsiya va SSO" }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onOpenSearchWithQuery(searchInput.trim());
  };

  const handleAskAi = () => {
    const prompt = searchInput.trim() || 'Fentoph ekotizimida qanday mahsulotlar mavjud va ular biznesga qanday foyda beradi?';
    onOpenAiWithPrompt(prompt);
  };

  const handlePromptClick = (query: string) => {
    setSearchInput(query);
    onOpenSearchWithQuery(query);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] relative overflow-hidden bg-[#050811] text-slate-100">
      
      {/* Dynamic Background Mesh & Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-[130px] rounded-full animate-pulse-slow"></div>
        <div className="absolute top-36 left-1/4 w-[350px] h-[250px] bg-purple-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-48 right-1/4 w-[350px] h-[250px] bg-cyan-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10"></div>

      {/* ========================================================
          1. CENTERED HERO: CLEAN, GOOGLE-INSPIRED MINIMALIST CENTER
          ======================================================== */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-10 sm:pt-16 pb-20 max-w-5xl mx-auto w-full text-center relative z-10">
        
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 font-semibold">
            Fentoph 2026.4 • Kelajak Raqamli Ekotizimi
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
            LIVE
          </span>
        </div>

        {/* Fentoph Logo Mark & Wordmark */}
        <div 
          className="relative mb-6 select-none flex flex-col items-center group cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-0.5 shadow-2xl shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-[#080d16] rounded-[22px] flex items-center justify-center p-3.5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="/images/favicon.svg" 
                alt="Fentoph Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.7)] group-hover:rotate-6 transition-transform duration-300" 
              />
            </div>
          </div>

          <h1 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight text-white font-mono flex items-center gap-2">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              FENTOPH
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal max-w-xl leading-relaxed">
            Moliya, intellektual savdo, harbiy darajada shifrlangan aloqa va AI agentlarini birlashtiruvchi global platforma.
          </p>
        </div>

        {/* Large Universal Search / AI Input Form */}
        <div className="w-full max-w-2xl relative space-y-3 mt-2">
          <form onSubmit={handleSearchSubmit} className="relative group">
            {/* Ambient border glow on focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-70 group-focus-within:opacity-100 transition duration-300"></div>
            
            <div className="relative flex items-center bg-[#0a101d]/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl px-4 sm:px-5 py-3.5 sm:py-4">
              <Search className="w-5 h-5 text-cyan-400 mr-3.5 flex-shrink-0 animate-pulse" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Fentoph bo'ylab qidiring, mahsulotlarni toping yoki AI-dan so'rang..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              />
              
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="text-xs text-slate-500 hover:text-slate-300 p-1"
                  >
                    Tozalash
                  </button>
                )}
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700 text-slate-400">
                  <kbd>Ctrl</kbd>+<kbd>K</kbd>
                </span>
              </div>
            </div>
          </form>

          {/* Action Buttons: "Search Fentoph" & "AI Assistant" */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="px-6 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-white font-semibold text-xs sm:text-sm hover:border-slate-500 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search Fentoph</span>
            </button>

            <button
              type="button"
              onClick={handleAskAi}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all active:scale-95 flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>AI Assistant</span>
            </button>
          </div>

          {/* Prompt Suggestions Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
              <Compass className="w-3 h-3" /> Tavsiya:
            </span>
            {SUGGESTED_QUERIES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptClick(item.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-cyan-300 text-[11px] font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            QUICK ACCESS TO CORE PRODUCTS (DOCK STYLE)
            ======================================================== */}
        <div className="mt-12 w-full max-w-3xl pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Fentoph Ekotizim Mahsulotlari
            </span>
            <button
              onClick={() => navigate('/products')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 group"
            >
              Katalog <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { 
                id: 'finilya', 
                name: 'Finilya', 
                tagline: 'Aqlli Moliya', 
                badge: 'Fintech', 
                icon: <Wallet className="w-4 h-4 text-emerald-400" />,
                gradient: 'from-emerald-500/20 to-teal-500/5'
              },
              { 
                id: 'eskibozor', 
                name: 'EskiBozor', 
                tagline: 'AI Savdo Hubi', 
                badge: 'Marketplace', 
                icon: <ShoppingBag className="w-4 h-4 text-amber-400" />,
                gradient: 'from-amber-500/20 to-orange-500/5'
              },
              { 
                id: 'fsent', 
                name: 'Fsent', 
                tagline: 'Shifrlangan Aloqa', 
                badge: 'Signal E2EE', 
                icon: <MessageSquare className="w-4 h-4 text-blue-400" />,
                gradient: 'from-blue-500/20 to-indigo-500/5'
              },
              { 
                id: 'phentist', 
                name: 'Phentist AI', 
                tagline: 'Neyro Agentlar', 
                badge: 'LLM Core', 
                icon: <Cpu className="w-4 h-4 text-purple-400" />,
                gradient: 'from-purple-500/20 to-fuchsia-500/5'
              },
              { 
                id: 'fentoph-cloud', 
                name: 'Fentoph ID', 
                tagline: 'Yagona SSO', 
                badge: 'Identity', 
                icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
                gradient: 'from-cyan-500/20 to-blue-500/5'
              },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/products/${p.id}`)}
                className="group relative p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/80 hover:from-slate-850 hover:to-slate-900 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 text-left flex flex-col justify-between shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-slate-800/80 group-hover:scale-110 transition-transform ${p.gradient}`}>
                    {p.icon}
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/50">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{p.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">{p.tagline}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Trust & Status Metrics Ticker */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-400 font-mono py-3 px-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-semibold">150,000+</span> Faol ID hisoblari
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-white font-semibold">99.99%</span> Uptime SLA
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white font-semibold">&lt;15ms</span> Global Kechikish
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Zero-Knowledge Shifrlash</span>
          </span>
        </div>

      </section>

      {/* ========================================================
          2. BENTO GRID: INTERACTIVE ECOSYSTEM SHOWCASE
          ======================================================== */}
      <section className="border-t border-slate-800/80 bg-[#070c16]/70 py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Zap className="w-3.5 h-3.5" />
              Kelajak Arxitekturasi
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Yagona Intellektual Ekotizim
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Fentoph shunchaki dasturlar to'plami emas. Bu o'zaro sinxron ishlovchi moliya, tijorat, sun'iy intellekt va xavfsiz aloqa poydevori.
            </p>
          </div>

          {/* High-Tech Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
            
            {/* Bento Card 1: Finilya (Large 7 Cols) */}
            <div 
              onClick={() => navigate('/products/finilya')}
              className="lg:col-span-7 cursor-pointer group rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 hover:border-emerald-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                        Finilya
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">Aqlli Korporativ Moliya OS</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                    Fintech 2026
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed max-w-xl mt-3">
                  Kompaniyangiz byudjeti, kassa oqimlari, ko'p valyutali hisoblar va P&L tahlilini real vaqt rejimida avtomatlashtiring. Sun'iy intellekt moliyaviy anomaliyalarni bir zumda aniqlaydi.
                </p>

                {/* Mockup Financial Graph Widget */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/60 pb-2">
                    <span className="flex items-center gap-1.5 text-white">
                      <TrendingUp className="w-4 h-4 text-emerald-400" /> Sof Daromad (P&L)
                    </span>
                    <span className="text-emerald-400 font-bold">+28.4% o'sish</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-500">Tushum</div>
                      <div className="text-white font-bold text-sm mt-0.5">$184,200</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-500">Xarajat</div>
                      <div className="text-white font-bold text-sm mt-0.5">$92,450</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-500">Sof Foyda</div>
                      <div className="text-emerald-400 font-bold text-sm mt-0.5">$91,750</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Finilya imkoniyatlarini ko'rish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Bento Card 2: Fsent Messenger (Medium 5 Cols) */}
            <div 
              onClick={() => navigate('/products/fsent')}
              className="lg:col-span-5 cursor-pointer group rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 hover:border-blue-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none rounded-full"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-blue-300 transition-colors">
                        Fsent
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">Shifrlangan Korporativ Aloqa</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">
                    &lt;15ms Ping
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  Signal Double Ratchet algoritmi asosidagi ultra-tezkor messenjer. Xabarlar faqat suhbatdosh qurilmasida ochiladi, serverda metadata qolmaydi.
                </p>

                {/* Encryption Visual Snippet */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> End-to-End Encrypted
                    </span>
                    <span className="text-slate-500 text-[10px]">Curve25519</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-600/15 border border-blue-500/20 text-xs text-slate-200">
                    "Yangi shartnoma raqamli kaliti tasdiqlandi. Tranzaksiya xavfsiz."
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
                <span>Fsent xavfsizlik arxitekturasi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Bento Card 3: EskiBozor (Medium 6 Cols) */}
            <div 
              onClick={() => navigate('/products/eskibozor')}
              className="lg:col-span-6 cursor-pointer group rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 hover:border-amber-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] pointer-events-none rounded-full"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                        EskiBozor
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">AI Intellektual Savdo Platformasi</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/20">
                    Market Intelligence
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  Savdo bozoridagi raqobatchilar narxlarini, talab dinamikasini va ombordagi qoldiqlarni AI orqali real vaqtda tahlil qilib, optimal narx strategiyasini shakllantiring.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">AI Narx Prognozi</div>
                    <div className="text-amber-400 font-bold mt-1">+14.2% Marja oshishi</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-slate-500 text-[10px]">Avtomatik Tavsiya</div>
                    <div className="text-white font-bold mt-1">2,400+ xaridlar</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>EskiBozor savdo imkoniyatlari</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Bento Card 4: Phentist AI (Medium 6 Cols) */}
            <div 
              onClick={() => navigate('/products/phentist')}
              className="lg:col-span-6 cursor-pointer group rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 hover:border-purple-500/40 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] pointer-events-none rounded-full"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                        Phentist AI
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">Agentik Neyrotarmoqlar Laboratoriyasi</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono border border-purple-500/20">
                    Autonomous LLM
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-3">
                  Katta til modellari (LLM) va avtonom agentlar yordamida mijozlarga xizmat ko'rsatish, kod generatsiyasi va murakkab biznes zanjirlarini avtomatlashtiring.
                </p>

                <div className="mt-6 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-purple-400" /> AI Agent Pipeline
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                    Active Executing
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400">
                <span>Phentist arxitekturasi bilan tanishish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. SOLUTIONS INTERACTIVE SECTION
          ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950/80 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                Sanoat va Biznes Uchun Yechimlar
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Sizning Biznesingizga Mos Keladigan Texnologiya
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Kichik startaplardan tortib yirik korporativ bank va savdo tarmoqlarigacha bo'lgan har qanday talabga moslashtirilgan.
              </p>
            </div>

            <button
              onClick={() => navigate('/solutions')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              Barcha yechimlar katalogi <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            {[
              { id: 'finance', label: 'Raqamli Moliya & Banking' },
              { id: 'commerce', label: 'E-Commerce & Savdo AI' },
              { id: 'security', label: 'Maxfiy Aloqa & Kiberhimoya' },
              { id: 'ai', label: 'Korporativ AI Avtomatlashtirish' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSolutionTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSolutionTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/90 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {activeSolutionTab === 'finance' && 'Fintech Architecture'}
                {activeSolutionTab === 'commerce' && 'Commerce Engine'}
                {activeSolutionTab === 'security' && 'Zero-Trust Protocol'}
                {activeSolutionTab === 'ai' && 'Neural Agent System'}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {activeSolutionTab === 'finance' && 'Moliyaviy operatsiyalarni to\'liq avtomatlashtirish'}
                {activeSolutionTab === 'commerce' && 'AI orqali savdo aylanmasini va daromadni oshirish'}
                {activeSolutionTab === 'security' && 'Korporativ ma\'lumotlar sizib chiqishiga 100% chek qo\'yish'}
                {activeSolutionTab === 'ai' && 'Inson aralashuvisiz ishlaydigan mustaqil agentlar'}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeSolutionTab === 'finance' && 'Fentoph Finilya orqali bank integratsiyalari, avtomatik to\'lovlar rekonsiliatsiyasi, kassa qoldiqlari va ko\'p filialli bizneslar uchun yagona moliyaviy panelni taqdim etadi.'}
                {activeSolutionTab === 'commerce' && 'EskiBozor AI yordamida do\'koningizdagi tovarlar tavsifini avtomatik yaratadi, raqobatchilar narxlarini solishtiradi va mijozlarga individual chegirmalar taklif qiladi.'}
                {activeSolutionTab === 'security' && 'Fsent va Fentoph Cloud SSO korporativ sirlar, fayllar va shaxsiy suhbatlarni xakerlik hujumlari, ruxsatsiz nusxalash va uchinchi shaxslar kuzatuvidan to\'liq himoyalaydi.'}
                {activeSolutionTab === 'ai' && 'Phentist laboratoriyasi har qanday kompaniya ichki bilimlar bazasiga o\'rgatilgan, kechayu kunduz so\'rovlarga javob beradigan va operatsiyalarni bajaruvchi agentlarni taqdim etadi.'}
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Tezkor integratsiya (REST API & Webhooks)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>99.99% xizmat uzluksizligi kafolati (SLA)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>24/7 Premium texnik muhandislik yordami</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
                >
                  Biznesingiz uchun konsultatsiya olish
                </button>
              </div>
            </div>

            {/* Visual Specs Terminal */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 text-slate-400">fentoph-core-v2026.sh</span>
                </span>
                <span>PRODUCTION READY</span>
              </div>

              <div className="space-y-2 text-slate-300">
                <p className="text-cyan-400">$ fentoph-cli ecosystem status --verbose</p>
                <p className="text-emerald-400">✔ Platform: Fentoph Enterprise Core 2026.4.1</p>
                <p className="text-slate-400">✔ Database: Relational SQLite (WAL Mode) / PostgreSQL</p>
                <p className="text-slate-400">✔ Password KDF: scrypt (16-byte salt, timing-safe)</p>
                <p className="text-slate-400">✔ Sessions: SHA-256 tokens at rest, HttpOnly, SameSite=lax</p>
                <p className="text-slate-400">✔ Latency: 12.4ms p99 globally</p>
                <p className="text-cyan-300 font-bold mt-2">All security checks passed: ZERO critical vulnerabilities.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. LATEST ENGINEERING INSIGHTS & BLOG
          ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-[#070c16]/70 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                Muhandislik & Tahliliy Maqolalar
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Fentoph Texnik Jurnali
              </h2>
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
                className="cursor-pointer group rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between hover:bg-slate-900/90 hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-[10px] font-mono text-cyan-300 border border-slate-700 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 text-xs text-cyan-400 font-semibold flex items-center gap-1">
                  O'qish <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. CALL TO ACTION: READY TO JOIN FENTOPH
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-cyan-900/40 border border-slate-700/80 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 blur-[120px] pointer-events-none rounded-full"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono backdrop-blur-md">
            <KeyRound className="w-3.5 h-3.5 text-cyan-300" />
            Yagona Fentoph ID bilan boshlang
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kelajak texnologiyalariga bugun qo'shiling
          </h2>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Fentoph hisobini oching va ekotizimdagi barcha mahsulotlar (Finilya, EskiBozor, Fsent, Phentist)dan bitta qulay boshqaruv paneli orqali foydalaning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Fentoph Hisobini Yaratish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              Mahsulotlar bilan tanishish
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

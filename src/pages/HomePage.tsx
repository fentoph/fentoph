import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS_DATA } from '../data/products';
import { BLOG_POSTS } from '../data/blogs';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolio';
import { 
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
  ExternalLink,
  MapPin,
  Code2,
  X,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface HomePageProps {
  onOpenSearchWithQuery?: (q: string) => void;
  onOpenAiWithPrompt?: (p: string) => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  const { navigate } = useRouter();
  const [activeSolutionTab, setActiveSolutionTab] = useState<'finance' | 'commerce' | 'security' | 'ai'>('finance');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const CATEGORIES = [
    { id: 'all', label: 'Barcha Loyihalar' },
    { id: 'fintech', label: 'FinTex va Moliya' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'security', label: 'Kiberxavfsizlik & Aloqa' },
    { id: 'ai', label: 'Sun\'iy Intellekt' },
    { id: 'cloud', label: 'Yagona Bulut & SSO' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/portfolio');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] relative overflow-hidden bg-[#050811] text-slate-100">
      
      {/* Dynamic Background Mesh & Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-[130px] rounded-full animate-pulse-slow"></div>
        <div className="absolute top-36 left-1/4 w-[350px] h-[250px] bg-purple-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-48 right-1/4 w-[350px] h-[250px] bg-cyan-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none -z-10"></div>

      {/* ========================================================
          1. CLEAN, MODERN TECH HERO (SEARCHBAR REMOVED)
          ======================================================== */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-12 sm:pt-20 pb-20 max-w-5xl mx-auto w-full text-center relative z-10">
        
        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/70 shadow-lg mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 font-semibold">
            Fentoph 2026.4 • Kelajak Raqamli Ekotizimi
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold">
            PRODUCTION READY
          </span>
        </div>

        {/* Fentoph Logo Mark & Wordmark */}
        <div 
          className="relative mb-6 select-none flex flex-col items-center group cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-0.5 shadow-2xl shadow-cyan-500/25 group-hover:shadow-cyan-500/50 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full bg-[#080d16] rounded-[22px] flex items-center justify-center p-3.5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-blue-500/15 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="/images/favicon.svg" 
                alt="Fentoph Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.7)] group-hover:rotate-6 transition-transform duration-300" 
              />
            </div>
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-mono leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              FENTOPH GROUP
            </span>
          </h1>

          <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent mt-3 max-w-2xl">
            Kelajak Texnologiyalari va Intellektual Ekotizim Xoldingi
          </p>

          <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal max-w-2xl leading-relaxed">
            Biznes va jamiyat uchun zamonaviy moliya operatsiyalari, intellektual onlayn savdo, harbiy darajada shifrlangan aloqa va avtonom AI agentlarini birlashtiruvchi milliy mustaqil platforma.
          </p>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4 w-full max-w-md">
          <button
            type="button"
            onClick={scrollToPortfolio}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all active:scale-95 flex items-center gap-2 group"
          >
            <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Portfolioni Ko'rish</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/founder')}
            className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Asoschi Haqida</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="px-6 py-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-cyan-400" />
            <span>Fentoph ID SSO</span>
          </button>
        </div>

        {/* Live Trust & Status Metrics Ticker */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400 font-mono py-3.5 px-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-lg">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-semibold">99.99%</span> Uptime SLA
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-300">Zero-Knowledge Kriptografiya</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300">5+ Production Mahsulotlar</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-semibold">Xiva, Xorazm</span> R&D Markazi
          </span>
        </div>

      </section>

      {/* ========================================================
          2. HAQIQIY PORTFOLIO (REAL PROJECTS SHOWCASE)
          ======================================================== */}
      <section id="portfolio-section" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-[#070c16]/80 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <Layers className="w-3.5 h-3.5" />
                Fentoph Texnologik Portfoliyasi
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
                Haqiqiy Mahsulotlar va Yechimlar
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                Fentoph jamoasi tomonidan noldan loyihalashtirilgan, real korxonalar va foydalanuvchilar xizmatidagi flagman tizimlar.
              </p>
            </div>

            <button
              onClick={() => navigate('/portfolio')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 self-start md:self-auto shadow-md"
            >
              To'liq Portfolio Sahifasi <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 w-fit backdrop-blur-md">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
              >
                {/* Visual Image Banner */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent"></div>
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900/90 text-white border border-slate-700 shadow-md">
                      {project.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ● {project.status}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-slate-900/80 text-slate-400 border border-slate-700">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white font-mono flex items-center justify-between">
                      <span>{project.title}</span>
                      <span className="text-xs font-normal text-cyan-400 font-mono">{project.categoryLabel}</span>
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{project.subtitle}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {project.overview}
                    </p>

                    {/* Architecture Feature Chips */}
                    <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" /> Asosiy Texnik Xususiyatlar:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {project.architecture.slice(0, 2).map((arch, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{arch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2 rounded-xl bg-slate-800/40 border border-slate-800 text-center">
                          <div className="text-xs sm:text-sm font-bold text-white font-mono">{m.value}</div>
                          <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 py-1"
                    >
                      Batafsil Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                        >
                          <span>Jonli Havola</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      )}
                      <button
                        onClick={() => navigate(`/products/${project.id}`)}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/20"
                      >
                        Platforma
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. FOUNDER SPOTLIGHT BANNER
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>

            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <UserCheck className="w-3.5 h-3.5" />
                Fentoph Rahbariyati va Arxitekturasi
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-mono">
                Asoschi: Aslbek Qo'ziboyev
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Fentoph ekotizimining asoschisi va bosh dasturiy arxitektori. Xiva shahrida tug'ilib, Finilya, Fsent va Phentist AI kabi yirik tizimlarni yaratishdan boshlab bugungi kunda 5 ta mustaqil mahsulotdan iborat texnologik xoldingga asos solgan.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Xiva, Xorazm, O'zbekiston
                </span>
                <span>•</span>
                <span className="text-slate-300">Taqsimlangan Tizimlar & Kiberxavfsizlik</span>
                <span>•</span>
                <span className="text-cyan-400 font-bold">Zero-Knowledge Falsafasi</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => navigate('/founder')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Asoschi Sahifasiga O'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all"
              >
                Kompaniya Tarixi
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. SOLUTIONS INTERACTIVE SECTION
          ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950/90 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                Sanoat va Biznes Uchun Yechimlar
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Sizning Biznesingizga Mos Keladigan Texnologiya
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
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

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
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
          5. LATEST ENGINEERING INSIGHTS & BLOG
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
          6. CALL TO ACTION: READY TO JOIN FENTOPH
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-cyan-900/40 border border-slate-700/80 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 blur-[120px] pointer-events-none rounded-full"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono backdrop-blur-md">
            <KeyRound className="w-3.5 h-3.5 text-cyan-300" />
            Yagona Fentoph ID bilan boshlang
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-mono">
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
              onClick={() => navigate('/founder')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              Asoschi bilan tanishish
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0a0f1d] border border-slate-700 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                {activeModalProject.badge} • Case Study
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">
                {activeModalProject.title}
              </h2>
              <p className="text-sm text-slate-300">{activeModalProject.tagline}</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 h-64 sm:h-80">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Muammo & Ehtiyoj</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeModalProject.problem}</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fentoph Yechimi</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeModalProject.solution}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                To'liq Arxitektura Tafsilotlari:
              </h4>
              <ul className="space-y-2">
                {activeModalProject.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Yopish
              </button>

              <div className="flex items-center gap-2">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 border border-slate-700"
                  >
                    <span>Jonli Havola</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    navigate(`/products/${activeModalProject.id}`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Mahsulot Sahifasi
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

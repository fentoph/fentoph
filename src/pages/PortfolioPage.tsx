import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolio';
import { 
  Layers, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Wallet, 
  ShoppingBag, 
  MessageSquare, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Activity, 
  Database,
  X,
  FileCode2,
  Globe
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const CATEGORIES = [
    { id: 'all', label: 'Barcha Loyihalar' },
    { id: 'fintech', label: 'FinTex va Moliya' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'security', label: 'Kiberxavfsizlik va Aloqa' },
    { id: 'ai', label: 'Sun\'iy Intellekt (AI)' },
    { id: 'cloud', label: 'Bulut va SSO' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden bg-[#050811] pb-24">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-indigo-600/15 blur-[130px] rounded-full"></div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12 relative z-10">
        
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-cyan-400 text-xs font-mono shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            Fentoph Ekotizim Portfoliyasi • Production Loyihalar
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-mono">
            Haqiqiy Mahsulotlar va Yechimlar
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Fentoph tomonidan ishlab chiqilgan va real ishlab chiqarishda (production) faoliyat yuritayotgan texnologik platformalar, mikroxizmatlar va kiberxavfsizlik yechimlari.
          </p>
        </section>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-fit mx-auto backdrop-blur-md">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
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
              {/* Project Visual Banner */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent"></div>
                
                {/* Status Badges Overlay */}
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

                {/* Subtitle bottom banner */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-black text-white font-mono flex items-center justify-between">
                    <span>{project.title}</span>
                    <span className="text-xs font-normal text-cyan-400 font-mono">{project.categoryLabel}</span>
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{project.subtitle}</p>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {project.overview}
                  </p>

                  {/* Architecture Bullets */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" /> Arxitektura xususiyatlari:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {project.architecture.slice(0, 3).map((arch, aIdx) => (
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
                      <div key={mIdx} className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-center">
                        <div className="text-sm font-bold text-white font-mono">{m.value}</div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
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

                {/* Footer Actions */}
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
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                      >
                        <span>Sayt</span>
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

        {/* Global CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Yangi Loyihangiz Uchun Fentoph Arxitekturasi
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Sizning kompaniyangiz uchun xavfsiz FinTech, sun'iy intellekt agentlari yoki shifrlangan aloqa infratuzilmasini joriy etishga tayyormiz.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate('/founder')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors border border-slate-700"
            >
              Asoschi Haqida
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              <span>Muloqotni Boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>

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

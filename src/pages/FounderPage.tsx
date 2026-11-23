import React from 'react';
import { useRouter } from '../context/RouterContext';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Globe, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Layers, 
  Award, 
  Compass, 
  Quote, 
  CheckCircle2,
  Workflow,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';

export const FounderPage: React.FC = () => {
  const { navigate } = useRouter();

  const PHILOSOPHY_PRINCIPLES = [
    {
      title: 'Texnologik Mustaqillik (Sovereignty)',
      desc: 'Chet el monopoliyalariga qaram bo\'lmagan, milliy xavfsizlik va ma\'lumotlar daxlsizligini ta\'minlovchi mustaqil dasturiy infratuzilma poydevorini barpo etish.',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Zero-Knowledge & Maxfiylik',
      desc: 'Har bir foydalanuvchining shaxsiy ma\'lumoti, yozishmalari va moliyaviy hisobotlari shaxsiy daxlsiz mulkdir. Tizimlar hatto server tomonida ham o\'qilmaydigan arxitekturada quriladi.',
      icon: <Terminal className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'Mahalliy Madaniyat va AI Moslashuvi',
      desc: 'Sun\'iy intellekt O\'zbekiston tili, biznes madaniyati va amaliy ehtiyojlarini chuqur tushunishi kerak. Phentist AI aynan shu maqsadda noldan o\'qitilmoqda.',
      icon: <Cpu className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'Nol Kechikish va Arxitektura Sifati',
      desc: 'Mikroxizmatlar tezkor, ishonchli va resurslarni tejamkor ishlatuvchi bo\'lishi shart. Har bir millisekund va xotira bayti foydalanuvchi qulayligi uchun optimallashtiriladi.',
      icon: <Workflow className="w-5 h-5 text-emerald-400" />
    }
  ];

  const TECH_SKILLS = [
    { category: 'Dasturlash Tillari', items: ['TypeScript', 'JavaScript (ESNext)', 'Rust', 'Python', 'Go', 'SQL'] },
    { category: 'Frontend & UI Arxitekturasi', items: ['React 19', 'Next.js', 'TailwindCSS', 'Vite', 'State Management', 'WebCrypto API'] },
    { category: 'Backend & Tizimli Arxitektura', items: ['Node.js', 'FastAPI', 'Distributed Systems', 'REST / GraphQL', 'WebSockets', 'WebRTC'] },
    { category: 'Kiberxavfsizlik & Kriptografiya', items: ['Signal Double Ratchet', 'Curve25519', 'AES-256 GCM', 'OAuth 2.0 PKCE', 'Zero-Trust RBAC'] },
    { category: 'Sun\'iy Intellekt & Neyrotarmoqlar', items: ['LLMs & Transformers', 'RAG Pipelines', 'Vector Databases (Qdrant)', 'PyTorch', 'Prompt Engineering'] },
    { category: 'Infratuzilma & DevOps', items: ['Docker', 'Linux/POSIX', 'Edge Computing', 'CI/CD Automation', 'Cloud Security'] }
  ];

  const MILESTONES = [
    {
      year: '2024',
      badge: 'Boshlanish',
      title: 'Xivada Fentoph poydevori va Finilya loyihasi',
      description: 'Xiva shahrida kichik bizneslar va frilanserlarning kassa hisob-kitoblarini avtomatlashtirishga qaratilgan Finilya tizimi yaratildi.'
    },
    {
      year: '2025',
      badge: 'R&D & Xavfsizlik',
      title: 'Fsent va Phentist AI laboratoriyasining ishga tushishi',
      description: 'Harbiy darajadagi shifrlash protokollari asosida Fsent messenjeri va o\'zbek tiliga ixtisoslashgan Phentist neyrotarmoq yadrosi ishlab chiqildi.'
    },
    {
      year: '2026',
      badge: 'Global Ekotizim',
      title: 'Fentoph ID (SSO), EskiBozor va Korporativ Xolding',
      description: 'Barcha platformalar yagona OAuth 2.0 PKCE Fentoph ID ostida birlashtirildi, EskiBozor marketpleysi qo\'shildi va to\'liq xalqaro standartlarga yetkazildi.'
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden bg-[#050811] pb-24">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-purple-600/20 blur-[140px] rounded-full"></div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-20 relative z-10">
        
        {/* ========================================================
            1. HERO & BIO SECTION
            ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Details & Vision */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status & Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 font-semibold">
                Fentoph Group Asoschisi
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Xiva, Xorazm
              </span>
            </div>

            {/* Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-mono">
                Aslbek Qo'ziboyev
              </h1>
              <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent mt-2">
                Asoschi va Bosh Tizim Arxitektori (Founder & Chief Systems Architect)
              </p>
            </div>

            {/* Bio Narrative */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Aslbek Qo'ziboyev — dasturiy ta'minot muhandisi, taqsimlangan yuqori yuklamali tizimlar, zamonaviy kriptografiya va amaliy sun'iy intellekt arxitektori.
              </p>
              <p>
                O'zbekistonning boy tarixiy va intellektual poytaxtlaridan biri bo'lgan qadimiy Xiva shahrida tug'ilib o'sgan Aslbek, dasturlash va texnologiyalarga erta yoshdan mehr qo'yib, mintaqaviy bizneslar va insonlar uchun xalqaro darajadagi mustaqil texnologik ekotizim yaratishga bel bog'ladi.
              </p>
              <p>
                Uning rahbarligi ostida Fentoph — oddiy g'oyadan bugungi kunda 5 ta asosiy mustaqil mahsulotni (Finilya, EskiBozor, Fsent, Phentist, Fentoph ID) o'z ichiga olgan qudratli korporativ xolding darajasiga ko'tarildi.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/aslbek-qoziboyev"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md hover:bg-slate-800"
              >
                <Github className="w-4 h-4 text-slate-200" />
                <span>GitHub Profil (@aslbek-qoziboyev)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                onClick={() => navigate('/contact')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Asoschi bilan bog'lanish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Portrait Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-600/30 via-slate-800/80 to-cyan-500/30 p-1 shadow-2xl">
              
              <div className="bg-[#0a0f1d] rounded-[22px] p-6 sm:p-8 space-y-6 border border-slate-700/80">
                
                {/* Photo / Avatar with Hologram Glow */}
                <div className="relative mx-auto w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 group bg-slate-950">
                  <img
                    src="/fentophforma.png"
                    alt="Aslbek Qo'ziboyev"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Key Facts Matrix */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-slate-400">Rol va Mas'uliyat:</span>
                    <span className="font-bold text-white font-mono">Bosh Arxitektor & Asoschi</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-slate-400">Asosiy Shahar:</span>
                    <span className="font-bold text-cyan-300 font-mono">Xiva, Xorazm, O'zbekiston</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-slate-400">Asosiy yo'nalishlar:</span>
                    <span className="font-bold text-slate-200">Kriptografiya, FinTech, AI</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-slate-400">Ekotizim Mahsulotlari:</span>
                    <span className="font-bold text-emerald-400 font-mono">5 ta faol tizim</span>
                  </div>
                </div>

                {/* Quote Box */}
                <div className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-cyan-400 text-xs text-slate-300 italic leading-relaxed">
                  "Biz shunchaki dasturlar yozmayapmiz — biz o'z yurtimizda, o'z xalqimiz va kelajak avlodlar uchun mustaqil, xavfsiz va faxrlanishga arzigulik raqamli infratuzilma quryapmiz."
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* ========================================================
            2. FOUNDER'S MANIFESTO & PHILOSOPHY
            ======================================================== */}
        <section className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center justify-center gap-1.5">
              <Compass className="w-4 h-4" /> Asoschining Falsafasi va Prinsiplari
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Fentoph Poydevoridagi Qadriyatlar
            </h2>
            <p className="text-sm text-slate-400">
              Har bir kod satri va arxitekturaviy qaror qanday mezonlar asosida qabul qilinadi?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PHILOSOPHY_PRINCIPLES.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4 hover:shadow-xl backdrop-blur-sm"
              >
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 w-fit">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================
            3. TECHNICAL ARCHITECTURE & STACK MASTERY
            ======================================================== */}
        <section className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center justify-center gap-1.5">
              <Code2 className="w-4 h-4" /> Muhandislik Tajribasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Texnologiyalar va Arxitektura Stack
            </h2>
            <p className="text-sm text-slate-400">
              Asoschi tomonidan Fentoph tizimlarida joriy etilgan va qo'llaniladigan asosiy texnologik ustunlar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_SKILLS.map((skillGroup, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-4 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    {skillGroup.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 text-xs font-mono hover:text-white hover:border-slate-500 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================
            4. JOURNEY & MILESTONES (CHRONOLOGY)
            ======================================================== */}
        <section className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" /> Bosqichlar va Rivojlanish
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Asoschining Fentoph Bosqichlari
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MILESTONES.map((item, idx) => (
              <div 
                key={idx}
                className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono text-cyan-400">{item.year}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================
            5. FOUNDER'S DIRECT INVITATION / CTA
            ======================================================== */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Hamkorlik va Muloqot
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Asoschi Bilan To'g'ridan-To'g'ri Bog'laning
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Texnik savollar, sarmoyaviy takliflar yoki Fentoph ekotizimida hamkorlik bo'yicha shaxsan Aslbek Qo'ziboyev yoki bosh muhandislik ofisi bilan bog'lanishingiz mumkin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/portfolio')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              Loyihalar Portfoliosi
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Xabar Yuborish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </section>

      </div>

    </div>
  );
};

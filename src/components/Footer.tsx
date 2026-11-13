import React from 'react';
import { useRouter } from '../context/RouterContext';
import { 
  ShieldCheck, 
  Send, 
  Github, 
  Twitter, 
  Linkedin, 
  Globe, 
  ExternalLink,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-[#05080e] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info (Spans 2 columns on large) */}
          <div className="col-span-2 space-y-4">
            <div 
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-[#0b1320] rounded-[10px] flex items-center justify-center">
                  <img src="/images/favicon.svg" alt="Fentoph" className="w-5 h-5 object-contain" />
                </div>
              </div>
              <span className="text-lg font-black text-white tracking-tight font-mono">FENTOPH GROUP</span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Moliya, savdo, maxfiy aloqa va sun'iy intellekt texnologiyalarini yagona ekotizimga birlashtiruvchi global texnologik xolding.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Barcha tizimlar faol: 99.99% Uptime
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://t.me/fentoph" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://github.com/fentoph" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://linkedin.com/company/fentoph" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://x.com/fentoph" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                title="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">Mahsulotlar</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/products/finilya')} className="hover:text-cyan-400 transition-colors">
                  Finilya Moliya
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/products/eskibozor')} className="hover:text-cyan-400 transition-colors">
                  EskiBozor Savdo
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/products/fsent')} className="hover:text-cyan-400 transition-colors">
                  Fsent Messenjer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/products/phentist')} className="hover:text-cyan-400 transition-colors">
                  Phentist AI Core
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/products/fentoph-cloud')} className="hover:text-cyan-400 transition-colors text-cyan-300 font-medium">
                  Fentoph ID (SSO)
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">Yechimlar</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/solutions/fintech-digital-banking')} className="hover:text-cyan-400 transition-colors">
                  Raqamli Moliya
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/solutions/ai-ecommerce-retail')} className="hover:text-cyan-400 transition-colors">
                  E-Commerce AI
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/solutions/secure-enterprise-comms')} className="hover:text-cyan-400 transition-colors">
                  Maxfiy Aloqa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/solutions/enterprise-ai-agents')} className="hover:text-cyan-400 transition-colors">
                  Avtonom AI Agentlar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/solutions')} className="hover:text-cyan-400 transition-colors text-cyan-400 font-medium">
                  Barcha yechimlar →
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Docs Column */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">Kompaniya</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-white transition-colors">
                  Kompaniya Haqida
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/careers')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  Karyera
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-cyan-400 text-[10px]">
                    Ochiq
                  </span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/blog')} className="hover:text-white transition-colors">
                  Blog & Yangiliklar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors">
                  Aloqa va Ofis
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/docs')} className="hover:text-white transition-colors">
                  Hujjatlar (Docs)
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Legal Column */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">Xavfsizlik & Huquq</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/security')} className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Xavfsizlik Markazi
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy')} className="hover:text-white transition-colors">
                  Maxfiylik Siyosati
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors">
                  Foydalanish Shartlari
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/cookies')} className="hover:text-white transition-colors">
                  Cookie Siyosati
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Fentoph Group Inc. Barcha huquqlar himoyalangan.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Toshkent, O'zbekiston
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Fentoph Engineering tomonidan yaratildi
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { navigate } = useRouter();

  useEffect(() => {
    // Immediately redirect to official Fentoph ID signup portal
    window.location.href = 'https://fentophid.vercel.app/signup';
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#050811] text-slate-100">
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl text-center space-y-6">
        
        {/* Hologram Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 mx-auto shadow-xl shadow-cyan-500/20">
          <div className="w-full h-full bg-[#080d16] rounded-[14px] flex items-center justify-center">
            <img src="/images/favicon.svg" alt="Fentoph ID" className="w-9 h-9 object-contain" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            Rasmiy Fentoph ID Markazi
          </div>
          <h2 className="text-2xl font-black text-white font-mono">
            Yangi Hisob Ochish
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Siz rasmiy Fentoph ID ro'yxatdan o'tish markaziga (<span className="text-cyan-400 font-mono">fentophid.vercel.app/signup</span>) yo'naltirilmoqdasiz...
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 py-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          <span>Bog'lanish o'rnatilmoqda...</span>
        </div>

        <div className="pt-2 space-y-3">
          <a
            href="https://fentophid.vercel.app/signup"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Fentoph ID Ochishga O'tish</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Kirish sahifasiga qaytish
          </button>
        </div>

      </div>
    </div>
  );
};

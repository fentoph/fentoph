import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { PRIVACY_POLICY, TERMS_OF_SERVICE, COOKIE_POLICY, LEGAL_DISCLAIMER } from '../../data/legal';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { navigate } = useRouter();

  const getDoc = () => {
    switch (type) {
      case 'privacy': return PRIVACY_POLICY;
      case 'terms': return TERMS_OF_SERVICE;
      case 'cookies': return COOKIE_POLICY;
      default: return PRIVACY_POLICY;
    }
  };

  const doc = getDoc();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Navigation tabs between legal docs */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 w-fit">
        <button
          onClick={() => navigate('/privacy')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            type === 'privacy' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Maxfiylik Siyosati
        </button>
        <button
          onClick={() => navigate('/terms')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            type === 'terms' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Foydalanish Shartlari
        </button>
        <button
          onClick={() => navigate('/cookies')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            type === 'cookies' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Cookie Siyosati
        </button>
      </div>

      {/* Main Document Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-8">
        
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <ShieldCheck className="w-4 h-4" /> Fentoph Legal & Compliance
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {doc.title}
          </h1>
          <div className="text-xs text-slate-500 font-mono">
            Oxirgi yangilanish: {doc.lastUpdated}
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <span>{LEGAL_DISCLAIMER}</span>
        </div>

        {/* Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {doc.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-base font-bold text-white">{sec.heading}</h3>
              <p>{sec.text}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

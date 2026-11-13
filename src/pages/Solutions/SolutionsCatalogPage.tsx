import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { SOLUTIONS_DATA } from '../../data/solutions';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Wallet 
} from 'lucide-react';

export const SolutionsCatalogPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barcha Yechimlar' },
    { id: 'Moliya va Bankchilik', label: 'Moliya va Bank' },
    { id: 'E-Commerce va Savdo', label: 'Savdo va Tijorat' },
    { id: 'Kiberxavfsizlik va Aloqa', label: 'Maxfiy Aloqa' },
    { id: 'Sun\'iy Intellekt', label: 'AI va Agentlar' },
    { id: 'Infratuzilma va SSO', label: 'Infratuzilma & SSO' }
  ];

  const filtered = selectedCategory === 'all'
    ? SOLUTIONS_DATA
    : SOLUTIONS_DATA.filter(s => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          Fentoph Enterprise Solutions
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Biznesingiz Uchun Maxsus Yechimlar
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Biz qanday qilib zamonaviy texnologik to'siqlarni yechishimiz va 
          korxonalarga samaradorlik, xavfsizlik hamda yangi o'sish sur'atlarini taqdim etishimiz bilan tanishing.
        </p>

        {/* Category Pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Solutions Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map(solution => (
          <div
            key={solution.id}
            className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-8 flex flex-col justify-between transition-all duration-200 hover:bg-slate-900/90 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {solution.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">Enterprise Grade</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
                <p className="text-xs font-semibold text-blue-400 mt-1">{solution.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {solution.summary}
              </p>

              {/* Benefits Snippets */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                {solution.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white font-semibold">{b.title}:</strong> {b.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span>Ulangan:</span>
                {solution.connectedProducts.map(p => (
                  <span key={p} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                    {p}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigate(`/solutions/${solution.id}`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                Yechimni ko'rish <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

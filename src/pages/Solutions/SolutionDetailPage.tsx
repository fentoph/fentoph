import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { SOLUTIONS_DATA } from '../../data/solutions';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Sparkles,
  Quote
} from 'lucide-react';

interface SolutionDetailPageProps {
  solutionId: string;
}

export const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({ solutionId }) => {
  const { navigate } = useRouter();

  const solution = SOLUTIONS_DATA.find(s => s.id === solutionId) || SOLUTIONS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/solutions')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Barcha yechimlar katalogiga qaytish
        </button>
      </div>

      {/* Hero Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-mono border border-blue-500/20">
          {solution.category}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {solution.title}
        </h1>

        <p className="text-base sm:text-xl text-blue-300 font-medium">
          {solution.subtitle}
        </p>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
          {solution.summary}
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            Yechim bo'yicha maslahat olish <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Problem vs Solution Comparison Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-800">
        
        {/* The Problem */}
        <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/30 space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold">
            <AlertCircle className="w-4 h-4" />
            Mavjud Muammo va To'siqlar
          </div>
          <h3 className="text-xl font-bold text-white">An'anaviy usullardagi qiyinchiliklar:</h3>
          <ul className="space-y-3 pt-2">
            {solution.problem.map((prob, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                <span>{prob}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The Fentoph Solution */}
        <div className="p-8 rounded-3xl bg-cyan-950/20 border border-cyan-500/30 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold">
            <CheckCircle2 className="w-4 h-4" />
            Fentoph Yechimi va Natija
          </div>
          <h3 className="text-xl font-bold text-white">Biz qanday hal qilamiz:</h3>
          <ul className="space-y-3 pt-2">
            {solution.solution.map((sol, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{sol}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Technical Architecture Overview */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Me'morchilik</span>
        <h3 className="text-2xl font-bold text-white">Texnologik Arxitektura va Ishlash Tartibi</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-950 p-4 rounded-2xl border border-slate-800">
          {solution.architectureOverview}
        </p>
      </div>

      {/* Key Benefits Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Asosiy Afzalliklar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solution.benefits.map((b, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-white">{b.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study / Real Metrics */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Keys va Natija</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{solution.caseStudy.client}</h3>
          </div>

          <div className="flex items-center gap-6">
            {solution.caseStudy.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">{m.value}</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-sm sm:text-base text-slate-200 italic space-y-2">
          <Quote className="w-5 h-5 text-cyan-400 mb-1" />
          <p>"{solution.caseStudy.quote}"</p>
          <footer className="text-xs text-cyan-400 font-sans not-italic font-semibold pt-2">
            — {solution.caseStudy.author}
          </footer>
        </blockquote>
      </div>

    </div>
  );
};

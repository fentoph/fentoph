import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { PRODUCTS_DATA } from '../../data/products';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  ExternalLink, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Sliders
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Barcha mahsulotlar katalogiga qaytish
        </button>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 text-xs font-mono border border-blue-500/20">
            {product.categoryLabel} • {product.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {product.name}
          </h1>

          <p className="text-base sm:text-lg text-blue-300 font-medium">
            {product.tagline}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {product.longDescription}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Try now / Bepul Boshlash
            </button>

            <button
              onClick={() => navigate(`/docs/${product.docsSlug}`)}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              Documentation
            </button>
          </div>
        </div>

        {/* Demo Metrics Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Texnik Parametrlar & Natijalar
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {product.demoMetrics.map((m, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-lg font-bold text-cyan-400 font-mono">{m.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            {product.specs.map((s, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-800/60 last:border-0">
                <span className="text-slate-400">{s.label}</span>
                <span className="text-white font-mono font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Imkoniyatlar</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{product.name} Asosiy Xususiyatlari</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.features.map((feat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots / Mockups */}
      {product.screenshots && product.screenshots.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Interfeys</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Platforma Ko'rinishi (Mockups)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.screenshots.map((screen, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden space-y-3 pb-4">
                <div className="h-56 sm:h-64 w-full overflow-hidden">
                  <img src={screen.url} alt={screen.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="px-5">
                  <h4 className="font-bold text-white text-sm">{screen.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{screen.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      {product.plans && product.plans.length > 0 && (
        <div className="space-y-8 pt-6 border-t border-slate-800">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Shaffof Tariflar</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{product.name} Rejalari</h2>
            <p className="text-xs text-slate-400">Biznesingiz o'sishi bilan mos ravishda kengaytiring.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-2 border-cyan-500/80 shadow-2xl shadow-cyan-500/10'
                    : 'bg-slate-900/60 border border-slate-800'
                }`}
              >
                <div className="space-y-4">
                  {plan.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 uppercase">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400">{plan.description}</p>
                  
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {plan.price}{' '}
                    {plan.period && <span className="text-xs text-slate-500 font-sans font-normal">/ {plan.period}</span>}
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors ${
                    plan.highlight
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  Tanlash va Boshlash
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-800 max-w-3xl mx-auto">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-white">Tez-tez So'raladigan Savollar</h3>
            <p className="text-xs text-slate-400">{product.name} bo'yicha ko'p beriladigan savollar.</p>
          </div>

          <div className="space-y-3">
            {product.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

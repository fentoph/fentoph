import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useToast } from '../../context/ToastContext';
import { DOCS_ARTICLES } from '../../data/docs';
import { DocArticle } from '../../types';
import { 
  FileText, 
  Search, 
  Copy, 
  Check, 
  ArrowRight, 
  BookOpen, 
  KeyRound, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DocsPageProps {
  currentDocId?: string;
}

export const DocsPage: React.FC<DocsPageProps> = ({ currentDocId }) => {
  const { navigate } = useRouter();
  const toast = useToast();
  const [docSearch, setDocSearch] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Active article based on prop or first
  const activeArticle: DocArticle = DOCS_ARTICLES.find(
    d => d.id === currentDocId || d.slug === currentDocId
  ) || DOCS_ARTICLES[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    toast.success("Kod nusxalandi!");
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const sections: DocArticle['section'][] = [
    'Kirish',
    'Autentifikatsiya',
    'API & SDK',
    'Mahsulotlar',
    'Qo\'llanmalar'
  ];

  const filteredArticles = docSearch.trim()
    ? DOCS_ARTICLES.filter(d => 
        d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
        d.description.toLowerCase().includes(docSearch.toLowerCase()) ||
        d.content.some(c => c.toLowerCase().includes(docSearch.toLowerCase()))
      )
    : DOCS_ARTICLES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Docs Header */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
            <FileText className="w-3.5 h-3.5" />
            Fentoph Developer Hub v2026.4
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Texnik Hujjatlar va API Qo'llanmalari
          </h1>
          <p className="text-xs text-slate-400">
            Fentoph ekotizimini o'z tizimingizga integratsiya qilish uchun rasmiy qo'llanmalar.
          </p>
        </div>

        {/* Docs search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            placeholder="Hujjatlar bo'ylab qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Docs Workspace: Sidebar Navigation + Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-6">
          {sections.map(section => {
            const sectionArticles = filteredArticles.filter(a => a.section === section);
            if (sectionArticles.length === 0) return null;

            return (
              <div key={section} className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-semibold block px-2">
                  {section}
                </span>

                <div className="space-y-1">
                  {sectionArticles.map(art => {
                    const isActive = activeArticle.id === art.id;
                    return (
                      <button
                        key={art.id}
                        onClick={() => navigate(`/docs/${art.slug}`)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 font-semibold'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                        }`}
                      >
                        {art.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>

        {/* Article Body */}
        <main className="lg:col-span-9 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl space-y-8">
          
          <div className="space-y-2 border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-cyan-400">{activeArticle.section}</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {activeArticle.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">
              {activeArticle.description}
            </p>
            <div className="text-[10px] text-slate-500 font-mono pt-2">
              Oxirgi yangilanish: {activeArticle.updatedAt}
            </div>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Code Snippets (if any) */}
          {activeArticle.codeSnippets && activeArticle.codeSnippets.length > 0 && (
            <div className="space-y-6 pt-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Kod Namunalari
              </h3>

              {activeArticle.codeSnippets.map((snip, idx) => {
                const snipId = `snip_${idx}`;
                return (
                  <div key={idx} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-semibold">{snip.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                          {snip.lang}
                        </span>
                        <button
                          onClick={() => handleCopy(snip.code, snipId)}
                          className="p-1 rounded-md bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs transition-colors"
                          title="Nusxalash"
                        >
                          {copiedSnippet === snipId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                      <code>{snip.code}</code>
                    </pre>
                  </div>
                );
              })}
            </div>
          )}

          {/* Help box */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-white block">Yordam kerakmi?</span>
              <p className="text-xs text-slate-400">
                Savollaringiz bo'lsa, bizning muhandislik jamoamiz bilan bog'laning.
              </p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Dasturchilar Yordami
            </button>
          </div>

        </main>

      </div>

    </div>
  );
};

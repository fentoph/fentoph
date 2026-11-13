import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { globalSearch } from '../services/searchService';
import { SearchResult } from '../types';
import { 
  Search, 
  X, 
  ArrowRight, 
  Layers, 
  BookOpen, 
  FileText, 
  Sparkles, 
  Briefcase, 
  ShieldCheck, 
  Command 
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  initialQuery = '' 
}) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setResults(globalSearch(initialQuery));
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    setResults(globalSearch(query));
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1 < results.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item: SearchResult) => {
    onClose();
    navigate(item.url);
  };

  if (!isOpen) return null;

  const getIconForType = (type: SearchResult['type']) => {
    switch (type) {
      case 'product': return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'solution': return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'blog': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'doc': return <FileText className="w-4 h-4 text-amber-400" />;
      default: return <ShieldCheck className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-28 px-4">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-[#0b1320] border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-900/60">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Fentoph bo'ylab qidirish: mahsulotlar, blog, hujjatlar, yechimlar..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`cursor-pointer flex items-center justify-between p-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0 pr-4">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 mt-0.5 flex-shrink-0">
                      {getIconForType(item.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white truncate">{item.title}</span>
                        {item.category && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400 border border-slate-700 flex-shrink-0">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                  }`} />
                </div>
              );
            })
          ) : query ? (
            <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
              "{query}" bo'yicha hech narsa topilmadi. Boshqa so'z bilan qidirib ko'ring.
            </div>
          ) : (
            <div className="p-6 text-xs text-slate-400 space-y-3">
              <span className="font-mono text-[10px] uppercase text-slate-500 block">Tavsiya etilgan qidiruvlar:</span>
              <div className="flex flex-wrap gap-2">
                {['Finilya', 'EskiBozor', 'Fsent', 'Phentist AI', 'SSO', 'Karyera', 'Xavfsizlik', 'API Docs'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Tanlash</span>
            <span>↵ O'tish</span>
          </div>
          <span>Fentoph Universal Search</span>
        </div>

      </div>
    </div>
  );
};

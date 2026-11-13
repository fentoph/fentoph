import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { sendAiMessage } from '../services/aiService';
import { AiChatMessage } from '../types';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  ArrowRight, 
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronRight
} from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ 
  isOpen, 
  onClose, 
  initialPrompt 
}) => {
  const { navigate } = useRouter();
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `Salom! Men **Fentoph AI Assistant**man. \n\nKompaniyamiz, mahsulotlarimiz (Finilya, EskiBozor, Fsent, Phentist) yoki texnik imkoniyatlar bo'yicha har qanday savolingizga javob berishga tayyorman.`,
      timestamp: 'Hozirgina',
      suggestedActions: [
        { label: "Fentoph nima?", url: "/about" },
        { label: "Barcha mahsulotlar", url: "/products" },
        { label: "Qaysi mahsulot menga mos?", url: "/solutions" }
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (initialPrompt && initialPrompt.trim()) {
        handleSendPrompt(initialPrompt);
      }
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userMsg: AiChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: promptText.trim(),
      timestamp: 'Hozirgina'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendAiMessage(promptText, { history: messages });
      setMessages(prev => [...prev, response]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'assistant',
          content: 'Kechirasiz, so\'rovni qayta ishlashda xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.',
          timestamp: 'Hozirgina'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(input);
  };

  const handleActionClick = (url: string) => {
    onClose();
    navigate(url);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'assistant',
        content: `Suhbat tozalandi. Qanday yordam bera olaman?`,
        timestamp: 'Hozirgina',
        suggestedActions: [
          { label: "Fentoph nima?", url: "/about" },
          { label: "Mahsulotlar", url: "/products" }
        ]
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed z-[85] transition-all duration-300 ${
      isExpanded 
        ? 'inset-4 sm:inset-10' 
        : 'bottom-4 right-4 sm:right-6 w-[94vw] sm:w-[440px] h-[600px] max-h-[85vh]'
    }`}>
      <div className="w-full h-full rounded-3xl bg-[#090f1a] border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 flex flex-col overflow-hidden backdrop-blur-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                Fentoph AI Assistant
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-[10px] text-cyan-400 font-mono">Phentist-4 Core • Onlayn</div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearHistory}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Tarixni tozalash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
              title={isExpanded ? "Kichraytirish" : "Kattalashtirish"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div 
                key={m.id} 
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-6 h-6 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 leading-relaxed ${
                  isUser 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
                }`}>
                  <div className="whitespace-pre-line">
                    {m.content}
                  </div>

                  {/* Suggested action links */}
                  {m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {m.suggestedActions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(act.url)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 text-[11px] font-medium flex items-center gap-1 transition-colors border border-slate-700"
                        >
                          {act.label} <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] text-right ${isUser ? 'text-blue-200' : 'text-slate-500'} font-mono`}>
                    {m.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-xs text-cyan-400">
              <div className="w-6 h-6 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span className="font-mono">Phentist AI o'ylamoqda...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Chips (if last message is from assistant) */}
        <div className="px-4 py-1.5 border-t border-slate-800/60 bg-slate-900/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            'Fentoph nima?',
            'Mahsulotlar qanday?',
            'Qaysi mahsulot menga mos?',
            'Xavfsizlik qanday?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendPrompt(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer Form */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-900/90 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AI Assistantga savol bering..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center justify-center transition-all disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};

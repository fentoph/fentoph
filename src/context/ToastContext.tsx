import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContextType {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToastItem = (type: ToastItem['type'], message: string) => {
    const id = `t_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const success = (msg: string) => addToastItem('success', msg);
  const error = (msg: string) => addToastItem('error', msg);
  const info = (msg: string) => addToastItem('info', msg);
  const addToast = (message: string, type: ToastItem['type'] = 'info') => addToastItem(type, message);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ success, error, info, addToast }}>
      {children}
      
      {/* Toast Render Portal */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-200 ${
              t.type === 'success' 
                ? 'bg-slate-900/95 border-emerald-500/50 text-white' 
                : t.type === 'error'
                ? 'bg-slate-900/95 border-red-500/50 text-white'
                : 'bg-slate-900/95 border-cyan-500/50 text-white'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />}

            <div className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
              {t.message}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

import React, { useEffect, useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

export const FentophCallbackPage: React.FC = () => {
  const { navigate } = useRouter();
  const { handleFentophOAuthCallback } = useAuth();
  const toast = useToast();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    async function processCallback() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state') || '';
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`Fentoph ID ruxsati rad etildi: ${error}`);
        }

        if (!code) {
          throw new Error('Avtorizatsiya kodi (code) topilmadi.');
        }

        const success = await handleFentophOAuthCallback(code, state);
        if (!isMounted) return;

        if (success) {
          setStatus('success');
          toast.success('Fentoph ID orqali muvaffaqiyatli kirdingiz!');
          // Redirect to personal dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 600);
        } else {
          throw new Error('Fentoph ID sessiyasini yaratib bo\'lmadi');
        }
      } catch (err: any) {
        if (!isMounted) return;
        console.error('Fentoph OAuth callback error:', err);
        setStatus('error');
        setErrorMessage(err?.message || 'Fentoph ID orqali kirishda xatolik yuz berdi.');
        toast.error(err?.message || 'Autentifikatsiya muvaffaqiyatsiz tugadi.');
      }
    }

    processCallback();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-[#050811]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-[130px] pointer-events-none rounded-full"></div>

      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-2xl backdrop-blur-2xl relative z-10 text-center space-y-6">
        
        {/* Brand Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-0.5 shadow-2xl shadow-cyan-500/30">
            <div className="w-full h-full bg-[#080d16] rounded-[14px] flex items-center justify-center">
              <img src="/images/favicon.svg" alt="Fentoph" className="w-9 h-9 object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
            </div>
          </div>
        </div>

        {status === 'loading' && (
          <div className="space-y-4">
            <div className="w-10 h-10 border-3 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Fentoph ID Tasdiqlanmoqda...</h3>
              <p className="text-xs text-slate-400 mt-1">Yagona hisobingiz orqali xavfsiz sessiya yaratilmoqda.</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Muvaffaqiyatli!</h3>
              <p className="text-xs text-slate-400 mt-1">Boshqaruv paneliga yo'naltirilmoqdasiz...</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Kirishda xatolik</h3>
              <p className="text-xs text-red-300 mt-1">{errorMessage}</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Login sahifasiga qaytish</span>
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fentoph OAuth 2.0 / OIDC Identity Provider</span>
        </div>

      </div>
    </div>
  );
};

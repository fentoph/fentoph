import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { apiClient } from '../../services/apiClient';
import { 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw,
  MailCheck
} from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const { navigate } = useRouter();
  const { user, pendingVerificationEmail, verifyEmail } = useAuth();
  const toast = useToast();

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const displayEmail = pendingVerificationEmail || user?.email || 'sizning.pochtangiz@fentoph.com';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setErrorMsg("Iltimos, tasdiqlash kodini kiriting.");
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const ok = await verifyEmail(code.trim());
      if (ok) {
        toast.success("Elektron pochtangiz muvaffaqiyatli tasdiqlandi!");
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Noto'g'ri yoki muddati o'tgan kod kiritildi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (isResending) return;
    setIsResending(true);
    try {
      await apiClient.resendCode(displayEmail);
      toast.success("Yangi bir martalik xavfsizlik kodi emailingizga yuborildi.");
    } catch (err: any) {
      toast.error(err?.message || "Kod qayta yuborishda xatolik.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl text-center space-y-6">
          
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <KeyRound className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Pochtani Tasdiqlang
            </h2>
            <p className="text-xs text-slate-400">
              Biz <strong className="text-cyan-300 font-mono">{displayEmail}</strong> manziliga 6 xonali xavfsizlik kodini yubordik.
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono flex items-center justify-center gap-2">
            <MailCheck className="w-4 h-4 text-cyan-400" />
            <span>Kod 15 daqiqa davomida amal qiladi</span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <input
                type="text"
                required
                maxLength={8}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\s+/g, ''))}
                placeholder="6 xonali kod (masalan: 849201)"
                className="w-full text-center text-lg tracking-widest px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {isLoading ? 'Tekshirilmoqda...' : 'Tasdiqlash va Davom etish'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500">Kod kelmadimi?</span>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
              Qaytadan yuborish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

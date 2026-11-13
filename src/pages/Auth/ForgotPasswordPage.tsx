import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  KeyRound, 
  Mail, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { navigate } = useRouter();
  const { requestPasswordReset, resetPassword } = useAuth();
  const toast = useToast();

  const [step, setStep] = useState<'request' | 'reset' | 'success'>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      await requestPasswordReset(email);
      setStep('reset');
      toast.info("Tiklash kodi elektron pochtangizga yuborildi.");
    } catch {
      setErrorMsg("Xatolik yuz berdi. Pochtani tekshirib qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setErrorMsg("Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg("Parollar bir-biriga mos kelmadi.");
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const ok = await resetPassword(email, code, newPassword);
      if (ok) {
        setStep('success');
        toast.success("Parol muvaffaqiyatli yangilandi!");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Kiritilgan tiklash kodi noto'g'ri yoki muddati tugagan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <KeyRound className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Parolni Qayta Tiklash
            </h2>
            <p className="text-xs text-slate-400">
              {step === 'request' && "Elektron pochtangizni kiriting, biz tasdiqlash kodini yuboramiz."}
              {step === 'reset' && "Kodni va yangi maxfiy parolingizni kiriting."}
              {step === 'success' && "Parolingiz muvaffaqiyatli o'zgartirildi."}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'request' && (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Elektron Pochta:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nomingiz@mail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Yuborilmoqda...' : 'Tiklash Kodini Olish'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-cyan-300 font-mono text-center">
                ✉️ Emailingizga yuborilgan 6 xonali kodni kiriting
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  6 Xonali Tasdiqlash Kodi:
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="849201"
                  className="w-full text-center tracking-[0.3em] font-mono py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-lg focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Yangi Parol:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Kamida 6 ta belgi"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Parolni Qayta Kiriting:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Qayta kiriting"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Saqlanmoqda...' : 'Yangi Parolni Saqlash'}
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="text-xs text-slate-300">
                Endi yangi parolingiz bilan Fentoph tizimiga bemalol kirishingiz mumkin.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-colors"
              >
                Kirish Sahifasiga O'tish
              </button>
            </div>
          )}

          <div className="pt-2 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kirish sahifasiga qaytish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

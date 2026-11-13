import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User as UserIcon, 
  AtSign, 
  ArrowRight, 
  Eye, 
  EyeOff,
  AlertCircle,
  Check
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { navigate } = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const toast = useToast();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !email.trim() || !password) {
      setErrorMsg("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    if (username.length < 3) {
      setErrorMsg("Username kamida 3 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Kiritilgan parollar bir-biriga mos kelmadi.");
      return;
    }

    if (!termsAccepted) {
      setErrorMsg("Davom etish uchun Foydalanish shartlariga rozilik bildiring.");
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const ok = await register({
        name,
        username,
        email,
        password,
        termsAccepted
      });

      if (ok) {
        toast.info("Elektron pochtangizga tasdiqlash kodi yuborildi!");
        navigate('/verify-email');
      }
    } catch {
      setErrorMsg("Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Google orqali Fentoph hisobingiz yaratildi!");
      navigate('/dashboard');
    } catch {
      toast.error("Google orqali ro'yxatdan o'tishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-[#0b1320] rounded-[10px] flex items-center justify-center">
                <img src="/images/favicon.svg" alt="Fentoph" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <span className="text-2xl font-black text-white font-mono">FENTOPH ID</span>
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            Yangi Fentoph Hisobini Ochish
          </h2>
          <p className="text-xs text-slate-400">
            Finilya, EskiBozor, Fsent va Phentist ekotizimiga kirish uchun yagona hisob.
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  To'liq Ism (Name):
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sardor Aliyev"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Username:
                </label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="sardor_dev"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Elektron Pochta Manzili (Email):
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nomingiz@mail.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Parol:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Kamida 6 ta belgi"
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Parolni Qayta Kiriting:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Qayta kiriting"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="accent-cyan-500 rounded mt-0.5"
                />
                <span>
                  Men Fentoph{' '}
                  <button 
                    type="button"
                    onClick={() => navigate('/terms')}
                    className="text-cyan-400 hover:underline"
                  >
                    Foydalanish Shartlari
                  </button>{' '}
                  va{' '}
                  <button 
                    type="button"
                    onClick={() => navigate('/privacy')}
                    className="text-cyan-400 hover:underline"
                  >
                    Maxfiylik Siyosati
                  </button>
                  ga roziman.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              {isLoading ? 'Hisob yaratilmoqda...' : 'Fentoph Hisobini Ochish'}
            </button>
          </form>

          {/* Social Register Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-[#0b1320] px-3 text-[11px] text-slate-500 uppercase font-mono">yoki</span>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google orqali ro'yxatdan o'tish
          </button>

          {/* Login Link */}
          <div className="text-center text-xs text-slate-400 pt-2">
            Allaqachon hisobingiz bormi?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline ml-1"
            >
              Tizimga kirish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

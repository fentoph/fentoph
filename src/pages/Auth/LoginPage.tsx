import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  EyeOff,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const { login, loginWithGoogle, loginAsDemoUser } = useAuth();
  const toast = useToast();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername.trim() || !password) {
      setErrorMsg("Iltimos, email/username va parolni kiriting.");
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const ok = await login(emailOrUsername, password, rememberMe);
      if (ok) {
        toast.success("Fentoph hisobingizga muvaffaqiyatli kirdingiz!");
        navigate('/dashboard');
      } else {
        setErrorMsg("Email yoki parol noto'g'ri.");
      }
    } catch {
      setErrorMsg("Tizimga kirishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Google hisobi orqali muvaffaqiyatli kirdingiz!");
      navigate('/dashboard');
    } catch {
      toast.error("Google orqali kirishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'user' | 'admin') => {
    loginAsDemoUser(role);
    toast.info(`Demo hisob faollashtirildi (${role === 'admin' ? 'Administrator' : 'Foydalanuvchi'})`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        
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
            Fentoph Hisobingizga Kiring
          </h2>
          <p className="text-xs text-slate-400">
            Finilya, EskiBozor, Fsent va Phentist-ga yagona xavfsiz kalit.
          </p>
        </div>

        {/* Demo Fast Logins Bar - strictly isolated to local development */}
        {import.meta.env.DEV && (
          <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2 text-center">
            <span className="text-[10px] font-mono uppercase text-amber-400 block font-semibold">⚠️ Lokal Sinov Rejimi (Faqat Dev Muhitida):</span>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Dev Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('user')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
              >
                Dev User
              </button>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Elektron pochta yoki Username:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="nomingiz@mail.com yoki jasur_dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-slate-300">Parol:</label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Parolni unutdingizmi?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-cyan-500 rounded"
                />
                Meni eslab qol
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              {isLoading ? 'Tekshirilmoqda...' : 'Kirish (Sign In)'}
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-[#0b1320] px-3 text-[11px] text-slate-500 uppercase font-mono">yoki</span>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google orqali kirish
          </button>

          {/* Create Account Link */}
          <div className="text-center text-xs text-slate-400 pt-2">
            Hisobingiz yo'qmi?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline ml-1"
            >
              Fentoph hisobi ochish
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

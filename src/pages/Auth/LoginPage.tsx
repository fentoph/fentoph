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
  AlertCircle,
  KeyRound,
  UserCheck,
  CheckCircle2,
  Globe
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const { login, loginWithGoogle, loginWithFentophId, loginAsDemoUser } = useAuth();
  const toast = useToast();

  const [loginMethod, setLoginMethod] = useState<'fentoph_id' | 'email_username'>('fentoph_id');
  const [fentophIdInput, setFentophIdInput] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFentophIdSso = async () => {
    setIsLoading(true);
    try {
      await loginWithFentophId();
    } catch (err: any) {
      toast.error(err?.message || "Fentoph ID bilan bog'lanishda xatolik yuz berdi.");
      setIsLoading(false);
    }
  };

  const activeIdentifier = loginMethod === 'fentoph_id' 
    ? (fentophIdInput.startsWith('FP-') ? fentophIdInput : `FP-${fentophIdInput.replace(/[^0-9]/g, '')}`)
    : emailOrUsername;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const identifierToSubmit = loginMethod === 'fentoph_id' ? activeIdentifier : emailOrUsername;

    if (!identifierToSubmit.trim() || !password) {
      setErrorMsg(loginMethod === 'fentoph_id' 
        ? "Iltimos, Fentoph ID raqamingiz va parolingizni kiriting." 
        : "Iltimos, email/username va parolingizni kiriting.");
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const ok = await login(identifierToSubmit.trim(), password, rememberMe);
      if (ok) {
        toast.success("Fentoph hisobingizga muvaffaqiyatli kirdingiz!");
        navigate('/dashboard');
      } else {
        setErrorMsg(loginMethod === 'fentoph_id' 
          ? "Kiritilgan Fentoph ID yoki parol noto'g'ri." 
          : "Elektron pochta/username yoki parol noto'g'ri.");
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#050811]">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-indigo-600/15 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-0.5 shadow-xl shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080d16] rounded-[14px] flex items-center justify-center">
                <img src="/images/favicon.svg" alt="Fentoph" className="w-7 h-7 object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white font-mono block leading-none">FENTOPH ID</span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Universal SSO Portal</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight pt-1">
            Yagona Fentoph Ekotizimiga Kirish
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Finilya, EskiBozor, Fsent va Phentist xizmatlariga yagona xavfsiz kalit.
          </p>
        </div>

        {/* Demo Fast Logins Bar (Isolated strictly to local dev) */}
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
        <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-2xl space-y-5">
          
          {/* Fentoph ID Official SSO Action */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-cyan-950/40 border border-cyan-500/35 shadow-lg space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[11px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                  Rasmiy SSO Autentifikatsiya
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">fentophid.vercel.app</span>
            </div>

            <button
              type="button"
              onClick={handleFentophIdSso}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group"
            >
              <div className="w-6 h-6 rounded-lg bg-white/10 p-0.5 flex items-center justify-center">
                <img src="/images/favicon.svg" alt="Fentoph ID" className="w-4 h-4 object-contain filter drop-shadow group-hover:scale-110 transition-transform" />
              </div>
              <span>Fentoph ID Bilan Kirish (1-Click SSO)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Barcha Fentoph servislari uchun yagona, xavfsiz va 2FA bilan himoyalangan hisob
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-[#090f1a] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest whitespace-nowrap">
              yoki login/parol orqali
            </span>
            <div className="border-t border-slate-800 w-full"></div>
          </div>

          {/* Method Tabs: Fentoph ID vs Email/Username */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('fentoph_id');
                setErrorMsg('');
              }}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'fentoph_id'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Fentoph ID orqali</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginMethod('email_username');
                setErrorMsg('');
              }}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                loginMethod === 'email_username'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email / Username</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input by Login Method */}
            {loginMethod === 'fentoph_id' ? (
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Fentoph ID Raqamingiz:
                </label>
                <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden focus-within:border-cyan-500 transition-colors">
                  <span className="px-3.5 py-2.5 bg-slate-900 border-r border-slate-800 text-cyan-400 font-mono text-xs font-bold select-none">
                    FP-
                  </span>
                  <input
                    type="text"
                    required
                    value={fentophIdInput.replace(/^FP-/i, '')}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
                      setFentophIdInput(`FP-${val}`);
                    }}
                    placeholder="894210"
                    className="w-full px-3 py-2.5 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none font-mono tracking-wider"
                  />
                  <div className="pr-3 text-[10px] font-mono text-slate-500 uppercase select-none">
                    SSO
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Masalan: <span className="font-mono text-cyan-400">FP-894210</span> (Profil yoki ro'yxatdan o'tganda berilgan ID)
                </p>
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Elektron Pochta yoki Username:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="nomingiz@mail.com yoki username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Maxfiy Parol:</label>
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
            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
                <span>Meni eslab qol</span>
              </label>

              <span className="text-[11px] font-mono text-slate-500">
                scrypt shifrlangan
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Tekshirilmoqda...</span>
                </>
              ) : (
                <>
                  <span>{loginMethod === 'fentoph_id' ? 'Fentoph ID Bilan Kirish' : 'Tizimga Kirish'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-[#090f1a] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              yoki
            </span>
            <div className="border-t border-slate-800 w-full"></div>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google orqali davom etish</span>
          </button>

        </div>

        {/* Register CTA */}
        <div className="text-center text-xs text-slate-400">
          Fentoph hisobingiz yo'qmi?{' '}
          <a
            href="https://fentophid.vercel.app/signup"
            className="text-cyan-400 font-bold hover:underline"
          >
            Yangi Fentoph ID ochish
          </a>
        </div>

        {/* Security Assurance Badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fentoph Zero-Knowledge Xavfsizlik Arxitekturasi</span>
        </div>

      </div>
    </div>
  );
};

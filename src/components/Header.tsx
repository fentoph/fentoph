import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  ChevronDown, 
  LayoutDashboard, 
  Wallet, 
  ShoppingBag, 
  MessageSquare, 
  Cpu, 
  ArrowRight,
  Globe,
  Building2,
  BookOpen,
  Users,
  Briefcase,
  PhoneCall,
  FileText
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAi: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAi }) => {
  const { currentPath, navigate } = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
        setProductsDropdownOpen(false);
        setSolutionsDropdownOpen(false);
        setCompanyDropdownOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setProductsDropdownOpen(false);
    setSolutionsDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setLangDropdownOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  const PRODUCTS_MENU = [
    {
      id: 'finilya',
      name: 'Finilya OS',
      desc: 'Aqlli korporativ moliya va kassa hisoboti',
      badge: 'Fintech',
      icon: <Wallet className="w-4 h-4 text-emerald-400" />,
      color: 'hover:border-emerald-500/40 hover:bg-emerald-500/5',
      href: '/products/finilya'
    },
    {
      id: 'eskibozor',
      name: 'EskiBozor',
      desc: 'AI narx monitoringli intellektual bozor',
      badge: 'Marketplace',
      icon: <ShoppingBag className="w-4 h-4 text-amber-400" />,
      color: 'hover:border-amber-500/40 hover:bg-amber-500/5',
      href: '/products/eskibozor'
    },
    {
      id: 'fsent',
      name: 'Fsent',
      desc: 'Signal Double Ratchet shifrlangan maxfiy aloqa',
      badge: 'Zero-Knowledge',
      icon: <MessageSquare className="w-4 h-4 text-blue-400" />,
      color: 'hover:border-blue-500/40 hover:bg-blue-500/5',
      href: '/products/fsent'
    },
    {
      id: 'phentist',
      name: 'Phentist AI',
      desc: 'O\'zbek tili uchun maxsus avtonom agentlar',
      badge: 'LLM Core',
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      color: 'hover:border-purple-500/40 hover:bg-purple-500/5',
      href: '/products/phentist'
    },
    {
      id: 'fentoph-cloud',
      name: 'Fentoph ID',
      desc: 'Yagona xavfsiz OAuth 2.0 PKCE SSO tizimi',
      badge: 'Identity',
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
      color: 'hover:border-cyan-500/40 hover:bg-cyan-500/5',
      href: '/products/fentoph-cloud'
    }
  ];

  const SOLUTIONS_MENU = [
    {
      id: 'fintech',
      title: 'Raqamli Moliya & Banking',
      desc: 'Bank hisoblari, byudjet va P&L avtomatizatsiyasi',
      href: '/solutions'
    },
    {
      id: 'commerce',
      title: 'E-Commerce & Savdo AI',
      desc: 'Aqlli narx belgilash va raqobat tahlili',
      href: '/solutions'
    },
    {
      id: 'privacy',
      title: 'Maxfiy Aloqa & Kiberhimoya',
      desc: 'Zero-Knowledge shifrlangan korporativ aloqa',
      href: '/solutions'
    },
    {
      id: 'agents',
      title: 'Korporativ AI Agentlar',
      desc: 'Mustaqil qaror qabul qiluvchi neyro-tizimlar',
      href: '/solutions'
    }
  ];

  const COMPANY_MENU = [
    {
      title: 'Biz haqimizda',
      desc: 'Fentoph tarixi, qadriyatlari va jamoasi',
      icon: <Users className="w-4 h-4 text-cyan-400" />,
      href: '/about'
    },
    {
      title: 'Yangiliklar & Blog',
      desc: 'Texnik maqolalar va muhandislik jurnali',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      href: '/blog'
    },
    {
      title: 'Karyera Markazi',
      desc: 'Fentoph jamoasiga qo\'shiling',
      icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
      href: '/careers'
    },
    {
      title: 'Aloqa & Ofis',
      desc: 'Xiva bosh ofisi va muhandislar bilan bog\'lanish',
      icon: <PhoneCall className="w-4 h-4 text-amber-400" />,
      href: '/contact'
    },
    {
      title: 'Xavfsizlik Markazi',
      desc: 'Zero-knowledge va shifrlash kafolatlari',
      icon: <ShieldCheck className="w-4 h-4 text-purple-400" />,
      href: '/security'
    }
  ];

  const LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#050811]/92 border-b border-slate-800/80 transition-colors duration-200" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo */}
          <div 
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#080d16] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/favicon.svg" 
                  alt="Fentoph" 
                  className="w-4.5 h-4.5 object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" 
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-white font-mono">
                FENTOPH
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                2026
              </span>
            </div>
          </div>

          {/* Center: Clean & Streamlined Desktop Navigation (Only 6 Items) */}
          <nav className="hidden lg:flex items-center gap-1 font-sans">
            
            {/* 1. Mahsulotlar (Mega-Menu) */}
            <div className="relative">
              <button
                onClick={() => {
                  setProductsDropdownOpen(!productsDropdownOpen);
                  setSolutionsDropdownOpen(false);
                  setCompanyDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  productsDropdownOpen || isActive('/products')
                    ? 'text-white bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span>{t('nav.products')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute left-0 mt-3 w-[440px] rounded-3xl bg-[#0a101d]/98 border border-slate-700/80 shadow-2xl p-3.5 space-y-1.5 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="uppercase tracking-wider">Ekotizim Mahsulotlari</span>
                    <button 
                      onClick={() => handleNav('/products')} 
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold text-xs"
                    >
                      Barchasi <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-1 pt-1">
                    {PRODUCTS_MENU.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => handleNav(prod.href)}
                        className={`w-full flex items-center gap-3 p-2 rounded-2xl border border-transparent transition-all text-left ${prod.color}`}
                      >
                        <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex-shrink-0">
                          {prod.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-cyan-300">{prod.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              {prod.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{prod.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Yechimlar (Solutions) */}
            <div className="relative">
              <button
                onClick={() => {
                  setSolutionsDropdownOpen(!solutionsDropdownOpen);
                  setProductsDropdownOpen(false);
                  setCompanyDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  solutionsDropdownOpen || isActive('/solutions')
                    ? 'text-white bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span>{t('nav.solutions')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute left-0 mt-3 w-80 rounded-3xl bg-[#0a101d]/98 border border-slate-700/80 shadow-2xl p-3 space-y-1 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Sanoat Yechimlari
                  </div>
                  {SOLUTIONS_MENU.map((sol) => (
                    <button
                      key={sol.id}
                      onClick={() => handleNav(sol.href)}
                      className="w-full p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors text-left group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 flex items-center justify-between">
                        <span>{sol.title}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{sol.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Portfolio (Direct) */}
            <button
              onClick={() => handleNav('/portfolio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive('/portfolio')
                  ? 'text-cyan-400 bg-slate-800/80 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t('nav.portfolio')}
            </button>

            {/* 4. Asoschi (Direct) */}
            <button
              onClick={() => handleNav('/founder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive('/founder') || isActive('/asoschi')
                  ? 'text-cyan-400 bg-slate-800/80 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t('nav.founder')}
            </button>

            {/* 5. Kompaniya (Grouped Dropdown) */}
            <div className="relative">
              <button
                onClick={() => {
                  setCompanyDropdownOpen(!companyDropdownOpen);
                  setProductsDropdownOpen(false);
                  setSolutionsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  companyDropdownOpen || isActive('/about') || isActive('/blog') || isActive('/careers') || isActive('/contact')
                    ? 'text-white bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span>{t('nav.company')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {companyDropdownOpen && (
                <div className="absolute left-0 mt-3 w-72 rounded-3xl bg-[#0a101d]/98 border border-slate-700/80 shadow-2xl p-2.5 space-y-1 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Kompaniya va Jamiyat
                  </div>
                  {COMPANY_MENU.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNav(item.href)}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800/70 transition-colors text-left group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300">{item.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Hujjatlar (Docs) */}
            <button
              onClick={() => handleNav('/docs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive('/docs')
                  ? 'text-cyan-400 bg-slate-800/80 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t('nav.docs')}
            </button>

          </nav>

          {/* Right: Language Switcher, AI, Theme, Auth */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Language Switcher (i18n Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-colors"
                title="Tilni tanlash / Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#0a101d] border border-slate-700 shadow-2xl p-1.5 space-y-1 z-50">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-left transition-colors ${
                        language === lang.code
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Assistant Quick Pill */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:from-blue-600/30 hover:to-cyan-500/30 text-xs font-semibold transition-all shadow-sm"
              title="Fentoph AI Yordamchisi"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span className="hidden md:inline">{t('nav.aiAssistant')}</span>
              <span className="md:hidden">AI</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Rejimni almashtirish"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-lg object-cover border border-cyan-500/30"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white leading-none line-clamp-1">{user.fullName.split(' ')[0]}</span>
                    <span className="text-[10px] text-cyan-400 font-mono leading-none mt-0.5">{user.fentophId}</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#0a101d] border border-slate-700 shadow-2xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-100 z-50">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="text-xs font-bold text-white truncate">{user.fullName}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                    </div>

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                      {t('nav.dashboard')}
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleNav('/admin')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:bg-slate-800 text-left"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        {t('nav.admin')}
                      </button>
                    )}

                    <div className="border-t border-slate-800/80 my-1"></div>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 text-left"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  {t('nav.signIn')}
                </button>
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Fentoph ID</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => {
                const nextLang: Language = language === 'uz' ? 'en' : language === 'en' ? 'ru' : 'uz';
                setLanguage(nextLang);
              }}
              className="p-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 font-bold uppercase"
            >
              {language}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#090f1a]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: t('nav.products'), href: '/products' },
              { label: t('nav.solutions'), href: '/solutions' },
              { label: t('nav.portfolio'), href: '/portfolio' },
              { label: t('nav.founder'), href: '/founder' },
              { label: t('nav.about'), href: '/about' },
              { label: t('nav.blog'), href: '/blog' },
              { label: t('nav.careers'), href: '/careers' },
              { label: t('nav.contact'), href: '/contact' },
              { label: t('nav.docs'), href: '/docs' },
              { label: t('nav.security'), href: '/security' },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left ${
                  isActive(link.href)
                    ? 'bg-blue-600/20 text-cyan-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAi();
                }}
                className="px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI
              </button>
            </div>

            {isAuthenticated && user ? (
              <button
                onClick={() => handleNav('/dashboard')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> {t('nav.dashboard')}
              </button>
            ) : (
              <button
                onClick={() => handleNav('/login')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
              >
                Fentoph ID Kirish
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

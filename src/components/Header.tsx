import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  ShieldCheck, 
  User as UserIcon, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Users, 
  Briefcase, 
  PhoneCall, 
  FileText,
  LogOut,
  Settings,
  ChevronDown,
  LayoutDashboard,
  Wallet,
  ShoppingBag,
  MessageSquare,
  Cpu,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAi: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAi }) => {
  const { currentPath, navigate } = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
        setProductsDropdownOpen(false);
        setSolutionsDropdownOpen(false);
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
  };

  const isActive = (href: string) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  const PRODUCTS_MENU = [
    {
      id: 'finilya',
      name: 'Finilya',
      desc: 'Aqlli korporativ moliya va hisob-kitoblar OS',
      badge: 'Fintech',
      icon: <Wallet className="w-5 h-5 text-emerald-400" />,
      color: 'hover:border-emerald-500/40 hover:bg-emerald-500/5',
      href: '/products/finilya'
    },
    {
      id: 'eskibozor',
      name: 'EskiBozor',
      desc: 'AI narx tahlilli intellektual savdo platformasi',
      badge: 'Marketplace',
      icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
      color: 'hover:border-amber-500/40 hover:bg-amber-500/5',
      href: '/products/eskibozor'
    },
    {
      id: 'fsent',
      name: 'Fsent',
      desc: 'Signal Double Ratchet shifrlangan korporativ aloqa',
      badge: 'Secure Chat',
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
      color: 'hover:border-blue-500/40 hover:bg-blue-500/5',
      href: '/products/fsent'
    },
    {
      id: 'phentist',
      name: 'Phentist AI',
      desc: 'Avtonom LLM neyro-agentlar laboratoriyasi',
      badge: 'AI Core',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      color: 'hover:border-purple-500/40 hover:bg-purple-500/5',
      href: '/products/phentist'
    },
    {
      id: 'fentoph-cloud',
      name: 'Fentoph ID',
      desc: 'Yagona xavfsiz autentifikatsiya va SSO tizimi',
      badge: 'Identity',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
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
      desc: 'Aqlli narx belgilash va talab monitoringi',
      href: '/solutions'
    },
    {
      id: 'privacy',
      title: 'Maxfiy Aloqa & Kiberhimoya',
      desc: 'Zero-knowledge shifrlangan messenjer',
      href: '/solutions'
    },
    {
      id: 'agents',
      title: 'Korporativ AI Agentlar',
      desc: 'Mustaqil qaror qabul qiluvchi neyro-tizimlar',
      href: '/solutions'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#050811]/90 border-b border-slate-800/80 transition-colors duration-200" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo */}
          <div 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#080d16] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/favicon.svg" 
                  alt="Fentoph" 
                  className="w-5 h-5 object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 font-mono">
                FENTOPH
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  2026
                </span>
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation with Mega-Menus */}
          <nav className="hidden lg:flex items-center gap-1">
            
            {/* Products Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProductsDropdownOpen(!productsDropdownOpen);
                  setSolutionsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  productsDropdownOpen || isActive('/products')
                    ? 'text-white bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute left-0 mt-3 w-[460px] rounded-3xl bg-[#0a101d]/98 border border-slate-700/80 shadow-2xl p-4 space-y-2 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="uppercase tracking-wider">Fentoph Ekotizim Mahsulotlari</span>
                    <button 
                      onClick={() => handleNav('/products')} 
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      Barchasi <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {PRODUCTS_MENU.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => handleNav(prod.href)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-2xl border border-transparent transition-all text-left ${prod.color}`}
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

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSolutionsDropdownOpen(!solutionsDropdownOpen);
                  setProductsDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  solutionsDropdownOpen || isActive('/solutions')
                    ? 'text-white bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span>Solutions</span>
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

            {/* Direct Links */}
            {[
              { label: 'Blog', href: '/blog' },
              { label: 'About', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Contact', href: '/contact' },
              { label: 'Docs', href: '/docs' },
            ].map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'text-white bg-slate-800/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Quick Search, AI Assistant, Theme, Auth */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Universal Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 transition-colors shadow-sm"
              title="Qidiruv (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Qidiruv...</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:from-blue-600/30 hover:to-cyan-500/30 text-xs font-semibold transition-all shadow-sm"
              title="Fentoph AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span>AI</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Rejimni almashtirish"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
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
                      Dashboard
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleNav('/admin')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:bg-slate-800 text-left"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        Admin Panel
                      </button>
                    )}

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white text-left"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Sozlamalar & Xavfsizlik
                    </button>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Chiqish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Create account
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#090f1a]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Products', href: '/products' },
              { label: 'Solutions', href: '/solutions' },
              { label: 'Blog', href: '/blog' },
              { label: 'About', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Contact', href: '/contact' },
              { label: 'Docs', href: '/docs' },
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
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAi();
                }}
                className="px-3.5 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Assistant
              </button>
            </div>

            {isAuthenticated && user ? (
              <button
                onClick={() => handleNav('/dashboard')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Sign in
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
                >
                  Create account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

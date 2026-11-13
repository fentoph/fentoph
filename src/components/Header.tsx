import React, { useState } from 'react';
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
  LayoutDashboard
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

  const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Docs', href: '/docs' },
  ];

  const handleNav = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#080d16]/85 border-b border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo */}
          <div 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b1320] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/favicon.svg" 
                  alt="Fentoph" 
                  className="w-5 h-5 object-contain filter drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 font-mono">
                FENTOPH
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  2026
                </span>
              </span>
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'text-white bg-slate-800/80 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Theme, Auth */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Universal Search trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              title="Qidiruv (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Qidiruv...</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40 text-xs font-medium transition-all"
              title="Fentoph AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
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
                    <span className="text-xs font-semibold text-white leading-none line-clamp-1">{user.fullName.split(' ')[0]}</span>
                    <span className="text-[10px] text-cyan-400 font-mono leading-none mt-0.5">{user.fentophId}</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0d1522] border border-slate-700 shadow-2xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-100 z-50">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="text-xs font-bold text-white truncate">{user.fullName}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                    </div>

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                      Dashboard
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleNav('/admin')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-cyan-300 hover:bg-slate-800 text-left"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        Admin Panel
                      </button>
                    )}

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white text-left"
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
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/40 text-left"
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
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-1.5"
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
        <div className="lg:hidden border-b border-slate-800 bg-[#090f1a]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-left ${
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
                className="px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Assistant
              </button>
            </div>

            {isAuthenticated && user ? (
              <button
                onClick={() => handleNav('/dashboard')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Sign in
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs"
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

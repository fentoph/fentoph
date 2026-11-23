import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { SEO } from './components/SEO';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsCatalogPage } from './pages/Products/ProductsCatalogPage';
import { ProductDetailPage } from './pages/Products/ProductDetailPage';
import { SolutionsCatalogPage } from './pages/Solutions/SolutionsCatalogPage';
import { SolutionDetailPage } from './pages/Solutions/SolutionDetailPage';
import { BlogCatalogPage } from './pages/Blog/BlogCatalogPage';
import { BlogPostPage } from './pages/Blog/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { SecurityPage } from './pages/SecurityPage';
import { DocsPage } from './pages/Docs/DocsPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { VerifyEmailPage } from './pages/Auth/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { FentophCallbackPage } from './pages/Auth/FentophCallbackPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/Admin/AdminPage';
import { LegalPage } from './pages/Legal/LegalPage';
import { FounderPage } from './pages/FounderPage';
import { PortfolioPage } from './pages/PortfolioPage';

import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPath, routeInfo } = useRouter();

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');

  const handleOpenSearchWithQuery = (q: string) => {
    setSearchInitialQuery(q);
    setIsSearchOpen(true);
  };

  const handleOpenAiWithPrompt = (p: string) => {
    setAiInitialPrompt(p);
    setIsAiOpen(true);
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Route Dispatcher
  const renderRoute = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onOpenSearchWithQuery={handleOpenSearchWithQuery}
          onOpenAiWithPrompt={handleOpenAiWithPrompt}
        />
      );
    }

    // Products
    if (currentPath.startsWith('/products')) {
      if (routeInfo.params.id) {
        return <ProductDetailPage productId={routeInfo.params.id} />;
      }
      return <ProductsCatalogPage />;
    }

    // Solutions
    if (currentPath.startsWith('/solutions')) {
      if (routeInfo.params.id) {
        return <SolutionDetailPage solutionId={routeInfo.params.id} />;
      }
      return <SolutionsCatalogPage />;
    }

    // Blog
    if (currentPath.startsWith('/blog')) {
      if (routeInfo.params.slug) {
        return <BlogPostPage slug={routeInfo.params.slug} />;
      }
      return <BlogCatalogPage />;
    }

    // Docs
    if (currentPath.startsWith('/docs')) {
      return <DocsPage currentDocId={routeInfo.params.id} />;
    }

    // Auth Routes
    if (currentPath === '/login') return <LoginPage />;
    if (currentPath === '/register') return <RegisterPage />;
    if (currentPath === '/verify-email') return <VerifyEmailPage />;
    if (currentPath === '/forgot-password') return <ForgotPasswordPage />;
    if (currentPath === '/auth/fentoph-callback' || currentPath === '/auth/callback') return <FentophCallbackPage />;

    // Protected & SaaS Portals
    if (currentPath === '/dashboard') return <DashboardPage />;
    if (currentPath === '/admin') return <AdminPage />;

    // General Company Pages
    if (currentPath === '/founder' || currentPath === '/asoschi') return <FounderPage />;
    if (currentPath === '/portfolio') return <PortfolioPage />;
    if (currentPath === '/about') return <AboutPage setActiveTab={() => {}} />;
    if (currentPath === '/careers') return <CareersPage />;
    if (currentPath === '/contact') return <ContactPage />;
    if (currentPath === '/security') return <SecurityPage />;

    // Legal Pages
    if (currentPath === '/privacy') return <LegalPage type="privacy" />;
    if (currentPath === '/terms') return <LegalPage type="terms" />;
    if (currentPath === '/cookies') return <LegalPage type="cookies" />;

    // Default Fallback
    return (
      <HomePage
        onOpenSearchWithQuery={handleOpenSearchWithQuery}
        onOpenAiWithPrompt={handleOpenAiWithPrompt}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b12] text-slate-100 transition-colors duration-200">
      <SEO />

      {/* Main Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Main Render View */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInitialQuery}
      />

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialPrompt={aiInitialPrompt}
      />

      {/* Floating Bottom AI Quick Launcher */}
      {!isAiOpen && (
        <button
          onClick={() => setIsAiOpen(true)}
          className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          title="Fentoph AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide pr-1">
            AI Assistant
          </span>
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <RouterProvider>
              <AppContent />
            </RouterProvider>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

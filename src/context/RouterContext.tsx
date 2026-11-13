import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouteInfo {
  path: string;
  params: Record<string, string>;
  searchParams: URLSearchParams;
}

interface RouterContextType {
  currentPath: string;
  routeInfo: RouteInfo;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Helper to parse path and extract params
const parseRoute = (pathname: string): RouteInfo => {
  const [cleanPath, search] = pathname.split('?');
  const searchParams = new URLSearchParams(search || '');
  const params: Record<string, string> = {};

  // Pattern matching for routes with params:
  // /products/:id
  if (cleanPath.startsWith('/products/') && cleanPath.length > '/products/'.length) {
    params.id = cleanPath.substring('/products/'.length);
  }
  // /solutions/:id
  if (cleanPath.startsWith('/solutions/') && cleanPath.length > '/solutions/'.length) {
    params.id = cleanPath.substring('/solutions/'.length);
  }
  // /blog/:slug
  if (cleanPath.startsWith('/blog/') && cleanPath.length > '/blog/'.length) {
    params.slug = cleanPath.substring('/blog/'.length);
  }
  // /docs/:id
  if (cleanPath.startsWith('/docs/') && cleanPath.length > '/docs/'.length) {
    params.id = cleanPath.substring('/docs/'.length);
  }

  return {
    path: cleanPath || '/',
    params,
    searchParams
  };
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [routeInfo, setRouteInfo] = useState<RouteInfo>(() => {
    return parseRoute(window.location.pathname + window.location.search);
  });

  useEffect(() => {
    const handlePopState = () => {
      const pathWithSearch = window.location.pathname + window.location.search;
      setCurrentPath(window.location.pathname);
      setRouteInfo(parseRoute(pathWithSearch));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    const [path] = to.split('?');
    setCurrentPath(path);
    setRouteInfo(parseRoute(to));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, routeInfo, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

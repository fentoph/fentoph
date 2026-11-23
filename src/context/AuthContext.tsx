import React, { createContext, useContext, useEffect, useState } from 'react';
import { FentophUser, SavedItem, UserNotification, UserSession } from '../types';
import { apiClient, getStoredToken, setStoredToken } from '../services/apiClient';
import { initiateFentophIdLogin, exchangeFentophIdCode } from '../services/fentophIdAuth';

interface RegisterInput {
  name: string;
  username: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

interface AuthContextType {
  user: FentophUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  pendingVerificationEmail: string | null;
  register: (input: RegisterInput) => Promise<boolean>;
  login: (emailOrUsername: string, pass: string, rememberMe?: boolean) => Promise<boolean>;
  loginWithCorporateFentophId: (identifier: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFentophId: () => Promise<void>;
  handleFentophOAuthCallback: (code: string, state: string) => Promise<boolean>;
  loginAsDemoUser: (role?: 'user' | 'admin') => Promise<void>;
  verifyEmail: (code: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (email: string, code: string, newPass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<FentophUser, 'fullName' | 'username' | 'phone' | 'bio' | 'avatar'>>) => Promise<void>;
  updatePreferences: (prefs: Partial<FentophUser['preferences']>) => Promise<void>;
  changePassword: (oldPass: string, newPass: string) => Promise<boolean>;
  toggleTwoFactor: () => Promise<void>;
  toggleConnectedService: (service: 'finilya' | 'eskibozor' | 'fsent' | 'phentist' | 'google' | 'github') => void;
  createApiKey: (name: string) => Promise<any>;
  revokeApiKey: (id: string) => Promise<void>;
  revokeSession: (id: string) => Promise<void>;
  saveItem: (item: Omit<SavedItem, 'id' | 'savedAt'>) => void;
  unsaveItem: (itemId: string) => void;
  markNotificationRead: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FentophUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(() => {
    return localStorage.getItem('fentoph_pending_email');
  });

  // Load user data on startup from backend if token or cookie exists
  const refreshUserData = async () => {
    try {
      const data = await apiClient.getMe();
      if (data && data.user) {
        // Fetch API keys as well
        const apiKeysRes = await apiClient.getApiKeys().catch(() => ({ keys: [] }));
        const formattedKeys = (apiKeysRes.keys || []).map((k: any) => ({
          id: k.id,
          name: k.name,
          key: `${k.prefix}••••••••••••••••`,
          createdAt: k.created_at.split(' ')[0],
          lastUsed: k.last_used_at || 'Hali ishlatilmadi',
          isRevoked: k.isRevoked
        }));

        setUser({
          ...data.user,
          apiKeys: formattedKeys,
          savedItems: JSON.parse(localStorage.getItem('fentoph_saved_items') || '[]')
        });
      }
    } catch {
      // Check if session user is cached (corporate portal login or client session)
      const cached = localStorage.getItem('fentoph_session_user');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setUser(prev => prev || {
            id: parsed.id || `fp_${Date.now()}`,
            fentophId: parsed.fentophId || `${parsed.username}@fmail.com`,
            fullName: parsed.fullName || parsed.username || 'Fentoph Foydalanuvchisi',
            username: parsed.username || 'fentoph_user',
            email: parsed.email || `${parsed.username}@fmail.com`,
            phone: parsed.phone || '',
            avatar: parsed.avatar || '/images/no_bg_favicon.png',
            role: parsed.role === 'Administrator' ? 'Administrator' : 'Foydalanuvchi',
            emailVerified: true,
            twoFactorEnabled: false,
            createdAt: parsed.createdAt || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            connectedServices: {
              finilya: true,
              eskibozor: true,
              fsent: true,
              phentist: true,
              google: false,
              github: false
            },
            preferences: {
              theme: 'dark',
              language: 'uz',
              emailNotifications: true,
              marketingEmails: false,
              timezone: 'Asia/Tashkent'
            },
            apiKeys: [],
            sessions: [],
            activities: [],
            savedItems: JSON.parse(localStorage.getItem('fentoph_saved_items') || '[]'),
            notifications: []
          });
          return;
        } catch {}
      }
      setStoredToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const register = async (input: RegisterInput): Promise<boolean> => {
    try {
      const res = await apiClient.register(input);
      if (res.sessionToken) {
        setStoredToken(res.sessionToken);
      }
      setPendingVerificationEmail(input.email);
      localStorage.setItem('fentoph_pending_email', input.email);
      await refreshUserData();
      return true;
    } catch (err: any) {
      console.error('Registration failed:', err);
      throw err;
    }
  };

  const loginWithCorporateFentophId = async (identifier: string, pass: string): Promise<boolean> => {
    try {
      const res = await apiClient.verifyCorporateFentophId(identifier, pass);
      if (res && res.success && res.user) {
        const userData: FentophUser = {
          id: res.user.id || `fp_${Date.now()}`,
          fentophId: res.user.fentophId || `${res.user.username}@fmail.com`,
          fullName: res.user.fullName || res.user.username,
          username: res.user.username,
          email: res.user.email || `${res.user.username}@fmail.com`,
          phone: '',
          avatar: res.user.avatar || '/images/no_bg_favicon.png',
          role: res.user.role === 'Administrator' ? 'Administrator' : 'Foydalanuvchi',
          emailVerified: true,
          twoFactorEnabled: false,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          connectedServices: {
            finilya: true,
            eskibozor: true,
            fsent: true,
            phentist: true,
            google: false,
            github: false
          },
          preferences: {
            theme: 'dark',
            language: 'uz',
            emailNotifications: true,
            marketingEmails: false,
            timezone: 'Asia/Tashkent'
          },
          apiKeys: [],
          sessions: [],
          activities: [],
          savedItems: JSON.parse(localStorage.getItem('fentoph_saved_items') || '[]'),
          notifications: []
        };

        setUser(userData);
        localStorage.setItem('fentoph_session_user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Corporate verify login failed:', err);
      throw err;
    }
  };

  const login = async (emailOrUsername: string, pass: string, _rememberMe = true): Promise<boolean> => {
    if (emailOrUsername.toLowerCase().includes('@fmail.com') || emailOrUsername.toLowerCase().includes('@')) {
      try {
        const corporateOk = await loginWithCorporateFentophId(emailOrUsername, pass);
        if (corporateOk) return true;
      } catch (corporateErr) {
        // If corporate verify specifically errored with 401/400, throw or continue to internal login
        console.warn('Corporate verify failed, falling back to local auth:', corporateErr);
      }
    }

    try {
      const res = await apiClient.login(emailOrUsername, pass);
      if (res.sessionToken) {
        setStoredToken(res.sessionToken);
      }
      await refreshUserData();
      return true;
    } catch (err: any) {
      // Fallback: try corporate verify if not attempted yet
      try {
        const corporateOk = await loginWithCorporateFentophId(emailOrUsername, pass);
        if (corporateOk) return true;
      } catch {}
      console.error('Login failed:', err);
      throw err;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const res = await apiClient.loginWithGoogle();
      if (res.sessionToken) {
        setStoredToken(res.sessionToken);
      }
      await refreshUserData();
      return true;
    } catch (err: any) {
      console.error('Google login failed:', err);
      throw err;
    }
  };

  const loginWithFentophId = async (): Promise<void> => {
    await initiateFentophIdLogin();
  };

  const handleFentophOAuthCallback = async (code: string, state: string): Promise<boolean> => {
    try {
      const res = await exchangeFentophIdCode(code, state);
      if (res.sessionToken) {
        setStoredToken(res.sessionToken);
      }
      if (res.user) {
        try {
          await refreshUserData();
        } catch {
          setUser({
            id: res.user.id,
            fentophId: res.user.fentoph_id || res.user.fentophId,
            fullName: res.user.fullName,
            username: res.user.username,
            email: res.user.email,
            phone: '',
            avatar: res.user.avatar || '/images/no_bg_favicon.png',
            role: res.user.role === 'ADMIN' ? 'Administrator' : 'Foydalanuvchi',
            emailVerified: true,
            twoFactorEnabled: false,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            connectedServices: {
              finilya: true,
              eskibozor: true,
              fsent: true,
              phentist: true,
              google: false,
              github: false
            },
            preferences: {
              theme: 'dark',
              language: 'uz',
              emailNotifications: true,
              marketingEmails: false,
              timezone: 'Asia/Tashkent'
            },
            apiKeys: [],
            sessions: [],
            activities: [],
            savedItems: [],
            notifications: []
          });
        }
      }
      return true;
    } catch (err: any) {
      console.error('Fentoph ID OAuth callback failed:', err);
      throw err;
    }
  };

  const loginAsDemoUser = async (role: 'user' | 'admin' = 'admin') => {
    // Strictly blocked in production environment
    if (!import.meta.env.DEV) {
      console.warn('Demo login is permanently disabled in production builds.');
      return;
    }
    try {
      if (role === 'admin') {
        await login('dev.admin@fentoph.local', 'DevAdminSecret2026!');
      } else {
        await login('dev.user@fentoph.local', 'DevUserSecret2026!');
      }
    } catch (err) {
      console.error('Demo login error:', err);
    }
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    try {
      const email = pendingVerificationEmail || user?.email || undefined;
      await apiClient.verifyEmail(code, email);
      setPendingVerificationEmail(null);
      localStorage.removeItem('fentoph_pending_email');
      if (user) {
        setUser({ ...user, emailVerified: true });
      }
      return true;
    } catch (err: any) {
      console.error('Email verification error:', err);
      throw err;
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      await apiClient.forgotPassword(email);
      return true;
    } catch (err) {
      console.error('Password reset request error:', err);
      throw err;
    }
  };

  const resetPassword = async (email: string, code: string, newPass: string): Promise<boolean> => {
    try {
      await apiClient.resetPassword(email, code, newPass);
      return true;
    } catch (err) {
      console.error('Password reset error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch {
      // Ignore
    } finally {
      setStoredToken(null);
      setUser(null);
    }
  };

  const updateProfile = async (data: Partial<Pick<FentophUser, 'fullName' | 'username' | 'phone' | 'bio' | 'avatar'>>) => {
    try {
      await apiClient.updateProfile(data);
      if (user) {
        setUser({ ...user, ...data });
      }
    } catch (err) {
      console.error('Update profile error:', err);
      throw err;
    }
  };

  const updatePreferences = async (prefs: Partial<FentophUser['preferences']>) => {
    if (!user) return;
    const updated = { ...user.preferences, ...prefs };
    try {
      await apiClient.updatePreferences(updated);
      setUser({ ...user, preferences: updated });
    } catch (err) {
      console.error('Update prefs error:', err);
    }
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    try {
      await apiClient.changePassword(oldPass, newPass);
      return true;
    } catch (err) {
      console.error('Change password error:', err);
      throw err;
    }
  };

  const toggleTwoFactor = async () => {
    if (!user) return;
    try {
      const res = await apiClient.toggleTwoFactor();
      setUser({ ...user, twoFactorEnabled: res.twoFactorEnabled });
    } catch (err) {
      console.error('Toggle 2FA error:', err);
    }
  };

  const toggleConnectedService = (service: 'finilya' | 'eskibozor' | 'fsent' | 'phentist' | 'google' | 'github') => {
    if (!user) return;
    setUser({
      ...user,
      connectedServices: {
        ...user.connectedServices,
        [service]: !user.connectedServices[service]
      }
    });
  };

  const createApiKey = async (name: string) => {
    if (!user) return null;
    try {
      const res = await apiClient.createApiKey(name);
      if (res.apiKey) {
        const newKeyEntry = {
          id: res.apiKey.id,
          name: res.apiKey.name,
          key: res.apiKey.plaintextKey, // Returned once!
          createdAt: res.apiKey.createdAt.split('T')[0],
          lastUsed: 'Hali ishlatilmadi'
        };
        setUser({
          ...user,
          apiKeys: [newKeyEntry, ...user.apiKeys]
        });
        return res.apiKey;
      }
    } catch (err) {
      console.error('Create API Key error:', err);
      throw err;
    }
  };

  const revokeApiKey = async (id: string) => {
    if (!user) return;
    try {
      await apiClient.revokeApiKey(id);
      setUser({
        ...user,
        apiKeys: user.apiKeys.filter(k => k.id !== id)
      });
    } catch (err) {
      console.error('Revoke API key error:', err);
      throw err;
    }
  };

  const revokeSession = async (id: string) => {
    if (!user) return;
    try {
      await apiClient.revokeSession(id);
      setUser({
        ...user,
        sessions: user.sessions.filter(s => s.id !== id)
      });
    } catch (err) {
      console.error('Revoke session error:', err);
      throw err;
    }
  };

  const saveItem = (item: Omit<SavedItem, 'id' | 'savedAt'>) => {
    if (!user) return;
    const newItem: SavedItem = {
      ...item,
      id: `sav_${Date.now()}`,
      savedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...(user.savedItems || [])];
    localStorage.setItem('fentoph_saved_items', JSON.stringify(updated));
    setUser({ ...user, savedItems: updated });
  };

  const unsaveItem = (itemId: string) => {
    if (!user) return;
    const updated = (user.savedItems || []).filter(i => i.id !== itemId);
    localStorage.setItem('fentoph_saved_items', JSON.stringify(updated));
    setUser({ ...user, savedItems: updated });
  };

  const markNotificationRead = async (id: string) => {
    if (!user) return;
    try {
      await apiClient.markNotificationRead(id);
      setUser({
        ...user,
        notifications: user.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      });
    } catch (err) {
      console.error('Mark notif read error:', err);
    }
  };

  const clearAllNotifications = async () => {
    if (!user) return;
    try {
      await apiClient.clearNotifications();
      setUser({
        ...user,
        notifications: user.notifications.map(n => ({ ...n, read: true }))
      });
    } catch (err) {
      console.error('Clear notifs error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'Administrator',
        isLoading,
        pendingVerificationEmail,
        register,
        login,
        loginWithCorporateFentophId,
        loginWithGoogle,
        loginWithFentophId,
        handleFentophOAuthCallback,
        loginAsDemoUser,
        verifyEmail,
        requestPasswordReset,
        resetPassword,
        logout,
        updateProfile,
        updatePreferences,
        changePassword,
        toggleTwoFactor,
        toggleConnectedService,
        createApiKey,
        revokeApiKey,
        revokeSession,
        saveItem,
        unsaveItem,
        markNotificationRead,
        clearAllNotifications,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

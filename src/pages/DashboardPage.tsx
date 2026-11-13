import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PRODUCTS_DATA } from '../data/products';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  Bell, 
  Link2, 
  Layers, 
  Bookmark, 
  Activity, 
  LogOut, 
  KeyRound, 
  Copy, 
  Trash2, 
  Plus, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Eye,
  Wallet,
  ShoppingBag,
  MessageSquare,
  Cpu,
  RefreshCw,
  Globe,
  Moon,
  Sun
} from 'lucide-react';

type DashboardTab = 
  | 'profile' 
  | 'settings' 
  | 'security' 
  | 'notifications' 
  | 'services' 
  | 'products' 
  | 'saved' 
  | 'activity';

export const DashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { 
    user, 
    logout, 
    updateProfile, 
    updatePreferences, 
    changePassword, 
    toggleTwoFactor, 
    toggleConnectedService, 
    createApiKey, 
    revokeApiKey, 
    revokeSession,
    unsaveItem,
    markNotificationRead,
    clearAllNotifications
  } = useAuth();

  const toast = useToast();
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');

  // Profile Form state
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');

  // Password Change state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  // API Key creation
  const [newKeyName, setNewKeyName] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<{ name: string; key: string } | null>(null);

  // If not logged in, redirect to login
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center max-w-sm space-y-4">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Avtorizatsiya talab qilinadi</h2>
          <p className="text-xs text-slate-400">
            Shaxsiy dashboardingizga kirish uchun Fentoph hisobingiz orqali tizimga kiring.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs transition-colors"
          >
            Tizimga kirish
          </button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, username, phone, bio });
    toast.success("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      toast.error("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (newPass !== confirmNewPass) {
      toast.error("Yangi parollar bir-biriga mos kelmadi.");
      return;
    }
    await changePassword(oldPass, newPass);
    toast.success("Parol muvaffaqiyatli yangilandi!");
    setOldPass('');
    setNewPass('');
    setConfirmNewPass('');
  };

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    toast.success("API kalit nusxalandi!");
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleCreateKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createApiKey(newKeyName);
      if (created) {
        setNewlyCreatedKey({
          name: created.name,
          key: created.plaintextKey
        });
        toast.success("Yangi API kalit yaratildi!");
      }
      setNewKeyName('');
      setShowKeyModal(false);
    } catch (err: any) {
      toast.error(err?.message || "Kalit yaratishda xatolik.");
    }
  };

  const sidebarItems: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'profile', label: 'Profile (Shaxsiy profil)', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Account settings (Sozlamalar)', icon: <Settings className="w-4 h-4" /> },
    { id: 'security', label: 'Security (Xavfsizlik & 2FA)', icon: <ShieldCheck className="w-4 h-4" /> },
    { 
      id: 'notifications', 
      label: 'Notifications (Bildirishnomalar)', 
      icon: <Bell className="w-4 h-4" />,
      badge: user.notifications.filter(n => !n.read).length
    },
    { id: 'services', label: 'Connected services (Ulangan servislar)', icon: <Link2 className="w-4 h-4" /> },
    { id: 'products', label: 'Fentoph products (Mahsulotlar)', icon: <Layers className="w-4 h-4" /> },
    { id: 'saved', label: 'Saved items (Saqlanganlar)', icon: <Bookmark className="w-4 h-4" />, badge: user.savedItems.length },
    { id: 'activity', label: 'Recent activity (Faollik tarixi)', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Banner Profile Summary */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-lg"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user.fullName}</h1>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {user.role}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400 font-mono">
              <span className="text-cyan-300 font-semibold">{user.fentophId}</span>
              <span>•</span>
              <span>@{user.username}</span>
              <span>•</span>
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2 transition-colors self-end sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          Chiqish
        </button>
      </div>

      {/* Main SaaS Dashboard Layout: Sidebar + Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 rounded-2xl bg-slate-900/60 border border-slate-800 p-2 space-y-1">
          {sidebarItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-white text-blue-600 font-bold' : 'bg-cyan-500/20 text-cyan-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Workspace */}
        <div className="lg:col-span-9 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Shaxsiy Profil</h3>
                <p className="text-xs text-slate-400">Fentoph ekotizimida ko'rinadigan ma'lumotlaringiz.</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">To'liq ism:</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Username:</label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Elektron pochta (Asosiy):</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Telefon raqam:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">O'zingiz haqingizda (Bio):</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Qisqacha faoliyatingiz haqida..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                  >
                    O'zgarishlarni Saqlash
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Hisob Sozlamalari (Account Settings)</h3>
                <p className="text-xs text-slate-400">Til, bildirishnomalar va shaxsiy parametrlarni boshqarish.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Interfeys Tili:</span>
                    <span className="text-[11px] text-slate-400">Hozirgi til: O'zbek tili (Lotin)</span>
                  </div>
                  <select
                    value={user.preferences.language}
                    onChange={(e) => updatePreferences({ language: e.target.value as any })}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="uz">O'zbekcha (UZ)</option>
                    <option value="en">English (EN)</option>
                    <option value="ru">Русский (RU)</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Email Bildirishnomalari:</span>
                    <span className="text-[11px] text-slate-400">Muhim xavfsizlik va yangiliklar xabarnomasi</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={user.preferences.emailNotifications}
                    onChange={(e) => updatePreferences({ emailNotifications: e.target.checked })}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Vaqt Mintaqasi:</span>
                    <span className="text-[11px] text-slate-400 font-mono">{user.preferences.timezone}</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">UTC+5 Tashkent</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white">Xavfsizlik va Autentifikatsiya</h3>
                <p className="text-xs text-slate-400">2FA himoyasi, faol sessiyalar va API kalitlar.</p>
              </div>

              {/* 2FA Toggle Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Ikki Bosqichli Himoya (2FA):</span>
                  <span className="text-[11px] text-slate-400">Har bir kirishda SMS yoki TOTP kod talab etiladi</span>
                </div>
                <button
                  onClick={toggleTwoFactor}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors ${
                    user.twoFactorEnabled 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {user.twoFactorEnabled ? 'Yoqilgan (Faol)' : 'O\'chirilgan'}
                </button>
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleChangePasswordSubmit} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase font-mono">Parolni Yangilash</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Joriy parol:</label>
                    <input
                      type="password"
                      required
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Yangi parol:</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Kamida 6 belgi"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Qayta kiriting:</label>
                    <input
                      type="password"
                      required
                      value={confirmNewPass}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                      placeholder="Qayta kiriting"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs transition-colors"
                >
                  Parolni Saqlash
                </button>
              </form>

              {/* API Keys */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-mono">Dasturchilar API Kalitlari</h4>
                    <p className="text-[11px] text-slate-400">Finilya, EskiBozor va Phentist bilan integratsiya uchun.</p>
                  </div>
                  <button
                    onClick={() => setShowKeyModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Yangi Kalit
                  </button>
                </div>

                <div className="space-y-2">
                  {user.apiKeys.map(k => (
                    <div key={k.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-xs">{k.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Yaratilgan: {k.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs flex-1 truncate">
                          {k.key}
                        </code>
                        <button
                          onClick={() => handleCopyKey(k.key, k.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs"
                          title="Nusxalash"
                        >
                          {copiedKeyId === k.id ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => revokeApiKey(k.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 text-xs"
                          title="Bekor qilish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {user.apiKeys.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-500 bg-slate-950 rounded-xl">
                      Faol API kalitlar mavjud emas.
                    </div>
                  )}
                </div>
              </div>

              {/* Active Sessions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase font-mono">Faol Qurilmalar va Sessiyalar</h4>
                <div className="space-y-2">
                  {user.sessions.map(s => (
                    <div key={s.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {s.device} ({s.browser})
                            {s.isCurrent && (
                              <span className="text-[10px] px-1.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                                Ushbu qurilma
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {s.location} • IP: {s.ip} • {s.lastActive}
                          </div>
                        </div>
                      </div>

                      {!s.isCurrent && (
                        <button
                          onClick={() => revokeSession(s.id)}
                          className="text-[11px] text-red-400 hover:underline"
                        >
                          Tugatish
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Bildirishnomalar Markazi</h3>
                  <p className="text-xs text-slate-400">Ekotizim yangilanishlari va xavfsizlik ogohlantirishlari.</p>
                </div>
                <button
                  onClick={clearAllNotifications}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Barchasini o'qilgan qilish
                </button>
              </div>

              <div className="space-y-2.5">
                {user.notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      n.read
                        ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                        : 'bg-slate-950 border-cyan-500/30 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-white">{n.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONNECTED SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Ulangan Fentoph Servislari</h3>
                <p className="text-xs text-slate-400">Bitta bosish orqali servislar ruxsatini yoqing yoki o'chiring.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'finilya', name: 'Finilya Moliya', desc: 'Byudjet va ko\'p valyutali kassa', icon: <Wallet className="w-5 h-5 text-emerald-400" /> },
                  { id: 'eskibozor', name: 'EskiBozor Savdo', desc: 'AI raqobat tahlilli do\'kon kabineti', icon: <ShoppingBag className="w-5 h-5 text-amber-400" /> },
                  { id: 'fsent', name: 'Fsent Xabar', desc: 'Harbiy darajada shifrlangan maxfiy messenjer', icon: <MessageSquare className="w-5 h-5 text-blue-400" /> },
                  { id: 'phentist', name: 'Phentist AI', desc: 'Sun\'iy intellekt tahliliy agentlari', icon: <Cpu className="w-5 h-5 text-purple-400" /> },
                  { id: 'google', name: 'Google Account', desc: 'Tezkor SSO autentifikatsiyasi', icon: <Globe className="w-5 h-5 text-red-400" /> },
                  { id: 'github', name: 'GitHub Developer', desc: 'Dasturchilar ombori integratsiyasi', icon: <ShieldCheck className="w-5 h-5 text-slate-400" /> },
                ].map(srv => {
                  const isConnected = user.connectedServices[srv.id as keyof typeof user.connectedServices];
                  return (
                    <div
                      key={srv.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                        isConnected
                          ? 'bg-slate-950 border-cyan-500/40 shadow-md shadow-cyan-500/5'
                          : 'bg-slate-950/40 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                          {srv.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-xs">{srv.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{srv.desc}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleConnectedService(srv.id as any)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium transition-colors ${
                          isConnected
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isConnected ? 'Ulangan' : 'Ulanmagan'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: FENTOPH PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Fentoph Mahsulotlaringiz</h3>
                <p className="text-xs text-slate-400">Har bir mahsulotni to'g'ridan-to'g'ri ishga tushiring.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRODUCTS_DATA.map(p => (
                  <div key={p.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-700">
                          {p.categoryLabel}
                        </span>
                        <span className="text-xs text-emerald-400 font-mono">Faol</span>
                      </div>
                      <h4 className="font-bold text-white text-base">{p.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Starter Plan</span>
                      <button
                        onClick={() => navigate(`/products/${p.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        Ochish <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SAVED ITEMS */}
          {activeTab === 'saved' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Saqlangan Materiallar</h3>
                <p className="text-xs text-slate-400">Keyinroq o'qish uchun saqlab qo'ygan maqola va hujjatlaringiz.</p>
              </div>

              <div className="space-y-2.5">
                {user.savedItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <button
                        onClick={() => navigate(item.url)}
                        className="font-semibold text-white hover:text-cyan-400 transition-colors text-left block"
                      >
                        {item.title}
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono">Saqlangan: {item.savedAt}</span>
                    </div>

                    <button
                      onClick={() => unsaveItem(item.id)}
                      className="text-slate-400 hover:text-red-400 p-1"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {user.savedItems.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500 bg-slate-950 rounded-2xl">
                    Hozircha saqlangan elementlar yo'q. Blog yoki Hujjatlar sahifasida saqlab qo'yishingiz mumkin.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: RECENT ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">So'nggi Faollik Tarixi (Activity Log)</h3>
                <p className="text-xs text-slate-400">Hisobingiz bo'yicha amalga oshirilgan xavfsizlik va xizmat operatsiyalari.</p>
              </div>

              <div className="space-y-2.5">
                {user.activities.map(act => (
                  <div key={act.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <div>
                        <span className="font-semibold text-white block">{act.action}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Kategoriya: {act.category} • IP: {act.ip}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Modal: New API Key Input */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0e1625] border border-slate-700 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Yangi Fentoph API Kalit</h3>
            <form onSubmit={handleCreateKeySubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Kalit nomi (masalan: Finilya Server Token)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                >
                  Kalitni Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Newly Created Key Display (One-time Reveal) */}
      {newlyCreatedKey && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0e1625] border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              API Kalit Muvaffaqiyatli Yaratildi!
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kalit nomi: <strong className="text-white">{newlyCreatedKey.name}</strong>.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Sizning maxfiy tokeningiz:</span>
              <div className="flex items-center gap-2">
                <code className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs flex-1 break-all select-all">
                  {newlyCreatedKey.key}
                </code>
                <button
                  onClick={() => handleCopyKey(newlyCreatedKey.key, 'new_key')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1 flex-shrink-0"
                >
                  {copiedKeyId === 'new_key' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Nusxalash
                </button>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Diqqat:</strong> Ushbu kalit faqat bir marta ko'rsatiladi. Uni hoziroq nusxalab xavfsiz joyga saqlang. Ma'lumotlar bazasida u faqat SHA-256 xesh shaklida saqlanadi.
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setNewlyCreatedKey(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
              >
                Tushundim, yopish
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

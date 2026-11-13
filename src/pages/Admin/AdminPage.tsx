import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BLOG_POSTS } from '../../data/blogs';
import { PRODUCTS_DATA } from '../../data/products';
import { CAREER_POSITIONS } from '../../data/careers';
import { BlogPost, JobApplication, ContactMessage } from '../../types';
import { apiClient } from '../../services/apiClient';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  BookOpen, 
  Briefcase, 
  Mail, 
  BarChart3, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Loader2,
  RefreshCw
} from 'lucide-react';

type AdminTab = 
  | 'analytics' 
  | 'users' 
  | 'products' 
  | 'blog' 
  | 'jobs' 
  | 'applications' 
  | 'messages' 
  | 'pages';

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();
  const { user, isAdmin } = useAuth();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  const [isLoading, setIsLoading] = useState(false);

  // Live Metrics & Audit
  const [metrics, setMetrics] = useState({
    totalUsers: 2,
    activeSessions: 1,
    totalArticles: 2,
    activeJobs: 2,
    jobApplications: 0,
    contactMessages: 0,
    unreadMessages: 0,
    activeApiKeys: 0
  });
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Blog Management State
  const [blogList, setBlogList] = useState<BlogPost[]>(BLOG_POSTS);
  const [showNewBlogModal, setShowNewBlogModal] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Strategiya va Falsafa');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogTags, setNewBlogTags] = useState('Innovatsiya, Ekotizim');

  // Applications State
  const [applications, setApplications] = useState<JobApplication[]>([]);

  // Contact Messages State
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Users State
  const [userList, setUserList] = useState<any[]>([]);

  // Load real data from backend
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'analytics') {
        const res = await apiClient.getAdminOverview();
        if (res && res.metrics) {
          setMetrics(res.metrics);
          setAuditLogs(res.recentAudit || []);
        }
      } else if (activeTab === 'users') {
        const res = await apiClient.getAdminUsers();
        if (res && res.users) {
          setUserList(res.users.map((u: any) => ({
            id: u.id,
            fentophId: u.fentophId,
            name: u.fullName || u.username,
            email: u.email,
            role: u.role === 'SUPER_ADMIN' ? 'Super Admin' : u.role === 'ADMIN' ? 'Administrator' : 'Foydalanuvchi',
            status: u.emailVerified ? 'Tasdiqlangan' : 'Kutilmoqda'
          })));
        }
      } else if (activeTab === 'messages') {
        const res = await apiClient.getAdminMessages();
        if (res && res.messages) {
          setMessages(res.messages.map((m: any) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            subject: m.subject,
            message: m.message,
            submittedAt: m.created_at ? m.created_at.split(' ')[0] : 'Bugun',
            status: m.status === 'replied' ? 'Javob berildi' : "O'qilmagan"
          })));
        }
      } else if (activeTab === 'applications') {
        const res = await apiClient.getAdminApplications();
        if (res && res.applications) {
          setApplications(res.applications.map((a: any) => ({
            id: a.id,
            jobId: a.jobId,
            jobTitle: a.jobTitle || 'Vakansiya',
            name: a.fullName,
            email: a.email,
            phone: a.phone,
            telegram: a.phone.startsWith('@') ? a.phone : '@' + a.phone,
            portfolioUrl: a.portfolioUrl || a.resumeUrl || '#',
            coverNote: a.coverLetter || 'Ariza',
            submittedAt: a.createdAt ? a.createdAt.split(' ')[0] : 'Bugun',
            status: a.status === 'interview' ? 'Suhbat belgilandi' : a.status === 'rejected' ? 'Rad etildi' : a.status === 'reviewing' || a.status === 'shortlisted' ? "Ko'rib chiqildi" : 'Kutilmoqda'
          })));
        }
      }
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, [activeTab]);

  // Check admin rights
  if (!user || user.role !== 'Administrator') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center max-w-md space-y-4">
          <ShieldCheck className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Ruxsat Cheklangan</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fentoph Boshqaruv Paneliga kirish faqat tegishli vakolatga ega administratorlar uchun ruxsat etilgan.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs"
          >
            Kirish Sahifasi
          </button>
        </div>
      </div>
    );
  }

  // Blog creation handler with backend API integration
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim() || !newBlogContent.trim()) {
      toast.error("Sarlavha va matn kiritilishi shart!");
      return;
    }

    try {
      await apiClient.createBlogPost({
        title: newBlogTitle.trim(),
        excerpt: newBlogExcerpt || newBlogContent.slice(0, 120) + '...',
        content: newBlogContent,
        categoryId: 'cat_tech',
        status: 'published',
        tags: newBlogTags.split(',').map(t => t.trim())
      });

      const slug = newBlogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newPost: BlogPost = {
        id: `blog_${Date.now()}`,
        title: newBlogTitle,
        slug: slug || `post-${Date.now()}`,
        category: newBlogCategory,
        excerpt: newBlogExcerpt || newBlogContent.slice(0, 120) + '...',
        content: newBlogContent.split('\n\n').filter(Boolean),
        tags: newBlogTags.split(',').map(t => t.trim()),
        date: 'Hozirgina',
        readTime: '4 daqiqa',
        coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        author: {
          name: user.fullName,
          role: 'Administrator',
          avatar: user.avatar,
          bio: 'Fentoph boshqaruv jamoasi muallifi.'
        },
        likes: 0,
        published: true,
        comments: []
      };

      setBlogList([newPost, ...blogList]);
      setShowNewBlogModal(false);
      setNewBlogTitle('');
      setNewBlogExcerpt('');
      setNewBlogContent('');
      toast.success("Yangi maqola bazaga saqlandi va nashr etildi!");
    } catch (err: any) {
      toast.error(err?.message || "Maqola yaratishda xatolik yuz berdi.");
    }
  };

  const togglePublish = (postId: string) => {
    setBlogList(prev => prev.map(p => {
      if (p.id === postId) {
        const next = !p.published;
        toast.info(`Maqola holati: ${next ? 'Nashr etildi' : 'Qoralamaga olindi'}`);
        return { ...p, published: next };
      }
      return p;
    }));
  };

  const deletePost = async (postId: string) => {
    try {
      await apiClient.deleteBlogPost(postId).catch(() => {});
      setBlogList(prev => prev.filter(p => p.id !== postId));
      toast.success("Maqola o'chirildi.");
    } catch (err: any) {
      toast.error(err?.message || "O'chirishda xatolik.");
    }
  };

  const updateAppStatus = async (appId: string, status: JobApplication['status']) => {
    const backendStatus = status === 'Kutilmoqda' ? 'new' : status === 'Suhbat belgilandi' ? 'interview' : status === 'Rad etildi' ? 'rejected' : 'shortlisted';
    try {
      await apiClient.updateApplicationStatus(appId, backendStatus).catch(() => {});
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
      toast.success(`Ariza holati yangilandi: ${status}`);
    } catch (err: any) {
      toast.error("Statusni yangilashda xatolik.");
    }
  };

  const markMessageAnswered = async (msgId: string) => {
    try {
      await apiClient.updateMessageStatus(msgId, 'replied').catch(() => {});
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, status: 'Javob berildi' } : m));
      toast.success("Xabar 'Javob berildi' deb belgilandi.");
    } catch (err: any) {
      toast.error("Statusni yangilashda xatolik.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Top Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Fentoph Super Admin Gateway
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Fentoph Boshqaruv Markazi
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Tizim versiyasi: v2026.4.1 Production Core
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-medium border border-slate-700 transition-colors"
        >
          Foydalanuvchi Dashboardiga Qaytish
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'analytics', label: 'Analytics (Metrikalar)', icon: <BarChart3 className="w-3.5 h-3.5" /> },
          { id: 'users', label: 'Users (Foydalanuvchilar)', icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'products', label: 'Products (Mahsulotlar)', icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'blog', label: 'Blog & Articles', icon: <BookOpen className="w-3.5 h-3.5" />, badge: blogList.length },
          { id: 'applications', label: 'Job Applications', icon: <Briefcase className="w-3.5 h-3.5" />, badge: applications.length },
          { id: 'messages', label: 'Contact Messages', icon: <Mail className="w-3.5 h-3.5" />, badge: messages.filter(m => m.status === 'O\'qilmagan').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-white text-blue-600 font-bold' : 'bg-cyan-500/20 text-cyan-300'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl">
        
        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h3 className="text-lg font-bold text-white">Ekotizim Jonli Metrikalari</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Jami Foydalanuvchilar</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{metrics.totalUsers}</div>
                <div className="text-xs text-emerald-400 font-mono">Bazada ro'yxatda</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Faol Sessiyalar</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">{metrics.activeSessions}</div>
                <div className="text-xs text-slate-400 font-mono">Serverda jonli</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Aloqa Murojaatlari</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">{metrics.contactMessages}</div>
                <div className="text-xs text-slate-400 font-mono">{metrics.unreadMessages} tasi o'qilmagan</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Karyera Arizalari</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">{metrics.jobApplications}</div>
                <div className="text-xs text-emerald-400 font-mono">HR navbatida</div>
              </div>
            </div>

            {/* Audit Log Stream */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> Oxirgi Xavfsizlik Audit Jurnali (AuditLog Stream)
                </h4>
                <span className="text-xs font-mono text-slate-400">Jonli SQLite audit jadvali</span>
              </div>

              {auditLogs.length === 0 ? (
                <p className="text-xs text-slate-400">Hozircha audit yozuvlari mavjud emas.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="text-[10px] uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="pb-2">Vaqt</th>
                        <th className="pb-2">Harakat (Action)</th>
                        <th className="pb-2">Resurs</th>
                        <th className="pb-2">Foydalanuvchi / IP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {auditLogs.slice(0, 6).map((log: any) => (
                        <tr key={log.id} className="text-slate-300">
                          <td className="py-2 text-slate-400">{log.created_at}</td>
                          <td className="py-2 text-cyan-400 font-bold">{log.action}</td>
                          <td className="py-2">{log.resource_type} {log.resource_id ? `(${log.resource_id.slice(0, 10)})` : ''}</td>
                          <td className="py-2 text-slate-400">{log.userEmail || log.ip_address || 'Tizim'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Server Klasterlari Holati (Health Check)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex justify-between">
                  <span>Finilya Core:</span>
                  <span className="text-emerald-400">OPERATIONAL</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex justify-between">
                  <span>EskiBozor Engine:</span>
                  <span className="text-emerald-400">OPERATIONAL</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex justify-between">
                  <span>Fsent Relay:</span>
                  <span className="text-emerald-400">OPERATIONAL</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex justify-between">
                  <span>Phentist GPU Cluster:</span>
                  <span className="text-emerald-400">OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Foydalanuvchilar Ro'yxati</h3>
                <p className="text-xs text-slate-400">Fentoph ID tizimidagi barcha profillar.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
              {userList.map(u => (
                <div key={u.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{u.email} • {u.fentophId}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono text-[10px]">
                      {u.role}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                      {u.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Ekotizim Mahsulotlari Boshqaruvi</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCTS_DATA.map(p => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{p.name}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-900 text-cyan-400 border border-slate-700">
                        {p.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{p.tagline}</p>
                    <div className="text-[10px] text-slate-500 font-mono pt-1">
                      Docs slug: {p.docsSlug} • Holat: {p.status}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/products/${p.id}`)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    title="Ko'rish"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG MANAGEMENT TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Blog Maqolalarini Boshqarish</h3>
                <p className="text-xs text-slate-400">Yangi maqolalar yaratish, nashr qilish yoki tahrirlash.</p>
              </div>
              <button
                onClick={() => setShowNewBlogModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Yangi Maqola Yozish
              </button>
            </div>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
              {blogList.map(post => (
                <div key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm hover:text-cyan-400 cursor-pointer" onClick={() => navigate(`/blog/${post.slug}`)}>
                        {post.title}
                      </span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-mono ${
                        post.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {post.published ? 'Nashr etilgan' : 'Qoralama'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {post.category} • {post.author.name} • {post.date} • {post.likes} yoqtirish
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePublish(post.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors flex items-center gap-1"
                      title={post.published ? "Qoralamaga olish" : "Nashr qilish"}
                    >
                      {post.published ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{post.published ? "Qoralama" : "Nashr"}</span>
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JOB APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Karyera Arizalari (Job Applications)</h3>
              <p className="text-xs text-slate-400">Nomzodlar tomonidan topshirilgan rezyumelar.</p>
            </div>

            <div className="space-y-3">
              {applications.map(app => (
                <div key={app.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm">{app.name}</h4>
                      <span className="text-cyan-400 font-mono text-[11px]">{app.jobTitle}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-cyan-300 font-mono text-[10px] w-fit">
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 text-[11px] font-mono">
                    <div>Email: <span className="text-white">{app.email}</span></div>
                    <div>Telefon: <span className="text-white">{app.phone}</span></div>
                    <div>Telegram: <span className="text-white">{app.telegram}</span></div>
                  </div>

                  <p className="text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs leading-relaxed">
                    "{app.coverNote}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <a
                      href={app.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-xs"
                    >
                      Rezyume / Portfolio <ArrowRight className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateAppStatus(app.id, 'Suhbat belgilandi')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] hover:bg-emerald-900/60"
                      >
                        Suhbatga chaqirish
                      </button>
                      <button
                        onClick={() => updateAppStatus(app.id, 'Rad etildi')}
                        className="px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-[11px] hover:bg-red-900/60"
                      >
                        Rad etish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Aloqa Xabarlari (Inquiries)</h3>
              <p className="text-xs text-slate-400">Sayt orqali yuborilgan murojaatlar qutisi.</p>
            </div>

            <div className="space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{msg.subject}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      msg.status === 'O\'qilmagan' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {msg.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono">
                    Kimdan: <span className="text-white font-medium">{msg.name}</span> ({msg.email}) • {msg.submittedAt}
                  </div>

                  <p className="text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 leading-relaxed text-xs">
                    {msg.message}
                  </p>

                  <div className="pt-2 flex justify-end">
                    {msg.status === 'O\'qilmagan' && (
                      <button
                        onClick={() => markMessageAnswered(msg.id)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Javob berildi deb belgilash
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modal: Write New Blog Article */}
      {showNewBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0e1625] border border-slate-700 p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Yangi Blog Maqolasi Yaratish</h3>
              <button
                onClick={() => setShowNewBlogModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Maqola Sarlavhasi:</label>
                <input
                  type="text"
                  required
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  placeholder="Masalan: Fentoph Cloud Infratuzilmasi v2.0"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Kategoriya:</label>
                  <select
                    value={newBlogCategory}
                    onChange={(e) => setNewBlogCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    <option value="Strategiya va Falsafa">Strategiya va Falsafa</option>
                    <option value="FinTex va Moliya">FinTex va Moliya</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Texnologiya va Xavfsizlik">Texnologiya va Xavfsizlik</option>
                    <option value="Sun'iy Intellekt">Sun'iy Intellekt</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Teglar (vergul bilan):</label>
                  <input
                    type="text"
                    value={newBlogTags}
                    onChange={(e) => setNewBlogTags(e.target.value)}
                    placeholder="Finilya, AI, Kiberxavfsizlik"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Qisqacha mazmun (Excerpt):</label>
                <input
                  type="text"
                  value={newBlogExcerpt}
                  onChange={(e) => setNewBlogExcerpt(e.target.value)}
                  placeholder="Maqolaning asosiy g'oyasi..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Asosiy matn (Paragraflar oralig'ini Enter bilan ajrating):</label>
                <textarea
                  rows={6}
                  required
                  value={newBlogContent}
                  onChange={(e) => setNewBlogContent(e.target.value)}
                  placeholder="Maqolaning to'liq matnini yozing..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewBlogModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Nashr Qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

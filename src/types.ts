// ==========================================
// FENTOPH ENTERPRISE PLATFORM - TYPE DEFINITIONS
// ==========================================

export type PageTab = string;

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export type PageRoute = 
  | '/'
  | '/products'
  | '/products/:id'
  | '/solutions'
  | '/solutions/:id'
  | '/blog'
  | '/blog/:slug'
  | '/about'
  | '/careers'
  | '/contact'
  | '/security'
  | '/docs'
  | '/docs/:id'
  | '/login'
  | '/register'
  | '/verify-email'
  | '/forgot-password'
  | '/dashboard'
  | '/admin'
  | '/privacy'
  | '/terms'
  | '/cookies';

// ---------------- USER & AUTH ----------------

export type UserRole = 'Foydalanuvchi' | 'Dasturchi' | 'Biznes Hamkor' | 'Administrator';

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface UserActivity {
  id: string;
  action: string;
  category: 'auth' | 'security' | 'service' | 'api' | 'profile';
  timestamp: string;
  ip: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'security';
  timestamp: string;
  read: boolean;
  linkUrl?: string;
}

export interface SavedItem {
  id: string;
  type: 'blog' | 'product' | 'solution' | 'doc';
  title: string;
  url: string;
  savedAt: string;
}

export interface FentophUser {
  id: string;
  fentophId: string; // e.g. FP-894210
  fullName: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  bio?: string;
  role: UserRole;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  lastLogin: string;
  preferences: {
    language: 'uz' | 'en' | 'ru';
    theme: 'dark' | 'light';
    emailNotifications: boolean;
    marketingEmails: boolean;
    timezone: string;
  };
  connectedServices: {
    finilya: boolean;
    eskibozor: boolean;
    fsent: boolean;
    phentist: boolean;
    google: boolean;
    github: boolean;
  };
  apiKeys: {
    id: string;
    name: string;
    key: string;
    createdAt: string;
    lastUsed: string;
  }[];
  sessions: UserSession[];
  activities: UserActivity[];
  notifications: UserNotification[];
  savedItems: SavedItem[];
}

// ---------------- PRODUCTS ----------------

export type ProductCategory = 'fintech' | 'ecommerce' | 'communication' | 'ai' | 'infrastructure';

export interface ProductPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  badge?: string;
  features: string[];
  highlight?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  badge?: string;
  description: string;
  longDescription: string;
  iconName: string;
  color: string;
  accentBg: string;
  features: string[];
  specs: { label: string; value: string }[];
  targetAudience: string;
  demoMetrics: { label: string; value: string }[];
  status: 'Faol' | 'Beta' | 'Tez kunda';
  linkUrl?: string;
  screenshots: { title: string; desc: string; url: string }[];
  plans: ProductPlan[];
  faqs: { q: string; a: string }[];
  docsSlug: string;
}

// ---------------- SOLUTIONS ----------------

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  problem: string[];
  solution: string[];
  architectureOverview: string;
  benefits: { title: string; desc: string; icon: string }[];
  caseStudy: {
    client: string;
    metrics: { label: string; value: string }[];
    quote: string;
    author: string;
  };
  connectedProducts: string[];
}

// ---------------- BLOG ----------------

export interface BlogComment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  likes: number;
  featured?: boolean;
  published: boolean;
  comments: BlogComment[];
}

// ---------------- CAREERS ----------------

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Hybrid';
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  active: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  telegram: string;
  portfolioUrl: string;
  coverNote?: string;
  submittedAt: string;
  status: 'Kutilmoqda' | 'Ko\'rib chiqildi' | 'Suhbat belgilandi' | 'Rad etildi';
}

// ---------------- CONTACT ----------------

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'O\'qilmagan' | 'Javob berildi';
}

// ---------------- DOCUMENTATION ----------------

export interface DocArticle {
  id: string;
  slug: string;
  section: 'Kirish' | 'Autentifikatsiya' | 'API & SDK' | 'Mahsulotlar' | 'Xavfsizlik' | 'Qo\'llanmalar';
  title: string;
  description: string;
  content: string[];
  codeSnippets?: {
    lang: string;
    title: string;
    code: string;
  }[];
  updatedAt: string;
}

// ---------------- GLOBAL SEARCH ----------------

export interface SearchResult {
  id: string;
  type: 'product' | 'solution' | 'blog' | 'doc' | 'page';
  title: string;
  description: string;
  url: string;
  category?: string;
  badge?: string;
}

// ---------------- AI ASSISTANT ----------------

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; url: string }[];
}

// ---------------- ADMIN ANALYTICS ----------------

export interface AdminAnalytics {
  totalUsers: number;
  activeToday: number;
  apiRequestsToday: number;
  openApplications: number;
  unreadMessages: number;
  systemUptime: string;
}

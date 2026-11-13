/**
 * Fentoph Production API Client
 * Secure communication layer with the Node.js / SQLite backend
 */

const API_BASE = '/api';

export function getStoredToken(): string | null {
  return localStorage.getItem('fentoph_session_token');
}

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem('fentoph_session_token', token);
  } else {
    localStorage.removeItem('fentoph_session_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include' // Send cookies
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.error || `HTTP xatosi: ${response.status}`;
    const err = new Error(errorMsg);
    (err as any).status = response.status;
    (err as any).data = data;
    throw err;
  }

  return data as T;
}

export const apiClient = {
  // Auth
  register: (payload: { name: string; username: string; email: string; password: string; termsAccepted: boolean }) =>
    request<any>('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),

  login: (login: string, password: string) =>
    request<any>('/auth/login', { method: 'POST', body: JSON.stringify({ login, password }) }),

  loginWithGoogle: (token?: string, profile?: any) =>
    request<any>('/auth/google', { method: 'POST', body: JSON.stringify({ token, profile }) }),

  verifyEmail: (code: string, email?: string) =>
    request<any>('/auth/verify-email', { method: 'POST', body: JSON.stringify({ code, email }) }),

  resendCode: (email: string) =>
    request<any>('/auth/resend-code', { method: 'POST', body: JSON.stringify({ email }) }),

  forgotPassword: (email: string) =>
    request<any>('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),

  resetPassword: (email: string, code: string, newPassword: string) =>
    request<any>('/auth/reset-password', { method: 'POST', body: JSON.stringify({ email, code, newPassword }) }),

  logout: () =>
    request<any>('/auth/logout', { method: 'POST' }),

  getMe: () =>
    request<{ user: any }>('/auth/me'),

  // Profile & User
  updateProfile: (data: { fullName?: string; phone?: string; bio?: string; avatar?: string }) =>
    request<any>('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),

  updatePreferences: (preferences: any) =>
    request<any>('/users/preferences', { method: 'PUT', body: JSON.stringify(preferences) }),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<any>('/users/change-password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) }),

  toggleTwoFactor: () =>
    request<{ success: boolean; twoFactorEnabled: boolean }>('/users/toggle-2fa', { method: 'POST' }),

  revokeSession: (sessionId: string) =>
    request<any>(`/users/sessions/${sessionId}`, { method: 'DELETE' }),

  markNotificationRead: (id: string) =>
    request<any>(`/users/notifications/${id}/read`, { method: 'POST' }),

  clearNotifications: () =>
    request<any>('/users/notifications/clear', { method: 'POST' }),

  // API Keys
  getApiKeys: () =>
    request<{ keys: any[] }>('/api-keys'),

  createApiKey: (name: string, scopes?: string[]) =>
    request<{ success: boolean; message: string; apiKey: any }>('/api-keys', {
      method: 'POST',
      body: JSON.stringify({ name, scopes })
    }),

  revokeApiKey: (id: string) =>
    request<any>(`/api-keys/${id}/revoke`, { method: 'POST' }),

  rotateApiKey: (id: string) =>
    request<{ success: boolean; apiKey: any }>(`/api-keys/${id}/rotate`, { method: 'POST' }),

  // Blog & CMS
  getBlogPosts: (params?: { category?: string; search?: string; tag?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.category) q.set('category', params.category);
    if (params?.search) q.set('search', params.search);
    if (params?.page) q.set('page', params.page.toString());
    if (params?.limit) q.set('limit', params.limit.toString());
    return request<{ posts: any[]; pagination: any }>(`/blog?${q.toString()}`);
  },

  getBlogPostBySlug: (slug: string) =>
    request<{ post: any; related: any[] }>(`/blog/${slug}`),

  getBlogCategories: () =>
    request<{ categories: any[] }>('/blog/categories'),

  createBlogPost: (post: any) =>
    request<any>('/blog', { method: 'POST', body: JSON.stringify(post) }),

  updateBlogPost: (id: string, post: any) =>
    request<any>(`/blog/${id}`, { method: 'PUT', body: JSON.stringify(post) }),

  deleteBlogPost: (id: string) =>
    request<any>(`/blog/${id}`, { method: 'DELETE' }),

  getAdminBlogPosts: () =>
    request<{ posts: any[] }>('/blog/admin/all'),

  // Comments
  getComments: (postId: string) =>
    request<{ comments: any[] }>(`/comments/post/${postId}`),

  postComment: (postId: string, content: string) =>
    request<{ success: boolean; comment: any }>('/comments', { method: 'POST', body: JSON.stringify({ postId, content }) }),

  deleteComment: (commentId: string) =>
    request<any>(`/comments/${commentId}`, { method: 'DELETE' }),

  reportComment: (commentId: string) =>
    request<any>(`/comments/${commentId}/report`, { method: 'POST' }),

  // Contact
  submitContact: (data: { name: string; email: string; subject: string; message: string }) =>
    request<any>('/contact', { method: 'POST', body: JSON.stringify(data) }),

  getAdminMessages: (status?: string) =>
    request<{ messages: any[] }>(`/contact/admin/messages${status ? `?status=${status}` : ''}`),

  updateMessageStatus: (id: string, status: string) =>
    request<any>(`/contact/admin/messages/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  deleteMessage: (id: string) =>
    request<any>(`/contact/admin/messages/${id}`, { method: 'DELETE' }),

  // Careers
  getJobs: () =>
    request<{ jobs: any[] }>('/careers/jobs'),

  getJobBySlug: (slug: string) =>
    request<{ job: any }>(`/careers/jobs/${slug}`),

  applyJob: (data: { jobId: string; fullName: string; email: string; phone: string; portfolioUrl?: string; resumeUrl?: string; coverLetter?: string }) =>
    request<any>('/careers/apply', { method: 'POST', body: JSON.stringify(data) }),

  getAdminApplications: (params?: { status?: string; jobId?: string }) => {
    const q = new URLSearchParams();
    if (params?.status) q.set('status', params.status);
    if (params?.jobId) q.set('jobId', params.jobId);
    return request<{ applications: any[] }>(`/careers/admin/applications?${q.toString()}`);
  },

  updateApplicationStatus: (id: string, status: string, adminNotes?: string) =>
    request<any>(`/careers/admin/applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status, adminNotes }) }),

  // Admin Overview & Audit
  getAdminOverview: () =>
    request<{ metrics: any; recentAudit: any[] }>('/admin/overview'),

  getAdminUsers: (search?: string, role?: string) => {
    const q = new URLSearchParams();
    if (search) q.set('search', search);
    if (role) q.set('role', role);
    return request<{ users: any[] }>(`/admin/users?${q.toString()}`);
  },

  updateUserRole: (userId: string, role: string) =>
    request<any>(`/admin/users/${userId}/role`, { method: 'PUT', body: JSON.stringify({ role }) }),

  getAuditLogs: (limit?: number) =>
    request<{ logs: any[] }>(`/admin/audit-logs${limit ? `?limit=${limit}` : ''}`),

  // Products
  getProducts: () =>
    request<{ products: any[] }>('/products'),

  getProductBySlug: (slug: string) =>
    request<{ product: any }>(`/products/${slug}`),

  // Solutions
  getSolutions: () =>
    request<{ solutions: any[] }>('/solutions'),

  getSolutionBySlug: (slug: string) =>
    request<{ solution: any }>(`/solutions/${slug}`),

  // AI Assistant
  sendAiChat: (prompt: string, history?: any[]) =>
    request<{ reply: string; suggestedActions: any[]; provider: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt, history })
    }),

  // Search
  search: (query: string) =>
    request<{ results: any[] }>(`/search?q=${encodeURIComponent(query)}`)
};

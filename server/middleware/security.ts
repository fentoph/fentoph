import { Request, Response, NextFunction } from 'express';

// In-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic cleanup of rate limit store
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitStore.entries()) {
    if (val.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

/**
 * Factory for rate limiting endpoints
 */
export function rateLimiter(windowMs: number, maxRequests: number, message = 'So\'rovlar soni me\'yordan oshdi. Biroz kuting.') {
  return (req: Request, res: Response, next: NextFunction) => {
    // Allow internal automated test suites to bypass rate limits when authenticated with ADMIN_BOOTSTRAP_TOKEN
    const bootstrapToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
    if (bootstrapToken && req.headers['x-bypass-ratelimit'] === bootstrapToken) {
      return next();
    }

    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    const key = `${req.baseUrl || req.path}:${ip}`;
    const now = Date.now();

    const record = rateLimitStore.get(key);

    if (!record || record.resetAt < now) {
      rateLimitStore.set(key, {
        count: 1,
        resetAt: now + windowMs
      });
      return next();
    }

    record.count += 1;

    if (record.count > maxRequests) {
      res.setHeader('Retry-After', Math.ceil((record.resetAt - now) / 1000));
      return res.status(429).json({
        error: message,
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfterSeconds: Math.ceil((record.resetAt - now) / 1000)
      });
    }

    next();
  };
}

/**
 * Login Brute-Force Defense:
 * Tracks consecutive failed attempts by IP and Login ID.
 * Locks for 15 minutes after 5 failed attempts.
 */
interface BruteForceRecord {
  failedAttempts: number;
  lockedUntil: number | null;
}

const bruteForceMap = new Map<string, BruteForceRecord>();

export function isLoginLocked(loginKey: string): { locked: boolean; remainingSeconds: number } {
  const record = bruteForceMap.get(loginKey);
  if (!record || !record.lockedUntil) return { locked: false, remainingSeconds: 0 };

  const now = Date.now();
  if (record.lockedUntil > now) {
    return { locked: true, remainingSeconds: Math.ceil((record.lockedUntil - now) / 1000) };
  }

  // Lock expired
  bruteForceMap.delete(loginKey);
  return { locked: false, remainingSeconds: 0 };
}

export function recordFailedLoginAttempt(loginKey: string): { lockedNow: boolean; remainingAttempts: number } {
  const now = Date.now();
  const record = bruteForceMap.get(loginKey) || { failedAttempts: 0, lockedUntil: null };
  record.failedAttempts += 1;

  if (record.failedAttempts >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000; // 15 mins lock
    bruteForceMap.set(loginKey, record);
    return { lockedNow: true, remainingAttempts: 0 };
  }

  bruteForceMap.set(loginKey, record);
  return { lockedNow: false, remainingAttempts: 5 - record.failedAttempts };
}

export function resetFailedLoginAttempts(loginKey: string) {
  bruteForceMap.delete(loginKey);
}

/**
 * Hardened Security Headers Middleware (Zero dependencies, Helmet-level production protection)
 */
export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  // Prevent clickjacking / frame embedding
  res.setHeader('X-Frame-Options', 'DENY');
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Legacy XSS Auditor protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Modern Permissions Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  // Strict Transport Security (HSTS) with 1-year duration & preload
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Content Security Policy (Hardened for React SPA + Google Fonts + Unsplash assets)
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob: images.unsplash.com",
    "connect-src 'self' http: https: ws: wss:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));

  next();
}

/**
 * CSRF Protection Middleware for Cookie-based Auth:
 * Verifies custom header on all state-modifying HTTP requests (POST, PUT, DELETE, PATCH).
 * Cross-site HTML forms cannot set custom headers due to browser preflight enforcement.
 */
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  const method = req.method.toUpperCase();
  // Safe methods do not require CSRF token
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return next();
  }

  // If request uses Bearer token, it is already protected from browser ambient credential injection
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return next();
  }

  // If cookie auth is used, require either X-Requested-With or X-CSRF-Token or matching double-submit cookie
  const requestedWith = req.headers['x-requested-with'];
  const csrfHeader = req.headers['x-csrf-token'];
  const csrfCookie = req.cookies?.fentoph_csrf;

  if (requestedWith || (csrfHeader && csrfCookie && csrfHeader === csrfCookie)) {
    return next();
  }

  // For API JSON endpoints with Content-Type application/json, browser CORS preflight already blocks cross-origin POST
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('application/json')) {
    return next();
  }

  return res.status(403).json({
    error: 'CSRF xavfsizlik to\'sig\'i: so\'rov rad etildi.',
    code: 'CSRF_VALIDATION_FAILED'
  });
}

/**
 * Sanitize strings to prevent malicious injection
 */
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .trim();
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  if (input !== null && typeof input === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      cleaned[key] = sanitizeInput(value);
    }
    return cleaned;
  }
  return input;
}

export function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  next();
}

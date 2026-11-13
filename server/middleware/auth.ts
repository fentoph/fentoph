import { Request, Response, NextFunction } from 'express';
import { validateSession, UserRecord, ProfileRecord } from '../services/authService';

export interface AuthenticatedRequest extends Request {
  user?: UserRecord;
  profile?: ProfileRecord;
  sessionToken?: string;
}

export function extractSessionToken(req: Request): string | null {
  // 1. From Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  // 2. From Cookie
  if (req.cookies && req.cookies.fentoph_session) {
    return req.cookies.fentoph_session;
  }

  return null;
}

export function authenticateSession(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const token = extractSessionToken(req);
  if (!token) {
    return next();
  }

  const result = validateSession(token);
  if (result) {
    req.user = result.user;
    req.profile = result.profile;
    req.sessionToken = token;
  }

  next();
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Autentifikatsiya talab qilinadi. Iltimos, tizimga kiring.',
      code: 'UNAUTHORIZED'
    });
  }
  next();
}

export function requireRole(allowedRoles: ('USER' | 'ADMIN' | 'SUPER_ADMIN')[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Autentifikatsiya talab qilinadi.',
        code: 'UNAUTHORIZED'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Ruxsat berilmagan. Ushbu amal faqat administratorlar uchun mavjud.',
        code: 'FORBIDDEN'
      });
    }

    next();
  };
}

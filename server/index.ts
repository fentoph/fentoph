import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { runSeed } from './db/seed';
import { securityHeaders, sanitizeBody, csrfProtection } from './middleware/security';
import { authenticateSession } from './middleware/auth';

// Routers
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { apiKeysRouter } from './routes/apiKeys';
import { blogRouter } from './routes/blog';
import { commentsRouter } from './routes/comments';
import { productsRouter } from './routes/products';
import { solutionsRouter } from './routes/solutions';
import { careersRouter } from './routes/careers';
import { uploadRouter } from './routes/upload';
import { contactRouter } from './routes/contact';
import { adminRouter } from './routes/admin';
import { aiRouter } from './routes/ai';
import { searchRouter } from './routes/search';

dotenv.config();

// Initialize Database & Seed (Zero demo users seeded in production)
runSeed();

const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === 'production';

// 1. Strict CORS Configuration (Production vs Development)
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
const defaultDevOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4000', 'http://127.0.0.1:4000'];
const allowedOrigins = allowedOriginsEnv 
  ? allowedOriginsEnv.split(',').map(o => o.trim()).filter(Boolean)
  : (isProd 
      ? ['https://fentoph.com', 'https://app.fentoph.com', 'https://admin.fentoph.com'] 
      : defaultDevOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser agents (CLI tools, server-to-server, curl) without origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const corsError: any = new Error(`CORS xavfsizlik to'sig'i: '${origin}' manziliga ruxsat berilmagan.`);
    corsError.status = 403;
    corsError.code = 'CORS_FORBIDDEN';
    return callback(corsError);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token']
}));

// 2. Cookie & Body Parsers with 1MB Size Limit
app.use(cookieParser(process.env.COOKIE_SECRET || 'fentoph_cookie_secret_dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 3. Security Hardening Middleware Stack
app.use(securityHeaders);
app.use(csrfProtection);
app.use(sanitizeBody);
app.use(authenticateSession);

// 4. API Endpoints Mounting
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/api-keys', apiKeysRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/products', productsRouter);
app.use('/api/solutions', solutionsRouter);
app.use('/api/careers', careersRouter);
app.use('/api/careers', uploadRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);
app.use('/api/ai', aiRouter);
app.use('/api/search', searchRouter);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    platform: 'Fentoph Enterprise Core',
    timestamp: new Date().toISOString(),
    version: '2026.4.1',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 for undefined API endpoints
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Ushbu API manzili mavjud emas.', code: 'NOT_FOUND' });
  }
  next();
});

// 5. Hardened Central Production Error Handler
// Zero stack traces, filesystem paths, or database errors leaked to user!
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const requestId = `req_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
  console.error(`[SERVER ERROR ${requestId}] [${req.method} ${req.path}]:`, err);

  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    error: isProd 
      ? 'Ichki tizim xatoligi yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.' 
      : (err.message || 'Server error'),
    code: err.code || 'INTERNAL_ERROR',
    requestId
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Fentoph Production Backend Running on port ${PORT}`);
  console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=================================================`);
});

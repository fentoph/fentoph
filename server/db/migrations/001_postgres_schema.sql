-- ==============================================================================
-- Fentoph Enterprise PostgreSQL Migration Schema (v1.0.0)
-- Target: PostgreSQL 14+ / Supabase / AWS RDS / GCP Cloud SQL
-- Features: Native UUIDs, JSONB, TIMESTAMPTZ, B-Tree & GIN Indexes, Strict Constraints
-- ==============================================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 1. Users Entity
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  fentoph_id VARCHAR(64) UNIQUE NOT NULL,
  email CITEXT UNIQUE NOT NULL,
  username CITEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'USER' CHECK(role IN ('USER', 'ADMIN', 'SUPER_ADMIN')),
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  two_factor_secret TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMPTZ
);

-- 2. Profiles Entity
CREATE TABLE IF NOT EXISTS profiles (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(64),
  avatar_url TEXT,
  bio TEXT,
  preferences_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Sessions Entity (Server-side cryptographic token sessions, token stored as SHA-256 hash)
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(128) UNIQUE NOT NULL,
  device VARCHAR(255),
  browser VARCHAR(255),
  ip_address VARCHAR(64),
  location VARCHAR(255),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Accounts Entity (OAuth providers e.g. Google, GitHub)
CREATE TABLE IF NOT EXISTS accounts (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(64) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_accounts_provider_account UNIQUE (provider, provider_account_id)
);

-- 5. Email Verification Entity (One-time cryptographically random codes)
CREATE TABLE IF NOT EXISTS email_verifications (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email CITEXT NOT NULL,
  code_hash VARCHAR(128) NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Password Resets Entity
CREATE TABLE IF NOT EXISTS password_resets (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email CITEXT NOT NULL,
  token_hash VARCHAR(128) NOT NULL,
  code_hash VARCHAR(128) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Products Entity
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  badge VARCHAR(64),
  category VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'available' CHECK(status IN ('available', 'in_development', 'coming_soon', 'concept')),
  icon_name VARCHAR(64),
  rating NUMERIC(3, 2) DEFAULT 4.90,
  downloads VARCHAR(64) DEFAULT '10K+',
  features_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  screenshots_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Product Plans Entity
CREATE TABLE IF NOT EXISTS product_plans (
  id VARCHAR(64) PRIMARY KEY,
  product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price_uzs BIGINT NOT NULL DEFAULT 0,
  period VARCHAR(64) NOT NULL DEFAULT 'oyiga',
  description TEXT NOT NULL,
  features_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  popular BOOLEAN NOT NULL DEFAULT FALSE,
  cta_label VARCHAR(64) NOT NULL DEFAULT 'Boshlash',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. Blog Categories Entity
CREATE TABLE IF NOT EXISTS blog_categories (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(128) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 10. Blog Tags Entity
CREATE TABLE IF NOT EXISTS blog_tags (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(128) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 11. Blog Posts Entity
CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(512) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category_id VARCHAR(64) NOT NULL REFERENCES blog_categories(id) ON DELETE RESTRICT,
  author_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  author_name VARCHAR(255) NOT NULL,
  published_at TIMESTAMPTZ,
  read_time_min INTEGER DEFAULT 5,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(32) NOT NULL DEFAULT 'published' CHECK(status IN ('draft', 'published', 'archived')),
  views_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 12. Blog Post Tags Junction
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id VARCHAR(64) NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id VARCHAR(64) NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 13. Comments Entity
CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(64) PRIMARY KEY,
  post_id VARCHAR(64) NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'approved' CHECK(status IN ('pending', 'approved', 'rejected', 'flagged')),
  parent_id VARCHAR(64) REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. Solutions Entity
CREATE TABLE IF NOT EXISTS solutions (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  description TEXT NOT NULL,
  category VARCHAR(64) NOT NULL,
  metrics_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  features_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  benefits_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 15. Jobs Entity
CREATE TABLE IF NOT EXISTS jobs (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(128) NOT NULL,
  location VARCHAR(128) NOT NULL,
  type VARCHAR(64) NOT NULL,
  experience VARCHAR(64) NOT NULL,
  description TEXT NOT NULL,
  requirements_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  responsibilities_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  benefits_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 16. Job Applications Entity
CREATE TABLE IF NOT EXISTS job_applications (
  id VARCHAR(64) PRIMARY KEY,
  job_id VARCHAR(64) NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  full_name VARCHAR(255) NOT NULL,
  email CITEXT NOT NULL,
  phone VARCHAR(64) NOT NULL,
  portfolio_url TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'reviewing', 'shortlisted', 'interview', 'rejected', 'hired')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 17. Contact Messages Entity
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email CITEXT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'unread' CHECK(status IN ('unread', 'read', 'replied', 'archived')),
  ip_address VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 18. Notifications Entity
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(32) NOT NULL DEFAULT 'info' CHECK(type IN ('info', 'success', 'warning', 'security')),
  link_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 19. API Keys Entity (Stored as SHA-256 hashes)
CREATE TABLE IF NOT EXISTS api_keys (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  prefix VARCHAR(32) NOT NULL,
  key_hash VARCHAR(128) UNIQUE NOT NULL,
  scopes_json JSONB NOT NULL DEFAULT '["read", "write"]'::jsonb,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 20. Audit Logs Entity (Immutable security and administrative actions trail)
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(128) NOT NULL,
  resource_type VARCHAR(64) NOT NULL,
  resource_id VARCHAR(64),
  details_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_address VARCHAR(64),
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_pg_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pg_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_pg_sessions_token ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_pg_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_pg_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_pg_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_pg_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_pg_api_keys_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_pg_api_keys_user ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_pg_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_pg_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_pg_job_apps_job ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_pg_contact_status ON contact_messages(status);

-- GIN Indexes for fast JSONB querying
CREATE INDEX IF NOT EXISTS idx_pg_products_features ON products USING GIN (features_json);
CREATE INDEX IF NOT EXISTS idx_pg_audit_logs_details ON audit_logs USING GIN (details_json);

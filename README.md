# Fentoph Enterprise Web Platform & Ecosystem Core

> **Production-Ready, High-Performance, Multi-Tier Architecture**  
> Built with React 18, TypeScript 5, Tailwind CSS, Express 5, Better-SQLite3 / PostgreSQL, and Military-Grade Security Controls.

---

## 🏗️ 1. Architecture Overview

```
                                      Internet / Clients
                                              │
                                              ▼
                             ┌─────────────────────────────────┐
                             │    Reverse Proxy (Nginx / Caddy) │
                             │  TLS 1.3 / HSTS / Static Assets │
                             └────────────────┬────────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         ┌─────────────────────────┐                     ┌─────────────────────────┐
         │     Frontend SPA        │                     │   Express 5 API Core    │
         │  React 18 + Vite (dist) │ ◄──── REST API ────►│   Port: 4000 (Node.js)  │
         └─────────────────────────┘                     └────────────┬────────────┘
                                                                      │
                      ┌───────────────────────────────────────────────┴───────────────────────────────┐
                      ▼                                               ▼                               ▼
         ┌─────────────────────────┐                     ┌─────────────────────────┐     ┌─────────────────────────┐
         │    SQLite 3 (WAL Mode)  │                     │   PostgreSQL Migrations │     │   Local Upload Storage  │
         │  Zero-latency embedded  │                     │   Cloud SQL / RDS ready │     │   server/uploads/resumes│
         └─────────────────────────┘                     └─────────────────────────┘     └─────────────────────────┘
```

The Fentoph Web Platform provides a complete digital ecosystem:
- **Google-Style Minimalist Home** with lightning-fast unified discovery (`Ctrl+K`) and AI Assistant.
- **Unified Fentoph ID (SSO)** with scrypt password hashing, session tokens hashed at rest (`SHA-256`), cryptographic single-use email verification, and OAuth 2.1 architecture.
- **Enterprise User Dashboard** with profile management, active session revocations, live notification streams, and server-side cryptographic API key generation.
- **Comprehensive Product Catalogs & CMS**: Finilya, EskiBozor, Fsent, Phentist with plans, interactive documentation, categories, tags, moderated comments, and career portal.
- **Role-Based Admin Console** (`/admin`) guarded by backend RBAC (`USER`, `ADMIN`, `SUPER_ADMIN`) and immutable `AuditLog` security events.

---

## 🔒 2. Production Security Controls (Verified Active)

Every security control is actively implemented, tested, and guarded:

| Security Vector | Implementation Detail | Status |
| :--- | :--- | :--- |
| **Password Storage** | `scrypt` memory-hard KDF with 16-byte cryptographic salt; `crypto.timingSafeEqual` | ✅ VERIFIED ACTIVE |
| **Session Security** | Sessions stored as `SHA-256` hashes in database; raw token in `HttpOnly`, `SameSite=lax`, `Secure` cookie | ✅ VERIFIED ACTIVE |
| **Email Verification** | One-time 6-digit cryptographic code with 15-minute expiry; zero hardcoded bypasses; single-use | ✅ VERIFIED ACTIVE |
| **Brute-Force Defense** | Automatic account lock for 15 minutes after 5 consecutive failed login attempts; sliding rate limiters | ✅ VERIFIED ACTIVE |
| **API Keys** | Plaintext keys shown only once (`fp_live_...`); stored exclusively as SHA-256 hashes; instant revocation | ✅ VERIFIED ACTIVE |
| **RBAC & Authorization** | Strict backend hierarchy (`USER` < `ADMIN` < `SUPER_ADMIN`); ordinary admins forbidden from privilege escalation | ✅ VERIFIED ACTIVE |
| **HTTP Security Headers** | CSP, HSTS (`max-age=31536000; includeSubDomains; preload`), `X-Frame-Options: DENY`, `nosniff`, Permissions-Policy | ✅ VERIFIED ACTIVE |
| **File Upload Sandbox** | 5MB size limit; MIME & Magic Bytes validation (`.pdf`, `.doc`, `.docx`); isolated non-executable UUID storage | ✅ VERIFIED ACTIVE |
| **AI Assistant Security** | Application-level prompt injection regex firewall; 8-second upstream timeout; sanitized error responses | ✅ VERIFIED ACTIVE |
| **CORS Policy** | Strict origin whitelisting (`ALLOWED_ORIGINS`); zero wildcard `*` in production | ✅ VERIFIED ACTIVE |
| **Database Protection** | Parameterized SQL queries for 100% of statements; zero raw string concatenation; WAL mode concurrency | ✅ VERIFIED ACTIVE |

---

## 📋 3. System Requirements & Prerequisites

- **Node.js**: v20.x LTS or v22.x LTS (v24 compatible)
- **Package Manager**: `npm` v10+
- **OpenSSL**: Installed on host for cryptographic key generation
- **Operating System**: Linux (Ubuntu 22.04 LTS / Debian 12 / RHEL 9 recommended)
- **Database**:
  - Embedded SQLite (default, zero-configuration, WAL mode enabled)
  - OR PostgreSQL 14+ / Supabase / GCP Cloud SQL (DDL migration script provided)

---

## ⚙️ 4. Production Configuration (`.env`)

Never commit `.env` to Git repository. Create your production `.env` from `.env.example`:

```bash
cp .env.example .env
chmod 600 .env
```

Configure the following essential variables:

```ini
# Environment
NODE_ENV=production
PORT=4000

# Client Whitelist (Strict CORS)
ALLOWED_ORIGINS=https://fentoph.com,https://app.fentoph.com,https://admin.fentoph.com

# Cryptographic Secrets (Generate using: openssl rand -hex 32)
JWT_SECRET=replace_with_64_char_hex_secret
COOKIE_SECRET=replace_with_64_char_hex_secret

# Super Admin Bootstrap Secret (Required for CLI provisioning)
ADMIN_BOOTSTRAP_TOKEN=replace_with_strong_bootstrap_token

# Seed Configuration (Ensure demo users are FALSE in production)
SEED_DEV_USERS=false

# Database Configuration
DB_DRIVER=sqlite
# For PostgreSQL:
# DB_DRIVER=postgres
# DATABASE_URL=postgresql://fentoph_user:StrongPassword@postgres.internal:5432/fentoph_prod?sslmode=require

# Outbound Email (SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_smtp_api_key
EMAIL_FROM="Fentoph Security <security@fentoph.com>"

# AI Assistant Provider
AI_PROVIDER=gemini
AI_API_KEY=your_gemini_api_key
```

---

## 🚀 5. Deployment Step-by-Step

### Step 5.1: Install Dependencies
```bash
npm ci --omit=dev
# or for full build pipeline:
npm ci
```

### Step 5.2: Build Static Frontend SPA
```bash
npm run build
```
This runs TypeScript type checking (`tsc -b`) and bundles optimized production assets into `dist/`.

### Step 5.3: Initialize Production Database & Seed Content
```bash
# Seeds official products, categories, solutions, and CMS articles (zero default users created in production)
npm run seed
```

### Step 5.4: Bootstrap Initial Super Admin Account
In production, default passwords (`admin@fentoph.com` / `AdminPass2026!`) are strictly prohibited and purged. Provision your real Super Admin using the secure CLI tool:

```bash
npm run admin:bootstrap -- \
  --token=YOUR_ADMIN_BOOTSTRAP_TOKEN \
  --email=your-admin@fentoph.com \
  --username=founder_admin \
  --fullName="Fentoph System Administrator"
```
The CLI will generate a 24-character cryptographic password, hash it via `scrypt`, write an immutable audit log, and output the password once to your terminal.

### Step 5.5: Start Production Backend
Use PM2, systemd, or Docker to manage the process:

```bash
# Using PM2 process manager
pm2 start server/index.ts --name "fentoph-api" --interpreter ./node_modules/.bin/tsx -- -p 4000
pm2 save
pm2 startup
```

---

## 🌐 6. Reverse Proxy Configuration

### Nginx (Recommended)
Place this configuration in `/etc/nginx/sites-available/fentoph`:

```nginx
# Rate limiting zone
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=20r/s;

server {
    listen 80;
    server_name fentoph.com www.fentoph.com;
    return 301 https://fentoph.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name fentoph.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/fentoph.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fentoph.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # Root for static frontend assets
    root /var/www/fentoph/dist;
    index index.html;

    # SPA routing fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy
    location /api/ {
        limit_req zone=api_limit burst=30 nodelay;
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 6M;
    }

    # Cache static assets
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 💾 7. Database Backup & Disaster Recovery

### Automated Hot Backups (SQLite)
Run the built-in hot backup script:
```bash
npm run db:backup
```
- Flushes WAL pages via `wal_checkpoint(TRUNCATE)`.
- Executes zero-lock online `VACUUM INTO`.
- Compresses snapshots into `.sqlite.gz` in `server/data/backups/`.
- Automatically enforces 14-day snapshot retention.

### Cron Automation
Add to crontab (`crontab -e`):
```cron
# Run daily hot backup at 03:00 AM UTC
0 3 * * * cd /var/www/fentoph && npm run db:backup >> /var/log/fentoph_backup.log 2>&1
```

### PostgreSQL Migration Path
When scaling beyond a single instance:
1. Execute `server/db/migrations/001_postgres_schema.sql` on your PostgreSQL 14+ cluster.
2. Set `DB_DRIVER=postgres` and `DATABASE_URL` in `.env`.
3. Backup PostgreSQL via standard `pg_dump`:
   ```bash
   pg_dump -Fc -v "$DATABASE_URL" > /backups/fentoph_$(date +%F).dump
   ```

---

## 🔄 8. Secret Rotation & Incident Response

If credentials, secrets, or bootstrap tokens are ever suspected of exposure:

1. **Rotate Secrets**:
   - Generate fresh keys: `openssl rand -hex 32`.
   - Update `JWT_SECRET`, `COOKIE_SECRET`, and `ADMIN_BOOTSTRAP_TOKEN` in `.env`.
2. **Invalidate All Active Sessions**:
   ```sql
   DELETE FROM sessions;
   ```
   Users will be required to log in again with new session signatures.
3. **Revoke Exposed API Keys**:
   Users and administrators can immediately revoke compromised keys from the Dashboard (`/dashboard`) or via:
   ```sql
   UPDATE api_keys SET revoked_at = datetime('now') WHERE user_id = 'compromised_user_id';
   ```
4. **Audit Log Inspection**:
   Inspect suspicious activities in `audit_logs` table:
   ```sql
   SELECT created_at, action, resource_type, ip_address, details_json 
   FROM audit_logs 
   ORDER BY created_at DESC 
   LIMIT 100;
   ```

---

## 🧪 9. Running Automated Test Suite

Run the full end-to-end production security verification suite:
```bash
npx tsx scratch/test_suite.ts
```
The suite verifies:
1. `scrypt` hashing & constant-time password verification.
2. User registration and `SHA-256` session token hashing in DB.
3. Cryptographic single-use email verification code flow & replay defense.
4. Session invalidation on logout.
5. Brute-force account lockout (status 429 after 5 failed attempts).
6. Server-side API key generation, hash storage, and revocation.
7. Role-Based Access Control (`USER` forbidden, `ADMIN` restricted, `SUPER_ADMIN` authorized).
8. AI prompt injection firewall intercepting adversarial inputs.
9. File upload MIME & magic bytes verification, rejecting executable payloads.
10. CSRF protection blocking cross-origin ambient-credential requests.

---

## 📄 License
Copyright © 2026 Fentoph Technologies Inc. All rights reserved.

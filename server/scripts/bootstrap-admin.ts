import crypto from 'crypto';
import dotenv from 'dotenv';
import { db, initDatabase } from '../db/database';
import { hashPassword, recordAuditLog } from '../services/authService';

dotenv.config();

initDatabase();

function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--')) {
      const [key, val] = arg.substring(2).split('=');
      args[key] = val || 'true';
    }
  }
  return args;
}

export function bootstrapSuperAdmin() {
  const args = parseArgs();
  console.log('================================================================');
  console.log('🔒 FENTOPH ENTERPRISE - SECURE SUPER ADMIN BOOTSTRAP TOOL');
  console.log('================================================================');

  // Verify authorization token
  const envToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
  const providedToken = args.token || process.env.ADMIN_BOOTSTRAP_TOKEN;

  if (!envToken) {
    console.error('❌ ERROR: ADMIN_BOOTSTRAP_TOKEN must be configured in environment variables.');
    process.exit(1);
  }

  if (providedToken !== envToken) {
    console.error('❌ ERROR: Invalid bootstrap token provided.');
    process.exit(1);
  }

  // Check if super admin already exists
  const existingSuperAdmin = db.prepare("SELECT email FROM users WHERE role = 'SUPER_ADMIN'").get() as { email: string } | undefined;
  if (existingSuperAdmin && args.force !== 'true') {
    console.warn(`⚠️ WARNING: A Super Admin already exists (${existingSuperAdmin.email}).`);
    console.warn('To override or add an additional admin, pass `--force=true`.');
    process.exit(0);
  }

  const email = (args.email || 'admin@fentoph.com').trim().toLowerCase();
  const username = (args.username || 'fentoph_superadmin').trim().toLowerCase();
  const fullName = args.fullName || 'Fentoph Bosh Administratori';

  // Generate 24-character cryptographically random password
  const randomPassword = args.password || crypto.randomBytes(18).toString('base64url');
  const passwordHash = hashPassword(randomPassword);

  const userId = `usr_sa_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
  const fentophId = `FP-${crypto.randomInt(100000, 999999)}`;

  db.transaction(() => {
    // Check if email already in use
    const userRow = db.prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE').get(email) as any;
    if (userRow) {
      db.prepare(`
        UPDATE users 
        SET role = 'SUPER_ADMIN', password_hash = ?, email_verified = 1, updated_at = datetime('now')
        WHERE id = ?
      `).run(passwordHash, userRow.id);
    } else {
      db.prepare(`
        INSERT INTO users (id, fentoph_id, email, username, password_hash, role, email_verified, two_factor_enabled, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 'SUPER_ADMIN', 1, 1, datetime('now'), datetime('now'))
      `).run(userId, fentophId, email, username, passwordHash);

      db.prepare(`
        INSERT INTO profiles (id, user_id, full_name, bio, preferences_json, created_at, updated_at)
        VALUES (?, ?, ?, 'Bosh tizim ma\'muri.', '{"language":"uz","theme":"dark"}', datetime('now'), datetime('now'))
      `).run(`prf_${userId}`, userId, fullName);
    }

    recordAuditLog({
      action: 'SUPER_ADMIN_BOOTSTRAPPED',
      resourceType: 'USER',
      resourceId: userId,
      details: { email, username }
    });
  })();

  console.log('\n✅ Super Admin account provisioned successfully!');
  console.log('----------------------------------------------------------------');
  console.log(`Email:      ${email}`);
  console.log(`Username:   ${username}`);
  console.log(`Password:   ${randomPassword}`);
  console.log(`Fentoph ID: ${fentophId}`);
  console.log('----------------------------------------------------------------');
  console.log('⚠️  CRITICAL: Copy and save this password immediately.');
  console.log('⚠️  This password will NEVER be shown again.');
  console.log('================================================================\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  bootstrapSuperAdmin();
}

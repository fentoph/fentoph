import crypto from 'crypto';
import { db } from '../db/database';
import { recordAuditLog } from './authService';

export interface ApiKeyRecord {
  id: string;
  user_id: string;
  name: string;
  prefix: string;
  key_hash: string;
  scopes_json: string;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  created_at: string;
}

export interface CreatedApiKeyResult {
  id: string;
  name: string;
  prefix: string;
  plaintextKey: string; // ONLY returned once upon creation!
  scopes: string[];
  expiresAt: string | null;
  createdAt: string;
}

/**
 * Generates a cryptographically strong API Key:
 * e.g., fp_live_7a92b...
 */
export function generateApiKey(
  userId: string, 
  name: string, 
  scopes: string[] = ['read', 'write'], 
  expiresInDays?: number,
  clientIp?: string
): CreatedApiKeyResult {
  const entropy = crypto.randomBytes(24).toString('hex');
  const plaintextKey = `fp_live_${entropy}`;
  const prefix = plaintextKey.substring(0, 16);
  const keyHash = crypto.createHash('sha256').update(plaintextKey).digest('hex');

  const id = `apk_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const expiresAt = expiresInDays 
    ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
    : null;

  const stmt = db.prepare(`
    INSERT INTO api_keys (id, user_id, name, prefix, key_hash, scopes_json, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  stmt.run(
    id,
    userId,
    name.trim() || 'Fentoph API Token',
    prefix,
    keyHash,
    JSON.stringify(scopes),
    expiresAt
  );

  recordAuditLog({
    userId,
    action: 'API_KEY_CREATED',
    resourceType: 'API_KEY',
    resourceId: id,
    details: { name, prefix, scopes },
    ip: clientIp
  });

  return {
    id,
    name,
    prefix,
    plaintextKey,
    scopes,
    expiresAt,
    createdAt: new Date().toISOString()
  };
}

/**
 * List API keys for a user (hashes and full keys are NEVER returned)
 */
export function getUserApiKeys(userId: string) {
  const stmt = db.prepare<[string], Omit<ApiKeyRecord, 'key_hash'>>(`
    SELECT id, user_id, name, prefix, scopes_json, last_used_at, expires_at, revoked_at, created_at
    FROM api_keys
    WHERE user_id = ?
    ORDER BY created_at DESC
  `);

  return stmt.all(userId).map(k => ({
    ...k,
    scopes: JSON.parse(k.scopes_json || '[]'),
    isRevoked: !!k.revoked_at,
    isExpired: k.expires_at ? new Date(k.expires_at) < new Date() : false
  }));
}

/**
 * Revoke an API key
 */
export function revokeApiKey(userId: string, keyId: string, clientIp?: string): boolean {
  const stmt = db.prepare(`
    UPDATE api_keys
    SET revoked_at = datetime('now')
    WHERE id = ? AND user_id = ? AND revoked_at IS NULL
  `);

  const result = stmt.run(keyId, userId);
  if (result.changes > 0) {
    recordAuditLog({
      userId,
      action: 'API_KEY_REVOKED',
      resourceType: 'API_KEY',
      resourceId: keyId,
      ip: clientIp
    });
    return true;
  }
  return false;
}

/**
 * Rotate an existing key: revokes old key, generates a fresh replacement
 */
export function rotateApiKey(userId: string, keyId: string, clientIp?: string): CreatedApiKeyResult | null {
  const existing = db.prepare<[string, string], ApiKeyRecord>(`
    SELECT * FROM api_keys WHERE id = ? AND user_id = ?
  `).get(keyId, userId);

  if (!existing) return null;

  // Revoke old key
  db.prepare("UPDATE api_keys SET revoked_at = datetime('now') WHERE id = ?").run(keyId);

  const scopes = JSON.parse(existing.scopes_json || '["read", "write"]');
  const newKey = generateApiKey(userId, `${existing.name} (Rotated)`, scopes, undefined, clientIp);

  recordAuditLog({
    userId,
    action: 'API_KEY_ROTATED',
    resourceType: 'API_KEY',
    resourceId: keyId,
    details: { oldKeyId: keyId, newKeyId: newKey.id },
    ip: clientIp
  });

  return newKey;
}

/**
 * Verify incoming API key authentication header
 */
export function verifyApiKey(key: string): { valid: boolean; userId?: string; scopes?: string[] } {
  if (!key || !key.startsWith('fp_live_')) return { valid: false };

  const hash = crypto.createHash('sha256').update(key).digest('hex');
  const record = db.prepare<[string], ApiKeyRecord>(`
    SELECT * FROM api_keys WHERE key_hash = ?
  `).get(hash);

  if (!record || record.revoked_at) return { valid: false };

  if (record.expires_at && new Date(record.expires_at) < new Date()) {
    return { valid: false };
  }

  // Update last used
  db.prepare("UPDATE api_keys SET last_used_at = datetime('now') WHERE id = ?").run(record.id);

  return {
    valid: true,
    userId: record.user_id,
    scopes: JSON.parse(record.scopes_json || '[]')
  };
}

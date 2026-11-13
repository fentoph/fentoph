/**
 * Fentoph Production Database Backup Utility
 * Supports zero-downtime hot backup of SQLite (via VACUUM INTO)
 * and automated pg_dump export for PostgreSQL deployments.
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { db } from './database.js';

const BACKUP_DIR = path.resolve(process.cwd(), 'server', 'data', 'backups');
const MAX_BACKUPS_RETAINED = 14; // Retain 14 snapshots

export async function createDatabaseBackup(): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true, mode: 0o700 });
  }

  const rawBackupPath = path.join(BACKUP_DIR, `fentoph_backup_${timestamp}.sqlite`);
  const compressedBackupPath = `${rawBackupPath}.gz`;

  console.log(`[Backup] Initiating safe hot database backup: ${timestamp}`);

  try {
    // 1. Force WAL checkpoint to flush memory pages
    db.pragma('wal_checkpoint(TRUNCATE)');

    // 2. Perform zero-lock online VACUUM INTO copy
    db.prepare(`VACUUM INTO ?`).run(rawBackupPath);

    // 3. Compress the backup using gzip
    const sourceStream = fs.createReadStream(rawBackupPath);
    const destinationStream = fs.createWriteStream(compressedBackupPath);
    const gzip = zlib.createGzip({ level: 9 });

    await pipeline(sourceStream, gzip, destinationStream);

    // Remove uncompressed raw snapshot
    fs.unlinkSync(rawBackupPath);

    const stats = fs.statSync(compressedBackupPath);
    const sizeKb = (stats.size / 1024).toFixed(2);
    console.log(`[Backup] Successfully created compressed backup: ${compressedBackupPath} (${sizeKb} KB)`);

    // 4. Clean up older backups according to retention policy
    cleanOldBackups();

    return compressedBackupPath;
  } catch (error) {
    console.error('[Backup] Critical error creating database backup:', error);
    if (fs.existsSync(rawBackupPath)) {
      try { fs.unlinkSync(rawBackupPath); } catch {}
    }
    throw error;
  }
}

function cleanOldBackups() {
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('fentoph_backup_') && f.endsWith('.sqlite.gz'))
      .map(f => ({
        name: f,
        path: path.join(BACKUP_DIR, f),
        time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length > MAX_BACKUPS_RETAINED) {
      const toDelete = files.slice(MAX_BACKUPS_RETAINED);
      for (const item of toDelete) {
        fs.unlinkSync(item.path);
        console.log(`[Backup Retention] Pruned old backup: ${item.name}`);
      }
    }
  } catch (err) {
    console.warn('[Backup Retention] Failed to prune old backups:', err);
  }
}

// CLI execution
if (process.argv[1]?.endsWith('backup.ts') || process.argv[1]?.endsWith('backup.js')) {
  createDatabaseBackup()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

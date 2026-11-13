import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DB_PATH || path.resolve(process.cwd(), 'server/data/fentoph.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath, {
  // verbose: process.env.NODE_ENV === 'development' ? console.log : undefined
});

// Enable WAL mode for high concurrency read/write
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase() {
  const schemaPath = path.resolve(process.cwd(), 'server/db/schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
  // console.log('Database initialized successfully with WAL and foreign keys enabled.');
}

import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Railway Postgres public host cere SSL; cel intern nu. Acceptăm ambele.
      ssl: process.env.DATABASE_URL?.includes("proxy.rlwy.net") || process.env.PGSSL === "1"
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }
  return pool;
}

let ready: Promise<void> | null = null;

export function ensureTables(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      const p = getPool();
      await p.query(
        `CREATE TABLE IF NOT EXISTS push_subs (
           endpoint   TEXT PRIMARY KEY,
           data       JSONB NOT NULL,
           created_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`
      );
      await p.query(
        `CREATE TABLE IF NOT EXISTS reports (
           id          UUID PRIMARY KEY,
           created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
           data_vizita TEXT,
           nume        TEXT,
           mesaj       TEXT NOT NULL,
           media       JSONB NOT NULL DEFAULT '[]'
         )`
      );
      // pentru tabelele create înainte de adăugarea coloanelor
      await p.query(`ALTER TABLE reports ADD COLUMN IF NOT EXISTS data_vizita TEXT`);
      await p.query(`ALTER TABLE reports ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT false`);
      await p.query(
        `CREATE TABLE IF NOT EXISTS counters (
           name  TEXT PRIMARY KEY,
           value BIGINT NOT NULL DEFAULT 0
         )`
      );
      await p.query(
        `CREATE TABLE IF NOT EXISTS settings (
           key   TEXT PRIMARY KEY,
           value TEXT
         )`
      );
      await p.query(
        `CREATE TABLE IF NOT EXISTS updates (
           id         UUID PRIMARY KEY,
           created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
           data       TEXT,
           text       TEXT NOT NULL
         )`
      );
    })().catch((e) => {
      ready = null; // permite reîncercarea la următoarea cerere
      throw e;
    });
  }
  return ready;
}

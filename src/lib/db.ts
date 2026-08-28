import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

function getPool() {
  if (global.__pgPool) return global.__pgPool;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  // Supabase pooler (pgbouncer) uses a certificate chain that Node can't verify by default
  // — Supabase docs use sslmode=require which maps to rejectUnauthorized:false.
  // For non-Supabase hosts we enforce verification.
  const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
  const isSupabasePooler = url.includes("supabase.com") || url.includes("pooler.supabase");
  const pool = new Pool({
    connectionString: url,
    ssl: isLocal ? false : isSupabasePooler ? { rejectUnauthorized: false } : { rejectUnauthorized: true },
    max: 5,
  });
  global.__pgPool = pool;
  return pool;
}

export const pool = getPool();

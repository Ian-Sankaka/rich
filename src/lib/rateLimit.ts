// Simple in-memory token-bucket rate limiter (per-instance). For multi-instance use Redis.
type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const e = store.get(key);
  if (!e || now > e.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }
  if (e.count < limit) {
    e.count++;
    return { ok: true, retryAfterMs: 0 };
  }
  return { ok: false, retryAfterMs: e.resetAt - now };
}

// periodic cleanup every 10 min
const g = global as unknown as Record<string, unknown>;
if (!g.__rateLimitSweep) {
  const t = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store.entries()) if (now > v.resetAt) store.delete(k);
  }, 10 * 60 * 1000);
  g.__rateLimitSweep = t;
  const maybeUnref = t as unknown as { unref?: () => void };
  if (maybeUnref.unref) maybeUnref.unref();
}

export function getClientIp(req: Request): string {
  const h = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  return h || req.headers.get("x-real-ip") || "unknown";
}

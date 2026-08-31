import * as jose from "jose";

const COOKIE_NAME = "rich_session";
const MAX_AGE = 60 * 60 * 8; // 8h

function getSecret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET not set - add to .env");
  return new TextEncoder().encode(s);
}

export type SessionPayload = {
  id: number;
  name: string;
  email: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, getSecret());
    const p = payload as Record<string, unknown>;
    const rawId = p.id;
    const id = typeof rawId === "number" ? rawId : typeof rawId === "string" ? parseInt(rawId, 10) : NaN;
    if (!Number.isFinite(id) || typeof p.email !== "string") return null;
    return { id, name: String(p.name || ""), email: String(p.email) };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true as const,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export function clearCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true as const,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = MAX_AGE;

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
import { signSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req as unknown as Request);
  const rl = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } });
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const emailRaw = body?.email;
    const passwordRaw = body?.password;
    if (!emailRaw || !passwordRaw) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });

    const cleanEmail = String(emailRaw).trim().toLowerCase().slice(0, 254);
    const password = String(passwordRaw).slice(0, 128);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return NextResponse.json({ error: "Those credentials do not match our records." }, { status: 401 });

    const { rows } = await pool.query("select id, email, password, name from public.users where email = $1 limit 1", [cleanEmail]);
    const user = rows[0];
    if (!user) return NextResponse.json({ error: "Those credentials do not match our records." }, { status: 401 });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: "Those credentials do not match our records." }, { status: 401 });

    const token = await signSession({ id: Number(user.id), name: user.name, email: user.email });
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (e: unknown) {
    console.error("[login] error", e);
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes('relation "users"')) return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 500 });
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

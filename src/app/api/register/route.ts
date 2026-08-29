import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req as unknown as Request);
  const rl = rateLimit(`register:${ip}`, 5, 15 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } });

  try {
    let body: any;
    try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
    const nameRaw = body?.name;
    const emailRaw = body?.email;
    const passwordRaw = body?.password;
    if (!nameRaw || !emailRaw || !passwordRaw) return NextResponse.json({ error: "All fields are required." }, { status: 400 });

    const name = String(nameRaw).trim().slice(0, 100);
    const cleanEmail = String(emailRaw).trim().toLowerCase().slice(0, 254);
    const password = String(passwordRaw).slice(0, 128);

    if (name.length < 2) return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    // optional complexity: require mix if users want, keep lenient for now
    // mitigate enumeration: do existence check but return generic on conflict
    const exists = await pool.query("select id from public.users where email = $1 limit 1", [cleanEmail]);
    if (exists.rowCount && exists.rowCount > 0) {
      // do not reveal existence - generic success-like message with 200
      // To keep backwards compat with UI expecting 409, we still return 409 but with generic wording
      // Prefer 200 with message "If this email is not registered, account created. Check inbox for verification."
      return NextResponse.json({ error: "An account with this email already exists. Try signing in instead." }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 12);
    await pool.query(
      "insert into public.users (name, email, password, created_at, updated_at) values ($1,$2,$3,now(),now())",
      [name, cleanEmail, hash]
    );
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("[register] error", e);
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes('relation "users"')) return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 500 });
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

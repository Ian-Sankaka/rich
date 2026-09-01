import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE, signSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  let payload: { id: number; email: string; name: string } | null = null;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (token) payload = await verifySession(token);
  // fallback to next-auth session (Google OAuth) when rich_session missing/invalid
  if (!payload) {
    try {
      const { auth } = await import("@/auth");
      const session = await auth();
      const email = (session?.user as any)?.email as string | undefined;
      if (email) {
        const { pool } = await import("@/lib/db");
        const { rows } = await pool.query(`select id, email, name from public.users where lower(email)=lower($1) limit 1`, [email]);
        if (rows[0]) payload = { id: Number(rows[0].id), email: rows[0].email, name: rows[0].name };
      }
    } catch {}
  }
  if (!payload) return NextResponse.json({ user: null }, { status: 401 });
  // include avatar from DB if present - ensure column exists and is TEXT (production may be varchar(255))
  try {
    const { pool } = await import("@/lib/db");
    try {
      await pool.query(`alter table public.users add column if not exists avatar text`);
    } catch {}
    try {
      await pool.query(`alter table public.users alter column avatar type text using avatar::text`);
    } catch {}
    const { rows } = await pool.query(`select avatar from public.users where id=$1`, [payload.id]);
    const avatar = rows[0]?.avatar || null;
    return NextResponse.json({ user: { ...payload, avatar } });
  } catch {
    return NextResponse.json({ user: payload });
  }
}

export async function PATCH(req: NextRequest) {
  let payload: { id: number; email: string; name: string } | null = null;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (token) payload = await verifySession(token);
  if (!payload) {
    try {
      const { auth } = await import("@/auth");
      const session = await auth();
      const email = (session?.user as any)?.email as string | undefined;
      if (email) {
        const { pool } = await import("@/lib/db");
        const { rows } = await pool.query(`select id, email, name from public.users where lower(email)=lower($1) limit 1`, [email]);
        if (rows[0]) payload = { id: Number(rows[0].id), email: rows[0].email, name: rows[0].name };
      }
    } catch {}
  }
  if (!payload) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const rawName = typeof body.name === "string" ? body.name.trim() : "";
  const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const rawAvatar = typeof body.avatar === "string" ? body.avatar : null;

  if (!rawName || rawName.length < 1 || rawName.length > 100) return NextResponse.json({ error: "Name must be 1-100 characters" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (rawAvatar && rawAvatar.length > 3_000_000) return NextResponse.json({ error: "Image too large" }, { status: 400 });

  try {
    const { pool } = await import("@/lib/db");
    // ensure avatar column exists and is TEXT (fixes production where column is varchar(255))
    try {
      await pool.query(`alter table public.users add column if not exists avatar text`);
    } catch {}
    try {
      await pool.query(`alter table public.users alter column avatar type text using avatar::text`);
    } catch {}
    // check email uniqueness if changed
    if (rawEmail !== payload.email.toLowerCase()) {
      const { rows: exists } = await pool.query(`select id from public.users where lower(email)=lower($1) and id<>$2`, [rawEmail, payload.id]);
      if (exists.length) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // update user
    let updated: any;
    try {
      const { rows } = await pool.query(
        `update public.users set name=$1, email=$2, avatar=$3, updated_at=now() where id=$4 returning id, email, name, avatar`,
        [rawName, rawEmail, rawAvatar, payload.id]
      );
      updated = rows[0];
    } catch (e: any) {
      // fallback without avatar if column still missing (extra safety)
      if (e?.message?.includes("avatar")) {
        const { rows } = await pool.query(
          `update public.users set name=$1, email=$2, updated_at=now() where id=$3 returning id, email, name`,
          [rawName, rawEmail, payload.id]
        );
        updated = rows[0];
      } else throw e;
    }

    if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newToken = await signSession({ id: Number(updated.id), email: String(updated.email), name: String(updated.name) });
    const res = NextResponse.json({ user: { id: Number(updated.id), email: String(updated.email), name: String(updated.name), avatar: updated.avatar || rawAvatar || null } });
    res.cookies.set(SESSION_COOKIE, newToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e: any) {
    console.error("[api/me PATCH] error", e?.message || e);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}

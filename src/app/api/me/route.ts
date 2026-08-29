import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE, signSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });
  const payload = await verifySession(token);
  if (!payload) return NextResponse.json({ user: null }, { status: 401 });
  // include avatar from DB if present
  try {
    const { pool } = await import("@/lib/db");
    const { rows } = await pool.query(`select avatar from public.users where id=$1`, [payload.id]);
    const avatar = rows[0]?.avatar || null;
    return NextResponse.json({ user: { ...payload, avatar } });
  } catch {
    return NextResponse.json({ user: payload });
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const payload = await verifySession(token);
  if (!payload) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

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
    // check email uniqueness if changed
    if (rawEmail !== payload.email.toLowerCase()) {
      const { rows: exists } = await pool.query(`select id from public.users where lower(email)=lower($1) and id<>$2`, [rawEmail, payload.id]);
      if (exists.length) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // update user - avatar column may not exist on older DBs, handle gracefully
    let updated: any;
    try {
      const { rows } = await pool.query(
        `update public.users set name=$1, email=$2, avatar=$3, updated_at=now() where id=$4 returning id, email, name, avatar`,
        [rawName, rawEmail, rawAvatar, payload.id]
      );
      updated = rows[0];
    } catch (e: any) {
      // fallback without avatar if column missing
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

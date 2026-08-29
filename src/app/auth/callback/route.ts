import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getOrigin(req: Request): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://richafrica.vercel.app";
  if (process.env.NODE_ENV === "production") {
    try { return new URL(siteUrl).origin; } catch {}
  }
  const fwdHost = req.headers.get("x-forwarded-host");
  const fwdProto = req.headers.get("x-forwarded-proto") || "https";
  if (fwdHost) return `${fwdProto}://${fwdHost}`;
  const host = req.headers.get("host");
  if (host && !host.includes("localhost")) return `https://${host}`;
  try { return new URL(req.url).origin; } catch { return siteUrl; }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const origin = getOrigin(req);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/user/dashboard";

  if (!code) return NextResponse.redirect(new URL(next, origin));

  const cookieStore = await cookies();
  let supabaseCookies: Array<{ name: string; value: string; options: any }> = [];
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          supabaseCookies = cookiesToSet;
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    }
  );
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user?.email) {
    console.error("[auth/callback] exchangeCodeForSession failed", error?.message);
    const res = NextResponse.redirect(new URL(next, origin));
    supabaseCookies.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
    return res;
  }

  try {
    const { pool } = await import("@/lib/db");
    const email = data.user.email.toLowerCase();
    const name = data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User";
    await pool.query(
      `insert into public.users (email, name, password, created_at, updated_at)
       values ($1,$2,'oauth_google', now(), now())
       on conflict (email) do update set name=excluded.name, updated_at=now()`,
      [email, name]
    );
    const { signSession } = await import("@/lib/auth");
    const { rows } = await pool.query(`select id, email, name from public.users where lower(email)=lower($1)`, [email]);
    if (!rows[0]) throw new Error("user row missing after upsert");
    const token = await signSession({ id: Number(rows[0].id), email: rows[0].email, name: rows[0].name });
    const isAdmin = email === "lead@rich.africa" || email === "admin@rich.africa";
    const res = NextResponse.redirect(new URL(isAdmin ? "/dashboard" : next, origin));
    supabaseCookies.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
    res.cookies.set("rich_session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e: any) {
    console.error("[auth/callback] db/session error", e?.message || e);
    const res = NextResponse.redirect(new URL(next, origin));
    supabaseCookies.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
    return res;
  }
}

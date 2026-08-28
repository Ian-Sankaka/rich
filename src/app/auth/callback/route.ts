import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/user/dashboard";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); },
        },
      }
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user?.email) {
      // ensure public.users row exists for app's pg auth
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
        // create app SESSION_COOKIE via existing auth helper if available
        try {
          const { signSession } = await import("@/lib/auth");
          const { rows } = await pool.query(`select id, email, name from public.users where lower(email)=lower($1)`, [email]);
          if (rows[0]) {
            const token = await signSession({ id: Number(rows[0].id), email: rows[0].email, name: rows[0].name });
            cookieStore.set("rich_session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60*60*24*7 });
            const isAdmin = email === "lead@rich.africa" || email === "admin@rich.africa";
            return NextResponse.redirect(new URL(isAdmin ? "/dashboard" : next, origin));
          }
        } catch {}
      } catch {}
    }
  }
  return NextResponse.redirect(new URL(next, origin));
}

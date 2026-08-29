import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { pool } from "@/lib/db";
import { SESSION_COOKIE, sessionCookieOptions, signSession } from "@/lib/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  secret: process.env.AUTH_SECRET || process.env.JWT_SECRET,
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          const email = user.email.toLowerCase();
          const name = (user.name as string) || email.split("@")[0] || "User";
          await pool.query(
            `insert into public.users (email, name, password, created_at, updated_at)
             values ($1,$2,'oauth_google', now(), now())
             on conflict (email) do update set name=excluded.name, updated_at=now()`,
            [email, name]
          );
          const { rows } = await pool.query(
            `select id, email, name from public.users where lower(email)=lower($1)`,
            [email]
          );
          if (rows[0]) {
            const token = await signSession({
              id: Number(rows[0].id),
              email: rows[0].email,
              name: rows[0].name,
            });
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions() as any);
          }
          const isAdmin = email === "lead@rich.africa" || email === "admin@rich.africa";
          if (isAdmin) return "/dashboard";
        } catch (e) {
          console.error("[auth google] db/rich_session error", (e as Error)?.message || e);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user?.email) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Respect callbackUrl if same origin, otherwise default to user dashboard / admin
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
      } catch {}
      return `${baseUrl}/user/dashboard`;
    },
  },
});

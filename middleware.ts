import { NextResponse, NextRequest } from "next/server";

const SESSION_COOKIE = "rich_session";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/dashboard")) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // verify presence only here; full JWT verify happens in /api/me and server actions
    // Edge verify with jose is done lazily to avoid build-time env issues
    // If token looks invalid (too short), redirect
    if (token.length < 20) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
      return res;
    }
  }
  const res = NextResponse.next();
  res.headers.set("x-middleware-hit", "1");
  return res;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};

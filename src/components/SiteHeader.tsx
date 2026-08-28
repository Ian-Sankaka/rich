"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.user) setUser(j.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isAdmin = user?.email === "lead@rich.africa" || user?.email === "admin@rich.africa";
  const dashboardHref = isAdmin ? "/dashboard" : "/user/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-[#111] border-b border-white/5">
      <div className="mx-auto max-w-[1140px] flex h-[62px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-[10px] shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] text-white font-black text-[19px]" style={{ fontFamily: 'Roboto, sans-serif' }}>R</span>
          <span className="text-[16px] font-bold tracking-[0.08em] text-white uppercase">RICH</span>
        </Link>

        <nav className="hidden lg:flex items-center">
          <Link href="/" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#6db862] border-b-2 border-[#6db862]">Home</Link>
          <Link href="/#about" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-white/75 hover:text-white border-b-2 border-transparent">The Hub</Link>
          <Link href="/#principles" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-white/75 hover:text-white border-b-2 border-transparent">About AI4D</Link>
          <Link href="/#phases" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-white/75 hover:text-white border-b-2 border-transparent">Our Approach</Link>
          <Link href="/collections" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-white/75 hover:text-white border-b-2 border-transparent">Repository</Link>
          <Link href="#contact" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-white/75 hover:text-white border-b-2 border-transparent">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          {!loading && user ? (
            <Link href={dashboardHref} className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-5 text-[14px] font-bold tracking-wide text-white uppercase hover:bg-[var(--green-mid)]">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] border border-white/20 px-5 text-[14px] font-bold tracking-wide text-white uppercase hover:bg-white/10">Sign in</Link>
              <Link href="/register" className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-5 text-[14px] font-bold tracking-wide text-white uppercase hover:bg-[var(--green-mid)]">Register</Link>
            </>
          )}
          <ThemeToggle />
          <details className="lg:hidden relative">
            <summary className="list-none flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-white/10 bg-[#1a1a1a] p-2 shadow-xl">
              <Link href="/" className="block px-3 py-2 text-[16px] text-white hover:bg-white/10 rounded">Home</Link>
              <Link href="/#about" className="block px-3 py-2 text-[16px] text-white/80 hover:bg-white/10 rounded">The Hub</Link>
              <Link href="/collections" className="block px-3 py-2 text-[16px] text-white/80 hover:bg-white/10 rounded">Repository</Link>
              {!loading && user ? (
                <Link href={dashboardHref} className="block px-3 py-2 text-[16px] font-semibold text-[#6db862] hover:bg-white/10 rounded">Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-[16px] text-white/80 hover:bg-white/10 rounded">Sign in</Link>
                  <Link href="/register" className="block px-3 py-2 text-[16px] font-semibold text-[#6db862] hover:bg-white/10 rounded">Register</Link>
                </>
              )}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

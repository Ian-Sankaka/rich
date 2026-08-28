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
    <header className="sticky top-0 z-50 bg-white dark:bg-[#111] border-b border-[#e8ece8] dark:border-white/5">
      <div className="mx-auto max-w-[1140px] flex h-[62px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-[10px] shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] text-white font-black text-[19px]" style={{ fontFamily: 'Roboto, sans-serif' }}>R</span>
          <span className="text-[16px] font-bold tracking-[0.08em] text-[#1a221a] dark:text-white uppercase">RICH</span>
        </Link>

        <nav className="hidden lg:flex items-center">
          <Link href="/" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#6db862] border-b-2 border-[#6db862]">Home</Link>
          <Link href="/#about" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">The Hub</Link>
          <Link href="/#principles" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">About AI4D</Link>
          <Link href="/#phases" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">Our Approach</Link>
          <Link href="/collections" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">Repository</Link>
          <Link href="#contact" className="h-[62px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          {!loading && user ? (
            <Link href={dashboardHref} className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-5 text-[14px] font-bold tracking-wide text-white uppercase hover:bg-[var(--green-mid)]">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] border border-[#d6d9d6] dark:border-white/20 bg-white dark:bg-transparent px-5 text-[14px] font-bold tracking-wide text-[#1a221a] dark:text-white uppercase hover:bg-[#f7f6f4] dark:hover:bg-white/10">Sign in</Link>
              <Link href="/register" className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-5 text-[14px] font-bold tracking-wide text-white uppercase hover:bg-[var(--green-mid)]">Register</Link>
            </>
          )}
          <ThemeToggle />
          <details className="lg:hidden relative">
            <summary className="list-none flex h-9 w-9 items-center justify-center rounded-md border border-[#d6d9d6] dark:border-white/15 text-[#5a5e5a] dark:text-white/80 bg-white dark:bg-transparent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-[#e8ece8] dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-2 shadow-xl">
              <Link href="/" className="block px-3 py-2 text-[16px] text-[#1a221a] dark:text-white hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded">Home</Link>
              <Link href="/#about" className="block px-3 py-2 text-[16px] text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded">The Hub</Link>
              <Link href="/collections" className="block px-3 py-2 text-[16px] text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded">Repository</Link>
              {!loading && user ? (
                <Link href={dashboardHref} className="block px-3 py-2 text-[16px] font-semibold text-[#6db862] hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded">Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-[16px] text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded">Sign in</Link>
                  <Link href="/register" className="block px-3 py-2 text-[16px] font-semibold text-[#6db862] hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded">Register</Link>
                </>
              )}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

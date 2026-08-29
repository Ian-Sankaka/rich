"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white dark:bg-[#111] border-b border-[#e8ece8] dark:border-white/5 overflow-x-clip">
      <div className="mx-auto max-w-[1140px] flex h-[93px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-[10px] shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] text-white font-black text-[19px]" style={{ fontFamily: 'Roboto, sans-serif' }}>R</span>
          <span className="text-[16px] font-bold tracking-[0.08em] text-[#1a221a] dark:text-white uppercase">RICH</span>
        </Link>

        <nav className="hidden lg:flex items-center">
          <Link href="/" className="h-[93px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#6db862] border-b-2 border-[#6db862]">Home</Link>
          <Link href="/#about" className="h-[93px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">The Hub</Link>
          <Link href="/#principles" className="h-[93px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">About AI4D</Link>
          <Link href="/#phases" className="h-[93px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">Our Approach</Link>
          <Link href="/collections" className="h-[93px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">Repository</Link>
          <Link href="#contact" className="h-[93px] flex items-center px-[14px] text-[13.5px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/75 hover:text-[#1a221a] dark:hover:text-white border-b-2 border-transparent">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          {!loading && user ? (
            <Link href={dashboardHref} className="hidden md:inline-flex h-10 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-6 text-[14px] font-bold tracking-wide text-white uppercase shadow-sm hover:bg-[var(--green-mid)] hover:shadow-[0_6px_16px_rgba(74,140,63,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="hidden md:inline-flex h-10 items-center justify-center rounded-[4px] border border-[#d6d9d6] dark:border-white/20 bg-white dark:bg-transparent px-6 text-[14px] font-bold tracking-wide text-[#1a221a] dark:text-white uppercase shadow-sm hover:bg-[#f7f6f4] dark:hover:bg-white/10 hover:border-[#b5b9b5] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out">Sign in</Link>
              <Link href="/register" className="hidden md:inline-flex h-10 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-6 text-[14px] font-bold tracking-wide text-white uppercase shadow-sm hover:bg-[var(--green-mid)] hover:shadow-[0_6px_16px_rgba(74,140,63,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out">Register</Link>
            </>
          )}
          <ThemeToggle />
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md border border-[#d6d9d6] dark:border-white/15 text-[#5a5e5a] dark:text-white/80 bg-white dark:bg-transparent active:scale-95 transition-transform touch-manipulation"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <>
          <div className="fixed inset-0 top-[93px] bg-black/20 backdrop-blur-sm lg:hidden z-40" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute top-[93px] left-0 right-0 bg-white dark:bg-[#111] border-b border-[#e8ece8] dark:border-white/10 shadow-xl lg:hidden z-50 animate-[toast-in_0.2s_ease]">
            <nav className="mx-auto max-w-[1140px] flex flex-col p-4 gap-1 pb-6">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex h-11 items-center px-3 text-[16px] font-medium text-[#1a221a] dark:text-white hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded-md transition-colors">Home</Link>
              <Link href="/#about" onClick={() => setMobileOpen(false)} className="flex h-11 items-center px-3 text-[16px] font-medium text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded-md transition-colors">The Hub</Link>
              <Link href="/#principles" onClick={() => setMobileOpen(false)} className="flex h-11 items-center px-3 text-[16px] font-medium text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded-md transition-colors">About AI4D</Link>
              <Link href="/#phases" onClick={() => setMobileOpen(false)} className="flex h-11 items-center px-3 text-[16px] font-medium text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded-md transition-colors">Our Approach</Link>
              <Link href="/collections" onClick={() => setMobileOpen(false)} className="flex h-11 items-center px-3 text-[16px] font-medium text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded-md transition-colors">Repository</Link>
              <Link href="#contact" onClick={() => setMobileOpen(false)} className="flex h-11 items-center px-3 text-[16px] font-medium text-[#5a5e5a] dark:text-white/80 hover:bg-[#f7f6f4] dark:hover:bg-white/10 rounded-md transition-colors">Contact</Link>
              <div className="mt-3 pt-4 border-t border-[#e8ece8] dark:border-white/10 flex flex-col gap-3">
                {!loading && user ? (
                  <Link href={dashboardHref} onClick={() => setMobileOpen(false)} className="flex h-11 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-6 text-[15px] font-bold tracking-wide text-white uppercase">Dashboard</Link>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="flex h-11 items-center justify-center rounded-[4px] border border-[#d6d9d6] dark:border-white/20 bg-white dark:bg-transparent px-6 text-[15px] font-bold tracking-wide text-[#1a221a] dark:text-white uppercase">Sign in</Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)} className="flex h-11 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-6 text-[15px] font-bold tracking-wide text-white uppercase">Register</Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

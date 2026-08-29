"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import { useToast } from "@/components/ToastProvider";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export default function LoginPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior }); }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const j = await res.json();
      if (!res.ok) {
        toast(j.error || "Login failed", "error");
        setLoading(false);
      } else {
        try {
          let prevAvatar: string | null = null;
          try { const prev = JSON.parse(localStorage.getItem("rich_profile") || "null"); prevAvatar = prev?.avatar || null; } catch {}
          localStorage.setItem("rich_profile", JSON.stringify({ name: String(j.user.name), email: String(j.user.email), avatar: (j.user as any).avatar ?? prevAvatar }));
        } catch {}
        toast(`Welcome back, ${j.user.name}! 👋`, "success");
        const isAdmin = j.user.email === "lead@rich.africa" || j.user.email === "admin@rich.africa";
        setTimeout(() => { window.location.href = isAdmin ? "/dashboard" : "/user/dashboard"; }, 700);
      }
    } catch {
      toast("Network error - try again", "error");
      setLoading(false);
    }
  }

  return (
    <div className={`${manrope.className} min-h-dvh bg-[#f7f6f4] dark:bg-[#0a0f0a] flex antialiased scroll-mt-0 overflow-x-hidden`}>
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-6 sm:py-10">
        <div className="w-full max-w-[560px] animate-[toast-in_0.5s_ease]">
          <div className="relative rounded-[18px] bg-white dark:bg-[#1a221a] border border-transparent dark:border-white/10 px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 shadow-[0_22px_70px_rgba(59,45,36,0.10)] dark:shadow-none">
            <div className="flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#4a8c3f] flex items-center justify-center text-white font-black text-[18px]" style={{ fontFamily: "Roboto, sans-serif" }}>R</span>
                <span className="text-[26px] font-bold tracking-tight text-[#4a8c3f]">RICH</span>
              </Link>
            </div>
            <h1 className="text-center text-[24px] font-bold text-[#1c1c1c] dark:text-white">Welcome back</h1>
            <p className="text-center text-[16px] text-[#756b62] dark:text-white/60 mt-1.5 mb-8">Sign in to your RICH account</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#8d8278] pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <input id="email" type="email" required autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd6cf] dark:border-white/10 bg-white dark:bg-white/5 py-4 pr-4 text-[15px] text-gray-900 dark:text-white placeholder:text-[#9c9188] placeholder:text-[14px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/15 pl-12 transition-all" />
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#8d8278] pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input id="password" type={show ? "text" : "password"} required autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#ddd6cf] dark:border-white/10 bg-white dark:bg-white/5 py-4 pr-12 text-[15px] text-gray-900 dark:text-white placeholder:text-[#9c9188] placeholder:text-[14px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/15 pl-12 transition-all" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8d8278] hover:text-gray-600 dark:hover:text-white/80 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <Link href="#" onClick={(e)=>{e.preventDefault(); toast("Password reset coming soon","info")}} className="text-[14px] font-semibold text-[#756b62] dark:text-white/60 hover:text-[#4a8c3f] transition-colors">Forgot Password?</Link>
              </div>

              <button type="submit" disabled={loading} className="cursor-pointer w-full rounded-full bg-[#16a34a] dark:bg-[#4a8c3f] px-6 py-4 text-[17px] font-bold text-white shadow-[0_12px_24px_rgba(22,163,74,0.28)] hover:shadow-[0_16px_32px_rgba(22,163,74,0.35)] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 transition-all flex items-center justify-center">
                {loading ? (
                  <svg className="h-6 w-6 animate-spin text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
                  </svg>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#eee8e1] dark:bg-white/10" />
              <span className="text-[13px] font-bold tracking-wide text-[#9c9188]">OR</span>
              <div className="h-px flex-1 bg-[#eee8e1] dark:bg-white/10" />
            </div>
            <button type="button" onClick={async () => {
              const { createBrowserClient } = await import("@/lib/supabase");
              const supabase = createBrowserClient();
              const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL as string) || window.location.origin;
              const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${siteUrl}/auth/callback` } });
              if (error) toast(error.message, "error");
            }} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#f0eae4] dark:border-white/10 bg-white dark:bg-white/5 px-5 py-4 text-[15px] font-bold text-[#2f3745] dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99] transition-all">
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Continue with Google
            </button>

            <p className="mt-8 text-center text-[15px] font-medium text-[#756b62] dark:text-white/60">Don&apos;t have an account? <Link href="/register" className="font-semibold text-[#16a34a] dark:text-[#6db862] hover:underline">Sign up</Link></p>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 px-1 text-[14px] font-medium text-[#8d8278] dark:text-white/50">
            <Link href="/privacy" className="hover:text-[#4a8c3f] transition">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#4a8c3f] transition">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[48%] relative overflow-hidden bg-[#1a3a1a]">
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
    const j = await res.json();
    setMsg(j.error || j.ok ? "Account created — sign in now" : "Failed");
  }

  return (
    <div className="min-h-[calc(100vh-160px)] grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-[360px]">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm">R</span>
            <span className="text-lg font-bold text-slate-900">RICH</span>
          </Link>
          <div className="mt-8">
            <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
            <p className="mt-1 text-sm text-slate-500">Join RICH Knowledge Repository</p>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div><label className="text-sm font-medium text-slate-700">Full Name</label><input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Repository Lead" /></div>
            <div><label className="text-sm font-medium text-slate-700">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="you@example.com" /></div>
            <div><label className="text-sm font-medium text-slate-700">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="••••••••" /></div>
            {msg && <p className="text-sm text-emerald-600">{msg}</p>}
            <button type="submit" className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Create account</button>
            <div className="relative py-2"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">OR</span></div></div>
            <button type="button" className="w-full flex items-center justify-center gap-2 rounded-md border border-slate-200 py-2.5 text-sm font-medium hover:bg-slate-50">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <p className="text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="font-semibold text-emerald-600">Sign in</Link></p>
            <p className="text-center text-xs text-slate-400"><a href="#" className="hover:underline">Privacy Policy</a> · <a href="#" className="hover:underline">Terms of Service</a></p>
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative bg-slate-100">
        <img src="/login-bg.jpg" alt="RICH" className="absolute inset-0 h-full w-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />
      </div>
    </div>
  );
}

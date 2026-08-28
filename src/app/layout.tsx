import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { ToastProvider } from "@/components/ToastProvider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RICH Knowledge Repository",
  description: "Africa's Central Platform for Climate AI Knowledge — research, case studies, ecosystem insights and policy resources.",
};

function TopBar() {
  return (
    <div id="site-topbar" className="bg-[var(--green-dark)] text-center text-[14.5px] text-white/85 py-2 px-5">
      Join our mailing list and receive <a href="#" className="text-[#a0d88a] underline">our newsletter</a> to stay updated on climate AI innovation in Africa.
    </div>
  );
}

function Header() {
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
          <Link href="/login" className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] border border-white/20 px-5 text-[14px] font-bold tracking-wide text-white uppercase hover:bg-white/10">Sign in</Link>
          <Link href="/register" className="hidden md:inline-flex h-9 items-center justify-center rounded-[4px] bg-[var(--green-accent)] px-5 text-[14px] font-bold tracking-wide text-white uppercase hover:bg-[var(--green-mid)]">Register</Link>
          <ThemeToggle />
          <details className="lg:hidden relative">
            <summary className="list-none flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-white/10 bg-[#1a1a1a] p-2 shadow-xl">
              <Link href="/" className="block px-3 py-2 text-[16px] text-white hover:bg-white/10 rounded">Home</Link>
              <Link href="/#about" className="block px-3 py-2 text-[16px] text-white/80 hover:bg-white/10 rounded">The Hub</Link>
              <Link href="/collections" className="block px-3 py-2 text-[16px] text-white/80 hover:bg-white/10 rounded">Repository</Link>
              <Link href="/login" className="block px-3 py-2 text-[16px] text-white/80 hover:bg-white/10 rounded">Sign in</Link>
              <Link href="/register" className="block px-3 py-2 text-[16px] font-semibold text-[#6db862] hover:bg-white/10 rounded">Register</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400&family=Playfair+Display:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('rich-theme');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.classList.toggle('dark', d);}catch(e){}})()` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(location.pathname.startsWith('/dashboard')){document.documentElement.classList.add('dashboard-hide');}}catch(e){}} )()` }} />
        <style dangerouslySetInnerHTML={{ __html: `html.dashboard-hide header, html.dashboard-hide footer, html.dashboard-hide #site-topbar{display:none !important}` }} />
      </head>
      <body suppressHydrationWarning className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          <ToastProvider>
            <TopBar />
            <Header />
            <main>{children}</main>
          <footer id="contact" className="bg-[#111] text-white/65">
            <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-14">
              <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1.4fr]">
                <div>
                  <h3 className="text-[20px] text-white" style={{ fontFamily: 'Playfair Display, serif' }}>RICH Knowledge Repository</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-7 font-light text-white/50">The central knowledge platform for climate AI innovation in Africa. Built by the Regional Innovation and Climate Hub, hosted by the Local Development Research Institute.</p>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold tracking-[0.12em] uppercase text-white">Collections</h4>
                  <ul className="mt-4 flex flex-col gap-2 text-[15px] font-light">
                    <li><Link href="/collections/research_outputs" className="text-white/50 hover:text-[#6db862]">Research Outputs</Link></li>
                    <li><Link href="/collections/innovation_case_studies" className="text-white/50 hover:text-[#6db862]">Case Studies</Link></li>
                    <li><Link href="/collections/ecosystem_insights" className="text-white/50 hover:text-[#6db862]">Ecosystem Insights</Link></li>
                    <li><Link href="/collections/policy_resources" className="text-white/50 hover:text-[#6db862]">Policy Resources</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold tracking-[0.12em] uppercase text-white">The Hub</h4>
                  <ul className="mt-4 flex flex-col gap-2 text-[15px] font-light">
                    <li><Link href="/#about" className="text-white/50 hover:text-[#6db862]">About RICH</Link></li>
                    <li><Link href="/#principles" className="text-white/50 hover:text-[#6db862]">Our Approach</Link></li>
                    <li><Link href="/dashboard" className="text-white/50 hover:text-[#6db862]">Dashboard</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold tracking-[0.12em] uppercase text-white">Contact</h4>
                  <div className="mt-4 space-y-2 text-[15px] font-light text-white/50">
                    <p>Monday to Friday<br />09:00 AM to 06:00 PM EAT</p>
                    <p><a href="tel:+254718610298" className="text-[#6db862] hover:underline">+254 718 610298</a></p>
                    <p><a href="mailto:thinking@developlocal.org" className="text-[#6db862] hover:underline">thinking@developlocal.org</a></p>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-[14px]">
                <p className="text-white/35">&copy; 2026 Local Development Research Institute.</p>
                <div className="flex items-center gap-4 text-white/45">
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <span className="text-white/20">·</span>
                  <a href="#" className="hover:text-white">Cookie Settings</a>
                </div>
              </div>
            </div>
          </footer>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

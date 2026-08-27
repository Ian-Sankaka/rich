import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RICH Knowledge Repository",
  description: "Practical, high-quality knowledge about climate AI innovation in Africa - discoverable, accessible and usable.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-slate-800 antialiased">
        <div className="top-bar bg-black text-white text-xs text-center py-2">
          <span className="mx-auto block max-w-6xl px-6">Join our mailing list and receive <a href="#" className="underline">our newsletter</a> to stay updated on climate AI innovation in Africa.</span>
        </div>

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-6">
            <a href="/" className="flex shrink-0 items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-gradient-to-br from-emerald-500 to-teal-600 text-lg font-medium text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)]">R</span>
              <span className="text-[22px] font-medium tracking-tight text-slate-900">RICH</span>
            </a>
            <nav className="hidden items-center gap-4 text-base font-medium text-slate-600 lg:gap-6 xl:gap-9 lg:flex">
              <a href="/" className="hover:text-emerald-600">Home</a>
              <a href="/#about" className="hover:text-emerald-600">The Hub</a>
              <a href="/#principles" className="hover:text-emerald-600">About AI4D</a>
              <a href="/#phases" className="hover:text-emerald-600">Our Approach</a>
              <a href="/topics" className="hover:text-emerald-600">Repository</a>
              <a href="/#contact" className="hover:text-emerald-600">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/login" className="hidden lg:inline-flex px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Sign in</a>
              <a href="/register" className="hidden lg:inline-flex px-3.5 py-2 rounded-[6px] bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700">Register</a>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer id="contact" className="bg-black text-slate-400">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
              <div>
                <p className="text-xl font-medium text-white">RICH Knowledge Repository</p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed">The central knowledge platform for climate AI innovation in Africa. Built by the Regional Innovation and Climate Hub, hosted by the Local Development Research Institute.</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Collections</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li><a href="/collections/research_outputs" className="hover:text-white">Research Outputs</a></li>
                  <li><a href="/collections/innovation_case_studies" className="hover:text-white">Case Studies</a></li>
                  <li><a href="/collections/ecosystem_insights" className="hover:text-white">Ecosystem Insights</a></li>
                  <li><a href="/collections/policy_resources" className="hover:text-white">Policy Resources</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">The Hub</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li><a href="/#about" className="hover:text-white">About RICH</a></li>
                  <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
                  <li><a href="/#contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Contact</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>Monday to Friday<br />09:00 AM to 06:00 PM EAT</li>
                  <li><a href="tel:+254718610298" className="hover:text-white">+254 718 610298</a></li>
                  <li><a href="mailto:thinking@developlocal.org" className="hover:text-white">thinking@developlocal.org</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
              <p>&copy; 2026 Local Development Research Institute.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <span className="text-white/20">·</span>
                <a href="#" className="hover:text-white">Cookie Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

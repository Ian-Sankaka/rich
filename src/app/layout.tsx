import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter, Bricolage_Grotesque } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RICH Knowledge Repository",
  description: "Africa's Central Platform for Climate AI Knowledge - research, case studies, ecosystem insights and policy resources.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "RICH Knowledge Repository",
    description: "Africa's Central Platform for Climate AI Knowledge - research, case studies, ecosystem insights and policy resources.",
    url: "https://richafrica.vercel.app",
    siteName: "RICH",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "RICH Knowledge Repository" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RICH Knowledge Repository",
    description: "Africa's Central Platform for Climate AI Knowledge - research, case studies, ecosystem insights and policy resources.",
    images: ["/opengraph-image"],
  },
};

function TopBar() {
  return (
    <div id="site-topbar" className="bg-[var(--green-dark)] text-center text-[14.5px] text-white/85 py-2 px-5">
      Join our mailing list and receive <a href="#" className="text-[#a0d88a] underline">our newsletter</a> to stay updated on climate AI innovation in Africa.
    </div>
  );
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${bricolage.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400&family=Playfair+Display:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('rich-theme');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.classList.toggle('dark', d);}catch(e){}})()` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{function a(){var p=location.pathname;var h=p.startsWith('/dashboard')||p==='/login'||p==='/register'||p.startsWith('/login/')||p.startsWith('/register/');document.documentElement.classList.toggle('dashboard-hide',h);}a();var ps=history.pushState;history.pushState=function(){var r=ps.apply(this,arguments);a();return r;};var rs=history.replaceState;history.replaceState=function(){var r=rs.apply(this,arguments);a();return r;};window.addEventListener('popstate',a);}catch(e){}})()` }} />
        <style dangerouslySetInnerHTML={{ __html: `html.dashboard-hide header, html.dashboard-hide footer, html.dashboard-hide #site-topbar{display:none !important}` }} />
      </head>
      <body suppressHydrationWarning className="bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          <ToastProvider>
            <ScrollToTop />
            <div className="sticky top-0 z-50">
              <TopBar />
              <SiteHeader />
            </div>
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
                  <a href="/privacy" className="hover:text-white">Privacy Policy</a>
                  <span className="text-white/20">·</span>
                  <a href="/terms" className="hover:text-white">Terms</a>
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

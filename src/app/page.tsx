import Link from "next/link";
import { articles } from "@/lib/articles";
import PartnerCarousel from "@/components/PartnerCarousel";
import StatsAnimated from "@/components/StatsAnimated";
import { Users, Search, Unlock, Globe, RefreshCw, Layers, FileText, Globe2, ScrollText, ArrowUpRight } from "lucide-react";

const collections: {
  slug: string;
  accent: string;
  accentSoft: string;
  iconBg: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  live: boolean;
  desc: string;
  count: string;
}[] = [
  {
    slug: "research_outputs",
    accent: "#4a8c3f",
    accentSoft: "#e8f3e5",
    iconBg: "#dbeed6",
    Icon: Search,
    title: "Research Outputs",
    badge: "Phase 1",
    live: true,
    desc: "Literature reviews, synthesis papers, working papers, technical notes, and commissioned research. Every output has a plain-language summary and a clear key finding. Built for researchers and serious practitioners.",
    count: "5 to 8 resources at launch",
  },
  {
    slug: "innovation_case_studies",
    accent: "#2d6a8f",
    accentSoft: "#e5eff5",
    Icon: FileText,
    iconBg: "#d9e9f5",
    title: "Innovation Case Studies",
    badge: "Phase 1",
    live: true,
    desc: "In-depth documentation of climate AI innovations across Africa, including both successes and failures. Consistent structure. Honest, evidence-based analysis. The EWS and LDRI deployment is the primary lived case.",
    count: "4 to 6 cases at launch",
  },
  {
    slug: "ecosystem_insights",
    accent: "#8a5a2a",
    accentSoft: "#f5ede5",
    Icon: Globe2,
    iconBg: "#f2e2cc",
    title: "Ecosystem Insights",
    badge: "Phase 2",
    live: false,
    desc: "Ecosystem maps, sector briefings, funder landscape analyses, policy environment briefs by region, and trend signals. Updated every six months. Designed for funders, ecosystem partners, and policymakers.",
    count: "3 to 5 resources at launch",
  },
  {
    slug: "policy_resources",
    accent: "#6a2d6a",
    accentSoft: "#f0e5f5",
    Icon: ScrollText,
    iconBg: "#e8d5f4",
    title: "Policy Resources",
    badge: "Phase 1",
    live: true,
    desc: "Plain-language summaries of AU, EAC, ECOWAS, SADC, and IGAD climate frameworks. NDC alignment guides. Responsible AI governance tools. Climate finance access guides. Designed for policymakers and government staff.",
    count: "4 to 6 resources at launch",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO + STATS as full viewport block - fills viewport to stats (header 93px + topbar ~34px ≈ 127px) */}
      <div className="flex flex-col min-h-[calc(100dvh-127px)]">
        <section className="relative flex flex-1 min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80')", animation: "hero-zoom 1.4s ease-out both" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(18,50,18,0.82) 0%, rgba(30,70,20,0.55) 60%, rgba(10,30,10,0.4) 100%)" }} />
          <div className="relative z-10 mx-auto w-full max-w-[1140px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16" style={{ animation: "hero-fade 0.9s ease-out 0.3s both" }}>
            <div className="flex items-center gap-2.5 text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#6db862] mb-[14px] sm:mb-[18px]">
              <span className="h-0.5 w-7 bg-[#6db862]" />
              Knowledge Repository
            </div>
            <h1 className="max-w-[640px] text-[30px] sm:text-[38px] lg:text-[52px] font-medium leading-[1.15] text-white text-balance" style={{ fontFamily: "Playfair Display, serif" }}>
              Africa&apos;s Central Platform for Climate AI Knowledge
            </h1>
            <p className="mt-4 sm:mt-[22px] max-w-[520px] text-[15px] font-light leading-7 text-white/85">
              Research outputs, innovation case studies, ecosystem insights, and policy resources - practical knowledge built for innovators, policymakers, and partners working on climate AI in Africa.
            </p>
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/collections" className="inline-flex items-center justify-center rounded-[4px] bg-[#4a8c3f] px-6 sm:px-7 py-3 sm:py-[13px] text-[14px] sm:text-[15px] font-bold tracking-[0.07em] uppercase text-white hover:bg-[#2d5a27] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out touch-manipulation">
                Browse the Repository
              </Link>
              <Link href="/submit" className="inline-flex items-center justify-center rounded-[4px] border border-white/40 px-6 sm:px-7 py-3 sm:py-[13px] text-[14px] sm:text-[15px] font-bold tracking-[0.07em] uppercase text-white/90 hover:border-white hover:text-white hover:bg-white/10 active:bg-white/15 transition-all duration-300 ease-out touch-manipulation">
                Submit a Resource
              </Link>
            </div>
          </div>
        </section>

        <StatsAnimated />
      </div>

      {/* ABOUT */}
      <section className="py-10 sm:py-[72px] bg-[var(--background)] dark:bg-[var(--background)] overflow-x-hidden">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-8 sm:gap-16 lg:grid-cols-2">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[4px] bg-cover bg-center transition-all duration-500 ease-out hover:shadow-xl" style={{ backgroundImage: "linear-gradient(160deg, rgba(30,70,20,0.7) 0%, rgba(20,50,10,0.3) 100%), url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80')" }}>
              <span className="absolute bottom-5 left-5 rounded-[4px] bg-[#1a3a1a] px-3.5 py-2 text-[13px] font-bold tracking-[0.1em] uppercase text-white transition-transform duration-300 group-hover:translate-y-0">RICH Knowledge Platform</span>
            </div>
            <div>
              <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">About the Repository</p>
              <h2 className="mt-3.5 text-[28px] sm:text-[35px] font-medium leading-tight text-[var(--text-dark)] text-balance" style={{ fontFamily: "Playfair Display, serif" }}>A living knowledge platform, not an archive</h2>
              <p className="mt-5 text-[15px] font-light leading-7 text-[var(--text-mid)]">The RICH Knowledge Repository is the central knowledge platform for the Regional Innovation and Climate Hub. It is designed to make practical, high-quality knowledge about climate AI innovation in Africa discoverable, accessible, and usable by the people who need it most.</p>
              <p className="mt-4 text-[15px] font-light leading-7 text-[var(--text-mid)]">Every resource is reviewed, tagged, and maintained on a defined cycle. Every case study follows a consistent structure that makes it usable. Every policy brief is designed so that a senior government official can understand the key message in two minutes.</p>
              <Link href="#principles" className="mt-6 inline-flex items-center gap-2 border-b border-[#4a8c3f] pb-0.5 text-[15px] font-bold tracking-[0.07em] uppercase text-[#4a8c3f] hover:text-[#2d5a27]">Learn about our design principles →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-[var(--off-white)] dark:bg-[#0f1410] py-10 sm:py-[72px] border-y border-[var(--border)] overflow-x-hidden">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">The Four Collections</p>
          <h2 className="mt-3.5 text-[28px] sm:text-[35px] font-medium leading-none text-[var(--text-dark)] text-balance" style={{ fontFamily: "Playfair Display, serif" }}>What the Repository Hosts</h2>
          <p className="mt-4 max-w-[640px] text-[15px] font-light leading-7 text-[var(--text-mid)]">Four collections, each with a distinct purpose, audience, and content standard. Every resource belongs to one collection and carries a standardised set of tags to enable filtering across all of them.</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-7">
            {collections.map((c) => {
              const CIcon = c.Icon;
              return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[16px] bg-white dark:bg-[#1a221a] border border-[var(--border)] hover:border-transparent hover:shadow-[0_20px_48px_rgba(16,42,16,0.12)] hover:-translate-y-1.5 active:translate-y-0 active:shadow-[0_8px_20px_rgba(16,42,16,0.10)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-accent)] focus-visible:ring-offset-2"
              >
                {/* top accent bar */}
                <span className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-[4px]" style={{ background: c.accent }} />
                {/* soft radial glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-500"
                  style={{ background: `radial-gradient(closest-side, ${c.accent}, transparent)` }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(180deg, ${c.accent}07 0%, transparent 45%)` }}
                />

                <div className="relative p-7 lg:p-8 flex flex-col flex-1">
                  {/* header row: icon + badge + live dot */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px] border shadow-sm transition-all duration-300 group-hover:scale-[1.04] group-hover:rotate-[-1.5deg] group-hover:shadow-md"
                      style={{ background: c.iconBg, borderColor: `${c.accent}18`, color: c.accent }}
                    >
                      <CIcon className="h-[22px] w-[22px]" />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase backdrop-blur ${c.live ? "bg-[#e8f3e5] text-[#2d5a27] dark:bg-[#1e3a1e] dark:text-[#a0d88a] border border-[#4a8c3f]/15" : "bg-[#fdf3e5] text-[#8a5a2a] border border-[#b07a20]/15"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${c.live ? "bg-[#4a8c3f] animate-pulse" : "bg-[#b07a20]"}`} />
                        {c.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 text-[21px] lg:text-[22px] font-medium leading-tight tracking-[-0.01em] text-[#1a3a1a] dark:text-[#eef5ee] group-hover:text-[#14331a] dark:group-hover:text-white transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] font-light leading-[1.75] text-[var(--text-mid)] line-clamp-none flex-1">
                    {c.desc}
                  </p>

                  {/* meta footer */}
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--border)]/80 pt-5">
                    <span className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[0.06em] uppercase text-[var(--text-light)]">
                      <span className="hidden sm:inline-flex h-6 items-center rounded-full bg-[var(--off-white)] dark:bg-white/[0.06] border border-[var(--border)] px-2.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[var(--text-mid)]">
                        {c.count}
                      </span>
                      <span className="sm:hidden">{c.count}</span>
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white dark:bg-white/[0.04] text-[var(--text-light)] group-hover:border-[var(--green-accent)] group-hover:bg-[var(--green-accent)] group-hover:text-white shadow-sm group-hover:shadow-[0_8px_16px_rgba(74,140,63,0.25)] transition-all duration-300 group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    </span>
                  </div>
                </div>

                {/* bottom subtle line that fills on hover */}
                <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ background: c.accent }} />
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="py-10 sm:py-[72px] bg-[var(--background)] overflow-x-hidden">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Design Principles</p>
          <h2 className="mt-3.5 text-[28px] sm:text-[35px] font-medium text-[var(--text-dark)] text-balance" style={{ fontFamily: "Playfair Display, serif" }}>How we built it</h2>
          <p className="mt-4 max-w-[640px] text-[15px] font-light leading-7 text-[var(--text-mid)]">Seven principles govern every decision about the repository, from content standards to navigation to governance. They are drawn from best practice in knowledge management and comparable repositories in the climate and development sector.</p>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              { Icon: Users, title: "Practitioner First", desc: "Every design decision starts with the innovator, policymaker, or funder trying to use the knowledge. Academic rigour matters, but not at the cost of usability.", bg: "#dbeed6", accent: "#4a8c3f" },
              { Icon: Search, title: "Findable", desc: "50 well-organised resources outperform 500 that cannot be navigated. Structure and quality come before volume. Effective taxonomy reduces search time by up to 60 percent.", bg: "#d9e9f5", accent: "#2d6a8f" },
              { Icon: Unlock, title: "Open by Default", desc: "Content is freely accessible without registration wherever possible. Paywalled content is not hosted or linked as a primary resource.", bg: "#fef3c7", accent: "#b45309" },
              { Icon: Globe, title: "Africa-Centred", desc: "The repository serves the African climate AI ecosystem. Global resources are relevant only insofar as they apply to African innovators in African conditions.", bg: "#f2e2cc", accent: "#8a5a2a" },
              { Icon: RefreshCw, title: "Living, Not Archived", desc: "Content is reviewed, updated, and retired on a defined cycle. Every item has an owner, a review date, and a clear process for updating or archiving.", bg: "#d1fae5", accent: "#0f7a4a" },
              { Icon: Layers, title: "Multiple Entry Points", desc: "Different users arrive with different questions. The repository provides at minimum three ways to find any piece of content: by collection, by tag, and by search.", bg: "#e8d5f4", accent: "#6a2d6a" },
            ].map(({ Icon, title, desc, bg, accent }) => (
              <div key={title} className="group relative flex flex-col rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-7 lg:p-8 overflow-hidden hover:border-transparent hover:shadow-[0_16px_40px_rgba(26,58,26,0.08)] hover:-translate-y-1 transition-all duration-300">
                <span className="pointer-events-none absolute left-0 top-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: accent }} />
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border shadow-sm transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-md" style={{ background: bg, borderColor: `${accent}1a`, color: accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="h-px flex-1 bg-[var(--border)] group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors duration-300" />
                </div>
                <h4 className="mt-5 text-[15px] font-bold tracking-[0.06em] uppercase leading-tight text-[#1a3a1a] dark:text-white">{title}</h4>
                <p className="mt-3 text-[15px] font-light leading-7 text-[var(--text-mid)] flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section id="phases" className="bg-[#1a3a1a] py-10 sm:py-[72px] overflow-x-hidden">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#6db862]">Phased Build Plan</p>
          <h2 className="mt-3.5 text-[28px] sm:text-[35px] font-medium text-white text-balance" style={{ fontFamily: "Playfair Display, serif" }}>How the Repository Grows</h2>
          <p className="mt-4 max-w-[640px] text-[15px] font-light leading-7 text-white/65">Built incrementally, with a small number of high-quality resources before expanding. Each phase has clear milestones and minimum content targets.</p>
          <div className="mt-12 grid gap-3 lg:grid-cols-3">
            {[
              { tag: "Now Active", title: "Phase 1: Foundation", period: "Months 1 to 6", items: ["Four-collection structure live", "Tag taxonomy defined and enforced", "Submission form published", "Repository Lead and Collection Owners named", "Content lifecycle policy documented", "16 to 25 founding resources published"], target: "20+ resources", current: true },
              { tag: "Months 7 to 18", title: "Phase 2: Growth", period: "Open contribution pathway", items: ["2 to 3 new resources per month", "Partner contribution pathway open", "First live ecosystem map published", "First cross-case synthesis", "Search quality review conducted", "Editorial Advisory Group convened"], target: "70 to 95 resources", current: false },
              { tag: "Month 19 onwards", title: "Phase 3: Maturity", period: "Public knowledge commons", items: ["Indexed by major external platforms", "Multilingual content introduced", "Community features added", "Annual repository audit published", "User survey conducted", "30+ case studies documented"], target: "150+ resources", current: false },
            ].map((ph) => (
              <div key={ph.title} className={`group rounded-[4px] p-7 lg:p-8 border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${ph.current ? "bg-[#4a8c3f] border-[#4a8c3f] hover:shadow-[0_8px_30px_rgba(74,140,63,0.3)]" : "bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20"}`}>
                <p className={`text-[12px] font-bold tracking-[0.14em] uppercase ${ph.current ? "text-white/80" : "text-white/50"}`}>{ph.tag}</p>
                <h3 className="mt-2 text-[24px] font-medium text-white" style={{ fontFamily: "Playfair Display, serif" }}>{ph.title}</h3>
                <p className={`text-[14px] font-light ${ph.current ? "text-white/75" : "text-white/50"}`}>{ph.period}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {ph.items.map((it) => (
                    <li key={it} className={`relative pl-4 text-[15.5px] font-light leading-[1.5] ${ph.current ? "text-white/90" : "text-white/70"}`}>
                      <span className={`absolute left-0 top-[7px] h-[5px] w-[5px] rounded-full ${ph.current ? "bg-white/70" : "bg-white/30"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className={`mt-6 border-t pt-4 text-[14px] font-light ${ph.current ? "border-white/20 text-white/80" : "border-white/10 text-white/50"}`}>Target: <strong className={ph.current ? "text-white" : "text-[#6db862]"}>{ph.target}</strong> {ph.current ? "at launch" : ph.title.includes("Phase 2") ? "by Month 18" : ", 5+ external citations"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-10 sm:py-[72px] bg-[var(--background)] overflow-x-hidden">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Latest from RICH</p>
              <h2 className="mt-3.5 text-[28px] sm:text-[35px] font-medium leading-none text-[var(--text-dark)] text-balance" style={{ fontFamily: "Playfair Display, serif" }}>Articles and Insights</h2>
            </div>
            <Link href="/articles" className="inline-flex items-center gap-2 border-b border-[#4a8c3f] pb-0.5 text-[15px] font-bold tracking-[0.07em] uppercase text-[#4a8c3f] self-start sm:self-auto">View all articles →</Link>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex flex-col overflow-hidden rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] hover:border-[#4a8c3f] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
                <div className="relative h-[180px] overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.06]" style={{ backgroundImage: `url('${a.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/50" />
                  <span className="absolute bottom-3 left-3 rounded-[4px] bg-[#1a3a1a] px-2.5 py-1 text-[12px] font-bold tracking-[0.1em] uppercase text-white">{a.category}</span>
                  {a.comingSoon && <span className="absolute top-3 right-3 rounded-[4px] bg-amber-500 px-2 py-1 text-[12px] font-bold uppercase text-white">Coming Soon</span>}
                </div>
                <div className="flex flex-1 flex-col p-[22px]">
                  <p className="text-[13.5px] text-[var(--text-light)]">{a.date} · {a.author}</p>
                  <h3 className="mt-2.5 flex-1 text-[19px] font-medium leading-[1.35] text-[var(--text-dark)] group-hover:text-[#4a8c3f] transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>{a.title}</h3>
                  <p className="mt-3 text-[15px] font-light leading-6 text-[var(--text-mid)] line-clamp-3">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold tracking-[0.07em] uppercase text-[#4a8c3f] transition-transform duration-300 group-hover:translate-x-1">{a.comingSoon ? "Preview →" : "Read more →"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2d5a27] py-10 sm:py-14 overflow-x-hidden">
        <div className="mx-auto flex max-w-[1140px] flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 px-4 sm:px-6 lg:px-10">
          <div>
            <h2 className="text-[32px] font-medium leading-none text-white" style={{ fontFamily: "Playfair Display, serif" }}>Contribute to the Repository</h2>
            <p className="mt-2.5 max-w-[560px] text-[15px] font-light text-white/75">Have a case study, research output, or resource that belongs here? Submit through our open contribution pathway. Review decision within four weeks.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3.5">
            <Link href="/submit" className="inline-flex rounded-[4px] bg-white px-6 py-3 text-[12px] font-bold tracking-[0.07em] uppercase text-[#2d5a27] hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out">Submit a Resource</Link>
            <Link href="/submit/guidelines" className="inline-flex rounded-[4px] border border-white/40 px-6 py-3 text-[12px] font-bold tracking-[0.07em] uppercase text-white hover:border-white hover:bg-white/10 transition-all duration-300 ease-out">View Submission Guidelines</Link>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-[var(--off-white)] dark:bg-[#111a11] border-y border-[var(--border)] py-10 sm:py-12 overflow-x-hidden">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <p className="text-center text-[13px] font-bold tracking-[0.14em] uppercase text-[var(--text-light)]">Implemented by and in partnership with</p>
          <div className="mt-7">
            <PartnerCarousel />
          </div>
        </div>
      </section>
    </>
  );
}

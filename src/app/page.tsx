import Link from "next/link";

const collectionCards = [
  {
    slug: "research_outputs",
    icon: "🔎",
    tile: "from-teal-400 to-teal-700",
    title: "Research Outputs",
    phase: "Phase 1",
    live: true,
    desc: "Literature reviews, synthesis papers, working papers, technical notes, and commissioned research. Every output has a plain-language summary and a clear key finding. Built for researchers and serious practitioners.",
    count: "5 to 8 resources at launch",
  },
  {
    slug: "innovation_case_studies",
    icon: "📄",
    tile: "from-cyan-400 to-cyan-700",
    title: "Innovation Case Studies",
    phase: "Phase 1",
    live: true,
    desc: "In-depth documentation of climate AI innovations across Africa, including both successes and failures. Consistent structure. Honest, evidence-based analysis. The EWS and LDRI deployment is the primary lived case.",
    count: "4 to 6 cases at launch",
  },
  {
    slug: "ecosystem_insights",
    icon: "🌎",
    tile: "from-sky-400 to-blue-700",
    title: "Ecosystem Insights",
    phase: "Phase 2",
    live: false,
    desc: "Ecosystem maps, sector briefings, funder landscape analyses, policy environment briefs by region, and trend signals. Updated every six months. Designed for funders, ecosystem partners, and policymakers.",
    count: "3 to 5 resources at launch",
  },
  {
    slug: "policy_resources",
    icon: "📜",
    tile: "from-indigo-400 to-violet-700",
    title: "Policy Resources",
    phase: "Phase 1",
    live: true,
    desc: "Plain-language summaries of AU, EAC, ECOWAS, SADC, and IGAD climate frameworks. NDC alignment guides. Responsible AI governance tools. Climate finance access guides. Designed for policymakers and government staff.",
    count: "4 to 6 resources at launch",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/85 via-emerald-900/60 to-emerald-950/30" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:py-28">
          <div className="max-w-2xl text-left">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">
              <span className="h-0.5 w-7 bg-emerald-300" />
              Knowledge Repository
            </p>
            <h1 className="font-display text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              Africa&apos;s Central Platform for Climate AI Knowledge
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-emerald-100/90">
              Research outputs, innovation case studies, ecosystem insights, and policy resources - practical knowledge built for innovators, policymakers, and partners working on climate AI in Africa.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/search" className="inline-flex items-center gap-2 rounded-[6px] bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
                Browse the Repository
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/submit" className="inline-flex items-center rounded-[6px] border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15">
                Submit a Resource
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-950">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 px-4 py-10 md:grid-cols-4">
          <div className="flex flex-col items-center border-r border-emerald-700/40 px-4 py-2 text-center even:border-r-0 md:even:border-r md:last:border-r-0">
            <p className="text-4xl font-medium text-white">4</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-emerald-300/80">Knowledge Collections</p>
          </div>
          <div className="flex flex-col items-center border-r border-emerald-700/40 px-4 py-2 text-center even:border-r-0 md:even:border-r md:last:border-r-0">
            <p className="text-4xl font-medium text-white">20+</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-emerald-300/80">Resources at Launch</p>
          </div>
          <div className="flex flex-col items-center border-r border-emerald-700/40 px-4 py-2 text-center even:border-r-0 md:even:border-r md:last:border-r-0">
            <p className="text-4xl font-medium text-white">7</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-emerald-300/80">Benchmark Comparators</p>
          </div>
          <div className="flex flex-col items-center px-4 py-2 text-center">
            <p className="text-4xl font-medium text-white">2026</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-emerald-300/80">Phase 1 Live</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="h-64 rounded-[12px] bg-slate-100 flex items-center justify-center text-slate-400 text-sm">RICH Knowledge Platform</div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-600">About the Repository</p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-slate-900">A living knowledge platform, not an archive</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">The RICH Knowledge Repository is the central knowledge platform for the Regional Innovation and Climate Hub. It is designed to make practical, high-quality knowledge about climate AI innovation in Africa discoverable, accessible, and usable by the people who need it most.</p>
            <p className="mt-3 text-base leading-relaxed text-slate-600">Every resource is reviewed, tagged, and maintained on a defined cycle. Every case study follows a consistent structure that makes it usable. Every policy brief is designed so that a senior government official can understand the key message in two minutes.</p>
            <Link href="#principles" className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700">Learn about our design principles →</Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs uppercase tracking-widest text-emerald-600">The Four Collections</p>
        <h2 className="mt-2 text-3xl font-medium tracking-tight text-slate-900">What the Repository Hosts</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">Four collections, each with a distinct purpose, audience, and content standard. Every resource belongs to one collection and carries a standardised set of tags to enable filtering across all of them.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {collectionCards.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[6px] bg-white p-6 ring-1 ring-inset ring-slate-200 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <span className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.tile} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-[6px] bg-gradient-to-br ${c.tile} text-xl shadow-md`}>{c.icon}</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${c.live ? "bg-teal-50 text-teal-700 ring-teal-200" : "bg-amber-50 text-amber-700 ring-amber-200"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${c.live ? "bg-teal-500" : "bg-amber-500"}`} />
                  {c.phase}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-medium text-slate-900">{c.title}</h3>
              <p className="mt-1.5 flex-1 text-base leading-relaxed text-slate-500">{c.desc}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{c.count}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">Explore <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section id="principles" className="relative overflow-hidden bg-emerald-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,140,63,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <p className="text-xs uppercase tracking-widest text-emerald-400">Design Principles</p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight">How We Built It</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-emerald-100/80">Seven principles govern every decision about the repository, from content standards to navigation to governance.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "Practitioner First", "Every design decision starts with the innovator, policymaker, or funder trying to use the knowledge."],
              ["02", "Findable Before Comprehensive", "50 well-organised resources outperform 500 that cannot be navigated."],
              ["03", "Open by Default", "Content is freely accessible without registration wherever possible."],
              ["04", "Africa-Centred", "The repository serves the African climate AI ecosystem."],
              ["05", "Living, Not Archived", "Content is reviewed, updated, and retired on a defined cycle."],
              ["06", "Multiple Entry Points", "Different users arrive with different questions. Provide at minimum three ways to find content."],
            ].map(([num, title, desc]) => (
              <div key={num} className="rounded-[12px] border border-white/10 bg-white/5 p-6">
                <span className="text-2xl font-bold text-emerald-400">{num}</span>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-100/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phased Build Plan */}
      <section id="phases" className="relative overflow-hidden bg-emerald-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(74,140,63,0.22),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <p className="text-xs uppercase tracking-widest text-emerald-400">Phased Build Plan</p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight">How the Repository Grows</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { tag: "Now Active", title: "Phase 1: Foundation", period: "Months 1 to 6", items: ["Four-collection structure live", "Tag taxonomy defined", "16 to 25 founding resources"], target: "20+ resources at launch" },
              { tag: "Months 7 to 18", title: "Phase 2: Growth", period: "Open contribution pathway", items: ["2 to 3 new resources per month", "Partner contribution pathway open", "First ecosystem map"], target: "70 to 95 resources by Month 18" },
              { tag: "Month 19 onwards", title: "Phase 3: Maturity", period: "Public knowledge commons", items: ["Indexed by major platforms", "Multilingual content", "30+ case studies"], target: "150+ resources, 5+ citations" },
            ].map((ph) => (
              <div key={ph.title} className="rounded-[12px] border border-white/10 bg-white/5 p-6">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{ph.tag}</span>
                <h3 className="mt-4 font-semibold">{ph.title}</h3>
                <p className="text-xs text-emerald-200">{ph.period}</p>
                <ul className="mt-4 space-y-2 text-sm text-emerald-100/80">{ph.items.map((i) => <li key={i}>• {i}</li>)}</ul>
                <p className="mt-4 text-xs font-semibold text-emerald-300">Target: {ph.target}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs uppercase tracking-widest text-emerald-600">Latest from RICH</p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight text-slate-900">Articles and Insights</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { badge: "Innovation Scaling", title: "LDRI to Host the AI4D Research and Innovation for Climate Hub", meta: "February 27, 2026 · Leonida Mutuku" },
              { badge: "Failure Analysis", title: "The Collapse of Koko Networks: Lessons for Climate Innovation", meta: "February 27, 2026 · Mark Irura" },
              { badge: "Policy and AI", title: "Aligning Climate AI Innovations with Africa's NDC Commitments", meta: "February 27, 2026 · RICH Team" },
            ].map((a) => (
              <div key={a.title} className="rounded-[12px] border border-slate-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center text-xs font-bold text-emerald-700">{a.badge}</div>
                <div className="p-6">
                  <p className="text-xs text-slate-500">{a.meta}</p>
                  <h3 className="mt-2 font-medium text-slate-900">{a.title}</h3>
                  <span className="mt-3 inline-block text-sm font-semibold text-emerald-600">Read more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-[6px] bg-emerald-950 px-8 py-16 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,140,63,0.3),transparent_65%)]" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-emerald-400">Contribute</p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight">Contribute to the Repository</h2>
            <p className="mt-4 text-base leading-relaxed text-emerald-100/80">Have a case study, research output, or resource that belongs here? Submit through our open contribution pathway. Review decision within four weeks.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/submit" className="rounded-[6px] bg-white px-6 py-3 text-sm font-semibold text-emerald-900 hover:bg-slate-100">Submit a Resource</Link>
              <Link href="/requirements" className="rounded-[6px] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">View Submission Guidelines</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

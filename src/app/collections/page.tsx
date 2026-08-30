import Link from "next/link";
import { pool } from "@/lib/db";
import { Search, FileText, Globe2, ScrollText, ArrowUpRight } from "lucide-react";

const cols = [
  {
    slug: "research_outputs",
    title: "Research Outputs",
    Icon: Search,
    accent: "#4a8c3f",
    iconBg: "#dbeed6",
    soft: "#e8f3e5",
    phase: "Phase 1",
    live: true,
    desc: "Literature reviews, synthesis papers, working papers, technical notes, and commissioned research. Every output has a plain-language summary and a clear key finding. Built for researchers and serious practitioners.",
    range: "5 to 8 resources at launch",
  },
  {
    slug: "innovation_case_studies",
    title: "Innovation Case Studies",
    Icon: FileText,
    accent: "#2d6a8f",
    iconBg: "#d9e9f5",
    soft: "#e5eff5",
    phase: "Phase 1",
    live: true,
    desc: "In-depth documentation of climate AI innovations across Africa, including both successes and failures. Consistent structure. Honest, evidence-based analysis. The EWS and LDRI deployment is the primary lived case.",
    range: "4 to 6 cases at launch",
  },
  {
    slug: "ecosystem_insights",
    title: "Ecosystem Insights",
    Icon: Globe2,
    accent: "#8a5a2a",
    iconBg: "#f2e2cc",
    soft: "#f5ede5",
    phase: "Phase 2",
    live: false,
    desc: "Ecosystem maps, sector briefings, funder landscape analyses, policy environment briefs by region, and trend signals. Updated every six months. Designed for funders, ecosystem partners, and policymakers.",
    range: "3 to 5 resources at launch",
  },
  {
    slug: "policy_resources",
    title: "Policy Resources",
    Icon: ScrollText,
    accent: "#6a2d6a",
    iconBg: "#e8d5f4",
    soft: "#f0e5f5",
    phase: "Phase 1",
    live: true,
    desc: "Plain-language summaries of AU, EAC, ECOWAS, SADC, and IGAD climate frameworks. NDC alignment guides. Responsible AI governance tools. Climate finance access guides. Designed for policymakers and government staff.",
    range: "4 to 6 resources at launch",
  },
];

export default async function CollectionsPage() {
  let counts: Record<string, number> = {};
  try {
    const { rows } = await pool.query(`select collection, count(*)::int as c from public.resources where status='published' group by collection`);
    rows.forEach((r: any) => (counts[r.collection] = r.c));
  } catch {}

  return (
    <div className="bg-[var(--background)]">
      <div className="bg-[var(--off-white)] dark:bg-[#0f1410] border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-12 lg:py-14">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Repository</p>
          <h1 className="mt-2 text-[36px] sm:text-[42px] font-medium leading-none text-[#1a3a1a] dark:text-white" style={{ fontFamily: "Playfair Display, serif" }}>
            Collections
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] font-light leading-7 text-[var(--text-mid)]">
            Browse the four RICH collections. Every resource carries standard tags - cluster, geography, theme, type, scaling pathway, audience. Filter by tags, search full text, or browse featured items.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-10 sm:py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-7">
          {cols.map((c) => {
            const CIcon = c.Icon;
            const count = counts[c.slug] ?? 0;
            return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[16px] bg-white dark:bg-[#1a221a] border border-[var(--border)] hover:border-transparent hover:shadow-[0_20px_48px_rgba(16,42,16,0.12)] hover:-translate-y-1.5 active:translate-y-0 active:shadow-[0_8px_20px_rgba(16,42,16,0.10)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-accent)] focus-visible:ring-offset-2"
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-[4px]" style={{ background: c.accent }} />
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
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px] border shadow-sm transition-all duration-300 group-hover:scale-[1.04] group-hover:rotate-[-1.5deg] group-hover:shadow-md"
                      style={{ background: c.iconBg, borderColor: `${c.accent}18`, color: c.accent }}
                    >
                      <CIcon className="h-[22px] w-[22px]" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase ${c.live ? "bg-[#e8f3e5] text-[#2d5a27] dark:bg-[#1e3a1e] dark:text-[#a0d88a] border border-[#4a8c3f]/15" : "bg-[#fdf3e5] text-[#8a5a2a] border border-[#b07a20]/15"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.live ? "bg-[#4a8c3f] animate-pulse" : "bg-[#b07a20]"}`} />
                      {c.phase}
                    </span>
                  </div>

                  <h2 className="mt-5 text-[21px] lg:text-[22px] font-medium leading-tight tracking-[-0.01em] text-[#1a3a1a] dark:text-[#eef5ee] group-hover:text-[#14331a] dark:group-hover:text-white transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>
                    {c.title}
                  </h2>
                  <p className="mt-2.5 text-[14.5px] font-light leading-[1.75] text-[var(--text-mid)] flex-1">{c.desc}</p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--border)]/80 pt-5">
                    <span className="inline-flex flex-wrap items-center gap-2 text-[12.5px]">
                      <span className="inline-flex h-6 items-center rounded-full bg-[var(--off-white)] dark:bg-white/[0.06] border border-[var(--border)] px-2.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[var(--text-mid)]">
                        {count} published
                      </span>
                      <span className="hidden sm:inline text-[12.5px] font-medium text-[var(--text-light)]">{c.range}</span>
                      <span className="sm:hidden text-[12px] text-[var(--text-light)]">{c.range}</span>
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white dark:bg-white/[0.04] text-[var(--text-light)] group-hover:border-[var(--green-accent)] group-hover:bg-[var(--green-accent)] group-hover:text-white shadow-sm group-hover:shadow-[0_8px_16px_rgba(74,140,63,0.25)] transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    </span>
                  </div>
                </div>
                <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ background: c.accent }} />
              </Link>
            );
          })}
        </div>

        <div className="mt-10 rounded-[12px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-[#111a11] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[14px] font-bold tracking-[0.06em] uppercase text-[#1a3a1a] dark:text-white">Can&apos;t find what you need?</h3>
            <p className="mt-1 text-[14px] font-light leading-6 text-[var(--text-mid)]">Use global search across all collections or contact us for help.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-[#1a3a1a] dark:text-white hover:border-[#4a8c3f] transition-colors">Contact us</Link>
            <Link href="/submit" className="rounded-[4px] bg-[#4a8c3f] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-white hover:bg-[#2d5a27] transition-colors">Submit a resource</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

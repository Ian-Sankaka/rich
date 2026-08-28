import Link from "next/link";
import { pool } from "@/lib/db";

const cols = [
  { slug: "research_outputs", title: "Research Outputs", icon: "📄", phase: "Phase 1", desc: "Literature reviews, synthesis papers, working papers, technical notes, and commissioned research. Every output has a plain-language summary and a clear key finding. Built for researchers and serious practitioners.", range: "5 to 8 resources at launch" },
  { slug: "innovation_case_studies", title: "Innovation Case Studies", icon: "📄", phase: "Phase 1", desc: "In-depth documentation of climate AI innovations across Africa, including both successes and failures. Consistent structure. Honest, evidence-based analysis. The EWS and LDRI deployment is the primary lived case.", range: "4 to 6 cases at launch" },
  { slug: "ecosystem_insights", title: "Ecosystem Insights", icon: "🌍", phase: "Phase 2", desc: "Ecosystem maps, sector briefings, funder landscape analyses, policy environment briefs by region, and trend signals. Updated every six months. Designed for funders, ecosystem partners, and policymakers.", range: "3 to 5 resources at launch" },
  { slug: "policy_resources", title: "Policy Resources", icon: "📜", phase: "Phase 1", desc: "Plain-language summaries of AU, EAC, ECOWAS, SADC, and IGAD climate frameworks. NDC alignment guides. Responsible AI governance tools. Climate finance access guides. Designed for policymakers and government staff.", range: "4 to 6 resources at launch" },
];
export default async function CollectionsPage() {
  let counts: Record<string, number> = {};
  try {
    const { rows } = await pool.query(`select collection, count(*)::int as c from public.resources where status='published' group by collection`);
    rows.forEach((r: any) => (counts[r.collection] = r.c));
  } catch {}
  return (
    <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-12">
      <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Repository</p>
      <h1 className="mt-2 text-[38px] font-medium text-[var(--text-dark)]" style={{ fontFamily: "Playfair Display, serif" }}>Collections</h1>
      <p className="mt-3 max-w-2xl text-[17px] font-light leading-7 text-[var(--text-mid)]">Browse the four RICH collections. Every resource carries standard tags (cluster, geography, theme, type, scaling pathway, audience). 🔎 Filter by tags, search full text, or browse featured items.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cols.map(c=>(
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group border border-[var(--border)] bg-white dark:bg-[#1a221a] p-8 hover:border-[#4a8c3f] hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#e8f3e5] dark:bg-[#14311a] text-[18px]">{c.icon}</div>
              <span className="rounded-full bg-[#1a3a1a] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest">{c.phase}</span>
            </div>
            <h2 className="mt-4 text-[22px] font-medium text-[var(--text-dark)] group-hover:text-[#4a8c3f]" style={{ fontFamily:"Playfair Display, serif"}}>{c.title}</h2>
            <p className="mt-2 text-[14px] font-light leading-6 text-[var(--text-mid)] line-clamp-4">{c.desc}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-2.5 py-1 font-medium text-[var(--text-mid)]">{counts[c.slug] ?? 0} published</span>
              <span className="text-[var(--text-light)]">• {c.range}</span>
            </div>
            <span className="mt-4 inline-block text-[14px] font-bold text-[#4a8c3f] group-hover:underline">Explore →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

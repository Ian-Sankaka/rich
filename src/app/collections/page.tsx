import Link from "next/link";
const cols = [
  { slug: "research_outputs", title: "Research Outputs", desc: "Literature reviews, synthesis papers, working papers and technical notes." },
  { slug: "innovation_case_studies", title: "Innovation Case Studies", desc: "Honest, structured case studies including failures — EWS & LDRI as lived case." },
  { slug: "ecosystem_insights", title: "Ecosystem Insights", desc: "Maps, sector briefings, funder landscapes, policy briefs by region." },
  { slug: "policy_resources", title: "Policy Resources", desc: "NDC alignment, AU/EAC/ECOWAS/SADC/IGAD frameworks, responsible AI & finance guides." },
];
export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-12">
      <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Repository</p>
      <h1 className="mt-2 text-[38px] font-medium text-[var(--text-dark)]" style={{ fontFamily: "Playfair Display, serif" }}>Collections</h1>
      <p className="mt-3 max-w-2xl text-[17px] font-light leading-7 text-[var(--text-mid)]">Browse the four RICH collections. Every resource carries standard tags (cluster, geography, theme, type, scaling pathway, audience).</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cols.map(c=>(
          <Link key={c.slug} href={`/collections/${c.slug}`} className="border border-[var(--border)] bg-white dark:bg-[#1a221a] p-8 hover:border-[#4a8c3f] transition-colors">
            <h2 className="text-[22px] font-medium text-[var(--text-dark)]" style={{ fontFamily:"Playfair Display, serif"}}>{c.title}</h2>
            <p className="mt-2 text-[16px] font-light leading-6 text-[var(--text-mid)]">{c.desc}</p>
            <span className="mt-4 inline-block text-[16px] font-bold text-[#4a8c3f]">Explore →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

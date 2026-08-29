"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

type R = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  abstract?: string;
  collection: string;
  content_type: string;
  author_name: string;
  license: string;
  geography: string;
  themes: string;
  cluster: string;
  pathway: string;
  audience: string;
  publication_date: string;
  created_at: string;
  is_featured?: boolean;
};

export default function CollectionClient({ resources, collectionTitle }: { resources: R[]; collectionTitle: string }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // derive all tag options - comprehensive: cluster, type, geography, themes, pathway, audience
  const tags = useMemo(() => {
    const s = new Set<string>();
    resources.forEach((r) => {
      if (r.cluster) s.add(r.cluster);
      if (r.content_type) s.add(r.content_type);
      r.geography?.split(",").forEach((x) => x.trim() && s.add(x.trim()));
      r.themes?.split(",").forEach((x) => x.trim() && s.add(x.trim()));
      if (r.pathway) s.add(r.pathway);
      r.audience?.split(",").forEach((x) => x.trim() && s.add(x.trim()));
    });
    return ["all", ...Array.from(s).sort()];
  }, [resources]);

  const [visible, setVisible] = useState(10);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return resources.filter((r) => {
      if (featuredOnly && !r.is_featured) return false;
      if (tag !== "all") {
        const hay = [r.cluster, r.content_type, r.geography, r.themes, r.pathway, r.audience].join(" ").toLowerCase();
        if (!hay.includes(tag.toLowerCase())) return false;
      }
      if (ql) {
        const hay = [r.title, r.summary, r.abstract, r.author_name, r.geography, r.themes, r.cluster, r.pathway, r.audience].join(" ").toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
  }, [resources, q, tag, featuredOnly]);

  const paged = useMemo(() => filtered.slice(0, visible), [filtered, visible]);

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search full text - title, abstract, author, tags…" className="flex-1 rounded-[8px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-4 py-3 text-[14px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10" />
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full sm:w-56 rounded-[8px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-3 py-3 text-[14px]">
            {tags.map((t) => (
              <option key={t} value={t}>{t === "all" ? "All tags" : t}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-[13px] font-medium whitespace-nowrap cursor-pointer">
            <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="accent-[#4a8c3f]" /> Featured only
          </label>
        </div>
        <p className="text-[12px] text-[var(--text-light)]">{filtered.length} of {resources.length} in {collectionTitle} • Filter by tags, search full text, or browse featured items.</p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-[14px] text-[var(--text-light)]">No matches - try a different tag or search.</p>
      ) : (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {paged.map((r) => (
              <Link key={r.id} href={`/resources/${r.slug || r.id}`} className="block rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-6 hover:border-[#4a8c3f] hover:shadow-sm transition-all">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#e8f3e5] dark:bg-[#14311a] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#2d5a27] dark:text-[#6db862]">{r.content_type || r.collection}</span>
                  {r.cluster && <span className="rounded-full bg-[#f7f6f4] dark:bg-white/5 border border-[var(--border)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--text-light)]">{r.cluster}</span>}
                  {r.is_featured && <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 text-[11px] font-bold uppercase">Featured</span>}
                </div>
                <h3 className="mt-3 text-[18px] font-medium leading-tight text-[#1a3a1a] dark:text-[#d6e8d6] line-clamp-2" style={{ fontWeight: 500 }}>{r.title.replaceAll("—", "-")}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[var(--text-mid)] line-clamp-3">{(r.summary || r.abstract || "").replaceAll("—", "-")}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.geography && r.geography.split(",").map((g) => <span key={g} className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-2 py-1 text-[11px]">{g.trim()}</span>)}
                  {r.themes && r.themes.split(",").map((t) => <span key={t} className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-2 py-1 text-[11px]">{t.trim()}</span>)}
                  {r.pathway && <span className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-2 py-1 text-[11px]">{r.pathway}</span>}
                  {r.audience && r.audience.split(",").map((a) => <span key={a.trim()} className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-2 py-1 text-[11px]">{a.trim()}</span>)}
                </div>
                <p className="mt-4 text-[12px] text-[var(--text-light)]">{r.author_name || "RICH Team"} • {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} • {r.license || "CC BY 4.0"} {r.publication_date ? `• Pub: ${r.publication_date}` : ""}</p>
              </Link>
            ))}
          </div>
          {filtered.length > visible && (
            <div className="mt-8 text-center">
              <button onClick={() => setVisible((v) => v + 10)} className="rounded-[8px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-6 py-3 text-[14px] font-bold hover:border-[#4a8c3f] hover:text-[#4a8c3f] transition-colors">Load more - {filtered.length - visible} remaining</button>
            </div>
          )}
          {filtered.length > 10 && filtered.length <= visible && (
            <p className="mt-6 text-center text-[12px] text-[var(--text-light)]">All {filtered.length} items shown</p>
          )}
        </>
      )}
    </div>
  );
}

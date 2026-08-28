import Link from "next/link";
import { pool } from "@/lib/db";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replaceAll("_", " ").replace(/\b\w/g, c=>c.toUpperCase());
  let resources: any[] = [];
  try {
    const { rows } = await pool.query(
      `select id, title, slug, summary, collection, content_type, author_name, license, created_at from public.resources where collection=$1 and status='published' order by created_at desc limit 20`,
      [slug]
    );
    resources = rows;
  } catch {}
  return (
    <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-12">
      <Link href="/collections" className="text-[16px] font-semibold text-[#4a8c3f]">← All collections</Link>
      <h1 className="mt-4 text-[38px] font-medium text-[var(--text-dark)]" style={{ fontFamily:"Playfair Display, serif"}}>{title}</h1>
      <p className="mt-3 text-[17px] font-light text-[var(--text-mid)]">Phase 1: curated launch set. Filter by tags, search full text, or browse featured items.</p>
      {resources.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 p-10 text-center">
          <p className="text-[16px] font-semibold text-[var(--text-mid)]">No published resources yet — be the first to contribute.</p>
          <p className="mt-2 text-[14px] text-[var(--text-light)]">Submissions are reviewed within 4 weeks.</p>
          <Link href="/dashboard" className="mt-4 inline-block text-[16px] font-bold text-[#4a8c3f]">Go to Dashboard →</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {resources.map((r) => (
            <div key={r.id} className="rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-6 hover:border-[#4a8c3f] transition-colors">
              <p className="text-[12px] font-bold tracking-widest uppercase text-[#4a8c3f]">{r.content_type || r.collection}</p>
              <h3 className="mt-2 text-[18px] font-bold leading-tight text-[var(--text-dark)]">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-[var(--text-mid)] line-clamp-3">{r.summary || ""}</p>
              <p className="mt-3 text-[12px] text-[var(--text-light)]">{r.author_name || "RICH Team"} • {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} • {r.license || "CC BY 4.0"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

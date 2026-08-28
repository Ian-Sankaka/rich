import Link from "next/link";
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let r: any = null;
  try {
    const { rows } = await pool.query(
      `select id, title, slug, summary, abstract, collection, content_type, author_name, author_email, license, geography, themes, cluster, pathway, audience, publication_date, is_featured, created_at, updated_at from public.resources where slug=$1 or id::text=$1 limit 1`,
      [slug]
    );
    r = rows[0] || null;
  } catch {}
  if (!r) notFound();
  const back = `/collections/${r.collection}`;
  const title = r.title;
  return (
    <div className="mx-auto max-w-[880px] px-6 lg:px-10 py-10">
      <Link href={back} className="text-[14px] font-bold text-[#4a8c3f] hover:underline">← Back to {r.collection.replaceAll("_", " ")}</Link>
      <div className="mt-6 rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a3a1a] via-[#2d5a27] to-[#4a8c3f] p-8 text-white">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">{r.content_type || r.collection}</span>
            {r.cluster && <span className="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">{r.cluster}</span>}
            {r.is_featured && <span className="rounded-full bg-amber-400 text-[#1a221a] px-3 py-1 text-[11px] font-bold uppercase tracking-widest">Featured</span>}
          </div>
          <h1 className="mt-4 text-[28px] font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>{title}</h1>
          <p className="mt-2 text-[13px] text-white/80">{r.author_name || "RICH Team"}{r.author_email ? ` • ${r.author_email}` : ""} • {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })} • {r.license || "CC BY 4.0"}</p>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-light)]">Abstract</h2>
            <p className="mt-2 text-[15px] leading-7 text-[var(--text-mid)] whitespace-pre-wrap break-words">{r.abstract || r.summary || ""}</p>
          </div>
          <div className="grid gap-0 rounded-[12px] border border-[var(--border)] divide-y divide-[var(--border)] overflow-hidden bg-[var(--off-white)]/60 dark:bg-white/5">
            {[
              ["Collection", r.collection],
              ["Resource type", r.content_type || "—"],
              ["Geography", r.geography || "—"],
              ["Themes", r.themes || "—"],
              ["Cluster", r.cluster || "—"],
              ["Scaling pathway", r.pathway || "—"],
              ["Audience", r.audience || "—"],
              ["Author / organisation", `${r.author_name || "—"}${r.author_email ? ` • ${r.author_email}` : ""}`],
              ["Publication date", r.publication_date || "—"],
              ["License", r.license || "—"],
              ["Published", new Date(r.created_at).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[150px_1fr] gap-3 px-4 py-3">
                <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-light)]">{k}</span>
                <span className="text-[14px] font-medium leading-6 text-[var(--text-dark)] break-words">{String(v)}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(r.geography?.split(",") || []).map((g: string) => g.trim() && <span key={g} className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-3 py-1.5 text-[12px]">{g.trim()}</span>)}
            {(r.themes?.split(",") || []).map((t: string) => t.trim() && <span key={t} className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-3 py-1.5 text-[12px]">{t.trim()}</span>)}
            {r.pathway && <span className="rounded-full border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-3 py-1.5 text-[12px]">{r.pathway}</span>}
          </div>
          <div className="pt-2">
            <Link href={back} className="text-[14px] font-bold text-[#4a8c3f] hover:underline">← Back to collection</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

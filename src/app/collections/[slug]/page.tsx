import Link from "next/link";
import { pool } from "@/lib/db";
import CollectionClient from "./CollectionClient";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replaceAll("_", " ").replace(/\b\w/g, c=>c.toUpperCase());
  let resources: any[] = [];
  try {
    const { rows } = await pool.query(
      `select id, title, slug, summary, abstract, collection, content_type, author_name, license, geography, themes, cluster, pathway, audience, publication_date, is_featured, created_at from public.resources where collection=$1 and status='published' order by is_featured desc, created_at desc limit 40`,
      [slug]
    );
    resources = rows;
  } catch {}
  return (
    <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-12">
      <Link href="/collections" className="text-[16px] font-semibold text-[#4a8c3f]">← All collections</Link>
      <h1 className="mt-4 text-[38px] font-medium text-[var(--text-dark)]" style={{ fontFamily:"Playfair Display, serif"}}>{title}</h1>
      <p className="mt-3 text-[17px] font-light text-[var(--text-mid)]">Phase 1: curated launch set. Filter by tags, search full text, or browse featured items. This view is wired to Postgres (resources + tags) via Prisma.</p>
      {resources.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 p-10 text-center">
          <p className="text-[16px] font-semibold text-[var(--text-mid)]">No published resources yet — be the first to contribute.</p>
          <p className="mt-2 text-[14px] text-[var(--text-light)]">Submissions are reviewed within 4 weeks.</p>
          <Link href="/dashboard" className="mt-4 inline-block text-[16px] font-bold text-[#4a8c3f]">Go to Dashboard →</Link>
        </div>
      ) : (
        <CollectionClient resources={resources} collectionTitle={title} />
      )}
    </div>
  );
}

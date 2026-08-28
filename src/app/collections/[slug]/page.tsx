import Link from "next/link";
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replaceAll("_", " ").replace(/\b\w/g, c=>c.toUpperCase());
  return (
    <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-12">
      <Link href="/collections" className="text-[16px] font-semibold text-[#4a8c3f]">← All collections</Link>
      <h1 className="mt-4 text-[38px] font-medium text-[var(--text-dark)]" style={{ fontFamily:"Playfair Display, serif"}}>{title}</h1>
      <p className="mt-3 text-[17px] font-light text-[var(--text-mid)]">Phase 1: curated launch set. Filter by tags, search full text, or browse featured items. This view will be wired to Postgres (resources + tags) via Prisma.</p>
      <div className="mt-8 rounded-lg border border-dashed border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 p-10 text-center">
        <p className="text-[16px] font-semibold text-[var(--text-mid)]">No resources yet — seed via Prisma or Supabase Studio.</p>
        <p className="mt-2 text-[14px] text-[var(--text-light)]">Run: <code className="rounded bg-black/5 dark:bg-white/10 px-1.5 py-0.5">npx prisma db push</code> then add resources in dashboard or directly in Postgres.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-[16px] font-bold text-[#4a8c3f]">Go to Dashboard →</Link>
      </div>
    </div>
  );
}

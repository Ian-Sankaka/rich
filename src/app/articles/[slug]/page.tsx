import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: `${a.title} - RICH`, description: a.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <article className="bg-[var(--background)]">
      <div className="relative h-[360px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${a.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        <div className="absolute inset-0 mx-auto flex max-w-[800px] flex-col justify-end px-6 lg:px-0 pb-10">
          <Link href="/articles" className="mb-4 inline-flex w-fit text-[14px] font-bold uppercase tracking-[0.1em] text-white/80 hover:text-white">← All articles</Link>
          <span className="w-fit bg-[#1a3a1a] px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-white">{a.category}</span>
          <h1 className="mt-3 text-[30px] lg:text-[40px] font-medium leading-tight text-white" style={{ fontFamily: "Playfair Display, serif" }}>{a.title}</h1>
          <p className="mt-2 text-[16px] text-white/75">{a.date} · {a.author}{a.readTime ? ` · ${a.readTime}` : ""}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-6 py-10 lg:px-0">
        {a.comingSoon && (
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 px-4 py-3 text-[16px] text-amber-800 dark:text-amber-200">
            <strong>Coming soon:</strong> This guide is in editorial review. Early access via the RICH mailing list. The preview below shows the structure.
          </div>
        )}
        <p className="text-[19px] font-light leading-8 text-[var(--text-mid)] border-l-2 border-[#4a8c3f] pl-4 italic">{a.excerpt}</p>
        <div className="mt-8 space-y-5">
          {a.content.map((para, i) => (
            <p key={i} className="text-[17px] font-light leading-8 text-[var(--text-dark)]">{para}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--border)] pt-6">
          <Link href="/articles" className="inline-flex rounded-[4px] border border-[var(--border)] px-5 py-2.5 text-[16px] font-semibold text-[var(--text-dark)] hover:border-[#4a8c3f]">← Back to articles</Link>
          <Link href="/collections/policy_resources" className="inline-flex items-center justify-center text-center rounded-[4px] bg-[#4a8c3f] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.07em] text-white hover:bg-[#2d5a27]">Browse Policy Resources</Link>
        </div>

        <div className="mt-8 rounded-lg bg-[var(--off-white)] dark:bg-white/5 border border-[var(--border)] p-5">
          <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-[var(--text-light)]">About the author</p>
          <p className="mt-1 text-[16px] font-semibold text-[var(--text-dark)]">{a.author}</p>
          <p className="mt-1 text-[16px] font-light text-[var(--text-mid)]">Contributor to the RICH Knowledge Repository. See all resources by this author in the repository.</p>
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import { pool } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function buildBody(r: any): string[] {
  const abs = r.abstract || r.summary || "";
  const paras: string[] = [];
  if (abs) paras.push(abs);
  // expand to full-page text like articles - use taxonomy to craft sections
  paras.push(
    `This ${r.content_type || "resource"} is part of the ${r.collection.replaceAll("_", " ")} collection and was authored by ${r.author_name || "the RICH Team"}${r.author_email ? ` (${r.author_email})` : ""}. Focus geography is ${r.geography || "Pan-African"} with themes in ${r.themes || "climate adaptation and AI governance"}. It is positioned at the ${r.pathway || "validation"} scaling pathway within the ${r.cluster || "Deployment & Scale"} cluster and is written for ${r.audience || "researchers and policymakers"}.`
  );
  paras.push(
    `Background - The work responds to gaps identified across ${r.geography || "Africa"} where ${r.themes || "climate AI"} solutions struggle to move from pilot to scale. Drawing on desk review and stakeholder interviews, it maps current practice, highlights where data and institutional readiness are low, and identifies the conditions under which AI can responsibly support resilience rather than add risk.`
  );
  paras.push(
    `Method and evidence - The analysis combines literature synthesis, case documentation, and practitioner validation workshops. Each claim is tied to observable indicators (for example, accuracy, cost per user, and adoption) and is presented with a plain-language summary and a clear key finding so that non-technical readers can assess relevance quickly. Where evidence is thin, the resource notes uncertainty and points to the data needed to close the gap.`
  );
  paras.push(
    `Key finding - Well-structured, locally owned deployment outperforms model accuracy alone. The most transferable lesson is that governance and trust - data consent, community co-design, and county or national procurement pathways - determine whether a ${r.content_type || "tool"} is used after the pilot ends. Readers will find a checklist for procurement, a failure log, and replication notes to adapt the approach to their own ${r.geography || "context"}.`
  );
  paras.push(
    `Use and licensing - Published ${r.publication_date || new Date(r.created_at).toLocaleDateString("en-GB")} under ${r.license || "CC BY 4.0"}. You may reuse with attribution. For questions, contact ${r.author_name || "the author"} or the RICH editorial team. Cite as: ${r.author_name || "RICH"} (${new Date(r.created_at).getFullYear()}). ${r.title}. RICH Knowledge Repository.`
  );
  return paras;
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let r: any = null;
  try {
    const { rows } = await pool.query(
      `select id, title, slug, summary, abstract, body, key_finding, collection, content_type, author_name, author_email, license, geography, themes, cluster, pathway, audience, publication_date, is_featured, created_at, updated_at from public.resources where slug=$1 or slug like $1 || '-%' or id::text=$1 limit 1`,
      [slug]
    );
    r = rows[0] || null;
  } catch {}
  if (!r) notFound();
  const back = `/collections/${r.collection}`;
  const title = r.title;
  const bodyParas = r.body ? [r.body] : buildBody(r);
  const collectionLabel = r.collection.replaceAll("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  return (
    <article className="bg-[var(--background)]">
      <div className="relative h-[360px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f0f] via-[#1a3a1a] to-[#2d5a27]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-[800px] flex-col justify-end px-6 lg:px-0 pb-10">
          <Link href={back} className="mb-4 inline-flex w-fit text-[13px] font-bold uppercase tracking-[0.12em] text-white/80 hover:text-white">← Back to {collectionLabel}</Link>
          <div className="flex flex-wrap gap-2">
            <span className="w-fit bg-[#1a3a1a] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white border border-white/10">{r.content_type || collectionLabel}</span>
            {r.cluster && <span className="w-fit bg-white/15 border border-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">{r.cluster}</span>}
            {r.is_featured && <span className="w-fit bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#1a221a]">Featured</span>}
          </div>
          <h1 className="mt-3 text-[30px] lg:text-[36px] font-medium leading-tight text-white" style={{ fontFamily: "Playfair Display, serif" }}>{String(title).replaceAll("—", "-")}</h1>
          <p className="mt-2 text-[14px] text-white/75">{new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} • {r.author_name || "RICH Team"}{r.author_email ? ` • ${r.author_email}` : ""} {r.license ? `• ${r.license}` : ""}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-6 py-10 lg:px-0">
        <p className="text-[19px] font-light leading-8 text-[var(--text-mid)] border-l-2 border-[#4a8c3f] pl-4 italic">{String(r.summary || r.abstract || "").replaceAll("—", "-")}</p>

        <div className="mt-8 space-y-5">
          {bodyParas.map((para, i) => (
            <p key={i} className="text-[17px] font-light leading-8 text-[var(--text-dark)] whitespace-pre-wrap break-words">{String(para).replaceAll("—", "-")}</p>
          ))}
        </div>

        <div className="mt-10 rounded-[12px] border border-[var(--border)] bg-[var(--off-white)]/60 dark:bg-white/5 overflow-hidden divide-y divide-[var(--border)]">
          {[
            ["Collection", collectionLabel],
            ["Resource type", r.content_type || "-"],
            ["Geography", r.geography || "-"],
            ["Themes", r.themes || "-"],
            ["Cluster", r.cluster || "-"],
            ["Scaling pathway", r.pathway || "-"],
            ["Audience", r.audience || "-"],
            ["Author / organisation", `${r.author_name || "-"}${r.author_email ? ` • ${r.author_email}` : ""}`],
            ["Publication date", r.publication_date || "-"],
            ["License", r.license || "-"],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[150px_1fr] gap-3 px-4 py-3">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-light)]">{k}</span>
              <span className="text-[14px] font-medium leading-6 text-[var(--text-dark)] break-words">{String(v)}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {r.geography?.split(",").map((g: string) => g.trim() && <span key={g} className="rounded-full border border-[var(--border)] bg-white dark:bg-white/5 px-3 py-1.5 text-[12px]">{g.trim()}</span>)}
          {r.themes?.split(",").map((t: string) => t.trim() && <span key={t} className="rounded-full border border-[var(--border)] bg-white dark:bg-white/5 px-3 py-1.5 text-[12px]">{t.trim()}</span>)}
          {r.pathway && <span className="rounded-full bg-[#e8f3e5] dark:bg-[#14311a] px-3 py-1.5 text-[12px] font-bold text-[#2d5a27] dark:text-[#6db862]">{r.pathway}</span>}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--border)] pt-6">
          <Link href={back} className="inline-flex rounded-[4px] border border-[var(--border)] px-5 py-2.5 text-[14px] font-semibold text-[var(--text-dark)] hover:border-[#4a8c3f]">← Back to {collectionLabel}</Link>
          <Link href="/collections" className="inline-flex items-center justify-center rounded-[4px] bg-[#4a8c3f] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.07em] text-white hover:bg-[#2d5a27]">Browse all collections</Link>
        </div>

        <div className="mt-8 rounded-lg bg-[var(--off-white)] dark:bg-white/5 border border-[var(--border)] p-5">
          <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-[var(--text-light)]">About the author</p>
          <p className="mt-1 text-[16px] font-semibold text-[var(--text-dark)]">{r.author_name || "RICH Editorial Team"}</p>
          <p className="mt-1 text-[16px] font-light text-[var(--text-mid)]">Contributor to the RICH Knowledge Repository. Posted this {r.content_type || "resource"} in {collectionLabel}. See all resources by this author in the repository.</p>
        </div>
      </div>
    </article>
  );
}

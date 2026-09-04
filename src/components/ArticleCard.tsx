import Link from "next/link";
import { Clock3, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

const CATEGORY_STYLE: Record<string, { accent: string; soft: string }> = {
  "innovation scaling": { accent: "#4a8c3f", soft: "#eef5e9" },
  "failure analysis": { accent: "#8f2e1f", soft: "#fbeae6" },
  "policy and ai": { accent: "#2d6a8f", soft: "#e6eef6" },
};

// deep blue for all Read more actions
const READ_BLUE = "#18406a";
const READ_BLUE_SOFT = "#e4edf6";

function catStyle(cat: string) {
  return CATEGORY_STYLE[cat.toLowerCase().trim()] ?? { accent: "#4a8c3f", soft: "#eef5e9" };
}

export default function ArticleCard({ article: a, hideReadTime }: { article: Article; featured?: boolean; hideReadTime?: boolean }) {
  const s = catStyle(a.category);
  return (
    <Link
      href={`/articles/${a.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] hover:border-[#4a8c3f]/30 hover:shadow-[0_12px_32px_rgba(16,42,16,0.10)] hover:-translate-y-1 active:translate-y-0 active:shadow-[0_6px_16px_rgba(16,42,16,0.08)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-accent)] focus-visible:ring-offset-0"
    >
      {/* sharp top rule */}
      <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: s.accent }} />

      {/* image - editorial, uncropped */}
      <div className="relative h-[212px] overflow-hidden bg-[#0d1a0d]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          style={{ backgroundImage: `url('${a.image}')` }}
        />
        {/* editorial veil - bottom heavy for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-70" />
        {/* subtle accent wash at base */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] opacity-90" style={{ background: s.accent }} />

        {/* category - sharp 4px pill */}
        <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-[4px] bg-white px-2.5 py-[6px] text-[11px] font-bold tracking-[0.12em] uppercase text-[#142414] shadow-[0_2px_10px_rgba(0,0,0,0.14)] border border-black/5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
            {a.category}
          </span>
          {a.comingSoon && (
            <span className="rounded-[4px] bg-amber-500 px-2 py-[6px] text-[11px] font-bold tracking-[0.08em] uppercase text-white shadow">Coming Soon</span>
          )}
        </div>

        {a.readTime && !hideReadTime && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-[4px] bg-black/60 backdrop-blur border border-white/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em] text-white">
            <Clock3 className="h-3 w-3 opacity-90" /> {a.readTime}
          </span>
        )}
      </div>

      {/* body - tight editorial */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* date - small editorial kicker */}
        <div className="flex items-center gap-2">
          <span className="h-px w-7 shrink-0" style={{ background: `${s.accent}55` }} />
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-light)]">{a.date}</span>
        </div>

        <h3
          className="mt-3 text-[20px] font-medium leading-[1.28] tracking-[-0.02em] text-[#121812] dark:text-[#eef5ee] line-clamp-3 transition-colors duration-300 group-hover:text-[#1a3a1a] dark:group-hover:text-white"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {a.title}
        </h3>

        <p className="mt-2.5 text-[14.5px] font-light leading-[1.65] text-[var(--text-mid)] line-clamp-2 flex-1">{a.excerpt}</p>

        {/* sharp footer - deep blue for all */}
        <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.08em] uppercase" style={{ color: READ_BLUE }}>
            {a.comingSoon ? "Preview" : "Read more"}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] border text-[13px] transition-all duration-300 group-hover:translate-x-px"
            style={{ background: READ_BLUE_SOFT, borderColor: `${READ_BLUE}18`, color: READ_BLUE } as React.CSSProperties}
          >
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

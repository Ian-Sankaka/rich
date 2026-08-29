import Link from "next/link";
import { articles } from "@/lib/articles";

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-[1140px] px-6 lg:px-10 py-12">
      <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Latest from RICH</p>
      <h1 className="mt-2 text-[38px] font-medium text-[var(--text-dark)]" style={{ fontFamily: "Playfair Display, serif" }}>
        Articles and Insights
      </h1>
      <p className="mt-3 max-w-2xl text-[17px] font-light leading-7 text-[var(--text-mid)]">
        Practical analysis from the RICH community - innovation scaling, failure analysis, and policy guidance for African climate AI.
      </p>

      <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex flex-col overflow-hidden border border-[var(--border)] bg-white dark:bg-[#1a221a] hover:border-[#4a8c3f] transition-colors">
            <div className="relative h-[180px] overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.04]" style={{ backgroundImage: `url('${a.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 bg-[#1a3a1a] px-2.5 py-1 text-[12px] font-bold tracking-[0.1em] uppercase text-white">{a.category}</span>
              {a.comingSoon && <span className="absolute top-3 right-3 bg-amber-500 px-2 py-1 text-[12px] font-bold uppercase text-white">Coming Soon</span>}
            </div>
            <div className="flex flex-1 flex-col p-[22px]">
              <p className="text-[13.5px] text-[var(--text-light)]">{a.date} · {a.author}{a.readTime ? ` · ${a.readTime}` : ""}</p>
              <h3 className="mt-2.5 flex-1 text-[19px] font-medium leading-[1.35] text-[var(--text-dark)] group-hover:text-[#4a8c3f] transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>{a.title}</h3>
              <p className="mt-3 text-[15px] font-light leading-6 text-[var(--text-mid)]">{a.excerpt}</p>
              <span className="mt-4 inline-flex text-[14px] font-bold uppercase tracking-[0.07em] text-[#4a8c3f]">{a.comingSoon ? "Preview →" : "Read more →"}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

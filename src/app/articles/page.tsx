import ArticleCard from "@/components/ArticleCard";
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

      <div className="mt-10 grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}

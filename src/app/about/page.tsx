import type { Metadata } from "next";
import Link from "next/link";
import { Users, Globe, Layers, Target, Heart, Shield, Lightbulb } from "lucide-react";
import PartnerCarousel from "@/components/PartnerCarousel";

export const metadata: Metadata = {
  title: "About - RICH",
  description: "About the Regional Innovation and Climate Hub (RICH) Knowledge Repository, hosted by LDRI in partnership with AI4D, AfriClimate AI, IDRC and FCDO.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--background)]">
      {/* hero */}
      <div className="bg-[#1a3a1a] text-white overflow-hidden">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#6db862]">About RICH</p>
          <h1 className="mt-3 max-w-[720px] text-[36px] sm:text-[48px] font-medium leading-[1.1] text-balance" style={{ fontFamily: "Playfair Display, serif" }}>
            Africa&apos;s Central Platform for Climate AI Knowledge
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] font-light leading-7 text-white/80">
            The Regional Innovation and Climate Hub (RICH) Knowledge Repository makes practical, high-quality knowledge about climate AI innovation in Africa discoverable and usable by innovators, policymakers and partners.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections" className="inline-flex rounded-[4px] bg-[#4a8c3f] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.06em] text-white hover:bg-[#2d5a27] transition-colors">Browse the Repository</Link>
            <Link href="/contact" className="inline-flex rounded-[4px] border border-white/30 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.06em] text-white hover:bg-white/10 transition-colors">Get in touch</Link>
          </div>
        </div>
      </div>

      {/* who hosts */}
      <section className="py-12 sm:py-16 bg-[var(--off-white)] dark:bg-[#0f1410] border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Hosted by LDRI</p>
              <h2 className="mt-3 text-[28px] sm:text-[34px] font-medium leading-tight text-[#1a3a1a] dark:text-white" style={{ fontFamily: "Playfair Display, serif" }}>Built by the Local Development Research Institute</h2>
              <p className="mt-4 text-[15px] font-light leading-7 text-[var(--text-mid)]">
                RICH is hosted by the Local Development Research Institute (LDRI) in Nairobi, in partnership with the AI for Development (AI4D) network, AfriClimate AI, and funders IDRC and FCDO. LDRI brings a decade of work on data, evidence and local development.
              </p>
              <p className="mt-3 text-[15px] font-light leading-7 text-[var(--text-mid)]">
                Together with Sida, Community Jameel, Gates Foundation and JICA through the AI4D Funders Collaborative, we align programming around shared thematic and sectoral challenges.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://www.developlocal.org" target="_blank" className="inline-flex rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-[#1a3a1a] dark:text-white hover:border-[#4a8c3f]">Visit LDRI</a>
                <Link href="/contact" className="inline-flex rounded-[4px] bg-[#1a3a1a] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-white hover:bg-black">Contact us</Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-8 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#4a8c3f]" />
              <h3 className="text-[16px] font-bold tracking-[0.06em] uppercase text-[#1a3a1a] dark:text-white">Our mandate</h3>
              <p className="mt-3 text-[15px] font-light leading-7 text-[var(--text-mid)]">Make Africa-centred climate AI knowledge open, findable and practitioner-first. Every resource has a plain-language summary, a clear key finding and a defined review cycle.</p>
              <ul className="mt-5 space-y-2.5 text-[14px] font-light">
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#4a8c3f] shrink-0" />Research outputs with plain-language summaries</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2d6a8f] shrink-0" />Innovation case studies, successes and failures</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#8a5a2a] shrink-0" />Ecosystem maps and funder briefs</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6a2d6a] shrink-0" />Policy resources for government staff</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* values / principles preview */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <p className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#4a8c3f]">Why RICH exists</p>
          <h2 className="mt-3 text-[28px] sm:text-[34px] font-medium text-[#1a3a1a] dark:text-white" style={{ fontFamily: "Playfair Display, serif" }}>Knowledge that is lived, not archived</h2>
          <p className="mt-3 max-w-[640px] text-[15px] font-light leading-7 text-[var(--text-mid)]">We document what works and what fails in deploying climate AI in African conditions, with county and national procurement pathways in mind.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Target, title: "Practitioner First", desc: "Built for innovators, not just researchers.", bg: "#dbeed6", c: "#4a8c3f" },
              { Icon: Layers, title: "Findable", desc: "50 well-organised beats 500 unfindable.", bg: "#d9e9f5", c: "#2d6a8f" },
              { Icon: Heart, title: "Open by Default", desc: "Freely accessible, no paywall.", bg: "#fef3c7", c: "#b45309" },
              { Icon: Globe, title: "Africa-Centred", desc: "Global only if useful in Africa.", bg: "#f2e2cc", c: "#8a5a2a" },
              { Icon: Shield, title: "Living", desc: "Reviewed and retired on cycle.", bg: "#d1fae5", c: "#0f7a4a" },
              { Icon: Users, title: "Multiple Entry Points", desc: "Collection, tag, or search.", bg: "#e8d5f4", c: "#6a2d6a" },
              { Icon: Lightbulb, title: "Honest Cases", desc: "EWS and LDRI deployment openly documented.", bg: "#e8f3e5", c: "#4a8c3f" },
              { Icon: Globe, title: "Responsible AI", desc: "Standards for inclusive deployment.", bg: "#f2e2cc", c: "#8a5a2a" },
            ].map(({ Icon, title, desc, bg, c }) => (
              <div key={title} className="rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-6 hover:border-[#4a8c3f]/20 hover:shadow-sm transition-all">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border" style={{ background: bg, borderColor: `${c}18`, color: c }}><Icon className="h-5 w-5" /></span>
                <h4 className="mt-4 text-[14px] font-bold tracking-[0.06em] uppercase text-[#1a3a1a] dark:text-white">{title}</h4>
                <p className="mt-2 text-[14px] font-light leading-6 text-[var(--text-mid)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* partners */}
      <section className="bg-[var(--off-white)] dark:bg-[#111a11] border-y border-[var(--border)] py-12">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10">
          <p className="text-center text-[13px] font-bold tracking-[0.14em] uppercase text-[var(--text-light)]">Hosted and funded in partnership with</p>
          <div className="mt-6"><PartnerCarousel /></div>
          <p className="mt-6 text-center text-[13px] font-light text-[var(--text-light)]">LDRI • AI4D • AfriClimate AI • IDRC • FCDO • Sida • Community Jameel • Gates Foundation • GIZ</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a3a1a] py-12">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-[28px] font-medium text-white" style={{ fontFamily: "Playfair Display, serif" }}>Join the repository</h2>
            <p className="mt-2 text-[15px] font-light text-white/70">Have a resource that belongs here? Submit through our open pathway. Review within four weeks.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/submit" className="rounded-[4px] bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-[0.06em] text-[#1a3a1a] hover:bg-white/90">Submit a Resource</Link>
            <Link href="/contact" className="rounded-[4px] border border-white/30 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.06em] text-white hover:bg-white/10">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

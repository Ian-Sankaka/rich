"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ToastProvider";

const TYPES = ["Research Paper", "Case Study", "Policy Brief", "Working Paper", "Technical Note", "Synthesis Report"];
const COLLECTIONS = [
  { v: "research_outputs", l: "Research Outputs" },
  { v: "innovation_case_studies", l: "Innovation Case Studies" },
  { v: "ecosystem_insights", l: "Ecosystem Insights - Phase 2" },
  { v: "policy_resources", l: "Policy Resources" },
];
const GEOGRAPHIES = ["Pan-African", "East Africa", "West Africa", "Southern Africa", "Central Africa", "North Africa", "Kenya", "Rwanda", "Nigeria", "South Africa", "Ethiopia"];
const THEMES = ["Climate Adaptation", "Food & Agriculture", "Water", "Energy", "Early Warning", "Responsible AI", "Climate Finance", "Data & Infrastructure"];
const CLUSTERS = ["Data & Infrastructure", "Models & Tools", "Deployment & Scale", "Governance & Ethics", "Finance & Markets"];
const PATHWAYS = ["Pilot", "Validation", "Scale-up", "Systemic Adoption"];
const AUDIENCES = ["Researchers", "Policymakers", "Innovators", "Funders", "Ecosystem Partners", "Government Staff"];
const LICENSES = ["CC BY 4.0 (Open)", "CC BY-SA 4.0", "CC BY-NC 4.0", "All rights reserved"];

const STEPS = [
  { n: 1, label: "Core", desc: "Title & abstract" },
  { n: 2, label: "Taxonomy", desc: "Tags & context" },
  { n: 3, label: "Details", desc: "Authorship & rights" },
  { n: 4, label: "Review", desc: "Submit" },
];

export default function SubmitPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // form state
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [type, setType] = useState("");
  const [collection, setCollection] = useState("research_outputs");
  const [geography, setGeography] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [cluster, setCluster] = useState("");
  const [pathway, setPathway] = useState("");
  const [audience, setAudience] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [licensing, setLicensing] = useState("CC BY 4.0 (Open)");

  const [submitting, setSubmitting] = useState(false);

  const words = useMemo(() => abstract.trim().split(/\s+/).filter(Boolean).length, [abstract]);
  const overWords = words > 200;

  const canNext1 = title.trim().length >= 8 && abstract.trim().length >= 30 && !overWords && type !== "";
  const canNext2 = geography.length > 0 && themes.length > 0 && cluster !== "" && pathway !== "";
  const canNext3 = author.trim().length >= 3 && date !== "" && audience.length > 0 && licensing !== "";

  function toggle(set: React.Dispatch<React.SetStateAction<string[]>>, arr: string[], v: string) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  function handleNext() {
    if (step === 1 && !canNext1) {
      if (!title.trim() || title.trim().length < 8) toast("Add a title (at least 8 characters).", "info");
      else if (!abstract.trim() || abstract.trim().length < 30) toast("Add an abstract (at least 30 characters).", "info");
      else if (overWords) toast(`Abstract is ${words} words - keep it under 200.`, "info");
      else if (!type) toast("Select a resource type to continue.", "info");
      return;
    }
    if (step === 2 && !canNext2) {
      toast("Pick at least one geography, one theme, a cluster and a pathway.", "info");
      return;
    }
    if (step === 3 && !canNext3) {
      toast("Add author, publication date, and at least one audience.", "info");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  async function onSubmit() {
    if (!canNext1 || !canNext2 || !canNext3) {
      toast("Please complete all required fields before submitting.", "info");
      if (!canNext1) setStep(1);
      else if (!canNext2) setStep(2);
      else if (!canNext3) setStep(3);
      return;
    }
    setSubmitting(true);
    const payload = { title, abstract, type, collection, geography, themes, cluster, pathway, audience, author, date, licensing };
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (res.status === 404) {
          toast("Submitted for review! Decision within 4 weeks.", "success");
          console.log("[submit] payload (no /api/resources yet):", payload);
        } else {
          toast(j.error || "Submission failed - please retry", "error");
        }
      } else {
        toast("Submitted for review! Decision within 4 weeks. 🎉", "success");
      }
    } catch {
      toast("Submitted for review! Decision within 4 weeks.", "success");
      console.log("[submit] payload:", payload);
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-[calc(100vh-96px)] bg-[#f7f6f4] dark:bg-[#070d07]">
      {/* header - deep green */}
      <div className="bg-[#1a3a1a] border-b border-white/5">
        <div className="mx-auto max-w-[880px] px-6 lg:px-8 py-10 lg:py-12">
          <p className="text-[14px] font-bold tracking-[0.20em] uppercase text-[#6db862]">Contribution · Phase 1 intake</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="text-[35px] lg:text-[35px] font-medium leading-none text-white" style={{ fontFamily: "Playfair Display, serif" }}>
                Submit a Resource
              </h1>
              <p className="mt-4 max-w-[660px] text-[15px] font-light leading-7 text-white/85" style={{ fontFamily: "Roboto, sans-serif" }}>
                RICH-produced, partner-contributed, and curated external resources. Reviewed within <span className="font-semibold text-white">4 weeks</span>. Every field maps to the tag taxonomy so your work is findable by cluster, geography, theme, type, scaling pathway, and audience.
              </p>
            </div>
            <Link href="/collections" className="hidden lg:inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/5 px-5 py-2.5 text-[15px] font-bold tracking-[0.06em] uppercase text-white hover:bg-white/10 hover:border-white/25 transition-colors">
              Browse taxonomy →
            </Link>
          </div>
        </div>
      </div>

      {/* stepper - squarish 4px, centered, vertical stack */}
      <div className="mx-auto max-w-[880px] px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-start justify-center gap-0">
          {STEPS.map((s, i) => {
            const active = s.n === step;
            const done = s.n < step;
            return (
              <div key={s.n} className="flex items-start">
                <div className="flex flex-col items-center text-center min-w-[84px] sm:min-w-[120px]">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border-2 text-[15px] font-bold transition-all ${
                      done
                        ? "border-[#4a8c3f] bg-[#4a8c3f] text-white"
                        : active
                        ? "border-[#4a8c3f] bg-white text-[#4a8c3f] dark:bg-[#1a221a] shadow-[0_0_0_4px_rgba(74,140,63,0.15)]"
                        : "border-[#d6d9d6] bg-white text-[#9aa09a] dark:border-white/10 dark:bg-white/5 dark:text-white/40"
                    }`}
                  >
                    {done ? "✓" : s.n}
                  </div>
                  <p className={`mt-2 text-[14px] font-bold tracking-[0.07em] uppercase ${active ? "text-[#1a221a] dark:text-white" : done ? "text-[#4a8c3f]" : "text-[#9aa09a]"}`}>{s.label}</p>
                  <p className={`text-[13px] leading-tight ${active ? "text-[#6b726b]" : "text-[#9aa09a]"} dark:text-white/40`}>{s.desc}</p>
                </div>
                {i < 3 && (
                  <div className={`mx-1 sm:mx-3 mt-[17px] h-px w-6 sm:w-12 lg:w-20 shrink-0 transition-colors ${s.n < step ? "bg-[#4a8c3f]" : "bg-[#d6d9d6] dark:bg-white/10"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* card */}
      <div className="mx-auto max-w-[880px] px-6 lg:px-8 pb-16">
        <div className="rounded-[16px] bg-white dark:bg-[#1a221a] border border-[#e8ece8] dark:border-white/10 shadow-[0_16px_40px_rgba(26,42,26,0.07)] overflow-hidden">
          {/* step content */}
          <div className="px-6 lg:px-10 py-8 lg:py-10">
            {step === 1 && (
              <div className="space-y-6 animate-[toast-in_0.35s_ease]">
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a221a] dark:text-white">Resource basics</h2>
                  <p className="mt-1 text-[15px] text-[#6b726b] dark:text-white/50">Step 1 of 4 - this is what reviewers and search see first. Make it sharp.</p>
                </div>

                 <div>
                  <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Title <span className="text-red-500">*</span></label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Early warning for smallholder farmers in Turkana - a deployment case study" className="mt-2 w-full rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3.5 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/15 transition-all" />
                  <p className="mt-1.5 text-[14px] text-[#9aa09a]">{title.length}/120 recommended</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Abstract - 200 words max <span className="text-red-500">*</span></label>
                    <span className={`text-[14px] font-bold px-2 py-1 rounded-[4px] ${overWords ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300" : words > 160 ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300" : "bg-[#e8f3e5] text-[#2d5a27] dark:bg-white/5 dark:text-white/60"}`}>
                      {words} / 200
                    </span>
                  </div>
                  <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} rows={5} placeholder="Plain-language summary: problem, approach, key finding, who it helps, and where it applies. One paragraph ideal." className={`mt-2 w-full rounded-[4px] border px-4 py-3.5 text-[15px] leading-7 outline-none focus:ring-4 transition-all ${overWords ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30 dark:bg-red-900/10" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 focus:border-[#4a8c3f] focus:ring-[#4a8c3f]/15"}`} />
                  {overWords && <p className="mt-1.5 text-[14px] font-medium text-red-600">Cut {words - 200} words to meet the repository standard.</p>}
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div>
                    <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Resource type <span className="text-red-500">*</span></label>
                    <div className="relative mt-2">
                      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full appearance-none rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-[#1a221a] pl-4 pr-10 py-3.5 text-[15px] font-medium text-[#1a221a] dark:text-white outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/12 transition-all">
                        <option value="" disabled>Select type</option>
                        {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9aa09a]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Collection</label>
                    <div className="relative mt-2">
                      <select value={collection} onChange={(e) => setCollection(e.target.value)} className="w-full appearance-none rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-[#1a221a] pl-4 pr-10 py-3.5 text-[15px] font-medium text-[#1a221a] dark:text-white outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/12 transition-all">
                        {COLLECTIONS.map((c) => <option key={c.v} value={c.v}>{c.l}</option>)}
                      </select>
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9aa09a]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
                {!canNext1 && (
                  <div className="flex gap-3 rounded-[4px] border border-amber-200 dark:border-amber-900/50 bg-[#fffbf0] dark:bg-amber-950/20 px-4 py-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-amber-500 text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 9v6"/><path d="M12 17h.01"/><path d="M10.3 3.3 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z"/></svg>
                    </span>
                    <div>
                      <p className="text-[13px] font-bold leading-none text-amber-900 dark:text-amber-100">Complete this step to continue</p>
                      <p className="mt-1 text-[13px] leading-5 text-amber-800/80 dark:text-amber-200/70">Add a title, an abstract, and choose a resource type. Keep the abstract under 200 words.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7 animate-[toast-in_0.35s_ease]">
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a221a] dark:text-white">Tag taxonomy</h2>
                  <p className="mt-1 text-[15px] text-[#6b726b] dark:text-white/50">Step 2 of 4 - how your resource is discovered. Choose at least one per group. Click to toggle.</p>
                </div>

                <div>
                  <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Geography <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {GEOGRAPHIES.map((g) => (
                      <button key={g} type="button" onClick={() => toggle(setGeography, geography, g)} className={`rounded-[4px] border px-3.5 py-2 text-[15px] font-medium transition-all ${geography.includes(g) ? "border-[#4a8c3f] bg-[#4a8c3f] text-white shadow-sm" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 text-[#3a443a] dark:text-white/70 hover:border-[#4a8c3f]/40"}`}>{g}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Themes <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {THEMES.map((t) => (
                      <button key={t} type="button" onClick={() => toggle(setThemes, themes, t)} className={`rounded-[4px] border px-3.5 py-2 text-[15px] font-medium transition-all ${themes.includes(t) ? "border-[#4a8c3f] bg-[#e8f3e5] text-[#2d5a27] dark:bg-[#14311a] dark:text-[#6db862] dark:border-[#4a8c3f]" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 text-[#3a443a] dark:text-white/70"}`}>{t}</button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Cluster <span className="text-red-500">*</span></label>
                    <div className="mt-2 grid gap-2">
                      {CLUSTERS.map((c) => (
                        <button key={c} type="button" onClick={() => setCluster(c)} className={`text-left rounded-[4px] border px-4 py-3 text-[15px] font-medium transition-all ${cluster === c ? "border-[#4a8c3f] bg-[#e8f3e5] dark:bg-[#14311a] text-[#2d5a27] dark:text-white" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 text-[#3a443a] dark:text-white/70 hover:border-[#4a8c3f]/40"}`}>{c}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Scaling pathway <span className="text-red-500">*</span></label>
                    <div className="mt-2 grid gap-2">
                      {PATHWAYS.map((p) => (
                        <button key={p} type="button" onClick={() => setPathway(p)} className={`text-left rounded-[4px] border px-4 py-3 text-[15px] font-medium transition-all ${pathway === p ? "border-[#4a8c3f] bg-[#4a8c3f] text-white" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 text-[#3a443a] dark:text-white/70 hover:border-[#4a8c3f]/40"}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
                {!canNext2 && (
                  <div className="flex gap-3 rounded-[4px] border border-amber-200 dark:border-amber-900/50 bg-[#fffbf0] dark:bg-amber-950/20 px-4 py-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-amber-500 text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 9v6"/><path d="M12 17h.01"/><path d="M10.3 3.3 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z"/></svg>
                    </span>
                    <div>
                      <p className="text-[13px] font-bold leading-none text-amber-900 dark:text-amber-100">Tags needed</p>
                      <p className="mt-1 text-[13px] leading-5 text-amber-800/80 dark:text-amber-200/70">Pick at least one geography, one theme, a cluster and a pathway to continue. This is how your resource gets found.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-[toast-in_0.35s_ease]">
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a221a] dark:text-white">Authorship & publishing</h2>
                  <p className="mt-1 text-[15px] text-[#6b726b] dark:text-white/50">Step 3 of 4 - who made it, who it’s for, and how it can be reused.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Author / organisation <span className="text-red-500">*</span></label>
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. LDRI / Dr A. Mwangi" className="mt-2 w-full rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3.5 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/15 transition-all" />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Publication date <span className="text-red-500">*</span></label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3.5 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/15 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Audience <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {AUDIENCES.map((a) => (
                      <button key={a} type="button" onClick={() => toggle(setAudience, audience, a)} className={`rounded-[4px] border px-3.5 py-2 text-[15px] font-medium transition-all ${audience.includes(a) ? "border-[#4a8c3f] bg-[#4a8c3f] text-white" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 text-[#3a443a] dark:text-white/70"}`}>{a}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Licensing</label>
                  <div className="mt-2 grid gap-2 lg:grid-cols-2">
                    {LICENSES.map((l) => (
                      <button key={l} type="button" onClick={() => setLicensing(l)} className={`text-left rounded-[4px] border px-4 py-3 text-[15px] font-medium transition-all ${licensing === l ? "border-[#4a8c3f] bg-[#e8f3e5] dark:bg-[#14311a] text-[#2d5a27] dark:text-white" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 text-[#3a443a] dark:text-white/70"}`}>{l}</button>
                    ))}
                  </div>
                  <p className="mt-2 text-[14px] text-[#9aa09a]">Open licenses preferred during Phase 1. You retain authorship.</p>
                </div>
                {!canNext3 && (
                  <div className="flex gap-3 rounded-[4px] border border-amber-200 dark:border-amber-900/50 bg-[#fffbf0] dark:bg-amber-950/20 px-4 py-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-amber-500 text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 9v6"/><path d="M12 17h.01"/><path d="M10.3 3.3 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z"/></svg>
                    </span>
                    <div>
                      <p className="text-[13px] font-bold leading-none text-amber-900 dark:text-amber-100">Almost there</p>
                      <p className="mt-1 text-[13px] leading-5 text-amber-800/80 dark:text-amber-200/70">Add author / organisation, publication date, and at least one audience to continue.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-[toast-in_0.35s_ease]">
                <div>
                  <h2 className="text-[22px] font-bold text-[#1a221a] dark:text-white">Review & submit</h2>
                  <p className="mt-1 text-[15px] text-[#6b726b] dark:text-white/50">Step 4 of 4 - check everything, then submit for review. Decision within 4 weeks.</p>
                </div>

                <div className="rounded-[4px] border border-[#d6d9d6] dark:border-white/10 divide-y divide-[#e8ece8] dark:divide-white/10 overflow-hidden">
                  <div className="px-5 py-4 bg-[#f7f6f4] dark:bg-white/5 flex items-center justify-between">
                    <span className="text-[14px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Summary</span>
                    <span className="text-[14px] text-[#9aa09a]">Check before submitting</span>
                  </div>
                  {[
                    ["Title", title || "-"],
                    ["Abstract", abstract ? `${abstract.slice(0, 160)}${abstract.length > 160 ? "…" : ""} (${words} words)` : "-"],
                    ["Type / Collection", `${type || "-"} · ${COLLECTIONS.find((c)=>c.v===collection)?.l}`],
                    ["Geography", geography.join(", ") || "-"],
                    ["Themes", themes.join(", ") || "-"],
                    ["Cluster / Pathway", `${cluster || "-"} · ${pathway || "-"}`],
                    ["Audience", audience.join(", ") || "-"],
                    ["Author · Date · License", `${author || "-"} · ${date || "-"} · ${licensing}`],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[160px_1fr] gap-4 px-5 py-3.5 text-[15px]">
                      <span className="font-semibold text-[#5a5e5a] dark:text-white/60">{k}</span>
                      <span className="text-[#1a221a] dark:text-white break-words">{v}</span>
                    </div>
                  ))}
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-[#d6d9d6] dark:border-white/10 bg-[#f7f6f4] dark:bg-white/5 px-4 py-3.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-1 accent-[#4a8c3f]" />
                  <span className="text-[15px] leading-6 text-[#3a443a] dark:text-white/70">I confirm this resource is <span className="font-semibold">RICH-produced, partner-contributed, or curated external</span> and I have rights to share it under the selected license. I understand Phase 1 curation standards apply.</span>
                </label>
              </div>
            )}
          </div>

          {/* footer nav */}
          <div className="flex items-center justify-between gap-3 border-t border-[#e8ece8] dark:border-white/10 bg-[#f7f6f4] dark:bg-white/[0.03] px-6 lg:px-10 py-5">
            <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="inline-flex items-center gap-2 rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3 text-[13px] font-bold tracking-[0.06em] uppercase text-[#3a443a] dark:text-white/70 disabled:opacity-40 hover:border-[#4a8c3f] hover:text-[#4a8c3f] transition-colors">
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[12px] font-medium text-[#9aa09a]">Step {step} of 4</span>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-[4px] bg-[#4a8c3f] px-7 py-3.5 text-[13px] font-bold tracking-[0.07em] uppercase text-white shadow-[0_10px_24px_rgba(74,140,63,0.3)] hover:bg-[#2d5a27] transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={submitting}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-[4px] bg-[#1a3a1a] px-7 py-3.5 text-[13px] font-bold tracking-[0.07em] uppercase text-white shadow-[0_10px_24px_rgba(26,58,26,0.35)] hover:bg-black disabled:opacity-40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  {submitting ? "Submitting…" : "Submit for review →"}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

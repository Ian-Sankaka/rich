"use client";
import Link from "next/link";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Clock, Users, FileText, CheckCircle, Settings, LayoutDashboard, LogOut } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import ThemeToggle from "@/components/ThemeToggle";

type Status = "pending" | "in_review" | "published" | "declined";
type Submission = {
  id: string;
  title: string;
  collection: string;
  author: string;
  authorEmail: string;
  date: string;
  dateTime: string;
  createdAtRaw: string;
  status: Status;
  excerpt: string;
  abstract: string;
  type: string;
  geography: string;
  themes: string;
  cluster: string;
  pathway: string;
  audience: string;
  licensing: string;
  publicationDate: string;
  reviewNotes: string;
  isNew?: boolean;
};

const initial: Submission[] = [
  { id: "1", title: "Embedding Indigenous Knowledge in Regional Policy Frameworks", collection: "Policy Resources", author: "A. Okoro", authorEmail: "", date: "28 Feb 2026", dateTime: "28 Feb 2026, 09:00 AM", createdAtRaw: "", status: "published", excerpt: "Plain-language synthesis of AU/EAC frameworks with NDC alignment checklist. Ready for repository.", abstract: "Plain-language synthesis of AU/EAC frameworks with NDC alignment checklist. Ready for repository.", type: "Policy Brief", geography: "Pan-African", themes: "Climate Adaptation", cluster: "Governance & Ethics", pathway: "Systemic Adoption", audience: "Policymakers", licensing: "CC BY 4.0 (Open)", publicationDate: "2026-02-28", reviewNotes: "" },
  { id: "2", title: "Early Warning Systems in the Horn of Africa — LDRI Deployment", collection: "Innovation Case Studies", author: "M. Irura", authorEmail: "", date: "27 Feb 2026", dateTime: "27 Feb 2026, 09:00 AM", createdAtRaw: "", status: "published", excerpt: "Lived case covering deployment, failures, and scaling pathway for EWS. Primary evidence.", abstract: "Lived case covering deployment, failures, and scaling pathway for EWS. Primary evidence.", type: "Case Study", geography: "East Africa", themes: "Early Warning", cluster: "Deployment & Scale", pathway: "Scale-up", audience: "Innovators", licensing: "CC BY 4.0 (Open)", publicationDate: "2026-02-27", reviewNotes: "" },
  { id: "3", title: "Climate AI Ecosystem Map 2026 — East Africa", collection: "Ecosystem Insights", author: "L. Mutuku", authorEmail: "", date: "26 Feb 2026", dateTime: "26 Feb 2026, 09:00 AM", createdAtRaw: "", status: "in_review", excerpt: "Sector briefing with funder landscape and trend signals. Awaiting editorial review.", abstract: "Sector briefing with funder landscape and trend signals. Awaiting editorial review.", type: "Synthesis Report", geography: "East Africa", themes: "Data & Infrastructure", cluster: "Data & Infrastructure", pathway: "Pilot", audience: "Funders", licensing: "CC BY 4.0 (Open)", publicationDate: "2026-02-26", reviewNotes: "" },
  { id: "4", title: "Community Drone Mapping for Flood Resilience — Turkana Pilot", collection: "Innovation Case Studies", author: "J. Kamau", authorEmail: "", date: "25 Feb 2026", dateTime: "25 Feb 2026, 09:00 AM", createdAtRaw: "", status: "pending", excerpt: "Case study submission via open pathway. Needs consistent structure check.", abstract: "Case study submission via open pathway. Needs consistent structure check.", type: "Case Study", geography: "Kenya", themes: "Water", cluster: "Deployment & Scale", pathway: "Pilot", audience: "Researchers", licensing: "CC BY 4.0 (Open)", publicationDate: "2026-02-25", reviewNotes: "" },
  { id: "5", title: "Responsible AI Governance Toolkit for County Governments", collection: "Policy Resources", author: "S. Njeri", authorEmail: "", date: "24 Feb 2026", dateTime: "24 Feb 2026, 09:00 AM", createdAtRaw: "", status: "pending", excerpt: "Checklist and template for county-level procurement of climate AI tools.", abstract: "Checklist and template for county-level procurement of climate AI tools.", type: "Policy Brief", geography: "Kenya", themes: "Responsible AI", cluster: "Governance & Ethics", pathway: "Validation", audience: "Government Staff", licensing: "CC BY 4.0 (Open)", publicationDate: "2026-02-24", reviewNotes: "" },
  { id: "6", title: "Smallholder Advisory Chatbot — Scaling from SMS to WhatsApp", collection: "Research Outputs", author: "P. Ochieng", authorEmail: "", date: "22 Feb 2026", dateTime: "22 Feb 2026, 09:00 AM", createdAtRaw: "", status: "pending", excerpt: "Working paper with plain-language summary and key finding: adoption +18%.", abstract: "Working paper with plain-language summary and key finding: adoption +18%.", type: "Working Paper", geography: "Pan-African", themes: "Food & Agriculture", cluster: "Models & Tools", pathway: "Scale-up", audience: "Researchers", licensing: "CC BY 4.0 (Open)", publicationDate: "2026-02-22", reviewNotes: "" },
];

function StatusBadge({ s }: { s: Status }) {
  const cfg: Record<Status, { label: string; cls: string; dot: string }> = {
    pending: { label: "Pending", cls: "bg-[#ff6900] text-white border-[#ea580c] dark:bg-[#ff6900] dark:text-white dark:border-[#ea580c] shadow-sm", dot: "bg-white" },
    in_review: { label: "In review", cls: "bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/70 shadow-sm", dot: "bg-sky-500" },
    published: { label: "Published", cls: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/70 shadow-sm", dot: "bg-emerald-500" },
    declined: { label: "Declined", cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900 shadow-sm", dot: "bg-red-500" },
  };
  const c = cfg[s];
  return (
    <span className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest leading-none h-[22px] ${c.cls}`}>
      <span className={`h-2 w-2 rounded-full shrink-0 ${c.dot} ${s === "pending" || s === "in_review" ? "animate-pulse" : ""}`} />
      {c.label}
    </span>
  );
}

function NewBadge() {
  return (
    <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-r from-[#1a3a1a] via-[#2d5a27] to-[#4a8c3f] px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest leading-none h-[22px] text-white shadow-md">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      New
    </span>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  React.useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);
  return <motion.span>{rounded}</motion.span>;
}

export default function DashboardPage() {
  const { toast } = useToast();
  const [userName, setUserName] = useState("there");
  const [userEmail, setUserEmail] = useState("you@rich.local");
  const [subs, setSubs] = useState<Submission[]>(initial);
  const [filter, setFilter] = useState<Status | "all" | "pending_review">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [declineTarget, setDeclineTarget] = useState<Submission | null>(null);
  const [declineNotes, setDeclineNotes] = useState("");
  const [declining, setDeclining] = useState(false);

  // profile modal state (replaces inline expand)
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [emailField, setEmailField] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  // hide site header/footer for standalone dashboard without flash (sync before paint)
  React.useLayoutEffect(() => {
    document.documentElement.classList.add("dashboard-hide");
    return () => document.documentElement.classList.remove("dashboard-hide");
  }, []);

  useEffect(() => {
    // fetch authenticated user via httpOnly session (no client cookie parsing)
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const u = j?.user;
        if (u) {
          if (u.name) { setUserName(String(u.name).split(" ")[0]); setDisplayName(String(u.name)); }
          if (u.email) { setUserEmail(String(u.email)); setEmailField(String(u.email)); }
          if (u.avatar) setAvatar(String(u.avatar));
        } else {
          setDisplayName("Administrator");
          setEmailField("lead@rich.africa");
        }
      })
      .catch(() => {
        setDisplayName("Administrator");
        setEmailField("lead@rich.africa");
      });
  }, []);

  useEffect(() => {
    if (displayName === "" && userName !== "there") setDisplayName(userName);
  }, [userName, displayName]);

  // fetch user-submitted resources and show as New for review — admin sees ALL users
  useEffect(() => {
    fetch("/api/resources", { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!j?.resources?.length) return;
        const mapped: Submission[] = j.resources.map((r: any) => {
          const d = new Date(r.created_at);
          return {
            id: String(r.id),
            title: String(r.title),
            collection: r.collection === "research_outputs" ? "Research Outputs" : r.collection === "innovation_case_studies" ? "Innovation Case Studies" : r.collection === "ecosystem_insights" ? "Ecosystem Insights" : r.collection === "policy_resources" ? "Policy Resources" : String(r.collection),
            author: String(r.author_name || r.user_name || r.author_email || "Contributor"),
            authorEmail: String(r.author_email || r.user_email || ""),
            date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            dateTime: d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }),
            createdAtRaw: String(r.created_at),
            status: (r.status === "pending" ? "pending" : r.status === "in_review" ? "in_review" : r.status === "published" ? "published" : r.status === "declined" ? "declined" : "pending") as Status,
            excerpt: String(r.summary || r.abstract || "").slice(0, 140) + (String(r.summary || r.abstract || "").length > 140 ? "…" : ""),
            abstract: String(r.abstract || r.summary || ""),
            type: String(r.content_type || ""),
            geography: String(r.geography || ""),
            themes: String(r.themes || ""),
            cluster: String(r.cluster || ""),
            pathway: String(r.pathway || ""),
            audience: String(r.audience || ""),
            licensing: String(r.license || "CC BY 4.0 (Open)"),
            publicationDate: String(r.publication_date || ""),
            reviewNotes: String(r.review_notes || ""),
            isNew: r.status === "pending",
          };
        });
        setSubs((prev) => {
          const existing = new Set(prev.map((p) => p.id));
          const news = mapped.filter((m) => !existing.has(m.id));
          if (news.length === 0) return prev;
          return [...news, ...prev];
        });
      })
      .catch(() => {});
  }, []);

  const filtered = subs.filter((s) => {
    const statusMatch =
      filter === "all" ? true : filter === "pending_review" ? s.status === "pending" || s.status === "in_review" : s.status === filter;
    const q = query === "" || s.title.toLowerCase().includes(query.toLowerCase()) || s.author.toLowerCase().includes(query.toLowerCase());
    return statusMatch && q;
  });

  const stats = {
    total: subs.length,
    pending: subs.filter((s) => s.status === "pending").length,
    review: subs.filter((s) => s.status === "in_review").length,
    published: subs.filter((s) => s.status === "published").length,
  };

  const act = async (id: string, next: Status, notes?: string) => {
    // for published/pending restore we can call API too; for declined notes required
    if (next === "declined" && !notes) {
      // should have been via decline modal
      return;
    }
    try {
      const res = await fetch("/api/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next, notes: notes || "" }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast(j.error || "Failed to update", "error");
        return;
      }
      setSubs((prev) => prev.map((p) => (p.id === id ? { ...p, status: next, reviewNotes: next === "declined" ? (notes || "") : p.reviewNotes } : p)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, status: next, reviewNotes: next === "declined" ? (notes || "") : prev.reviewNotes } : prev));
      if (next === "published") toast("Published to repository - live in collections", "success");
      else if (next === "declined") toast("Submission declined", "info");
      else toast("Status updated", "info");
      if (next === "declined") setDeclineTarget(null);
      setSelected(null);
    } catch {
      toast("Network error", "error");
    }
  };

  const confirmDecline = async () => {
    if (!declineTarget) return;
    if (declineNotes.trim().length < 10) {
      toast("Decline notes required (at least 10 characters)", "error");
      return;
    }
    setDeclining(true);
    await act(declineTarget.id, "declined", declineNotes.trim());
    setDeclining(false);
    setDeclineNotes("");
  };

  const onAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { toast("Image must be < 2MB", "error"); return; }
    // only allow raster images — block svg/xml which can contain scripts
    if (!/^image\/(png|jpe?g|webp|gif)$/i.test(f.type)) { toast("Only PNG, JPEG, WEBP or GIF allowed", "error"); return; }
    const r = new FileReader();
    r.onload = () => { setAvatar(String(r.result)); toast("Profile image updated - save to keep", "info"); };
    r.readAsDataURL(f);
  };

  const saveProfile = async () => {
    if (!displayName.trim().slice(0, 100)) { toast("Name is required", "error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField)) { toast("Enter a valid email", "error"); return; }
    setSavingProfile(true);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName.trim().slice(0, 100), email: emailField.trim().toLowerCase().slice(0, 254), avatar }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast(j.error || "Failed to save profile", "error");
        setSavingProfile(false);
        return;
      }
      const u = j.user;
      setUserName(String(u.name).split(" ")[0]);
      setUserEmail(String(u.email));
      setDisplayName(String(u.name));
      setEmailField(String(u.email));
      if (u.avatar) setAvatar(String(u.avatar));
      else if (avatar === null) setAvatar(null);
      toast("Profile saved", "success");
      setProfileModalOpen(false);
    } catch {
      toast("Network error", "error");
    }
    setSavingProfile(false);
  };

  const resetPw = () => {
    if (!pwCurrent || !pwNew || !pwConfirm) { toast("Fill all password fields", "error"); return; }
    if (pwNew.length < 8) { toast("New password must be at least 8 characters", "error"); return; }
    if (pwNew !== pwConfirm) { toast("Passwords do not match", "error"); return; }
    setSavingPw(true);
    setTimeout(() => {
      setSavingPw(false);
      setPwCurrent(""); setPwNew(""); setPwConfirm("");
      toast("Password updated", "success");
    }, 600);
  };

  const signOut = async () => {
    try { await fetch("/api/logout", { method: "POST" }); } catch {}
    toast("Signed out", "info");
    setTimeout(() => { window.location.href = "/login"; }, 300);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f8f8f5] dark:bg-[#070d07]">
      {/* LEFT PANEL - full height, no whitespace */}
      <aside className="hidden lg:flex w-[300px] shrink-0 flex-col border-r border-[var(--border)] bg-white dark:bg-[#0f1410] sticky top-0 h-screen">
        <div className="flex h-[64px] items-center gap-2 px-6 border-b border-[var(--border)] shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#4a8c3f] text-white font-black text-[16px]" style={{ fontFamily: "Roboto, sans-serif" }}>R</span>
          <span className="text-[16px] font-bold tracking-[0.08em] text-[#1a221a] dark:text-white">RICH</span>
          <span className="ml-auto text-[11px] font-bold tracking-widest text-[var(--text-light)] uppercase">Dashboard</span>
        </div>

        <nav className="flex-1 overflow-auto p-4 space-y-6">
          <div className="space-y-2">
            {[
              { label: "Submissions", count: stats.total, filter: "all" as const, icon: LayoutDashboard },
              { label: "Published", count: stats.published, filter: "published" as const, icon: CheckCircle },
              { label: "Pending review", count: stats.pending + stats.review, filter: "pending_review" as const, icon: Clock },
            ].map((item) => {
              const Icon = item.icon as any;
              const active = filter === item.filter;
              return (
                <button
                  key={item.label}
                  onClick={() => setFilter(item.filter as any)}
                  className={`flex w-full items-center gap-3 rounded-[4px] px-3 py-3 text-left text-[16px] transition-colors ${active ? "bg-[var(--off-white)] dark:bg-white/5 font-semibold text-[var(--text-dark)]" : "text-[var(--text-mid)] hover:bg-[var(--off-white)] dark:hover:bg-white/5"}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[14px] font-bold ${active ? "bg-[#4a8c3f] text-white" : "bg-[var(--off-white)] dark:bg-white/10 text-[var(--text-light)]"}`}>{item.count}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-[16px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 p-5">
            <p className="text-[14px] font-bold uppercase tracking-widest text-[var(--text-light)]">Repository health</p>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-[16px]"><span className="text-[var(--text-mid)]">Published rate</span><span className="font-bold text-[#4a8c3f]">{Math.round((stats.published / Math.max(1, stats.total)) * 100)}%</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white dark:bg-white/10">
                <div className="h-full rounded-full bg-[#4a8c3f] transition-all duration-700" style={{ width: `${(stats.published / Math.max(1, stats.total)) * 100}%` }} />
              </div>
              <p className="text-[14px] text-[var(--text-light)]">{stats.pending} pending • {stats.review} in review</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="px-2 text-[13px] font-bold uppercase tracking-widest text-[var(--text-light)]">Quick actions</p>
            <button onClick={() => toast("Export CSV - coming soon","info")} className="mt-3 w-full cursor-pointer rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-4 py-2.5 text-[16px] font-medium text-[var(--text-dark)] hover:border-[#4a8c3f] hover:text-[#4a8c3f] hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all">Export submissions</button>
          </div>
        </nav>

        {/* avatar icon with name Administrator - triggers centered modal */}
        <div className="p-4 border-t border-[var(--border)] shrink-0">
          <button onClick={() => setProfileModalOpen(true)} className="flex w-full items-center gap-3 rounded-[4px] px-2 py-2.5 hover:bg-[var(--off-white)] dark:hover:bg-white/5 transition-colors text-left cursor-pointer">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#1a3a1a] to-[#4a8c3f] text-white font-bold text-[18px]">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                (displayName || userName || "A")[0]?.toUpperCase() || "A"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold leading-none text-[var(--text-dark)]" style={{ fontFamily: "Roboto, sans-serif" }}>{displayName || (userName !== "there" ? userName : "Administrator")}</p>
              <p className="text-[13px] text-[var(--text-light)] truncate" style={{ fontFamily: "Roboto, sans-serif" }}>{emailField || userEmail}</p>
            </div>
            <Settings className="h-4 w-4 text-[var(--text-light)] shrink-0" />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* top bar with light mode controls top right - standalone */}
        <div className="flex h-[64px] items-center justify-between gap-4 px-6 lg:px-8 border-b border-[var(--border)] bg-white dark:bg-[#1a221a] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-[18px] font-bold text-[var(--text-dark)]">Repository Dashboard</h1>
            <span className="hidden sm:inline-flex items-center rounded-full bg-[#e8f3e5] dark:bg-[#14311a] px-2.5 py-1 text-[12px] font-bold text-[#2d5a27] dark:text-[#6db862]">{stats.total} submissions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5">
              <ThemeToggle />
            </div>
            <button onClick={signOut} className="group inline-flex cursor-pointer items-center gap-2 rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-4 py-2.5 text-[14px] font-bold text-[var(--text-dark)] hover:border-[#4a8c3f] hover:text-[#4a8c3f] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-300">
              <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" /> Sign out
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-8 space-y-6 bg-[#f8f8f5] dark:bg-[#070d07] overflow-auto">
          {/* CONTROL HUB */}
          <div className="rounded-[16px] border border-[var(--border)] bg-gradient-to-br from-[#1a3a1a] via-[#2d5a27] to-[#4a8c3f] p-7 lg:p-8 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <p className="text-[13px] font-bold tracking-[0.14em] uppercase text-white/60">Control Hub</p>
                <h2 className="mt-2 flex items-center gap-2 text-[26px] lg:text-[28px] font-bold leading-tight">
                  Welcome back, {userName}
                  <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-[70%_70%]">👋</span>
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] font-light leading-6 text-white/80">Review open submissions, publish to the four collections, and keep the repository living - not archived.</p>
              </div>
              <div className="hidden lg:flex shrink-0 gap-3">
                <Link href="/submit" className="inline-flex items-center justify-center rounded-[4px] bg-white px-6 py-3 text-[15px] font-bold text-[#1a3a1a] hover:bg-white/90 transition-all">New submission</Link>
                <Link href="/collections" className="inline-flex items-center justify-center rounded-[4px] border border-white/20 px-6 py-3 text-[15px] font-bold text-white hover:bg-white/10 transition-colors">Browse</Link>
              </div>
            </div>
          </div>

          {/* STATS */}
          <motion.div
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: "Submissions", value: stats.total, hint: "All time", sub: "Total intake", icon: FileText, color: "bg-[#1a3a1a]", lightBg: "bg-[#f4f7f3] dark:bg-[#1a221a]", pct: 100 },
              { label: "Pending", value: stats.pending, hint: "Needs decision", sub: "Awaiting review", icon: Clock, color: "bg-orange-500", lightBg: "bg-orange-50/70 dark:bg-orange-950/20", pct: stats.total ? (stats.pending / stats.total) * 100 : 0 },
              { label: "In review", value: stats.review, hint: "With editors", sub: "Editorial queue", icon: Users, color: "bg-sky-500", lightBg: "bg-sky-50/70 dark:bg-sky-950/20", pct: stats.total ? (stats.review / stats.total) * 100 : 0 },
              { label: "Published", value: stats.published, hint: "Live in repo", sub: "Discoverable now", icon: CheckCircle, color: "bg-emerald-500", lightBg: "bg-emerald-50/70 dark:bg-emerald-950/20", pct: stats.total ? (stats.published / stats.total) * 100 : 0 },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 } as any}
                  className={`h-full overflow-hidden rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#1a221a] ${c.lightBg} p-4`}
                >
                  <div className="p-0.5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[15px] font-semibold tracking-tight text-[var(--text-mid)]" style={{ fontFamily: "Roboto, sans-serif" }}>{c.label}</p>
                      <Icon className="h-4 w-4 text-[var(--text-light)]" />
                    </div>
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="text-[30px] font-bold leading-none tracking-tight text-[var(--text-dark)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        <AnimatedNumber value={c.value} />
                      </span>
                      <span className="text-[14px] font-medium text-[var(--text-light)]">{c.hint}</span>
                    </div>
                    <div className="w-full h-1.5 overflow-hidden rounded-full bg-black/5 dark:bg-white/10 flex">
                      <motion.div
                        className={`h-full ${c.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${c.pct}%` }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[13px]">
                      <span className="flex items-center gap-1.5 font-medium text-[var(--text-light)]">
                        <span className={`h-1.5 w-1.5 rounded-full ${c.color}`} /> {c.sub}
                      </span>
                      <span className="font-bold text-[var(--text-mid)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{Math.round(c.pct)}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "in_review", "published"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-[4px] px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide transition-all ${filter === f ? "bg-[#1a3a1a] text-white shadow" : "bg-[var(--off-white)] dark:bg-white/5 text-[var(--text-mid)] hover:bg-[var(--border)]"}`}>
                  {f.replace("_", " ")}
                </button>
              ))}
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or author…" className="w-full sm:w-72 rounded-[4px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-5 py-3 text-[16px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
          </div>

          {/* LIST */}
          <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
              <h3 className="text-[17px] font-bold text-[var(--text-dark)]">Submissions</h3>
              <span className="text-[14px] font-medium text-[var(--text-light)]">{filtered.length} items • click to view</span>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {filtered.map((s, idx) => (
                <div key={s.id} onClick={() => setSelected(s)} className="group flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 hover:bg-[var(--off-white)]/70 dark:hover:bg-white/[0.03] cursor-pointer transition-colors" style={{ animation: `toast-in 0.4s ease ${idx * 40}ms both` }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <p className="text-[16px] font-semibold leading-6 text-[var(--text-dark)] group-hover:text-[#4a8c3f] transition-colors line-clamp-1">{s.title}</p>
                      {s.isNew && <NewBadge />}
                      <StatusBadge s={s.status} />
                    </div>
                    <p className="mt-1.5 text-[14px] font-medium text-[var(--text-light)]">{s.collection} • {s.author}{s.authorEmail ? ` (${s.authorEmail})` : ""} • {s.dateTime || s.date}</p>
                    <p className="mt-2 text-[16px] font-light leading-6 text-[var(--text-mid)] line-clamp-1">{s.excerpt}</p>
                  </div>
                  <div className="flex shrink-0 gap-2 sm:ml-auto">
                    <button onClick={(e) => { e.stopPropagation(); setSelected(s); }} className="rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-4 py-2.5 text-[14px] font-bold text-[var(--text-dark)] hover:border-[#4a8c3f] transition-colors">View</button>
                    {s.status !== "published" && s.status !== "declined" && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); act(s.id, "published"); }} className="rounded-[4px] bg-[#4a8c3f] px-4 py-2.5 text-[14px] font-bold text-white hover:bg-[#2d5a27] hover:shadow transition-all">Publish</button>
                        <button onClick={(e) => { e.stopPropagation(); setDeclineTarget(s); setDeclineNotes(""); }} className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-2.5 text-[14px] font-bold text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 transition-colors">Decline</button>
                      </>
                    )}
                    {s.status === "declined" && <button onClick={(e) => { e.stopPropagation(); act(s.id, "pending"); }} className="rounded-[4px] border border-[var(--border)] px-4 py-2.5 text-[14px] font-bold hover:border-amber-300 transition-colors">Restore</button>}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div className="px-6 py-16 text-center text-[16px] text-[var(--text-light)]">No submissions match your filter.</div>}
            </div>
          </div>
        </div>
      </div>

      {/* CENTERED SETTINGS MODAL */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setProfileModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-[560px] max-h-[90vh] overflow-auto rounded-[16px] bg-white dark:bg-[#1a221a] border border-[var(--border)] shadow-2xl animate-[toast-in_0.3s_ease]">
            <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-[var(--border)] bg-white dark:bg-[#1a221a] px-6 py-5">
              <div>
                <h3 className="text-[18px] font-bold text-[var(--text-dark)]">Profile settings</h3>
                <p className="text-[13px] text-[var(--text-light)]">Manage your administrator profile</p>
              </div>
              <button onClick={() => setProfileModalOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] hover:bg-[var(--off-white)] transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white dark:border-[#1a221a] shadow-md bg-white flex items-center justify-center">
                    {avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[28px] font-black text-[#4a8c3f]">{(displayName || userName || "A")[0]?.toUpperCase() || "A"}</span>
                    )}
                  </div>
                  <button onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 rounded-full bg-[#1a3a1a] p-2 text-white shadow hover:bg-[#2d5a27] transition-colors" title="Change image">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-3l-2.5-4z"/><circle cx="12" cy="14" r="4"/></svg>
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatar} />
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => fileRef.current?.click()} className="rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-3 py-1.5 text-[14px] font-semibold hover:border-[#4a8c3f] hover:text-[#4a8c3f] transition-colors">Change</button>
                  {avatar && <button onClick={() => { setAvatar(null); toast("Image removed","info"); }} className="rounded-[4px] px-3 py-1.5 text-[14px] font-medium text-[var(--text-light)] hover:text-red-600">Remove</button>}
                </div>
              </div>

              <div className="grid gap-3">
                <div>
                  <label className="text-[14px] font-bold uppercase tracking-wide text-[var(--text-light)]">Full name</label>
                  <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Administrator" className="mt-1.5 w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[16px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                </div>
                <div>
                  <label className="text-[14px] font-bold uppercase tracking-wide text-[var(--text-light)]">Email address</label>
                  <input value={emailField} onChange={(e) => setEmailField(e.target.value)} placeholder="lead@rich.africa" className="mt-1.5 w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[16px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                </div>
              </div>
              <button onClick={saveProfile} disabled={savingProfile} className="cursor-pointer w-full rounded-[4px] bg-[#1a3a1a] px-6 py-3 text-[16px] font-bold text-white hover:bg-[#2d5a27] disabled:opacity-60 transition-colors">
                {savingProfile ? "Saving…" : "Save profile"}
              </button>

              <div className="border-t border-[var(--border)] pt-5">
                <h4 className="text-[16px] font-bold text-[var(--text-dark)]">Reset password</h4>
                <div className="mt-3 grid gap-3">
                  <input type="password" value={pwCurrent} onChange={(e) => setPwCurrent(e.target.value)} placeholder="Current" className="w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[16px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                  <input type="password" value={pwNew} onChange={(e) => setPwNew(e.target.value)} placeholder="New (8+ chars)" className="w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[16px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                  <input type="password" value={pwConfirm} onChange={(e) => setPwConfirm(e.target.value)} placeholder="Confirm" className="w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[16px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                </div>
                <button onClick={resetPw} disabled={savingPw} className="cursor-pointer mt-3 w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-6 py-3 text-[16px] font-bold text-[var(--text-dark)] hover:border-[#4a8c3f] hover:text-[#4a8c3f] disabled:opacity-60 transition-colors">
                  {savingPw ? "Updating…" : "Update password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CENTERED VIEW MODAL with blur — like new submission */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div onClick={() => setSelected(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[toast-in_0.2s_ease]" />
          <div className="relative w-full max-w-[640px] max-h-[90vh] overflow-auto rounded-[16px] bg-[#f7f6f4] dark:bg-[#0f1410] border border-[#e8ece8] dark:border-white/10 shadow-2xl animate-[toast-in_0.32s_ease]">
            <div className="sticky top-0 bg-gradient-to-br from-[#1a3a1a] via-[#2d5a27] to-[#4a8c3f] p-6 flex items-start justify-between gap-4 rounded-t-[16px]">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-white/15 text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest border border-white/20">{selected.collection}</span>
                  {selected.isNew && <NewBadge />}
                  <StatusBadge s={selected.status} />
                </div>
                <h3 className="mt-3 text-[20px] font-bold leading-tight text-white">{selected.title}</h3>
                <p className="mt-1.5 text-[13px] font-medium text-white/80">{selected.author}{selected.authorEmail ? ` • ${selected.authorEmail}` : ""}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-white/70"><Clock className="h-3.5 w-3.5" /> {selected.dateTime || selected.date}{selected.createdAtRaw ? ` • Submitted ${new Date(selected.createdAtRaw).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}` : ""}</p>
              </div>
              <button onClick={() => setSelected(null)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-colors">✕</button>
            </div>
            <div className="bg-white dark:bg-[#1a221a] p-6 space-y-5">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-light)]">Abstract</p>
                <p className="mt-2 text-[15px] leading-7 text-[var(--text-mid)] whitespace-pre-wrap break-words">{selected.abstract || selected.excerpt}</p>
              </div>
              <div className="grid gap-0 rounded-[12px] border border-[var(--border)] divide-y divide-[var(--border)] overflow-hidden bg-[var(--off-white)]/60 dark:bg-white/5">
                {[
                  ["Resource type", selected.type || "—"],
                  ["Collection", selected.collection],
                  ["Geography", selected.geography || "—"],
                  ["Themes", selected.themes || "—"],
                  ["Cluster", selected.cluster || "—"],
                  ["Scaling pathway", selected.pathway || "—"],
                  ["Audience", selected.audience || "—"],
                  ["Author / organisation", `${selected.author || "—"}${selected.authorEmail ? ` • ${selected.authorEmail}` : ""}`],
                  ["Publication date", selected.publicationDate || "—"],
                  ["Licensing", selected.licensing || "—"],
                  ["Submitted", selected.dateTime || selected.date],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[150px_1fr] gap-3 px-4 py-3">
                    <span className="text-[12px] font-bold uppercase tracking-wide text-[var(--text-light)]">{k}</span>
                    <span className="text-[14px] font-medium leading-6 text-[var(--text-dark)] break-words">{String(v)}</span>
                  </div>
                ))}
                <div className="grid grid-cols-[150px_1fr] gap-3 px-4 py-3 items-center">
                  <span className="text-[12px] font-bold uppercase tracking-wide text-[var(--text-light)]">Status</span>
                  <span><StatusBadge s={selected.status} /></span>
                </div>
              </div>
              {selected.status === "declined" && selected.reviewNotes && (
                <div className="rounded-[12px] bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4">
                  <p className="text-[12px] font-bold uppercase tracking-widest text-red-700 dark:text-red-300">Decline notes</p>
                  <p className="mt-2 text-[14px] leading-6 text-red-800 dark:text-red-200 whitespace-pre-wrap break-words">{selected.reviewNotes}</p>
                </div>
              )}
              <div className="rounded-[12px] bg-[var(--off-white)] dark:bg-white/5 border border-[var(--border)] p-4">
                <p className="text-[14px] font-bold uppercase tracking-wide text-[var(--text-light)]">Decision</p>
                <p className="mt-1 text-[14px] leading-6 text-[var(--text-mid)]">Publishing moves this submission to the live repository and makes it discoverable by collection, tag, and search. Declining requires notes visible to the contributor.</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => act(selected.id, "published")} className="flex-1 rounded-[4px] bg-[#4a8c3f] py-3 text-[15px] font-bold text-white hover:bg-[#2d5a27] hover:shadow transition-all">Publish to repository</button>
                  <button onClick={() => { setDeclineTarget(selected); setDeclineNotes(selected.reviewNotes || ""); }} className="rounded-[4px] border border-red-200 bg-white px-4 py-3 text-[15px] font-bold text-red-600 hover:bg-red-50 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 transition-colors">Decline</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DECLINE WITH NOTES MODAL */}
      {declineTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setDeclineTarget(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-[560px] rounded-[16px] bg-white dark:bg-[#1a221a] border border-[var(--border)] shadow-2xl animate-[toast-in_0.3s_ease] overflow-hidden">
            <div className="px-6 py-5 border-b border-[var(--border)] flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[18px] font-bold text-[var(--text-dark)]">Decline submission</h3>
                <p className="mt-1 text-[13px] text-[var(--text-light)] truncate max-w-[380px]">{declineTarget.title}</p>
              </div>
              <button onClick={() => setDeclineTarget(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] hover:bg-[var(--off-white)] transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-light)]">Decline notes *</label>
                <textarea value={declineNotes} onChange={(e) => setDeclineNotes(e.target.value)} rows={4} placeholder="Explain why this is declined and what to improve — visible to the contributor in their dashboard." className="mt-2 w-full rounded-[8px] border border-[var(--border)] bg-white dark:bg-white/5 px-4 py-3 text-[14px] leading-6 outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30" />
                <p className="mt-1.5 text-[12px] text-[var(--text-light)]">{declineNotes.length}/2000 • at least 10 characters</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeclineTarget(null)} className="flex-1 rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-4 py-3 text-[14px] font-bold text-[var(--text-dark)] hover:bg-[var(--off-white)] transition-colors">Cancel</button>
                <button onClick={confirmDecline} disabled={declining || declineNotes.trim().length < 10} className="flex-1 rounded-[4px] bg-red-600 px-4 py-3 text-[14px] font-bold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{declining ? "Declining…" : "Decline with notes"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes wave{0%,100%{transform:rotate(0deg)}15%{transform:rotate(14deg)}30%{transform:rotate(-8deg)}45%{transform:rotate(14deg)}60%{transform:rotate(-4deg)}75%{transform:rotate(10deg)}}`}</style>
    </div>
  );
}

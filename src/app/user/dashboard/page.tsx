"use client";
import Link from "next/link";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Clock, FileText, CheckCircle, Settings, LayoutDashboard, LogOut, Plus } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import ThemeToggle from "@/components/ThemeToggle";

type Status = "pending" | "in_review" | "published" | "declined";
type Submission = {
  id: string;
  title: string;
  collection: string;
  date: string;
  dateTime: string;
  createdAtRaw: string;
  status: Status;
  excerpt: string;
  abstract: string;
  type: string;
  author: string;
  authorEmail: string;
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

const initial: Submission[] = [] as Submission[];

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

export default function UserDashboardPage() {
  const { toast } = useToast();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [userName, setUserName] = useState("there");
  const [userEmail, setUserEmail] = useState("you@rich.local");
  const [subs, setSubs] = useState<Submission[]>(initial);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [contributeOpen, setContributeOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  // contribute form state (full 4 steps like /submit)
  const [step, setStep] = useState(1);
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
  function parseCsv(s: string): string[] { return s.split(",").map((x) => x.trim()).filter(Boolean); }
  function openNew() {
    setEditingId(null);
    setStep(1);
    setTitle(""); setAbstract(""); setType(""); setCollection("research_outputs"); setGeography([]); setThemes([]); setCluster(""); setPathway(""); setAudience([]); setAuthor(""); setDate(""); setLicensing("CC BY 4.0 (Open)");
    setContributeOpen(true);
  }
  function openEdit(s: Submission) {
    setEditingId(s.id);
    setTitle(s.title);
    setAbstract(s.abstract || "");
    setType(s.type || "");
    // collection value = key
    const collMap: Record<string, string> = { "Research Outputs": "research_outputs", "Innovation Case Studies": "innovation_case_studies", "Ecosystem Insights": "ecosystem_insights", "Policy Resources": "policy_resources" };
    setCollection(collMap[s.collection] || "research_outputs");
    setGeography(parseCsv(s.geography || ""));
    setThemes(parseCsv(s.themes || ""));
    setCluster(s.cluster || "");
    setPathway(s.pathway || "");
    setAudience(parseCsv(s.audience || ""));
    setAuthor(s.author || "");
    setDate(s.publicationDate || "");
    setLicensing(s.licensing || "CC BY 4.0 (Open)");
    setStep(1);
    setContributeOpen(true);
    setSelected(null);
  }

  React.useLayoutEffect(() => {
    document.documentElement.classList.add("dashboard-hide");
    return () => document.documentElement.classList.remove("dashboard-hide");
  }, []);

  // hydrate from localStorage synchronously before paint to avoid flash of default name
  React.useLayoutEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("rich_profile") || "null");
      if (c?.name) { setUserName(String(c.name).split(" ")[0]); setDisplayName(String(c.name)); }
      if (c?.email) { setUserEmail(String(c.email)); setEmailField(String(c.email)); }
      if (c?.avatar) setAvatar(String(c.avatar));
    } catch {}
  }, []);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const u = j?.user;
        if (u) {
          if (u.name) { setUserName(String(u.name).split(" ")[0]); setDisplayName(String(u.name)); }
          if (u.email) { setUserEmail(String(u.email)); setEmailField(String(u.email)); }
          if (u.avatar) setAvatar(String(u.avatar));
          else setAvatar((prev) => (u.avatar === null ? null : prev));
          try { localStorage.setItem("rich_profile", JSON.stringify({ name: String(u.name || ""), email: String(u.email || ""), avatar: u.avatar ? String(u.avatar) : null })); } catch {}
        } else if (!profileLoaded) {
          setDisplayName((prev) => prev || "User");
          setEmailField((prev) => prev || "user@rich.africa");
        }
        setProfileLoaded(true);
      })
      .catch(() => {
        setDisplayName((prev) => prev || "User");
        setEmailField((prev) => prev || "user@rich.africa");
        setProfileLoaded(true);
      });
  }, []);

  useEffect(() => { if (displayName === "" && userName !== "there") setDisplayName(userName); }, [userName, displayName]);

  // hydrate user's own submissions from DB - persists across logouts/logins
  useEffect(() => {
    fetch("/api/resources?mine=1", { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!j?.resources?.length) return;
        const mapped: Submission[] = j.resources.map((r: any) => {
          const d = new Date(r.created_at);
          return {
            id: String(r.id),
            title: String(r.title),
            collection: r.collection === "research_outputs" ? "Research Outputs" : r.collection === "innovation_case_studies" ? "Innovation Case Studies" : r.collection === "ecosystem_insights" ? "Ecosystem Insights" : r.collection === "policy_resources" ? "Policy Resources" : String(r.collection),
            date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            dateTime: d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }),
            createdAtRaw: String(r.created_at),
            status: (r.status === "pending" ? "pending" : r.status === "in_review" ? "in_review" : r.status === "published" ? "published" : r.status === "declined" ? "declined" : "pending") as Status,
            excerpt: String(r.summary || "").slice(0, 140) + (String(r.summary || "").length > 140 ? "…" : ""),
            abstract: String(r.abstract || r.summary || ""),
            type: String(r.content_type || ""),
            author: String(r.author_name || ""),
            authorEmail: String(r.author_email || ""),
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
        setSubs(mapped);
      })
      .catch(() => {});
  }, []);

  const filtered = subs.filter((s) => {
    const statusMatch = filter === "all" ? true : s.status === filter;
    const q = query === "" || s.title.toLowerCase().includes(query.toLowerCase());
    return statusMatch && q;
  });

  const stats = {
    total: subs.length,
    pending: subs.filter((s) => s.status === "pending").length,
    review: subs.filter((s) => s.status === "in_review").length,
    published: subs.filter((s) => s.status === "published").length,
  };

  const onAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { toast("Image must be < 2MB", "error"); return; }
    if (!/^image\/(png|jpe?g|webp|gif)$/i.test(f.type)) { toast("Only PNG, JPEG, WEBP or GIF allowed", "error"); return; }
    const r = new FileReader();
    r.onload = () => { setAvatar(String(r.result)); toast("Profile image updated - save to keep", "info"); };
    r.readAsDataURL(f);
  };

  const saveProfile = async () => {
    if (!displayName.trim().slice(0,100)) { toast("Name is required", "error"); return; }
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
      if (u.avatar) setAvatar(String(u.avatar));
      else if (avatar === null) setAvatar(null);
      try { localStorage.setItem("rich_profile", JSON.stringify({ name: String(u.name), email: String(u.email), avatar: u.avatar ? String(u.avatar) : null })); } catch {}
      setSavingProfile(false);
      toast("Profile saved", "success");
      setProfileModalOpen(false);
    } catch {
      toast("Network error", "error");
      setSavingProfile(false);
    }
  };

  const resetPw = () => {
    if (!pwCurrent || !pwNew || !pwConfirm) { toast("Fill all password fields", "error"); return; }
    if (pwNew.length < 8) { toast("New password must be at least 8 characters", "error"); return; }
    if (pwNew !== pwConfirm) { toast("Passwords do not match", "error"); return; }
    setSavingPw(true);
    setTimeout(() => { setSavingPw(false); setPwCurrent(""); setPwNew(""); setPwConfirm(""); toast("Password updated", "success"); }, 600);
  };

  function handleNext() {
    if (step === 1 && !canNext1) {
      if (!title.trim() || title.trim().length < 8) toast("Add a title (at least 8 characters).", "info");
      else if (!abstract.trim() || abstract.trim().length < 30) toast("Add an abstract (at least 30 characters).", "info");
      else if (overWords) toast(`Abstract is ${words} words - keep it under 200.`, "info");
      else if (!type) toast("Select a resource type to continue.", "info");
      return;
    }
    if (step === 2 && !canNext2) { toast("Pick at least one geography, one theme, a cluster and a pathway.", "info"); return; }
    if (step === 3 && !canNext3) { toast("Add author, publication date, and at least one audience.", "info"); return; }
    setStep((s) => Math.min(4, s + 1));
  }

  async function handleContributeSubmit() {
    if (!canNext1 || !canNext2 || !canNext3) {
      toast("Please complete all required fields before submitting.", "info");
      if (!canNext1) setStep(1);
      else if (!canNext2) setStep(2);
      else if (!canNext3) setStep(3);
      return;
    }
    setSubmitting(true);
    const payload: any = { title, abstract, type, collection, geography, themes, cluster, pathway, audience, author, date, licensing };
    // Edit existing declined submission -> PATCH as owner, resubmit as pending
    if (editingId) {
      try {
        const res = await fetch("/api/resources", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId, ...payload }) });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          toast(j.error || "Update failed - please retry", "error");
          setSubmitting(false);
          return;
        }
        // update local list: keep original created_at, reset to pending, clear reviewNotes
        setSubs((prev) => prev.map((p) => p.id === editingId ? { ...p, title: title.trim(), collection: COLLECTIONS.find((c)=>c.v===collection)?.l || collection, status: "pending" as Status, excerpt: abstract.trim().slice(0, 140) + (abstract.length > 140 ? "…" : ""), abstract: abstract.trim(), type, geography: geography.join(", "), themes: themes.join(", "), cluster, pathway, audience: audience.join(", "), licensing, publicationDate: date, reviewNotes: "", isNew: true } : p));
        setContributeOpen(false);
        setEditingId(null);
        setStep(1);
        setTitle(""); setAbstract(""); setType(""); setGeography([]); setThemes([]); setCluster(""); setPathway(""); setAudience([]); setAuthor(""); setDate(""); setLicensing("CC BY 4.0 (Open)");
        setSubmitting(false);
        toast("Submission updated - pending review again", "success");
        return;
      } catch {
        toast("Network error", "error");
        setSubmitting(false);
        return;
      }
    }
    let serverResource: any = null;
    try {
      const res = await fetch("/api/resources", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok && res.status !== 404) {
        const j = await res.json().catch(() => ({}));
        toast(j.error || "Submission failed - please retry", "error");
        setSubmitting(false);
        return;
      }
      if (res.ok) {
        const j = await res.json().catch(() => null);
        if (j?.resource) serverResource = j.resource;
      }
    } catch {}
    const srcDate = serverResource?.created_at ? new Date(serverResource.created_at) : new Date();
    const now = srcDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const nowTime = srcDate.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
    const n: Submission = {
      id: String(serverResource?.id || Date.now()),
      title: title.trim(),
      collection: COLLECTIONS.find((c)=>c.v===collection)?.l || collection,
      date: now,
      dateTime: nowTime,
      createdAtRaw: String(serverResource?.created_at || srcDate.toISOString()),
      status: "pending",
      excerpt: abstract.trim().slice(0, 140) + (abstract.length > 140 ? "…" : ""),
      abstract: abstract.trim(),
      type: type,
      author: author.trim(),
      authorEmail: userEmail,
      geography: geography.join(", "),
      themes: themes.join(", "),
      cluster,
      pathway,
      audience: audience.join(", "),
      licensing,
      publicationDate: date,
      reviewNotes: "",
      isNew: true,
    };
    setSubs((prev) => [n, ...prev]);
    setFilter("all");
    setContributeOpen(false);
    setEditingId(null);
    setStep(1);
    setTitle(""); setAbstract(""); setType(""); setGeography([]); setThemes([]); setCluster(""); setPathway(""); setAudience([]); setAuthor(""); setDate(""); setLicensing("CC BY 4.0 (Open)");
    setSubmitting(false);
    toast("Resource submitted - pending review", "success");
  }

  const signOut = async () => {
    try { localStorage.removeItem("rich_profile"); } catch {}
    try { await fetch("/api/logout", { method: "POST" }); } catch {}
    try { await fetch("/api/auth/signout", { method: "POST" }); } catch {}
    try { const { signOut: nextAuthSignOut } = await import("next-auth/react"); await nextAuthSignOut({ redirect: false }); } catch {}
    setTimeout(() => { window.location.href = "/login"; }, 300);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f8f8f5] dark:bg-[#070d07]">
      <aside className="hidden lg:flex w-[300px] shrink-0 flex-col border-r border-[var(--border)] bg-white dark:bg-[#0f1410] sticky top-0 h-screen">
        <div className="flex h-[64px] items-center gap-2 px-6 border-b border-[var(--border)] shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#4a8c3f] text-white font-black text-[16px]" style={{ fontFamily: "Roboto, sans-serif" }}>R</span>
          <span className="text-[16px] font-bold tracking-[0.08em] text-[#1a221a] dark:text-white">RICH</span>
          <span className="ml-auto text-[11px] font-bold tracking-widest text-[var(--text-light)] uppercase">My Dashboard</span>
        </div>
        <nav className="flex-1 overflow-auto p-4 space-y-6">
          <div className="space-y-2">
            {[
              { label: "My Submissions", count: stats.total, filter: "all" as const, icon: LayoutDashboard },
              { label: "Published", count: stats.published, filter: "published" as const, icon: CheckCircle },
              { label: "In Review", count: stats.pending + stats.review, filter: "pending" as const, icon: Clock },
            ].map((item) => {
              const Icon = item.icon as unknown as React.ComponentType<{ className?: string }>;
              const active = filter === item.filter || (item.filter === "pending" && (filter === "pending" || filter === "in_review"));
              return (
                <button key={item.label} onClick={() => setFilter(item.filter as Status | "all")} className={`flex w-full items-center gap-3 rounded-[4px] px-3 py-3 text-left text-[16px] transition-colors ${active ? "bg-[var(--off-white)] dark:bg-white/5 font-semibold text-[var(--text-dark)]" : "text-[var(--text-mid)] hover:bg-[var(--off-white)] dark:hover:bg-white/5"}`}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[14px] font-bold ${active ? "bg-[#4a8c3f] text-white" : "bg-[var(--off-white)] dark:bg-white/10 text-[var(--text-light)]"}`}>{item.count}</span>
                </button>
              );
            })}
          </div>

        </nav>
        <div className="p-4 border-t border-[var(--border)] shrink-0">
          <button onClick={() => setProfileModalOpen(true)} className="flex w-full items-center gap-3 rounded-[4px] px-2 py-2.5 hover:bg-[var(--off-white)] dark:hover:bg-white/5 transition-colors text-left cursor-pointer">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#1a3a1a] to-[#4a8c3f] text-white font-bold text-[18px]">{avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : (userName[0]?.toUpperCase() || "U")}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold leading-none text-[var(--text-dark)]" style={{ fontFamily: "Roboto, sans-serif" }}>{userName !== "there" ? userName : (displayName.split(" ")[0] || "User")}</p>
              <p className="text-[13px] text-[var(--text-light)] truncate" style={{ fontFamily: "Roboto, sans-serif" }}>{userEmail}</p>
            </div>
            <Settings className="h-4 w-4 text-[var(--text-light)] shrink-0" />
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex h-[64px] items-center justify-between gap-4 px-6 lg:px-8 border-b border-[var(--border)] bg-white dark:bg-[#1a221a] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-[18px] font-bold text-[var(--text-dark)]">My Dashboard</h1>
            <span className="hidden sm:inline-flex items-center rounded-full bg-[#e8f3e5] dark:bg-[#14311a] px-2.5 py-1 text-[12px] font-bold text-[#2d5a27] dark:text-[#6db862]">{stats.total} submissions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5"><ThemeToggle /></div>
            <button onClick={signOut} className="group inline-flex cursor-pointer items-center gap-2 rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-4 py-2.5 text-[14px] font-bold text-[var(--text-dark)] hover:border-[#4a8c3f] hover:text-[#4a8c3f] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"><LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" /> Sign out</button>
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-8 space-y-6 bg-[#f8f8f5] dark:bg-[#070d07] overflow-auto">
          <div className="rounded-[16px] border border-[var(--border)] bg-gradient-to-br from-[#1a3a1a] via-[#2d5a27] to-[#4a8c3f] p-7 lg:p-8 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <p className="text-[13px] font-bold tracking-[0.14em] uppercase text-white/60">Contributor Hub</p>
                <h2 className="mt-2 flex items-center gap-2 text-[26px] lg:text-[28px] font-bold leading-tight">Welcome, {profileLoaded || userName !== "there" ? userName : <span className="inline-block h-7 w-24 animate-pulse bg-white/20 rounded align-middle" />} <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-[70%_70%]">👋</span></h2>
                <p className="mt-2 max-w-2xl text-[15px] font-light leading-6 text-white/80">Submit resources, track review status, and see your published work live in the repository.</p>
              </div>
              <div className="flex shrink-0 gap-3">
                <button onClick={openNew} className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-white px-6 py-3 text-[15px] font-bold text-[#1a3a1a] hover:bg-white/90 transition-all cursor-pointer"><Plus className="h-4 w-4" /> Contribute Resource</button>
                <Link href="/collections" className="hidden sm:inline-flex items-center justify-center rounded-[4px] border border-white/20 px-6 py-3 text-[15px] font-bold text-white hover:bg-white/10 transition-colors">Browse</Link>
              </div>
            </div>
          </div>

          <motion.div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
            {[
              { label: "Submissions", value: stats.total, hint: "All time", sub: "Total intake", icon: FileText, color: "bg-[#1a3a1a]", pct: 100 },
              { label: "Pending", value: stats.pending, hint: "Needs review", sub: "Awaiting review", icon: Clock, color: "bg-orange-500", pct: stats.total ? (stats.pending / stats.total) * 100 : 0 },
              { label: "In review", value: stats.review, hint: "With editors", sub: "Editorial queue", icon: Clock, color: "bg-sky-500", pct: stats.total ? (stats.review / stats.total) * 100 : 0 },
              { label: "Published", value: stats.published, hint: "Live in repo", sub: "Discoverable now", icon: CheckCircle, color: "bg-emerald-500", pct: stats.total ? (stats.published / stats.total) * 100 : 0 },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.label} variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} whileHover={{ scale: 1.02, y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 15 } as unknown as Record<string, unknown>} className="h-full overflow-hidden rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-4">
                  <div className="p-0.5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[15px] font-semibold tracking-tight text-[var(--text-mid)]" style={{ fontFamily: "Roboto, sans-serif" }}>{c.label}</p>
                      <Icon className="h-4 w-4 text-[var(--text-light)]" />
                    </div>
                    <div className="mb-3 flex items-baseline gap-2">
                      <span className="text-[30px] font-bold leading-none tracking-tight text-[var(--text-dark)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}><AnimatedNumber value={c.value} /></span>
                      <span className="text-[14px] font-medium text-[var(--text-light)]">{c.hint}</span>
                    </div>
                    <div className="w-full h-1.5 overflow-hidden rounded-full bg-black/5 dark:bg-white/10 flex">
                      <motion.div className={`h-full ${c.color}`} initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 1, delay: 0.6, ease: "easeOut" }} />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[13px]">
                      <span className="flex items-center gap-1.5 font-medium text-[var(--text-light)]"><span className={`h-1.5 w-1.5 rounded-full ${c.color}`} /> {c.sub}</span>
                      <span className="font-bold text-[var(--text-mid)]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{Math.round(c.pct)}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "in_review", "published"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-[4px] px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide transition-all ${filter === f ? "bg-[#1a3a1a] text-white shadow" : "bg-[var(--off-white)] dark:bg-white/5 text-[var(--text-mid)] hover:bg-[var(--border)]"}`}>{f.replace("_", " ")}</button>
              ))}
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your submissions…" className="w-full sm:w-72 rounded-[4px] border border-[var(--border)] bg-[var(--off-white)] dark:bg-white/5 px-5 py-3 text-[16px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
          </div>

          <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#1a221a] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
              <h3 className="text-[17px] font-bold text-[var(--text-dark)]">My Submissions</h3>
              <span className="text-[14px] font-medium text-[var(--text-light)]">{filtered.length} items</span>
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
                    <p className="mt-1.5 text-[14px] font-medium text-[var(--text-light)]">{s.collection} • {s.type ? `${s.type} • ` : ""}{s.dateTime || s.date}</p>
                    <p className="mt-2 text-[16px] font-light leading-6 text-[var(--text-mid)] line-clamp-1">{s.excerpt}</p>
                  </div>
                  <div className="flex shrink-0 gap-2 sm:ml-auto">
                    <button onClick={(e) => { e.stopPropagation(); setSelected(s); }} className="rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-4 py-2.5 text-[14px] font-bold text-[var(--text-dark)] hover:border-[#4a8c3f] transition-colors">View</button>
                    {s.status === "declined" && (
                      <button onClick={(e) => { e.stopPropagation(); openEdit(s); }} className="rounded-[4px] bg-[#1a3a1a] px-4 py-2.5 text-[14px] font-bold text-white hover:bg-black transition-colors">Edit & resubmit</button>
                    )}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-md rounded-[12px] border-2 border-dashed border-[var(--border)] bg-[var(--off-white)]/50 p-8">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f3e5] dark:bg-[#14311a] text-[#4a8c3f]"><Plus className="h-6 w-6" /></div>
                    <h4 className="mt-4 text-[18px] font-bold text-[var(--text-dark)]">No submissions yet</h4>
                    <p className="mt-1 text-[15px] text-[var(--text-mid)]">Start by adding your first article. It will appear here with its review status.</p>
                    <button onClick={openNew} className="mt-5 inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#4a8c3f] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#2d5a27] transition-colors cursor-pointer"><Plus className="h-4 w-4" /> Contribute Resource</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setProfileModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-[560px] max-h-[90vh] overflow-auto rounded-[16px] bg-white dark:bg-[#1a221a] border border-[var(--border)] shadow-2xl animate-[toast-in_0.3s_ease]">
            <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-[var(--border)] bg-white dark:bg-[#1a221a] px-6 py-5">
              <div><h3 className="text-[18px] font-bold text-[var(--text-dark)]">Profile settings</h3><p className="text-[13px] text-[var(--text-light)]">Manage your profile</p></div>
              <button onClick={() => setProfileModalOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] hover:bg-[var(--off-white)] transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white dark:border-[#1a221a] shadow-md bg-white flex items-center justify-center">{avatar ? <img src={avatar} alt="avatar" className="h-full w-full object-cover" /> : <span className="text-[28px] font-black text-[#4a8c3f]">{userName[0]?.toUpperCase() || "U"}</span>}</div>
                  <button onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 rounded-full bg-[#1a3a1a] p-2 text-white shadow hover:bg-[#2d5a27] transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-3l-2.5-4z"/><circle cx="12" cy="14" r="4"/></svg></button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatar} />
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => fileRef.current?.click()} className="rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-3 py-1.5 text-[14px] font-semibold hover:border-[#4a8c3f] hover:text-[#4a8c3f] transition-colors">Change</button>
                  {avatar && <button onClick={() => { setAvatar(null); toast("Image removed","info"); }} className="rounded-[4px] px-3 py-1.5 text-[14px] font-medium text-[var(--text-light)] hover:text-red-600">Remove</button>}
                </div>
              </div>
              <div className="grid gap-3">
                <div><label className="text-[13px] font-bold uppercase tracking-wide text-[var(--text-light)]">Full name</label><input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="mt-1.5 w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" /></div>
                <div><label className="text-[13px] font-bold uppercase tracking-wide text-[var(--text-light)]">Email address</label><input value={emailField} onChange={(e) => setEmailField(e.target.value)} placeholder="you@rich.africa" className="mt-1.5 w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" /></div>
              </div>
              <button onClick={saveProfile} disabled={savingProfile} className="cursor-pointer w-full rounded-[4px] bg-[#1a3a1a] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#2d5a27] disabled:opacity-60 transition-colors flex items-center justify-center gap-2">{savingProfile ? (<><svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" /></svg> Saving…</>) : "Save profile"}</button>
              <div className="border-t border-[var(--border)] pt-5">
                <h4 className="text-[15px] font-bold text-[var(--text-dark)]">Reset password</h4>
                <div className="mt-3 grid gap-3">
                  <input type="password" value={pwCurrent} onChange={(e) => setPwCurrent(e.target.value)} placeholder="Current" className="w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                  <input type="password" value={pwNew} onChange={(e) => setPwNew(e.target.value)} placeholder="New (8+ chars)" className="w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                  <input type="password" value={pwConfirm} onChange={(e) => setPwConfirm(e.target.value)} placeholder="Confirm" className="w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-[#1a221a] px-4 py-3 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/10 transition-all" />
                </div>
                <button onClick={resetPw} disabled={savingPw} className="cursor-pointer mt-3 w-full rounded-[4px] border border-[var(--border)] bg-white dark:bg-white/5 px-6 py-3 text-[15px] font-bold text-[var(--text-dark)] hover:border-[#4a8c3f] hover:text-[#4a8c3f] disabled:opacity-60 transition-colors flex items-center justify-center gap-2">{savingPw ? (<><svg className="h-5 w-5 animate-spin text-[var(--text-dark)]" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" /></svg> Updating…</>) : "Update password"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div onClick={() => setSelected(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[toast-in_0.2s_ease]" />
          <div className="relative w-full max-w-[720px] max-h-[90vh] overflow-auto rounded-[16px] bg-[#f7f6f4] dark:bg-[#0f1410] border border-[#e8ece8] dark:border-white/10 shadow-2xl animate-[toast-in_0.32s_ease]">
            <div className="sticky top-0 bg-gradient-to-br from-[#1a3a1a] via-[#2d5a27] to-[#4a8c3f] p-6 flex items-start justify-between gap-4 rounded-t-[16px]">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-white/15 text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest border border-white/20">{selected.collection}</span>
                  {selected.isNew && <NewBadge />}
                  <StatusBadge s={selected.status} />
                </div>
                <h3 className="mt-3 text-[20px] font-bold leading-tight text-white">{selected.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-white/70"><Clock className="h-3.5 w-3.5" /> Submitted {selected.dateTime || selected.date}{selected.createdAtRaw ? ` • ${new Date(selected.createdAtRaw).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}` : ""}</p>
              </div>
              <button onClick={() => setSelected(null)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/20 transition-colors">✕</button>
            </div>
            <div className="bg-white dark:bg-[#1a221a] p-6 space-y-6">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-light)]">Abstract</p>
                <p className="mt-2 text-[15px] leading-7 text-[var(--text-mid)] whitespace-pre-wrap break-words">{selected.abstract || selected.excerpt}</p>
              </div>
              <div className="grid gap-0 rounded-[12px] border border-[var(--border)] divide-y divide-[var(--border)] overflow-hidden bg-[var(--off-white)]/60 dark:bg-white/5">
                {[
                  ["Resource type", selected.type || "-"],
                  ["Collection", selected.collection],
                  ["Geography", selected.geography || "-"],
                  ["Themes", selected.themes || "-"],
                  ["Cluster", selected.cluster || "-"],
                  ["Scaling pathway", selected.pathway || "-"],
                  ["Audience", selected.audience || "-"],
                  ["Author / organisation", `${selected.author || "-"}${selected.authorEmail ? ` • ${selected.authorEmail}` : ""}`],
                  ["Publication date", selected.publicationDate || "-"],
                  ["Licensing", selected.licensing || "-"],
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
                  <p className="text-[12px] font-bold uppercase tracking-widest text-red-700 dark:text-red-300">Decline notes from editorial team</p>
                  <p className="mt-2 text-[14px] leading-6 text-red-800 dark:text-red-200 whitespace-pre-wrap break-words">{selected.reviewNotes}</p>
                </div>
              )}
              <div className="rounded-[12px] bg-[var(--off-white)] dark:bg-white/5 border border-[var(--border)] p-4">
                <p className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-light)]">Status</p>
                <p className="mt-1 text-[14px] leading-6 text-[var(--text-mid)]">{selected.status === "pending" ? "Your submission is awaiting review. Editorial team will review within 4 weeks." : selected.status === "in_review" ? "With editors - you'll be notified when a decision is made." : selected.status === "published" ? "Published - discoverable in collections and search." : selected.reviewNotes ? "Declined - see notes above. Fix and resubmit." : "Declined - contact editorial team for feedback."}</p>
              </div>
              {selected.status === "declined" && (
                <button onClick={() => openEdit(selected)} className="w-full rounded-[4px] bg-[#1a3a1a] px-6 py-3 text-[14px] font-bold text-white hover:bg-black transition-colors">Edit to fix & resubmit →</button>
              )}
            </div>
          </div>
        </div>
      )}
      {contributeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => { setContributeOpen(false); setEditingId(null); }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative w-full max-w-[880px] max-h-[90vh] overflow-auto rounded-[16px] bg-[#f7f6f4] dark:bg-[#070d07] border border-[#e8ece8] dark:border-white/10 shadow-2xl animate-[toast-in_0.3s_ease] flex flex-col">
            {/* header like /submit */}
            <div className="shrink-0 bg-[#1a3a1a] border-b border-white/5 px-6 lg:px-8 py-8">
              <p className="text-[14px] font-bold tracking-[0.20em] uppercase text-[#6db862]">{editingId ? "Editing · Fix & resubmit" : "Contribution · Phase 1 intake"}</p>
              <h3 className="mt-2 text-[28px] font-medium leading-none text-white" style={{ fontFamily: "Playfair Display, serif" }}>{editingId ? "Edit Submission" : "Contribute Resource"}</h3>
              <p className="mt-2 max-w-[660px] text-[14px] font-light leading-6 text-white/80">{editingId ? "Fix based on decline notes below, then resubmit. It will return to Pending for review." : "Same form as Submit - reviewed within 4 weeks. Your submission will appear in My Submissions as Pending."}</p>
              {editingId && (() => { const ed = subs.find((x) => x.id === editingId); return ed?.reviewNotes ? <div className="mt-4 rounded-[8px] bg-red-500/20 border border-red-400/30 p-3"><p className="text-[12px] font-bold uppercase tracking-widest text-red-200">Decline notes to address</p><p className="mt-1 text-[13px] leading-6 text-white/90 whitespace-pre-wrap">{ed.reviewNotes}</p></div> : null; })()}
            </div>
            {/* stepper */}
            <div className="shrink-0 bg-white dark:bg-[#1a221a] border-b border-[#e8ece8] dark:border-white/10 px-6 lg:px-8 pt-6 pb-4">
              <div className="flex items-start justify-center gap-0">
                {STEPS.map((s, i) => {
                  const active = s.n === step;
                  const done = s.n < step;
                  return (
                    <div key={s.n} className="flex items-start">
                      <div className="flex flex-col items-center text-center min-w-[84px] sm:min-w-[100px]">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border-2 text-[15px] font-bold transition-all ${done ? "border-[#4a8c3f] bg-[#4a8c3f] text-white" : active ? "border-[#4a8c3f] bg-white text-[#4a8c3f] dark:bg-[#1a221a] shadow-[0_0_0_4px_rgba(74,140,63,0.15)]" : "border-[#d6d9d6] bg-white text-[#9aa09a] dark:border-white/10 dark:bg-white/5 dark:text-white/40"}`}>{done ? "✓" : s.n}</div>
                        <p className={`mt-2 text-[13px] font-bold tracking-[0.07em] uppercase ${active ? "text-[#1a221a] dark:text-white" : done ? "text-[#4a8c3f]" : "text-[#9aa09a]"}`}>{s.label}</p>
                        <p className={`text-[12px] leading-tight ${active ? "text-[#6b726b]" : "text-[#9aa09a]"} dark:text-white/40`}>{s.desc}</p>
                      </div>
                      {i < 3 && <div className={`mx-1 sm:mx-2 mt-[17px] h-px w-6 sm:w-10 lg:w-16 shrink-0 transition-colors ${s.n < step ? "bg-[#4a8c3f]" : "bg-[#d6d9d6] dark:bg-white/10"}`} />}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* step content */}
            <div className="flex-1 overflow-auto bg-white dark:bg-[#1a221a] px-6 lg:px-8 py-6">
              {step === 1 && (
                <div className="space-y-5 animate-[toast-in_0.35s_ease]">
                  <div><h4 className="text-[20px] font-bold text-[#1a221a] dark:text-white">Resource basics</h4><p className="mt-1 text-[14px] text-[#6b726b] dark:text-white/50">This is what reviewers and search see first.</p></div>
                  <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Early warning for smallholder farmers in Turkana" className="mt-2 w-full rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3.5 text-[15px] outline-none focus:border-[#4a8c3f] focus:ring-4 focus:ring-[#4a8c3f]/15" /><p className="mt-1.5 text-[13px] text-[#9aa09a]">{title.length}/120</p></div>
                  <div>
                    <div className="flex items-center justify-between"><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Abstract - 200 words max *</label><span className={`text-[12px] font-bold px-2 py-1 rounded-[4px] ${overWords ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300" : words > 160 ? "bg-amber-50 text-amber-700" : "bg-[#e8f3e5] text-[#2d5a27]"}`}>{words} / 200</span></div>
                    <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} rows={4} placeholder="Plain-language summary: problem, approach, key finding, who it helps." className={`mt-2 w-full rounded-[4px] border px-4 py-3.5 text-[15px] leading-7 outline-none focus:ring-4 ${overWords ? "border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30" : "border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-white/5 focus:border-[#4a8c3f] focus:ring-[#4a8c3f]/15"}`} />
                    {overWords && <p className="mt-1.5 text-[13px] font-medium text-red-600">Cut {words - 200} words.</p>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Resource type *</label><div className="relative mt-2"><select value={type} onChange={(e) => setType(e.target.value)} className="w-full appearance-none rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-[#1a221a] pl-4 pr-10 py-3.5 text-[15px] font-medium outline-none focus:border-[#4a8c3f]"><option value="" disabled>Select type</option>{TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select><span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9aa09a]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg></span></div></div>
                    <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a] dark:text-white/60">Collection</label><div className="relative mt-2"><select value={collection} onChange={(e) => setCollection(e.target.value)} className="w-full appearance-none rounded-[4px] border border-[#d6d9d6] dark:border-white/10 bg-white dark:bg-[#1a221a] pl-4 pr-10 py-3.5 text-[15px] font-medium outline-none focus:border-[#4a8c3f]">{COLLECTIONS.map((c) => <option key={c.v} value={c.v}>{c.l}</option>)}</select><span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9aa09a]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg></span></div></div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-5 animate-[toast-in_0.35s_ease]">
                  <div><h4 className="text-[20px] font-bold text-[#1a221a] dark:text-white">Tag taxonomy</h4><p className="mt-1 text-[14px] text-[#6b726b] dark:text-white/50">How your resource is discovered.</p></div>
                  <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Geography *</label><div className="mt-2 flex flex-wrap gap-2">{GEOGRAPHIES.map((g) => <button key={g} type="button" onClick={() => toggle(setGeography, geography, g)} className={`rounded-[4px] border px-3 py-2 text-[14px] font-medium ${geography.includes(g) ? "border-[#4a8c3f] bg-[#4a8c3f] text-white" : "border-[#d6d9d6] bg-white text-[#3a443a]"}`}>{g}</button>)}</div></div>
                  <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Themes *</label><div className="mt-2 flex flex-wrap gap-2">{THEMES.map((t) => <button key={t} type="button" onClick={() => toggle(setThemes, themes, t)} className={`rounded-[4px] border px-3 py-2 text-[14px] font-medium ${themes.includes(t) ? "border-[#4a8c3f] bg-[#e8f3e5] text-[#2d5a27]" : "border-[#d6d9d6] bg-white text-[#3a443a]"}`}>{t}</button>)}</div></div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Cluster *</label><div className="mt-2 grid gap-2">{CLUSTERS.map((c) => <button key={c} type="button" onClick={() => setCluster(c)} className={`text-left rounded-[4px] border px-4 py-3 text-[14px] font-medium ${cluster === c ? "border-[#4a8c3f] bg-[#e8f3e5] text-[#2d5a27]" : "border-[#d6d9d6] bg-white text-[#3a443a]"}`}>{c}</button>)}</div></div>
                    <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Scaling pathway *</label><div className="mt-2 grid gap-2">{PATHWAYS.map((p) => <button key={p} type="button" onClick={() => setPathway(p)} className={`text-left rounded-[4px] border px-4 py-3 text-[14px] font-medium ${pathway === p ? "border-[#4a8c3f] bg-[#4a8c3f] text-white" : "border-[#d6d9d6] bg-white text-[#3a443a]"}`}>{p}</button>)}</div></div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-5 animate-[toast-in_0.35s_ease]">
                  <div><h4 className="text-[20px] font-bold text-[#1a221a] dark:text-white">Authorship & publishing</h4></div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Author / organisation *</label><input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. LDRI / Dr A. Mwangi" className="mt-2 w-full rounded-[4px] border border-[#d6d9d6] px-4 py-3.5 text-[15px] outline-none focus:border-[#4a8c3f]" /></div>
                    <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Publication date *</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-[4px] border border-[#d6d9d6] px-4 py-3.5 text-[15px] outline-none focus:border-[#4a8c3f]" /></div>
                  </div>
                  <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Audience *</label><div className="mt-2 flex flex-wrap gap-2">{AUDIENCES.map((a) => <button key={a} type="button" onClick={() => toggle(setAudience, audience, a)} className={`rounded-[4px] border px-3 py-2 text-[14px] font-medium ${audience.includes(a) ? "border-[#4a8c3f] bg-[#4a8c3f] text-white" : "border-[#d6d9d6] bg-white text-[#3a443a]"}`}>{a}</button>)}</div></div>
                  <div><label className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#5a5e5a]">Licensing</label><div className="mt-2 grid gap-2 sm:grid-cols-2">{LICENSES.map((l) => <button key={l} type="button" onClick={() => setLicensing(l)} className={`text-left rounded-[4px] border px-4 py-3 text-[14px] font-medium ${licensing === l ? "border-[#4a8c3f] bg-[#e8f3e5] text-[#2d5a27]" : "border-[#d6d9d6] bg-white text-[#3a443a]"}`}>{l}</button>)}</div></div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-5 animate-[toast-in_0.35s_ease]">
                  <div><h4 className="text-[20px] font-bold text-[#1a221a] dark:text-white">Review & submit</h4><p className="mt-1 text-[14px] text-[#6b726b]">Check everything, then submit. Decision within 4 weeks.</p></div>
                  <div className="rounded-[4px] border border-[#d6d9d6] divide-y divide-[#e8ece8] overflow-hidden">
                    {[
                      ["Title", title || "-"],
                      ["Abstract", abstract ? `${abstract.slice(0, 120)}${abstract.length > 120 ? "…" : ""} (${words} words)` : "-"],
                      ["Type / Collection", `${type || "-"} · ${COLLECTIONS.find((c)=>c.v===collection)?.l}`],
                      ["Geography", geography.join(", ") || "-"],
                      ["Themes", themes.join(", ") || "-"],
                      ["Cluster / Pathway", `${cluster || "-"} · ${pathway || "-"}`],
                      ["Audience", audience.join(", ") || "-"],
                      ["Author · Date · License", `${author || "-"} · ${date || "-"} · ${licensing}`],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[130px_1fr] gap-3 px-4 py-3 text-[14px]">
                        <span className="font-semibold text-[#5a5e5a]">{k}</span>
                        <span className="text-[#1a221a] break-words">{v}</span>
                      </div>
                    ))}
                  </div>
                  <label className="flex items-start gap-3 rounded-xl border border-[#d6d9d6] bg-[#f7f6f4] px-4 py-3 cursor-pointer"><input type="checkbox" defaultChecked className="mt-1 accent-[#4a8c3f]" /><span className="text-[14px] leading-6 text-[#3a443a]">I confirm this is <span className="font-semibold">RICH-produced, partner-contributed, or curated external</span> and I have rights to share it.</span></label>
                </div>
              )}
            </div>
            <div className="shrink-0 flex items-center justify-between gap-3 border-t border-[#e8ece8] bg-[#f7f6f4] px-6 py-4">
              <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="inline-flex items-center gap-2 rounded-[4px] border border-[#d6d9d6] bg-white px-5 py-2.5 text-[12px] font-bold tracking-[0.06em] uppercase disabled:opacity-40 hover:border-[#4a8c3f]">← Back</button>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-[12px] text-[#9aa09a]">Step {step} of 4</span>
                {step < 4 ? <button type="button" onClick={handleNext} className="inline-flex items-center gap-2 rounded-[4px] bg-[#4a8c3f] px-6 py-3 text-[12px] font-bold tracking-[0.07em] uppercase text-white hover:bg-[#2d5a27]">Continue →</button> : <button type="button" onClick={handleContributeSubmit} disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#1a3a1a] px-6 py-3 text-[12px] font-bold tracking-[0.07em] uppercase text-white hover:bg-black disabled:opacity-40">{submitting ? (<><svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" /></svg> {editingId ? "Saving…" : "Submitting…"}</>) : editingId ? "Save & resubmit →" : "Submit for review →"}</button>}
              </div>
            </div>
            <button onClick={() => { setContributeOpen(false); setEditingId(null); }} className="absolute top-3 right-3 hidden">x</button>
          </div>
        </div>
      )}
      <style>{`@keyframes wave{0%,100%{transform:rotate(0deg)}15%{transform:rotate(14deg)}30%{transform:rotate(-8deg)}45%{transform:rotate(14deg)}60%{transform:rotate(-4deg)}75%{transform:rotate(10deg)}}`}</style>
    </div>
  );
}

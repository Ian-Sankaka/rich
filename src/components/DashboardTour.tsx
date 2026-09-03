"use client";
import { useEffect, useState, useCallback, useRef, useLayoutEffect } from "react";
import { X, ArrowRight, ArrowLeft, Sparkles, LayoutDashboard, BarChart3, Filter, ListChecks, Plus, UserCog, CheckCircle, Clock } from "lucide-react";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], display: "swap", weight: ["400","500","600","700","800"] });

const LS_COMPLETED = "rich_dash_tour_v1_completed";
const SS_DISMISSED = "rich_dash_tour_v1_dismissed";

type Step = {
  id: string;
  target: string | null;
  title: string;
  desc: string;
  Icon?: React.ComponentType<{ className?: string }>;
  accent?: string;
  pad?: number; // extra outer offset; 0 = hug element, 2 = breathing room
  radius?: string; // explicit border-radius for highlight; if omitted, auto from element's computed style
};

const STEPS: Step[] = [
  {
    id: "welcome",
    target: null,
    title: "Welcome to your dashboard 👋",
    desc: "This is your contributor hub — track submissions, see review status, and manage your profile. 45 seconds to get oriented.",
    Icon: Sparkles,
    accent: "#4a8c3f",
  },
  {
    id: "hero",
    target: "#dash-hero",
    title: "Your hub",
    desc: "Welcome card shows your name and quick actions. Contribute Resource opens the 4-step intake — Browse jumps to published collections.",
    Icon: LayoutDashboard,
    accent: "#1a3a1a",
    pad: 1,
    radius: "16px",
  },
  {
    id: "stats",
    target: "#dash-stats",
    title: "At a glance",
    desc: "Four counters: Submissions (all time), Pending, In review, Published. Bars fill by share — gives you instant progress across the pipeline.",
    Icon: BarChart3,
    accent: "#4a8c3f",
    pad: 1,
    radius: "12px",
  },
  {
    id: "filters",
    target: "#dash-filters",
    title: "Find fast",
    desc: "Filter chips (All / Pending / In review / Published) plus search by title. Combine them to surface exactly what needs attention.",
    Icon: Filter,
    accent: "#2d6a8f",
    pad: 1,
    radius: "16px",
  },
  {
    id: "list",
    target: "#dash-list",
    title: "Your submissions",
    desc: "Each card shows title, collection, type, date, and status badge. View opens details — declined items show Edit & resubmit. Empty state invites your first contribution.",
    Icon: ListChecks,
    accent: "#4a8c3f",
    pad: 1,
    radius: "16px",
  },
  {
    id: "contribute",
    target: "#dash-contribute-btn",
    title: "Create your first resource",
    desc: "Tap Contribute Resource for the guided 4-step form: Basics → Taxonomy → Authorship → Review. Submit → Pending → Editorial review within 4 weeks.",
    Icon: Plus,
    accent: "#2d5a27",
    pad: 1,
    radius: "4px",
  },
  {
    id: "nav-my",
    target: "#dash-nav-my",
    title: "My Submissions",
    desc: "All your submissions in one place — live count. Active state matches hover: soft off-white, rounded 4, same as item hover.",
    Icon: LayoutDashboard,
    accent: "#4a8c3f",
    pad: 1,
    radius: "4px",
  },
  {
    id: "nav-published",
    target: "#dash-nav-published",
    title: "Published",
    desc: "Only live resources — discoverable in collections and search. Rounded 4 pill count turns green when active.",
    Icon: CheckCircle,
    accent: "#4a8c3f",
    pad: 1,
    radius: "4px",
  },
  {
    id: "nav-review",
    target: "#dash-nav-review",
    title: "In Review",
    desc: "Pending + In Review combined — your editorial queue. Same hover shape: rounded 4, px-3 py-3, hugging the row.",
    Icon: Clock,
    accent: "#4a8c3f",
    pad: 1,
    radius: "4px",
  },
  {
    id: "profile",
    target: "#dash-profile",
    title: "Your profile",
    desc: "Avatar, name, email — tap to open Profile settings. Change photo (≤2MB), name, email, or reset password. Same rounded 4 card shape.",
    Icon: UserCog,
    accent: "#4a8c3f",
    pad: 1,
    radius: "4px",
  },
  {
    id: "done",
    target: null,
    title: "You're all set 🎉",
    desc: "That's the tour. Start with Contribute Resource or Browse collections. Replay anytime via the help pill.",
    Icon: CheckCircle,
    accent: "#4a8c3f",
  },
];

function isMobile() { try { return window.innerWidth < 768; } catch { return false; } }

function isVisible(el: HTMLElement) {
  const s = window.getComputedStyle(el);
  if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
}

function getHighlightRadii(el: HTMLElement, pad: number, explicit?: string): string {
  const cs = getComputedStyle(el);
  const corners = [
    cs.borderTopLeftRadius,
    cs.borderTopRightRadius,
    cs.borderBottomRightRadius,
    cs.borderBottomLeftRadius,
  ];
  const computedVals = corners.map((c) => {
    const mm = c.match(/(\d+(\.\d+)?)/);
    const b = mm ? parseFloat(mm[1]) : 0;
    return b + pad;
  });
  // if element already has meaningful radius, preserve per-corner shape + pad (so 4-corner capture works in both themes)
  const hasComputedRadius = computedVals.some((v) => v > pad + 0.5);
  if (hasComputedRadius) {
    const vals = computedVals.map((v) => `${v}px`);
    if (vals.every((v) => v === vals[0])) return vals[0];
    return vals.join(" ");
  }
  // fallback to explicit (for grid containers that are technically 0-radius but should appear rounded) or pad-based square
  if (explicit) {
    const m = explicit.match(/(\d+(\.\d+)?)/);
    const base = m ? parseFloat(m[1]) : 0;
    return `${base + pad}px`;
  }
  // square element with no explicit -> minimal rounding = pad itself keeps corners from looking boxish
  return `${Math.max(4, pad + 3)}px`;
}

function getZoom(): number {
  try {
    const z = (getComputedStyle(document.documentElement).zoom as string) || "";
    const v = parseFloat(z);
    if (Number.isFinite(v) && v > 0) return v;
    // fallback: check transform scale on html as alternative 90% implementation
    const tr = getComputedStyle(document.documentElement).transform;
    if (tr && tr !== "none") {
      const m = tr.match(/matrix\(([^)]+)\)/);
      if (m) {
        const vals = m[1].split(",").map((n) => parseFloat(n));
        if (Number.isFinite(vals[0]) && vals[0] > 0) return vals[0];
      }
    }
  } catch {}
  return 1;
}

function parseRadii(s: string): [number, number, number, number] {
  if (!s) return [0, 0, 0, 0];
  const parts = s.trim().split(/\s+/).map((p) => parseFloat(p) || 0);
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0, parts[3] || 0];
}

function buildSpotlightClipPath(rect: { top: number; left: number; width: number; height: number; radius: string }, vw: number, vh: number): string {
  const [tl, tr, br, bl] = parseRadii(rect.radius);
  const x = rect.left, y = rect.top, w = rect.width, h = rect.height;
  const right = x + w, bottom = y + h;
  const clamp = (v: number) => Math.min(v, w / 2, h / 2);
  const ctl = clamp(tl), ctr = clamp(tr), cbr = clamp(br), cbl = clamp(bl);
  // even-odd: outer fullscreen rect minus inner rounded rect hole (all in logical px)
  const p = `M0 0 H${vw} V${vh} H0 Z M${x + ctl} ${y} H${right - ctr} A${ctr} ${ctr} 0 0 1 ${right} ${y + ctr} V${bottom - cbr} A${cbr} ${cbr} 0 0 1 ${right - cbr} ${bottom} H${x + cbl} A${cbl} ${cbl} 0 0 1 ${x} ${bottom - cbl} V${y + ctl} A${ctl} ${ctl} 0 0 1 ${x + ctl} ${y} Z`;
  return `path(evenodd, "${p}")`;
}

export default function DashboardTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<{ top: number; left: number; width: number; height: number; radius: string } | null>(null);
  const [clip, setClip] = useState<string | null>(null);
  const [tipPos, setTipPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const [showTrigger, setShowTrigger] = useState(false);
  const tipRef = useRef<HTMLDivElement>(null);
  const data = STEPS[step];
  const centered = !data.target;

  useEffect(() => {
    const done = localStorage.getItem(LS_COMPLETED) === "1";
    const dismissed = sessionStorage.getItem(SS_DISMISSED) === "1";
    if (!done && !dismissed) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    } else setShowTrigger(true);
  }, []);

  // allow header button to open tour
  useEffect(() => {
    const openFromHeader = () => { setStep(0); setOpen(true); setShowTrigger(false); };
    window.addEventListener("rich-open-tour" as any, openFromHeader);
    return () => window.removeEventListener("rich-open-tour" as any, openFromHeader);
  }, []);

  const close = useCallback((mode: "completed" | "dismissed" | "none" = "dismissed") => {
    setOpen(false); setRect(null); setClip(null);
    if (mode === "completed") localStorage.setItem(LS_COMPLETED, "1");
    if (mode === "dismissed") sessionStorage.setItem(SS_DISMISSED, "1");
    setTimeout(() => setShowTrigger(true), 400);
  }, []);

  const next = useCallback(() => {
    if (step >= STEPS.length - 1) close("completed");
    else setStep((s) => s + 1);
  }, [step, close]);

  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("dismissed");
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, next, prev, close]);

  useEffect(() => {
    if (!open) return;
    if (centered) {
      const p = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = p; };
    }
  }, [open, centered]);

  const measure = useCallback(() => {
    if (!open || centered) { setRect(null); setClip(null); setTipPos(null); return; }
    const sel = data.target!;
    let el = document.querySelector(sel) as HTMLElement | null;
    // mobile fallback: try drawer variant for sidebar items
    if (isMobile() && el && !isVisible(el)) {
      const alt = sel === "#dash-nav-my" ? "#dash-nav-my-m" : sel === "#dash-nav-published" ? "#dash-nav-published-m" : sel === "#dash-nav-review" ? "#dash-nav-review-m" : null;
      if (alt) {
        const altEl = document.querySelector(alt) as HTMLElement | null;
        if (altEl && isVisible(altEl)) el = altEl;
        else { setRect(null); setClip(null); return; }
      } else if (sel.startsWith("#dash-nav-") || sel === "#dash-profile") {
        setRect(null); setClip(null);
        return;
      } else {
        el = null;
      }
    } else if (el && !isVisible(el)) {
      el = null;
    }
    if (!el) { setRect(null); setClip(null); return; }
    const pad = data.pad !== undefined ? data.pad : (isMobile() ? 4 : 6);
    const zoom = getZoom();
    const padLogical = pad / zoom;
    // 4-corner radii so highlight wraps exactly to element shape in both light and dark + zoom-compensated hug
    const highlightRadius = getHighlightRadii(el, padLogical, data.radius);
    const vw = window.innerWidth / zoom, vh = window.innerHeight / zoom;
    const commit = (rr: DOMRect) => {
      // rr is visual (scaled); convert to logical so highlight inside zoomed html lands perfectly
      const top = rr.top / zoom, left = rr.left / zoom, width = rr.width / zoom, height = rr.height / zoom;
      const nr = { top: top - padLogical, left: left - padLogical, width: width + padLogical * 2, height: height + padLogical * 2, radius: highlightRadius };
      setRect(nr);
      try { setClip(buildSpotlightClipPath(nr, vw, vh)); } catch { setClip(null); }
    };
    const r = el.getBoundingClientRect();
    const mob = isMobile();
    // on mobile, ensure large elements leave room for bottom-sheet tip
    const needsRoomBelow = mob && (sel === "#dash-stats" || sel === "#dash-filters" || sel === "#dash-hero" || sel === "#dash-list");
    if (r.top < 78 || r.bottom > window.innerHeight - (needsRoomBelow ? 280 : 80)) {
      // for stats on mobile, scroll to start so tip can sit below
      const block = mob && needsRoomBelow ? "start" as const : "center" as const;
      el.scrollIntoView({ behavior: "auto", block, inline: "nearest" });
      // add offset for sticky header on mobile start
      if (mob && block === "start") window.scrollBy({ top: -72, left: 0, behavior: "auto" });
      requestAnimationFrame(() => {
        const rr = el!.getBoundingClientRect();
        commit(rr);
      });
    } else {
      commit(r);
    }
  }, [open, centered, data]);

  useLayoutEffect(() => { measure(); }, [measure, step]);

  useEffect(() => {
    if (!open || centered) return;
    let raf = 0;
    const onWin = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, { passive: true });
    return () => { window.removeEventListener("resize", onWin); window.removeEventListener("scroll", onWin); cancelAnimationFrame(raf); };
  }, [open, centered, measure]);

  // auto-skip hidden nav/profile items on mobile — instant, no flicker
  useEffect(() => {
    if (!open || centered) return;
    const sel = data.target || "";
    const isHiddenNav = sel.startsWith("#dash-nav-") || sel === "#dash-profile";
    if (isHiddenNav && isMobile() && rect === null) {
      const t = setTimeout(() => {
        const idx = STEPS.findIndex(s => s.id === data.id);
        if (step === idx) next();
      }, 120);
      return () => clearTimeout(t);
    }
    // also skip contribute if somehow not found on mobile (fallback)
    if (sel === "#dash-contribute-btn" && isMobile() && rect === null) {
      const t = setTimeout(() => {
        const idx = STEPS.findIndex(s => s.id === data.id);
        if (step === idx) next();
      }, 120);
      return () => clearTimeout(t);
    }
  }, [open, centered, data, rect, step, next]);

  useLayoutEffect(() => {
    if (!open || centered || !rect) { setTipPos(null); return; }
    const place = () => {
      const zoom = getZoom();
      const vw = window.innerWidth / zoom, vh = window.innerHeight / zoom;
      const gap = 16 / zoom, edge = 8 / zoom;
      const mob = window.innerWidth < 768;
      const wVisual = 380, w = wVisual / zoom;
      const wEff = mob ? Math.min(vw - edge * 2, w) : w;
      const h = tipRef.current?.offsetHeight || 260;
      if (mob) {
        // bottom-sheet on mobile — always visible, never overlaps highlight heavily
        const top = Math.max(edge, vh - h - edge - 12);
        const left = edge;
        setTipPos({ top, left, width: vw - edge * 2 });
        return;
      }
      let top = rect.top + rect.height + gap;
      let left = rect.left + rect.width / 2 - wEff / 2;
      left = Math.max(edge, Math.min(left, vw - wEff - edge));
      if (top + h + gap > vh) {
        const above = rect.top - h - gap;
        if (above > edge) top = above; else top = Math.max(edge, (vh - h) / 2);
      }
      top = Math.max(edge, top);
      setTipPos({ top, left, width: wEff });
    };
    const t = setTimeout(place, 80);
    const ro = new ResizeObserver(place);
    if (tipRef.current) ro.observe(tipRef.current);
    window.addEventListener("resize", place);
    return () => { clearTimeout(t); ro.disconnect(); window.removeEventListener("resize", place); };
  }, [open, centered, rect, step]);

  if (!open && !showTrigger) return null;
  const total = STEPS.length;
  // pct kept for potential future use
  const pct = ((step + 1) / total) * 100;

  return (
    <>
      {/* header handles Take Tour; keep minimal fallback pill only if header button not present - hidden by default */}
      {showTrigger && !open && (
        <button
          onClick={() => { setStep(0); setOpen(true); setShowTrigger(false); }}
          className="hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#1a3a1a] px-4 py-3 text-[13px] font-bold tracking-wide text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] hover:bg-[#14331a] hover:-translate-y-0.5 active:translate-y-0 transition-all border border-white/10"
          aria-hidden
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15"><Sparkles className="h-4 w-4" /></span>
          <span className="hidden sm:inline">Take Tour</span><span className="sm:hidden">Tour</span>
        </button>
      )}
      {open && (
        <>
          {centered ? (
            <div className="fixed inset-0 z-50 bg-[#0a150a]/65 backdrop-blur-[3px] animate-[tourFade_0.28s_ease]" onClick={() => close("dismissed")} />
          ) : rect ? (
            <>
              {/* single rounded-hole spotlight — clipPath makes hole wrap exactly to element shape in both themes, no square corners; no clip-path transition to avoid path-interpolation tears */}
              <div
                className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2.5px]"
                style={clip ? { clipPath: clip, WebkitClipPath: clip, willChange: "clip-path", transform: "translateZ(0)", backfaceVisibility: "hidden" } as React.CSSProperties : { willChange: "clip-path", transform: "translateZ(0)", backfaceVisibility: "hidden" } as React.CSSProperties}
                onClick={() => close("dismissed")}
              />
              {/* fallback for browsers without path() clip or while clip computes — 4-div square hole (covered by clip when available) */}
              {!clip && (
                <>
                  <div className="fixed z-50 bg-black/55 backdrop-blur-[2.5px]" style={{ top: 0, left: 0, right: 0, height: rect.top }} onClick={() => close("dismissed")} />
                  <div className="fixed z-50 bg-black/55 backdrop-blur-[2.5px]" style={{ top: rect.top + rect.height, left: 0, right: 0, bottom: 0 }} onClick={() => close("dismissed")} />
                  <div className="fixed z-50 bg-black/55 backdrop-blur-[2.5px]" style={{ top: rect.top, left: 0, width: rect.left, height: rect.height }} onClick={() => close("dismissed")} />
                  <div className="fixed z-50 bg-black/55 backdrop-blur-[2.5px]" style={{ top: rect.top, left: rect.left + rect.width, right: 0, height: rect.height }} onClick={() => close("dismissed")} />
                </>
              )}
              <div
                className="fixed z-[51] pointer-events-none"
                style={{
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                  background: "transparent",
                  borderRadius: rect.radius,
                  border: "2px solid rgba(255,255,255,0.98)",
                  boxShadow: "0 0 0 2px rgba(74,140,63,0.96), 0 0 0 6px rgba(74,140,63,0.13), 0 8px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.60)",
                  transition: "top 320ms cubic-bezier(0.16,1,0.3,1), left 320ms cubic-bezier(0.16,1,0.3,1), width 320ms cubic-bezier(0.16,1,0.3,1), height 320ms cubic-bezier(0.16,1,0.3,1), border-radius 320ms cubic-bezier(0.16,1,0.3,1), box-shadow 320ms cubic-bezier(0.16,1,0.3,1)",
                  willChange: "top, left, width, height, border-radius",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden" as const,
                }}
              />
            </>
          ) : (
            <>
              <div className="fixed inset-0 z-50 bg-[#0a150a]/60 backdrop-blur-[3px]" onClick={() => close("dismissed")} />
              {/* fallback when highlight target not found (e.g., hidden on mobile) — show centered card so user can still Next, auto-skips quickly via effect */}
              <div className="fixed inset-0 z-[52] flex items-center justify-center p-4 pointer-events-none">
                <div className="pointer-events-auto w-full max-w-[520px] rounded-[18px] bg-white dark:bg-[#1a221a] border border-black/10 dark:border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.28)] animate-[tourPop_0.36s_cubic-bezier(0.16,1,0.3,1)] flex flex-col">
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border shadow-sm" style={{ background: `${data.accent}14`, borderColor: `${data.accent}20`, color: data.accent }}>{data.Icon ? <data.Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}</div>
                      <button onClick={() => close("dismissed")} className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5"><X className="h-4 w-4" /></button>
                    </div>
                    <p className="mt-3 text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: data.accent }}>Step {step+1} of {total} • {data.title}</p>
                    <p className="mt-2 text-[14px] font-light leading-6 text-[var(--text-mid)]">{data.desc}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex-1 h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden"><div className="h-full bg-[#4a8c3f] rounded-full" style={{ width: `${pct}%` }} /></div>
                      <span className="text-[11px] font-bold text-[var(--text-light)] tabular-nums">{step+1}/{total}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-2">
                      <button onClick={() => close("dismissed")} className="text-[13px] font-semibold text-[var(--text-light)]">Skip</button>
                      <div className="flex gap-2">
                        <button onClick={prev} disabled={step<=1} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 disabled:opacity-30 disabled:pointer-events-none"><ArrowLeft className="h-4 w-4" /></button>
                        <button onClick={next} className="inline-flex items-center gap-1.5 rounded-full bg-[#1a3a1a] px-5 py-2.5 text-[13px] font-bold text-white">Next <ArrowRight className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {centered ? (
            <div className="fixed inset-0 z-[52] flex items-center justify-center p-4">
              <div className="w-full max-w-[520px] max-h-[90vh] overflow-auto rounded-[18px] bg-white dark:bg-[#1a221a] border border-black/10 dark:border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.28)] animate-[tourPop_0.36s_cubic-bezier(0.16,1,0.3,1)] flex flex-col">
                <div className="p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border shadow-sm" style={{ background: `${data.accent}14`, borderColor: `${data.accent}20`, color: data.accent }}>{data.Icon ? <data.Icon className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}</div>
                    <button onClick={() => close("dismissed")} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"><X className="h-4 w-4" /></button>
                  </div>
                  <p className="mt-4 text-[12px] font-bold tracking-[0.14em] uppercase" style={{ color: data.accent }}>{step===0 ? "Quick tour" : step===total-1 ? "Ready?" : `Step ${step} of ${total-2}`} • {step+1}/{total}</p>
                  <h3 className={`mt-2 text-[22px] font-bold leading-tight text-[#1a3a1a] dark:text-white ${manrope.className}`} style={{ letterSpacing: "-0.01em" }}>{data.title}</h3>
                  <p className="mt-3 text-[15px] font-light leading-7 text-[var(--text-mid)]">{data.desc}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#4a8c3f] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide text-[var(--text-light)] tabular-nums">{step+1} / {total}</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button onClick={() => close("dismissed")} className="text-[14px] font-semibold text-[var(--text-light)] hover:text-[#4a8c3f]">Skip</button>
                    <div className="flex gap-2">
                      {step>0 && <button onClick={prev} className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-5 py-2.5 text-[14px] font-bold hover:bg-black/5"><ArrowLeft className="h-4 w-4" /> Back</button>}
                      <button onClick={next} className="inline-flex items-center gap-1.5 rounded-full bg-[#1a3a1a] px-6 py-2.5 text-[14px] font-bold text-white hover:bg-black shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:translate-y-0 transition-all">{step===total-1 ? "Done" : step===0 ? "Start tour" : "Next"} <ArrowRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : rect && tipPos ? (
            <div ref={tipRef} className="fixed z-[52] rounded-[16px] bg-white dark:bg-[#1a221a] border border-black/10 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.30)] overflow-hidden flex flex-col" style={{ top: tipPos.top, left: tipPos.left, width: tipPos.width, transition: "top 320ms cubic-bezier(0.16,1,0.3,1), left 320ms cubic-bezier(0.16,1,0.3,1)", willChange: "top, left", transform: "translateZ(0)", backfaceVisibility: "hidden" } as React.CSSProperties} role="dialog">
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border shadow-sm" style={{ background: `${data.accent}12`, borderColor: `${data.accent}18`, color: data.accent }}>{data.Icon ? <data.Icon className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}</div>
                  <button onClick={() => close("dismissed")} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-light)]"><X className="h-4 w-4" /></button>
                </div>
                <p className="mt-3 text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: data.accent }}>Step {step} of {total-1} • {step+1}/{total}</p>
                <h3 className={`mt-1 text-[18px] font-bold leading-tight text-[#1a3a1a] dark:text-white ${manrope.className}`} style={{ letterSpacing: "-0.01em" }}>{data.title}</h3>
                <p className="mt-2 text-[14px] font-light leading-6 text-[var(--text-mid)]">{data.desc}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#4a8c3f] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-[var(--text-light)] tabular-nums">{step+1} / {total}</span>
                </div>
                <div className="mt-5 flex items-center justify-between gap-2">
                  <button onClick={() => close("dismissed")} className="text-[13px] font-semibold text-[var(--text-light)] hover:text-[var(--text-dark)]">Skip tour</button>
                  <div className="flex items-center gap-2">
                    <button onClick={prev} disabled={step<=1} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/12 bg-white dark:bg-white/[0.04] disabled:opacity-30 disabled:pointer-events-none hover:bg-black/5"><ArrowLeft className="h-4 w-4" /></button>
                    <button onClick={next} className="inline-flex items-center gap-1.5 rounded-full bg-[#1a3a1a] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-black shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all">{step===total-1 ? "Done" : "Next"} <ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: `@keyframes tourFade{from{opacity:0}to{opacity:1}}@keyframes tourPop{from{opacity:0;transform:translateY(10px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}` }} />
    </>
  );
}

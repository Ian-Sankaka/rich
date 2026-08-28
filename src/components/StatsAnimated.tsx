"use client";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import * as React from "react";

const items: [string, string][] = [
  ["4", "Knowledge Collections"],
  ["20+", "Resources at Launch"],
  ["7", "Benchmark Comparators"],
  ["2026", "Phase 1 Live"],
];

function AnimatedStat({ raw }: { raw: string }) {
  const isPlus = raw.endsWith("+");
  const numeric = parseInt(raw.replace(/\D/g, ""), 10);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  React.useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(count, numeric, { duration: 1.6, ease: "easeOut", delay: 0.15 });
    return () => controls.stop();
  }, [inView, numeric, count]);

  return (
    <span ref={ref} className="block text-[36px] font-bold leading-none text-white" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 400 }}>
      <motion.span>{display}</motion.span>
      {isPlus ? "+" : ""}
    </span>
  );
}

export default function StatsAnimated() {
  return (
    <section className="bg-[#1a3a1a] py-7">
      <div className="mx-auto grid max-w-[1140px] grid-cols-2 lg:grid-cols-4 px-6 lg:px-10">
        {items.map(([num, label], i) => (
          <div
            key={label}
            className={`text-center py-2 px-5 ${i !== 3 ? "lg:border-r border-white/10" : ""} ${i % 2 === 0 ? "border-r border-white/10 lg:border-r" : "border-r-0"} ${
              i < 2 ? "border-b lg:border-b-0 border-white/10 pb-6 lg:pb-2" : ""
            }`}
          >
            <AnimatedStat raw={num} />
            <span className="mt-1.5 block text-[13px] tracking-[0.1em] uppercase text-white/60">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

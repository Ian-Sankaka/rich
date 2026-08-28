"use client";
import { useState } from "react";

type Partner = {
  name: string;
  short?: string;
  src?: string;
};

/* Real logos fetched from public CDNs — all normalized into uniform 168×64 white cards */
const partners: Partner[] = [
  { name: "LDRI", src: "https://www.developlocal.org/wp-content/uploads/2015/01/LDRI-logo-web-02.png" },
  { name: "AfriClimate AI", short: "AfriClimate AI" },
  { name: "AI4D Africa", short: "AI4D Africa" },
  { name: "IDRC", src: "https://upload.wikimedia.org/wikipedia/commons/0/0a/International_Development_Research_Centre_logo.svg" },
  { name: "FCDO", src: "https://cdn.worldvectorlogo.com/logos/foreign-commonwealth-office.svg" },
];

function Card({ p }: { p: Partner }) {
  const [failed, setFailed] = useState(false);
  const showImg = !!p.src && !failed;

  return (
    <div className="flex h-[68px] w-[176px] shrink-0 items-center justify-center rounded-[4px] border border-[var(--border)] bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-md hover:border-[#4a8c3f]/20 hover:-translate-y-0.5">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.src!}
          alt={p.name}
          className="max-h-[32px] max-w-[150px] w-auto object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex items-center gap-2 text-center">
          <span className="h-2 w-2 rounded-full bg-[#4a8c3f] shrink-0" />
          <span className="text-[14px] font-black tracking-[0.08em] uppercase text-[#1a3a1a] leading-none">
            {p.short ?? p.name}
          </span>
        </span>
      )}
    </div>
  );
}

export default function PartnerCarousel() {
  const loop = [...partners, ...partners, ...partners];
  return (
    <div className="relative overflow-hidden py-1">
      {/* faded edges matching section bg */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--off-white)] dark:from-[#111a11] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--off-white)] dark:from-[#111a11] to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-4 will-change-transform hover:[animation-play-state:paused]">
        {loop.map((p, i) => (
          <Card key={`${p.name}-${i}`} p={p} />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

type Partner = {
  name: string;
  short?: string;
  src?: string;
};

/* Real logos fetched from public CDNs - all normalized into uniform 168×64 white cards */
const partners: Partner[] = [
  { name: "LDRI", src: "https://www.developlocal.org/wp-content/uploads/2023/07/LDRI-new-logo-2021-RETINA.png" },
  { name: "AfriClimate AI", src: "https://africlimate.ai/lovable-uploads/52cbd433-d762-4492-94e6-45e816d18bc9.png" },
  { name: "AI4D", src: "https://www.ai4d.ai/logo.svg" },
  { name: "IDRC", src: "https://upload.wikimedia.org/wikipedia/commons/0/0a/International_Development_Research_Centre_logo.svg" },
  { name: "FCDO", src: "https://graph.facebook.com/ForeignCommonwealthAndDevelopmentOffice/picture?type=large" },
];

function Card({ p }: { p: Partner }) {
  const [failed, setFailed] = useState(false);
  const showImg = !!p.src && !failed;

  return (
    <div className="flex h-[123px] w-[318px] shrink-0 items-center justify-center px-3 bg-transparent transition-opacity duration-300 hover:opacity-80">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.src!}
          alt={p.name}
          className="max-h-[57px] max-w-[270px] w-auto object-contain"
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

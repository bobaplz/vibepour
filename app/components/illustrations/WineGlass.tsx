"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

const BOWL_PATH =
  "M36,18 C30,55 22,80 24,112 C26,150 55,172 80,172 C105,172 134,150 136,112 C138,80 130,55 124,18 Z";

export default function WineGlass({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const liquidRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!rootRef.current || !liquidRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 172 } });
      const trigger = gsap.to(liquidRef.current, {
        attr: { y: 58 },
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 0.6,
        },
      });
      return () => {
        trigger.scrollTrigger?.kill();
        trigger.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!liquidRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 78 } });
    });
    return () => mm.revert();
  }, []);

  return (
    <svg ref={rootRef} viewBox="0 0 160 280" className={className} aria-hidden="true">
      <defs>
        <clipPath id="wine-bowl-clip">
          <path d={BOWL_PATH} />
        </clipPath>
        <linearGradient id="wine-liquid" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--espresso)" />
          <stop offset="45%" stopColor="var(--garnet)" />
          <stop offset="100%" stopColor="var(--rose)" />
        </linearGradient>
      </defs>
      <rect
        ref={liquidRef}
        x="10"
        y="172"
        width="140"
        height="230"
        fill="url(#wine-liquid)"
        clipPath="url(#wine-bowl-clip)"
      />
      <path d={BOWL_PATH} fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.55" />
      <line x1="80" y1="172" x2="80" y2="228" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.55" />
      <ellipse cx="80" cy="233" rx="28" ry="6" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.55" />
    </svg>
  );
}

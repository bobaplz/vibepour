"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

const GLASS_PATH = "M30,30 L26,170 Q26,182 38,182 L122,182 Q134,182 130,170 L130,30 Z";

export default function WhiskeyGlass({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const liquidRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!rootRef.current || !liquidRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 182 } });
      const tween = gsap.to(liquidRef.current, {
        attr: { y: 88 },
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 0.6,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!liquidRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 120 } });
    });
    return () => mm.revert();
  }, []);

  return (
    <svg ref={rootRef} viewBox="0 0 160 200" className={className} aria-hidden="true">
      <defs>
        <clipPath id="whiskey-glass-clip">
          <path d={GLASS_PATH} />
        </clipPath>
        <linearGradient id="whiskey-liquid" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--espresso)" />
          <stop offset="60%" stopColor="var(--amber)" />
          <stop offset="100%" stopColor="var(--straw)" />
        </linearGradient>
      </defs>
      <rect
        ref={liquidRef}
        x="20"
        y="182"
        width="120"
        height="150"
        fill="url(#whiskey-liquid)"
        clipPath="url(#whiskey-glass-clip)"
      />
      <g clipPath="url(#whiskey-glass-clip)" opacity="0.7">
        <rect x="62" y="120" width="34" height="34" rx="4" transform="rotate(18 79 137)" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
      </g>
      <path d={GLASS_PATH} fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.55" />
    </svg>
  );
}

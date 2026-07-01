"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

const CUP_PATH = "M40,60 L44,150 Q46,168 64,168 L106,168 Q124,168 126,150 L130,60 Z";

export default function CoffeeCup({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const liquidRef = useRef<SVGRectElement>(null);
  const steamRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!rootRef.current || !liquidRef.current || !steamRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 168 } });
      gsap.set(steamRef.current, { opacity: 0 });
      const tween = gsap.to(liquidRef.current, {
        attr: { y: 70 },
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 0.6,
        },
      });
      const steamTween = gsap.to(steamRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "top 55%",
          scrub: 0.6,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        steamTween.scrollTrigger?.kill();
        steamTween.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!liquidRef.current || !steamRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 100 } });
      gsap.set(steamRef.current, { opacity: 1 });
    });
    return () => mm.revert();
  }, []);

  return (
    <svg ref={rootRef} viewBox="0 0 170 200" className={className} aria-hidden="true">
      <defs>
        <clipPath id="cup-clip">
          <path d={CUP_PATH} />
        </clipPath>
        <linearGradient id="coffee-liquid" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--espresso)" />
          <stop offset="100%" stopColor="#5a3d28" />
        </linearGradient>
      </defs>
      <g ref={steamRef} stroke="var(--foreground)" strokeOpacity="0.5" strokeWidth="2" fill="none" className="animate-flicker">
        <path d="M64,44 C74,34 54,26 64,14" />
        <path d="M92,44 C102,34 82,26 92,14" />
      </g>
      <rect
        ref={liquidRef}
        x="30"
        y="168"
        width="110"
        height="120"
        fill="url(#coffee-liquid)"
        clipPath="url(#cup-clip)"
      />
      <path d={CUP_PATH} fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.55" />
      <path d="M130,80 C158,80 158,128 130,128" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.55" />
      <ellipse cx="85" cy="180" rx="58" ry="9" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.4" />
    </svg>
  );
}

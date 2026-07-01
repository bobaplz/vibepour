"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

const LEAF_COUNT = 9;

export default function VineMotif({ className, mirror = false }: { className?: string; mirror?: boolean }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!rootRef.current) return;
      const leaves = rootRef.current.querySelectorAll("[data-leaf]");
      gsap.set(leaves, { opacity: 0, scale: 0.6, transformOrigin: "center" });
      const tween = gsap.to(leaves, {
        opacity: 0.8,
        scale: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 90%",
          end: "bottom 30%",
          scrub: 0.6,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!rootRef.current) return;
      gsap.set(rootRef.current.querySelectorAll("[data-leaf]"), { opacity: 0.8, scale: 1 });
    });
    return () => mm.revert();
  }, []);

  const leaves = Array.from({ length: LEAF_COUNT }).map((_, i) => {
    const y = 40 + i * 70;
    const side = i % 2 === 0 ? 1 : -1;
    return (
      <g key={i} data-leaf transform={`translate(${50 + side * 26}, ${y})`}>
        <ellipse
          rx="16"
          ry="9"
          transform={`rotate(${side * 35})`}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        {i % 3 === 0 && <circle cx={side * 10} cy="14" r="3" fill="var(--garnet)" fillOpacity="0.6" />}
      </g>
    );
  });

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 100 660"
      className={className}
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M50,10 C40,120 60,220 50,330 C40,440 60,540 50,650"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />
      {leaves}
    </svg>
  );
}

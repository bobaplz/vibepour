"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import RotatingBadge from "./RotatingBadge";

const BOWL_PATH =
  "M36,18 C30,55 22,80 24,112 C26,150 55,172 80,172 C105,172 134,150 136,112 C138,80 130,55 124,18 Z";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current || !titleRef.current || !liquidRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 172 } });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
        },
      });
      tl.to(titleRef.current, { scale: 0.6, y: -120, ease: "none" }, 0)
        .to(subRef.current, { opacity: 0, y: -16, ease: "none" }, 0)
        .to(eyebrowRef.current, { opacity: 0, ease: "none" }, 0)
        .to(glassRef.current, { y: -40, opacity: 0.9, ease: "none" }, 0)
        .to(liquidRef.current, { attr: { y: 58 }, ease: "none" }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!liquidRef.current) return;
      gsap.set(liquidRef.current, { attr: { y: 90 } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        ref={glassRef}
        className="pointer-events-none absolute -bottom-10 left-1/2 w-[220px] -translate-x-1/2 opacity-25 sm:w-[280px]"
      >
        <svg viewBox="0 0 160 280" aria-hidden="true">
          <defs>
            <clipPath id="hero-wine-clip">
              <path d={BOWL_PATH} />
            </clipPath>
            <linearGradient id="hero-wine-liquid" x1="0" y1="1" x2="0" y2="0">
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
            fill="url(#hero-wine-liquid)"
            clipPath="url(#hero-wine-clip)"
          />
          <path d={BOWL_PATH} fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.4" />
          <line x1="80" y1="172" x2="80" y2="228" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.4" />
          <ellipse cx="80" cy="233" rx="28" ry="6" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.4" />
        </svg>
      </div>

      <div ref={eyebrowRef} className="mb-8 text-xs font-medium tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
        Coming soon — the table is being set
      </div>

      <div ref={titleRef}>
        <h1
          className="mb-7 max-w-4xl text-6xl leading-[0.92] md:text-8xl"
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          Drink less.
          <br />
          <span
            className="animate-flicker"
            style={{
              fontStyle: "italic",
              fontWeight: 900,
              backgroundImage: "var(--pour-spectrum)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 28px rgba(201, 42, 77, 0.35))",
            }}
          >
            Sip better.
          </span>
        </h1>
      </div>

      <div ref={subRef} className="max-w-xl">
        <p className="mb-10 text-lg leading-relaxed md:text-xl" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
          Wine, whiskey, coffee — paired with good food and even better stories.
          A community for the intentional sipper.
        </p>
      </div>

      <div className="absolute bottom-10 right-6 sm:right-10">
        <RotatingBadge text="Join the table" href="#join" />
      </div>
    </section>
  );
}

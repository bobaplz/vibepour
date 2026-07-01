"use client";

import { useEffect, useRef, type ComponentType } from "react";
import { gsap } from "@/app/lib/gsap";

type Props = {
  id?: string;
  tag: string;
  title: string;
  description: string;
  Illustration: ComponentType<{ className?: string }>;
  reverse?: boolean;
};

export default function PillarSection({ id, tag, title, description, Illustration, reverse }: Props) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!textRef.current) return;
      gsap.set(textRef.current, { opacity: 0, y: 32 });
      const tween = gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!textRef.current) return;
      gsap.set(textRef.current, { opacity: 1, y: 0 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id={id}
      className={`mx-auto flex max-w-4xl flex-col items-center gap-10 border-t px-6 py-16 sm:py-20 ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="w-40 shrink-0 sm:w-56">
        <Illustration className="w-full" />
      </div>
      <div ref={textRef} className="text-center sm:text-left">
        <span
          className="mb-3 inline-block text-[10px] tracking-[0.25em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
        >
          [ {tag} ]
        </span>
        <h3 className="mb-3 text-3xl" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
          {title}
        </h3>
        <p className="max-w-sm text-base leading-relaxed" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
          {description}
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

export default function ScrollRevealText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!containerRef.current) return;
      const words = containerRef.current.querySelectorAll("[data-word]");
      gsap.set(words, { opacity: 0.16 });
      const tween = gsap.to(words, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (!containerRef.current) return;
      gsap.set(containerRef.current.querySelectorAll("[data-word]"), { opacity: 1 });
    });
    return () => mm.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} data-word className="inline-block mr-[0.28em]">
          {word}
        </span>
      ))}
    </p>
  );
}

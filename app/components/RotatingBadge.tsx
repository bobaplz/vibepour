"use client";

export default function RotatingBadge({ text, href }: { text: string; href: string }) {
  const pathId = `badge-circle-${text.replace(/\s+/g, "-").toLowerCase()}`;
  const repeated = `${text}  •  ${text}  •  `;

  return (
    <a
      href={href}
      aria-label={text}
      className="relative flex h-28 w-28 items-center justify-center rounded-full transition-transform hover:scale-105"
      style={{ border: "1px solid rgba(243, 234, 217, 0.3)", backgroundColor: "rgba(32, 24, 17, 0.6)" }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id={pathId} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="7" letterSpacing="1.5" fill="var(--amber)" style={{ fontFamily: "var(--font-mono)" }}>
          <textPath href={`#${pathId}`}>{repeated}</textPath>
        </text>
      </svg>
      <span className="text-lg" style={{ color: "var(--foreground)" }}>
        ↓
      </span>
    </a>
  );
}

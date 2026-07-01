export default function Marquee() {
  return (
    <div
      className="overflow-hidden py-4"
      style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center shrink-0" aria-hidden={i === 1}>
            {["Wine", "Whiskey", "Coffee"].map((word, j) => (
              <span key={word} className="flex items-center">
                <span
                  className="px-8 text-sm uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
                >
                  {word}
                </span>
                {j < 2 && (
                  <span style={{ color: "var(--amber)" }} className="text-sm">
                    ·
                  </span>
                )}
              </span>
            ))}
            <span className="px-8" style={{ color: "var(--garnet)" }}>
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

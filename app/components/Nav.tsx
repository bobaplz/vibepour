const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#pillars", label: "Pillars" },
  { href: "#join", label: "Join" },
];

export default function Nav() {
  return (
    <div className="fixed top-4 left-0 right-0 z-30 px-4 sm:px-8">
      <nav
        className="mx-auto flex max-w-3xl items-center justify-between rounded-full px-5 py-3 backdrop-blur-md"
        style={{ backgroundColor: "rgba(22, 17, 13, 0.65)", border: "1px solid var(--border)" }}
      >
        <a href="#top" className="text-xl tracking-tight" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
          VibePour
        </a>
        <ul className="hidden sm:flex items-center gap-6">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] transition-colors hover:opacity-80"
                style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span
          className="text-[10px] font-medium tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
          style={{ fontFamily: "var(--font-mono)", color: "var(--amber)", border: "1px solid rgba(217, 154, 68, 0.35)" }}
        >
          Est. 2026
        </span>
      </nav>
    </div>
  );
}

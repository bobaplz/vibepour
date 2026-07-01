const COLUMNS = [
  {
    tag: "About us",
    body: "VibePour is a home for people who want to drink with intention, not habit. We're building the table where a good pour, a good plate, and a good story sit together — starting with wine, and opening next to whiskey and coffee.",
  },
  {
    tag: "Concept",
    body: "Every pour has a reason: a dish it completes, a mood it matches, a person it's shared with. We connect that reasoning to real people — emerging sommeliers and baristas — so no one has to sip alone or guess what goes with dinner.",
  },
];

export default function AboutConcept() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-4xl gap-14 sm:grid-cols-2">
        {COLUMNS.map((col) => (
          <div key={col.tag}>
            <h2 className="mb-4 text-3xl" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
              {col.tag}
            </h2>
            <div className="mb-6 h-px w-12" style={{ backgroundImage: "var(--pour-spectrum)" }} />
            <p className="text-base leading-relaxed" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
              {col.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

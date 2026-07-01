import ScrollRevealText from "./ScrollRevealText";
import VineMotif from "./illustrations/VineMotif";

export default function Prologue() {
  return (
    <section id="story" className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 opacity-70 md:block">
        <VineMotif className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 opacity-70 md:block">
        <VineMotif className="h-full w-full" mirror />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <div
          className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}
        >
          <span>✦</span> Prologue <span>✦</span>
        </div>
        <ScrollRevealText
          text="Every generation redefines what it means to drink well. Ours isn't about more — it's about meaning: a glass chosen with intention, a story worth telling, a table worth staying at."
          className="text-2xl leading-snug italic md:text-4xl"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--foreground)" }}
        />
      </div>
    </section>
  );
}

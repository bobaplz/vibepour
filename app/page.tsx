import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Prologue from "./components/Prologue";
import AboutConcept from "./components/AboutConcept";
import PillarSection from "./components/PillarSection";
import ClosingCta from "./components/ClosingCta";
import Footer from "./components/Footer";
import WineGlass from "./components/illustrations/WineGlass";
import WhiskeyGlass from "./components/illustrations/WhiskeyGlass";
import CoffeeCup from "./components/illustrations/CoffeeCup";

const PILLARS = [
  {
    id: "pillars",
    tag: "Pair",
    title: "Pair",
    description: "Recipes with the perfect pour alongside. No expertise required — just a dish and a direction.",
    Illustration: WineGlass,
  },
  {
    tag: "Consult",
    title: "Consult",
    description: "Chat with emerging sommeliers and baristas for any occasion. Real people, real recommendations.",
    Illustration: WhiskeyGlass,
    reverse: true,
  },
  {
    tag: "Share",
    title: "Share",
    description: "Post your sip stories. Build your taste. Grow with a community that drinks on purpose.",
    Illustration: CoffeeCup,
  },
];

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <Nav />
      <Hero />
      <Marquee />
      <Prologue />
      <AboutConcept />
      <div>
        {PILLARS.map((pillar) => (
          <PillarSection key={pillar.title} {...pillar} />
        ))}
      </div>
      <ClosingCta />
      <Footer />
    </main>
  );
}

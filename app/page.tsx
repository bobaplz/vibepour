"use client";

import React, { useState } from "react";
import { subscribeEmail } from "./actions";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    const result = await subscribeEmail(email);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#fafaf8", color: "#2c2c2c" }}>
      {/* Nav */}
      <nav className="px-8 py-6 flex items-center justify-between">
        <span
          className="text-2xl tracking-tight"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}
        >
          VibePour
        </span>
        <span className="text-sm" style={{ color: "#7a7a7a" }}>
          vibepour.io
        </span>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-10"
          style={{ backgroundColor: "#f0ede6", color: "#7a7a7a", letterSpacing: "0.12em" }}
        >
          <span style={{ color: "#c4714d" }}>●</span> Coming Soon
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-8xl font-medium leading-none mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Drink Less.
          <br />
          <span style={{ color: "#c4714d" }}>Sip Better.</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl max-w-xl leading-relaxed mb-12"
          style={{ color: "#7a7a7a" }}
        >
          Wine, whiskey, coffee — paired with good food and even better stories.
          A community for the intentional sipper.
        </p>

        {/* Email Form */}
        {submitted ? (
          <div
            className="text-base font-medium px-6 py-4 rounded-xl"
            style={{ backgroundColor: "#f0ede6", color: "#6b7c4a" }}
          >
            You&apos;re on the list. We&apos;ll be in touch. 🌿
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1.5px solid #e8e6e1",
                  color: "#2c2c2c",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-90 active:scale-95 disabled:opacity-60"
                style={{ backgroundColor: "#c4714d", color: "#ffffff" }}
              >
                {loading ? "Joining..." : "Be first to the table"}
              </button>
            </form>
            {error && (
              <p className="mt-3 text-sm" style={{ color: "#c4714d" }}>
                {error}
              </p>
            )}
          </>
        )}

        {/* Divider */}
        <div className="w-16 h-px mt-16 mb-14" style={{ backgroundColor: "#e8e6e1" }} />

        {/* Three pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-2xl text-left">
          {[
            {
              icon: "◈",
              title: "Pair",
              desc: "Recipes with the perfect pour alongside. No expertise required.",
              color: "#c4714d",
            },
            {
              icon: "◉",
              title: "Consult",
              desc: "Chat with emerging sommeliers and baristas for any occasion.",
              color: "#6b7c4a",
            },
            {
              icon: "◎",
              title: "Share",
              desc: "Post your sip stories. Build your taste. Grow with the community.",
              color: "#c4714d",
            },
          ].map((item) => (
            <div key={item.title}>
              <span className="text-2xl mb-3 block" style={{ color: item.color }}>
                {item.icon}
              </span>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#7a7a7a" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-8 py-6 text-center text-xs"
        style={{ color: "#b0ada6", borderTop: "1px solid #e8e6e1" }}
      >
        © 2026 VibePour · vibepour.io
      </footer>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { subscribeEmail } from "../actions";

export default function ClosingCta() {
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
    <section id="join" className="px-6 py-28 text-center sm:py-36">
      <p
        className="mx-auto mb-5 max-w-xl text-2xl italic leading-snug md:text-3xl"
        style={{ fontFamily: "var(--font-cormorant)", color: "var(--foreground)" }}
      >
        &ldquo;Every great story starts with a pour.&rdquo;
      </p>
      <h2 className="mb-4 text-4xl md:text-5xl" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
        Save your seat.
      </h2>
      <p className="mx-auto mb-10 max-w-md text-base" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
        We&apos;re setting the table. Leave your email and be the first to pull up a chair.
      </p>

      {submitted ? (
        <div
          className="mx-auto max-w-md rounded-lg px-6 py-4 text-base font-medium"
          style={{ backgroundColor: "var(--surface)", color: "var(--olive)", border: "1px solid rgba(107, 124, 74, 0.3)" }}
        >
          You&apos;re on the list. We&apos;ll be in touch.
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg px-5 py-3 text-sm outline-none focus-visible:ring-2"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontFamily: "var(--font-sans)",
                ["--tw-ring-color" as string]: "var(--amber)",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg px-6 py-3 text-sm font-medium tracking-wide outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-60"
              style={{
                backgroundColor: "var(--amber)",
                color: "#16110d",
                ["--tw-ring-color" as string]: "var(--garnet)",
                ["--tw-ring-offset-color" as string]: "var(--background)",
              }}
            >
              {loading ? "Joining…" : "Be first to the table"}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-sm" style={{ color: "var(--garnet)" }}>
              {error}
            </p>
          )}
        </>
      )}

      <div className="mx-auto mt-16 h-px w-full max-w-xs overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
        <div className="h-full animate-pour-fill" style={{ backgroundImage: "var(--pour-spectrum)" }} />
      </div>
    </section>
  );
}

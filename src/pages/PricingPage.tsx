import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight, CircleCheck, Gift } from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "no card",
    tag: "try on your real SKUs",
    cta: "Try it free",
    highlight: false,
    features: [
      "Demo catalog to explore immediately",
      "Upload or enter your own SKUs",
      "Heuristic rule engine + side-by-side compare",
      "1 user",
      "Shopify, Amazon, WooCommerce, eBay sync",
    ],
    off: ["Gemini AI analyst", "AI Auto-Pilot", "API access"],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ month",
    tag: "the favourite",
    cta: "Go Pro",
    highlight: true,
    features: [
      "Everything in Free",
      "50 SKUs managed",
      "Gemini AI pricing analyst with rationale",
      "5 users",
      "Multi-currency: 8 markets",
      "CSV import / export",
      "Priority support",
    ],
    off: ["AI Auto-Pilot", "API access"],
  },
  {
    name: "Team",
    price: "$149",
    period: "/ month",
    tag: "scale & control",
    cta: "Talk to sales",
    highlight: false,
    features: [
      "Everything in Pro",
      "Unlimited SKUs",
      "AI Auto-Pilot repricing on market swings",
      "Unlimited users",
      "Custom integrations + API access",
      "Dedicated support",
    ],
    off: [],
  },
];

const faqs = [
  {
    q: "Can I really start free with my own catalog?",
    a: "Yes. Open the workspace with the demo catalog, then upload a CSV or add SKUs by hand. No card, no sales call — the free workspace is the full product.",
  },
  {
    q: "When do I upgrade?",
    a: "When a growing catalog outgrows the free limit, you need the AI analyst, or your team needs seats. Everything you set up on Free carries over.",
  },
  {
    q: "What does the AI analyst cost on Pro?",
    a: "Nothing extra. Gemini-based pricing analysis is included in the plan, subject to fair-use limits so one catalog can't disrupt service for others.",
  },
  {
    q: "Is there an annual discount?",
    a: "Yes — annual billing gives you 2 months free on Pro and Team. Switch to yearly in billing to apply it.",
  },
];

export default function PricingPage() {
  usePageMeta(
    "Pricing — Optimared",
    "Optimared pricing: start free on your real SKUs, upgrade when automation pays for itself. No credit card required to start."
  );
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hud-grid" />
          <div className="aurora -top-24 right-[12%] h-72 w-72 bg-[#FFC53D]/12" />
          <div className="aurora left-[8%] top-16 h-64 w-64 bg-[#4EF2BA]/7" />
        </div>
        <div className="relative px-6 py-20 text-center md:py-28">
          <p className="eyebrow-amber">one free trial · real work</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase tracking-tight md:text-6xl">
            Start free. Upgrade when{" "}
            <span className="text-glow-amber text-amber">the margin shows up.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-soft md:text-lg">
            Optimared is free to use on your actual catalog. Upgrade when a
            bigger book, seats, or the AI analyst start paying for themselves.
          </p>
        </div>
      </section>

      {/* Free trial strip */}
      <section className="mx-auto max-w-6xl px-5 pt-12 md:px-6">
        <RevealGroup>
          <div className="accent-edge panel flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <span className="logo-tile flex h-12 w-12 shrink-0 items-center justify-center">
                <Gift className="h-5 w-5 text-amber" />
              </span>
              <div>
                <p className="font-head text-lg font-semibold">
                  Try it free — upload your SKUs
                </p>
                <p className="mt-0.5 max-w-xl text-sm text-ink-soft">
                  Demo catalog included. Run the rule engine and the AI analyst on
                  your products before you spend a cent.
                </p>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="btn btn-primary shrink-0"
            >
              Start now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealGroup>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <RevealGroup key={t.name}>
              <div
                className={
                  t.highlight
                    ? "relative flex h-full flex-col rounded-2xl border border-amber/60 bg-panel p-7 neon-ring"
                    : "relative flex h-full flex-col rounded-2xl border border-line bg-panel p-7"
                }
              >
                {t.highlight && (
                  <span className="absolute -top-3 right-6 rounded-full bg-amber px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-void">
                    {t.tag}
                  </span>
                )}
                <p className="font-head text-sm font-semibold uppercase tracking-[0.22em] text-muted">
                  {t.name}
                </p>
                <p className="mt-3 font-display text-5xl">
                  {t.price}
                  <span className="font-sans text-sm text-muted"> {t.period}</span>
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {t.tag}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                      {f}
                    </li>
                  ))}
                  {t.off.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted/80">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/dashboard"
                  onClick={(e) => {
                    if (t.name === "Team") {
                      e.preventDefault();
                      window.location.href = "mailto:hello@optimared.ai?subject=Team plan";
                    }
                  }}
                  className={`btn mt-7 w-full text-sm ${
                    t.highlight ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {t.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* Guarantee strip */}
      <section className="mx-auto max-w-6xl px-5 pb-14 md:px-6">
        <RevealGroup>
          <div className="panel flex flex-col items-center justify-between gap-6 p-8 sm:flex-row">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <CircleCheck className="h-7 w-7 shrink-0 text-mint" />
              <div>
                <p className="font-head font-semibold">
                  The safety floor is included on every plan
                </p>
                <p className="mt-1 max-w-xl text-sm text-ink-soft">
                  Prices never break COGS + 5%. The AI cannot override it unless
                  you explicitly open a liquidation window.
                </p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 sm:w-auto sm:grid-cols-4">
              {[
                { v: "$0", l: "free to start" },
                { v: "1", l: "trial on real work" },
                { v: "8", l: "currencies" },
                { v: "No", l: "card required" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/5 p-4 text-center">
                  <p className="font-display text-2xl text-glow-white">{s.v}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-20 md:px-6">
        <RevealGroup>
          <p className="eyebrow-amber text-center">before you pay</p>
          <h2 className="mt-2 text-center font-display text-3xl uppercase tracking-tight md:text-4xl">
            Billing questions
          </h2>
        </RevealGroup>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <RevealGroup key={f.q}>
                <div className="panel overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-head font-semibold">{f.q}</span>
                    <span
                      className={`text-xl leading-none text-amber transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  )}
                </div>
              </RevealGroup>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/dashboard" className="btn btn-primary">
            Try it free — upload your SKUs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
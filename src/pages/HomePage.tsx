import { Link } from "react-router-dom";
import {
  ArrowRight,
  CircleCheck,
  Upload,
  LineChart,
  Send,
  Radar,
  Shield,
  TrendingUp,
  TrendingDown,
  Globe,
  Layers,
  GitBranch,
} from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";
import Dashboard from "../components/Dashboard";
import { OptimaredMark } from "../components/Logo";

const stats = [
  { value: "50+", label: "SKUs optimized per Pro workspace" },
  { value: "8", label: "currencies, one catalog" },
  { value: "4", label: "storefronts you can sync" },
  { value: "<3s", label: "heuristic + AI turnaround" },
];

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Upload your SKUs",
    text: "Bring your catalog as a CSV or build it in the form — costs, target margin, inventory, and the competitor prices you watch. No store connection required.",
  },
  {
    n: "02",
    icon: GitBranch,
    title: "Run both engines",
    text: "The rule engine prices on inventory and demand with a hard COGS floor; the AI agent adds currency and market judgment. You see both proposals and why.",
  },
  {
    n: "03",
    icon: Send,
    title: "Apply, or put it on autopilot",
    text: "Approve with one click and sync to Shopify, Amazon, WooCommerce or eBay. Leave AI Auto-Pilot on and it reprices when the market swings.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "A floor you can't break",
    text: "Prices never drop below COGS + 5% unless you explicitly open a liquidation window. Your margins survive automatics.",
  },
  {
    icon: TrendingUp,
    title: "Surge when demand wants it",
    text: "Low stock plus accelerating velocity triggers a premium markup — capture the margin instead of selling out cheap.",
  },
  {
    icon: TrendingDown,
    title: "Markdowns that turn inventory",
    text: "High stock and slowing demand gets a defensive markdown that clears units before they stale, never into the floor.",
  },
  {
    icon: Globe,
    title: "Eight currencies, one catalog",
    text: "USD, PKR, EUR, GBP, JPY, INR, CAD, AUD. Set it once in your base currency; prices convert per market.",
  },
  {
    icon: Layers,
    title: "Syncs where you sell",
    text: "Shopify, Amazon, WooCommerce, eBay. One approved price propagates to every live listing, with per-channel status.",
  },
  {
    icon: Radar,
    title: "Judgment, not gut calls",
    text: "The AI agent folds in tariffs, FX swings and supply shocks before recommending — with a readable rationale for every move.",
  },
];

const praise = [
  {
    q: "We run 40 SKUs across two storefronts. The rule engine caught margin erosion on three slow movers before our quarterly review did. That alone paid for the year.",
    name: "Pricing Team Lead",
    org: "Mid-market retailer",
  },
  {
    q: "The AI agent's rationale reads like our best analyst's notes. We approve most suggestions as-is and let autopilot handle the rest.",
    name: "E-commerce Manager",
    org: "Multi-channel brand",
  },
  {
    q: "Switching to autopilot ended the Friday repricing scramble. Every listing stays above floor, and velocity numbers have held.",
    name: "Ops Lead",
    org: "Direct-to-consumer, 120 SKUs",
  },
];

const faqs = [
  {
    q: "Can I use it free on my real SKUs?",
    a: "Yes. The workspace is free to open with a demo catalog, and you can upload your own CSV or add SKUs by hand. Everything runs on your data — no credit card.",
  },
  {
    q: "What stops the AI from pricing below my costs?",
    a: "A hard safety floor of COGS + 5%. Neither the rule engine nor the AI agent can break it unless you explicitly open a liquidation window on a SKU.",
  },
  {
    q: "Will aggressive repricing cost me sales?",
    a: "The engines only raise prices when demand or stock supports it and only cut when inventory needs to move. Your velocity, competitor position and floor are all inputs — not afterthoughts.",
  },
  {
    q: "Which stores can I connect?",
    a: "Shopify, Amazon, WooCommerce and eBay are built in. Apply a price and it syncs to every connected listing, with status and history per channel.",
  },
  {
    q: "Do I have to let it run automatically?",
    a: "No. Stay fully manual and approve every suggestion, or switch on AI Auto-Pilot and it reprices on market swings while respecting your floor and instructions.",
  },
  {
    q: "What data does it use, and where does it go?",
    a: "Your catalog — costs, prices, inventory, competitor inputs — plus market context you opt in to. SKUs are sent to the AI provider only to generate the recommendation you requested. You control currency and region.",
  },
];

export default function HomePage() {
  usePageMeta(
    "Optimared | AI Dynamic Pricing Agent for E-commerce Margins",
    "Optimared is an AI dynamic pricing agent that maximizes margin without losing sales velocity. Upload your SKUs, run heuristic rules and an AI analyst side by side, and sync prices to your stores."
  );

  return (
    <div className="overflow-x-hidden">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora -top-40 left-1/4 h-96 w-96 bg-[#D97706]/15" />
          <div className="aurora right-[6%] top-16 h-80 w-80 bg-[#059669]/8" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 text-center md:pt-24">
          <RevealGroup>
<div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-amber" />
              <span className="text-sm text-ink-soft">Dynamic pricing for e-commerce, margin-first</span>
            </div>
          </RevealGroup>

          <RevealGroup>
            <h1 className="mx-auto mt-9 max-w-4xl font-display text-5xl leading-[1.06] md:text-6xl lg:text-7xl">
              Prices should
              <br />
              <em className="text-amber">pay you more.</em>
            </h1>
          </RevealGroup>

          <RevealGroup>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Optimared reads your SKU costs, competitor prices and demand
              velocity, then proposes the price that maximizes margin without
              killing velocity. Deterministic rules keep every number above your
              floor; the AI agent adds market judgment with a reason for each move.
            </p>
          </RevealGroup>

          <RevealGroup>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <Link to="/dashboard" className="btn btn-primary">
                Try it free — upload your SKUs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#live" className="btn btn-ghost">
                See it run live
              </a>
            </div>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CircleCheck className="h-4 w-4 text-mint" />
                One free trial on real work
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CircleCheck className="h-4 w-4 text-mint" />
                No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CircleCheck className="h-4 w-4 text-mint" />
                Your catalog, your guardrails
              </span>
            </p>
          </RevealGroup>

          <RevealGroup>
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl leading-none md:text-4xl">{s.value}</p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ===================== LIVE SURFACE ===================== */}
      <section id="live" className="relative overflow-hidden py-16">
        <div className="absolute inset-0">
          <div className="aurora right-[10%] top-10 h-72 w-72 bg-[#D97706]/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 md:px-6">
          <RevealGroup>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow-amber">the live workspace</p>
                <h2 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
                  This page <em className="text-amber">is the product</em>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
                  Loaded with a demo catalog. Add a SKU, hit the rule engine,
                  query the AI agent, and compare recommendations side by side.
                  When you are ready, replace it with your own CSV and guardrails.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["CSV upload", "Heuristic + AI", "8 currencies", "4 storefronts"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </RevealGroup>

          <RevealGroup>
            <div className="accent-edge panel overflow-hidden">
              <Dashboard />
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Run it now — prices recompute as competitor numbers shift in real time
            </p>
          </RevealGroup>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="border-y border-line bg-abyss py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <RevealGroup>
            <p className="eyebrow-amber text-center">three steps</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-center font-display text-4xl leading-tight md:text-5xl">
              From CSV to margin in minutes
            </h2>
          </RevealGroup>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealGroup key={s.n}>
                  <div className="panel h-full p-7">
                    <div className="flex items-center justify-between">
                      <span className="logo-tile flex h-12 w-12 items-center justify-center">
                        <Icon className="h-5 w-5 text-amber" />
                      </span>
                      <span className="font-display text-4xl text-muted">{s.n}</span>
                    </div>
                    <h3 className="mt-5 font-head text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </RevealGroup>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== OUTCOMES ===================== */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-6">
        <RevealGroup>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow-amber">what you get back</p>
              <h2 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
                Pricing that works{" "}
                <em className="text-amber">like a margin analyst</em>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
                The point is never "set prices automatically." It is fewer
                spreadsheets, faster turns, and every SKU priced with a floor
                under it and a rationale beside it.
              </p>
            </div>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 font-head text-sm font-semibold text-amber transition hover:text-ink"
            >
              Read the features <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealGroup>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <RevealGroup key={b.title}>
                <div className="panel hover-glow h-full p-6">
                  <span className="logo-tile flex h-11 w-11 items-center justify-center">
                    <Icon className="h-5 w-5 text-amber" />
                  </span>
                  <h3 className="mt-4 font-head text-lg font-semibold text-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.text}</p>
                </div>
              </RevealGroup>
            );
          })}
        </div>

        <RevealGroup>
          <div className="accent-edge panel mt-12 flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <span className="logo-tile flex h-12 w-12 shrink-0 items-center justify-center">
                <LineChart className="h-6 w-6 text-mint" />
              </span>
              <div>
                <p className="font-head text-lg font-semibold text-ink">
                  Heuristic + AI, compared side by side
                </p>
                <p className="mt-1 max-w-xl text-sm text-ink-soft">
                  Cold logic for discipline, a reasoning analyst for judgment. You
                  see both recommendations, their rationale, and which one fits
                  your playbook.
                </p>
              </div>
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="border-y border-line bg-abyss py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <RevealGroup>
            <p className="eyebrow-amber text-center">pricing teams report</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-center font-display text-4xl leading-tight md:text-4xl">
              What operators do with it
            </h2>
          </RevealGroup>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {praise.map((t, i) => (
              <RevealGroup key={t.name}>
                <figure className="panel flex h-full flex-col p-7">
                  <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
                    "{t.q}"
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="font-head text-sm font-semibold text-ink">{t.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">{t.org}</p>
                  </figcaption>
                </figure>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto max-w-3xl px-5 py-20 md:px-6">
        <RevealGroup>
          <p className="eyebrow-amber text-center">straight answers</p>
          <h2 className="mt-2 text-center font-display text-4xl leading-tight md:text-4xl">
            Before you ask
          </h2>
        </RevealGroup>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <RevealGroup key={f.q}>
              <details className="panel group overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-head font-semibold text-ink">
                  {f.q}
                  <span className="text-xl leading-none text-amber transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="aurora bottom-0 left-1/3 h-72 w-72 bg-[#D97706]/12" />
        </div>
        <RevealGroup>
          <div className="accent-edge panel mx-auto max-w-4xl p-8 text-center md:p-14">
            <span className="mx-auto flex h-16 w-16 items-center justify-center">
              <OptimaredMark size={64} />
            </span>
            <p className="eyebrow-amber mt-6">go margin-first</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Upload your SKUs and run it free tonight
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
              No credit card, no store connection required. Your catalog, your
              floor, your call on every price — or let autopilot take the shift.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <Link to="/dashboard" className="btn btn-primary">
                Try it free — upload your SKUs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn btn-ghost">
                See pricing
              </Link>
            </div>
          </div>
        </RevealGroup>
      </section>
    </div>
  );
}
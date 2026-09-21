import { Link } from "react-router-dom";
import {
  Sparkles,
  LineChart,
  Globe,
  Layers,
  TrendingUp,
  Settings2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Bell,
  Cpu,
} from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

const features = [
  {
    icon: LineChart,
    title: "Heuristic Rule Engine",
    detail: "deterministic · auditable",
    body: "A programmatic engine evaluates inventory levels, demand velocity, and competitor benchmarks to propose prices with hard safety floors. Same inputs, same output — fully readable and repeatable.",
    points: [
      "Surge pricing on low stock + accelerating demand",
      "Markdowns that never breach COGS + 5%",
      "Competitor benchmarking vs. average and lowest",
    ],
  },
  {
    icon: Sparkles,
    title: "Gemini AI Pricing Analyst",
    detail: "reasoning LLM · structured output",
    body: "The AI agent absorbs your pricing philosophy — premium maximizer, market-share crusader, or liquidation specialist — then reads currency movements, tariffs and supply context before recommending a price.",
    points: [
      "Custom instructions per workspace",
      "Structured JSON output, schema-validated",
      "Currency + tariff + event awareness",
    ],
  },
  {
    icon: Globe,
    title: "Multi-Currency Engine",
    detail: "8 currencies, instant conversion",
    body: "Set your catalog once in USD and let Optimared convert recommendations on the fly across USD, PKR, EUR, GBP, JPY, INR, CAD and AUD. Switch markets without touching SKUs.",
    points: [
      "Real-time display conversion",
      "Per-region pricing strategy",
      "No duplicate product entries",
    ],
  },
  {
    icon: Layers,
    title: "Multi-Channel Sync",
    detail: "Shopify · Amazon · WooCommerce · eBay",
    body: "Each product carries its connected storefronts. Apply a price and it propagates across every live listing, with sync status and last-synced time per channel.",
    points: [
      "One-click price application",
      "Per-channel status & history",
      "AI Auto-Pilot for whole-catalog pushes",
    ],
  },
  {
    icon: TrendingUp,
    title: "Market Event Simulation",
    detail: "stress-test before it hits",
    body: "Simulate tariff shocks, shipping crises and currency swings to see how your pricing would respond — before real markets move on you.",
    points: [
      "Tariff, shipping, and FX scenarios",
      "Volatility timeline visualization",
      "Recommendations per event type",
    ],
  },
  {
    icon: Settings2,
    title: "Custom Agent Instructions",
    detail: "your strategy, your guardrails",
    body: "Presets for balance, premium margin, market share and liquidation — or write free-form instructions the AI analyst must follow as its primary directive.",
    points: [
      "4 battle-tested strategy presets",
      "Free-form prompt override",
      "Per-analysis agent settings",
    ],
  },
];

const extras = [
  {
    icon: ShieldCheck,
    title: "Safety Floors",
    desc: "Prices can never drop below COGS + 5% unless you explicitly open liquidation.",
  },
  {
    icon: RefreshCw,
    title: "Live Scraper Logs",
    desc: "Watch the agent crawl competitor and channel endpoints in real time.",
  },
  {
    icon: Bell,
    title: "System Notifications",
    desc: "Market events, low-stock alerts, and AI suggestions pushed in the dashboard.",
  },
  {
    icon: Cpu,
    title: "Heuristic vs AI Compare",
    desc: "Side-by-side proposals show what cold logic and cognitive AI each recommend.",
  },
];

export default function FeaturesPage() {
  usePageMeta(
    "Features — Optimared",
    "Optimared features: heuristic rule engine, Gemini AI pricing analyst, multi-currency engine, multi-channel sync, market simulations, and custom agent instructions."
  );

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hud-grid" />
          <div className="aurora -top-24 left-1/4 h-72 w-72 bg-[#FFC53D]/13" />
          <div className="aurora right-[8%] top-12 h-64 w-64 bg-[#4DE3FF]/7" />
        </div>
        <div className="relative px-6 py-20 text-center md:py-28">
          <p className="eyebrow-amber">feature overview</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase tracking-tight md:text-6xl">
            Built for <span className="text-amber">pricing operators</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            A rule engine for discipline, an AI analyst for judgment, and full
            transparency between them. Every price move comes with a reason and
            a floor beneath it.
          </p>
        </div>
      </section>

      {/* Main features */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <RevealGroup key={f.title}>
                <div className="panel h-full p-8">
                  <div className="flex items-center gap-4">
                    <span className="logo-tile flex h-12 w-12 shrink-0 items-center justify-center">
                      <Icon className="h-6 w-6 text-amber" />
                    </span>
                    <div>
                      <h2 className="font-head text-xl font-semibold uppercase tracking-wide">
                        {f.title}
                      </h2>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {f.detail}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealGroup>
            );
          })}
        </div>
      </section>

      {/* Extras */}
      <section className="border-y border-line/60 bg-abyss py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <RevealGroup>
            <p className="eyebrow-amber text-center">more to love</p>
            <h2 className="mt-2 text-center font-display text-3xl uppercase tracking-tight md:text-4xl">
              The details matter
            </h2>
          </RevealGroup>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map((e) => {
              const Icon = e.icon;
              return (
                <RevealGroup key={e.title}>
                  <div className="panel h-full p-6">
                    <span className="logo-tile flex h-10 w-10 items-center justify-center">
                      <Icon className="h-5 w-5 text-amber" />
                    </span>
                    <h3 className="mt-4 font-head font-semibold">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{e.desc}</p>
                  </div>
                </RevealGroup>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 md:px-6">
        <RevealGroup>
          <div className="accent-edge panel mx-auto max-w-4xl p-8 text-center md:p-12">
            <p className="eyebrow-amber">see it on your catalog</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl uppercase tracking-tight md:text-5xl">
              Open the workspace and run it on real SKUs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
              Demo catalog included. Upload a CSV or add products by hand — no
              signup, no setup.
            </p>
            <Link to="/dashboard" className="btn btn-primary mt-8">
              Try it free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealGroup>
      </section>
    </div>
  );
}
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
    detail: "Deterministic, rule-based pricing",
    body: "A programmatic engine evaluates inventory levels, demand velocity, and competitor benchmarks to propose prices with hard safety floors. Every recommendation is deterministic: same inputs, same output, fully auditable.",
    points: [
      "Surge pricing on low stock + accelerating demand",
      "Markdowns that never breach COGS + 5%",
      "Competitor benchmarking vs. average and lowest",
    ],
  },
  {
    icon: Sparkles,
    title: "Gemini AI Cognitive Agent",
    detail: "Reasoning LLM pricing analyst",
    body: "The AI agent absorbs your custom instructions — premium maximizer, market-share crusader, or liquidation specialist — then reads currency movements, geopolitical events, and supply-chain context before recommending a price.",
    points: [
      "Custom system instructions per workspace",
      "Structured JSON output, schema-validated",
      "Currency + tariff + event awareness",
    ],
  },
  {
    icon: Globe,
    title: "Multi-Currency Engine",
    detail: "8 currencies, instant conversion",
    body: "Set your catalog once in USD and let OptimaRed convert recommendations on the fly. USD, PKR, EUR, GBP, JPY, INR, CAD, and AUD — switch markets without touching SKUs.",
    points: [
      "Real-time display conversion",
      "Per-region pricing strategy",
      "No duplicate product entries",
    ],
  },
  {
    icon: Layers,
    title: "Multi-Channel Sync",
    detail: "Shopify, Amazon, WooCommerce, eBay",
    body: "Each product carries its connected storefronts. When you apply a price, it propagates across every live listing — with sync status and last-synced time for every channel.",
    points: [
      "One-click price application",
      "Per-channel status & history",
      "AI Auto-Pilot for whole-catalog pushes",
    ],
  },
  {
    icon: TrendingUp,
    title: "Market Event Simulation",
    detail: "Stress-test before it hits",
    body: "Simulate tariff shocks, Suez-style shipping crises, and currency volatility to see how your pricing would respond — before real markets move on you.",
    points: [
      "Tariff, shipping, and FX scenarios",
      "Volatility timeline visualization",
      "Recommendations per event type",
    ],
  },
  {
    icon: Settings2,
    title: "Custom Agent Instructions",
    detail: "Your strategy, your guardrails",
    body: "Presets for balance, premium margin, market share, and liquidation — or write free-form instructions the Gemini agent must follow as its primary directive.",
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
    desc: "Market events, low-stock alerts, and AI suggestions pushed right in the dashboard.",
  },
  {
    icon: Cpu,
    title: "Heuristic + AI Compare",
    desc: "Side-by-side proposals let you see what cold logic and cognitive AI each recommend.",
  },
];

export default function FeaturesPage() {
  usePageMeta(
    "Features — OptimaRed",
    "Explore OptimaRed's feature set: heuristic rule engine, Gemini AI pricing agent, multi-currency engine, multi-channel sync, market simulations, and custom agent instructions."
  );

  return (
    <div className="bg-stone-50 text-stone-800 antialiased overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative px-6 py-20 md:py-28 max-w-6xl mx-auto text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-4">
            Feature Overview
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-stone-900 max-w-3xl mx-auto leading-[1.1]">
            Built for Pricing Teams
          </h1>
          <p className="text-stone-500 text-lg md:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            A rule engine for discipline, an AI agent for judgment, and full transparency between
            them.
          </p>
        </div>
      </section>

      {/* Main features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((f) => (
            <RevealGroup key={f.title} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-stone-900">{f.title}</h2>
                  <div className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-0.5">
                    {f.detail}
                  </div>
                </div>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">{f.body}</p>
              <ul className="mt-5 space-y-2.5">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-stone-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
            More to Love
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
            The Details Matter
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {extras.map((e) => (
            <RevealGroup key={e.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 text-stone-600 flex items-center justify-center mb-4">
                <e.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-stone-800">{e.title}</h3>
              <p className="text-sm text-stone-500 mt-2 leading-relaxed">{e.desc}</p>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto bg-stone-900 rounded-3xl px-6 py-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            See It Run on a Live Catalog
          </h2>
          <p className="text-stone-400 mt-3 max-w-xl mx-auto">
            Open the dashboard and run the Gemini agent on the demo SKUs — no signup, no setup.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-bold mt-8 shadow-lg shadow-blue-600/30 transition-colors"
          >
            Open the Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
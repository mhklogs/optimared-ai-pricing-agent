import { Link } from "react-router-dom";
import {
  Sparkles,
  TrendingDown,
  TrendingUp,
  Percent,
  Layers,
  Globe,
  Settings2,
  ArrowRight,
  ShieldCheck,
  Zap,
  LineChart,
} from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";
import Dashboard from "../components/Dashboard";

const stats = [
  { label: "Optimized SKUs", value: "50+", detail: "per Pro workspace" },
  { label: "Currency Markets", value: "8", detail: "auto-converted" },
  { label: "Channel Integrations", value: "4", detail: "Shopify, Amazon & more" },
  { label: "Analysis Turnaround", value: "<3s", detail: "heuristic + AI engine" },
];

const features = [
  {
    icon: Sparkles,
    title: "Gemini AI Agent",
    desc: "A reasoning pricing analyst that reads inventory, competitor pressure, and market context before recommending a price — with a rationale for every move.",
  },
  {
    icon: LineChart,
    title: "Heuristic Rule Engine",
    desc: "Deterministic pricing rules with a hard safety floor at COGS + 5%. No gut calls, no margin erosion — every rule is readable and auditable.",
  },
  {
    icon: Globe,
    title: "Multi-Currency Engine",
    desc: "Prices re-convert instantly across USD, PKR, EUR, GBP, JPY and more, so your strategy holds in any market you sell into.",
  },
  {
    icon: Layers,
    title: "Multi-Channel Sync",
    desc: "Connect Shopify, Amazon, WooCommerce, and eBay. One rule change propagates across every live listing.",
  },
  {
    icon: TrendingUp,
    title: "Market Event Simulation",
    desc: "Stress-test pricing against tariff shocks, currency swings, and supply-chain delays before they hit your store.",
  },
  {
    icon: Settings2,
    title: "Custom Agent Instructions",
    desc: "Dial the agent to be a margin maximizer, a market-share crusader, or a liquidation specialist — your rules, your guardrails.",
  },
];

const steps = [
  {
    n: "01",
    icon: Zap,
    title: "Add Your Products",
    desc: "Import SKUs with COGS, target margins, inventory levels, and competitor price points.",
  },
  {
    n: "02",
    icon: Settings2,
    title: "Configure the Agent",
    desc: "Pick a strategy preset or write your own instructions. Set currencies, regions, and safety floors.",
  },
  {
    n: "03",
    icon: TrendingDown,
    title: "Watch Optimization",
    desc: "The engine proposes prices, you apply with one click — or switch on AI Auto-Pilot.",
  },
];

const faqs = [
  {
    q: "Is the AI pricing agent really automatic?",
    a: "Yes — with AI Auto-Pilot enabled, the agent reprices listings autonomously when it detects market swings. You can stay fully manual and approve every suggestion instead.",
  },
  {
    q: "What stops the AI from pricing below my costs?",
    a: "A hard safety floor. Prices will never drop below COGS + 5% unless you explicitly open a liquidation window.",
  },
  {
    q: "Can I test it before connecting my store?",
    a: "Absolutely. The dashboard ships with a demo catalog — run heuristic and AI analysis on the sample SKUs with zero syncing.",
  },
  {
    q: "Which stores can I connect?",
    a: "Shopify, Amazon, WooCommerce, and eBay are built in. Volume plans unlock custom integrations.",
  },
];

export default function HomePage() {
  usePageMeta(
    "OptimaRed — AI-Powered Dynamic Pricing for E-commerce",
    "OptimaRed is an AI dynamic pricing agent that optimizes your e-commerce catalog in real time — heuristic rules, Gemini reasoning, multi-currency and multi-channel support."
  );

  return (
    <div className="bg-stone-50 text-stone-800 antialiased overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-600/[0.04] to-transparent" />
        <div className="relative px-6 pt-20 pb-16 md:pt-28 md:pb-20 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-stone-600">
              Agent Autopilot Monitoring Channels
            </span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-stone-900 max-w-3xl mx-auto leading-[1.1]">
            Smarter Pricing, <span className="text-blue-600">Powered by AI</span>
          </h1>
          <p className="text-stone-500 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            OptimaRed uses real-time market data, competitor intelligence, and custom AI agents to
            keep your e-commerce pricing competitive and profitable — automatically.
          </p>
          <div className="flex items-center justify-center gap-4 pt-8 flex-col sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-colors"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 bg-white text-stone-700 font-semibold px-7 py-3.5 rounded-xl border border-stone-200 hover:border-blue-200 hover:text-blue-600 transition-colors shadow-sm"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-stone-200 bg-white">
        <div className="px-6 py-10 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono font-black text-2xl md:text-3xl text-stone-900">
                {s.value}
              </div>
              <div className="text-xs font-bold text-stone-500 mt-1">{s.label}</div>
              <div className="text-xs text-stone-400 mt-0.5">{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live dashboard embed */}
      <section id="dashboard" className="px-6 py-20 max-w-7xl mx-auto">
        <RevealGroup>
          <div className="text-center mb-12">
            <div className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
              Try It Live
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
              The Pricing Control Room
            </h2>
            <p className="text-stone-500 text-lg mt-3 max-w-2xl mx-auto">
              This is the actual product. Add a product, run the heuristic engine, query the Gemini
              agent, and compare recommendations side by side.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-xl shadow-stone-200/60">
            <Dashboard />
          </div>
        </RevealGroup>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
            How It Works
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
            From Catalog to Autopilot in Three Steps
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <RevealGroup key={s.n} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm relative">
              <div className="text-[10px] font-mono font-bold text-stone-300">{s.n}</div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mt-3 mb-4">
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-800">{s.title}</h3>
              <p className="text-sm text-stone-500 mt-2 leading-relaxed">{s.desc}</p>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
            Everything Included
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
            Built for Pricing Teams That Hate Spreadsheets
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <RevealGroup key={f.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-800">{f.title}</h3>
              <p className="text-sm text-stone-500 mt-2 leading-relaxed">{f.desc}</p>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* Safety guarantee strip */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="bg-white border border-stone-200 rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Prices Never Below COGS + 5%
              </h3>
              <p className="text-sm text-stone-500 mt-1 max-w-xl">
                A regulatory floor protects your margins unless you explicitly open a liquidation
                window. The AI cannot override it.
              </p>
            </div>
          </div>
          <Percent className="w-8 h-8 text-stone-200 hidden md:block" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
            Trusted by Retail Teams
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
            What Teams Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              quote:
                "We run 40 SKUs across two storefronts. The heuristic engine caught margin erosion on three slow movers before our quarterly review did.",
              name: "Pricing Team Lead",
              org: "Mid-market retailer",
            },
            {
              quote:
                "The AI agent's rationale read like our best analyst's notes. We approve most suggestions as-is. Autopilot handles the rest.",
              name: "E-commerce Manager",
              org: "Multi-channel brand",
            },
          ].map((t) => (
            <RevealGroup key={t.name} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 text-blue-600 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 pt-5 border-t border-stone-100">
                <div className="font-display font-bold text-sm text-stone-800">{t.name}</div>
                <div className="text-xs text-stone-400 mt-0.5">{t.org}</div>
              </div>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <RevealGroup key={f.q} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-stone-800">{f.q}</h3>
              <p className="text-sm text-stone-500 mt-2 leading-relaxed">{f.a}</p>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto bg-stone-900 rounded-3xl px-6 py-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            Start Optimizing Today
          </h2>
          <p className="text-stone-400 mt-3 max-w-xl mx-auto">
            No store connection required — the demo catalog is live. Run your first AI price
            analysis in under a minute.
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
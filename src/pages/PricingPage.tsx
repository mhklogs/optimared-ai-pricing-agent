import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronDown, ArrowRight } from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

const tiers = [
  {
    name: "Free",
    monthly: 0,
    desc: "For testing and small catalogs.",
    features: ["5 products", "Heuristic pricing", "1 user", "Basic support"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    monthly: 49,
    desc: "For growing stores ready to automate.",
    features: [
      "50 products",
      "Heuristic + AI pricing",
      "5 users",
      "Priority support",
      "Multi-currency",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    name: "Team",
    monthly: 149,
    desc: "For teams that need scale and control.",
    features: [
      "Unlimited products",
      "All features",
      "Unlimited users",
      "Dedicated support",
      "Custom integrations",
      "API access",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I switch tiers later?",
    a: "Yes. Upgrade or downgrade anytime from Settings — changes are prorated to the end of your billing cycle and take effect immediately.",
  },
  {
    q: "Does the Free tier require a credit card?",
    a: "No. The Free tier is completely free with no credit card required. You can manage up to 5 products with heuristic pricing.",
  },
  {
    q: "How is AI pricing billed on the Pro tier?",
    a: "Gemini-based analysis is included in your Pro subscription, subject to fair-use limits so one catalog can't disrupt service for others.",
  },
  {
    q: "What counts as an unlimited product on Team?",
    a: "There's no product-count cap on Team. You can connect as many SKUs and storefront channels as your catalog holds.",
  },
  {
    q: "Is there an annual discount?",
    a: "Yes, annual billing gives you 2 months free on Pro and Team plans — switch to yearly in billing to apply it.",
  },
];

export default function PricingPage() {
  usePageMeta("Pricing — OptimaRed");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative px-6 py-20 md:py-28 max-w-6xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-stone-900">
            Simple, Transparent Pricing
          </h1>
          <p className="text-stone-500 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            Start free. Upgrade when automation starts paying for itself.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col bg-white border rounded-2xl p-7 shadow-sm transition-all ${
                t.highlighted
                  ? "border-blue-600 ring-2 ring-blue-600/20 md:-mt-4 md:-mb-4"
                  : "border-stone-200"
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <h2 className="font-display font-bold text-xl text-stone-800">{t.name}</h2>
              <p className="text-sm text-stone-500 mt-1">{t.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-mono font-bold text-4xl text-stone-900">
                  ${t.monthly}
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-400">
                  /mo
                </span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/dashboard"
                className={`mt-8 text-center px-6 py-3 rounded-xl font-semibold transition-colors ${
                  t.highlighted
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                    : "bg-stone-900 hover:bg-stone-800 text-white"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* FAQ */}
      <section className="pb-20 px-6 max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900 text-center mb-10">
          Frequently Asked Questions
        </h2>
        <RevealGroup className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
                >
                  <span className="font-semibold text-stone-800 text-sm md:text-base">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-stone-500 leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </RevealGroup>

        <div className="text-center mt-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-colors"
          >
            Start Optimizing Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
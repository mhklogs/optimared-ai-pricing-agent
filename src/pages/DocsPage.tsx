import { Link } from "react-router-dom";
import { ArrowRight, Terminal, ChevronRight } from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-line bg-void p-5 font-mono text-xs leading-relaxed text-ink-soft md:text-sm">
      {code}
    </pre>
  );
}

function MethodChip({ method }: { method: string }) {
  const style =
    method === "GET"
      ? "border-amber/40 bg-amber/10 text-amber"
      : method === "POST"
        ? "border-mint/40 bg-mint/10 text-mint"
        : "border-line bg-panel-2 text-muted";
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${style}`}
    >
      {method}
    </span>
  );
}

const endpoints = [
  { method: "GET", path: "/api/products", desc: "List all products in the catalog" },
  { method: "POST", path: "/api/products", desc: "Create or update a product" },
  { method: "DELETE", path: "/api/products/:id", desc: "Delete a product by SKU" },
  { method: "POST", path: "/api/products/reset", desc: "Reset catalog to defaults or a provided list" },
  { method: "POST", path: "/api/analyze-heuristic", desc: "Run deterministic heuristic pricing on a product" },
  { method: "POST", path: "/api/analyze-ai", desc: "Run Gemini AI cognitive pricing on a product" },
  { method: "POST", path: "/api/contact", desc: "Submit a contact form message" },
];

export default function DocsPage() {
  usePageMeta(
    "Documentation — Optimared",
    "Optimared documentation: API reference, heuristic pricing rules, AI agent configuration, and market event simulation."
  );

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hud-grid" />
          <div className="aurora -top-24 right-[15%] h-64 w-64 bg-[#FFC53D]/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber">
            <Terminal className="h-3.5 w-3.5" />
            Documentation
          </span>
          <h1 className="mt-6 font-display text-4xl uppercase tracking-tight md:text-5xl">
            How it works
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Everything you need to get products, rules, and the pricing agent running.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-16 px-6 py-20">
        <RevealGroup className="space-y-6">
          <section>
            <div className="flex items-center gap-2 font-head text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
              Getting started
              <ChevronRight className="h-5 w-5 text-amber" />
            </div>
            <div className="mt-6 space-y-8">
              <div>
                <h3 className="mb-2 font-semibold text-ink">1. Fetch the catalog</h3>
                <CodeBlock code={`curl https://your-app.vercel.app/api/products`} />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-ink">2. Add or update a product</h3>
                <CodeBlock
                  code={`curl -X POST https://your-app.vercel.app/api/products \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "SKU-HZN-80",
    "name": "Horizon ANC Headphones",
    "current_price": 220,
    "cogs": 120,
    "target_margin": 40,
    "inventory_level": "Low",
    "demand_velocity": "Accelerating",
    "competitor_prices": [240, 255, 230]
  }'`}
                />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-ink">3. Analyze pricing</h3>
                <CodeBlock
                  code={`curl -X POST https://your-app.vercel.app/api/analyze-heuristic \\
  -H "Content-Type: application/json" \\
  -d '{ "product": { "id": "SKU-HZN-80", "current_price": 220,
         "cogs": 120, "target_margin": 40, "inventory_level": "Low",
         "demand_velocity": "Accelerating",
         "competitor_prices": [240, 255, 230] } }'`}
                />
              </div>
            </div>
          </section>
        </RevealGroup>

        <RevealGroup className="space-y-6">
          <section>
            <div className="flex items-center gap-2 font-head text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
              Configuring the AI agent
              <ChevronRight className="h-5 w-5 text-amber" />
            </div>
            <p className="mt-6 mb-4 text-sm leading-relaxed text-ink-soft md:text-base">
              The Gemini analyst follows your custom system prompt as its primary
              directive. Pass{" "}
              <span className="font-mono text-amber">systemInstruction</span> to set
              pricing philosophy, guardrails, and brand positioning.
            </p>
            <CodeBlock
              code={`curl -X POST https://your-app.vercel.app/api/analyze-ai \\
  -H "Content-Type: application/json" \\
  -d '{
    "product": { "id": "SKU-HZN-80", "current_price": 220, "cogs": 120,
                 "target_margin": 40, "inventory_level": "Low",
                 "demand_velocity": "Accelerating",
                 "competitor_prices": [240, 255, 230] },
    "currency": "USD",
    "region": "Global",
    "systemInstruction": "Premium brand. Never price below COGS + 20%. Maximize margin within 10% of the lowest competitor."
  }'`}
            />
          </section>
        </RevealGroup>

        <RevealGroup className="space-y-6">
          <section>
            <div className="flex items-center gap-2 font-head text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
              Heuristic rules
              <ChevronRight className="h-5 w-5 text-amber" />
            </div>
            <div className="panel mt-6 p-6">
              <ul className="space-y-4 text-sm text-ink-soft">
                <li>
                  <span className="font-semibold text-ink">Accelerating demand + low stock</span>{" "}
                  — surge markup to capture premium margin.
                </li>
                <li>
                  <span className="font-semibold text-ink">Decelerating demand + high stock</span>{" "}
                  — defensive markdown, never below COGS + 5%.
                </li>
                <li>
                  <span className="font-semibold text-ink">High stock only</span> — incremental
                  markdown to turn inventory faster.
                </li>
                <li>
                  <span className="font-semibold text-ink">Low stock only</span> — small surge to
                  slow depletion and avoid stockouts.
                </li>
                <li>
                  <span className="font-semibold text-ink">Stable conditions</span> — align toward
                  target margin where competitors allow.
                </li>
              </ul>
              <p className="mt-5 font-mono text-xs text-muted">
                Every recommendation respects a safety floor of COGS + 5%, unless explicit
                liquidation is requested.
              </p>
            </div>
          </section>
        </RevealGroup>

        <RevealGroup className="space-y-6">
          <section>
            <div className="flex items-center gap-2 font-head text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
              Market events & simulation
              <ChevronRight className="h-5 w-5 text-amber" />
            </div>
            <p className="mt-6 mb-4 text-sm leading-relaxed text-ink-soft md:text-base">
              Simulate geopolitical, currency, and supply shocks to stress-test
              pricing before they hit your storefront. Pass the active event
              context with any product analysis and the agent folds it into its
              reasoning.
            </p>
            <CodeBlock
              code={`{
  "product": { "id": "SKU-HZN-80", "current_price": 220, "cogs": 120, "target_margin": 40,
               "inventory_level": "Low", "demand_velocity": "Accelerating",
               "competitor_prices": [240, 255, 230] },
  "region": "EUR",
  "currency": "EUR",
  "geopoliticalEvent": "Trade tariffs on electronics imports",
  "currencyVolatility": "EUR/USD swinging +-3% weekly"
}`}
            />
          </section>
        </RevealGroup>

        <RevealGroup className="space-y-6">
          <section>
            <div className="flex items-center gap-2 font-head text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
              API reference
              <ChevronRight className="h-5 w-5 text-amber" />
            </div>
            <div className="panel mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-abyss text-left">
                    <th className="px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Method
                    </th>
                    <th className="px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Endpoint
                    </th>
                    <th className="px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((e) => (
                    <tr key={e.method + e.path} className="border-b border-line/50 last:border-0">
                      <td className="whitespace-nowrap px-4 py-3">
                        <MethodChip method={e.method} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-soft">
                        {e.path}
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-soft">{e.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </RevealGroup>

        <div className="pt-4 text-center">
          <Link to="/dashboard" className="btn btn-primary">
            Open the workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
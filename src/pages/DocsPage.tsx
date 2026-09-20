import { Link } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-stone-900 text-stone-100 font-mono text-xs md:text-sm rounded-2xl p-5 overflow-x-auto leading-relaxed">
      {code}
    </pre>
  );
}

const endpoints = [
  {
    method: "GET",
    path: "/api/products",
    desc: "List all products in the catalog",
  },
  {
    method: "POST",
    path: "/api/products",
    desc: "Create or update a product",
  },
  {
    method: "DELETE",
    path: "/api/products/:id",
    desc: "Delete a product by SKU",
  },
  {
    method: "POST",
    path: "/api/products/reset",
    desc: "Reset catalog to defaults or a provided list",
  },
  {
    method: "POST",
    path: "/api/analyze-heuristic",
    desc: "Run deterministic heuristic pricing on a product",
  },
  {
    method: "POST",
    path: "/api/analyze-ai",
    desc: "Run Gemini AI cognitive pricing on a product",
  },
  {
    method: "POST",
    path: "/api/contact",
    desc: "Submit a contact form message",
  },
];

const methods = {
  GET: "bg-emerald-50 text-emerald-600 border-emerald-200",
  POST: "bg-blue-50 text-blue-600 border-blue-200",
  DELETE: "bg-stone-100 text-stone-500 border-stone-200",
};

export default function DocsPage() {
  usePageMeta("Documentation — OptimaRed");

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative px-6 py-20 md:py-28 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            <Terminal className="w-3 h-3" />
            Documentation
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-stone-900">
            How It Works
          </h1>
          <p className="text-stone-500 text-lg mt-4 max-w-2xl">
            Everything you need to get products, rules, and the AI agent running.
          </p>
        </div>
      </section>

      <div className="py-20 px-6 max-w-4xl mx-auto space-y-16">
        {/* Getting started */}
        <RevealGroup className="space-y-6">
          <section>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 mb-5">
              Getting Started
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-stone-800 mb-2">1. Fetch the catalog</h3>
                <CodeBlock
                  code={`curl ${"`"}https://your-app.vercel.app/api/products${"`"}`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-2">2. Add or update a product</h3>
                <CodeBlock
                  code={`curl -X POST ${"`"}https://your-app.vercel.app/api/products${"`"} \\
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
                <h3 className="font-semibold text-stone-800 mb-2">3. Analyze pricing</h3>
                <CodeBlock
                  code={`curl -X POST ${"`"}https://your-app.vercel.app/api/analyze-heuristic${"`"} \\
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

        {/* Configuring AI agent */}
        <RevealGroup className="space-y-6">
          <section>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 mb-5">
              Configuring the AI Agent
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-4">
              The Gemini agent follows your custom system prompt as its primary directive.
              Pass <span className="font-mono text-blue-600">systemInstruction</span> to set
              pricing philosophy, guardrails, and brand positioning.
            </p>
            <CodeBlock
              code={`curl -X POST ${"`"}https://your-app.vercel.app/api/analyze-ai${"`"} \\
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

        {/* Heuristic rules */}
        <RevealGroup className="space-y-6">
          <section>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 mb-5">
              Understanding Heuristic Rules
            </h2>
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <ul className="space-y-4 text-sm text-stone-600">
                <li>
                  <span className="font-semibold text-stone-800">Accelerating demand + low stock</span> — surge markup to capture premium margin.
                </li>
                <li>
                  <span className="font-semibold text-stone-800">Decelerating demand + high stock</span> — defensive markdown, never below COGS + 5%.
                </li>
                <li>
                  <span className="font-semibold text-stone-800">High stock only</span> — incremental markdown to turn inventory faster.
                </li>
                <li>
                  <span className="font-semibold text-stone-800">Low stock only</span> — small surge to slow depletion and avoid stockouts.
                </li>
                <li>
                  <span className="font-semibold text-stone-800">Stable conditions</span> — align toward target margin where competitors allow.
                </li>
              </ul>
              <p className="text-xs text-stone-400 mt-5 font-mono">
                Every recommendation respects a safety price floor of COGS + 5%, unless explicit liquidation is requested.
              </p>
            </div>
          </section>
        </RevealGroup>

        {/* Market events */}
        <RevealGroup className="space-y-6">
          <section>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 mb-5">
              Market Events & Simulation
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-4">
              Simulate geopolitical, currency, and supply shocks to stress-test pricing
              before they hit your storefront. Send the active event context along with any
              product analysis and the agent will fold it into its reasoning.
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

        {/* API reference */}
        <RevealGroup className="space-y-6">
          <section>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 mb-5">
              API Reference
            </h2>
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-left">
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">Method</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">Endpoint</th>
                    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((e) => (
                    <tr key={e.method + e.path} className="border-b border-stone-100 last:border-0">
                      <td className="px-4 py-3">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${methods[e.method as keyof typeof methods] || methods.GET}`}>
                          {e.method}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-stone-700 whitespace-nowrap">{e.path}</td>
                      <td className="px-4 py-3 text-stone-500 text-xs">{e.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </RevealGroup>

        <div className="text-center pt-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-colors"
          >
            Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
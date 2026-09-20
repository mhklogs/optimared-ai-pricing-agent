import { Link } from "react-router-dom";
import {
  Target,
  BarChart3,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

const team = [
  {
    image: "/images/team-1.svg",
    name: "Alex Morgan",
    title: "CEO",
    bio: "Former retail analytics lead. Believes pricing is the highest-leverage decision a store makes.",
  },
  {
    image: "/images/team-2.svg",
    name: "Priya Sharma",
    title: "CTO",
    bio: "Ex-forecasting engineer. Turns messy market signals into deterministic, auditable systems.",
  },
  {
    image: "/images/team-3.svg",
    name: "Sara Chen",
    title: "Head of Product",
    bio: "Spent a decade shipping pricing tools for e-commerce teams that hate spreadsheets.",
  },
  {
    image: "/images/team-4.svg",
    name: "Marcus Okafor",
    title: "Lead Engineer",
    bio: "Builds the AI agent layer — prompt pipelines, structured outputs, and reliable APIs.",
  },
];

const values = [
  {
    icon: BarChart3,
    title: "Data-Driven",
    desc: "Every price change comes with a rationale grounded in inventory, competitors, and market context — never a gut feeling.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent",
    desc: "Rule engines are readable, AI output is structured, and safety floors always protect your margin.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-First",
    desc: "We optimize for retailers, not platforms. You keep control of strategy and guardrails.",
  },
];

export default function AboutPage() {
  usePageMeta("About — OptimaRed");

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative px-6 py-20 md:py-28 max-w-6xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-stone-900">
            The Team Behind OptimaRed
          </h1>
          <p className="text-stone-500 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            A small team obsessed with one question: why do retailers still price by hand?
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <RevealGroup>
          <div className="bg-white border border-stone-200 rounded-2xl p-8 md:p-12 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-stone-900 max-w-2xl mx-auto">
              Making dynamic pricing accessible to every e-commerce team
            </h2>
            <p className="text-stone-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              Dynamic pricing used to live in enterprise tooling with six-figure licenses
              and armies of consultants. OptimaRed exists to give any retailer the same
              compounding advantage — decision-grade rules, a reasoning AI agent, and full
              transparency into every price move.
            </p>
          </div>
        </RevealGroup>
      </section>

      {/* Team */}
      <section className="py-4 px-6 max-w-6xl mx-auto pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
            Meet the Team
          </h2>
          <p className="text-stone-500 text-lg mt-3">Small team, sharp focus.</p>
        </div>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-all"
            >
              <img
                src={m.image}
                alt={m.title}
                className="w-24 h-24 rounded-2xl mx-auto mb-4"
              />
              <h3 className="font-display font-bold text-lg text-stone-800">{m.name}</h3>
              <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mt-1">
                {m.title}
              </div>
              <p className="text-sm text-stone-500 mt-3 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* Values */}
      <section className="pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-stone-900">
            What We Value
          </h2>
        </div>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-800">{v.title}</h3>
              <p className="text-sm text-stone-500 mt-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto bg-stone-900 rounded-3xl px-6 py-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            Want to Talk Pricing?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold mt-6 shadow-lg shadow-blue-600/30 transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
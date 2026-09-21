import { Link } from "react-router-dom";
import { Target, BarChart3, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

const team = [
  {
    image: "/images/team-1.svg",
    name: "Alex Morgan",
    title: "Pricing Strategy",
    bio: "Former retail analytics lead. Believes pricing is the highest-leverage decision a store makes every single day.",
  },
  {
    image: "/images/team-2.svg",
    name: "Priya Sharma",
    title: "Pricing Engine",
    bio: "Ex-forecasting engineer. Turns messy market signals into deterministic, auditable pricing systems.",
  },
  {
    image: "/images/team-3.svg",
    name: "Sara Chen",
    title: "Product",
    bio: "Spent a decade shipping pricing tools for e-commerce teams that hate spreadsheets.",
  },
  {
    image: "/images/team-4.svg",
    name: "Marcus Okafor",
    title: "AI Agent Layer",
    bio: "Builds the agent stack — prompt pipelines, structured outputs, and reliable pricing APIs.",
  },
];

const values = [
  {
    icon: BarChart3,
    title: "Margin-First",
    desc: "Every price change comes with a rationale grounded in inventory, competitors, and market context — never a gut feeling.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent",
    desc: "Rule engines are readable, AI output is structured, and safety floors always protect your margin.",
  },
  {
    icon: HeartHandshake,
    title: "Operator-Owned",
    desc: "You keep control of strategy, guardrails, and every final call. We optimize for your store, not the platform.",
  },
];

export default function AboutPage() {
  usePageMeta(
    "About — Optimared",
    "The team behind Optimared, an AI dynamic pricing agent for e-commerce margins."
  );

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hud-grid" />
          <div className="aurora -top-24 right-[18%] h-64 w-64 bg-[#FFC53D]/12" />
        </div>
        <div className="relative px-6 py-20 text-center md:py-28">
          <p className="eyebrow-amber">why optimared</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase tracking-tight md:text-6xl">
            Pricing by hand is{" "}
            <span className="text-amber">how margin leaks</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            A small team obsessed with one question: why do e-commerce teams still
            reprice in spreadsheets while the market moves every few hours?
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-6">
        <RevealGroup>
          <div className="accent-edge panel p-8 text-center md:p-12">
            <span className="logo-tile mx-auto flex h-12 w-12 items-center justify-center">
              <Target className="h-6 w-6 text-amber" />
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-2xl uppercase tracking-tight md:text-3xl">
              Dynamic pricing for teams that ship, not just enterprises with consultants
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Optimared exists to give any retailer the same compounding advantage:
              decision-grade pricing rules, a reasoning AI analyst, and full
              transparency into every price move. Built for the operator who has a
              catalog to manage tonight, not a six-month rollout.
            </p>
          </div>
        </RevealGroup>
      </section>

      {/* Team */}
      <section className="border-y border-line/60 bg-abyss py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <RevealGroup>
            <p className="eyebrow-amber text-center">the team</p>
            <h2 className="mt-2 text-center font-display text-3xl uppercase tracking-tight md:text-4xl">
              Small team, sharp focus
            </h2>
          </RevealGroup>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <RevealGroup key={m.name}>
                <div className="panel h-full p-6 text-center">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="mx-auto mb-4 h-24 w-24 rounded-2xl"
                  />
                  <h3 className="font-head text-lg font-semibold">{m.name}</h3>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber">
                    {m.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
                </div>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-6">
        <RevealGroup>
          <p className="eyebrow-amber text-center">what we value</p>
          <h2 className="mt-2 text-center font-display text-3xl uppercase tracking-tight md:text-4xl">
            The walls we refuse to cut
          </h2>
        </RevealGroup>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <RevealGroup key={v.title}>
                <div className="panel h-full p-6">
                  <span className="logo-tile flex h-11 w-11 items-center justify-center">
                    <Icon className="h-5 w-5 text-amber" />
                  </span>
                  <h3 className="mt-4 font-head text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.desc}</p>
                </div>
              </RevealGroup>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 md:px-6">
        <RevealGroup>
          <div className="accent-edge panel mx-auto max-w-4xl p-8 text-center md:p-12">
            <h2 className="mx-auto font-display text-2xl uppercase tracking-tight md:text-4xl">
              Want to talk pricing?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <Link to="/contact" className="btn btn-primary">
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="btn btn-ghost">
                Try it free
              </Link>
            </div>
          </div>
        </RevealGroup>
      </section>
    </div>
  );
}
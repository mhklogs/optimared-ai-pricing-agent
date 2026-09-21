import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import RevealGroup from "../components/RevealGroup";
import usePageMeta from "../lib/usePageMeta";

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "Account data: name, email address, and password when you create an account.",
      "Product data: the SKU catalog you load into the platform, including prices, costs, margins, inventory, and competitor price inputs.",
      "Usage data: how you interact with the dashboard, including feature usage, logs, and API requests, to improve the product.",
      "Contact data: information you submit through our contact form (name, email, subject, and message).",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "To operate the platform: run pricing analysis, sync channels, and execute the agent you configure.",
      "To communicate with you: respond to inquiries, share product and policy updates, and provide support.",
      "To secure and improve the service: monitor for abuse, debug errors, and measure performance.",
      "We never sell your personal data or your pricing intelligence to third parties.",
    ],
  },
  {
    title: "3. Information Sharing",
    body: [
      "We may share data with service providers (e.g., hosting and infrastructure) strictly as needed to operate the service.",
      "We share data with third parties only when required by law, to protect rights and safety, or with your explicit consent.",
      "AI analysis of your products is sent to our AI provider solely to generate pricing recommendations you request.",
    ],
  },
  {
    title: "4. Cookies & Tracking",
    body: [
      "We use essential cookies to keep you signed in and to keep the app functional.",
      "We use lightweight analytics to understand aggregate usage; you can block these in your browser without losing core functionality.",
      "We do not use cookies for cross-site advertising profiling.",
    ],
  },
  {
    title: "5. Data Retention & Security",
    body: [
      "We retain product and account data for as long as your account is active, plus a reasonable period for backups.",
      "You may delete individual products at any time or request full account deletion by contacting us.",
      "Data is encrypted in transit and at rest, and access is limited to authorized personnel.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Depending on your jurisdiction, you may have the right to access, correct, export, or delete your personal data.",
      "To exercise any of these rights, email hello@optimared.ai and we will respond within 30 days.",
      "You may also object to or restrict certain processing by contacting us.",
    ],
  },
];

export default function PrivacyPage() {
  usePageMeta(
    "Privacy Policy — Optimared",
    "How Optimared collects, uses, and protects information on the pricing platform."
  );

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/60">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hud-grid" />
          <div className="aurora -top-24 left-[20%] h-64 w-64 bg-[#FFC53D]/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber">
            <ShieldCheck className="h-3.5 w-3.5" />
            Privacy Policy
          </span>
          <h1 className="mt-6 font-display text-4xl uppercase tracking-tight md:text-5xl">
            Your data, your pricing
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Last updated: September 17, 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <RevealGroup className="space-y-8">
          <p className="leading-relaxed text-ink-soft">
            This Privacy Policy explains how Optimared ("we", "our", "us")
            collects, uses, and protects information when you use our dynamic
            pricing platform. It applies to the website, dashboard, and API.
          </p>

          {sections.map((s) => (
            <div key={s.title} className="panel p-7">
              <h2 className="font-head text-xl font-semibold text-ink">{s.title}</h2>
              <ul className="mt-3 space-y-2.5">
                {s.body.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="panel p-7">
            <h2 className="font-head text-xl font-semibold text-ink">7. Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Questions about this policy? Email{" "}
              <span className="font-mono text-amber">hello@optimared.ai</span> and
              we'll get back to you within 24 hours.
            </p>
          </div>
        </RevealGroup>

        <div className="mt-14 text-center">
          <Link to="/" className="btn btn-primary">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
  {
    title: "7. Contact"
  }
];

export default function PrivacyPage() {
  usePageMeta("Privacy Policy — OptimaRed");

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative px-6 py-20 md:py-24 max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-stone-900">
            Privacy Policy
          </h1>
          <p className="text-stone-500 text-lg mt-4">
            Last updated: September 17, 2026
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <RevealGroup className="space-y-8">
          <p className="text-stone-500 leading-relaxed">
            This Privacy Policy explains how OptimaRed ("we", "our", "us") collects, uses,
            and protects information when you use our dynamic pricing platform. It applies
            to the website, dashboard, and API.
          </p>

          {sections.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-stone-200 rounded-2xl p-7 shadow-sm"
            >
              <h2 className="font-display font-bold text-xl text-stone-800 mb-3">{s.title}</h2>
              {s.body ? (
                <ul className="space-y-2.5">
                  {s.body.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-stone-600 leading-relaxed">
                  Questions about this policy? Email{" "}
                  <span className="font-mono text-blue-600">hello@optimared.ai</span> and
                  we'll get back to you within 24 hours.
                </p>
              )}
            </div>
          ))}
        </RevealGroup>

        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-colors"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
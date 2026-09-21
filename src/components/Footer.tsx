import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OptimaredLogo from "./Logo";

const PRODUCT = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Docs", to: "/docs" },
  { label: "Try it free", to: "/dashboard" },
];

const COMPANY = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-abyss px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr] md:items-start">
          <div>
            <OptimaredLogo markSize={44} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              AI dynamic pricing that maximizes margin without killing sales
              velocity. Heuristic rules keep you above your floor; the AI agent
              adds market judgment.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="pulse-dot h-2 w-2 rounded-full bg-amber" />
              Runs on your catalog
            </p>
          </div>

          <nav>
            <p className="font-head text-sm font-semibold text-ink">Product</p>
            <ul className="mt-4 space-y-3">
              {PRODUCT.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-amber"
                  >
                    {l.to === "/dashboard" && <ArrowRight className="h-3.5 w-3.5" />}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="font-head text-sm font-semibold text-ink">Company</p>
            <ul className="mt-4 space-y-3">
              {COMPANY.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-soft transition-colors hover:text-amber"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted">&copy; 2026 Optimared. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Margin-first pricing · no credit card to start
          </p>
        </div>
      </div>
    </footer>
  );
}
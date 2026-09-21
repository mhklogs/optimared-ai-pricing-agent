import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { OptimaredMark } from "./Logo";

const NAV_LINKS = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Docs", to: "/docs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass-strong sticky top-0 z-50 px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Optimared home">
          <OptimaredMark size={38} />
          <span className="leading-none">
            <span className="block font-display text-[18px] text-ink">Optimared</span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-amber">
              AI pricing agent
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-amber" : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/dashboard" className="btn btn-primary !px-5 py-2.5 text-sm">
            Try it free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="-mr-2 rounded-lg p-2.5 transition-colors hover:bg-black/5 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-ink" />
          ) : (
            <Menu className="h-6 w-6 text-ink" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-strong absolute left-0 right-0 top-full border-t border-line px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive ? "text-amber" : "text-ink-soft hover:bg-black/5 hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary mt-2 w-full text-sm"
            >
              Try it free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
    <header className="bg-white border-b border-stone-200 py-4 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-display font-extrabold text-xl shadow-md shadow-blue-500/20">
            O
          </div>
          <div>
            <span className="font-display font-bold text-lg text-stone-800 tracking-tight">
              OptimaRed
            </span>
            <span className="ml-2 bg-blue-50 text-blue-600 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-blue-200/50">
              AI Co-Pilot
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-stone-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Open Dashboard
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-stone-700" />
          ) : (
            <Menu className="w-5 h-5 text-stone-700" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-200 shadow-lg px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-stone-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors text-center"
          >
            Open Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}

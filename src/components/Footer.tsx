import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Docs", to: "/docs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-display font-extrabold text-sm shadow-md shadow-blue-500/20">
              O
            </div>
            <span className="font-display font-bold text-base text-stone-800 tracking-tight">
              OptimaRed
            </span>
          </div>
          <p className="text-sm text-stone-500 leading-relaxed max-w-xs">
            AI-Powered Dynamic Pricing for E-commerce
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-stone-500 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-right">
          <p className="text-xs text-stone-400">
            &copy; 2026 OptimaRed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

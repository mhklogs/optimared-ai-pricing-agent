import React from "react";
import { Product } from "../types";
import { Activity, Download, Printer, TriangleAlert } from "lucide-react";
import { getMargin, getMarginHealth, buildCatalogReportCsv } from "../lib/margin";
import { downloadCsv } from "../lib/csv";

interface MarginHealthPanelProps {
  products: Product[];
  currencySymbol: string;
}

const HEALTH_BADGE: Record<string, string> = {
  healthy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  watch: "bg-amber-50 text-amber-700 border-amber-200",
  risk: "bg-rose-50 text-rose-700 border-rose-200",
};

const HEALTH_LABEL: Record<string, string> = {
  healthy: "Healthy",
  watch: "Watch",
  risk: "At Risk",
};

export default function MarginHealthPanel({ products, currencySymbol }: MarginHealthPanelProps) {
  const rows = products.map((product) => {
    const margin = getMargin(product);
    return { product, margin, health: getMarginHealth(product, margin) };
  });

  const avgMargin = rows.length
    ? rows.reduce((acc, r) => acc + r.margin, 0) / rows.length
    : 0;
  const healthyCount = rows.filter((r) => r.health === "healthy").length;
  const watchCount = rows.filter((r) => r.health === "watch").length;
  const riskCount = rows.filter((r) => r.health === "risk").length;

  const handleDownload = () => {
    if (products.length === 0) return;
    downloadCsv("optimared-margin-report.csv", buildCatalogReportCsv(products));
  };

  return (
    <div id="margin-health-panel" className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100 mb-4">
        <h2 className="font-display font-bold text-stone-900 text-base flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-blue-600" />
          Margin Health & Reports
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={products.length === 0}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Download margin report as CSV"
          >
            <Download className="w-3.5 h-3.5" /> Report
          </button>
          <button
            onClick={() => window.print()}
            disabled={products.length === 0}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Print margin health report"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>

      {/* Catalog-level summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-stone-50 border border-stone-100 p-3 rounded-xl text-center">
          <span className="text-xs text-stone-400 block font-medium">Avg margin</span>
          <span className="text-lg font-display font-bold text-stone-900 block mt-1">{avgMargin.toFixed(1)}%</span>
        </div>
        <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl text-center">
          <span className="text-xs text-emerald-600 block font-medium">Healthy</span>
          <span className="text-lg font-display font-bold text-emerald-700 block mt-1">{healthyCount}</span>
        </div>
        <div className="bg-rose-50/60 border border-rose-100 p-3 rounded-xl text-center">
          <span className="text-xs text-rose-600 block font-medium">At risk</span>
          <span className="text-lg font-display font-bold text-rose-700 block mt-1">{riskCount}</span>
        </div>
      </div>

      {watchCount > 0 && (
        <div className="flex items-center gap-2 bg-amber-50/60 border border-amber-100 text-amber-700 text-xs px-3 py-2 rounded-xl mb-4">
          <TriangleAlert className="w-4 h-4 shrink-0" />
          <span className="font-medium">
            {watchCount} SKU(s) are within 5pts of their target margin — monitor closely.
          </span>
        </div>
      )}

      {/* Per-SKU list */}
      <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
        {rows.length === 0 ? (
          <p className="text-xs text-stone-400 italic py-6 text-center">
            No SKUs in the catalog yet — launch a product to see margin health.
          </p>
        ) : (
          rows.map(({ product, margin, health }) => {
            const targetPct = Math.min(100, product.target_margin > 0 ? (margin / product.target_margin) * 100 : 0);
            const barColor =
              health === "healthy" ? "bg-emerald-500" : health === "watch" ? "bg-amber-500" : "bg-rose-500";
            return (
              <div
                key={product.id}
                className="p-3 rounded-xl border border-stone-100 bg-stone-50/70 hover:border-stone-200 transition-colors flex flex-col sm:flex-row sm:items-center gap-2.5"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-stone-900 truncate">{product.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${HEALTH_BADGE[health]}`}>
                      {HEALTH_LABEL[health]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="font-mono text-[10px] text-stone-400 truncate">{product.id}</span>
                    <span className="font-mono text-[10px] text-stone-500 shrink-0">
                      {currencySymbol}{product.current_price.toFixed(2)} · {margin.toFixed(1)}% vs {product.target_margin}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-200 mt-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${targetPct}%` }} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
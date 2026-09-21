import React from "react";
import { Product } from "../types";
import { Download, Printer, TriangleAlert } from "lucide-react";
import { getMargin, getMarginHealth, buildCatalogReportCsv } from "../lib/margin";
import { downloadCsv } from "../lib/csv";

interface MarginHealthPanelProps {
  products: Product[];
  currencySymbol: string;
}

const HEALTH_TEXT: Record<string, string> = {
  healthy: "text-emerald-600",
  watch: "text-amber-600",
  risk: "text-rose-600",
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
    <div id="margin-health-panel" className="bg-white border border-stone-200 rounded-2xl p-6 lg:p-7 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100">
        <h2 className="font-display font-bold text-stone-900 text-lg">
          Margin health
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={products.length === 0}
            className="text-sm font-semibold px-3.5 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Download margin report as CSV"
          >
            <Download className="w-4 h-4" /> Report
          </button>
          <button
            onClick={() => window.print()}
            disabled={products.length === 0}
            className="text-sm font-semibold px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Print margin health report"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      {/* Catalog-level summary */}
      <div className="grid grid-cols-3 divide-x divide-stone-100 border-b border-stone-100 py-5">
        <div className="px-4 text-center">
          <p className="text-base font-medium text-stone-900">{avgMargin.toFixed(1)}%</p>
          <p className="text-sm text-stone-400 mt-1">Average margin</p>
        </div>
        <div className="px-4 text-center">
          <p className="text-base font-medium text-emerald-700">{healthyCount}</p>
          <p className="text-sm text-stone-400 mt-1">Healthy</p>
        </div>
        <div className="px-4 text-center">
          <p className="text-base font-medium text-rose-700">{riskCount}</p>
          <p className="text-sm text-stone-400 mt-1">At risk</p>
        </div>
      </div>

      {watchCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50/60 border border-amber-100 text-amber-800 text-sm px-4 py-3 rounded-xl mt-5">
          <TriangleAlert className="w-5 h-5 shrink-0" />
          <span className="font-medium">
            {watchCount} SKU{watchCount === 1 ? " is" : "s are"} within 5 points of the target margin — worth a look.
          </span>
        </div>
      )}

      {/* Per-SKU list */}
      <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1 mt-5">
        {rows.length === 0 ? (
          <p className="text-sm text-stone-400 italic py-8 text-center">
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
                className="p-4 rounded-xl border border-stone-100 bg-stone-50/60 hover:border-stone-200 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-base font-semibold text-stone-900 truncate">{product.name}</h4>
                  <span className={`text-sm font-medium shrink-0 ${HEALTH_TEXT[health]}`}>
                    {HEALTH_LABEL[health]}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 mt-1.5">
                  <span className="text-sm text-stone-400 truncate">{product.id}</span>
                  <span className="text-sm text-stone-600 shrink-0">
                    {currencySymbol}{product.current_price.toFixed(2)} · {margin.toFixed(1)}% vs target {product.target_margin}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-stone-200 mt-3 overflow-hidden">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${targetPct}%` }} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
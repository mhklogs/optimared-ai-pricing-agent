import React from "react";
import { PricingAnalysis, Product } from "../types";
import { Clock, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

export interface LogEntry {
  timestamp: string;
  productName: string;
  productId: string;
  oldPrice: number;
  newPrice: number;
  strategy: string;
  driver: string;
  engine: "Heuristic" | "Gemini AI";
  rationale: string;
}

interface PricingLogsProps {
  logs: LogEntry[];
  onClear: () => void;
  currencySymbol: string;
}

export default function PricingLogs({ logs, onClear, currencySymbol }: PricingLogsProps) {
  const getBadgeColor = (strategy: string) => {
    switch (strategy) {
      case "Surge":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Markdown":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Competitor Match":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Liquidation":
        return "bg-rose-100 text-rose-700 border-rose-300 font-bold";
      default:
        return "bg-stone-100 text-stone-700 border-stone-200";
    }
  };

  const getEngineBadgeColor = (engine: string) => {
    return engine === "Gemini AI"
      ? "bg-blue-50 text-blue-600 border-blue-200 font-medium"
      : "bg-stone-100 text-stone-700 border-stone-200";
  };

  return (
    <div id="pricing-logs-container" className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="font-display font-semibold text-stone-800 text-base">
            Live Pricing Ledger
          </h3>
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            Clear Ledger
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto max-h-[420px] space-y-3.5 pr-1">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-stone-400 text-center space-y-2">
            <RefreshCw className="w-8 h-8 text-stone-300 animate-spin-slow" />
            <p className="text-sm font-medium">Ledger is empty.</p>
            <p className="text-xs max-w-xs text-stone-400">
              Run heuristic optimizations or trigger AI Pricing decisions above to populate market events.
            </p>
          </div>
        ) : (
          logs.map((log, index) => {
            const pct = ((log.newPrice - log.oldPrice) / log.oldPrice) * 100;
            const isUp = pct > 0;

            return (
              <div
                key={index}
                className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col gap-2 hover:border-stone-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs text-stone-800 font-semibold font-display block">
                      {log.productName}
                    </span>
                    <span className="text-xs text-stone-400 font-mono block">
                      ID: {log.productId} • {log.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getEngineBadgeColor(log.engine)}`}>
                      {log.engine}
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${getBadgeColor(log.strategy)}`}>
                      {log.strategy}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded border border-stone-200/60 text-sm">
                  <span className="text-stone-500 text-xs">Price Shift</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-stone-400">{currencySymbol}{log.oldPrice.toFixed(2)}</span>
                    <span className="text-stone-400">➔</span>
                    <span className="text-stone-800 font-semibold">{currencySymbol}{log.newPrice.toFixed(2)}</span>
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.25 rounded ${
                        pct === 0
                          ? "bg-stone-200 text-stone-600"
                          : isUp
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {pct === 0 ? "" : isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {pct > 0 ? "+" : ""}
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-600 leading-relaxed italic bg-white p-2 rounded border border-dashed border-stone-200">
                  <span className="font-semibold not-italic text-stone-700">Driver ({log.driver}):</span> {log.rationale}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

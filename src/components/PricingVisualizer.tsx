import React from "react";
import { Product, PricingAnalysis } from "../types";
import { Shield, TrendingUp, Info } from "lucide-react";

interface PricingVisualizerProps {
  product: Product;
  heuristicResult: PricingAnalysis | null;
  aiResult: PricingAnalysis | null;
  isAiLoading: boolean;
  currencySymbol: string;
}

export default function PricingVisualizer({
  product,
  heuristicResult,
  aiResult,
  isAiLoading,
  currencySymbol,
}: PricingVisualizerProps) {
  const { current_price, cogs, competitor_prices } = product;

  // Calculate stats
  const safetyFloor = cogs * 1.05;
  const compAvg = competitor_prices.length > 0
    ? competitor_prices.reduce((a, b) => a + b, 0) / competitor_prices.length
    : current_price;
  const lowestComp = competitor_prices.length > 0
    ? Math.min(...competitor_prices)
    : current_price;
  const highestComp = competitor_prices.length > 0
    ? Math.max(...competitor_prices)
    : current_price;

  // Determine scale ranges for SVG plotting
  const allValues = [
    cogs,
    safetyFloor,
    current_price,
    compAvg,
    lowestComp,
    highestComp,
    ...(competitor_prices || []),
    ...(heuristicResult ? [heuristicResult.recommended_price] : []),
    ...(aiResult ? [aiResult.recommended_price] : []),
  ];

  const minVal = Math.min(...allValues) * 0.9;
  const maxVal = Math.max(...allValues) * 1.1;
  const range = maxVal - minVal;

  const getPercent = (val: number) => {
    return ((val - minVal) / range) * 100;
  };

  const formatCurrency = (val: number) => {
    return `${currencySymbol}${val.toFixed(2)}`;
  };

  return (
    <div id="pricing-visualizer-container" className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-stone-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Market Alignment Spectrum
        </h3>
        <span className="text-xs text-stone-400 font-mono">
          Interactive Benchmarking
        </span>
      </div>

      {/* Benchmark Slider Scale */}
      <div className="relative pt-8 pb-12 px-2 bg-stone-50 rounded-lg border border-stone-100 mb-6 overflow-hidden">
        {/* Horizontal axis line */}
        <div className="absolute left-4 right-4 h-1.5 bg-stone-200 rounded-full top-1/2 transform -translate-y-1/2" />

        {/* Competitor Zone shading */}
        {competitor_prices.length > 0 && (
          <div
            className="absolute h-4 bg-blue-100/30 border border-dashed border-blue-200 top-1/2 transform -translate-y-1/2 rounded"
            style={{
              left: `${getPercent(lowestComp)}%`,
              right: `${100 - getPercent(highestComp)}%`,
            }}
            title="Competitor Range"
          />
        )}

        {/* COGS & Floor Indicators */}
        <div
          className="absolute h-full flex flex-col justify-between items-center top-0"
          style={{ left: `${getPercent(cogs)}%` }}
        >
          <div className="w-0.5 h-1/2 bg-stone-400/40 border-l border-dashed border-stone-400" />
          <span className="text-xs font-mono text-stone-400 font-medium translate-y-2">
            COGS: {formatCurrency(cogs)}
          </span>
        </div>

        <div
          className="absolute h-full flex flex-col justify-between items-center top-0"
          style={{ left: `${getPercent(safetyFloor)}%` }}
        >
          <div className="w-0.5 h-3/4 bg-amber-400/80" />
          <span className="text-xs font-mono text-amber-600 font-medium bg-amber-50 px-1 rounded border border-amber-100 -translate-y-2 translate-x-1.5">
            Floor: {formatCurrency(safetyFloor)}
          </span>
        </div>

        {/* Competitor Price Points (dots) */}
        {competitor_prices.map((price, idx) => (
          <div
            key={idx}
            className="absolute group z-10 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${getPercent(price)}%` }}
          >
            <div className="w-3 h-3 rounded-full bg-stone-400 border-2 border-white shadow group-hover:scale-125 transition-transform" />
            <div className="absolute opacity-0 group-hover:opacity-100 bg-stone-800 text-white text-xs py-0.5 px-1.5 rounded shadow-lg pointer-events-none -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20 transition-opacity">
              Competitor {idx + 1}: {formatCurrency(price)}
            </div>
          </div>
        ))}

        {/* Current Active Price */}
        <div
          className="absolute group z-20 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${getPercent(current_price)}%` }}
        >
          <div className="w-4 h-4 rounded-full bg-stone-800 border-2 border-white shadow flex items-center justify-center" />
          <div className="absolute bg-stone-800 text-white text-xs py-0.5 px-1.5 rounded shadow pointer-events-none -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap border border-stone-700">
            Active: {formatCurrency(current_price)}
          </div>
        </div>

        {/* Programmatic Heuristic Recommendation */}
        {heuristicResult && (
          <div
            className="absolute group z-30 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${getPercent(heuristicResult.recommended_price)}%` }}
          >
            <div className="w-5 h-5 rounded bg-amber-500 border-2 border-white flex items-center justify-center shadow-md transform rotate-45 hover:scale-110 transition-transform">
              <span className="text-[8px] font-mono font-bold text-white -rotate-45">H</span>
            </div>
            <div className="absolute bg-amber-500 text-white font-bold text-xs py-0.5 px-1.5 rounded shadow-md pointer-events-none top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Heuristic: {formatCurrency(heuristicResult.recommended_price)}
            </div>
          </div>
        )}

        {/* AI Agent Recommendation */}
        {aiResult && !isAiLoading && (
          <div
            className="absolute group z-30 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${getPercent(aiResult.recommended_price)}%` }}
          >
            <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <span className="text-xs font-mono font-bold text-white">AI</span>
            </div>
            <div className="absolute bg-blue-600 text-white font-bold text-xs py-0.5 px-1.5 rounded shadow-md pointer-events-none -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              AI Recommendation: {formatCurrency(aiResult.recommended_price)}
            </div>
          </div>
        )}

        {/* Loading AI Placeholder */}
        {isAiLoading && (
          <div
            className="absolute z-30 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `50%` }}
          >
            <div className="w-5 h-5 rounded-full border border-blue-500 border-t-transparent animate-spin" />
            <div className="absolute bg-blue-50 text-blue-600 text-xs py-0.5 px-1.5 rounded pointer-events-none -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap border border-blue-200">
              AI Analyzing...
            </div>
          </div>
        )}
      </div>

      {/* Comparison Insights Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Safety Margins status */}
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 flex items-start gap-3">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-stone-500 font-medium block">Price Safety Buffer</span>
            <div className="text-sm font-mono text-stone-800 mt-1">
              Floor Guard is <span className="text-emerald-600 font-bold">ACTIVE</span> (at {formatCurrency(safetyFloor)})
            </div>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Rules strictly restrict dynamic recommendations from breaking COGS + 5% to shield core operating costs.
            </p>
          </div>
        </div>

        {/* Competitor position status */}
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-stone-500 font-medium block">Competitor Position Overview</span>
            <div className="text-sm font-mono text-stone-800 mt-1">
              Spread: {formatCurrency(lowestComp)} – {formatCurrency(highestComp)}
            </div>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Competitor Benchmark Average is <span className="text-stone-600 font-medium">{formatCurrency(compAvg)}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

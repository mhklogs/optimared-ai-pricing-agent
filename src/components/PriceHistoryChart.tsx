import React from "react";
import { PriceHistoryPoint } from "../types";
import { History } from "lucide-react";

interface PriceHistoryChartProps {
  points: PriceHistoryPoint[];
  currencySymbol: string;
  productName: string;
}

const ENGINE_COLORS: Record<PriceHistoryPoint["engine"], string> = {
  "Heuristic": "#d97706", // amber-600
  "Gemini AI": "#FFC53D", // amber accent
  "Manual": "#78716c", // stone-500
};

const W = 640;
const H = 260;
const PAD_L = 66;
const PAD_R = 24;
const PAD_T = 24;
const PAD_B = 38;

function formatTimestamp(timestamp: string): string {
  const match = timestamp.match(/(\d{1,2}):(\d{2}):(\d{2})/);
  if (!match) {
    const date = new Date();
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  }
  return `${Number(match[1]) % 12 || 12}:${match[2]}`;
}

export default function PriceHistoryChart({ points, currencySymbol, productName }: PriceHistoryChartProps) {
  if (points.length < 2) {
    return (
      <div id="price-history-chart" className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-stone-800 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            Price History
          </h3>
          <span className="text-xs text-stone-400 font-mono">{productName}</span>
        </div>
        <div className="py-10 flex flex-col items-center justify-center text-center text-stone-400 border border-dashed border-stone-200 rounded-xl bg-stone-50/50 space-y-2">
          <History className="w-8 h-8 text-stone-300" />
          <p className="text-sm font-medium text-stone-600">No price changes recorded yet</p>
          <p className="text-xs max-w-xs text-stone-400">
            Apply a heuristic rule, an AI recommendation, or save a manual edit to start tracking this SKU's pricing trajectory.
          </p>
        </div>
      </div>
    );
  }

  const prices = points.map((pt) => pt.price);
  const minV = Math.min(...prices);
  const maxV = Math.max(...prices);
  const span = maxV - minV || maxV * 0.1 || 1;
  const lo = minV - span * 0.12;
  const hi = maxV + span * 0.12;
  const range = hi - lo || 1;

  const x = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (points.length - 1);
  const y = (v: number) => PAD_T + ((hi - v) / range) * (H - PAD_T - PAD_B);

  const linePath = points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(pt.price).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${x(points.length - 1).toFixed(1)} ${H - PAD_B} L ${x(0).toFixed(1)} ${H - PAD_B} Z`;

  const ticks = [0.12, 0.5, 0.88];
  const labelStep = Math.max(1, Math.ceil(points.length / 6));
  const fmt = (v: number) => `${currencySymbol}${v.toFixed(2)}`;

  return (
    <div id="price-history-chart" className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="font-display font-semibold text-stone-800 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-600" />
          Price History
        </h3>
        <span className="text-xs text-stone-400 font-mono truncate max-w-[180px]">{productName}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3 text-[10px] font-semibold text-stone-500">
        {(["Heuristic", "Gemini AI", "Manual"] as const).map((engine) => (
          <span key={engine} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ENGINE_COLORS[engine] }} />
            {engine}
          </span>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Price history for ${productName}`}>
        <defs>
          <linearGradient id="price-history-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC53D" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFC53D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gridlines + y-axis labels */}
        {ticks.map((t, idx) => {
          const gy = PAD_T + (1 - t) * (H - PAD_T - PAD_B);
          const gv = lo + range * t;
          return (
            <g key={idx}>
              <line x1={PAD_L} y1={gy} x2={W - PAD_R} y2={gy} stroke="rgba(140,160,200,0.16)" strokeWidth="1" strokeDasharray="3 4" />
              <text x={PAD_L - 8} y={gy + 3.5} textAnchor="end" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#6a7593">
                {fmt(gv)}
              </text>
            </g>
          );
        })}

        {/* Area under the line */}
        <path d={areaPath} fill="url(#price-history-area)" />

        {/* Main price line */}
        <path d={linePath} fill="none" stroke="#FFC53D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points with hover tooltips */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle
              cx={x(i)}
              cy={y(pt.price)}
              r="4.5"
              fill={ENGINE_COLORS[pt.engine]}
              stroke="#ffffff"
              strokeWidth="2"
            >
              <title>
                {pt.timestamp} — {fmt(pt.price)} ({pt.engine}){pt.reason ? `\n${pt.reason}` : ""}
              </title>
            </circle>
          </g>
        ))}

        {/* X-axis time labels (subset to avoid crowding) */}
        {points.map((pt, i) => {
          if (i % labelStep !== 0 && i !== points.length - 1) return null;
          return (
            <text
              key={i}
              x={x(i)}
              y={H - 12}
              textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fill="#a8a29e"
            >
              {formatTimestamp(pt.timestamp)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
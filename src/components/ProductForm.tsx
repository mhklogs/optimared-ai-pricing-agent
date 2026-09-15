import React, { useState, useEffect } from "react";
import { Product } from "../types";
import { Plus, Trash2, HelpCircle } from "lucide-react";

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
  currencySymbol: string;
}

export default function ProductForm({
  product,
  onSave,
  onCancel,
  currencySymbol,
}: ProductFormProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [currentPrice, setCurrentPrice] = useState(100);
  const [cogs, setCogs] = useState(60);
  const [targetMargin, setTargetMargin] = useState(25);
  const [inventoryLevel, setInventoryLevel] = useState<"High" | "Medium" | "Low">("Medium");
  const [inventoryUnits, setInventoryUnits] = useState(50);
  const [demandVelocity, setDemandVelocity] = useState<"Accelerating" | "Stable" | "Decelerating">("Stable");
  const [competitorInput, setCompetitorInput] = useState("");
  const [competitorPrices, setCompetitorPrices] = useState<number[]>([]);
  const [connectedChannels, setConnectedChannels] = useState<string[]>([]);

  // Sync state if editing an existing product
  useEffect(() => {
    if (product) {
      setId(product.id);
      setName(product.name);
      setCategory(product.category);
      setCurrentPrice(product.current_price);
      setCogs(product.cogs);
      setTargetMargin(product.target_margin);
      setInventoryLevel(product.inventory_level);
      setInventoryUnits(product.inventory_units);
      setDemandVelocity(product.demand_velocity);
      setCompetitorPrices(product.competitor_prices || []);
      setConnectedChannels(product.connectedChannels || []);
      setCompetitorInput("");
    } else {
      // Create new SKU
      const randomId = `SKU-${Math.floor(100 + Math.random() * 900)}`;
      setId(randomId);
      setName("");
      setCategory("Electronics");
      setCurrentPrice(100);
      setCogs(50);
      setTargetMargin(30);
      setInventoryLevel("Medium");
      setInventoryUnits(40);
      setDemandVelocity("Stable");
      setCompetitorPrices([98, 105, 110]);
      setConnectedChannels([]);
      setCompetitorInput("");
    }
  }, [product]);

  const handleAddCompetitor = () => {
    const val = parseFloat(competitorInput);
    if (!isNaN(val) && val > 0) {
      setCompetitorPrices([...competitorPrices, Number(val.toFixed(2))]);
      setCompetitorInput("");
    }
  };

  const handleRemoveCompetitor = (index: number) => {
    setCompetitorPrices(competitorPrices.filter((_, i) => i !== index));
  };

  const toggleChannel = (channel: string) => {
    setConnectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel) 
        : [...prev, channel]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id,
      name,
      category,
      current_price: Number(currentPrice),
      cogs: Number(cogs),
      target_margin: Number(targetMargin),
      inventory_level: inventoryLevel,
      inventory_units: Number(inventoryUnits),
      demand_velocity: demandVelocity,
      competitor_prices: competitorPrices,
      connectedChannels,
    });
  };

  return (
    <form id="sku-parameters-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-display font-semibold text-slate-800">
          {product ? "Edit SKU Parameters" : "Launch New SKU"}
        </h3>
        <span className="text-xs bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded border border-red-100">
          {id}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SKU Identity & Name */}
        <div>
          <label className="block text-xs text-slate-500 font-medium mb-1">
            Product/SKU Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Horizon ANC Headphones"
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs text-slate-500 font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500"
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>
        </div>
      </div>

      {/* Financial Parameters */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
        <h4 className="text-xs font-mono font-semibold text-slate-500 tracking-wider uppercase">
          Financial Margins & Costing ({currencySymbol})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-500 font-medium mb-1">
              Active Current Price ({currencySymbol})
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={currentPrice}
              onChange={(e) => setCurrentPrice(Math.max(0.01, parseFloat(e.target.value) || 0))}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500 font-mono focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <label className="text-xs text-slate-500 font-medium">
                Cost of Goods (COGS) ({currencySymbol})
              </label>
              <div className="group relative">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                <div className="absolute hidden group-hover:block bg-slate-800 text-white text-[10px] p-2 rounded w-48 shadow-xl -top-12 left-1/2 transform -translate-x-1/2 border border-slate-700 z-50">
                  Absolute price floor. Recommended prices must strictly be ≥ COGS + 5%.
                </div>
              </div>
            </div>
            <input
              type="number"
              step="0.01"
              required
              value={cogs}
              onChange={(e) => setCogs(Math.max(0.01, parseFloat(e.target.value) || 0))}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500 font-mono focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 font-medium mb-1">
              Target Margin (%)
            </label>
            <input
              type="number"
              min="1"
              max="99"
              required
              value={targetMargin}
              onChange={(e) => setTargetMargin(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500 font-mono focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Demand & Inventory State */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
        <h4 className="text-xs font-mono font-semibold text-slate-500 tracking-wider uppercase">
          Inventory & Velocity Metrics
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-500 font-medium mb-1">
              Inventory Units
            </label>
            <input
              type="number"
              min="0"
              required
              value={inventoryUnits}
              onChange={(e) => {
                const val = Math.max(0, parseInt(e.target.value) || 0);
                setInventoryUnits(val);
                if (val <= 15) setInventoryLevel("Low");
                else if (val >= 100) setInventoryLevel("High");
                else setInventoryLevel("Medium");
              }}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500 font-mono focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-500 font-medium mb-1">
              Inventory Level Class
            </label>
            <select
              value={inventoryLevel}
              onChange={(e) => setInventoryLevel(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500"
            >
              <option value="Low">Low (Surge Indicator)</option>
              <option value="Medium">Medium (Balanced)</option>
              <option value="High">High (Markdown Trigger)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-500 font-medium mb-1">
              Demand Velocity Trend
            </label>
            <select
              value={demandVelocity}
              onChange={(e) => setDemandVelocity(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500"
            >
              <option value="Accelerating">Accelerating (Surge)</option>
              <option value="Stable">Stable (Nominal)</option>
              <option value="Decelerating">Decelerating (Markdown)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Competitor Benchmark Set */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
        <h4 className="text-xs font-mono font-semibold text-slate-500 tracking-wider uppercase">
          Competitor Prices ({currencySymbol})
        </h4>

        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            placeholder={`Competitor price (e.g. 104.99)`}
            value={competitorInput}
            onChange={(e) => setCompetitorInput(e.target.value)}
            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-red-500 font-mono focus:ring-1 focus:ring-red-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCompetitor();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddCompetitor}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {competitorPrices.length === 0 ? (
            <span className="text-xs text-slate-400 italic">
              No competitors added yet. Dynamic benchmarks will fallback to current price.
            </span>
          ) : (
            competitorPrices.map((price, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-full text-xs font-mono text-red-600"
              >
                {currencySymbol}{price.toFixed(2)}
                <button
                  type="button"
                  onClick={() => handleRemoveCompetitor(idx)}
                  className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Connection Synced Channels */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
        <h4 className="text-xs font-mono font-semibold text-slate-500 tracking-wider uppercase">
          Sync SKU to Sales Channels
        </h4>
        <div className="flex flex-wrap gap-3">
          {['Shopify', 'WooCommerce', 'eBay', 'Amazon'].map((ch) => {
            const isSelected = connectedChannels.includes(ch.toLowerCase());
            return (
              <button
                key={ch}
                type="button"
                onClick={() => toggleChannel(ch.toLowerCase())}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                  isSelected 
                    ? 'bg-red-50 border-red-200 text-red-700 font-semibold' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {ch}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action triggers */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer"
        >
          Save SKU Configuration
        </button>
      </div>
    </form>
  );
}

export interface PriceHistoryPoint {
  timestamp: string;
  price: number;
  engine: "Heuristic" | "Gemini AI" | "Manual";
  reason?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  current_price: number;
  cogs: number;
  target_margin: number; // in percentage, e.g. 25
  inventory_level: 'High' | 'Medium' | 'Low';
  inventory_units: number;
  demand_velocity: 'Accelerating' | 'Stable' | 'Decelerating';
  competitor_prices: number[];
  imageUrl?: string;
  connectedChannels?: string[]; // e.g. ['shopify', 'amazon']
  priceHistory?: PriceHistoryPoint[];
}

export interface PricingAnalysis {
  product_id: string;
  recommended_price: number;
  price_change_percentage: number;
  strategy_applied: 'Surge' | 'Competitor Match' | 'Markdown' | 'Liquidation' | 'Stable';
  primary_driver: 'Inventory' | 'Competitor' | 'Demand Velocity';
  rationale: string;
}

export interface ComparisonResult {
  product: Product;
  heuristic: PricingAnalysis;
  ai?: PricingAnalysis;
  loadingAI?: boolean;
}

export interface StoreChannel {
  id: string;
  name: string;
  connected: boolean;
  syncing: boolean;
  lastSynced?: string;
  icon: string;
  itemCount: number;
}

export interface MarketEvent {
  id: string;
  name: string;
  type: 'politics' | 'currency' | 'supply';
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  metricLabel: string;
  metricValue: string;
  suggestion: string;
}

export interface SystemNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert';
  read: boolean;
  productId?: string;
}

export interface ListingSuggestion {
  id: string;
  productId: string;
  productName: string;
  category: 'SEO' | 'Margin' | 'Stock' | 'Competitor';
  title: string;
  recommendation: string;
  actionLabel: string;
}

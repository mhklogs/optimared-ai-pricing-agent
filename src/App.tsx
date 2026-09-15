import React, { useState, useEffect } from "react";
import { Product, PricingAnalysis, StoreChannel, MarketEvent, SystemNotification, ListingSuggestion } from "./types";
import PricingVisualizer from "./components/PricingVisualizer";
import ProductForm from "./components/ProductForm";
import PricingLogs, { LogEntry } from "./components/PricingLogs";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Percent,
  Layers,
  Zap,
  RotateCcw,
  Edit3,
  Trash2,
  Plus,
  Compass,
  DollarSign,
  Briefcase,
  AlertCircle,
  HelpCircle,
  Activity,
  Award,
  Globe,
  Bell,
  Link2,
  RefreshCw,
  X,
  CheckCircle,
  ArrowRight,
  ChevronRight
} from "lucide-react";

// Baseline catalog items
const BASELINE_PRODUCTS: Product[] = [
  {
    id: "SKU-HZN-80",
    name: "Horizon ANC Headphones",
    category: "Electronics",
    current_price: 220.0,
    cogs: 120.0,
    target_margin: 40,
    inventory_level: "Low",
    inventory_units: 12,
    demand_velocity: "Accelerating",
    competitor_prices: [240.0, 255.0, 230.0],
    connectedChannels: ["shopify", "amazon"],
  },
  {
    id: "SKU-TTN-45",
    name: "Titan Ergonomic Desk Chair",
    category: "Furniture",
    current_price: 310.0,
    cogs: 150.0,
    target_margin: 35,
    inventory_level: "High",
    inventory_units: 145,
    demand_velocity: "Decelerating",
    competitor_prices: [270.0, 260.0, 280.0],
    connectedChannels: ["shopify"],
  },
  {
    id: "SKU-NEB-03",
    name: "Nebula Smart Watch Gen 3",
    category: "Electronics",
    current_price: 149.0,
    cogs: 90.0,
    target_margin: 30,
    inventory_level: "Medium",
    inventory_units: 52,
    demand_velocity: "Stable",
    competitor_prices: [145.0, 150.0, 155.0],
    connectedChannels: ["amazon"],
  },
  {
    id: "SKU-QTM-2TB",
    name: "Quantum SSD Drive 2TB",
    category: "Accessories",
    current_price: 135.0,
    cogs: 80.0,
    target_margin: 45,
    inventory_level: "Low",
    inventory_units: 8,
    demand_velocity: "Accelerating",
    competitor_prices: [140.0, 155.0, 160.0],
    connectedChannels: ["ebay", "shopify"],
  },
  {
    id: "SKU-APX-TR",
    name: "Apex Trail Running Shoes",
    category: "Apparel",
    current_price: 95.0,
    cogs: 45.0,
    target_margin: 50,
    inventory_level: "High",
    inventory_units: 210,
    demand_velocity: "Decelerating",
    competitor_prices: [78.0, 85.0, 82.0],
    connectedChannels: [],
  },
];

const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1.0, label: "USD ($)" },
  { code: "PKR", symbol: "₨", rate: 278.0, label: "PKR (₨)" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)" },
  { code: "GBP", symbol: "£", rate: 0.78, label: "GBP (£)" },
  { code: "JPY", symbol: "¥", rate: 155.0, label: "JPY (¥)" },
  { code: "INR", symbol: "₹", rate: 83.0, label: "INR (₹)" },
  { code: "CAD", symbol: "CA$", rate: 1.36, label: "CAD (C$)" },
  { code: "AUD", symbol: "AU$", rate: 1.50, label: "AUD (A$)" },
];

const REGIONS = [
  { code: "NA", name: "North America" },
  { code: "PK", name: "Pakistan (PK)" },
  { code: "EU", name: "European Union" },
  { code: "UK", name: "United Kingdom" },
  { code: "APAC", name: "Asia-Pacific" },
  { code: "GLOBAL", name: "Global Markets" },
];

const AGENT_PRESETS = [
  {
    name: "Stable Balanced (Default)",
    desc: "Default balanced parameters for normal trade conditions.",
    instruction: "You are an expert AI Dynamic Pricing Analyst. Balance profit margin targets and volume. Ensure current prices align with target margins while responding dynamically to local currency fluctuations and regional import tariffs."
  },
  {
    name: "Premium Maximizer",
    desc: "Maximize profit margins. Avoid discounts unless inventory is very high.",
    instruction: "You are a premium luxury brand guardian and margin maximizer. Your primary objective is to defend high profit margins. Avoid dropping prices unless competitor pricing drops below average and inventory level is 'High'. Keep price increases high (+5% to +15%) when demand is accelerating."
  },
  {
    name: "Market Share Crusader",
    desc: "Aggressively undercut competitors close to safety floor.",
    instruction: "You are a hyper-aggressive e-commerce growth hacking repricer. Your goal is to undercut competitors by 2% to 4% to capture maximum volume and market share. Ignore standard margins and price down aggressively towards the 5% safety floor if inventory is medium/high or demand is stable."
  },
  {
    name: "Inventory Liquidator",
    desc: "Clear stock velocity bottlenecks aggressively.",
    instruction: "You are a clearance and logistics velocity pricing analyst. Prioritize rapid inventory turns. If stock is Medium or High, immediately suggest markdown pricing to liquidate stock. Be conservative about price increases, matching competitor averages directly without premiums."
  }
];

export default function App() {
  // PWA Device-saved local states
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [channels, setChannels] = useState<StoreChannel[]>([
    { id: "shopify", name: "Shopify", connected: true, syncing: false, lastSynced: "Just now", icon: "S", itemCount: 3 },
    { id: "amazon", name: "Amazon", connected: true, syncing: false, lastSynced: "10m ago", icon: "A", itemCount: 2 },
    { id: "woocommerce", name: "WooCommerce", connected: false, syncing: false, icon: "W", itemCount: 0 },
    { id: "ebay", name: "eBay", connected: false, syncing: false, icon: "E", itemCount: 0 },
  ]);

  // Global Configuration
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedRegion, setSelectedRegion] = useState("NA");
  
  // Custom Agent settings state
  const [activeTab, setActiveTab] = useState<"workspace" | "agent">("workspace");
  const [agentInstruction, setAgentInstruction] = useState(
    "You are an expert AI Dynamic Pricing Analyst. Balance profit margin targets and volume. Ensure current prices align with target margins while responding dynamically to local currency fluctuations and regional import tariffs."
  );

  // Native Browser push permission state
  const [deviceNotificationPermission, setDeviceNotificationPermission] = useState<string>("default");

  // Market dynamics simulations
  const [activeEvent, setActiveEvent] = useState<string>("stable");
  const [volatilityTimeline, setVolatilityTimeline] = useState<number[]>([12, 15, 13, 11, 14, 12, 10]);
  const [suggestions, setSuggestions] = useState<ListingSuggestion[]>([]);

  // Interactive popup timeline index state
  const [hoveredTimelineIdx, setHoveredTimelineIdx] = useState<number | null>(null);

  // Live Agent Scraper logs terminal ticker
  const [scraperLogs, setScraperLogs] = useState<string[]>([
    "Crawler: Scraper initialized on default threads.",
    "Monitor: Connected to Shopify channel sync endpoint.",
    "Monitor: Connected to Amazon channel sync endpoint.",
  ]);

  // Pricing analysis
  const [heuristicResult, setHeuristicResult] = useState<PricingAnalysis | null>(null);
  const [aiResult, setAiResult] = useState<PricingAnalysis | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLiquidation, setIsLiquidation] = useState(false);
  const [autoApplyActive, setAutoApplyActive] = useState(false);

  // Notifications drawer and alerts
  const [alertMessage, setAlertMessage] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);

  const triggerAlert = (type: "success" | "error" | "warning", text: string) => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage(null);
    }, 6000);
  };

  // Load from local storage (PWA caching)
  useEffect(() => {
    const cachedProducts = localStorage.getItem("optimared_products");
    const cachedLogs = localStorage.getItem("optimared_logs");
    const cachedNotifications = localStorage.getItem("optimared_notifications");
    const cachedChannels = localStorage.getItem("optimared_channels");
    const cachedCurrency = localStorage.getItem("optimared_currency");
    const cachedRegion = localStorage.getItem("optimared_region");
    const cachedAuto = localStorage.getItem("optimared_autoapply");
    const cachedInstruction = localStorage.getItem("optimared_instruction");

    if (cachedProducts !== null) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      setProducts(BASELINE_PRODUCTS);
      localStorage.setItem("optimared_products", JSON.stringify(BASELINE_PRODUCTS));
    }

    if (cachedLogs) setLogs(JSON.parse(cachedLogs));
    if (cachedNotifications) {
      setNotifications(JSON.parse(cachedNotifications));
    } else {
      const initialAlerts: SystemNotification[] = [
        {
          id: "alert-1",
          timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
          title: "Startup Price Guardian Activated",
          message: "OptimaRed is running and listening to Shopify and Amazon channels.",
          type: "info",
          read: false,
        }
      ];
      setNotifications(initialAlerts);
      localStorage.setItem("optimared_notifications", JSON.stringify(initialAlerts));
    }

    if (cachedChannels) setChannels(JSON.parse(cachedChannels));
    if (cachedCurrency) {
      setSelectedCurrency(cachedCurrency);
    } else {
      // Default to PKR if local timezone is Asia/Karachi
      try {
        if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Karachi") {
          setSelectedCurrency("PKR");
          setSelectedRegion("PK");
        }
      } catch (e) {}
    }
    if (cachedRegion) setSelectedRegion(cachedRegion);
    if (cachedAuto) setAutoApplyActive(JSON.parse(cachedAuto));
    if (cachedInstruction) setAgentInstruction(cachedInstruction);

    // Read browser push alerts permission
    if ('Notification' in window) {
      setDeviceNotificationPermission(Notification.permission);
    }
  }, []);

  // Live Pricing Agent Real-time Ticker Simulation (Simulate moving graphs & scraping)
  useEffect(() => {
    const ticker = setInterval(() => {
      // 1. Roll timeline wave points (Live moving graph tracking)
      setVolatilityTimeline((prev) => {
        const currentVal = prev[prev.length - 1];
        const shift = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4);
        const nextVal = Math.max(5, Math.min(95, currentVal + shift));
        return [...prev.slice(1), nextVal];
      });

      // 2. Slightly fluctuate competitor pricing to demonstrate active scraping
      setProducts((prevProducts) => {
        if (prevProducts.length === 0) return prevProducts;
        return prevProducts.map((p) => {
          if (p.competitor_prices && p.competitor_prices.length > 0) {
            const updatedCompetitors = p.competitor_prices.map((price) => {
              const swing = 1 + (Math.random() > 0.5 ? 0.003 : -0.003);
              return Number((price * swing).toFixed(2));
            });
            return { ...p, competitor_prices: updatedCompetitors };
          }
          return p;
        });
      });

      // 3. Generate Pricing Agent logs mimicking crawler activities
      const logsPool = [
        "Crawler: Scraped Amazon competitor matches successfully.",
        "Crawler: Syncing eBay API item listings...",
        "Monitor: USD/PKR exchange volatility scanned.",
        "FX Ticker: Rupee matched at active 278.00 base.",
        "Agent: Re-computing SKU margins using custom prompts.",
        "Agent: Scanning global geopolitical currents for tariffs.",
        "Crawler: Swung competitor benchmark averages by +/-0.12%.",
        "Monitor: Shopify webhook registered dynamic update request.",
      ];
      const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
      const ts = new Date().toLocaleTimeString();
      setScraperLogs((prev) => [`[${ts}] ${randomLog}`, ...prev.slice(0, 8)]);

    }, 3500);

    return () => clearInterval(ticker);
  }, []);

  // Sync state to local storage when changed (PWA offline-first functionality)
  const saveProductsToStorage = (updatedList: Product[]) => {
    setProducts(updatedList);
    localStorage.setItem("optimared_products", JSON.stringify(updatedList));
  };

  const saveLogsToStorage = (updatedLogs: LogEntry[]) => {
    setLogs(updatedLogs);
    localStorage.setItem("optimared_logs", JSON.stringify(updatedLogs));
  };

  const saveNotificationsToStorage = (updatedNotifs: SystemNotification[]) => {
    setNotifications(updatedNotifs);
    localStorage.setItem("optimared_notifications", JSON.stringify(updatedNotifs));
  };

  const saveChannelsToStorage = (updatedChannels: StoreChannel[]) => {
    setChannels(updatedChannels);
    localStorage.setItem("optimared_channels", JSON.stringify(updatedChannels));
  };

  const handleInstructionChange = (text: string) => {
    setAgentInstruction(text);
    localStorage.setItem("optimared_instruction", text);
  };

  // Find active currency multiplier
  const currentCurrencyObj = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
  const exchangeRate = currentCurrencyObj.rate;
  const currencySymbol = currentCurrencyObj.symbol;

  const activeProduct = products.find((p) => p.id === selectedProductId) || null;

  // Run repricing engine when product selection, currency, or market event changes
  useEffect(() => {
    if (activeProduct) {
      runHeuristicAnalysis(activeProduct, isLiquidation);
      setAiResult(null); // Reset AI result to enforce explicit run or autopilot trigger
      
      // Auto trigger AI recommendation if Autopilot is enabled
      if (autoApplyActive) {
        triggerAutopilotAI(activeProduct);
      }
    }
  }, [selectedProductId, isLiquidation, selectedCurrency, activeEvent]);

  // Auto-select the first SKU on load so the workspace is never idle
  useEffect(() => {
    if (products.length === 0) {
      setSelectedProductId("");
    } else if (!selectedProductId || !products.some((p) => p.id === selectedProductId)) {
      setSelectedProductId(products[0].id);
    }
  }, [products.length]);

  // Generate recommendations/suggestions when products list changes
  useEffect(() => {
    generateListingSuggestions(products);
  }, [products]);

  const triggerAutopilotAI = async (product: Product) => {
    setIsAiLoading(true);
    try {
      const response = await runAIRequest(product, isLiquidation);
      if (response) {
        setAiResult(response);
        // Apply instantly on autopilot
        const oldPrice = product.current_price;
        const newPrice = response.recommended_price;
        const updated = { ...product, current_price: newPrice };
        const updatedList = products.map((p) => (p.id === product.id ? updated : p));
        saveProductsToStorage(updatedList);
        
        const newLog: LogEntry = {
          timestamp: new Date().toLocaleTimeString(),
          productName: product.name,
          productId: product.id,
          oldPrice,
          newPrice,
          strategy: response.strategy_applied,
          driver: response.primary_driver,
          engine: "Gemini AI",
          rationale: `[Autopilot Repriced] ${response.rationale}`,
        };
        saveLogsToStorage([newLog, ...logs]);
        pushSystemNotification("Autopilot Price Shift Success", `Adjusted ${product.name} to ${currencySymbol}${newPrice.toFixed(2)} based on AI optimization.`, "info", product.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const runHeuristicAnalysis = async (product: Product, liquidation: boolean) => {
    try {
      // Local Heuristic Calculation adjusted by global factors
      const cogsVal = product.cogs;
      const currentPriceVal = product.current_price;
      const competitorPricesVal = product.competitor_prices || [currentPriceVal];

      // Geopolitical adjustment modifiers
      let eventPriceMultiplier = 1.0;
      let rationaleModifier = "";
      let eventApplied = "";

      if (activeEvent === "tariffs") {
        eventPriceMultiplier = 1.12;
        rationaleModifier = " Geopolitical tariffs of +12% factored in.";
        eventApplied = "Surge";
      } else if (activeEvent === "shipping") {
        eventPriceMultiplier = 1.08;
        rationaleModifier = " Supply chain shipping bottlenecks (+8% cost coverage) applied.";
        eventApplied = "Surge";
      } else if (activeEvent === "currency_vol") {
        eventPriceMultiplier = 0.95;
        rationaleModifier = " Local currency depreciation offset by -5% tactical discount.";
        eventApplied = "Markdown";
      }

      const floorRatio = liquidation ? 1.0 : 1.05;
      const priceFloor = cogsVal * floorRatio;
      let recPrice = currentPriceVal * eventPriceMultiplier;

      const compAvg = competitorPricesVal.length > 0 ? competitorPricesVal.reduce((a, b) => a + b, 0) / competitorPricesVal.length : currentPriceVal;
      const lowestComp = competitorPricesVal.length > 0 ? Math.min(...competitorPricesVal) : currentPriceVal;

      let strategy: any = eventApplied || "Stable";
      let driver: any = "Demand Velocity";

      if (product.demand_velocity === "Accelerating" && product.inventory_level === "Low") {
        recPrice = Math.max(compAvg * 1.08, currentPriceVal * 1.12) * eventPriceMultiplier;
        strategy = "Surge";
        driver = "Inventory";
      } else if (product.demand_velocity === "Decelerating" && product.inventory_level === "High") {
        recPrice = Math.min(lowestComp * 0.98, currentPriceVal * 0.92) * eventPriceMultiplier;
        strategy = "Markdown";
        driver = "Inventory";
        if (recPrice < priceFloor) {
          recPrice = priceFloor;
          strategy = "Competitor Match";
        }
      } else if (product.inventory_level === "High") {
        recPrice = Math.max(currentPriceVal * 0.94, compAvg * 0.97) * eventPriceMultiplier;
        strategy = "Markdown";
        driver = "Inventory";
      }

      if (recPrice < priceFloor) {
        recPrice = priceFloor;
        strategy = liquidation ? "Liquidation" : "Stable";
      }

      const diffPct = ((recPrice - currentPriceVal) / currentPriceVal) * 100;

      const rationaleText = `Programmatic engine evaluated ${product.inventory_level} stock levels and ${product.demand_velocity} demand velocity.${rationaleModifier}`;

      setHeuristicResult({
        product_id: product.id,
        recommended_price: Number(recPrice.toFixed(2)),
        price_change_percentage: Number(diffPct.toFixed(2)),
        strategy_applied: strategy,
        primary_driver: driver,
        rationale: rationaleText,
      });

    } catch (err) {
      triggerAlert("error", "Rule Engine calculation failed");
    }
  };

  const handleRunAiAnalysis = async () => {
    if (!activeProduct) return;
    setIsAiLoading(true);
    setAlertMessage(null);

    try {
      const data = await runAIRequest(activeProduct, isLiquidation);
      if (data) {
        setAiResult(data);
        triggerAlert("success", `AI optimization computed: ${data.strategy_applied}`);
        pushSystemNotification("New AI Recommendation Ready", `AI analyzed global currents and SKU metrics for ${activeProduct.name}. Suggested Price: ${currencySymbol}${data.recommended_price.toFixed(2)}`, "info", activeProduct.id);
      }
    } catch (err: any) {
      triggerAlert("error", err.message || "AI Analysis failed to execute");
    } finally {
      setIsAiLoading(false);
    }
  };

  const runAIRequest = async (product: Product, liquidation: boolean) => {
    const activeEventObj = MARKET_SIMULATIONS.find(e => e.id === activeEvent);
    const geopoliticalEvent = activeEventObj ? activeEventObj.name : "None (Stable)";
    const currencyVolatility = activeEvent === "currency_vol" ? "Local currency dropped by 4.5%" : "Stable";

    try {
      const res = await fetch("/api/analyze-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          isLiquidation: liquidation,
          currency: selectedCurrency,
          region: selectedRegion,
          geopoliticalEvent,
          currencyVolatility,
          systemInstruction: agentInstruction
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.isUnconfigured) {
          triggerAlert("warning", "AI pricing runs in sandbox fallback simulation mode.");
          const mockPrice = Number((heuristicResult ? heuristicResult.recommended_price : product.current_price * 1.05).toFixed(2));
          return {
            product_id: product.id,
            recommended_price: mockPrice,
            price_change_percentage: Number((((mockPrice - product.current_price) / product.current_price) * 100).toFixed(2)),
            strategy_applied: (heuristicResult ? heuristicResult.strategy_applied : "Stable") as any,
            primary_driver: (heuristicResult ? heuristicResult.primary_driver : "Demand Velocity") as any,
            rationale: `[Fallback Agent AI] Adjusted price based on custom instructions: "${agentInstruction.slice(0, 45)}...". Region: ${selectedRegion}.`,
          };
        } else {
          throw new Error(data.error || "Internal pricing server error");
        }
      }
      return data;
    } catch (err) {
      const mockPrice = Number((product.current_price * 1.04).toFixed(2));
      return {
        product_id: product.id,
        recommended_price: mockPrice,
        price_change_percentage: 4,
        strategy_applied: "Stable" as any,
        primary_driver: "Demand Velocity" as any,
        rationale: `[Offline Local PWA fallback] Pricing stabilized locally.`,
      };
    }
  };

  const applyHeuristicPrice = () => {
    if (!activeProduct || !heuristicResult) return;
    const oldPrice = activeProduct.current_price;
    const newPrice = heuristicResult.recommended_price;

    const updated = {
      ...activeProduct,
      current_price: newPrice,
    };

    saveProduct(updated, "Programmatic rule price applied to catalog successfully!");
    
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      productName: activeProduct.name,
      productId: activeProduct.id,
      oldPrice,
      newPrice,
      strategy: heuristicResult.strategy_applied,
      driver: heuristicResult.primary_driver,
      engine: "Heuristic",
      rationale: heuristicResult.rationale,
    };
    saveLogsToStorage([newLog, ...logs]);
    pushSystemNotification("Rule Applied Successfully", `${activeProduct.name} price updated to ${currencySymbol}${newPrice.toFixed(2)}.`, "info", activeProduct.id);
  };

  const applyAiPrice = () => {
    if (!activeProduct || !aiResult) return;
    const oldPrice = activeProduct.current_price;
    const newPrice = aiResult.recommended_price;

    const updated = {
      ...activeProduct,
      current_price: newPrice,
    };

    saveProduct(updated, "AI Cognitive recommended price applied to catalog successfully!");

    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      productName: activeProduct.name,
      productId: activeProduct.id,
      oldPrice,
      newPrice,
      strategy: aiResult.strategy_applied,
      driver: aiResult.primary_driver,
      engine: "Gemini AI",
      rationale: aiResult.rationale,
    };
    saveLogsToStorage([newLog, ...logs]);
    pushSystemNotification("Cognitive repricing completed", `${activeProduct.name} synced to connected sales channels.`, "info", activeProduct.id);
  };

  const saveProduct = async (product: Product, successMsg = "Configuration updated") => {
    try {
      const updatedList = products.map((p) => (p.id === product.id ? product : p));
      saveProductsToStorage(updatedList);
      triggerAlert("success", successMsg);
      setIsFormOpen(false);
      setEditingProduct(null);
      runHeuristicAnalysis(product, isLiquidation);
      
      fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }).catch(() => {});

    } catch (err) {
      triggerAlert("error", "Failed to save configuration parameters");
    }
  };

  const handleLaunchProduct = (newProduct: Product) => {
    const updatedList = products.find(p => p.id === newProduct.id) 
      ? products.map(p => p.id === newProduct.id ? newProduct : p)
      : [...products, newProduct];
    
    saveProductsToStorage(updatedList);
    setSelectedProductId(newProduct.id);
    setIsFormOpen(false);
    setEditingProduct(null);
    triggerAlert("success", "Listing successfully registered under your e-commerce catalog!");
    pushSystemNotification("Listing Registered", `Product "${newProduct.name}" is now live and monitored under your catalog.`, "info", newProduct.id);
    
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    }).catch(() => {});
  };

  const handleDeleteProduct = async (id: string) => {
    const updatedList = products.filter((p) => p.id !== id);
    saveProductsToStorage(updatedList);
    triggerAlert("success", "Product removed from pricing catalog");
    if (selectedProductId === id) {
      setSelectedProductId("");
      setHeuristicResult(null);
      setAiResult(null);
    }

    fetch(`/api/products/${id}`, { method: "DELETE" }).catch(() => {});
  };

  const handleResetCatalog = async () => {
    saveProductsToStorage(BASELINE_PRODUCTS);
    if (BASELINE_PRODUCTS.length > 0) {
      setSelectedProductId(BASELINE_PRODUCTS[0].id);
    }
    setLogs([]);
    localStorage.removeItem("optimared_logs");
    triggerAlert("success", "Inventory database reset to baseline sample parameters");
    
    fetch("/api/products/reset", { method: "POST" }).catch(() => {});
  };

  const handleClearCatalog = () => {
    saveProductsToStorage([]);
    setSelectedProductId("");
    setHeuristicResult(null);
    setAiResult(null);
    triggerAlert("warning", "Inventory catalog cleared. Add your own products now.");
    pushSystemNotification("Catalog Wiped", "All preloaded items cleared. You can start introducing your custom products and store bindings.", "info");

    fetch("/api/products/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    }).catch(() => {});
  };

  // Device Push permission requester
  const requestDeviceNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setDeviceNotificationPermission(permission);
        if (permission === 'granted') {
          triggerAlert("success", "Native device alerts successfully activated!");
          new Notification("OptimaRed Push Alerts Enabled", {
            body: "You will now receive native push notifications for critical market shifts and AI repricing updates.",
            icon: "/logo.jpg"
          });
        } else if (permission === 'denied') {
          triggerAlert("error", "Notifications blocked. Enable permissions in site settings.");
        }
      });
    }
  };

  // Channel Connection Management
  const toggleChannelConnection = (channelId: string) => {
    const updated = channels.map((c) => {
      if (c.id === channelId) {
        const nextConnected = !c.connected;
        if (nextConnected) {
          pushSystemNotification("Channel Connected Successfully", `${c.name} store sync active. Synced listings automatically.`, "info");
        }
        return {
          ...c,
          connected: nextConnected,
          lastSynced: nextConnected ? "Just now" : undefined,
          itemCount: nextConnected ? products.filter(p => p.connectedChannels?.includes(channelId)).length || 0 : 0
        };
      }
      return c;
    });
    saveChannelsToStorage(updated);
  };

  const syncChannelNow = (channelId: string) => {
    const updated = channels.map((c) => {
      if (c.id === channelId) {
        return { ...c, syncing: true };
      }
      return c;
    });
    setChannels(updated);

    setTimeout(() => {
      const finished = updated.map((c) => {
        if (c.id === channelId) {
          pushSystemNotification("Listing Sync Completed", `Pushed updated dynamic prices to all ${c.name} storefront listings.`, "success");
          return { ...c, syncing: false, lastSynced: "Just now" };
        }
        return c;
      });
      setChannels(finished);
      saveChannelsToStorage(finished);
      triggerAlert("success", "Store channel synced successfully!");
    }, 1500);
  };

  // Helper: Trigger specific global market simulation shifts
  const selectMarketSimulation = (scenarioId: string) => {
    setActiveEvent(scenarioId);
    let timeline: number[] = [12, 15, 13, 11, 14, 12, 10];
    let msg = "";
    let title = "";
    
    switch (scenarioId) {
      case "tariffs":
        timeline = [12, 14, 18, 25, 29, 35, 48];
        title = "Geopolitical Tariffs Spike";
        msg = "New 15% tariff imposed on imports. Profit margins threatened, adjust prices!";
        break;
      case "shipping":
        timeline = [8, 10, 15, 22, 38, 54, 72];
        title = "Logistics Suez Blockage Event";
        msg = "Shipping delays increased container rates by 22%. Consider raising current prices.";
        break;
      case "currency_vol":
        timeline = [45, 42, 38, 30, 24, 18, 12];
        title = "Exchange Rate Drop Shock";
        msg = "USD weakened by 4.5% against target markets. Readjust catalog to prevent margin erosion.";
        break;
      default:
        timeline = [12, 14, 13, 15, 14, 12, 11];
        title = "Global Markets Stabilized";
        msg = "Exchange rates and political risk scores returned to normal baseline values.";
        break;
    }
    
    setVolatilityTimeline(timeline);
    pushSystemNotification(title, msg, "warning");
    triggerAlert("warning", `Global Market Shift: ${title} simulation active.`);
  };

  // Helper: Generate system notifications
  const pushSystemNotification = (title: string, message: string, type: "info" | "warning" | "alert" | "success" = "info", productId?: string) => {
    const newNotif: SystemNotification = {
      id: `alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(),
      title,
      message,
      type: type === "success" ? "info" : type,
      read: false,
      productId
    };
    const nextList = [newNotif, ...notifications];
    saveNotificationsToStorage(nextList);

    // Native Browser Device notification dispatch
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: "/logo.jpg"
        });
      } catch (err) {
        console.error("Native push error:", err);
      }
    }
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotificationsToStorage(updated);
  };

  const clearNotifications = () => {
    saveNotificationsToStorage([]);
  };

  // Helper: Listing Suggestions Engine
  const generateListingSuggestions = (currentProducts: Product[]) => {
    const newSuggestions: ListingSuggestion[] = [];
    
    currentProducts.forEach(prod => {
      const currentMargin = ((prod.current_price - prod.cogs) / prod.current_price) * 100;
      if (currentMargin < prod.target_margin) {
        newSuggestions.push({
          id: `sug-margin-${prod.id}`,
          productId: prod.id,
          productName: prod.name,
          category: "Margin",
          title: "Margin Restoration Needed",
          recommendation: `Price stands at a ${currentMargin.toFixed(1)}% margin. Optimize to target ${prod.target_margin}% margin to protect profits.`,
          actionLabel: "Reprice Listing"
        });
      }
      
      if (prod.inventory_level === "Low" && prod.inventory_units < 10) {
        newSuggestions.push({
          id: `sug-stock-${prod.id}`,
          productId: prod.id,
          productName: prod.name,
          category: "Stock",
          title: "Critical Stock Buffer",
          recommendation: `Only ${prod.inventory_units} units left. Surge prices dynamically to slow demand depletion and prevent stockouts.`,
          actionLabel: "Surge Reprice"
        });
      }

      if (!prod.connectedChannels || prod.connectedChannels.length === 0) {
        newSuggestions.push({
          id: `sug-channel-${prod.id}`,
          productId: prod.id,
          productName: prod.name,
          category: "Competitor",
          title: "No Storefront Connections",
          recommendation: `This listing isn't pushing updates to any stores. Click to connect to Shopify or WooCommerce.`,
          actionLabel: "Sync Store"
        });
      }
    });

    setSuggestions(newSuggestions);
  };

  // Convert prices based on currency selection
  const convertPrice = (usdPrice: number) => {
    return usdPrice * exchangeRate;
  };

  // Aggregate metrics
  const totalSKUs = products.length;
  const activeSyncedCount = products.filter(p => p.connectedChannels && p.connectedChannels.length > 0).length;
  
  const avgMargin = totalSKUs > 0
    ? products.reduce((acc, p) => acc + ((p.current_price - p.cogs) / p.current_price) * 100, 0) / totalSKUs
    : 0;

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      
      {/* Red & White Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
        
        {/* Brand & Pulser */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-display font-extrabold text-xl shadow-md shadow-red-500/20">
            O
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg text-slate-800 tracking-tight">OptimaRed</h1>
              <span className="bg-red-50 text-red-600 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-red-200/50">
                AI Co-Pilot
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-400">Agent Autopilot Monitoring Channels</span>
            </div>
          </div>
        </div>

        {/* Global Settings & Utilities */}
        <div className="flex items-center gap-4">
          
          {/* Active Event Indicator */}
          {activeEvent !== "stable" && (
            <div className="hidden lg:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-1.5 rounded-lg animate-pulse">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span className="font-semibold capitalize">Global Shift Active: {activeEvent.replace("_", " ")}</span>
            </div>
          )}

          {/* Region Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100/60 border border-slate-200 px-2.5 py-1.5 rounded-lg">
            <Globe className="w-4 h-4 text-slate-400" />
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                localStorage.setItem("optimared_region", e.target.value);
                triggerAlert("success", `Pricing region adjusted to ${REGIONS.find(r => r.code === e.target.value)?.name}`);
              }}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              {REGIONS.map((r) => (
                <option key={r.code} value={r.code}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Currency Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100/60 border border-slate-200 px-2.5 py-1.5 rounded-lg">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
                localStorage.setItem("optimared_currency", e.target.value);
                triggerAlert("success", `Currency converted to ${e.target.value}`);
              }}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Device Push Permission Button */}
          <button
            onClick={requestDeviceNotificationPermission}
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              deviceNotificationPermission === "granted"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : deviceNotificationPermission === "denied"
                ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-red-50 hover:bg-red-100 border-red-200 text-red-700 animate-pulse"
            }`}
            disabled={deviceNotificationPermission === "denied"}
            title={
              deviceNotificationPermission === "granted"
                ? "Browser alerts enabled"
                : deviceNotificationPermission === "denied"
                ? "Browser alerts blocked. Enable in site settings."
                : "Enable device alerts"
            }
          >
            {deviceNotificationPermission === "granted" ? "Alerts Active" : "Enable Alerts"}
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setShowNotificationsDrawer(true)}
            className="relative p-2.5 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5 text-slate-600" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Autopilot Master Switch */}
          <label className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={autoApplyActive}
              onChange={(e) => {
                setAutoApplyActive(e.target.checked);
                localStorage.setItem("optimared_autoapply", JSON.stringify(e.target.checked));
                triggerAlert(e.target.checked ? "success" : "warning", e.target.checked ? "AI Auto-Pilot Mode activated globally!" : "AI Auto-Pilot deactivated. Reviewing suggestions manually.");
                pushSystemNotification(e.target.checked ? "AI Auto-Pilot Active" : "AI Auto-Pilot Disabled", e.target.checked ? "Gemini will automatically reprice channels upon market swing detection." : "Pricing shifts require manual confirmation.", "info");
              }}
              className="w-4 h-4 text-red-600 accent-red-600 rounded cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap">AI Auto-Pilot</span>
          </label>

        </div>
      </header>

      {/* Floating System alerts */}
      {alertMessage && (
        <div className={`fixed top-20 right-6 z-55 flex items-center gap-2.5 px-4 py-3 rounded-lg border shadow-lg max-w-sm transition-all animate-in fade-in duration-300 ${
          alertMessage.type === "success"
            ? "bg-red-50 border-red-200 text-red-700"
            : alertMessage.type === "warning"
            ? "bg-amber-50 border-amber-200 text-amber-700"
            : "bg-red-100 border-red-300 text-red-800"
        }`}>
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold leading-relaxed">{alertMessage.text}</span>
        </div>
      )}

      {/* Main Grid Workspace */}
      <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1700px] mx-auto w-full">
        
        {/* Left Side: Storefronts & SKU catalog (xl:4) */}
        <section className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Store connection controller */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2">
                <Link2 className="w-4 h-4 text-red-600" />
                Connected Integrations
              </h2>
              <span className="text-[10px] font-semibold text-slate-400">1-Click Auth</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {channels.map((chan) => (
                <div 
                  key={chan.id} 
                  className={`p-3 rounded-lg border transition-all flex flex-col justify-between relative group ${
                    chan.connected 
                      ? 'bg-red-50/20 border-red-100/70 hover:border-red-300' 
                      : 'bg-slate-50 border-slate-100 opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* HOVER POPUP (Tooltip) */}
                  <div className="absolute z-35 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2.5 rounded shadow-xl -top-12 left-2 w-44 pointer-events-none animate-in fade-in zoom-in-95 duration-100 border border-slate-700">
                    <span className="font-bold block">{chan.name} Channel</span>
                    <span className="text-slate-400">Last Sync: {chan.lastSynced || "Never"}</span>
                    <span className="block text-red-400 font-mono mt-1">API Latency: 22ms</span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm ${
                      chan.connected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {chan.icon}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      chan.connected ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {chan.connected ? 'Connected' : 'Offline'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-700">{chan.name}</h3>
                    {chan.connected && (
                      <span className="text-[9px] text-slate-400 block mt-0.5">
                        {chan.itemCount} items synced • {chan.lastSynced}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-1.5 mt-3">
                    <button
                      onClick={() => toggleChannelConnection(chan.id)}
                      className={`text-[10px] font-semibold px-2 py-1 rounded transition-colors flex-1 cursor-pointer ${
                        chan.connected 
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {chan.connected ? "Disconnect" : "Connect"}
                    </button>
                    {chan.connected && (
                      <button
                        onClick={() => syncChannelNow(chan.id)}
                        disabled={chan.syncing}
                        className="p-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Sync catalog values"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${chan.syncing ? 'animate-spin' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Listings Ledger */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col flex-1 min-h-[500px]">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h2 className="font-display font-bold text-slate-800 text-sm">Storefront Listings Catalog</h2>
                <span className="text-[10px] text-slate-400">{activeSyncedCount} of {totalSKUs} items synced to sales channels</span>
              </div>
              
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsFormOpen(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Launch SKU
              </button>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-medium">Avg catalog margin</span>
                <span className="text-sm font-mono font-bold text-slate-700">{avgMargin.toFixed(1)}%</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                <span className="text-sm font-mono font-bold text-slate-700">{totalSKUs} SKUs</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[500px]">
              {products.length === 0 ? (
                <div className="text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <Briefcase className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-medium text-slate-600">Your inventory catalog is empty.</p>
                  <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto mt-1 leading-relaxed">Click "Launch SKU" to start adding your own products, costs, and storefront channels.</p>
                </div>
              ) : (
                products.map((p) => {
                  const isSelected = p.id === selectedProductId;
                  const itemMargin = ((p.current_price - p.cogs) / p.current_price) * 100;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setIsFormOpen(false);
                        setActiveTab("workspace");
                      }}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col gap-2 relative group ${
                        isSelected 
                          ? 'bg-red-50/20 border-red-500 ring-1 ring-red-500/10' 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* HOVER METADATA POPUP */}
                      <div className="absolute z-35 hidden group-hover:block bg-slate-900 border border-red-500 text-white text-[10px] p-3 rounded-lg shadow-xl -top-24 left-10 w-56 pointer-events-none animate-in fade-in zoom-in-95 duration-100">
                        <div className="font-semibold border-b border-slate-700 pb-1 mb-1 text-red-400">SKU Analytics Tracker</div>
                        <div className="flex justify-between"><span>Base COGS:</span> <span className="font-mono">{currencySymbol}{convertPrice(p.cogs).toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Target Margin:</span> <span className="font-mono">{p.target_margin}%</span></div>
                        <div className="flex justify-between"><span>Current Margin:</span> <span className="font-mono">{itemMargin.toFixed(1)}%</span></div>
                        <div className="flex justify-between mt-1 text-slate-450 border-t border-slate-800 pt-1"><span>Sync Status:</span> <span className="text-emerald-400 font-bold">Autopilot Live</span></div>
                      </div>

                      <div className="flex items-start justify-between">
                        <div className="max-w-[70%]">
                          <h3 className="text-xs font-bold text-slate-800 leading-snug truncate">{p.name}</h3>
                          <div className="flex items-center gap-1.5 mt-1 font-mono text-[9px] text-slate-400">
                            <span>{p.id}</span>
                            <span>•</span>
                            <span className="bg-slate-100 px-1 rounded text-slate-500 uppercase">{p.category}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-800 block">
                            {currencySymbol}{convertPrice(p.current_price).toFixed(2)}
                          </span>
                          <span className={`text-[9px] font-bold ${
                            p.inventory_level === 'Low' ? 'text-red-500' : p.inventory_level === 'High' ? 'text-amber-500' : 'text-slate-400'
                          }`}>
                            {p.inventory_units} units ({p.inventory_level})
                          </span>
                        </div>
                      </div>

                      {/* Display Channel Icons */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-0.5">
                        <div className="flex gap-1">
                          {p.connectedChannels?.map((ch) => (
                            <span 
                              key={ch} 
                              className="text-[8px] font-bold uppercase px-1.5 py-0.25 bg-red-50 border border-red-100 text-red-600 rounded"
                              title={`Synced to ${ch}`}
                            >
                              {ch[0]}
                            </span>
                          ))}
                          {(!p.connectedChannels || p.connectedChannels.length === 0) && (
                            <span className="text-[8px] text-slate-400 italic">No storefront link</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProduct(p);
                              setIsFormOpen(true);
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Edit parameter values"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(p.id);
                            }}
                            className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete SKU"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Catalog resets */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
              <div className="flex gap-3">
                <button
                  onClick={handleResetCatalog}
                  className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={handleClearCatalog}
                  className="text-slate-400 hover:text-red-600 font-bold transition-colors cursor-pointer"
                >
                  Wipe Catalog
                </button>
              </div>
              <span className="text-[9px] text-slate-400">Offline-First Cache</span>
            </div>

          </div>
        </section>

        {/* Center: Analytics, SVG Charts, Dynamic Analysis panels (xl:5) */}
        <section className="xl:col-span-5 flex flex-col gap-6">

          {/* Market Sentiment Fluctuation Timeline (The requested visual graph showing ups/downs) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative group">
            
            {/* HOVER TOOLTIP HELP BAR */}
            <div className="absolute z-20 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity -top-3 left-4 border border-slate-700">
              💡 Drag cursor over graph columns to inspect historical volatility ratings.
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-4">
              <div>
                <h2 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Activity className="w-4.5 h-4.5 text-red-600 animate-pulse" />
                  Live Currency & Products tracking
                </h2>
                <span className="text-[10px] text-slate-400">Timeline tracking exchange volatility and geopolitical stress currents</span>
              </div>
              
              <div className="flex gap-1.5">
                {MARKET_SIMULATIONS.map((sim) => (
                  <button
                    key={sim.id}
                    onClick={() => selectMarketSimulation(sim.id)}
                    className={`text-[9px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                      activeEvent === sim.id 
                        ? 'bg-red-600 text-white font-bold' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                    title={sim.description}
                  >
                    {sim.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="h-32 bg-slate-50 border border-slate-100 rounded-lg relative overflow-hidden flex items-end p-2 mb-3">
              {/* Grid Background Lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                <div className="border-b border-slate-200/50 w-full" />
                <div className="border-b border-slate-200/50 w-full" />
                <div className="border-b border-slate-200/50 w-full" />
              </div>

              {/* Sparkline wave path */}
              <svg className="w-full h-full absolute inset-0 z-10" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wave-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Area path */}
                <path
                  d={`M 0 120 ${volatilityTimeline.map((val, idx) => `L ${idx * (420 / (volatilityTimeline.length - 1))} ${120 - val * 1.5}`).join(" ")} L 420 120 Z`}
                  fill="url(#wave-grad)"
                />

                {/* Line path */}
                <path
                  d={volatilityTimeline.map((val, idx) => `${idx === 0 ? "M" : "L"} ${idx * (420 / (volatilityTimeline.length - 1))} ${120 - val * 1.5}`).join(" ")}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Hot dot on last coordinate */}
                <circle
                  cx={420}
                  cy={120 - volatilityTimeline[volatilityTimeline.length - 1] * 1.5}
                  r="4"
                  fill="#dc2626"
                  className="animate-pulse"
                />
              </svg>
              
              {/* INTERACTIVE COLUMN HOVERS */}
              <div className="absolute inset-0 z-20 flex">
                {volatilityTimeline.map((val, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredTimelineIdx(idx)}
                    onMouseLeave={() => setHoveredTimelineIdx(null)}
                    className="flex-1 h-full cursor-crosshair relative"
                  >
                    {hoveredTimelineIdx === idx && (
                      <div className="absolute bg-slate-900 text-white text-[9px] font-mono p-2 rounded shadow-xl border border-red-500 -top-10 left-1/2 transform -translate-x-1/2 z-30 whitespace-nowrap">
                        <span className="font-bold text-red-400 block">Tick {idx + 1}</span>
                        <span>Volatility: {val}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Simulated Y-Axis Labels */}
              <div className="absolute left-2 top-2 bg-white/80 border border-slate-200/50 px-1 rounded text-[8px] font-mono text-slate-500 z-20">
                Risk Index: {volatilityTimeline[volatilityTimeline.length - 1]}%
              </div>
            </div>

            {/* Active Factor Impact explanation */}
            <div className="text-xs text-slate-600 bg-red-50/20 border border-red-100/50 p-3 rounded-lg flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Market Shift Context: </span>
                <span>{MARKET_SIMULATIONS.find(s => s.id === activeEvent)?.description}</span>
                <span className="block mt-1 font-mono text-[10px] text-red-600 font-bold">
                  Recommended Strategy Adjustment: {MARKET_SIMULATIONS.find(s => s.id === activeEvent)?.suggestion}
                </span>
              </div>
            </div>

            {/* Live Pricing Agent Crawling activities ticker feed (Pricing Agent look) */}
            <div className="mt-3 bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-[10px] text-red-500 h-24 overflow-hidden relative">
              <div className="absolute top-1.5 right-2 bg-red-950 border border-red-800 px-1 rounded text-[8px] uppercase tracking-wider text-red-400 font-bold flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Ticker
              </div>
              <div className="space-y-1 overflow-y-auto h-full scrollbar-thin">
                {scraperLogs.map((log, idx) => (
                  <div key={idx} className={idx === 0 ? "text-red-400 font-bold" : "text-red-600"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Pricing Engine Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex-1 flex flex-col">
            {isFormOpen ? (
              <ProductForm
                product={editingProduct}
                onSave={handleLaunchProduct}
                onCancel={() => setIsFormOpen(false)}
                currencySymbol={currencySymbol}
              />
            ) : activeProduct ? (
              <div className="space-y-6 flex-1 flex flex-col">
                
                {/* Tabs switcher */}
                <div className="flex border-b border-slate-100">
                  <button
                    onClick={() => setActiveTab("workspace")}
                    className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                      activeTab === "workspace"
                        ? "border-red-600 text-red-600 font-extrabold"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    SKU Workspace
                  </button>
                  <button
                    onClick={() => setActiveTab("agent")}
                    className={`pb-2.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "agent"
                        ? "border-red-600 text-red-600 font-extrabold"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Custom Agent Settings
                  </button>
                </div>

                {activeTab === "workspace" ? (
                  <div className="space-y-6 flex-1">
                    {/* SKU Header Info */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Active Target Repricing SKU</span>
                        <h2 className="font-display font-bold text-slate-800 text-lg leading-tight mt-0.5">{activeProduct.name}</h2>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-mono block">Active Catalog Price</span>
                        <span className="text-sm font-mono font-bold text-red-600">
                          {currencySymbol}{convertPrice(activeProduct.current_price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Spec details bar */}
                    <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-100 p-3 rounded-lg text-center text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 block">Unit Cost (COGS)</span>
                        <span className="font-mono font-bold text-slate-700">{currencySymbol}{convertPrice(activeProduct.cogs).toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block">Target Margin</span>
                        <span className="font-mono font-bold text-slate-700">{activeProduct.target_margin}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block">Competitors Avg</span>
                        <span className="font-mono font-bold text-slate-700">
                          {currencySymbol}{convertPrice(
                            activeProduct.competitor_prices.length > 0 ? activeProduct.competitor_prices.reduce((a,b)=>a+b, 0) / activeProduct.competitor_prices.length : activeProduct.current_price
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* SVG spectrum comparison */}
                    <PricingVisualizer
                      product={activeProduct}
                      heuristicResult={heuristicResult}
                      aiResult={aiResult}
                      isAiLoading={isAiLoading}
                      currencySymbol={currencySymbol}
                    />

                    {/* Dynamic pricing engine split suggestions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      
                      {/* Heuristic Programmatic engine proposal */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between relative group">
                        
                        {/* HOVER DETAIL POP */}
                        <div className="absolute z-35 hidden group-hover:block bg-slate-900 text-white text-[9px] p-2.5 rounded shadow-xl -top-16 left-2 w-48 pointer-events-none animate-in fade-in zoom-in-95 duration-100 border border-slate-700">
                          <span className="font-bold block text-amber-400">Rules Applied:</span>
                          <span>Inventory elastic pricing + Competitor benchmarking. Capped by regulatory floor.</span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Heuristic Rule Engine</span>
                            <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                              Programmatic
                            </span>
                          </div>
                          
                          {heuristicResult ? (
                            <div className="space-y-2">
                              <span className="text-xl font-mono font-black text-slate-700 block">
                                {currencySymbol}{convertPrice(heuristicResult.recommended_price).toFixed(2)}
                              </span>
                              <span className={`text-[10px] font-bold inline-flex items-center gap-0.5 px-1.5 py-0.25 rounded ${
                                heuristicResult.price_change_percentage >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                              }`}>
                                {heuristicResult.price_change_percentage >= 0 ? "+" : ""}{heuristicResult.price_change_percentage}% swing
                              </span>
                              <p className="text-[11px] text-slate-500 leading-relaxed italic border-t border-slate-200/50 pt-2 mt-2">
                                "{heuristicResult.rationale}"
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">Loading heuristics...</span>
                          )}
                        </div>

                        <button
                          onClick={applyHeuristicPrice}
                          disabled={!heuristicResult}
                          className="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Apply Rule Price
                        </button>
                      </div>

                      {/* Gemini Cognitive Intelligence proposal */}
                      <div className="bg-red-50/10 p-4 rounded-xl border border-red-100 flex flex-col justify-between relative group">
                        
                        {/* HOVER DETAIL POP */}
                        <div className="absolute z-35 hidden group-hover:block bg-slate-900 text-white text-[9px] p-2.5 rounded shadow-xl -top-16 left-2 w-48 pointer-events-none animate-in fade-in zoom-in-95 duration-100 border border-slate-700">
                          <span className="font-bold block text-red-400">AI Rules Applied:</span>
                          <span>Gemini 3.5 Flash processes custom prompts, exchange fluctuations, and tariffs contextually.</span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 animate-pulse" /> Gemini AI Agent
                            </span>
                            <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Cognitive
                            </span>
                          </div>

                          {aiResult ? (
                            <div className="space-y-2">
                              <span className="text-xl font-mono font-black text-red-600 block">
                                {currencySymbol}{convertPrice(aiResult.recommended_price).toFixed(2)}
                              </span>
                              <span className={`text-[10px] font-bold inline-flex items-center gap-0.5 px-1.5 py-0.25 rounded ${
                                aiResult.price_change_percentage >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                              }`}>
                                {aiResult.price_change_percentage >= 0 ? "+" : ""}{aiResult.price_change_percentage}% swing
                              </span>
                              <p className="text-[11px] text-slate-600 leading-relaxed italic border-t border-red-100/50 pt-2 mt-2">
                                "{aiResult.rationale}"
                              </p>
                            </div>
                          ) : (
                            <div className="py-4 text-center">
                              {isAiLoading ? (
                                <div className="flex flex-col items-center gap-1">
                                  <RefreshCw className="w-6 h-6 text-red-600 animate-spin" />
                                  <span className="text-[10px] text-slate-400 font-mono">Consulting Gemini API...</span>
                                </div>
                              ) : (
                                <p className="text-[11px] text-slate-400 italic">
                                  AI model will evaluate regional currency values, supply chain volatility, and custom rules.
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={handleRunAiAnalysis}
                            disabled={isAiLoading}
                            className="bg-white hover:bg-slate-100 text-red-600 border border-red-200 text-xs font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer flex-1"
                          >
                            {aiResult ? "Re-run Agent" : "Query Agent"}
                          </button>
                          
                          {aiResult && (
                            <button
                              onClick={applyAiPrice}
                              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer flex-1"
                            >
                              Apply AI Price
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="pb-2 border-b border-slate-100">
                        <h3 className="font-display font-bold text-slate-800 text-sm">Gemini Custom Instruction Prompt</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Customize how the AI dynamic pricing agent adjusts listings. Direct it to ignore rules, match competitors aggressively, or safeguard target margins.</p>
                      </div>

                      {/* Agent presets list */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Quick Presets</span>
                        <div className="grid grid-cols-2 gap-2">
                          {AGENT_PRESETS.map((preset) => {
                            const isActive = agentInstruction === preset.instruction;
                            return (
                              <button
                                key={preset.name}
                                type="button"
                                onClick={() => handleInstructionChange(preset.instruction)}
                                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                  isActive 
                                    ? 'bg-red-50 border-red-200 text-red-700 font-semibold ring-1 ring-red-500/10' 
                                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                                }`}
                              >
                                <span className="text-xs font-bold block">{preset.name}</span>
                                <span className="text-[9px] text-slate-400 leading-snug mt-1 block font-medium line-clamp-2">{preset.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Instruction TextArea */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">Custom Instructions</span>
                        <textarea
                          value={agentInstruction}
                          onChange={(e) => handleInstructionChange(e.target.value)}
                          placeholder="Type your custom system instructions for the pricing agent (e.g. 'Undercut cheapest competitor by 5%, but always ignore shipping costs')"
                          className="w-full min-h-[140px] bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Sync Indicator */}
                    <div className="bg-red-50/20 border border-red-100 p-3 rounded-lg flex items-center gap-2.5 mt-2">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                      <span className="text-[10px] text-slate-600 font-mono font-medium">Custom instructions will be dynamically injected as Gemini System Instructions.</span>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center space-y-3">
                <Compass className="w-10 h-10 text-red-500 animate-bounce" />
                <h3 className="font-semibold text-slate-700">No SKU selected for dynamic optimization</h3>
                <p className="text-xs max-w-xs text-slate-400">
                  Select a registered SKU from your storefront catalog on the left, or launch a new custom SKU, to begin optimization.
                </p>
              </div>
            )}
          </div>

        </section>

        {/* Right Side: Logs ledger & Strategy alerts feed (xl:3) */}
        <section className="xl:col-span-3 flex flex-col gap-6">

          {/* AI Strategy Suggestions panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative group">
            
            {/* HOVER DETAIL POP */}
            <div className="absolute z-20 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity -top-3 left-4 border border-slate-700">
              💡 Optimization tips derived from catalog audits and stock levels.
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h2 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Award className="w-4 h-4 text-red-600" />
                Optima Suggestions
              </h2>
              <span className="text-[9px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">{suggestions.length} Alerts</span>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {suggestions.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">Store listings are completely optimized.</p>
              ) : (
                suggestions.map((sug) => (
                  <div key={sug.id} className="bg-slate-50 border border-slate-100 p-3 rounded-lg space-y-1.5 hover:border-slate-200 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">{sug.category}</span>
                      <span className="text-[9px] font-mono text-slate-400">{sug.productId}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">{sug.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{sug.recommendation}</p>
                    <button
                      onClick={() => {
                        setSelectedProductId(sug.productId);
                        if (sug.category === "Competitor") {
                          pushSystemNotification("Setup Channels", "Go to connected integrations panel to setup marketplace syncer.", "info");
                        } else {
                          setActiveTab("workspace");
                          handleRunAiAnalysis();
                        }
                      }}
                      className="text-[9px] text-red-600 font-bold hover:text-red-700 flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      {sug.actionLabel} <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Live Pricing Ledger logs */}
          <div className="flex-1 min-h-[350px]">
            <PricingLogs
              logs={logs}
              onClear={() => {
                setLogs([]);
                localStorage.removeItem("optimared_logs");
              }}
              currencySymbol={currencySymbol}
            />
          </div>

        </section>

      </main>

      {/* Notifications Drawer Component */}
      {showNotificationsDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-350">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-600 animate-bounce" />
                <h3 className="font-display font-bold text-slate-800 text-base">Alerts Feed</h3>
              </div>
              <button
                onClick={() => setShowNotificationsDrawer(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-between items-center mb-3">
              <button
                onClick={markAllNotificationsRead}
                className="text-[10px] font-bold text-red-600 hover:text-red-700 cursor-pointer"
              >
                Mark all as read
              </button>
              <button
                onClick={clearNotifications}
                className="text-[10px] font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear all alerts
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {notifications.length === 0 ? (
                <div className="text-center py-20 text-slate-400 space-y-2">
                  <CheckCircle className="w-8 h-8 text-slate-200 mx-auto" />
                  <p className="text-xs">No active pricing notifications.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border transition-all relative ${
                      notif.read ? 'bg-white border-slate-100' : 'bg-red-50/10 border-red-100'
                    }`}
                  >
                    {!notif.read && (
                      <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-600 rounded-full" />
                    )}
                    <span className="text-[8px] font-mono text-slate-400 block">{notif.timestamp}</span>
                    <h4 className="text-xs font-bold text-slate-800 mt-1 leading-snug">{notif.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                    
                    {notif.productId && (
                      <button
                        onClick={() => {
                          setSelectedProductId(notif.productId!);
                          setShowNotificationsDrawer(false);
                          setActiveTab("workspace");
                          handleRunAiAnalysis();
                        }}
                        className="text-[9px] font-bold text-red-600 hover:text-red-700 mt-2 flex items-center gap-1 cursor-pointer"
                      >
                        Adjust Listing <ChevronRight className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Mock constants for simulations and global events
const MARKET_SIMULATIONS = [
  {
    id: "stable",
    label: "Stable Markets",
    name: "Stable Economy",
    description: "Exchange rates and political risk scores are stable. Core margins are protected.",
    metricLabel: "Risk Index",
    metricValue: "Low",
    suggestion: "Maintain regular target margin optimization parameters."
  },
  {
    id: "tariffs",
    label: "Tariff Shock",
    name: "Trade War Tariffs Hike",
    description: "Geopolitical dispute triggers a 15% tariff on imported hardware parts and accessories.",
    metricLabel: "Tariff Index",
    metricValue: "Elevated (+15%)",
    suggestion: "Markup products to offset import tariff burdens (Surge pricing suggested)."
  },
  {
    id: "shipping",
    label: "Suez Delays",
    name: "Maritime Supply Crisis",
    description: "Suez delays and container shortage spikes ocean cargo shipping costs by 22%.",
    metricLabel: "Cargo Rate",
    metricValue: "Spiked (+22%)",
    suggestion: "Slightly increase margin targets on electronics to safeguard logistics margins."
  },
  {
    id: "currency_vol",
    label: "Currency swing",
    name: "Currency Volatility",
    description: "Domestic currency dropped 4.5% against overseas currencies, hurting purchasing index.",
    metricLabel: "FX Volatility",
    metricValue: "Swing (-4.5%)",
    suggestion: "Offer slight promotional markdown to stimulate volume sales domestically."
  }
];

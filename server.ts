import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = Number(process.env.PORT) || 3000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

// Shared Mock Products Store
let products = [
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
  },
];

// Lazy-initialize Gemini API to prevent crash on startup if GEMINI_API_KEY is missing
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Programmatic Heuristic Dynamic Pricing Engine
function calculateHeuristicPricing(
  product: {
    id: string;
    current_price: number;
    cogs: number;
    target_margin: number;
    inventory_level: string;
    demand_velocity: string;
    competitor_prices: number[];
  },
  isLiquidation = false
) {
  const { current_price, cogs, target_margin, inventory_level, demand_velocity, competitor_prices } = product;
  const floorRatio = isLiquidation ? 1.0 : 1.05;
  const priceFloor = cogs * floorRatio;

  let recPrice = current_price;
  let strategy: "Surge" | "Competitor Match" | "Markdown" | "Liquidation" | "Stable" = "Stable";
  let driver: "Inventory" | "Competitor" | "Demand Velocity" = "Demand Velocity";
  let rationale = "";

  const compAvg = competitor_prices.length > 0
    ? competitor_prices.reduce((a, b) => a + b, 0) / competitor_prices.length
    : current_price;
  const lowestComp = competitor_prices.length > 0
    ? Math.min(...competitor_prices)
    : current_price;

  // Rule 1: Accelerating Demand + Low Inventory
  if (demand_velocity === "Accelerating" && inventory_level === "Low") {
    const premiumPrice = compAvg * 1.08; // 8% above competitor average
    const surgePrice = current_price * 1.12; // 12% surge incremental increase
    recPrice = Math.max(premiumPrice, surgePrice);
    strategy = "Surge";
    driver = "Inventory";
    rationale = `Strong demand velocity and low inventory triggered surge markup of ${((recPrice / current_price - 1) * 100).toFixed(1)}% above current price to capture premium margin.`;
  }
  // Rule 2: Decelerating Demand + High Inventory
  else if (demand_velocity === "Decelerating" && inventory_level === "High") {
    const compMatch = lowestComp * 0.98; // Price 2% below lowest competitor
    const markdownPrice = current_price * 0.92; // 8% markdown to clear units
    recPrice = Math.min(compMatch, markdownPrice);
    strategy = "Markdown";
    driver = "Inventory";
    rationale = `High inventory levels coupled with decelerating velocity triggered a defensive ${((1 - recPrice / current_price) * 100).toFixed(1)}% markdown to stimulate volume.`;

    if (recPrice < priceFloor) {
      recPrice = priceFloor;
      strategy = "Competitor Match";
      rationale = `High stock and weak demand warrant markdown, but safety price floor of COGS + 5% ($${priceFloor.toFixed(2)}) is preserved to protect profitability.`;
    }
  }
  // Rule 3: High Stock only
  else if (inventory_level === "High") {
    recPrice = Math.max(current_price * 0.94, compAvg * 0.97);
    strategy = "Markdown";
    driver = "Inventory";
    rationale = `Elevated stock levels require an incremental markdown to accelerate inventory turns.`;

    if (recPrice < priceFloor) {
      recPrice = priceFloor;
      strategy = "Stable";
      rationale = `Inventory levels are high, but price is preserved at safety floor ($${priceFloor.toFixed(2)}) to shield unit margins.`;
    }
  }
  // Rule 4: Low Stock only
  else if (inventory_level === "Low") {
    recPrice = current_price * 1.06;
    strategy = "Surge";
    driver = "Inventory";
    rationale = `Diminished stock counts trigger a protective 6% price buffer to slow inventory depletion and avoid stockouts.`;
  }
  // Rule 5: Accelerating demand only
  else if (demand_velocity === "Accelerating") {
    recPrice = current_price * 1.05;
    strategy = "Surge";
    driver = "Demand Velocity";
    rationale = `Accelerating market velocity allows for a 5% optimization markup to capture dynamic consumer surplus.`;
  }
  // Rule 6: Decelerating demand only
  else if (demand_velocity === "Decelerating") {
    recPrice = Math.max(current_price * 0.95, lowestComp);
    strategy = "Markdown";
    driver = "Demand Velocity";
    rationale = `Slowing market momentum prompts a conservative 5% price markdown to maintain competitive positioning.`;

    if (recPrice < priceFloor) recPrice = priceFloor;
  }
  // Default Target Margin Alignment
  else {
    const targetPrice = cogs * (1 + target_margin / 100);
    if (current_price < targetPrice && compAvg > current_price) {
      recPrice = Math.min(targetPrice, compAvg);
      strategy = "Stable";
      driver = "Competitor";
      rationale = `Price optimized towards the ${target_margin}% target margin, justified by higher competitor benchmark averages.`;
    } else {
      recPrice = current_price;
      strategy = "Stable";
      driver = "Demand Velocity";
      rationale = `Market conditions are stable; the active price point is optimal and balanced.`;
    }
  }

  // Ensure price never drops below safety floor unless explicitly liquidating
  if (recPrice < priceFloor) {
    recPrice = priceFloor;
    strategy = isLiquidation ? "Liquidation" : "Stable";
    rationale = `Pricing adjustment capped at absolute regulatory price floor of COGS + 5% ($${priceFloor.toFixed(2)}) to block margin erosion.`;
  }

  const price_change_percentage = ((recPrice - current_price) / current_price) * 100;

  return {
    product_id: product.id,
    recommended_price: Number(recPrice.toFixed(2)),
    price_change_percentage: Number(price_change_percentage.toFixed(2)),
    strategy_applied: strategy,
    primary_driver: driver,
    rationale,
  };
}

// API Routes

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Create or Update Product
app.post("/api/products", (req, res) => {
  const { id, name, category, current_price, cogs, target_margin, inventory_level, inventory_units, demand_velocity, competitor_prices } = req.body;

  if (!id || !name || current_price === undefined || cogs === undefined) {
    return res.status(400).json({ error: "Missing required product fields" });
  }

  const existingIdx = products.findIndex((p) => p.id === id);
  const updatedProduct = {
    id,
    name,
    category: category || "General",
    current_price: Number(current_price),
    cogs: Number(cogs),
    target_margin: Number(target_margin || 20),
    inventory_level: inventory_level || "Medium",
    inventory_units: Number(inventory_units || 0),
    demand_velocity: demand_velocity || "Stable",
    competitor_prices: competitor_prices ? competitor_prices.map(Number) : [],
  };

  if (existingIdx >= 0) {
    products[existingIdx] = updatedProduct;
  } else {
    products.push(updatedProduct);
  }

  res.json(updatedProduct);
});

// Delete Product
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  products = products.filter((p) => p.id !== id);
  res.json({ success: true });
});

// Reset Products
app.post("/api/products/reset", (req, res) => {
  products = [
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
    },
  ];
  res.json(products);
});

// Run Heuristic Optimization on a payload
app.post("/api/analyze-heuristic", (req, res) => {
  const { product, isLiquidation } = req.body;
  if (!product) {
    return res.status(400).json({ error: "Missing product data payload" });
  }
  const result = calculateHeuristicPricing(product, isLiquidation);
  res.json(result);
});

// Run AI Dynamic Pricing Agent (Gemini API)
app.post("/api/analyze-ai", async (req, res) => {
  const { product, isLiquidation, currency, region, geopoliticalEvent, currencyVolatility, systemInstruction } = req.body;
  if (!product) {
    return res.status(400).json({ error: "Missing product data payload" });
  }

  const client = getAIClient();
  if (!client) {
    return res.status(503).json({
      error: "Gemini API key is unconfigured. Please set GEMINI_API_KEY in Settings > Secrets.",
      isUnconfigured: true,
    });
  }

  try {
    const userSystemInstruction = systemInstruction || "You are an expert AI Dynamic Pricing Analyst. Maximize profit margins dynamically while remaining market competitive.";

    const prompt = `You are a customized AI Dynamic Pricing Agent. You MUST operate according to the following custom instructions:
=== CUSTOM USER INSTRUCTIONS ===
${userSystemInstruction}
================================

To assist your analysis, here is the current data payload:
Current Global Context:
- Target Region: "${region || "Global"}"
- Active Display Currency: "${currency || "USD"}"
- Geopolitical Event Active: "${geopoliticalEvent || "None (Stable market politics)"}"
- Currency Volatility / Swing: "${currencyVolatility || "None (Stable exchange rates)"}"

Current SKU Payload:
- product_id: "${product.id}"
- name: "${product.name}"
- current_price: ${product.current_price}
- cost_of_goods_sold (COGS): ${product.cogs}
- target_margin: ${product.target_margin}%
- inventory_level: "${product.inventory_level}"
- demand_velocity: "${product.demand_velocity}"
- competitor_prices: [${product.competitor_prices.join(", ")}]
- isLiquidation: ${isLiquidation ? "true" : "false"}

Competitor statistics for your awareness:
- Average Competitor Price: $${(product.competitor_prices.length > 0 ? product.competitor_prices.reduce((a: number, b: number) => a + b, 0) / product.competitor_prices.length : product.current_price).toFixed(2)}
- Lowest Competitor Price: $${(product.competitor_prices.length > 0 ? Math.min(...product.competitor_prices) : product.current_price).toFixed(2)}

Perform rigorous pricing analysis. Adhere strictly to the Custom User Instructions above as your primary directive. Ensure your recommended price, strategy, driver, and rationale reflect your custom instructions.`;

    const response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: `${userSystemInstruction} Return responses STRICTLY conforming to the requested JSON schema. Do not include any pre-prose or post-prose.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            product_id: { type: Type.STRING },
            recommended_price: { type: Type.NUMBER, description: "The dynamic recommended price optimized based on the rules" },
            price_change_percentage: { type: Type.NUMBER, description: "The percentage difference from current_price. Positive for increases, negative for decreases." },
            strategy_applied: { 
              type: Type.STRING, 
              enum: ["Surge", "Competitor Match", "Markdown", "Liquidation", "Stable"],
              description: "The core strategy applied to optimize the price."
            },
            primary_driver: { 
              type: Type.STRING, 
              enum: ["Inventory", "Competitor", "Demand Velocity"],
              description: "The main market factor driving this adjustment."
            },
            rationale: { type: Type.STRING, description: "A concise, one-sentence rationale explaining the price adjustment based on the metrics." },
          },
          required: ["product_id", "recommended_price", "price_change_percentage", "strategy_applied", "primary_driver", "rationale"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini pricing agent error:", error);
    res.status(500).json({ error: "Gemini analysis failed: " + error.message });
  }
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

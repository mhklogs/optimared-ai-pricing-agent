<div align="center">

# OptimaRed — AI Dynamic Pricing Agent

**Enterprise-grade dynamic pricing co-pilot** that monitors your catalog, competitor prices, inventory velocity and global market shocks (tariffs, shipping delays, FX swings) — then recommends and applies profit-optimizing prices, powered by a programmable heuristic rule engine and a Gemini AI pricing agent.

</div>

## Features

- **Heuristic Pricing Engine** — rule-based repricing (surge, markdown, competitor match, liquidation) with a COGS + 5% safety floor.
- **Gemini AI Pricing Agent** — custom system-instruction driven analysis of SKU metrics, region, currency and market events. Fully optional; gracefully falls back to a local simulation when no API key is configured.
- **Live Market Simulations** — toggle tariff shocks, Suez/shipping delays and currency volatility to watch recommendations react in real time.
- **SKU Catalog** — create, edit, delete, reset or wipe products; track margins, inventory levels and demand velocity.
- **Store Integration Panel** — connect/disconnect/sync Shopify, Amazon, WooCommerce and eBay UI bindings.
- **Multi-Currency & Region** — display prices in 8 currencies with regional defaults.
- **AI Auto-Pilot** — opt-in mode that automatically applies AI recommendations on market shifts.
- **Offline-first PWA** — state persisted to local storage; service worker caching; native push alerts.

## Quickstart

**Prerequisites:** Node.js 18+.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (copy from `.env.example`) and set your key:
   ```bash
   cp .env.example .env
   # GEMINI_API_KEY=<your key>
   ```

3. Run the app:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

No API key? The dashboard still works — the AI panel runs in a safe sandbox fallback mode so nothing crashes.

## Production build

```bash
npm run build   # bundles the client and the Express server into dist/
npm start       # serves the production build on PORT (default 3000)
```

## Deploy to Vercel

The repo ships with a `vercel.json` and a `api/index.ts` serverless function, so it deploys as-is. Add the following Environment Variables in the Vercel dashboard:

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | No* | Gemini API key for AI recommendations. Without it the app uses sandbox fallback. |
| `GEMINI_MODEL` | No | Gemini model used for AI analysis (default: `gemini-3.5-flash`). |
| `APP_URL` | No | Public URL of the deployed app. |

_*Recommended — without `GEMINI_API_KEY` the AI agent runs in degraded simulation mode._

## Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | No | — | Gemini API key. Missing/placeholder value enables sandbox fallback mode. |
| `GEMINI_MODEL` | No | `gemini-3.5-flash` | Gemini model for AI pricing analysis. |
| `PORT` | No | `3000` | Port for the local/production Node server. |
| `APP_URL` | No | — | Public URL used for self-referential links. |

## API

- `GET /api/products` — list catalog
- `POST /api/products` — create/update a product
- `DELETE /api/products/:id` — remove a product
- `POST /api/products/reset` — restore the baseline catalog
- `POST /api/analyze-heuristic` — run the rule engine on a product payload
- `POST /api/analyze-ai` — run the Gemini pricing agent on a product payload

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Express · Google GenAI SDK · Lucide icons · Motion
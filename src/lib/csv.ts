import { Product } from "../types";

const CSV_HEADER = [
  "id",
  "name",
  "category",
  "current_price",
  "cogs",
  "target_margin",
  "inventory_level",
  "inventory_units",
  "demand_velocity",
  "competitor_prices",
  "connectedChannels",
];

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportProductsToCsv(products: Product[]): string {
  const lines: string[] = [CSV_HEADER.join(",")];

  products.forEach((p) => {
    const row = [
      p.id,
      p.name,
      p.category || "",
      p.current_price,
      p.cogs,
      p.target_margin,
      p.inventory_level,
      p.inventory_units,
      p.demand_velocity,
      (p.competitor_prices || []).join(";"),
      (p.connectedChannels || []).join(";"),
    ];
    lines.push(row.map(escapeCsvValue).join(","));
  });

  return lines.join("\r\n");
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += ch;
    }
    i++;
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function normalizeLevel(value: string): "High" | "Medium" | "Low" {
  if (/high/i.test(value)) return "High";
  if (/low/i.test(value)) return "Low";
  return "Medium";
}

function normalizeVelocity(value: string): "Accelerating" | "Stable" | "Decelerating" {
  if (/accel/i.test(value)) return "Accelerating";
  if (/decel/i.test(value)) return "Decelerating";
  return "Stable";
}

function parseNumber(raw: string, fallback: number): number {
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function parseProductsCsv(text: string): Product[] {
  const rows = parseCsv(text);
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idxOf = (name: string) => header.indexOf(name);

  const idI = idxOf("id");
  const nameI = idxOf("name");
  const categoryI = idxOf("category");
  const priceI = idxOf("current_price");
  const cogsI = idxOf("cogs");
  const targetI = idxOf("target_margin");
  const levelI = idxOf("inventory_level");
  const unitsI = idxOf("inventory_units");
  const velocityI = idxOf("demand_velocity");
  const compI = idxOf("competitor_prices");
  const channelsI = idxOf("connectedchannels");

  const products: Product[] = [];

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const get = (i: number) => (i >= 0 ? (cells[i] ?? "").trim() : "");

    const name = get(nameI);
    if (!name) continue;

    let id = get(idI);
    if (!id) id = `SKU-${Math.floor(100 + Math.random() * 900)}`;

    const competitorRaw = get(compI).replace(/\[|\]/g, "");
    const competitor_prices = competitorRaw
      .split(/[;,\s]+/)
      .map((s) => parseNumber(s, NaN))
      .filter((n) => Number.isFinite(n) && n > 0);
    // Handle a single quoted cell like "240,255,230" that got no whitespace splits
    if (competitor_prices.length === 0 && competitorRaw) {
      const single = parseFloat(competitorRaw.replace(/,/g, ""));
      if (Number.isFinite(single) && single > 0) competitor_prices.push(single);
    }

    const connectedChannels = get(channelsI)
      .split(/[;,\s]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    products.push({
      id,
      name,
      category: get(categoryI) || "General",
      current_price: parseNumber(get(priceI), 0),
      cogs: parseNumber(get(cogsI), 0),
      target_margin: parseNumber(get(targetI), 30),
      inventory_level: normalizeLevel(get(levelI)),
      inventory_units: parseNumber(get(unitsI), 0),
      demand_velocity: normalizeVelocity(get(velocityI)),
      competitor_prices,
      connectedChannels,
    });
  }

  return products;
}

export function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
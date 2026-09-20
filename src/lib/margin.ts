import { Product } from "../types";

export function getMargin(product: Product): number {
  if (!product.current_price || product.current_price <= 0) return 0;
  return ((product.current_price - product.cogs) / product.current_price) * 100;
}

export function getMarginHealth(product: Product, currentMargin: number): "healthy" | "watch" | "risk" {
  const gap = product.target_margin - currentMargin;
  if (gap <= 0) return "healthy";
  if (gap <= 5) return "watch";
  return "risk";
}

function escapeCsv(value: string | number): string {
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildCatalogReportCsv(products: Product[]): string {
  const header = [
    "id",
    "name",
    "category",
    "current_price",
    "cogs",
    "current_margin_pct",
    "target_margin_pct",
    "health",
  ];
  const lines: string[] = [header.join(",")];

  products.forEach((p) => {
    const margin = getMargin(p);
    const health = getMarginHealth(p, margin);
    lines.push(
      [
        p.id,
        p.name,
        p.category || "",
        p.current_price,
        p.cogs,
        Number(margin.toFixed(2)),
        p.target_margin,
        health,
      ]
        .map(escapeCsv)
        .join(",")
    );
  });

  return lines.join("\r\n");
}
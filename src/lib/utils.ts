import { type ClassValue, clsx } from "clsx";

/**
 * Merges class names with clsx
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format number with locale-aware formatting
 */
export function formatNumber(value: number, locale: string = "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US").format(value);
}

/**
 * Format currency
 */
export function formatCurrency(value: number, locale: string = "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Truncate text to a specific length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

/**
 * Generate random number in range for demo data
 */
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate demo revenue data for charts
 */
export function generateRevenueData(months: number = 12) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let base = 45000;
  return Array.from({ length: months }, (_, i) => {
    base = base + randomInRange(-3000, 12000);
    return {
      month: monthNames[i],
      revenue: Math.max(base, 20000),
      target: 60000 + i * 2000,
    };
  });
}

/**
 * Get direction based on locale
 */
export function getDirection(locale: string): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

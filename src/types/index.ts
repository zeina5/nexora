// Global TypeScript types for Nexora

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  locale: Locale;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
}

export interface AlertItem {
  id: string;
  type: "warning" | "error" | "success" | "info";
  message: string;
  time: string;
}

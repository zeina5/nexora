import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Nexora",
    default: "Nexora — Intelligence at the Speed of Your Business",
  },
  description:
    "Nexora unifies your data streams into a single predictive intelligence layer. Real-time analytics, predictive modeling, and team collaboration for modern data teams.",
  metadataBase: new URL("https://nexora.io"),
};

/**
 * Root layout — minimal wrapper, locale layout handles everything
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

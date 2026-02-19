import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoDashboard } from "@/components/demo/DemoDashboard";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "demo" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

/**
 * Interactive demo page with fake AI analytics dashboard
 */
export default function DemoPage({ params: { locale } }: PageProps) {
  return (
    <>
      <Header />
      <main id="main-content">
        <DemoDashboard />
      </main>
      <Footer locale={locale} />
    </>
  );
}

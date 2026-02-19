"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@mantine/core";

const ThemeToggleClient = dynamic(
  () =>
    import("@/components/layout/ThemeToggleClient").then(
      (m) => m.ThemeToggleClient
    ),
  {
    ssr: false,
    loading: () => <Skeleton width={36} height={36} radius="md" />,
  }
);

export function ThemeToggle() {
  return <ThemeToggleClient />;
}
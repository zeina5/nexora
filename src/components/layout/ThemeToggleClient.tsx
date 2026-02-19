"use client";

import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "lucide-react";

/**
 * The actual toggle UI — rendered only on the client via dynamic import.
 * Keeping this separate prevents the Sun/Moon SVG from causing a hydration
 * mismatch because the server has no way to know the user's preferred color scheme.
 */
export function ThemeToggleClient() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  const isDark = computedColorScheme === "dark";

  return (
    <Tooltip label={isDark ? "Light mode" : "Dark mode"} position="bottom" withArrow>
      <ActionIcon
        onClick={() => setColorScheme(isDark ? "light" : "dark")}
        variant="subtle"
        color="gray"
        size="lg"
        radius="md"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </ActionIcon>
    </Tooltip>
  );
}

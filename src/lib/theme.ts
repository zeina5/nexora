import { createTheme, MantineColorsTuple, rem } from "@mantine/core";

// Custom color: Nexora Indigo-Cyan brand
const nexoraIndigo: MantineColorsTuple = [
  "#eef2ff",
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
];

const nexoraCyan: MantineColorsTuple = [
  "#ecfeff",
  "#cffafe",
  "#a5f3fc",
  "#67e8f9",
  "#22d3ee",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",
];

export const nexoraTheme = createTheme({
  fontFamily: "'Sora', 'DM Sans', sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', 'Fira Code', monospace",

  headings: {
    fontFamily: "'Sora', 'DM Sans', sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(64), lineHeight: "1.1", fontWeight: "800" },
      h2: { fontSize: rem(48), lineHeight: "1.15", fontWeight: "700" },
      h3: { fontSize: rem(32), lineHeight: "1.25", fontWeight: "600" },
      h4: { fontSize: rem(24), lineHeight: "1.35", fontWeight: "600" },
      h5: { fontSize: rem(20), lineHeight: "1.45" },
      h6: { fontSize: rem(16), lineHeight: "1.5" },
    },
  },

  primaryColor: "indigo",
  primaryShade: { light: 6, dark: 5 },

  colors: {
    indigo: nexoraIndigo,
    cyan: nexoraCyan,
  },

  defaultRadius: "md",

  radius: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
    "2xl": rem(48),
    "3xl": rem(64),
    "4xl": rem(80),
  },

  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },

  shadows: {
    xs: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    sm: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)",
    md: "0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05)",
    lg: "0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)",
    xl: "0 25px 50px rgba(0,0,0,0.12)",
    "glow-indigo": "0 0 40px rgba(99, 102, 241, 0.25)",
    "glow-cyan": "0 0 40px rgba(6, 182, 212, 0.20)",
  },

  other: {
    gradients: {
      brand: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
      brandSubtle: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(6,182,212,0.15) 100%)",
      dark: "linear-gradient(180deg, #0f0f1a 0%, #13131f 100%)",
    },
  },

  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 600,
          letterSpacing: "-0.01em",
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: "xl",
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        padding: "xl",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});

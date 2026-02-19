# Nexora — Production-Grade Bilingual SaaS Marketing Website

> A premium, multilingual SaaS marketing platform built with **Next.js 14 App Router**, **TypeScript (strict)**, **Mantine UI**, and **Framer Motion** — with full Arabic/English RTL/LTR support.

---

## 🏗️ Architecture Overview

This project is structured around **feature-based separation** with a clear distinction between:
- **Server Components** (data fetching, static rendering, SEO metadata)
- **Client Components** (interactivity, animations, state)
- **UI Primitives** (reusable atomic components built on top of Mantine)
- **Layout Components** (header, footer, navigation)
- **Section Components** (full-page sections assembled in pages)

---

## 📁 Folder Structure

```
nexora/
├── messages/                   # i18n translation JSON files
│   ├── en.json                 # English strings
│   └── ar.json                 # Arabic strings
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (minimal passthrough)
│   │   ├── not-found.tsx       # Root 404 redirect
│   │   └── [locale]/           # All pages scoped to locale
│   │       ├── layout.tsx      # Locale layout — Mantine + i18n + RTL
│   │       ├── page.tsx        # Landing page
│   │       ├── demo/
│   │       │   └── page.tsx    # Interactive analytics dashboard
│   │       ├── blog/
│   │       │   ├── page.tsx    # Blog listing
│   │       │   └── [slug]/
│   │       │       └── page.tsx # Blog post with MDX
│   │       └── not-found.tsx   # Locale-aware 404
│   │
│   ├── components/
│   │   ├── ui/                 # Atomic reusable primitives
│   │   │   ├── SectionBadge    # Animated section labels
│   │   │   ├── GradientButton  # CTA button with hover effects
│   │   │   ├── FeatureCard     # Feature grid card
│   │   │   └── MetricCard      # Dashboard KPI card
│   │   ├── layout/             # App-wide layout components
│   │   │   ├── Header          # Scroll-aware sticky nav
│   │   │   ├── Footer          # Site footer (Server Component)
│   │   │   ├── LanguageSwitcher # EN/AR language dropdown
│   │   │   └── ThemeToggle     # Dark/Light mode button
│   │   ├── sections/           # Full landing page sections
│   │   │   ├── HeroSection     # Animated hero with dashboard preview
│   │   │   ├── FeaturesSection # Feature grid
│   │   │   ├── PricingSection  # Pricing cards with billing toggle
│   │   │   ├── TestimonialsSection
│   │   │   └── CTASection      # Final call-to-action
│   │   ├── demo/               # Dashboard demo components
│   │   │   └── DemoDashboard   # Full analytics UI with recharts
│   │   └── blog/               # Blog-specific components
│   │
│   ├── i18n/
│   │   ├── routing.ts          # next-intl routing config (locales, prefix)
│   │   └── request.ts          # Server-side message loading
│   │
│   ├── lib/
│   │   ├── theme.ts            # Mantine theme — fonts, colors, spacing
│   │   ├── animations.ts       # Framer Motion variants & utilities
│   │   ├── utils.ts            # Shared utility functions
│   │   └── blog.ts             # Blog data access layer
│   │
│   ├── middleware.ts            # next-intl locale detection middleware
│   ├── styles/
│   │   └── globals.css         # Global CSS — fonts, variables, utilities
│   └── types/
│       └── index.ts            # Global TypeScript interfaces
```

---

## 🎨 Theming Strategy

The custom Mantine theme (`src/lib/theme.ts`) defines:

| Token | Value |
|-------|-------|
| **Primary Font** | `Sora` (headings, UI) |
| **Body Font** | `DM Sans` |
| **Mono Font** | `JetBrains Mono` |
| **RTL Font** | `Noto Sans Arabic` |
| **Brand Color** | Indigo `#6366f1` |
| **Accent Color** | Cyan `#06b6d4` |
| **Default Radius** | `md` (12px) |
| **Primary Shade** | light: 6, dark: 5 |

**Color scheme**: `defaultColorScheme="dark"` with Mantine's `light-dark()` CSS function used throughout `.module.css` files for automatic dark/light value switching — no JavaScript color switching at the component level.

---

## 🌍 i18n Implementation

Uses **next-intl** with the App Router `[locale]` segment pattern:

- Routes: `/en/*` and `/ar/*`
- `messages/en.json` and `messages/ar.json` contain all UI strings
- `src/i18n/routing.ts` — defines supported locales, default locale, and `localePrefix: "always"`
- `src/middleware.ts` — handles locale detection and redirection
- The `[locale]/layout.tsx` sets `<html lang dir>` attributes dynamically:
  - `dir="rtl"` when `locale === "ar"`
  - `dir="ltr"` for all other locales
- `LanguageSwitcher` component uses `useRouter().replace()` from next-intl's navigation to switch locales without full page reload

---

## ⚡ Performance Considerations

| Area | Strategy |
|------|----------|
| **Server Components** | All data-fetching pages (blog, homepage) are RSC |
| **Client Components** | Only interactive sections (animations, toggles, charts) |
| **Images** | `next/image` with `avif` + `webp` formats |
| **Fonts** | Google Fonts with `display=swap`, preconnect headers |
| **Package optimization** | `optimizePackageImports` for Mantine + Framer Motion |
| **Animation** | `will-change: transform` on animated orbs; `once: true` on viewport triggers |
| **Bundle splitting** | Dynamic imports recommended for heavy chart libs in production |
| **Caching** | Default Next.js static generation for all RSC pages |

---

## 🔐 TypeScript Strict Mode

All modules use `strict: true` with:
- Explicit return types on all exported functions
- No `any` (ESLint rule enforced)
- Interface-first typing in `src/types/index.ts`
- Type-safe translation keys via `useTranslations` generics
- CSS Modules typed via `*.module.css` pattern

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) — it will redirect to `/en`.

To view Arabic RTL version: [http://localhost:3000/ar](http://localhost:3000/ar)

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next@14` | Framework — App Router |
| `@mantine/core@7` | UI component system |
| `next-intl@3` | i18n — routing, translations, RSC support |
| `framer-motion@11` | Animations and transitions |
| `recharts@2` | Analytics dashboard charts |
| `@next/mdx` | MDX blog content support |
| `rehype-highlight` | Code syntax highlighting in MDX |
| `lucide-react` | Icon system |

---

## 🧩 Adding a New Section

1. Create `src/components/sections/NewSection.tsx` + `NewSection.module.css`
2. Add translation keys to both `messages/en.json` and `messages/ar.json`
3. Import and add to `src/app/[locale]/page.tsx`
4. Use `SectionBadge` + Framer Motion `whileInView` for consistent animation entry

---

## 📝 Adding Blog Posts

1. Create `content/blog/en/your-slug.mdx`
2. Create `content/blog/ar/your-slug.mdx`
3. Add entry to `blogPosts` and `blogPostsAr` arrays in `src/lib/blog.ts`
4. The `[slug]` dynamic route handles rendering automatically

---

## 🏢 Production Deployment

Recommended: **Vercel** (zero-config Next.js support)

```bash
vercel --prod
```

Environment variables needed: none for base setup.

---

Built with ❤️ using Next.js, Mantine UI, and next-intl.

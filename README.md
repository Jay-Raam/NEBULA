# ⚡ NEBULA — Premium Next.js Activewear Storefront

> **Engineered for High-Performance Athletics.**  
> An ultra-modern, high-converting e-commerce web application engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **Framer Motion 12**.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?logo=framer&logoColor=white)](https://motion.dev/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-1.27-orange)](https://lucide.dev/)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Design System & Tailwind v4](#-design-system--tailwind-v4)
- [Performance & Core Web Vitals](#-performance--core-web-vitals)
- [Contributing & License](#-contributing--license)

---

## 🌌 Overview

**NEBULA** is a high-performance activewear and athletic apparel storefront designed for seamless shopping experiences across desktop and mobile devices. Utilizing **Next.js 16 Server Components** for near-instant Initial Server Renders and **React 19 Client Components** for rich interactive cart state and animated interactions, NEBULA represents modern, performant e-commerce engineering.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            NEBULA ARCHITECTURE                              │
│                                                                             │
│   Next.js 16 App Router (RSC) ───► Static Shell & SEO Metadata              │
│   React 19 Client Hydration   ───► Interactive Cart Drawer & Filter Engine  │
│   Tailwind CSS v4 JIT         ───► Zero-Runtime Responsive Styling          │
│   Framer Motion 12            ───► GPU-Accelerated Micro-Animations         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ System Architecture

1. **React Server Components (RSC)**: Product catalog grids, brand story layouts, and category landing pages are rendered server-side to maximize SEO discoverability and minimize client JavaScript payloads.
2. **Client-Side Interactivity**: Size selectors, dynamic cart drawer slide-overs, image zoom overlays, and instant search queries operate client-side with minimal state re-renders.
3. **Optimized Asset Delivery**: Product visual assets are optimized using Next.js Image optimization (`next/image`), serving WebP/AVIF formats with responsive `srcset` definitions.

---

## ✨ Key Features

- **Dynamic Catalog & Advanced Filtering**: Fast faceted search filtering by sport category (Training, Running, Compression, Lifestyle), size availability (XS – XXL), compression rating, and price spectrum.
- **Interactive Product Experience (PDP)**:
  - Multi-angle high-resolution gallery view with smooth thumbnail switching.
  - Interactive size & fit recommendation selector.
  - Dynamic stock indicator with low-stock badges.
  - Expandable material engineering specs (Moisture-wicking, 4-Way Stretch, Seamless Knit).
- **Slide-Over Cart Drawer**:
  - Global reactive cart state with slide-over animated panel.
  - Live order total calculation with free-shipping milestone progress bar.
  - One-click item quantity adjustments and size swaps without page reloads.
- **Kinetic Micro-Interactions**:
  - Smooth page transitions and entrance animations powered by **Framer Motion**.
  - Glassmorphic sticky header with backdrop blur and scroll-direction awareness.
  - Hover zoom and dynamic image reveal effects on product cards.
- **Fluid Dark-Themed Aesthetic**: Designed with an ultra-sleek, technical luxury activewear dark mode aesthetic built on modern Tailwind CSS v4 color tokens.

---

## 💻 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (`next`) | App Router, Server Components, Route Handlers |
| **UI Library** | React 19 (`react`, `react-dom`) | Declarative UI component architecture |
| **Language** | TypeScript 5 (`typescript`) | Strict type checking, interfaces, and prop contracts |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss`) | Modern CSS-first styling engine with native `@layer` |
| **Animations** | Framer Motion 12 (`framer-motion`) | Physics-based micro-interactions & layout animations |
| **Icons** | Lucide React (`lucide-react`) | Lightweight, tree-shakable SVG icon system |
| **Linting** | ESLint 9 (`eslint-config-next`) | Code consistency and best practice enforcement |

---

## 📂 Project Structure

```text
NEBULA/
├── public/                 # Static brand assets, fonts, icons, product photography
├── src/
│   ├── app/                # Next.js 16 App Router
│   │   ├── layout.tsx      # Root layout with font optimization & global providers
│   │   ├── page.tsx        # High-converting storefront homepage
│   │   ├── shop/           # Filterable product catalog route
│   │   │   └── page.tsx
│   │   ├── product/[slug]/ # Dynamic Product Detail Page (PDP)
│   │   │   └── page.tsx
│   │   └── cart/           # Dedicated checkout preparation view
│   │       └── page.tsx
│   ├── components/         # Reusable UI component library
│   │   ├── CartDrawer.tsx  # Slide-over shopping bag with shipping progress
│   │   ├── Navbar.tsx      # Glassmorphic header with search trigger
│   │   ├── Footer.tsx      # Brand footer with newsletter subscribe
│   │   ├── ProductCard.tsx # Animated activewear product item with hover states
│   │   ├── ProductGrid.tsx # Responsive catalog layout with filter controls
│   │   └── SizeSelector.tsx# Dynamic size & fit selection widget
│   ├── context/            # Global React Cart & Wishlist state providers
│   ├── data/               # Mock product catalog, technical specs, and collections
│   ├── types/              # TypeScript domain types (Product, CartItem, FilterState)
│   └── styles/             # Global CSS and Tailwind v4 theme configurations
├── .github/                # GitHub Actions CI pipelines
├── next.config.ts          # Next.js compiler and image domain configs
├── postcss.config.mjs      # PostCSS configuration for Tailwind v4
├── tsconfig.json           # Strict TypeScript compiler options
├── package.json            # Scripts & project dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**, **yarn**, or **pnpm**

---

### 1. Clone the Repository

```bash
git clone https://github.com/Jay-Raam/NEBULA.git
cd NEBULA
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run Development Server

```bash
npm run dev
```

Open **`http://localhost:3000`** in your browser to view the storefront.

---

### 4. Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run start
```

---

### 5. Lint & Typecheck

```bash
npm run lint
```

---

## 🎨 Design System & Tailwind v4

NEBULA leverages **Tailwind CSS v4**'s CSS-first theme configuration:

- **Color Palette**: Minimalist high-contrast obsidian dark palette (`#080808`, `#121212`, `#1A1A1A`) with neon hyper-volt accents (`#D4FF00`, `#00F0FF`).
- **Typography**: Precision geometric sans-serif typography engineered for modern sports lifestyle branding.
- **Surface Depth**: Frosted glassmorphic cards (`backdrop-blur-md bg-neutral-900/40 border-neutral-800`).

---

## ⚡ Performance & Core Web Vitals

- **Zero Layout Shift (CLS = 0)**: Fixed aspect-ratio image containers and skeleton loaders prevent layout jumping during dynamic hydration.
- **Fast Largest Contentful Paint (LCP < 1.2s)**: Above-the-fold hero assets are prioritized using Next.js `priority` attribute.
- **Tree-Shaking**: All icon imports and motion components are fully tree-shaken, keeping initial client bundles ultra-lean.

---

## 📄 License

This project is open source and available under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

*Engineered with precision by [Jayasriraam S](https://github.com/Jay-Raam)*

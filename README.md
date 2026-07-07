# New Machine — Marketing Website

Production static marketing website for **New Machine** ([newmachine.com.ph](https://newmachine.com.ph)), a digital growth agency with coworking hubs in San Francisco (WeWork, 535 Mission St) and Makati (KMC, V Corporate Centre, Salcedo Village) serving the US and Philippine markets — and clients worldwide.

## Stack

- **Next.js 16** (App Router, static export via `output: "export"`)
- **React 19** · **TypeScript (strict)**
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **lucide-react** icons · **next-mdx-remote** for blog MDX
- No backend, no database — everything ships as static HTML/CSS/JS in `/out`

## Quickstart

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export → /out
```

The production build writes a fully static site to `/out`. Deploy that folder anywhere.

## Editing content

### `src/config/site.ts` — THE file

Every owner-editable value lives here. What each field does:

| Field | Purpose |
|---|---|
| `name` / `legalName` | Brand name (components) / legal entity name (legal pages) |
| `url` | Production URL — canonical links, sitemap, OG tags |
| `domain` | Display domain (`{{DOMAIN}}` token) |
| `tagline` / `description` | Brand line + default meta description |
| `email` | Contact email — mailto links, form fallback, legal pages |
| `whatsapp` | WhatsApp number, international format, digits only (e.g. `12125550100`) |
| `videoId` | YouTube ID for the hero + testimonials explainer video |
| `formEndpoint` | Static form provider URL; empty string = mailto fallback (see below) |
| `socials` | Footer social links (`label` + `href`) |
| `builtFor` | Hero typewriter industries — add/remove freely |
| `stats` | Four hero glass-card stats (`value` + `label`) |
| `testimonials` | Two testimonials on the home page (`quote`, `name`, `role`) |

### JSON content

- `src/content/services.json` — service catalog (see "Phase 2/3 services" below)
- `src/content/products.json` — product cards: `{ name, status, oneLiner, link }`. `status` is `"In Development" | "Beta" | "Live"`; a non-empty `link` renders a "Visit" button
- `src/content/faq.json` — FAQ items: `{ q, a }` — rendered on the home page and emitted as FAQPage JSON-LD
- `src/content/work.json` — case studies, the data behind `/work`, `/work/<slug>` and the home Impact section. Each entry carries the card fields (`client`, `industry`, `service`, `story`, `metric`, `metricLabel`), the narrative (`summary`, `challenge`, `approach[]`, `outcome`, `deliverables[]`, `quote`), a 12-month metric `series` (`months`, `values`, `launchIndex` = first post-launch month, `unit`, `label`) and `kpis[]` (`before`/`after` numbers drive the dumbbell scale; `beforeLabel`/`afterLabel` carry the units; `delta` is the printed change). Current entries are **representative sample data** — clearly labeled as such in the UI; replace with real, client-consented numbers before running paid traffic. The home Impact section's median tiles are hand-computed from these entries — recompute if you change them.

### Case-study charts

`src/components/charts/` renders all data visualization as dependency-free SVG:

- `TrendChart` — 12-month line chart; pre-launch months in a de-emphasis gray, post-launch in the data hue with an area wash, launch rule, endpoint label, hover crosshair + tooltip, and a visually hidden data table for screen readers
- `Dumbbell` — before → after KPI rows, every value directly labeled
- `Sparkline` — decorative mini-trend for work cards

Chart colors are the `--chart-data` / `--chart-dim` tokens in `globals.css`, validated per theme (lightness band, CVD separation, ≥3:1 contrast against the card surface). If you rebrand `--accent`, re-derive these two per theme rather than reusing the accent directly.

### Blog (MDX)

Add a file to `content/blog/<slug>.mdx`:

```mdx
---
title: "Your post title"
description: "One-sentence summary used in cards and meta tags."
date: "2026-07-01"
tags: ["Websites", "Conversion"]
---

Your content in Markdown/MDX…
```

The filename becomes the URL (`/blog/<slug>/`). Reading time is computed automatically. Posts are sorted by `date` descending. Rebuild to publish.

## How to add Phase 2/3 services

Append to `src/content/services.json` with `phase: 2` (or `3`):

```json
{
  "phase": 2,
  "slug": "seo",
  "name": "SEO",
  "icon": "zap",
  "tint": "#38bdf8",
  "outcome": "…",
  "description": "…",
  "includes": ["…", "…", "…", "…", "…", "…"],
  "forWho": "…"
}
```

The services page groups by phase automatically: `1` renders under "Available now", `2` under "Coming soon", `3` under "On the roadmap". No code changes needed. To add a new `icon` value, extend the single `serviceIcons` map in `src/lib/services.ts` — the nav, services page and bento all read from it.

## Swap the form provider

Set `formEndpoint` in `src/config/site.ts`:

- **Formspree**: `formEndpoint: "https://formspree.io/f/YOUR_FORM_ID"`
- **Web3Forms**: `formEndpoint: "https://api.web3forms.com/submit"` (add a hidden `access_key` input in `src/app/contact/ContactForm.tsx`)
- **Empty string** (`""`): the form falls back to opening the visitor's email app (`mailto:` with the message pre-filled)

The form POSTs `FormData` with an `Accept: application/json` header — compatible with all static-friendly form providers. A honeypot field (`website`) silently drops bot submissions.

## Design system

- **Fonts:** [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) for display/headlines (`font-display` utility) + [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) for body/UI. Change them in `src/app/layout.tsx` (next/font) and the `--font-*` mappings in `globals.css`.
- **No rounded corners.** Everything is sharp; the signature is the `.chamfer` clip-path (45° cut corner) on primary buttons and key surfaces. The only circles are the custom cursor.
- **Brand patterns** (traced from the reference art, both in `src/components/ui/`):
  - `PatternTrace` — thin-line chamfered-rectangle circuit motif (`{ className?, idPrefix? }`, colored via `text-*`/currentColor). Used in the hero background and behind the footer wordmark.
  - `PatternMosaic` — sage/deep-green triangle-square quilt strip (`{ rows?, className? }`). Used at the hero's bottom edge, above the footer, and on the final CTA band.
- **Icons:** custom brand set in `src/components/ui/icons.tsx` — 24×24, square caps/miter joins, 45° chamfers and filled mosaic-tile squares matching the pattern motifs. Used everywhere brand-carrying; lucide-react remains only for functional glyphs (menu/close, chevron, sun/moon).
- **Motion:** Framer Motion (`motion` v12) via `LazyMotion` + `m` components (`MotionProvider` in the layout). `Reveal` powers scroll-ins; the hero staggers via `HeroIntro`. All of it respects `prefers-reduced-motion`.
- **Accent color:** one variable — edit `--accent` (and optionally `--accent-strong` / `--accent-deep` / `--accent-ink` / per-theme `--accent-fg`) at the top of `src/app/globals.css`. Current palette is the sage/leaf green from the brand pattern.

## Theming

- Dark theme is the default (`:root`), light theme via `:root[data-theme="light"]`.
- An inline script in `src/app/layout.tsx` applies the saved theme (localStorage `theme`) or the OS preference before first paint — no flash.
- The navbar toggle persists the choice; the `dark:` Tailwind variant matches `[data-theme="dark"]`.

## Deployment

Build produces a fully static site in `/out`:

- **Vercel** — framework preset Next.js; static export is detected automatically
- **Netlify** — build command `npm run build`, publish directory `out`
- **Cloudflare Pages** — build command `npm run build`, output directory `out`
- **S3/any static host** — upload the contents of `/out` (enable trailing-slash/index.html resolution)

## Fill-in checklist (before going live)

> **Note:** `domain`, `url`, `email` and the office addresses are now set to the real values (`newmachine.com.ph`, coworking hubs in San Francisco and Makati). The remaining fields below still carry **dummy sample values** (`12125550100`, office phone numbers, sample stats, sample testimonials, `newmachine` social handles) so the site renders complete. Replace each one in `src/config/site.ts` with your real data before launch.

| Field | Where | What to put |
|---|---|---|
| `domain` | `site.domain` | Display domain — set to `newmachine.com.ph` (also fills the browser-frame mockups) |
| `url` | `src/config/site.ts` | Full production URL — set to `https://newmachine.com.ph` |
| `email` | `site.email` | Contact email — set to `hello@newmachine.com.ph` |
| `whatsapp` | `site.whatsapp` | Digits only, international format |
| `offices[].phone` | `site.offices` | Real office lines — the SF/Makati addresses are set, phones are placeholders |
| `videoId` | `site.videoId` | Real hero/testimonials YouTube video ID |
| `stats[0..3]` | `site.stats` | Four hero cards — currently `24h` / `2wk` / `100%` / `0` promises (value + label) |
| `testimonials[0..1]` | `site.testimonials` | Real, client-consented quotes |
| `socials` | `site.socials` | Real social handles |
| case studies | `src/content/work.json` | Real, client-consented results (series + KPIs are sample data) |
| pricing | `src/app/pricing/page.tsx` | Confirm tiers/prices in the `tiers` array before launch |

## Notes

- **Placeholder photos.** Product, service, about and blog images are dummy placeholders from `picsum.photos` (seeded per item, so they're stable) rendered through `DuotoneImage` (`src/components/ui/DuotoneImage.tsx`), which applies the brand green duotone. Replace by swapping the `src` URLs with real assets in `/public` — the treatment applies automatically. **These are fetched from a third-party host at runtime; download real assets into `/public` before launch so the site has no external image dependency.** The footer uses `/public/nomad-background.jpg` (~370 KB).
- **OG image** is generated at build time from `src/app/opengraph-image.tsx` (a flat branded card via `next/og`). Replace with real 1200×630 art when brand assets are ready — either edit that file or drop a static `opengraph-image.png` in `src/app/`.
- **Motion budget.** Framer Motion ships lean via `LazyMotion`/`m` (domAnimation feature set only — no drag/layout features). Total home-page JS is ~220 KB gzipped: ~151 KB React 19 + Next 16 runtime floor, ~30 KB motion features, ~35 KB app code. All of it is deferred; pages are fully pre-rendered HTML, so LCP is unaffected.
- **Testimonials** live in their own home section (`src/components/sections/Testimonials.tsx`), fed by `site.testimonials`.
- Company name in body copy always comes from `site.name`; the only fixed spellings are the footer wordmark and logo (intentional brand lockups).

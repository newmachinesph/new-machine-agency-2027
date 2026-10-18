# New Machine — Agency Website

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![Payload CMS 3](https://img.shields.io/badge/Payload%20CMS-3-000000?logo=payloadcms&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

This is the website for **New Machine** ([newmachine.ph](https://newmachine.ph)),
a digital studio in Makati (PBCom Tower, 6795 Ayala Avenue). It works with
founders in the US, the Philippines and elsewhere on brand, websites, apps,
launch, growth and AI automation.

The pages are prerendered by Next.js. Products, services, case studies, jobs,
FAQs, testimonials and posts are managed in an embedded **Payload CMS**
(Postgres on Neon, media on Cloudflare R2). The contact form sends email over
SMTP and is protected by Cloudflare Turnstile.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript (strict)**
- **Payload CMS 3**, embedded in the same Next.js app at `/admin`, with REST at
  `/api/*` and GraphQL at `/graphql`
  - `@payloadcms/db-postgres` (Neon) and `@payloadcms/storage-s3` (Cloudflare R2)
  - Collections in `src/collections/`: Products, Services, CaseStudies, Jobs,
    Faq, Testimonials, Posts, ContactSubmissions, Media, Users
- **Tailwind CSS v4** (CSS-first config in `src/app/(frontend)/globals.css`)
- **Motion** (Framer Motion v12) via `LazyMotion`
- **next-mdx-remote** for the blog. Posts live in `content/blog/*.mdx`
- **nodemailer** with **React Email** templates (`src/emails/`) for contact-form
  mail
- **Google Analytics 4** via `@next/third-parties`

## Quickstart

```bash
cp .env.example .env.local   # then fill in the values below
npm install
npm run dev                  # http://localhost:3000, CMS at /admin
npm run build
npm run start
npm run lint
```

`src/payload.config.ts` refuses to start unless `PAYLOAD_SECRET` and
`DATABASE_URL` are set.

### Environment

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string (Neon) |
| `PAYLOAD_SECRET` | yes | Payload signing secret (`openssl rand -hex 32`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | for the contact form | Outgoing mail account |
| `MAIL_FROM` / `MAIL_TO` | for the contact form | From header and inbox. `MAIL_TO` defaults to `site.email` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | in production | Contact-form anti-spam. The form fails closed in production when the secret is missing |
| `R2_BUCKET` / `R2_ENDPOINT` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_PUBLIC_URL` | for media uploads | Cloudflare R2 storage for the Media collection |
| `SEED_TOKEN` | optional | Guards the one-shot seed routes |

Never commit `.env.local`. `.gitignore` excludes every `.env*` file except
`.env.example`.

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
| `videoId` | YouTube ID for the hero + testimonials explainer video |
| `socials` | Footer social links (`label` + `href`) |
| `builtFor` | Hero typewriter industries — add/remove freely |
| `stats` | Four hero glass-card stats (`value` + `label`) |
| `testimonials` | Two testimonials on the home page (`quote`, `name`, `role`) |

### CMS content and seed JSON

In production the CMS collections are the source of truth. The JSON files below
are the seed data they were created from, and they define the shapes the pages
expect.


- `src/content/services.json` — service catalog (see "Phase 2/3 services" below)
- `src/content/products.json` — product cards: `{ name, status, oneLiner, link }`. `status` is `"In Development" | "Beta" | "Live"`; a non-empty `link` renders a "Visit" button
- `src/content/faq.json` — FAQ items: `{ q, a }` — rendered on the home page and emitted as FAQPage JSON-LD
- `src/content/work.json` — case studies, the data behind `/work`, `/work/<slug>` and the home Impact section. Each entry carries the card fields (`client`, `industry`, `service`, `story`, `metric`, `metricLabel`), the narrative (`summary`, `challenge`, `approach[]`, `outcome`, `deliverables[]`, `quote`), a 12-month metric `series` (`months`, `values`, `launchIndex` = first post-launch month, `unit`, `label`) and `kpis[]` (`before`/`after` numbers drive the dumbbell scale; `beforeLabel`/`afterLabel` carry the units; `delta` is the printed change). Current entries are **representative sample data** — clearly labeled as such in the UI; replace with real, client-consented numbers before running paid traffic. The home Impact section's median tiles are hand-computed from these entries — recompute if you change them.

### Case-study charts

`src/components/charts/` renders all data visualization as dependency-free SVG:

- `TrendChart` — 12-month line chart; pre-launch months in a de-emphasis gray, post-launch in the data hue with an area wash, launch rule, endpoint label, hover crosshair + tooltip, and a visually hidden data table for screen readers
- `Dumbbell` — before → after KPI rows, every value directly labeled
- `Sparkline` — decorative mini-trend for work cards

Chart colors are the `--chart-data` / `--chart-dim` tokens in `src/app/(frontend)/globals.css`, validated per theme (lightness band, CVD separation, ≥3:1 contrast against the card surface). If you rebrand `--accent`, re-derive these two per theme rather than reusing the accent directly.

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

## Contact form

`src/app/(frontend)/contact/ContactForm.tsx` posts to `/api/contact`
(`src/app/api/contact/route.ts`). The route:

1. checks the Turnstile token with Cloudflare
2. sends a notification to `MAIL_TO` and a confirmation to the visitor, using the
   React Email templates in `src/emails/`
3. records the inquiry in the `contact-submissions` collection

A honeypot field (`website`) silently drops bot submissions.

## Design system

- **Fonts:** [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) for display/headlines (`font-display` utility) + [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) for body/UI. Change them in `src/app/(frontend)/layout.tsx` (next/font) and the `--font-*` mappings in `globals.css`.
- **No rounded corners.** Everything is sharp; the signature is the `.chamfer` clip-path (45° cut corner) on primary buttons and key surfaces. The only circles are the custom cursor.
- **Brand patterns** (traced from the reference art, both in `src/components/ui/`):
  - `PatternTrace` — thin-line chamfered-rectangle circuit motif (`{ className?, idPrefix? }`, colored via `text-*`/currentColor). Used in the hero background and behind the footer wordmark.
  - `PatternMosaic` — sage/deep-green triangle-square quilt strip (`{ rows?, className? }`). Used at the hero's bottom edge, above the footer, and on the final CTA band.
- **Icons:** custom brand set in `src/components/ui/icons.tsx` — 24×24, square caps/miter joins, 45° chamfers and filled mosaic-tile squares matching the pattern motifs. Used everywhere brand-carrying; lucide-react remains only for functional glyphs (menu/close, chevron, sun/moon).
- **Motion:** Framer Motion (`motion` v12) via `LazyMotion` + `m` components (`MotionProvider` in the layout). `Reveal` powers scroll-ins; the hero staggers via `HeroIntro`. All of it respects `prefers-reduced-motion`.
- **Accent color:** one variable — edit `--accent` (and optionally `--accent-strong` / `--accent-deep` / `--accent-ink` / per-theme `--accent-fg`) at the top of `src/app/(frontend)/globals.css`. Current palette is the sage/leaf green from the brand pattern.

## Theming

- Dark theme is the default (`:root`), light theme via `:root[data-theme="light"]`.
- An inline script in `src/app/(frontend)/layout.tsx` applies the saved theme (localStorage `theme`) or the OS preference before first paint — no flash.
- The navbar toggle persists the choice; the `dark:` Tailwind variant matches `[data-theme="dark"]`.

## Deployment

This is a server-rendered Next.js app. It is no longer a static export, because
the contact API route and the Payload admin need a Node.js runtime. It is
deployed on **Vercel**. Set the environment variables above in the project
settings, and point `DATABASE_URL` at the production Neon branch.

## Fill-in checklist (before going live)

> **Note:** `domain`, `url`, `email` and the Makati office address are now set to the real values (`newmachine.ph`, PBCom Tower). The remaining fields below still carry **dummy sample values** (sample stats, sample testimonials, `newmachine` social handles) so the site renders complete. Replace each one in `src/config/site.ts` with your real data before launch.

| Field | Where | What to put |
|---|---|---|
| `domain` | `site.domain` | Display domain — set to `newmachine.ph` (also fills the browser-frame mockups) |
| `url` | `src/config/site.ts` | Full production URL — set to `https://newmachine.ph` |
| `email` | `site.email` | Contact email — set to `hello@newmachine.ph` |
| `videoId` | `site.videoId` | Real hero/testimonials YouTube video ID |
| `stats[0..3]` | `site.stats` | Four hero cards — currently `24h` / `2wk` / `100%` / `0` promises (value + label) |
| `testimonials[0..1]` | `site.testimonials` | Real, client-consented quotes |
| `socials` | `site.socials` | Real social handles |
| case studies | `src/content/work.json` | Real, client-consented results (series + KPIs are sample data) |
| pricing | `src/app/pricing/page.tsx` | Confirm tiers/prices in the `tiers` array before launch |

## Notes

- **OG images** are generated per page by `opengraph-image.tsx` files under `src/app/(frontend)/` (blog, products, services, work), built on the shared card in `src/lib/og.tsx` (`next/og`).
- **Motion budget.** Framer Motion ships lean via `LazyMotion`/`m` (domAnimation feature set only — no drag/layout features). Total home-page JS is ~220 KB gzipped: ~151 KB React 19 + Next 16 runtime floor, ~30 KB motion features, ~35 KB app code. All of it is deferred; pages are fully pre-rendered HTML, so LCP is unaffected.
- **Testimonials** live in their own home section (`src/components/sections/Testimonials.tsx`), fed by `site.testimonials`.
- Company name in body copy always comes from `site.name`; the only fixed spellings are the footer wordmark and logo (intentional brand lockups).

## License

The code is released under the [MIT License](LICENSE). The New Machine name,
logo and brand patterns identify the studio. Use your own branding if you fork
this project.

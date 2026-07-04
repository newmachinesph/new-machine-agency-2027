# Nomad Media — Marketing Website

Production static marketing website for **Nomad Media**, a digital growth agency based in the UAE serving clients globally.

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
| `whatsapp` | WhatsApp number, international format, digits only (e.g. `971501234567`) |
| `formEndpoint` | Static form provider URL; empty string = mailto fallback (see below) |
| `socials` | Footer social links (`label` + `href`) |
| `builtFor` | Hero typewriter industries — add/remove freely |
| `stats` | Four hero glass-card stats (`value` + `label`) |
| `testimonials` | Two testimonials on the home page (`quote`, `name`, `role`) |

### JSON content

- `src/content/services.json` — service catalog (see "Phase 2/3 services" below)
- `src/content/products.json` — product cards: `{ name, status, oneLiner, link }`. `status` is `"In Development" | "Beta" | "Live"`; a non-empty `link` renders a "Visit" button
- `src/content/faq.json` — FAQ items: `{ q, a }` — rendered on the home page and emitted as FAQPage JSON-LD

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

The services page groups by phase automatically: `1` renders under "Available now", `2` under "Coming soon", `3` under "On the roadmap". No code changes needed. Valid `icon` values: `monitor`, `zap`, `building`, `share`, `magnet` (extend the icon map in `src/components/sections/ServicesBento.tsx` and `src/app/services/page.tsx` for new ones).

## Swap the form provider

Set `formEndpoint` in `src/config/site.ts`:

- **Formspree**: `formEndpoint: "https://formspree.io/f/YOUR_FORM_ID"`
- **Web3Forms**: `formEndpoint: "https://api.web3forms.com/submit"` (add a hidden `access_key` input in `src/app/contact/ContactForm.tsx`)
- **Empty string** (`""`): the form falls back to opening the visitor's email app (`mailto:` with the message pre-filled)

The form POSTs `FormData` with an `Accept: application/json` header — compatible with all static-friendly form providers. A honeypot field (`website`) silently drops bot submissions.

## Change the accent color

One variable: edit `--accent` (and optionally `--accent-strong` / `--accent-ink` / light-mode `--accent-fg`) at the top of `src/app/globals.css`. Every button, link, glow and highlight follows it.

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

> **Note:** these fields are currently filled with **dummy sample values** (`hello@nomadmedia.ae`, `971501234567`, `40+`, sample testimonials, `nomadmedia` social handles) so the site renders complete. Replace each one in `src/config/site.ts` with your real data before launch — also set `site.url`.

| Field (was token) | Where | What to put |
|---|---|---|
| `{{DOMAIN}}` | `site.domain` | Your display domain, e.g. `nomadmedia.ae` |
| `site.url` | `src/config/site.ts` | Full production URL, e.g. `https://nomadmedia.ae` |
| `{{EMAIL}}` | `site.email` | Real contact email |
| `{{WHATSAPP_NUMBER}}` | `site.whatsapp` | Digits only, international format |
| `{{STAT_PROJECTS}}` | `site.stats[0]` | e.g. `40+` |
| `{{STAT_RETENTION}}` | `site.stats[1]` | e.g. `95%` |
| `{{STAT_INDUSTRIES}}` | `site.stats[2]` | e.g. `12` |
| `{{STAT_SPEED}}` | `site.stats[3]` | e.g. `3×` |
| `{{TESTIMONIAL_1_QUOTE/NAME/ROLE}}` | `site.testimonials[0]` | Real client quote |
| `{{TESTIMONIAL_2_QUOTE/NAME/ROLE}}` | `site.testimonials[1]` | Real client quote |
| `{{INSTAGRAM_HANDLE}}` etc. | `site.socials` | Real social handles |

## Notes

- **No OG image yet.** Add `/public/og.png` (1200×630) and reference it in `src/app/layout.tsx` under `metadata.openGraph.images` when brand assets are ready.
- **framer-motion intentionally omitted.** All motion (reveals, typewriter, blobs, cursor, accordion) is CSS + small vanilla hooks — app-level JS on the home page is ~25 KB gzipped.
- **JS budget caveat.** Total home-page JS is ~189 KB gzipped, of which ~151 KB is the React 19 + Next 16 App Router runtime itself — the framework floor alone exceeds the 150 KB target, so that budget is not reachable on `next@latest` App Router. All framework JS is deferred; the page is fully server-rendered HTML, so LCP/interactivity targets are unaffected.
- Company name is never hardcoded in components — always `site.name` from config.

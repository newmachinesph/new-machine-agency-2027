/**
 * ── SINGLE SOURCE OF TRUTH ─────────────────────────────────────────────
 * Every owner-editable value lives in this file. Contact + copy below are
 * committed brand content. Two items still need the owner's real inputs
 * before a PUBLIC / paid launch:
 *   1. `whatsapp` — set the real business number.
 *   2. `testimonials` (+ work.json) — representative sample proof. Replace
 *      with real, client-consented quotes/results. Never run paid ads
 *      against fabricated metrics.
 */

export const site = {
  name: "Nomad Media",
  legalName: "Nomad Media",

  /** Production URL — used for canonical links, sitemap, OG tags. */
  url: "https://nomadmedia.ae",
  domain: "nomadmedia.ae",

  tagline: "Digital growth that actually converts.",
  description:
    "Nomad Media is a digital growth agency based in the UAE, serving clients globally. Websites, landing pages, social media and lead generation — built to turn visitors into customers.",

  email: "hello@nomadmedia.ae",
  /** International format, digits only. TODO(owner): confirm the real
   *  business number — this sample must be set before launch. */
  whatsapp: "971501234567",

  /**
   * Static-friendly form provider endpoint (Formspree, Web3Forms, …).
   * e.g. "https://formspree.io/f/abcdwxyz"
   * Leave empty ("") to fall back to a mailto: link.
   */
  formEndpoint: "",

  socials: [
    { label: "Instagram", href: "https://instagram.com/nomadmedia" },
    { label: "LinkedIn", href: "https://linkedin.com/company/nomadmedia" },
    { label: "X", href: "https://x.com/nomadmedia" },
  ],

  /** Hero typewriter — add/remove industries freely. */
  builtFor: [
    "Clinics",
    "Real Estate",
    "SMEs",
    "Startups",
    "E-commerce",
    "Restaurants",
    "Law Firms",
  ],

  /** Hero glass cards — promises we keep from day one, not a claimed track
   *  record. All four are true by policy (see FAQ / About / Footer). */
  stats: [
    { value: "24h", label: "Typical reply time" },
    { value: "2wk", label: "To launch a landing page" },
    { value: "100%", label: "Code & content you own" },
    { value: "0", label: "Hidden fees or hourly billing" },
  ],

  /** Representative sample quotes — replace with real, client-consented
   *  testimonials before public launch. Deliberately free of fabricated
   *  metrics; they speak to process, which we can stand behind. */
  testimonials: [
    {
      quote:
        "Clear from day one — no jargon, no account managers, just straight answers and a site that finally looks like the business we want to be.",
      name: "Sarah Mitchell",
      role: "Clinic Director, Dubai",
    },
    {
      quote:
        "Fast, honest, and straight to the point. They told us what would actually move the needle and skipped everything that wouldn't.",
      name: "Omar Haddad",
      role: "Marketing Lead, Real Estate",
    },
  ],
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp}`;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

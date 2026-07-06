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
  name: "New Machine",
  legalName: "New Machine",

  /** Production URL — used for canonical links, sitemap, OG tags. */
  url: "https://newmachine.io",
  domain: "newmachine.io",

  tagline: "From brand to scale — the studio behind growing startups.",
  description:
    "New Machine is a remote-first digital studio partnering with founders worldwide across the full startup lifecycle — brand, websites, apps, launch, growth and AI automation. Built to turn ideas into companies that convert.",

  email: "hello@newmachine.io",
  /** Hero / testimonials explainer video. TODO(owner): replace this
   *  placeholder YouTube ID with the real brand film before launch. */
  videoId: "ScMzIvxBSi4",
  /** International format, digits only. TODO(owner): confirm the real
   *  business number — this sample must be set before launch. */
  whatsapp: "12125550100",

  /** Physical offices — DUMMY placeholder addresses + phones. TODO(owner):
   *  replace with the real details before launch. */
  offices: [
    {
      region: "US Office",
      country: "United States",
      flag: "🇺🇸",
      landmark: "washington",
      address: ["Suite 1200, 500 7th Avenue", "New York, NY 10018, US"],
      phone: "+1 212 555 0100",
    },
    {
      region: "Philippines Office",
      country: "Philippines",
      flag: "🇵🇭",
      landmark: "mayon",
      address: ["Unit 15F, One Ayala East Tower", "Ayala Ave, Makati, Metro Manila 1223, PH"],
      phone: "+63 2 8123 4567",
    },
  ],

  /**
   * Static-friendly form provider endpoint (Formspree, Web3Forms, …).
   * e.g. "https://formspree.io/f/abcdwxyz"
   * Leave empty ("") to fall back to a mailto: link.
   */
  formEndpoint: "",

  socials: [
    { label: "Instagram", href: "https://instagram.com/newmachine" },
    { label: "LinkedIn", href: "https://linkedin.com/company/newmachine" },
    { label: "X", href: "https://x.com/newmachine" },
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
      role: "Clinic Director",
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
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
] as const;

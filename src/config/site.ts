/**
 * ── SINGLE SOURCE OF TRUTH ─────────────────────────────────────────────
 * Every owner-editable value lives in this file. Contact + copy below are
 * committed brand content. One item still needs the owner's real inputs
 * before a PUBLIC / paid launch:
 *   1. `testimonials` (+ work.json) — representative sample proof. Replace
 *      with real, client-consented quotes/results. Never run paid ads
 *      against fabricated metrics.
 */

export const site = {
  name: "New Machine",
  legalName: "New Machine",

  /** Production URL — used for canonical links, sitemap, OG tags. */
  url: "https://newmachine.ph",
  domain: "newmachine.ph",

  /** Google Analytics 4 measurement ID — loaded via @next/third-parties. */
  analyticsId: "G-4LNSJP47T1",

  tagline: "From brand to scale — the studio behind growing startups.",

  /** Brand line — the thesis behind the Machine product family. Use verbatim
   *  wherever the principle is stated. Deliberately vendor-neutral: it must
   *  never name a model, a lab, or a tool. */
  principle: "We don't automate tasks. We build systems that improve themselves.",
  description:
    "New Machine is a digital studio based in Makati, partnering with founders across the US, the Philippines and worldwide — brand, websites, apps, launch, growth and AI automation across the full startup lifecycle. Built to turn ideas into companies that convert.",

  email: "hello@newmachine.ph",
  /** Hero / testimonials explainer video. TODO(owner): replace this
   *  placeholder YouTube ID with the real brand film before launch. */
  videoId: "ScMzIvxBSi4",
  /** International format, digits only — the business WhatsApp line. */
  whatsapp: "639477902977",

  /** Physical office — our hub at PBCom Tower on Ayala Avenue, Makati. The
   *  team is remote-first; this is the base of operations. */
  offices: [
    {
      region: "Philippines Office",
      country: "Philippines",
      flag: "🇵🇭",
      landmark: "mayon",
      address: [
        "PBCom Tower, 6795 Ayala Avenue",
        "cor. V.A. Rufino St, Makati City 1226, PH",
      ],
      phone: "+63 947 790 2977",
      streetAddress: "PBCom Tower, 6795 Ayala Ave cor. V.A. Rufino St",
      city: "Makati City",
      region2: "Metro Manila",
      postalCode: "1226",
      countryCode: "PH",
      geo: { lat: 14.5569, lng: 121.0212 },
    },
  ],

  /**
   * Static-friendly form provider endpoint (Formspree, Web3Forms, …).
   * e.g. "https://formspree.io/f/abcdwxyz"
   * Leave empty ("") to fall back to a mailto: link.
   */
  formEndpoint: "",

  socials: [
    { label: "Facebook", href: "https://www.facebook.com/newmachineph" },
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
      name: "Miguel Santos",
      role: "Marketing Lead, Real Estate",
    },
  ],
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp}`;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
] as const;

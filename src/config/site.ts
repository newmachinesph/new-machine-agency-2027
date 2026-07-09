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
  url: "https://newmachine.com.ph",
  domain: "newmachine.com.ph",

  tagline: "From brand to scale — the studio behind growing startups.",

  /** Brand line — the thesis behind the Machine product family. Use verbatim
   *  wherever the principle is stated. Deliberately vendor-neutral: it must
   *  never name a model, a lab, or a tool. */
  principle: "We don't automate tasks. We build systems that improve themselves.",
  description:
    "New Machine is a digital studio with hubs in San Francisco and Makati, partnering with founders across the US, the Philippines and worldwide — brand, websites, apps, launch, growth and AI automation across the full startup lifecycle. Built to turn ideas into companies that convert.",

  email: "hello@newmachine.com.ph",
  /** Hero / testimonials explainer video. TODO(owner): replace this
   *  placeholder YouTube ID with the real brand film before launch. */
  videoId: "ScMzIvxBSi4",
  /** International format, digits only. TODO(owner): confirm the real
   *  business number — this sample must be set before launch. */
  whatsapp: "12125550100",

  /** Physical offices — real coworking hubs (WeWork SoMa in San Francisco;
   *  KMC at V Corporate Centre, one block off Valero St in Salcedo Village,
   *  Makati). Phones are still DUMMY placeholders. TODO(owner): replace the
   *  phone numbers with the real lines before launch. */
  offices: [
    {
      region: "US Office",
      country: "United States",
      flag: "🇺🇸",
      landmark: "goldengate",
      address: ["WeWork, 535 Mission St, 14th Floor", "San Francisco, CA 94105, US"],
      phone: "+1 415 555 0100",
    },
    {
      region: "Philippines Office",
      country: "Philippines",
      flag: "🇵🇭",
      landmark: "mayon",
      address: [
        "KMC, 5F V Corporate Centre",
        "125 L.P. Leviste St, Salcedo Village",
        "Makati City 1227, PH",
      ],
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

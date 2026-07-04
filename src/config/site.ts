/**
 * ── SINGLE SOURCE OF TRUTH ─────────────────────────────────────────────
 * Every owner-editable value lives in this file.
 * NOTE: currently filled with DUMMY placeholder values — replace with real
 * ones before going live (see README checklist).
 */

export const site = {
  name: "Nomad Media",
  legalName: "Nomad Media",

  /** Production URL — used for canonical links, sitemap, OG tags.
   *  Replace with your real domain, e.g. "https://nomadmedia.ae" */
  url: "https://nomadmedia.example",
  domain: "nomadmedia.ae",

  tagline: "Digital growth that actually converts.",
  description:
    "Nomad Media is a digital growth agency based in the UAE, serving clients globally. Websites, landing pages, social media and lead generation — built to turn visitors into customers.",

  email: "hello@nomadmedia.ae",
  /** International format, digits only — e.g. "971501234567" */
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

  /** Hero glass cards. Replace tokens with honest numbers. */
  stats: [
    { value: "40+", label: "Projects delivered" },
    { value: "95%", label: "Client retention" },
    { value: "12+", label: "Industries served" },
    { value: "2.5×", label: "Avg. load-time gain" },
  ],

  testimonials: [
    {
      quote:
        "Nomad Media rebuilt our website and inquiries doubled within two months. The process was clear from day one — no jargon, no surprises.",
      name: "Sarah Mitchell",
      role: "Clinic Director, Dubai",
    },
    {
      quote:
        "Fast, honest and straight to the point. Our landing pages finally convert as well as the ads deserve.",
      name: "Omar Haddad",
      role: "Marketing Lead, Real Estate Group",
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

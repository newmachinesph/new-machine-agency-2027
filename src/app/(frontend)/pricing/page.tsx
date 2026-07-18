import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { site } from "@/config/site";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";
import CtaPanel from "@/components/ui/CtaPanel";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/ui/JsonLd";
import PatternGrid from "@/components/ui/PatternGrid";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";

const PRICING_DESCRIPTION =
  "Public pricing, fixed quotes, zero surprises. Three engagement models: from a conversion-first landing page to a full growth partnership.";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description: PRICING_DESCRIPTION,
  path: "/pricing/",
  withImage: true,
});

const tiers = [
  {
    name: "Launch",
    price: "$4,800",
    terms: "Fixed quote · 2–3 weeks",
    line: "One page with one job: convert. For validating an offer, launching a campaign, or replacing a page that isn't pulling its weight.",
    tint: "var(--accent-strong)",
    featured: false,
    cta: "Start with Launch",
    includes: [
      "Positioning & strategy call",
      "Conversion-first copywriting",
      "Landing page design + build",
      "Analytics with goal tracking",
      "Speed & SEO fundamentals",
      "30 days of post-launch support",
    ],
  },
  {
    name: "Build",
    price: "$12,500",
    terms: "Fixed quote · 4–7 weeks",
    line: "The full presence: brand plus website or MVP, built as one system and measured from day one.",
    tint: "var(--accent)",
    featured: true,
    cta: "Start with Build",
    includes: [
      "Brand identity or refresh",
      "Up to 12 pages, or MVP core flows",
      "CMS you can edit yourself",
      "SEO foundation & schema markup",
      "Measurement dashboard, like our case studies",
      "60 days of post-launch support",
    ],
  },
  {
    name: "Growth Partner",
    price: "$6,000/mo",
    terms: "3-month minimum · cancel anytime after",
    line: "The team that keeps the machine running: experiments, content, campaigns and automation, reported in revenue terms.",
    tint: "var(--accent-deep)",
    featured: false,
    cta: "Talk about Growth",
    includes: [
      "Monthly experiment roadmap",
      "Landing pages, content & campaigns",
      "Ad management: spend billed at cost, no % markup",
      "AI automation & agents",
      "Monthly report in inquiries & revenue",
      "Weekly working session",
    ],
  },
];

const guarantees = [
  "Fixed quote before we start: it doesn't move mid-project",
  "You own the code, the content and every account",
  "Direct line to the people doing the work",
  "Weekly demos, so progress is visible, not narrated",
];

const pricingFaq = [
  {
    q: "Why publish prices when every project is different?",
    a: "Because \"it depends\" is how agencies keep the upper hand. These are our real starting points. After one scoping call you get a fixed quote in writing, before you commit to anything. If a price ever needs to move, that conversation happens before kickoff, never mid-project.",
  },
  {
    q: "What if my project doesn't fit a tier?",
    a: "The tiers are starting points, not boxes. Most engagements mix stages: a brand refresh plus a landing page, an MVP plus a launch campaign. We'll scope it in one call and give you a single fixed number for the whole thing.",
  },
  {
    q: "How do payments work?",
    a: "Fixed projects are 50% at kickoff and 50% at launch. Growth Partner is billed monthly in advance. No deposits held hostage, no surprise line items. The invoice matches the quote.",
  },
  {
    q: "Do you charge a percentage of ad spend?",
    a: "No. Ad spend goes through your own accounts at cost, and management is a flat fee. Agencies that take a percentage of spend are incentivized to spend more. We'd rather be incentivized to convert more.",
  },
  {
    q: "What happens if the project runs late?",
    a: "If a deadline slips for a reason on our side, the delay is ours to absorb: the quote doesn't move and your post-launch support window extends by the same amount of time. Late because of us should never cost you.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <SectionHeading
          eyebrow="Pricing"
          title="Public pricing. Fixed quotes. Zero surprises."
          lead="Most agencies make you sit through a discovery call just to hear a number. Here's ours up front: in USD, quoted fixed after one scoping call, and the quote doesn't move."
        />

        {/* Tiers */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90} className="h-full">
              <div
                className={`bento-cell relative flex h-full flex-col p-8 ${
                  tier.featured ? "border-accent" : ""
                }`}
                style={
                  {
                    "--tint": tier.tint,
                    background:
                      "linear-gradient(160deg, color-mix(in srgb, var(--tint) 22%, var(--card)) 0%, var(--card) 60%)",
                  } as CSSProperties
                }
              >
                {tier.featured ? (
                  <span className="absolute right-0 top-0 chamfer bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-ink">
                    Most popular
                  </span>
                ) : null}

                <h2 className="font-display text-2xl font-bold tracking-tight">{tier.name}</h2>
                <p className="mt-5 font-display text-5xl font-extrabold tracking-[-0.03em] text-accent-fg">
                  {tier.price}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  {tier.terms}
                </p>
                <p className="mt-4 text-sm text-muted">{tier.line}</p>

                <ul className="mt-7 flex flex-col gap-2.5 border-t border-border pt-6">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-fg/85">
                      <IconCheck size={16} className="mt-0.5 shrink-0 text-accent-fg" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button
                    href="/contact"
                    variant={tier.featured ? "primary" : "ghost"}
                    className="w-full"
                  >
                    {tier.cta}
                    <IconArrowRight size={15} />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 text-xs text-muted">
            Starting prices in USD. Your exact quote is fixed in writing after one scoping call,
            before you commit to anything.
          </p>
        </Reveal>

        {/* Every engagement */}
        <Reveal className="mt-20">
          <div className="panel chamfer relative overflow-hidden p-8 md:p-10">
            <PatternGrid
              cols={4}
              rows={3}
              seed={7}
              className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 opacity-[0.1]"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg">
              Every engagement, every tier
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {guarantees.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
                  <IconCheck size={17} className="mt-0.5 shrink-0 text-accent-fg" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* FAQ */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Pricing FAQ"
            title="The money questions, answered plainly."
            lead="If yours isn't here, ask us directly. You'll get a straight answer, not a pitch."
          />
          <Reveal delay={80}>
            <Faq items={pricingFaq} />
          </Reveal>
        </div>

        <CtaPanel
          title="Get your fixed quote."
          lead="One scoping call, one number in writing, zero pressure. If we're not the right fit, we'll say so and point you somewhere better."
          primaryHref="/contact"
          primaryLabel="Book a Strategy Call"
        />
      </div>

      <JsonLd
        data={webPageSchema({
          type: "WebPage",
          name: `Pricing | ${site.name}`,
          description: PRICING_DESCRIPTION,
          path: "/pricing/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing/" },
        ])}
      />
      <JsonLd data={faqSchema(pricingFaq)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: `${site.name} | Engagement pricing`,
          url: `${site.url}/pricing/`,
          itemListElement: tiers.map((tier) => ({
            "@type": "Offer",
            name: tier.name,
            description: tier.line,
            priceCurrency: "USD",
            price: tier.price.replace(/[^0-9.]/g, ""),
          })),
        }}
      />
    </div>
  );
}

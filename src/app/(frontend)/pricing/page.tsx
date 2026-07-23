import type { Metadata } from "next";
import { site } from "@/config/site";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import GhostTitle from "@/components/v2/GhostTitle";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

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
    <div className="v2-scope">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              Pricing
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Public pricing. <span className="text-accent">Fixed</span> quotes.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Real starting points in USD, quoted fixed after one scoping call — and
              the quote doesn&rsquo;t move.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="wrap py-14 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90} className="h-full">
              <div
                className="v2-frame flex h-full flex-col p-8"
                style={tier.featured ? { borderColor: "var(--accent)" } : undefined}
              >
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {tier.name}
                </h2>
                <p className="mt-5 font-display text-5xl font-semibold tracking-[-0.03em] text-accent-fg">
                  {tier.price}
                </p>
                <p className="mt-3 font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                  {tier.terms}
                </p>
                <p className="mt-4 text-sm text-muted">{tier.line}</p>

                <ul className="mt-7 flex flex-col gap-2.5 border-t border-border pt-6">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-fg/85">
                      <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
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
            Starting prices in USD. Your exact quote is fixed in writing after one
            scoping call, before you commit to anything.
          </p>
        </Reveal>
      </section>

      {/* Every engagement */}
      <section className="wrap py-14 md:py-20">
        <Reveal>
          <GhostTitle>Every engagement.</GhostTitle>
        </Reveal>
        <Reveal delay={90}>
          <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
            {guarantees.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-border py-3.5 text-sm font-medium"
              >
                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="wrap py-14 md:py-20">
        <Reveal>
          <GhostTitle>The money questions.</GhostTitle>
        </Reveal>
        <Reveal delay={90}>
          <div className="mt-10 max-w-3xl">
            <Faq items={pricingFaq} />
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <h2 className="v2-display max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
              Get your <span className="text-accent">fixed quote</span>.
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              One scoping call, one number in writing, zero pressure.
            </p>
            <div className="mt-8">
              <Button href="/contact">
                Book a Strategy Call
                <IconArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

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

import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";
import { site } from "@/config/site";
import { getServices } from "@/lib/services.data";
import { AREA_SERVED, breadcrumbSchema, orgRef, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";
import GhostTitle from "@/components/v2/GhostTitle";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Brand, product, growth and scale services for the full startup lifecycle: from first identity to fractional leadership, wherever your team is in the world.",
  path: "/services/",
  withImage: true,
});

const stages = [
  {
    name: "Brand & Strategy",
    lead: "Get the name, story and positioning right before a single pixel ships.",
  },
  {
    name: "Design & Build",
    lead: "Turn the strategy into a product and a presence people trust.",
  },
  {
    name: "Launch & Grow",
    lead: "Get in front of the right audience and turn attention into revenue.",
  },
  {
    name: "Scale · Beyond",
    lead: "The systems, data and leadership that carry growth past the founder-led stage.",
  },
] as const;

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="v2-scope">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              Services
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Every stage. One <span className="text-accent">studio</span>.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {services.length} services across {stages.length} lifecycle stages, run
              end to end by one remote-first team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stage index — plain text link rows, no icon chips */}
      {stages.map((stage) => {
        const stageServices = services.filter((service) => service.stage === stage.name);
        if (stageServices.length === 0) return null;

        return (
          <section key={stage.name} className="wrap py-14 md:py-20">
            <Reveal>
              <GhostTitle>{stage.name}</GhostTitle>
              <p className="mt-5 max-w-xl text-muted">{stage.lead}</p>
            </Reveal>
            <div className="mt-10 border-t border-border">
              {stageServices.map((service, i) => (
                <Reveal key={service.slug} delay={i * 60}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="group grid gap-1.5 border-b border-border py-6 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-8"
                  >
                    <h3 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-fg">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted">{service.outcome}</p>
                    <IconArrowRight
                      size={16}
                      className="hidden self-center text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent md:block"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <h2 className="v2-display max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
              Not sure which <span className="text-accent">stage</span>?
            </h2>
            <p className="mt-6 max-w-xl text-muted">
              Book a free call. We&rsquo;ll tell you honestly what will move
              your numbers and what won&rsquo;t.
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
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Services",
          numberOfItems: services.length,
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              url: `${site.url}/services/${service.slug}/`,
              // Reference the one Organization node and the shared areaServed,
              // matching every service detail page instead of minting a
              // duplicate org with different geo.
              provider: orgRef,
              areaServed: [...AREA_SERVED],
            },
          })),
        }}
      />
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Services",
          description:
            "Brand, product, growth and scale services across the full startup lifecycle.",
          path: "/services/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ])}
      />
    </div>
  );
}

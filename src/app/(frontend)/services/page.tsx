import AccentTick from "@/components/ui/AccentTick";
import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconCheck, IconWebsite } from "@/components/ui/icons";
import { site } from "@/config/site";
import { serviceIcons } from "@/lib/services";
import { getServices } from "@/lib/services.data";
import { AREA_SERVED, breadcrumbSchema, orgRef, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import DuotoneImage from "@/components/ui/DuotoneImage";
import PatternGrid from "@/components/ui/PatternGrid";
import PatternSignal from "@/components/ui/PatternSignal";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Brand, product, growth and scale services built for the full startup lifecycle: from first identity to fractional leadership, wherever your team is in the world.",
  path: "/services/",
  withImage: true,
});

const stages = [
  {
    name: "Brand & Strategy",
    number: "01",
    lead: "Get the name, story and positioning right before a single pixel ships.",
  },
  {
    name: "Design & Build",
    number: "02",
    lead: "Turn the strategy into a product and a presence people actually trust.",
  },
  {
    name: "Launch & Grow",
    number: "03",
    lead: "Get in front of the right audience and turn attention into revenue.",
  },
  {
    name: "Scale · Beyond",
    number: "04",
    lead: "The systems, data and leadership that carry growth past the founder-led stage.",
  },
] as const;

/** Green ramp climbing per stage: same order as the homepage stage overview,
 *  so the progression reads consistently everywhere it appears. */
const stageTints = ["var(--accent-strong)", "var(--accent)", "#67ad62", "var(--accent-deep)"];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <div className="relative overflow-hidden">
          <PatternSignal className="pointer-events-none absolute -top-10 right-0 h-72 w-72 opacity-[0.1] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />

          <div className="relative">
            <Reveal className="flex items-center gap-2.5">
              <AccentTick />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Services
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
                Brand to scale. Every stage, one studio.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="measure mt-5 text-muted">
                {services.length} services across {stages.length} stages of the startup
                lifecycle, brand, build, launch, grow and scale, run end to end by a
                remote-first team built to compete with the best agencies anywhere, for
                founders in the US, the Philippines, and everywhere else. No stitching
                five vendors together for one outcome.
              </p>
            </Reveal>
          </div>
        </div>

        {stages.map((stage, stageIndex) => {
          const stageServices = services.filter((service) => service.stage === stage.name);
          if (stageServices.length === 0) return null;

          const [featured, ...rest] = stageServices;
          const tint = stageTints[stageIndex % stageTints.length];
          const FeaturedIcon = serviceIcons[featured.icon] ?? IconWebsite;
          const reversed = stageIndex % 2 === 1;

          return (
            <div key={stage.name} className="relative mt-24 md:mt-32">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-10 h-72 opacity-[0.14]"
                style={{
                  background: `radial-gradient(60% 100% at ${reversed ? "80%" : "20%"} 0%, ${tint}, transparent 70%)`,
                }}
              />

              <div className="relative">
                <SectionHeading eyebrow="Stage" title={stage.name} lead={stage.lead} />

                {/* Featured service: bold lead block with a mockup accent */}
                <Reveal delay={80} className="mt-12">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
                    <div className={reversed ? "lg:order-2" : ""}>
                      <div className="chamfer panel beam overflow-hidden">
                        <DuotoneImage
                          src={`https://picsum.photos/seed/${featured.slug}/960/640`}
                          alt={`${featured.name}: ${featured.outcome}`}
                          className="aspect-[4/3] w-full"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                    </div>

                    <div className={reversed ? "lg:order-1" : ""}>
                      <span
                        className="grid h-14 w-14 place-items-center chamfer"
                        style={{ background: featured.tint }}
                      >
                        <FeaturedIcon size={26} className="text-accent-ink" />
                      </span>
                      <p className="mt-6 text-sm font-semibold text-accent-fg">
                        {featured.name}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                        {featured.outcome}
                      </h3>
                      <p className="measure mt-4 text-muted">{featured.description}</p>
                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {featured.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-fg/85">
                            <IconCheck size={14} className="mt-0.5 shrink-0 text-accent-fg" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-xs text-muted">
                        <span className="font-semibold text-fg">Built for </span>
                        {featured.forWho}
                      </p>
                      <Link
                        href={`/services/${featured.slug}/`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-80"
                      >
                        Explore {featured.name}
                        <IconArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </Reveal>

                {rest.length > 0 && (
                  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((service, i) => {
                      const Icon = serviceIcons[service.icon] ?? IconWebsite;
                      return (
                        <Reveal key={service.slug} delay={i * 60}>
                          <Link
                            href={`/services/${service.slug}/`}
                            className="panel beam chamfer relative flex h-full flex-col overflow-hidden p-7"
                          >
                            <PatternGrid
                              cols={3}
                              rows={3}
                              seed={stageIndex * 5 + i + 1}
                              className="pointer-events-none absolute -right-5 -top-5 h-28 w-28 opacity-[0.18] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]"
                            />
                            <div className="relative flex h-full flex-col">
                              <span
                                className="grid h-12 w-12 place-items-center chamfer"
                                style={{ background: service.tint }}
                              >
                                <Icon size={20} className="text-accent-ink" />
                              </span>
                              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                                {service.name}
                              </p>
                              <h3 className="mt-1.5 font-display text-lg font-bold leading-snug tracking-tight">
                                {service.outcome}
                              </h3>
                              <p className="measure mt-3 text-sm text-muted">{service.description}</p>
                              <ul className="mt-4 space-y-2">
                                {service.includes.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-sm text-muted"
                                  >
                                    <IconCheck
                                      size={14}
                                      className="mt-0.5 shrink-0 text-accent-fg"
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-auto pt-5 text-xs text-muted">
                                <span className="font-semibold text-fg">Built for </span>
                                {service.forWho}
                              </p>
                            </div>
                          </Link>
                        </Reveal>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <Reveal>
          <div className="panel relative mt-24 overflow-hidden p-10 text-center md:p-14">
            <PatternGrid
              cols={6}
              rows={3}
              seed={9}
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Not sure which stage you&rsquo;re at?
              </h2>
              <p className="measure mx-auto mt-3 text-muted">
                Book a free call. We&rsquo;ll tell you honestly what will move the needle and
                what won&rsquo;t.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/contact">
                  Book a Strategy Call
                  <IconArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

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

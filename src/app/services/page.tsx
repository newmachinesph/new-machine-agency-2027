import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  IconArrowRight,
  IconCorporate,
  IconCheck,
  IconLeads,
  IconWebsite,
  IconSocial,
  IconLanding,
  type BrandIcon,
} from "@/components/ui/icons";
import services from "@/content/services.json";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import DuotoneImage from "@/components/ui/DuotoneImage";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, landing pages, corporate sites, social media and lead generation — services built to turn visitors into customers.",
  alternates: { canonical: "/services/" },
};

const icons: Record<string, BrandIcon> = {
  monitor: IconWebsite,
  zap: IconLanding,
  building: IconCorporate,
  share: IconSocial,
  magnet: IconLeads,
};

const phaseLabels: Record<number, string> = {
  1: "Available now",
  2: "Coming soon",
  3: "On the roadmap",
};

export default function ServicesPage() {
  const phases = Array.from(new Set(services.map((s) => s.phase))).sort((a, b) => a - b);

  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <Reveal className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Services
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display mt-5 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Services that pay for themselves.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-muted">
            Every service below is built around one outcome: more customers for your
            business. Clear scope, one fixed quote, delivery in weeks.
          </p>
        </Reveal>

        {phases.map((phase) => (
          <div key={phase} className="mt-16">
            {phases.length > 1 ? (
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg">
                  {phaseLabels[phase] ?? `Phase ${phase}`}
                </p>
              </Reveal>
            ) : null}

            {services
              .filter((service) => service.phase === phase)
              .map((service, i) => {
                const Icon = icons[service.icon] ?? IconWebsite;
                const reversed = i % 2 === 1;
                return (
                  <div
                    key={service.slug}
                    className="grid gap-10 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-center"
                  >
                    <Reveal className={reversed ? "md:order-2" : ""}>
                      <span
                        className="grid h-12 w-12 place-items-center border border-border"
                        style={{ color: service.tint } as CSSProperties}
                      >
                        <Icon size={22} />
                      </span>
                      <h2 className="mt-5 text-2xl font-bold md:text-3xl">{service.name}</h2>
                      <p className="mt-2 font-medium text-accent-fg">{service.outcome}</p>
                      <p className="mt-4 text-muted">{service.description}</p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em]">
                        Who it’s for
                      </p>
                      <p className="mt-1.5 text-muted">{service.forWho}</p>
                    </Reveal>

                    <Reveal delay={120} className={reversed ? "md:order-1" : ""}>
                      <DuotoneImage
                        src={`https://picsum.photos/seed/${service.slug}/960/540`}
                        className="aspect-[16/9] w-full"
                        sizes="(min-width: 768px) 55vw, 100vw"
                      />
                      <div className="panel mt-4 p-7">
                        <p className="text-sm font-semibold">What’s included</p>
                        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {service.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-muted"
                            >
                              <IconCheck size={15} className="mt-0.5 shrink-0 text-accent-fg" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                );
              })}
          </div>
        ))}

        <Reveal>
          <div className="panel mt-10 p-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Book a free call — we’ll tell you honestly what will move the needle and
              what won’t.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/contact">
                Book a Strategy Call
                <IconArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              provider: { "@type": "Organization", name: site.name },
              areaServed: "Worldwide",
            },
          })),
        }}
      />
    </div>
  );
}

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
  IconBrandMark,
  IconCompass,
  IconSearch,
  IconAppWindow,
  IconMobile,
  IconTarget,
  IconRank,
  IconMail,
  IconAIAgent,
  IconDashboard,
  IconSplitTest,
  IconHelm,
  type BrandIcon,
} from "@/components/ui/icons";
import services from "@/content/services.json";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand, product, growth and scale services built for the full startup lifecycle — from first identity to fractional leadership, wherever your team is in the world.",
  alternates: { canonical: "/services/" },
};

const icons: Record<string, BrandIcon> = {
  monitor: IconWebsite,
  zap: IconLanding,
  building: IconCorporate,
  share: IconSocial,
  magnet: IconLeads,
  brandmark: IconBrandMark,
  compass: IconCompass,
  search: IconSearch,
  appwindow: IconAppWindow,
  mobile: IconMobile,
  target: IconTarget,
  rank: IconRank,
  mail: IconMail,
  aiagent: IconAIAgent,
  dashboard: IconDashboard,
  splittest: IconSplitTest,
  helm: IconHelm,
};

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

export default function ServicesPage() {
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
            Every stage of the startup lifecycle. One studio.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-muted">
            From first brand to fractional leadership, we cover the full lifecycle — brand,
            build, launch, grow and scale — so you’re never stitching together five vendors
            to get one outcome.
          </p>
        </Reveal>

        {stages.map((stage, stageIndex) => {
          const stageServices = services.filter((service) => service.stage === stage.name);
          if (stageServices.length === 0) return null;

          return (
            <div key={stage.name} className={stageIndex === 0 ? "mt-20" : "mt-24"}>
              <SectionHeading number={stage.number} eyebrow="Stage" title={stage.name} lead={stage.lead} />

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stageServices.map((service, i) => {
                  const Icon = icons[service.icon] ?? IconWebsite;
                  return (
                    <Reveal key={service.slug} delay={i * 60}>
                      <div className="panel beam chamfer relative flex h-full flex-col p-7">
                        <span
                          className="grid h-12 w-12 place-items-center border border-border"
                          style={{ color: service.tint } as CSSProperties}
                        >
                          <Icon size={22} />
                        </span>
                        <h3 className="mt-5 text-xl font-bold">{service.name}</h3>
                        <p className="mt-1.5 text-sm font-medium text-accent-fg">
                          {service.outcome}
                        </p>
                        <p className="mt-3 text-sm text-muted">{service.description}</p>
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
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Reveal>
          <div className="panel mt-16 p-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Not sure which stage you’re at?
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

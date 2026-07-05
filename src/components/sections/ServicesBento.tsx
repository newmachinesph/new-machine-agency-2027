import Link from "next/link";
import type { CSSProperties } from "react";
import {
  IconArrowRight,
  IconCorporate,
  IconLeads,
  IconWebsite,
  IconSocial,
  IconLanding,
  type BrandIcon,
} from "@/components/ui/icons";
import services from "@/content/services.json";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons: Record<string, BrandIcon> = {
  monitor: IconWebsite,
  zap: IconLanding,
  building: IconCorporate,
  share: IconSocial,
  magnet: IconLeads,
};

export default function ServicesBento() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="01"
          eyebrow="What we do"
          title="Five services. One goal: growth."
          lead="Everything we offer exists to do one thing — bring your business more customers. Pick one service or combine them."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {services.map((service, i) => {
            const Icon = icons[service.icon] ?? IconWebsite;
            const span = i === 0 ? "md:col-span-4" : "md:col-span-2";
            return (
              <Reveal key={service.slug} delay={i * 70} className={span}>
                <Link
                  href="/services/"
                  className="bento-cell group block h-full p-7"
                  style={{ "--tint": service.tint } as CSSProperties}
                >
                  <span className="grid h-11 w-11 place-items-center border border-border">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted">{service.outcome}</p>
                  <span className="mt-6 flex items-center gap-1.5 text-sm text-accent-fg opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <IconArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

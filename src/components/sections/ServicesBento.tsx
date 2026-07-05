import Link from "next/link";
import type { CSSProperties } from "react";
import {
  IconArrowRight,
  IconBrandMark,
  IconAppWindow,
  IconTarget,
  IconAIAgent,
  type BrandIcon,
} from "@/components/ui/icons";
import { stageGroups } from "@/lib/services";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Editorial blurb + representative icon per lifecycle stage. Keyed by the
 *  exact `stage` strings in services.json. */
const stageMeta: Record<string, { icon: BrandIcon; summary: string }> = {
  "Brand & Strategy": {
    icon: IconBrandMark,
    summary: "Name it, position it, prove the demand — the foundation everything else stands on.",
  },
  "Design & Build": {
    icon: IconAppWindow,
    summary: "Websites, apps and MVPs designed to convert and built to keep building on.",
  },
  "Launch & Grow": {
    icon: IconTarget,
    summary: "Content, ads, SEO and automation that turn a launch into real momentum.",
  },
  "Scale · Beyond": {
    icon: IconAIAgent,
    summary: "AI agents, analytics and fractional leadership for whatever growth comes next.",
  },
};

export default function ServicesBento() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="01"
          eyebrow="What we do"
          title="Everything a startup needs, one studio."
          lead="Nineteen services across four stages of the journey — from first brand to full scale. Take one stage or run the whole lifecycle with us."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stageGroups.map((group, i) => {
            const meta = stageMeta[group.stage];
            const Icon = meta?.icon ?? IconBrandMark;
            const names = group.services.map((service) => service.name);
            const preview = names.slice(0, 3).join(" · ");
            const extra = names.length - 3;
            return (
              <Reveal key={group.stage} delay={i * 70}>
                <Link
                  href="/services/"
                  className="bento-cell group flex h-full flex-col p-7"
                  style={{ "--tint": group.services[0]?.tint } as CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center border border-border">
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{group.stage}</h3>
                  <p className="mt-2 text-sm text-muted">{meta?.summary}</p>
                  <p className="mt-4 text-xs leading-relaxed text-muted/75">
                    {preview}
                    {extra > 0 ? ` · +${extra} more` : ""}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm text-accent-fg opacity-0 transition-opacity group-hover:opacity-100">
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

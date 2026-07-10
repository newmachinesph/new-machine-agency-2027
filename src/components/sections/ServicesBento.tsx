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
import PatternGrid from "@/components/ui/PatternGrid";

/** Editorial blurb, icon, and a green-ramp tint per lifecycle stage — the tint
 *  climbs light→deep across the row so the block reads as a progression from
 *  first brand to full scale. Keyed by the exact `stage` strings in services.json. */
const stageMeta: Record<
  string,
  { icon: BrandIcon; summary: string; tint: string; onTint: string }
> = {
  "Brand & Strategy": {
    icon: IconBrandMark,
    summary: "Name it, position it, prove the demand — the foundation everything else stands on.",
    tint: "var(--accent-strong)",
    onTint: "text-accent-ink",
  },
  "Design & Build": {
    icon: IconAppWindow,
    summary: "Websites, apps and MVPs designed to convert and built to keep building on.",
    tint: "var(--accent)",
    onTint: "text-accent-ink",
  },
  "Launch & Grow": {
    icon: IconTarget,
    summary: "Content, ads, SEO and automation that turn a launch into real momentum.",
    tint: "#67ad62",
    onTint: "text-accent-ink",
  },
  "Scale · Beyond": {
    icon: IconAIAgent,
    summary: "AI agents, analytics and fractional leadership for whatever growth comes next.",
    tint: "var(--accent-deep)",
    onTint: "text-fg",
  },
};

const FALLBACK = { icon: IconBrandMark, summary: "", tint: "var(--accent)", onTint: "text-accent-ink" };

export default function ServicesBento() {
  const total = stageGroups.reduce((n, group) => n + group.services.length, 0);

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="What we do"
          title="Everything a startup needs, one studio."
          lead={`${total} services across four stages of the journey — from first brand to full scale. Take a single stage, or run the whole lifecycle with one remote-first team that ships work built to compete anywhere.`}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stageGroups.map((group, i) => {
            const meta = stageMeta[group.stage] ?? FALLBACK;
            const Icon = meta.icon;
            const names = group.services.map((service) => service.name);
            return (
              <Reveal key={group.stage} delay={i * 80}>
                <Link
                  href="/services/"
                  className="bento-cell group relative flex h-full flex-col overflow-hidden p-8"
                  style={
                    {
                      "--tint": meta.tint,
                      background:
                        "linear-gradient(160deg, color-mix(in srgb, var(--tint) 30%, var(--card)) 0%, var(--card) 62%)",
                    } as CSSProperties
                  }
                >
                  {/* Subtle chamfered-mosaic accent, top-right */}
                  <PatternGrid
                    cols={5}
                    rows={5}
                    seed={i + 1}
                    className="pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-[0.4] [mask-image:linear-gradient(225deg,#000,transparent_78%)] [-webkit-mask-image:linear-gradient(225deg,#000,transparent_78%)]"
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-14 w-14 place-items-center chamfer"
                        style={{ background: meta.tint }}
                      >
                        <Icon size={26} className={meta.onTint} />
                      </span>
                      <span className="font-display text-sm font-semibold text-accent-fg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                      {group.stage}
                    </h3>
                    <p className="mt-3 text-sm text-muted">{meta.summary}</p>

                    <ul className="mt-6 flex flex-col gap-2">
                      {names.map((name) => (
                        <li key={name} className="flex items-center gap-2.5 text-[13px] text-fg/85">
                          <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-accent" />
                          {name}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-medium text-accent-fg">
                      Explore services
                      <IconArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

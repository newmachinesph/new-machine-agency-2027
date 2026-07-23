"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";
import GhostTitle from "@/components/v2/GhostTitle";

type Stage = {
  n: string;
  title: string;
  blurb: string;
  items: string[];
};

const STAGES: Stage[] = [
  {
    n: "01",
    title: "Brand & Strategy",
    blurb: "Name it, position it, prove the demand.",
    items: ["Brand Identity", "Positioning & Naming", "GTM Strategy", "AI Readiness Audit"],
  },
  {
    n: "02",
    title: "Design & Build",
    blurb: "Websites, apps and MVPs designed to convert.",
    items: ["Website Design", "Web App / MVP", "Mobile Apps", "AI Product Development"],
  },
  {
    n: "03",
    title: "Grow",
    blurb: "Traffic in, pipeline out — measured weekly.",
    items: ["Performance Ads", "SEO · AEO · GEO", "Lead Funnels", "Email & CRM Automation"],
  },
  {
    n: "04",
    title: "Scale",
    blurb: "The whole lifecycle under one fixed quote.",
    items: ["Fractional CMO / CTO", "Conversion Optimization", "GTM Engineering", "SEO & AI Campaigns"],
  },
];

/** 003 · Services — plat-form's 01–04 expand rail. Hovered/focused stage
 *  grows and fills with accent; the rest compress to numbered spines. */
export default function V2Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 md:py-36">
      <div className="wrap">
        <GhostTitle>One studio, whole lifecycle.</GhostTitle>

        <div className="v2-rail mt-16 lg:h-[26rem]" role="list">
          {STAGES.map((stage, i) => {
            const isActive = i === active;
            return (
              <div
                key={stage.n}
                role="listitem"
                data-active={isActive}
                className="v2-rail-item p-6 lg:p-8"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
              >
                <div className="flex h-full flex-col">
                  <p
                    className={`font-display text-2xl font-semibold ${
                      isActive ? "text-accent-fg" : "text-muted"
                    }`}
                  >
                    {stage.n}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold text-fg lg:text-2xl">
                    {stage.title}
                  </h3>
                  <div className="v2-rail-body mt-4 flex-1">
                    <p className="text-sm text-muted">{stage.blurb}</p>
                    <ul className="mt-5 space-y-2.5">
                      {stage.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-sm text-fg/85"
                        >
                          <span className="h-1 w-1 shrink-0 bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/services"
                    className="v2-rail-body group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-fg"
                  >
                    Explore stage
                    <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { site } from "@/config/site";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PatternGrid from "@/components/ui/PatternGrid";

const rows = [
  {
    label: "Speed",
    traditional: "Months of scoping before anything ships.",
    us: "Live in weeks, not months.",
  },
  {
    label: "Pricing",
    traditional: "Opaque retainers, scope creep, surprise invoices.",
    us: "Transparent, fixed-scope pricing from the first call.",
  },
  {
    label: "Access",
    traditional: "Account managers standing between you and the work.",
    us: "Direct line to the people actually building your product.",
  },
  {
    label: "Scope",
    traditional: "One service, then a new vendor for the next.",
    us: "Brand, product, growth and AI — one team, full lifecycle.",
  },
  {
    label: "AI-native",
    traditional: "Bolted on after the fact, if at all.",
    us: "Built into research, build and growth from day one.",
  },
  {
    label: "Ownership",
    traditional: "Locked into their stack, their platform, their terms.",
    us: "You own the code, the content and every account.",
  },
];

export default function Comparison() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Why New Machine"
          title="Same ambition. A completely different way of working."
          lead="We built New Machine as the studio we always wanted to hire — here's exactly how that plays out, honestly."
        />

        <Reveal delay={120}>
          <div className="beam panel chamfer relative mt-14 overflow-hidden">
            <PatternGrid
              cols={2}
              rows={3}
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-[0.12] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]"
            />

            <div className="relative hidden border-b border-border md:grid md:grid-cols-[1fr_1.4fr_1.4fr]">
              <div className="p-6" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Traditional agency
                </p>
              </div>
              <div className="bg-accent/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg">
                  {site.name}
                </p>
              </div>
            </div>

            {rows.map((row) => (
              <div
                key={row.label}
                className="relative border-b border-border p-6 last:border-b-0 md:grid md:grid-cols-[1fr_1.4fr_1.4fr] md:p-0"
              >
                <div className="md:flex md:items-center md:p-6">
                  <p className="font-display text-base font-bold md:text-sm">{row.label}</p>
                </div>

                <div className="mt-4 md:mt-0 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted/70 md:hidden">
                    Traditional agency
                  </p>
                  <p className="mt-1.5 text-sm text-muted md:mt-0">{row.traditional}</p>
                </div>

                <div className="mt-4 md:mt-0 md:bg-accent/[0.06] md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg/80 md:hidden">
                    {site.name}
                  </p>
                  <div className="mt-1.5 flex items-start gap-2.5 md:mt-0">
                    <IconCheck size={16} className="mt-0.5 shrink-0 text-accent-fg" />
                    <p className="text-sm font-medium text-fg">{row.us}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 text-sm text-muted">
            Transparent pricing isn&rsquo;t a slogan here —{" "}
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-1.5 font-medium text-accent-fg transition-opacity hover:opacity-80"
            >
              our pricing is public
              <IconArrowRight size={14} />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

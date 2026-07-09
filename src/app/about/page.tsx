import type { Metadata } from "next";
import {
  IconChat,
  IconCheck,
  IconGrowth,
  IconSpeed,
  type BrandIcon,
} from "@/components/ui/icons";
import { site } from "@/config/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import DuotoneImage from "@/components/ui/DuotoneImage";
import JsonLd from "@/components/ui/JsonLd";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PatternSignal from "@/components/ui/PatternSignal";
import CountUp from "@/components/ui/CountUp";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaPanel from "@/components/ui/CtaPanel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we started, what we believe, and how we work — the story behind the anti-agency agency.",
  alternates: { canonical: "/about/" },
};

type Value = { icon: BrandIcon; title: string; text: string; tint: string; onTint: string };

const values: Value[] = [
  {
    icon: IconChat,
    title: "Clarity over jargon",
    text: "If you can’t understand our proposal, that’s our failure, not yours.",
    tint: "var(--accent-strong)",
    onTint: "text-accent-ink",
  },
  {
    icon: IconSpeed,
    title: "Speed with standards",
    text: "Fast delivery and high quality aren’t opposites — they’re a process problem.",
    tint: "var(--accent)",
    onTint: "text-accent-ink",
  },
  {
    icon: IconGrowth,
    title: "Results over vanity",
    text: "Likes don’t pay invoices. We optimize for inquiries, bookings and sales.",
    tint: "var(--accent-deep)",
    onTint: "text-fg",
  },
];

/** Discipline-based placeholders, not fabricated headshots — the honest
 *  version of "meet the team" for a small, remote-first founding team. */
const disciplines = [
  {
    name: "Founding & Strategy",
    blurb:
      "Sets direction, owns the client relationship, and makes the trade-off calls before they get expensive.",
    seed: "nomad-team-founding",
  },
  {
    name: "Engineering",
    blurb:
      "Ships production code across the stack — the sites, apps and systems behind every launch.",
    seed: "nomad-team-engineering",
  },
  {
    name: "Design",
    blurb:
      "Builds the interfaces and brand systems that make a product look like it belongs to us.",
    seed: "nomad-team-design",
  },
  {
    name: "Growth & Content",
    blurb:
      "Runs the campaigns, content and channels that turn a launch into real momentum.",
    seed: "nomad-team-growth",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <div className="relative overflow-hidden">
          <PatternSignal className="pointer-events-none absolute -top-16 right-0 h-80 w-80 opacity-[0.1] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />

          <div className="relative">
            <Reveal className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                About
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
                The anti-agency agency.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="measure mt-5 text-muted">
                {site.name} exists because we got tired of watching good businesses pay
                agency prices for template work. So we built the agency we wished
                existed — remote-first, full-lifecycle, and built to compete with the
                best studios anywhere in the world.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Why we started" title="Good businesses deserved better." />
          <Reveal delay={120}>
            <div className="space-y-5 text-muted">
              <p>
                We spent years watching the same story repeat: a business owner pays a
                serious budget to an agency, waits months, and gets back a slow,
                template-looking website that never brings in a single customer. The
                invoice was enterprise. The result wasn’t.
              </p>
              <p>
                We believed professional digital growth shouldn’t require an enterprise
                budget — it requires a small team that actually cares about the outcome,
                works fast, and tells the truth about what will and won’t move the
                needle.
              </p>
              <p>
                That’s why we built {site.name}. The name is deliberate: a company that
                scales is really a machine — a system of brand, product and growth that
                keeps running without the founder in the loop. We build that machine
                from our hubs in San Francisco and Makati, with founders across the US,
                the Philippines, and everywhere else. We handle the full lifecycle:
                brand, build, launch, grow, scale.
              </p>
            </div>
            <div className="chamfer beam mt-8 overflow-hidden">
              <DuotoneImage
                src="https://picsum.photos/seed/nomad-about/1200/750"
                className="aspect-[16/10] w-full"
                sizes="(min-width: 768px) 55vw, 100vw"
                priority
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="What we believe" title="Three rules we don’t break." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <FeatureCard
                  icon={value.icon}
                  title={value.title}
                  text={value.text}
                  tint={value.tint}
                  onTint={value.onTint}
                  seed={i + 1}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading
            eyebrow="Who's behind it"
            title="The team behind every shipped product."
            lead="A small, remote-first founding team, working from wherever they are — not a fabricated headcount, just the disciplines every launch actually needs."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline, i) => (
              <Reveal key={discipline.name} delay={i * 80}>
                <div className="panel beam chamfer h-full overflow-hidden">
                  <div className="relative">
                    <DuotoneImage
                      src={`https://picsum.photos/seed/${discipline.seed}/600/750`}
                      className="aspect-[4/5] w-full"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <span className="pointer-events-none absolute inset-0 grid place-items-center">
                      <Logo className="h-8 w-auto opacity-90 [&_polygon]:fill-white" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-base font-bold tracking-tight">
                      {discipline.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{discipline.blurb}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="How we work with you" title="Simple, direct, accountable." />
          <Reveal delay={120}>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <IconCheck size={16} className="mt-1 shrink-0 text-accent-fg" />
                <span className="text-muted">
                  <strong className="font-semibold text-fg">One point of contact.</strong>{" "}
                  You talk directly to the people doing the work — no account managers
                  relaying messages.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconCheck size={16} className="mt-1 shrink-0 text-accent-fg" />
                <span className="text-muted">
                  <strong className="font-semibold text-fg">One fixed quote.</strong> Agreed
                  before we start, and it doesn’t move unless the scope does.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconCheck size={16} className="mt-1 shrink-0 text-accent-fg" />
                <span className="text-muted">
                  <strong className="font-semibold text-fg">Weekly visibility.</strong> You
                  always know what’s done, what’s next and when it ships.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconCheck size={16} className="mt-1 shrink-0 text-accent-fg" />
                <span className="text-muted">
                  <strong className="font-semibold text-fg">Honest advice.</strong> If
                  something won’t help your business, we’ll tell you — even when it costs
                  us the sale.
                </span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-24">
          <SectionHeading
            eyebrow="By the numbers"
            title="Honest commitments, not vanity metrics."
            lead="Results over vanity is a rule, not a slogan — these are the standards we hold on every single engagement, from the first call."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {site.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 70} className="h-full">
                <div className="panel beam chamfer relative h-full p-6 md:p-7">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px] bg-accent/70"
                  />
                  <p className="font-display text-4xl font-extrabold tracking-[-0.03em] text-accent-fg sm:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-3 text-sm text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <CtaPanel
          title="Ready to work with a team that ships?"
          lead="Book a free call — we’ll tell you honestly what will move the needle and what won’t."
          primaryHref="/contact"
          primaryLabel="Book a Strategy Call"
        />
      </div>

      <JsonLd
        data={webPageSchema({
          type: "AboutPage",
          name: `About ${site.name}`,
          description: site.description,
          path: "/about/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />
    </div>
  );
}

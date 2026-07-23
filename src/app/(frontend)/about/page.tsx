import type { Metadata } from "next";
import { site } from "@/config/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Button from "@/components/ui/Button";
import GhostTitle from "@/components/v2/GhostTitle";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Why we started, what we believe, and how we work: the story behind the anti-agency agency.",
  path: "/about/",
  withImage: true,
});

const values = [
  {
    title: "Clarity over jargon",
    text: "If you can’t understand our proposal, that’s our failure, not yours.",
  },
  {
    title: "Speed with standards",
    text: "Fast delivery and high quality aren’t opposites. They’re a process problem.",
  },
  {
    title: "Results over vanity",
    text: "Likes don’t pay invoices. We optimize for inquiries, bookings and sales.",
  },
];

/** Discipline-based structure, not fabricated headshots: the honest version
 *  of "meet the team" for a small, remote-first founding team. */
const disciplines = [
  {
    name: "Founding & Strategy",
    blurb:
      "Sets direction, owns the client relationship, and makes the trade-off calls before they get expensive.",
  },
  {
    name: "Engineering",
    blurb:
      "Ships production code across the stack: the sites, apps and systems behind every launch.",
  },
  {
    name: "Design",
    blurb:
      "Builds the interfaces and brand systems that make a product look like it belongs to us.",
  },
  {
    name: "Growth & Content",
    blurb:
      "Runs the campaigns, content and channels that turn a launch into real momentum.",
  },
];

const commitments = [
  {
    title: "One point of contact.",
    text: "You talk directly to the people doing the work.",
  },
  {
    title: "One fixed quote.",
    text: "Agreed before we start; it doesn’t move unless the scope does.",
  },
  {
    title: "Weekly visibility.",
    text: "You always know what’s done, what’s next and when it ships.",
  },
  {
    title: "Honest advice.",
    text: "If something won’t help your business, we’ll say so — even when it costs us the sale.",
  },
];

export default function AboutPage() {
  return (
    <div className="v2-scope">
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-24">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              About
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              The anti-agency <span className="text-accent">agency</span>.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg text-muted">
              {site.name} exists because good businesses kept paying agency
              prices for template work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <GhostTitle>Why we started.</GhostTitle>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-10 max-w-2xl text-lg text-muted">
              A company that scales is really a machine — brand, product and
              growth running without the founder in the loop. We build that
              machine from Makati, remote-first, across the full lifecycle.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-border py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <GhostTitle>Three rules we keep.</GhostTitle>
          </Reveal>
          <div className="mt-14">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <div className="grid gap-3 border-t border-border py-8 md:grid-cols-[1fr_1.2fr] md:gap-10 md:py-10">
                  <h3 className="font-display text-2xl font-semibold text-fg md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="max-w-md text-muted md:justify-self-end">
                    {value.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <GhostTitle>Who&rsquo;s behind it.</GhostTitle>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-8 max-w-xl text-muted">
              A small, remote-first founding team — the disciplines every
              launch actually needs, not a fabricated headcount.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {disciplines.map((discipline, i) => (
              <Reveal key={discipline.name} delay={i * 90} className="h-full">
                <div className="v2-frame h-full p-7">
                  <h3 className="font-display text-lg font-semibold text-fg">
                    {discipline.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted">{discipline.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-border py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <GhostTitle>How we work with you.</GhostTitle>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-12 max-w-2xl space-y-5">
              {commitments.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-accent" />
                  <span className="text-muted">
                    <strong className="font-semibold text-fg">{item.title}</strong>{" "}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-border py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <GhostTitle>Honest commitments.</GhostTitle>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {site.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <p className="font-display text-[clamp(2.75rem,5vw,4.5rem)] font-semibold leading-none text-accent-fg">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-4 max-w-[24ch] text-sm text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <h2 className="v2-display max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Work with a team that <span className="text-accent">ships</span>.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/contact" className="px-8 py-4 text-base">
                Book a strategy call
                <IconArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-sm text-muted">
                Free call · honest advice either way
              </p>
            </div>
          </Reveal>
        </div>
      </section>

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

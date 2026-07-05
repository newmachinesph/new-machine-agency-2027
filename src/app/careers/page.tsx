import type { Metadata } from "next";
import {
  IconArrowRight,
  IconChat,
  IconCheck,
  IconGrowth,
  IconPricing,
  IconSpeed,
} from "@/components/ui/icons";
import careers from "@/content/careers.json";
import { site, whatsappHref } from "@/config/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Nomad Media's remote-first founding team — real ownership, honest work, and startups built end to end.",
  alternates: { canonical: "/careers/" },
};

const values = [
  {
    icon: IconSpeed,
    title: "Remote-first, always",
    text: "No office to perform in. We hire globally and work async by default.",
  },
  {
    icon: IconPricing,
    title: "Direct ownership",
    text: "You own a project end to end, not a slice of one behind three approvals.",
  },
  {
    icon: IconGrowth,
    title: "Real impact, fast",
    text: "Small team, no bureaucracy — what you ship this week is live next week.",
  },
  {
    icon: IconChat,
    title: "Honest by default",
    text: "The same directness we sell to clients, we use on each other internally.",
  },
];

function mailtoHref(title: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(`Application: ${title}`)}`;
}

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <Reveal className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Careers
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display mt-5 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Join the founding team.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-muted">
            {site.name} is a small, remote-first team running the full startup
            lifecycle — build, launch, grow — for clients everywhere. We're not
            hiring for headcount. We're hiring people who want direct ownership
            of real work, not a seat in a bigger machine.
          </p>
        </Reveal>

        <div className="mt-24">
          <SectionHeading eyebrow="Why join" title="How we actually work." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="panel beam h-full p-7">
                  <span className="grid h-10 w-10 place-items-center border border-border">
                    <value.icon size={20} className="text-accent-fg" />
                  </span>
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading
            eyebrow="Open roles"
            title="Where we need help right now."
            lead="Every role below reports directly to the founding team — no account layer in between."
          />

          <div className="mt-10 space-y-5">
            {careers.map((role, i) => (
              <Reveal key={role.slug} delay={i * 60}>
                <div className="panel chamfer p-7 md:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold md:text-2xl">{role.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                        <span>{role.type}</span>
                        <span>{role.location}</span>
                        <span>{role.dept}</span>
                      </div>
                    </div>
                    <Button href={mailtoHref(role.title)} className="shrink-0">
                      Apply
                      <IconArrowRight size={16} />
                    </Button>
                  </div>

                  <p className="mt-5 max-w-2xl text-muted">{role.summary}</p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em]">
                        Responsibilities
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {role.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                            <IconCheck size={15} className="mt-0.5 shrink-0 text-accent-fg" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em]">
                        What we're looking for
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {role.requirements.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                            <IconCheck size={15} className="mt-0.5 shrink-0 text-accent-fg" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="panel mt-24 p-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Don't see the right role?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              We're always open to hearing from people who'd add real value to a
              small, remote-first team. Send us an open application.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href={mailtoHref("Open Application")}>
                Send an Open Application
                <IconArrowRight size={16} />
              </Button>
              <Button href={whatsappHref} variant="ghost">
                <IconChat size={16} />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

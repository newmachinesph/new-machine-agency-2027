import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { site, whatsappHref } from "@/config/site";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we started, what we believe, and how we work — the story behind the anti-agency agency.",
  alternates: { canonical: "/about/" },
};

const values = [
  {
    title: "Clarity over jargon",
    text: "If you can’t understand our proposal, that’s our failure, not yours.",
  },
  {
    title: "Speed with standards",
    text: "Fast delivery and high quality aren’t opposites — they’re a process problem.",
  },
  {
    title: "Results over vanity",
    text: "Likes don’t pay invoices. We optimize for inquiries, bookings and sales.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <Reveal className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            About
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display mt-5 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">
            The anti-agency agency.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-xl text-muted">
            {site.name} exists because we got tired of watching good businesses pay
            agency prices for template work. So we built the agency we wished existed.
          </p>
        </Reveal>

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
                That’s why we built {site.name}. The name is deliberate: we’re nomads.
                Based in the UAE, working with clients everywhere, not tied to one
                market or one way of doing things — just to results.
              </p>
            </div>
            <DuotoneImage
              src="https://picsum.photos/seed/nomad-about/1200/750"
              className="mt-8 aspect-[16/10] w-full"
              sizes="(min-width: 768px) 55vw, 100vw"
            />
          </Reveal>
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="What we believe" title="Three rules we don’t break." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <div className="panel h-full p-7">
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2.5 text-sm text-muted">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="How we work with you" title="Simple, direct, accountable." />
          <Reveal delay={120}>
            <ul className="space-y-4 text-muted">
              <li>
                <strong className="font-semibold text-fg">One point of contact.</strong>{" "}
                You talk directly to the people doing the work — no account managers
                relaying messages.
              </li>
              <li>
                <strong className="font-semibold text-fg">One fixed quote.</strong> Agreed
                before we start, and it doesn’t move unless the scope does.
              </li>
              <li>
                <strong className="font-semibold text-fg">Weekly visibility.</strong> You
                always know what’s done, what’s next and when it ships.
              </li>
              <li>
                <strong className="font-semibold text-fg">Honest advice.</strong> If
                something won’t help your business, we’ll tell you — even when it costs
                us the sale.
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-24 flex flex-wrap gap-4">
            <Button href="/contact">
              Book a Strategy Call
              <ArrowRight size={16} />
            </Button>
            <Button href={whatsappHref} variant="ghost">
              <MessageCircle size={16} />
              WhatsApp Us
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

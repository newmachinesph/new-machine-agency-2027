import type { Metadata } from "next";
import { IconCheck, IconMail, IconChat } from "@/components/ui/icons";
import { site, whatsappHref } from "@/config/site";
import Reveal from "@/components/ui/Reveal";
import PatternSignal from "@/components/ui/PatternSignal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free strategy call or send us a message — we reply within 24 hours, usually much faster.",
  alternates: { canonical: "/contact/" },
};

const reassurances = [
  "Free 30-minute strategy call",
  "One fixed quote — no surprises",
  "No pressure, no obligation",
];

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="wrap grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <div className="relative">
          <PatternSignal className="pointer-events-none absolute -left-12 -top-10 hidden h-72 w-56 opacity-[0.1] md:block" />
          <div className="relative">
            <Reveal className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Contact
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
                Let’s talk about your growth.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="measure mt-6 text-lg text-muted">
                Wherever you’re building from, we work like your team is already the
                best in the world — clear plans, honest advice, and a studio that
                treats your deadline as its own.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 space-y-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel chamfer flex items-center gap-4 p-5 transition-colors hover:border-accent"
                >
                  <IconChat size={20} className="shrink-0 text-accent-fg" />
                  <span>
                    <span className="block font-semibold">WhatsApp</span>
                    <span className="block text-sm text-muted">Fastest response</span>
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="panel chamfer flex items-center gap-4 p-5 transition-colors hover:border-accent"
                >
                  <IconMail size={20} className="shrink-0 text-accent-fg" />
                  <span>
                    <span className="block font-semibold">Email</span>
                    <span className="block text-sm text-muted">{site.email}</span>
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8 flex items-center gap-2.5 text-sm font-semibold text-accent-fg">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                Replies within 24 hours — usually much faster.
              </div>
              <ul className="mt-5 space-y-2.5">
                {reassurances.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <IconCheck size={15} className="shrink-0 text-accent-fg" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {site.offices.map((office) => (
                  <div key={office.region} className="panel chamfer p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                      {office.region}
                    </p>
                    <p className="mt-1.5 text-sm text-muted">{office.city}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160}>
          <div className="relative">
            <PatternSignal className="pointer-events-none absolute -right-10 -top-14 hidden h-64 w-48 opacity-[0.14] md:block" />
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

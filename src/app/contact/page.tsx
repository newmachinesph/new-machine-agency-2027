import type { Metadata } from "next";
import { IconCheck, IconMail, IconChat } from "@/components/ui/icons";
import { site, whatsappHref } from "@/config/site";
import Reveal from "@/components/ui/Reveal";
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
      <div className="wrap grid gap-14 md:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Contact
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight md:text-5xl">
              Let’s talk about your growth.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-muted">
              Tell us where you are and where you want to be. We reply within 24 hours —
              usually much faster.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 space-y-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="panel flex items-center gap-4 p-5 transition-colors hover:border-accent"
              >
                <IconChat size={20} className="shrink-0 text-accent-fg" />
                <span>
                  <span className="block font-semibold">WhatsApp</span>
                  <span className="block text-sm text-muted">Fastest response</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="panel flex items-center gap-4 p-5 transition-colors hover:border-accent"
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
            <ul className="mt-8 space-y-2.5">
              {reassurances.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                  <IconCheck size={15} className="shrink-0 text-accent-fg" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}

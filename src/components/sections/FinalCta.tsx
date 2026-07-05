import Link from "next/link";
import { IconArrowRight, IconChat } from "@/components/ui/icons";
import { whatsappHref } from "@/config/site";
import PatternSignal from "@/components/ui/PatternSignal";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal>
          <div className="chamfer relative overflow-hidden bg-accent text-accent-ink">
            <PatternSignal className="pointer-events-none absolute -right-8 -top-16 h-80 w-64 opacity-[0.18] md:-right-4 md:h-[28rem] md:w-80" />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-accent-deep/50 via-transparent to-transparent"
            />
            <div className="relative p-10 pt-12 text-center md:p-16 md:pt-20">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] opacity-70">
                Remote-first · Full lifecycle · Built to compete anywhere
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                We build like we’re already the best in the world.
              </h2>
              <p className="mx-auto mt-4 max-w-lg opacity-80">
                Tell us where you want your business to be — we’ll map the way there.
                Free 30-minute call, honest advice, zero pressure.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {/* ponytail: raw links, not <Button> — its variants assume a
                    neutral surface; this band's bg-accent needs the inverted
                    dark/outline treatment below for contrast. */}
                <Link
                  href="/contact"
                  className="chamfer inline-flex items-center justify-center gap-2 bg-bg px-6 py-3 text-sm font-semibold text-fg transition hover:opacity-90"
                >
                  Book a Strategy Call
                  <IconArrowRight size={16} />
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-accent-ink px-6 py-3 text-sm font-semibold transition hover:bg-accent-strong"
                >
                  <IconChat size={16} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

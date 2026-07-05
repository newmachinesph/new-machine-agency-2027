import Link from "next/link";
import { IconArrowRight, IconChat } from "@/components/ui/icons";
import { whatsappHref } from "@/config/site";
import PatternMosaic from "@/components/ui/PatternMosaic";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden bg-accent text-accent-ink">
            <PatternMosaic rows={1} className="h-8 w-full" />
            <div className="p-10 pt-8 text-center md:p-16 md:pt-12">
              <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Ready to grow? Let’s talk.
              </h2>
              <p className="mx-auto mt-4 max-w-lg opacity-80">
                Tell us where you want your business to be — we’ll map the way there.
                Free 30-minute call, honest advice, zero pressure.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
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

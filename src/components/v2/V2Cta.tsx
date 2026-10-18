import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/** Final statement — one line, one button. The footer's MACHINE wordmark
 *  carries the close; this stays minimal. */
export default function V2Cta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="v2-ground" aria-hidden="true" />
      <div className="wrap relative">
        <Reveal>
          <h2 className="v2-display max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
            Let&rsquo;s build <span className="text-accent">your machine</span>.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button href="/contact" className="px-8 py-4 text-base">
              Book a strategy call
              <IconArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-sm text-muted">
              Fixed quote · reply within one business day
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

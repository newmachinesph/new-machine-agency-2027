import { getTestimonials } from "@/lib/testimonials.data";
import Reveal from "@/components/ui/Reveal";

/** 006 · Word — one testimonial, quote-led, display-sized. */
export default async function V2Quote() {
  const testimonials = await getTestimonials();
  const t = testimonials[0];
  if (!t) return null;

  return (
    <section className="relative border-y border-border py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <p className="v2-counter uppercase">006 · Word</p>
          <blockquote className="mt-10 max-w-4xl">
            <p className="v2-display text-[clamp(1.6rem,3.6vw,3.25rem)] text-fg">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center border border-border font-display text-sm font-semibold text-accent-fg">
                {t.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

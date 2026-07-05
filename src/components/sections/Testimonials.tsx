import { site } from "@/config/site";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="06"
          eyebrow="Client words"
          title="Don’t take our word for it."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {site.testimonials.map((testimonial, i) => (
            /* ponytail: md:mt-12 instead of translate-y — motion sets inline
               transform on Reveal, which would override a translate utility. */
            <Reveal key={testimonial.name} delay={i * 120} className={i === 1 ? "md:mt-12" : ""}>
              <div className="panel chamfer relative h-full p-8">
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-1 font-display text-7xl text-accent-fg opacity-40"
                >
                  “
                </span>
                <Logo className="absolute right-8 top-8 h-5 w-auto" />
                <p className="relative mt-14 text-lg font-medium leading-relaxed md:text-xl">
                  {testimonial.quote}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

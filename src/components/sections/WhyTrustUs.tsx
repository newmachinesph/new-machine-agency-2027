import { BadgeCheck, MessagesSquare, Quote, TrendingUp, Zap } from "lucide-react";
import { site } from "@/config/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const differentiators = [
  {
    icon: Zap,
    title: "Fast delivery",
    text: "Weeks, not quarters — without cutting corners.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent pricing",
    text: "One fixed quote before we start. It doesn’t move.",
  },
  {
    icon: MessagesSquare,
    title: "Direct communication",
    text: "You talk to the people doing the work, not an account layer.",
  },
  {
    icon: TrendingUp,
    title: "Results-focused",
    text: "We report in inquiries and revenue, not impressions.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="05"
          eyebrow="Why trust us"
          title="Big-agency output. Small-team honesty."
          lead="Everything you actually want from an agency — and none of the overhead you don’t."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="panel h-full p-6">
                <item.icon size={22} className="text-accent-fg" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {site.testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 90}>
              <div className="panel h-full p-7">
                <Quote size={22} className="text-accent-fg" />
                <p className="mt-4 font-medium text-fg">{testimonial.quote}</p>
                <p className="mt-4 text-sm text-muted">
                  {testimonial.name} · {testimonial.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

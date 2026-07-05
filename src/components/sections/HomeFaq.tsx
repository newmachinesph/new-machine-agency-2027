import Link from "next/link";
import faq from "@/content/faq.json";
import Faq from "@/components/ui/Faq";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeFaq() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading
            number="09"
            eyebrow="FAQ"
            title="Questions, answered plainly."
          />
          <Reveal delay={240}>
            <p className="mt-6 text-muted">Something else on your mind?</p>
            <Link
              href="/contact"
              className="mt-2 inline-block text-accent-fg transition-opacity hover:opacity-80"
            >
              Ask us directly →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Faq items={faq} />
        </Reveal>
      </div>
    </section>
  );
}

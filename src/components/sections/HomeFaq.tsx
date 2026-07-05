import faq from "@/content/faq.json";
import Faq from "@/components/ui/Faq";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/icons";

export default function HomeFaq() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading
            number="10"
            eyebrow="FAQ"
            title="Questions, answered plainly."
            lead="No hedging, no fine print — straight answers from the team that’ll actually do the work."
          />
          <Reveal delay={240} className="mt-6">
            <p className="text-sm text-muted">Something else on your mind?</p>
            <Button href="/contact" variant="ghost" className="mt-3 text-sm">
              Ask us directly
              <IconArrowRight size={14} />
            </Button>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="panel chamfer p-2 md:p-4">
            <Faq items={faq} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

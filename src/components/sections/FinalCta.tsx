import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section className="py-24">
      <div className="wrap">
        <Reveal>
          <div
            className="panel relative overflow-hidden p-10 text-center md:p-16"
            style={{
              background:
                "radial-gradient(80% 120% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent), var(--card)",
            }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Ready to grow? Let’s talk.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Tell us where you want your business to be — we’ll map the way there. Free
              30-minute call, honest advice, zero pressure.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact">
                Book a Strategy Call
                <ArrowRight size={16} />
              </Button>
              <Button href={whatsappHref} variant="ghost">
                <MessageCircle size={16} />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { IconArrowRight, IconChat } from "@/components/ui/icons";
import { whatsappHref } from "@/config/site";
import Button from "@/components/ui/Button";
import PatternGrid from "@/components/ui/PatternGrid";
import Reveal from "@/components/ui/Reveal";

type CtaPanelProps = {
  title: string;
  lead: string;
  /** Primary button target (route or mailto). */
  primaryHref: string;
  primaryLabel: string;
  className?: string;
};

/**
 * Closing call-to-action panel: centered heading, lead, a primary button and
 * the standing "WhatsApp Us" button over a faint chamfered-tile field. Shared by
 * the about and careers pages; includes its own top margin.
 */
export default function CtaPanel({
  title,
  lead,
  primaryHref,
  primaryLabel,
  className = "",
}: CtaPanelProps) {
  return (
    <Reveal>
      <div
        className={`panel relative mt-24 overflow-hidden p-10 text-center md:p-14 ${className}`.trim()}
      >
        <PatternGrid
          cols={6}
          rows={3}
          seed={9}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="measure mx-auto mt-3 text-muted">{lead}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href={primaryHref}>
              {primaryLabel}
              <IconArrowRight size={16} />
            </Button>
            <Button href={whatsappHref} variant="ghost">
              <IconChat size={16} />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Building2,
  Magnet,
  MonitorSmartphone,
  Share2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import services from "@/content/services.json";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  monitor: MonitorSmartphone,
  zap: Zap,
  building: Building2,
  share: Share2,
  magnet: Magnet,
};

export default function ServicesBento() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="01"
          eyebrow="What we do"
          title="Five services. One goal: growth."
          lead="Everything we offer exists to do one thing — bring your business more customers. Pick one service or combine them."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {services.map((service, i) => {
            const Icon = icons[service.icon] ?? MonitorSmartphone;
            const span = i === 0 ? "md:col-span-4" : "md:col-span-2";
            return (
              <Reveal key={service.slug} delay={i * 70} className={span}>
                <Link
                  href="/services/"
                  className="bento-cell group block h-full p-7"
                  style={{ "--tint": service.tint } as CSSProperties}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted">{service.outcome}</p>
                  <span className="mt-6 flex items-center gap-1.5 text-sm text-accent-fg opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

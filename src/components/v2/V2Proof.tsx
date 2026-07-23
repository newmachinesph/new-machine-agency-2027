import Link from "next/link";
import Image from "next/image";
import { getCaseStudies } from "@/lib/work.data";
import { mediaUrl } from "@/lib/media";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/** 001 · Proof — three engagements, metric-first cinematic cards. */
export default async function V2Proof() {
  const caseStudies = (await getCaseStudies()).slice(0, 3);

  return (
    <section className="relative py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <h2 className="v2-ghost text-[clamp(2.5rem,6vw,5.5rem)]">
            Results you can audit.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {caseStudies.map((cs, i) => {
            const img = mediaUrl(cs.image, `/work/${cs.slug}.webp`);
            return (
              <Reveal key={cs.slug} delay={i * 90}>
                <Link
                  href={`/work/${cs.slug}`}
                  className="v2-case v2-frame group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img}
                      alt={cs.client}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="font-display text-5xl font-semibold text-accent-fg">
                        <CountUp value={cs.metric} />
                      </p>
                      <p className="mt-1 max-w-[26ch] text-xs uppercase tracking-[0.14em] text-white/70">
                        {cs.metricLabel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                        {cs.industry}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-semibold text-fg">
                        {cs.client}
                      </h3>
                    </div>
                    <IconArrowRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

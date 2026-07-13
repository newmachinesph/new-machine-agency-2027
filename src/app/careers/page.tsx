import type { Metadata } from "next";
import {
  IconArrowRight,
  IconChat,
  IconCheck,
  IconGrowth,
  IconPricing,
  IconSpeed,
} from "@/components/ui/icons";
import careers from "@/content/careers.json";
import { site } from "@/config/site";
import { AREA_SERVED, breadcrumbSchema, orgRef, webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PatternGrid from "@/components/ui/PatternGrid";
import PatternSignal from "@/components/ui/PatternSignal";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaPanel from "@/components/ui/CtaPanel";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join New Machine's remote-first founding team: real ownership, honest work, and startups built end to end.",
  alternates: { canonical: "/careers/" },
};

const values = [
  {
    icon: IconSpeed,
    title: "Remote-first, always",
    text: "We hire globally and work async by default. Our Makati hub is there when you want it, not a place to perform.",
    tint: "var(--accent-strong)",
    onTint: "text-accent-ink",
  },
  {
    icon: IconPricing,
    title: "Direct ownership",
    text: "You own a project end to end, not a slice of one behind three approvals.",
    tint: "var(--accent)",
    onTint: "text-accent-ink",
  },
  {
    icon: IconGrowth,
    title: "Real impact, fast",
    text: "Small team, no bureaucracy: what you ship this week is live next week.",
    tint: "#67ad62",
    onTint: "text-accent-ink",
  },
  {
    icon: IconChat,
    title: "Honest by default",
    text: "The same directness we sell to clients, we use on each other internally.",
    tint: "var(--accent-deep)",
    onTint: "text-fg",
  },
];

/** Green ramp per department, same vocabulary as the services/homepage bento
 *  so the color language reads consistently everywhere it appears. */
const deptTint: Record<string, string> = {
  Engineering: "var(--accent-strong)",
  Design: "var(--accent)",
  Growth: "#67ad62",
  General: "var(--accent-deep)",
};

function mailtoHref(title: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(`Application: ${title}`)}`;
}

/** Map the human-readable role type to schema.org employmentType tokens. */
function employmentTypes(type: string): string[] {
  const t = type.toLowerCase();
  const out: string[] = [];
  if (t.includes("full")) out.push("FULL_TIME");
  if (t.includes("part")) out.push("PART_TIME");
  if (t.includes("contract")) out.push("CONTRACTOR");
  return out.length ? out : ["OTHER"];
}

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <div className="relative overflow-hidden">
          <PatternSignal className="pointer-events-none absolute -top-16 right-0 h-80 w-80 opacity-[0.1] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />

          <div className="relative">
            <Reveal className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Careers
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
                Join the founding team.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="measure mt-5 text-muted">
                {site.name} is a small, remote-first team running the full startup
                lifecycle, build, launch, grow, for clients across the US, the
                Philippines, and beyond. We&rsquo;re not
                hiring for headcount. We&rsquo;re hiring people who want direct ownership
                of real work, not a seat in a bigger machine.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading eyebrow="Why join" title="How we actually work." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <FeatureCard
                  icon={value.icon}
                  title={value.title}
                  text={value.text}
                  tint={value.tint}
                  onTint={value.onTint}
                  seed={i + 1}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading
            eyebrow="Open roles"
            title="Where we need help right now."
            lead="Every role below reports directly to the founding team, no account layer in between."
          />

          <div className="mt-10 space-y-5">
            {careers.map((role, i) => {
              const tint = deptTint[role.dept] ?? "var(--accent)";
              return (
                <Reveal key={role.slug} delay={i * 60}>
                  <div className="panel beam chamfer relative overflow-hidden p-7 md:p-9">
                    <PatternGrid
                      cols={4}
                      rows={3}
                      seed={i + 1}
                      className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-[0.14] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_72%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_72%)]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-full w-[3px]"
                      style={{ background: tint }}
                    />

                    <div className="relative">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-xl font-bold md:text-2xl">
                            {role.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold uppercase tracking-[0.15em] text-accent-fg">
                            <span>{role.type}</span>
                            <span>{role.location}</span>
                            <span>{role.dept}</span>
                          </div>
                        </div>
                        <Button href={mailtoHref(role.title)} className="shrink-0">
                          Apply
                          <IconArrowRight size={16} />
                        </Button>
                      </div>

                      <p className="measure mt-5 text-muted">{role.summary}</p>

                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.15em]">
                            Responsibilities
                          </p>
                          <ul className="mt-3 space-y-2.5">
                            {role.responsibilities.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-muted"
                              >
                                <IconCheck size={15} className="mt-0.5 shrink-0 text-accent-fg" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.15em]">
                            What we&rsquo;re looking for
                          </p>
                          <ul className="mt-3 space-y-2.5">
                            {role.requirements.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-muted"
                              >
                                <IconCheck size={15} className="mt-0.5 shrink-0 text-accent-fg" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <CtaPanel
          title="Don’t see the right role?"
          lead="We’re always open to hearing from people who’d add real value to a small, remote-first team. Send us an open application."
          primaryHref={mailtoHref("Open Application")}
          primaryLabel="Send an Open Application"
        />
      </div>

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Careers",
          description: "Open roles on the New Machine remote-first founding team.",
          path: "/careers/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers/" },
        ])}
      />
      {/* One JobPosting per open role. `datePosted`/`validThrough` are omitted
          deliberately. They aren't in the source data, and inventing them
          would misreport the posting age. Add real dates to careers.json to
          make these eligible for Google Jobs rich results. */}
      {careers.map((role) => (
        <JsonLd
          key={role.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: role.title,
            description: [role.summary, ...role.responsibilities].join(" "),
            employmentType: employmentTypes(role.type),
            hiringOrganization: orgRef,
            jobLocationType: "TELECOMMUTE",
            applicantLocationRequirements: AREA_SERVED.map((name) => ({
              "@type": "AdministrativeArea",
              name,
            })),
            directApply: false,
            url: `${site.url}/careers/`,
          }}
        />
      ))}
    </div>
  );
}

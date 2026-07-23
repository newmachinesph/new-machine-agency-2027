import type { Metadata } from "next";
import { getJobs } from "@/lib/jobs.data";
import { site } from "@/config/site";
import { AREA_SERVED, breadcrumbSchema, orgRef, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/ui/JsonLd";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import GhostTitle from "@/components/v2/GhostTitle";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Join New Machine's remote-first founding team: real ownership, honest work, and startups built end to end.",
  path: "/careers/",
  withImage: true,
});

const values = [
  {
    title: "Remote-first, always",
    text: "We hire globally and work async by default. The Makati hub is there when you want it.",
  },
  {
    title: "Direct ownership",
    text: "You own a project end to end, not a slice of one behind three approvals.",
  },
  {
    title: "Real impact, fast",
    text: "Small team, no bureaucracy: what you ship this week is live next week.",
  },
  {
    title: "Honest by default",
    text: "The same directness we sell to clients, we use on each other internally.",
  },
];

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

export default async function CareersPage() {
  const careers = await getJobs();
  return (
    <div className="v2-scope">
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-24">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              Careers
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Join the founding <span className="text-accent">team</span>.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg text-muted">
              We&rsquo;re hiring people who want direct ownership of real work,
              not a seat in a bigger machine.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <GhostTitle>How we actually work.</GhostTitle>
          </Reveal>
          <div className="mt-14">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <div className="grid gap-3 border-t border-border py-8 md:grid-cols-[1fr_1.2fr] md:gap-10 md:py-10">
                  <h3 className="font-display text-2xl font-semibold text-fg md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="max-w-md text-muted md:justify-self-end">
                    {value.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-border py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <GhostTitle>Open roles.</GhostTitle>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-8 max-w-xl text-muted">
              Every role reports directly to the founding team — no account
              layer in between.
            </p>
          </Reveal>

          <div className="mt-12 space-y-6">
            {careers.map((role, i) => (
              <Reveal key={role.slug} delay={i * 60}>
                <div className="v2-frame p-7 md:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-fg md:text-2xl">
                        {role.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-display text-[11px] uppercase tracking-[0.16em] text-muted">
                        <span>{role.type}</span>
                        <span>{role.location}</span>
                        <span>{role.dept}</span>
                      </div>
                    </div>
                    <Button href={mailtoHref(role.title)} className="shrink-0">
                      Apply
                      <IconArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="mt-5 max-w-2xl text-muted">{role.summary}</p>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="font-display text-[13px] uppercase tracking-[0.16em] text-fg">
                        Responsibilities
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {role.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-muted"
                          >
                            <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-display text-[13px] uppercase tracking-[0.16em] text-fg">
                        What we&rsquo;re looking for
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {role.requirements.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-muted"
                          >
                            <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <h2 className="v2-display max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Don&rsquo;t see the right <span className="text-accent">role</span>?
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button
                href={mailtoHref("Open Application")}
                className="px-8 py-4 text-base"
              >
                Send an open application
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

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

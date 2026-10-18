import work from "@/content/work.json";

export type CaseStudy = (typeof work)[number];

/** All case studies, in display order. */
export const caseStudies = work;

/** The case study after `slug`, wrapping around. Powers the "next case" link. */
export function nextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import workJson from "@/content/work.json";

/** CaseStudy shape mirrors the seed JSON, so page field access is unchanged.
 *  Payload adds id/order/image/timestamps on top (harmless extra keys). */
export type CaseStudy = (typeof workJson)[number] & { id?: string };

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "case-studies",
    limit: 100,
    sort: "order",
  });
  return docs as unknown as CaseStudy[];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "case-studies",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return (docs[0] as unknown as CaseStudy) ?? null;
}

/** The case study after `slug`, wrapping around. Powers the "next case" link. */
export async function nextCaseStudy(slug: string): Promise<CaseStudy> {
  const all = await getCaseStudies();
  const index = all.findIndex((c) => c.slug === slug);
  return all[(index + 1) % all.length];
}

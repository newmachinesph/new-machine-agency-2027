import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import careersJson from "@/content/careers.json";

/** Job shape mirrors the seed JSON, so page field access is unchanged.
 *  Payload adds id/order/timestamps on top (harmless extra keys). */
export type Job = (typeof careersJson)[number] & { id?: string };

export async function getJobs(): Promise<Job[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "jobs",
    limit: 100,
    sort: "order",
  });
  return docs as unknown as Job[];
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "jobs",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return (docs[0] as unknown as Job) ?? null;
}

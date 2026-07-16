import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import servicesJson from "@/content/services.json";

/** Service shape mirrors the seed JSON, so page field access is unchanged.
 *  Payload adds id/order/timestamps on top (harmless extra keys). */
export type Service = (typeof servicesJson)[number] & {
  id?: string;
  image?: { url?: string | null } | string | null;
};

export async function getServices(): Promise<Service[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "services",
    limit: 100,
    sort: "order",
  });
  return docs as unknown as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return (docs[0] as unknown as Service) ?? null;
}

/** Services grouped by lifecycle stage, preserving first-seen order in the
 *  fetched (order-sorted) list. Mirrors lib/services#stageGroups. */
export async function getServiceStageGroups(): Promise<
  { stage: string; services: Service[] }[]
> {
  const services = await getServices();
  const order: string[] = [];
  const byStage = new Map<string, Service[]>();
  for (const service of services) {
    if (!byStage.has(service.stage)) {
      order.push(service.stage);
      byStage.set(service.stage, []);
    }
    byStage.get(service.stage)!.push(service);
  }
  return order.map((stage) => ({ stage, services: byStage.get(stage)! }));
}

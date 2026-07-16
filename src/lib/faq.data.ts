import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";

/** The shape the FAQ components already expect ({q,a}). Payload stores
 *  question/answer, so getFaqs maps back to this on the way out. */
export type Faq = { q: string; a: string };

export async function getFaqs(page = "home"): Promise<Faq[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "faq",
    where: { page: { equals: page } },
    sort: "order",
    limit: 100,
  });
  return docs.map((doc) => ({ q: doc.question, a: doc.answer }));
}

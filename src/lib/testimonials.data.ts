import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";

/** Field access on the frontend stays {quote,name,role} — same shape as the
 *  site.ts testimonials it replaces. */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: { url?: string | null } | string | null;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "testimonials",
    limit: 100,
    sort: "order",
  });
  return (
    docs as Array<{
      quote?: string;
      name?: string;
      role?: string;
      avatar?: Testimonial["avatar"];
    }>
  ).map((doc) => ({
    quote: doc.quote ?? "",
    name: doc.name ?? "",
    role: doc.role ?? "",
    avatar: doc.avatar ?? null,
  }));
}

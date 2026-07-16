import type { CollectionConfig } from "payload";

export const Jobs: CollectionConfig = {
  slug: "jobs",
  admin: { useAsTitle: "title", defaultColumns: ["title", "dept", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Controls list order; lower shows first." },
    },
    { name: "type", type: "text", admin: { description: "e.g. Full-time, Contract" } },
    { name: "location", type: "text" },
    { name: "dept", type: "text", admin: { description: "Department; maps to deptTint on the page." } },
    { name: "summary", type: "textarea" },
    // ponytail: json (not array-of-blocks) so the bare string[] in careers.json
    // round-trips through the {...item} seed and renders unchanged on the page.
    // Payload array fields wrap rows as objects, which would break both.
    { name: "responsibilities", type: "json" },
    { name: "requirements", type: "json" },
  ],
};

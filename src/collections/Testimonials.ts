import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "quote", type: "textarea", required: true },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Controls list order; 0 = first." },
    },
    // Optional editor-uploaded photo. Frontend still falls back to a generated
    // avatar by name until real, client-consented photos land here.
    { name: "avatar", type: "upload", relationTo: "media" },
  ],
};

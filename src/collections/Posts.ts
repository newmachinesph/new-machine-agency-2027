import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: { useAsTitle: "title", defaultColumns: ["title", "date"] },
  access: { read: () => true },
  defaultSort: "-date",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "description", type: "textarea" },
    { name: "date", type: "date" },
    // Array-of-text, mirroring the array pattern in Products.ts (features).
    { name: "tags", type: "array", fields: [{ name: "tag", type: "text" }] },
    {
      name: "body",
      type: "textarea",
      admin: { description: "Raw MDX/Markdown body" },
    },
  ],
};

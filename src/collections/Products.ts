import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: { useAsTitle: "name", defaultColumns: ["name", "status", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Controls list order; 0 = featured." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "In Development",
      options: ["In Development", "Beta", "Live", "Coming Soon"],
    },
    // tint (hex) + icon (icon key) map to code; kept as text, set by editors.
    { name: "tint", type: "text", admin: { description: "Accent hex, e.g. #8fc57f" } },
    { name: "icon", type: "text", admin: { description: "Icon key (see lib/products productIcons)" } },
    { name: "oneLiner", type: "textarea" },
    { name: "problem", type: "textarea" },
    { name: "solution", type: "textarea" },
    {
      name: "features",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "text", type: "textarea" },
      ],
    },
    {
      name: "loop",
      type: "group",
      fields: [
        { name: "goal", type: "textarea" },
        { name: "verify", type: "textarea" },
        { name: "stop", type: "textarea" },
      ],
    },
    { name: "link", type: "text" },
    // Optional: migrate /public/products/<slug>.webp here later. For now the
    // frontend still resolves imagery by slug via lib/media#productImage.
    { name: "image", type: "upload", relationTo: "media" },
  ],
};

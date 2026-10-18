import type { CollectionConfig } from "payload";

export const Faq: CollectionConfig = {
  slug: "faq",
  admin: { useAsTitle: "question", defaultColumns: ["question", "page", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Controls list order." },
    },
    {
      // One collection serves multiple surfaces; frontend filters by page.
      name: "page",
      type: "select",
      defaultValue: "home",
      options: ["home", "services", "general"],
    },
  ],
};

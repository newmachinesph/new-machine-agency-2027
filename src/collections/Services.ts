import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "name", defaultColumns: ["name", "stage", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Controls lifecycle order." },
    },
    {
      name: "stage",
      type: "select",
      // Lifecycle stages, in the order they appear in services.json.
      options: ["Brand & Strategy", "Design & Build", "Launch & Grow", "Scale · Beyond"],
    },
    {
      name: "icon",
      type: "select",
      admin: { description: "Brand icon (maps to lib/services serviceIcons)" },
      options: [
        "brandmark", "compass", "search", "monitor", "zap", "building",
        "appwindow", "mobile", "share", "magnet", "target", "rank",
        "mail", "aiagent", "dashboard", "splittest", "helm",
      ],
    },
    { name: "tint", type: "text", admin: { description: "Accent hex, e.g. #8fc57f" } },
    { name: "outcome", type: "textarea" },
    { name: "description", type: "textarea" },
    { name: "forWho", type: "textarea" },
    { name: "problem", type: "textarea" },
    { name: "metaDescription", type: "textarea" },
    // includes is a plain string[] in the JSON — text hasMany round-trips as-is.
    { name: "includes", type: "text", hasMany: true },
    {
      name: "approach",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "text", type: "textarea" },
      ],
    },
    {
      // Keys q/a mirror services.json and the Faq client component + faqSchema.
      name: "faqs",
      type: "array",
      fields: [
        { name: "q", type: "text" },
        { name: "a", type: "textarea" },
      ],
    },
  ],
};

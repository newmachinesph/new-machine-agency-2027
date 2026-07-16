import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: { useAsTitle: "client", defaultColumns: ["client", "industry", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  fields: [
    { name: "client", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "order",
      type: "number",
      admin: { position: "sidebar", description: "Controls list order; 0 = first." },
    },
    { name: "industry", type: "text" },
    { name: "service", type: "text" },
    { name: "year", type: "text" },
    { name: "timeline", type: "text" },
    { name: "metric", type: "text", admin: { description: "Headline number, e.g. 4.0×" } },
    { name: "metricLabel", type: "text" },
    { name: "story", type: "textarea" },
    { name: "summary", type: "textarea" },
    { name: "challenge", type: "textarea" },
    { name: "outcome", type: "textarea" },
    // ponytail: services[] / deliverables[] are bare string arrays in the JSON,
    // consumed by the pages as string[]. Payload's array field wraps rows as
    // {value, id}, which wouldn't round-trip the raw {...item} seed. json stores
    // and returns them unchanged. Editable as JSON in admin.
    { name: "services", type: "json" },
    { name: "deliverables", type: "json" },
    // approach is an array of {title, text} (the Products `features` shape), not a
    // scalar — read by named prop, so it round-trips as a structured array.
    {
      name: "approach",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "text", type: "textarea" },
      ],
    },
    {
      name: "kpis",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "before", type: "number" },
        { name: "after", type: "number" },
        { name: "beforeLabel", type: "text" },
        { name: "afterLabel", type: "text" },
        { name: "delta", type: "text" },
        { name: "goodDirection", type: "select", options: ["up", "down"] },
      ],
    },
    {
      name: "quote",
      type: "group",
      fields: [
        { name: "text", type: "textarea" },
        { name: "name", type: "text" },
        { name: "role", type: "text" },
      ],
    },
    {
      name: "series",
      type: "group",
      fields: [
        { name: "label", type: "text" },
        { name: "unit", type: "text" },
        { name: "goodDirection", type: "select", options: ["up", "down"] },
        { name: "launchIndex", type: "number" },
        // Scalar arrays (string[] / number[]) consumed directly by the charts —
        // json keeps their exact shape. See services/deliverables note above.
        { name: "months", type: "json" },
        { name: "values", type: "json" },
      ],
    },
    // Optional: migrate /public/work/<slug>.webp here later. Frontend still
    // resolves imagery by slug for now.
    { name: "image", type: "upload", relationTo: "media" },
  ],
};

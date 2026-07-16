import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "service", "createdAt"],
    description: "Inbound leads captured from the site contact form.",
  },
  // Create is public so the /api/contact route can insert; reads are admin-only.
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "company", type: "text" },
    { name: "service", type: "text" },
    { name: "message", type: "textarea", required: true },
  ],
};

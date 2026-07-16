import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    // Files live in Cloudflare R2 via the s3Storage plugin; this local dir is
    // only used as a fallback when the plugin is disabled (no R2_BUCKET set).
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};

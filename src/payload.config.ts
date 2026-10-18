import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { Services } from "./collections/Services";
import { CaseStudies } from "./collections/CaseStudies";
import { Jobs } from "./collections/Jobs";
import { Faq } from "./collections/Faq";
import { Testimonials } from "./collections/Testimonials";
import { Posts } from "./collections/Posts";
import { ContactSubmissions } from "./collections/ContactSubmissions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const REQUIRED_ENV = ["PAYLOAD_SECRET", "DATABASE_URL"] as const;
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  throw new Error(`Missing required environment variable(s): ${missingEnv.join(", ")}`);
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    Users,
    Media,
    Products,
    Services,
    CaseStudies,
    Jobs,
    Faq,
    Testimonials,
    Posts,
    ContactSubmissions,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL as string },
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename: name, prefix }) => {
            const key = prefix ? `${prefix}/${name}` : name;
            return `${process.env.R2_PUBLIC_URL}/${key}`;
          },
        },
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
});

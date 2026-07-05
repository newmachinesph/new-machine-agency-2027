import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Next 16 static export writes RSC segment payloads nested as
 *   <route>/__next.<segment>/__PAGE__.txt
 * but the client router prefetches the flat form
 *   <route>/__next.<segment>.__PAGE__.txt
 * Vercel bridges the two; plain static hosts 404 (console noise + a
 * Lighthouse best-practices hit). This copies each payload to the flat name
 * so the export works on any static host. Runs via the `postbuild` script.
 */
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      const page = join(full, "__PAGE__.txt");
      if (existsSync(page)) copyFileSync(page, join(dir, `${entry.name}.__PAGE__.txt`));
    }
    walk(full);
  }
}

walk("out");

import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import servicesJson from "@/content/services.json";

// TEMP seed route. Hit once with ?token=<PAYLOAD_SECRET> to sync services.json
// into the Payload "services" collection, then delete this file.
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const results: string[] = [];

  for (let i = 0; i < servicesJson.length; i++) {
    const s = servicesJson[i];
    const data = { ...s, order: i };
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: s.slug } },
      limit: 1,
    });
    if (existing.docs[0]) {
      await payload.update({ collection: "services", id: existing.docs[0].id, data });
      results.push(`updated ${s.slug}`);
    } else {
      await payload.create({ collection: "services", data });
      results.push(`created ${s.slug}`);
    }
  }

  return NextResponse.json({ ok: true, count: results.length, results });
}

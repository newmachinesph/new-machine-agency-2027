import type { Metadata } from "next";
import V2Hero from "@/components/v2/V2Hero";
import V2Proof from "@/components/v2/V2Proof";
import V2Manifesto from "@/components/v2/V2Manifesto";
import V2Services from "@/components/v2/V2Services";
import V2Stats from "@/components/v2/V2Stats";
import V2Products from "@/components/v2/V2Products";
import V2Quote from "@/components/v2/V2Quote";
import V2Cta from "@/components/v2/V2Cta";

export const metadata: Metadata = {
  // Root layout supplies the default title + OG card; the home page only
  // overrides the meta description (site.description runs long for a SERP).
  description:
    "Full-lifecycle startup studio in Makati working with founders in the US, the Philippines and worldwide: brand, web, apps, launch, growth and AI automation.",
  alternates: { canonical: "/" },
};

/** V2 homepage — machine-dark marquee composition. The .v2-scope wrapper
 *  pins the dark token set so the canvas stays cinematic in both themes.
 *  V1 sections remain in src/components/sections/ untouched. */
export default function Home() {
  return (
    <div className="v2-scope">
      <V2Hero />
      <V2Proof />
      <V2Manifesto />
      <V2Services />
      <V2Stats />
      <V2Products />
      <V2Quote />
      <V2Cta />
    </div>
  );
}

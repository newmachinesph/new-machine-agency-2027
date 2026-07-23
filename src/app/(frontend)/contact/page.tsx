import type { Metadata } from "next";
import { site } from "@/config/site";
import { AREA_SERVED, breadcrumbSchema, orgRef, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Book a free strategy call or send us a message. We reply within 24 hours, usually much faster.",
  path: "/contact/",
  withImage: true,
});

const reassurances = [
  "Free 30-minute strategy call",
  "One fixed quote: no surprises",
  "No pressure, no obligation",
];

export default function ContactPage() {
  return (
    <div className="v2-scope">
      <section className="relative overflow-hidden pt-32 pb-16 md:pb-20">
        <div className="v2-ground" aria-hidden="true" />
        <div className="wrap relative">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              Contact
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Let&rsquo;s talk about your{" "}
              <span className="text-accent">growth</span>.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-lg text-muted">
              Clear plans, honest advice — replies within 24 hours, usually
              much faster.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="wrap grid gap-14 overflow-x-clip pb-24 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <div>
          <Reveal delay={120}>
            <a
              href={`mailto:${site.email}`}
              className="v2-frame block p-6 transition-colors hover:border-accent"
            >
              <span className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
                Email
              </span>
              <span className="mt-2 block font-display text-lg font-semibold text-fg">
                {site.email}
              </span>
            </a>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-8 space-y-2.5">
              {reassurances.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 space-y-4">
              {site.offices.map((office) => (
                <div key={office.region} className="v2-frame p-6">
                  <p className="font-display text-lg font-semibold text-fg">
                    {office.country}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {office.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ContactForm />
        </Reveal>
      </div>

      <JsonLd
        data={webPageSchema({
          type: "ContactPage",
          name: `Contact ${site.name}`,
          description: `Talk to ${site.name}. Based in Makati, working with founders worldwide.`,
          path: "/contact/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      {/* Each office as its own resolvable place, tied back to the parent
          organization: what an assistant needs to answer "where are they based". */}
      {site.offices.map((office) => (
        <JsonLd
          key={office.region}
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${site.url}/#office-${office.country.toLowerCase().replace(/\s+/g, "-")}`,
            name: `${site.name} | ${office.region}`,
            parentOrganization: orgRef,
            url: `${site.url}/contact/`,
            email: site.email,
            image: `${site.url}/og-image.png`,
            priceRange: "$$",
            areaServed: [...AREA_SERVED],
            address: {
              "@type": "PostalAddress",
              streetAddress: office.streetAddress,
              addressLocality: office.city,
              addressRegion: office.region2,
              postalCode: office.postalCode,
              addressCountry: office.countryCode,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: office.geo.lat,
              longitude: office.geo.lng,
            },
          }}
        />
      ))}
    </div>
  );
}

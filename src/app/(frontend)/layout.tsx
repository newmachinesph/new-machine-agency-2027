import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/config/site";
import { ORG_ID, WEBSITE_ID, orgRef, AREA_SERVED } from "@/lib/schema";
import Navbar from "@/components/layout/Navbar";
import { getProducts } from "@/lib/products.data";
import { getServiceStageGroups } from "@/lib/services.data";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import CustomCursor from "@/components/ui/CustomCursor";
import JsonLd from "@/components/ui/JsonLd";
import MotionProvider from "@/components/ui/MotionProvider";

// Manrope — body (refined geometric grotesk); Space Grotesk — display/titles
// (technical, distinctive, pairs with the geometric pattern system).
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name} | ${site.tagline}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Full-Lifecycle Startup Studio`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "digital studio",
    "startup studio",
    "web design",
    "web development",
    "app development",
    "branding",
    "growth marketing",
    "AI automation",
    "landing pages",
    "Makati",
    "Philippines",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  robots: "index, follow, noarchive",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} | Full-Lifecycle Startup Studio`,
    description: site.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Full-Lifecycle Startup Studio`,
    description: site.description,
    images: [OG_IMAGE.url],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

/* Dark-only site: no stored preference, just flag JS availability. */
const themeScript = `document.documentElement.classList.add("js");`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let serviceStageGroups: Awaited<ReturnType<typeof getServiceStageGroups>> = [];
  try {
    [products, serviceStageGroups] = await Promise.all([getProducts(), getServiceStageGroups()]);
  } catch (err) {
    console.error("[layout] failed to load CMS nav data:", err);
  }
  const stages = serviceStageGroups.map((group) => group.stage);
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      className={`${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <CustomCursor />
        <MotionProvider>
          <Navbar products={products} serviceStageGroups={serviceStageGroups} />
          <main id="main-content">{children}</main>
          <Footer stages={stages} />
          <BackToTop />
        </MotionProvider>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": ORG_ID,
            name: site.name,
            legalName: site.legalName,
            description: site.description,
            slogan: site.principle,
            url: site.url,
            logo: `${site.url}/og-image.png`,
            image: `${site.url}/og-image.png`,
            email: site.email,
            areaServed: [...AREA_SERVED],
            // What buyers actually search for, alongside the studio's niche
            // loop/agent vocabulary, so assistants associate the entity with
            // the full range of sellable work, not just the AI positioning.
            knowsAbout: [
              "Web design",
              "Web development",
              "App development",
              "Brand identity",
              "Landing pages",
              "MVP development",
              "Growth marketing",
              "Loop engineering",
              "Autonomous agent systems",
              "Answer engine optimization",
            ],
            // Email is the launch-ready contact channel.
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: site.email,
              areaServed: [...AREA_SERVED],
              availableLanguage: ["en"],
            },
            sameAs: site.socials.map((social) => social.href),
            address: {
              "@type": "PostalAddress",
              streetAddress: "PBCom Tower, 6795 Ayala Ave cor. V.A. Rufino St",
              addressLocality: "Makati",
              addressRegion: "Metro Manila",
              postalCode: "1226",
              addressCountry: "PH",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": WEBSITE_ID,
            name: site.name,
            description: site.description,
            url: site.url,
            inLanguage: "en",
            publisher: orgRef,
          }}
        />
      </body>
      <GoogleAnalytics gaId={site.analyticsId} />
    </html>
  );
}

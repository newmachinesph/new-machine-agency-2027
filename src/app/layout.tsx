import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import CustomCursor from "@/components/ui/CustomCursor";
import JsonLd from "@/components/ui/JsonLd";
import MotionProvider from "@/components/ui/MotionProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Full-Lifecycle Startup Studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  robots: "index, follow, noarchive",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t}catch(e){d.dataset.theme="dark"}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      className={`${bricolage.variable} ${schibsted.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <CustomCursor />
        <MotionProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </MotionProvider>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            description: site.description,
            url: site.url,
            logo: `${site.url}/opengraph-image.png`,
            email: site.email,
            sameAs: site.socials.map((social) => social.href),
            address: [
              { "@type": "PostalAddress", addressLocality: "New York", addressCountry: "US" },
              { "@type": "PostalAddress", addressLocality: "Manila", addressCountry: "PH" },
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            url: site.url,
          }}
        />
      </body>
    </html>
  );
}

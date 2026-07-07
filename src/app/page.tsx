import type { Metadata } from "next";
import faq from "@/content/faq.json";
import JsonLd from "@/components/ui/JsonLd";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import StatsBar from "@/components/sections/StatsBar";
import SelectedWork from "@/components/sections/SelectedWork";
import Impact from "@/components/sections/Impact";
import ServicesBento from "@/components/sections/ServicesBento";
import WhyItMatters from "@/components/sections/WhyItMatters";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import Process from "@/components/sections/Process";
import Comparison from "@/components/sections/Comparison";
import Testimonials from "@/components/sections/Testimonials";
import ProductsTeaser from "@/components/sections/ProductsTeaser";
import HomeFaq from "@/components/sections/HomeFaq";
import FinalCta from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <Impact />
      <ServicesBento />
      <WhyItMatters />
      <WhoWeHelp />
      <Process />
      <Comparison />
      <StatsBar />
      <Testimonials />
      <ProductsTeaser />
      <HomeFaq />
      <FinalCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </>
  );
}

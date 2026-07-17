import type { Metadata } from "next";
import { getFaqs } from "@/lib/faq.data";
import { faqSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Hero from "@/components/sections/Hero";
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

export default async function Home() {
  const faqs = await getFaqs();
  return (
    <>
      <Hero />
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
      <HomeFaq faqs={faqs} />
      <FinalCta />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}

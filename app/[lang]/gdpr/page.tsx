"use client";

import { Footer } from "@/app/[lang]/sections/Footer";

import { useParams } from "next/navigation";

import enGdpr from "@/app/dictionaries/gdpr/gdpr_en.mdx";
import czGdpr from "@/app/dictionaries/gdpr/gdpr_cz.mdx";
import { Section } from "@/app/components/Section";
import { SubpageNav } from "@/app/components/SubpageNav";

const Gdpr = () => {
  const params = useParams();
  const Content = params.lang === "cz" ? czGdpr : enGdpr;

  return (
    <>
      <Section trackingName="gdpr-nav" className="bg-primary py-12 lg:py-16">
        <SubpageNav backToSection="stay-tuned" centered />
      </Section>
      <Section
        trackingName="gdpr-content"
        className="bg-dots bg-white py-16 lg:py-24"
      >
        <div className="container mx-auto px-6 text-black">
          <Content />
        </div>
      </Section>
      <Section trackingName="gdpr-nav" className="bg-black py-12 lg:py-16">
        <SubpageNav backToSection="stay-tuned" centered />
      </Section>
      <Footer />
    </>
  );
};

export default Gdpr;

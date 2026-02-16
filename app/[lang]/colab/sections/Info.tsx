"use client";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import { useParams } from "next/navigation";

import enExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_en.mdx";
import czExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_cz.mdx";
import enExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_en.mdx";
import czExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_cz.mdx";
import ArrowIcon from "@/app/icons/arrow";
import { SubpageNav } from "@/app/components/SubpageNav";
import { Section } from "@/app/components/Section";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const Card = params.lang === "cz" ? czExhibitorsCard : enExhibitorsCard;
  const Content =
    params.lang === "cz" ? czExhibitorsContent : enExhibitorsContent;

  return (
    <>
      {/* Hero Section */}
      <Section id="info" className="bg-primary bg-lines pt-8 pb-16 lg:pb-24">
        <SubpageNav backToSection="colab" selfHref="colab" />

        <div className="container mx-auto mt-12 px-6">
          {/* Title */}
          <div className="mb-6 lg:mb-16">
            <h1 className="font-display mb-6 text-3xl leading-[0.85] font-black text-white uppercase md:text-6xl lg:text-7xl">
              {lang.exhibitors.title}
            </h1>
            <p className="text-lg leading-relaxed text-white/80 lg:text-2xl">
              {lang.exhibitors.text}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
            {/* Info Card */}
            <div className="punk-border pop-shadow bg-white p-4 text-black lg:p-6">
              <Card />
              <a
                className="bg-primary font-display mt-10 block px-6 py-4 text-center text-xl font-black uppercase"
                href="#colab-content"
              >
                {lang.exhibitors.terms}
              </a>
            </div>

            {/* CTA Card */}
            <div className="flex flex-col items-stretch justify-stretch gap-8">
              <a
                href={lang.forms.roasters}
                rel="external"
                target="_blank"
                title={lang.exhibitors.cta}
                className="bg-accent punk-border pop-shadow group flex h-full items-center justify-center pl-8 text-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <span className="font-display text-center text-xl font-black tracking-wider uppercase lg:text-3xl">
                  {lang.exhibitors.cta}
                </span>
                <div className="aspect-square h-24">
                  <ArrowIcon />
                </div>
              </a>
              <a
                href={lang.forms.gastro}
                rel="external"
                target="_blank"
                title={lang.gastro.cta}
                className="bg-secondary punk-border pop-shadow group flex h-full items-center justify-center pl-8 text-white transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <span className="font-display text-center text-xl font-black tracking-wider uppercase lg:text-3xl">
                  {lang.gastro.cta}
                </span>
                <div className="aspect-square h-24">
                  <ArrowIcon />
                </div>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Content Section */}
      <Section
        trackingName="colab-content"
        id="colab-content"
        className="bg-dots bg-white py-6"
      >
        <div className="container mx-auto px-6 text-black">
          <Content />
        </div>
      </Section>

      {/* Bottom Navigation */}
      <Section trackingName="colab-nav" className="bg-black py-12 lg:py-16">
        <SubpageNav backToSection="colab" centered />
      </Section>
    </>
  );
};

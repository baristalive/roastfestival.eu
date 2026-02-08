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
          <div className="mb-12 lg:mb-16">
            <h1 className="font-display mb-6 text-3xl leading-[0.85] font-black text-white uppercase md:text-6xl lg:text-7xl">
              {lang.exhibitors.title}
            </h1>
            <p className="text-lg leading-relaxed text-white/80 lg:text-2xl">
              {lang.exhibitors.text}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Info Card */}
            <div className="punk-border pop-shadow bg-white p-8 text-black lg:p-10">
              <Card />
            </div>

            {/* CTA Card */}
            <div className="flex flex-col items-stretch justify-stretch gap-8">
              <a
                href={lang.forms.roasters}
                rel="external"
                target="_blank"
                title={lang.exhibitors.cta}
                className="bg-accent punk-border pop-shadow group flex h-full items-center justify-center px-8 py-2 text-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:px-10"
              >
                <span className="font-display text-center text-2xl font-black tracking-wider uppercase lg:text-3xl">
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
                className="bg-secondary punk-border pop-shadow group flex h-full items-center justify-center gap-6 p-2 px-8 text-white transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:px-10"
              >
                <span className="font-display text-center text-2xl font-black tracking-wider uppercase lg:text-3xl">
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
        className="bg-dots bg-white py-16 lg:py-24"
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

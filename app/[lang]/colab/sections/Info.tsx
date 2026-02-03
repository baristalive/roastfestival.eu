"use client";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import { useParams } from "next/navigation";

import enExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_en.mdx";
import czExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_cz.mdx";
import enExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_en.mdx";
import czExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_cz.mdx";
import ArrowIcon from "@/app/icons/arrow";
import { SubpageNav } from "@/app/components/SubpageNav";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const Card = params.lang === "cz" ? czExhibitorsCard : enExhibitorsCard;
  const Content =
    params.lang === "cz" ? czExhibitorsContent : enExhibitorsContent;

  return (
    <>
      {/* Hero Section */}
      <section id="info" className="bg-primary bg-lines pt-8 pb-16 lg:pb-24">
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
            <a
              href={lang.exhibitors.formLink}
              rel="external"
              target="_blank"
              title={lang.exhibitors.cta}
              className="bg-accent punk-border pop-shadow group flex flex-col items-center justify-center gap-6 p-8 text-white transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:p-10"
            >
              <div className="text-6xl lg:text-7xl">
                <ArrowIcon />
              </div>
              <span className="font-display text-center text-2xl font-black tracking-wider uppercase lg:text-3xl">
                {lang.exhibitors.cta}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-dots bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6 text-black">
          <Content />
        </div>
      </section>

      {/* Bottom Navigation */}
      <section className="bg-black py-12 lg:py-16">
        <SubpageNav backToSection="colab" centered />
      </section>
    </>
  );
};

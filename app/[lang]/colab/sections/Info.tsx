"use client";
import Bar from "@/app/components/Bar";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import { useGSAP } from "@gsap/react";
import { useParams } from "next/navigation";
import { useRef } from "react";

import NavBar from "@/app/components/NavBar";
import ArrowIcon from "@/app/icons/arrow";

import enExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_en.mdx";
import czExhibitorsCard from "@/app/dictionaries/colab/exhibitors/card_cz.mdx";
import enExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_en.mdx";
import czExhibitorsContent from "@/app/dictionaries/colab/exhibitors/content_cz.mdx";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const Card = params.lang === 'cz' ? czExhibitorsCard : enExhibitorsCard
  const Content = params.lang === 'cz' ? czExhibitorsContent : enExhibitorsContent

  const { contextSafe } = useGSAP({ scope: ref });
  return (
    <>
      <section
        ref={ref}
        id="info"
        className="colab-section watermark flex flex-col pb-10 items-center justify-between"
      >
        <NavBar backToSection="colab" />
        <div className="flex flex-col lg:grid max-w-[1900px] gap-8 p-8 grid-cols-[1fr,2fr]">
          <div className="md:p-12">
            <h2 className="w-3/4 pb-8 text-3xl 2xl:text-6xl font-bold md:pt-56 lg:pt-20 break-words md:break-normal">
              {lang.exhibitors.title}
            </h2>
            <div className="mx-auto max-w-screen-lg space-y-10 text-base leading-normal lg:text-xl">
              {lang.exhibitors.text}
            </div>
            <Bar mountRef={ref} contextSafe={contextSafe} />
          </div>
          <div className="cards flex flex-col gap-8 2xl:grid md:grid-cols-2">
            <div className="card elevate h-auto rounded-2xl md:px-12 pb-8 text-base 2xl:text-3xl">
              <Card />
            </div>
            <div className="card nav elevate flex h-full flex-col rounded-2xl md:px-12 pb-4 ">
              <a
                href={lang.exhibitors.formLink}
                rel="external"
                className="flex h-full flex-col items-center justify-center p-4"
              >
                <div className="text-6xl">
                  <ArrowIcon />
                </div>
                <h2 className="mt-6 text-3xl font-bold">
                  {lang.exhibitors.cta}
                </h2>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="watermark-large relative bg-transparent program-section">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:p-12">
          <div className=" h-auto rounded-2xl md:px-32 py-16 text-lg">
            <Content />
          </div>
        </div>
      </section>
      <section className="flex min-h-64 items-center justify-center">
        <NavBar backToSection="colab" />
      </section>
    </>
  );
};

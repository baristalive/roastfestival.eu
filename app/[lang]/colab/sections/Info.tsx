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
  const Card = params.lang === "cz" ? czExhibitorsCard : enExhibitorsCard;
  const Content =
    params.lang === "cz" ? czExhibitorsContent : enExhibitorsContent;

  const { contextSafe } = useGSAP({ scope: ref });
  return (
    <>
      <section
        ref={ref}
        id="info"
        className="colab-section watermark flex flex-col items-center justify-between pb-10"
      >
        <NavBar backToSection="colab" />
        <div className="flex max-w-[1900px] grid-cols-[1fr,2fr] flex-col gap-8 p-8 lg:grid">
          <div className="md:p-12">
            <h2 className="w-3/4 break-words pb-8 text-3xl font-bold md:break-normal md:pt-56 lg:pt-20 2xl:text-6xl">
              {lang.exhibitors.title}
            </h2>
            <div className="mx-auto max-w-screen-lg space-y-10 text-base leading-normal lg:text-xl">
              {lang.exhibitors.text}
            </div>
            <Bar mountRef={ref} contextSafe={contextSafe} />
          </div>
          <div className="cards flex flex-col gap-8 md:grid-cols-2 2xl:grid">
            <div className="card elevate h-auto rounded-2xl pb-8 text-base md:px-12 2xl:text-3xl">
              <Card />
            </div>
            <div className="card nav elevate flex h-full flex-col rounded-2xl pb-4 md:px-12 ">
              <a
                href={lang.exhibitors.formLink}
                rel="external"
                target="_blank"
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
      <section className="watermark-large program-section relative bg-transparent">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:p-12">
          <div className=" h-auto rounded-2xl py-16 text-lg md:px-32">
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

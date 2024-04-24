"use client";
import Bar from "@/app/components/Bar";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import { useGSAP } from "@gsap/react";
import { useParams } from "next/navigation";
import { useRef } from "react";

import Markdown from "@/app/components/Markdown";
import NavBar from "@/app/components/NavBar";
import ArrowIcon from "@/app/icons/arrow";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const { contextSafe } = useGSAP({ scope: ref });
  return (
    <>
      <section
        ref={ref}
        id="info"
        className="colab-section watermark flex flex-col pb-10 items-center justify-between"
      >
        <NavBar backToSection="colab" />
        <div className="flex flex-col lg:grid max-w-[1900px] gap-8 md:p-8 grid-cols-[1fr,2fr]">
          <div className="top-20 md:p-12">
            <h2 className="w-3/4 pb-8 pt-24 text-6xl font-bold md:pt-56 lg:pt-20 break-words md:break-normal">
              {lang.exhibitors.title}
            </h2>
            <div className="mx-auto max-w-screen-lg space-y-10 text-lg leading-normal lg:text-xl">
              {lang.exhibitors.text}
            </div>
            <Bar mountRef={ref} contextSafe={contextSafe} />
          </div>
          <div className="cards flex flex-col gap-8 2xl:grid md:grid-cols-2">
            <div className="card elevate h-auto rounded-2xl md:px-12 pb-8 text-lg lg:text-xl">
              <Markdown>{lang.exhibitors.card}</Markdown>
            </div>
            <div className="card nav elevate flex h-full flex-col rounded-2xl px-12 pb-4 ">
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
            <Markdown>{lang.exhibitors.content}</Markdown>
          </div>
        </div>
      </section>
      <section className="flex min-h-64 items-center justify-center">
        <NavBar backToSection="colab" />
      </section>
    </>
  );
};

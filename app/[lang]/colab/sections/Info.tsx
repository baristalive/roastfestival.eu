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
        className="flex flex-col items-center justify-between pb-96  info-section watermark z-0"
      >
        <NavBar backToSection="colab" />
        <div className="grid max-w-[1900px] items-center gap-8 p-8 lg:grid-cols-[1fr,2fr]">
          <div className="sticky top-20 md:p-12">
            <h2 className="w-3/4 pb-8 pt-24 text-6xl font-bold md:pt-56 lg:pt-20">
              {lang.exhibitors.title}
            </h2>
            <div className="mx-auto max-w-screen-lg space-y-10 text-lg leading-normal lg:text-xl">
              {lang.exhibitors.text}
            </div>
            <Bar mountRef={ref} contextSafe={contextSafe} />
          </div>
          <div className="cards flex gap-8 md:grid md:grid-cols-2">
            <div className="card elevate h-auto rounded-2xl px-12 pb-8 text-lg lg:text-xl">
                <Markdown>{lang.exhibitors.card}</Markdown>
            </div>
            <div className="card flex flex-col nav elevate h-full rounded-2xl px-12 pb-4 ">
                <a href="" className="flex h-full flex-col p-4 items-center justify-center">
                  <div className="text-6xl">
                  <ArrowIcon />
                  </div>
                  <h2 className="text-3xl font-bold mt-6">{lang.exhibitors.cta}</h2>
                </a>
            </div>
          </div>
        </div>
      </section>
      <section className="-mt-72 bg-transparent z-10 relative watermark2">
        <div className="mx-auto cards flex max-w-[1200px] flex-col gap-8 p-12">
          <div className="card h-auto rounded-2xl px-32 py-16 text-lg elevate">
            <Markdown>{lang.exhibitors.content}</Markdown>
          </div>
        </div>
      </section>
      <section className="min-h-64 flex items-center justify-center">
        <NavBar backToSection="colab" />
      </section>
    </>
  );
};

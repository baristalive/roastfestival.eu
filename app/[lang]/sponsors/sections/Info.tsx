"use client";
import Bar from "@/app/components/Bar";
import { SupportedLanguages, dictionaries } from "@/app/dictionaries/all";
import { useParams } from "next/navigation";

import NavBar from "@/app/components/NavBar";
import ArrowIcon from "@/app/icons/arrow";

import enSponsorsContent from "@/app/dictionaries/colab/sponsors/content_en.mdx";
import czSponsorsContent from "@/app/dictionaries/colab/sponsors/content_cz.mdx";

export const Info = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const Content = params.lang === "cz" ? czSponsorsContent : enSponsorsContent;

  return (
    <>
      <section
        id="info"
        className="colab-section watermark flex flex-col items-center justify-between pb-10"
      >
        <NavBar backToSection="colab" />
        <div className="flex max-w-[1900px] grid-cols-[1fr,2fr] flex-col gap-8 p-8 lg:grid">
          <div className="md:p-12">
            <h2 className="w-3/4 break-words pb-8 text-3xl font-bold md:break-normal md:pt-56 lg:pt-20 2xl:text-6xl">
              {lang.colab.sponsors.title}
            </h2>
            <div className="mx-auto max-w-screen-lg space-y-10 text-base leading-normal lg:text-xl">
              {lang.colab.sponsors.text}
            </div>
            <Bar />
          </div>
          <div className="cards flex flex-col items-center">
            <div className="card nav elevate flex h-full flex-col rounded-2xl pb-4 md:px-12">
              <a
                href={lang.sponsors.signUpLink}
                rel="external"
                className="flex h-full flex-col items-center justify-center p-4 px-32"
              >
                <div className="text-6xl">
                  <ArrowIcon />
                </div>
                <h2 className="mt-6 text-3xl font-bold">{lang.sponsors.cta}</h2>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="watermark-large relative mdx-content-section">
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

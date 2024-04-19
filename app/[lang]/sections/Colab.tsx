"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import PlusIcon from "@/app/icons/plus";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Bar from "@/app/components/Bar";
import { StationIcon } from "../components/StationIcon";
import ArrowIcon from "@/app/icons/arrow";

export const Colab = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });
  return (
    <section ref={ref} id="colab" className="colab-section">
      <div className="mx-auto grid max-w-[1900px] gap-32 px-8 pb-48 lg:grid-cols-[1fr,2fr]">
        <div className="md:p-12">
          <h2 className="w-3/4 pb-8 pt-24 text-6xl font-bold md:pt-56 lg:pt-20">
            {lang.colab.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-lg leading-normal lg:text-xl">
            {lang.colab.description}
          </div>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-24 pt-36 text-xl">
          <div className="card elevate nav h-full rounded-2xl p-12">
            <a
              href={`/${params.lang}/colab`}
              title={lang.colab.exhibitors.title}
              rel="author"
              className="flex h-full flex-col"
            >
              <h3 className="text-3xl font-bold">
                {lang.colab.exhibitors.title}
              </h3>
              <div className="-ml-4 flex gap-2 py-8">
                <StationIcon station="espresso" />
                <StationIcon station="espresso_milk" />
                <StationIcon station="brew" />
                <StationIcon station="lecture" />
                <StationIcon station="workshop" />
              </div>
              <p className="py-2">{lang.colab.exhibitors.text}</p>
              <div className="grow" />
              <div className="text-md mt-8 text-[var(--black)]">
                <div className="float-right">
                  <ArrowIcon />
                </div>
              </div>
            </a>
          </div>
          <div className="card elevate nav h-full rounded-2xl p-12">
            <a
              href={`/${params.lang}/sponsors`}
              title={lang.colab.sponsors.title}
              rel="author"
              className="flex h-full flex-col justify-between"
            >
              <h3 className="text-3xl font-bold">
                {lang.colab.sponsors.title}
              </h3>
              <div className="flex gap-2 py-8">
                <PlusIcon />
              </div>
              <p className="py-2">{lang.colab.sponsors.text}</p>
              <div className="grow" />
              <div className="text-md mt-8 text-[var(--black)]">
                <div className="float-right">
                  <ArrowIcon />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

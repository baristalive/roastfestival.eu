"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import PlusIcon from "@/app/icons/plus";
import Bar from "@/app/components/Bar";
import { StationIcon } from "../components/StationIcon";
import ArrowIcon from "@/app/icons/arrow";

export const Colab = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section id="colab" className="colab-section">
      <div className="mx-auto grid max-w-[1900px] gap-12 px-8 pb-12 lg:grid-cols-[1fr,2fr] 2xl:gap-32 lg:pb-80">
        <div className="md:p-12">
          <h2 className="w-3/4 pb-8 text-3xl font-bold 2xl:text-6xl">
            {lang.colab.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.colab.description}
          </div>
          <Bar  />
        </div>
        <div className="flex grid-cols-2 flex-col items-center justify-center gap-8 text-xl md:grid">
          <div className="card elevate nav md:h-full rounded-2xl p-8 2xl:p-12">
            <a
              href={`/${params.lang}/colab`}
              title={lang.colab.exhibitors.title}
              rel="next"
              className="flex h-full flex-col"
            >
              <h3 className="pb-4 text-xl font-bold 2xl:pb-12 2xl:text-3xl">
                {lang.colab.exhibitors.title}
              </h3>
              <div className="flex flex-wrap gap-2 py-2 md:py-8 text-xl 2xl:-ml-4 2xl:text-3xl ">
                <StationIcon station="espresso" />
                <StationIcon station="espresso_milk" />
                <StationIcon station="brew" />
                <StationIcon station="lecture" />
                <StationIcon station="workshop" />
              </div>
              <p className="py-2 text-base 2xl:text-xl">
                {lang.colab.exhibitors.text}
              </p>
              <div className="grow" />
              <div className="text-md mt-2 md:mt-8 text-[var(--black)]">
                <div className="float-right">
                  <ArrowIcon />
                </div>
              </div>
            </a>
          </div>
          <div className="card elevate nav md:h-full rounded-2xl p-8 2xl:p-12">
            <a
              href={`/${params.lang}/sponsors`}
              title={lang.colab.sponsors.title}
              rel="next"
              className="flex h-full flex-col justify-between"
            >
              <h3 className="pb-4 text-xl font-bold 2xl:pb-12 2xl:text-3xl">
                {lang.colab.sponsors.title}
              </h3>
              <div className="flex gap-2 py-2 md:py-8 text-xl 2xl:text-3xl">
                <PlusIcon />
              </div>
              <p className="py-2 text-base 2xl:text-xl">
                {lang.colab.sponsors.text}
              </p>
              <div className="grow" />
              <div className="text-md mt-2 md:mt-8 text-[var(--black)]">
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

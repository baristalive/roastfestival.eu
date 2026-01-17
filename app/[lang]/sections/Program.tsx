"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { StationIcon } from "../components/StationIcon";
import ArrowIcon from "@/app/icons/arrow";
import PlusIcon from "@/app/icons/plus";

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section
      className={`py-8 lg:pb-48 ${lang.program.some((day) => day.schedule.length > 0) ? "h-fit" : ""}`}
      id="program"
    >
      <div className="mx-auto grid max-w-475 gap-12 px-8 pb-12 lg:grid-cols-3 2xl:gap-32">
        <div />
        <div className="aspect-square text-center">
          <a
            href={`/${params.lang}/program`}
            title={lang.colab.sponsors.title}
            rel="next"
            className="card elevate nav relative flex h-full flex-col items-center justify-center rounded-full px-10"
          >
            <h3 className="pb-4 text-xl font-bold 2xl:pb-12 2xl:text-3xl">
              {lang.programTile.title}
            </h3>
            <div className="flex gap-2 py-2 text-xl md:py-8 2xl:text-3xl">
              <StationIcon station="espresso" />
              <StationIcon station="espresso_milk" />
              <StationIcon station="brew" />
              <StationIcon station="lecture" />
              <StationIcon station="workshop" />
              <PlusIcon />
            </div>
            <p className="py-2 text-base 2xl:text-xl">
              {lang.programTile.content}
            </p>
            <div className="absolute right-0 bottom-0 mt-2 text-4xl text-(--black) md:mt-8">
              <div className="float-right">
                <ArrowIcon />
              </div>
            </div>
          </a>
        </div>
        <div />
      </div>
    </section>
  );
};

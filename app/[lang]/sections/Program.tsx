"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";
import { CaffeinCounter } from "@/app/[lang]/components/CaffeinCounter";

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section
      className={`bg-dots bg-white py-12 lg:pt-22 lg:pb-48 ${lang.program.some((day) => day.schedule.length > 0) ? "h-fit" : ""}`}
      id="lineup"
    >
      <div className="container mx-auto lg:px-6">
        <div className="mx-auto flex flex-col items-center p-6 text-center lg:p-12">
          <h2 className="font-display mb-4 text-3xl leading-[0.85] font-black text-black uppercase md:text-6xl">
            {lang.programTile.title}
          </h2>
          <p className="mb-8 text-2xl tracking-wider text-black/80 uppercase">
            {lang.programTile.loadingText}
          </p>
          <div className="mb-6 flex gap-4 text-black">
            <span
              className="animate-bean-pulse w-12"
              style={{ animationDelay: "0s" }}
            >
              <BeanIcon />
            </span>
            <span
              className="animate-bean-pulse w-12"
              style={{ animationDelay: "0.3s" }}
            >
              <BeanIcon />
            </span>
            <span
              className="animate-bean-pulse w-12"
              style={{ animationDelay: "0.6s" }}
            >
              <BeanIcon />
            </span>
          </div>
          <div className="mb-12 w-full bg-white">
            <div className="animate-pop punk-border pop-shadow bg-primary/10 relative h-12 w-full border-2">
              <div className="bg-primary animate-progress-load h-full border-r-4 border-black" />
              <p className="absolute inset-0 flex items-center justify-start pl-6 text-base font-bold text-black">
                20%
              </p>
            </div>
          </div>
          <CaffeinCounter />
        </div>
      </div>
    </section>
  );
};

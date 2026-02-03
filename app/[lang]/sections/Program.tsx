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
      className={`bg-ivory bg-dots pt-12 lg:pt-22 lg:pb-48 ${lang.program.some((day) => day.schedule.length > 0) ? "h-fit" : ""}`}
      id="lineup"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto flex flex-col items-center p-8 text-center lg:p-12">
          <h2 className="font-display text-evergreen mb-4 text-5xl leading-[0.85] font-black uppercase md:text-6xl">
            {lang.programTile.title}
          </h2>
          <p className="text-evergreen/80 mb-8 text-2xl tracking-wider uppercase">
            {lang.programTile.loadingText}
          </p>
          <div className="text-evergreen mb-6 flex gap-4">
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
          <div className="bg-ivory mb-12 w-full">
            <div className="animate-pop punk-border pop-shadow bg-primary/10 relative h-12 w-full border-2">
              <div className="bg-primary border-evergreen animate-progress-load h-full border-r-4" />
              <p className="text-evergreen absolute inset-0 flex items-center justify-start pl-6 text-base font-bold">
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

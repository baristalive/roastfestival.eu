"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { StationIcon } from "@/app/components/StationIcon";

export const Colab = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section id="colab" className="relative overflow-hidden lg:pb-12">
      {/* Split background */}
      <div className="absolute inset-0 hidden lg:flex">
        <div className="bg-primary flex-1" />
        <div className="flex-1 bg-black" />
      </div>

      {/* Center V divider */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
        <svg
          className="h-full w-full max-w-50 md:max-w-75"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 50,100 100,0" className="fill-black" />
        </svg>
      </div>
      <div className="bg-primary relative pt-24 pb-24 text-center lg:bg-[unset] lg:pt-32 lg:pb-0">
        <h2 className="font-display mb-8 text-3xl leading-[0.85] font-black text-white uppercase md:text-6xl">
          {lang.colab.title}
        </h2>
        <p className="text-md mx-auto max-w-2xl px-6 tracking-wider text-white/80 uppercase md:text-2xl">
          {lang.colab.description}
        </p>
      </div>

      <div className="relative">
        {/* Crossroads paths */}
        <div className="bg-primary container mx-auto flex flex-col lg:flex-row lg:bg-[unset] lg:py-16 lg:pb-24">
          {/* Left path - Exhibitors */}
          <a
            href={`/${params.lang}/colab`}
            title={lang.colab.exhibitors.title}
            rel="next"
            className="group relative flex-1 px-6 py-8 lg:px-12 lg:py-0"
          >
            <div className="relative">
              {/* Direction arrow */}
              <div className="mb-8 flex items-center gap-4">
                <svg
                  className="text-accent h-12 w-12 -rotate-180 transition-transform duration-300 group-hover:-translate-x-3 md:h-16 md:w-16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <div className="bg-accent h-1 flex-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
              </div>

              <h3 className="font-display mb-6 text-xl font-black text-white uppercase md:text-5xl lg:text-6xl">
                {lang.colab.exhibitors.title}
              </h3>

              {/* Station icons */}
              <div className="mb-6 flex flex-wrap gap-3 text-2xl text-white/90 md:text-3xl">
                <StationIcon station="espresso" />
                <StationIcon station="espresso_milk" />
                <StationIcon station="brew" />
                <StationIcon station="lecture" />
                <StationIcon station="workshop" />
              </div>

              <p className="mb-8 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
                {lang.colab.exhibitors.text}
              </p>

              {/* CTA */}
              <span className="font-display group-hover:text-primary inline-block border-2 border-white px-6 py-3 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 group-hover:bg-white">
                {lang.colab.exhibitors.button}
              </span>
            </div>
          </a>

          {/* Right path - Sponsors */}
          <a
            href={`/${params.lang}/sponsors`}
            title={lang.colab.sponsors.title}
            rel="next"
            className="group relative flex-1 bg-black px-6 py-8 lg:px-12 lg:py-0"
          >
            <div className="relative text-right">
              {/* Direction arrow */}
              <div className="mb-8 flex items-center gap-4">
                <div className="bg-accent h-1 flex-1 origin-right transition-transform duration-300 group-hover:scale-x-110" />
                <svg
                  className="text-accent h-12 w-12 transition-transform duration-300 group-hover:translate-x-3 md:h-16 md:w-16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <h3 className="font-display mb-6 text-xl font-black text-white uppercase md:text-5xl lg:text-6xl">
                {lang.colab.sponsors.title}
              </h3>

              {/* Plus icons */}
              <div className="mb-6 flex justify-end gap-3 text-2xl text-white/90 md:text-3xl">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>

              <p className="mb-8 ml-auto max-w-md text-base leading-relaxed text-white/80 md:text-lg">
                {lang.colab.sponsors.text}
              </p>

              {/* CTA */}
              <span className="font-display inline-block border-2 border-white px-6 py-3 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 group-hover:bg-white group-hover:text-black">
                {lang.colab.sponsors.button}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

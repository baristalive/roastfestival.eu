"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import PlusIcon from "@/app/icons/plus";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Bar from "@/app/components/Bar";
import { StationIcon } from "../components/StationIcon";
import ArrowIcon from "@/app/icons/arrow";

export const Colab = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const { contextSafe } = useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(max-width: 768px)", () => {
        gsap.utils.toArray(".card").map((c, idx, arr) => {
          const isLast = idx === arr.length - 1;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: c as Element,
                pin: true,
                start: isLast ? "top top" :"top 50em",
                end: isLast ? "top top" : "bottom top",
                scrub: true
              },
            })
            .to(c as Element, {
              ease: "none",
              ...(isLast ? {} : { display: "none", scale: 0.8, opacity: 0 }),
            });
        });
      });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} id="colab" className="colab-section watermark5">
      <div className="mx-auto grid max-w-[1900px] gap-12 2xl:gap-32 px-8 pb-48 lg:grid-cols-[1fr,2fr] pt-32">
        <div className="md:p-12">
          <h2 className="w-3/4 pb-8 text-3xl 2xl:text-6xl font-bold">
            {lang.colab.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-base leading-normal 2xl:text-xl">
            {lang.colab.description}
          </div>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
        <div className="flex flex-col md:grid grid-cols-2 items-center justify-center gap-8 text-xl">
          <div className="card elevate nav h-full rounded-2xl 2xl:p-12 p-8">
            <a
              href={`/${params.lang}/colab`}
              title={lang.colab.exhibitors.title}
              rel="author"
              className="flex h-full flex-col"
            >
              <h3 className="2xl:pb-12 pb-4 text-xl 2xl:text-3xl font-bold">
                {lang.colab.exhibitors.title}
              </h3>
              <div className="2xl:-ml-4 flex flex-wrap gap-2 py-8 text-xl 2xl:text-3xl ">
                <StationIcon station="espresso" />
                <StationIcon station="espresso_milk" />
                <StationIcon station="brew" />
                <StationIcon station="lecture" />
                <StationIcon station="workshop" />
              </div>
              <p className="py-2 text-base 2xl:text-xl">{lang.colab.exhibitors.text}</p>
              <div className="grow" />
              <div className="text-md mt-8 text-[var(--black)]">
                <div className="float-right">
                  <ArrowIcon />
                </div>
              </div>
            </a>
          </div>
          <div className="card elevate nav h-full rounded-2xl 2xl:p-12 p-8">
            <a
              href={`/${params.lang}/sponsors`}
              title={lang.colab.sponsors.title}
              rel="author"
              className="flex h-full flex-col justify-between"
            >
              <h3 className="2xl:pb-12 pb-4 text-xl 2xl:text-3xl font-bold">
                {lang.colab.sponsors.title}
              </h3>
              <div className="flex gap-2 py-8 text-xl 2xl:text-3xl">
                <PlusIcon />
              </div>
              <p className="py-2 text-base 2xl:text-xl">{lang.colab.sponsors.text}</p>
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

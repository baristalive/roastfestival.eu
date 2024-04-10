"use client";
import { useParams } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { dictionaries, SupportedLanguages } from "../../dictionaries/all";
import Bar from "../components/Bar";

export const PreviousYears = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // gsap.set(".cards > div", { y: "+=40rem" });
        gsap.utils.toArray(".cards > div").map((c, idx) => {
          gsap.set(c as Element, { y: `+=${30 + idx * 5}rem` });
          gsap.to(c as Element, {
            y: `-=${30 + idx * 10}rem`,
            scrollTrigger: {
              trigger: ref.current,
              scrub: 2,
              start: "top bottom",
              end: "bottom top",
            },
          });
        });
      });
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      id="info"
      className="previous-year-section watermark4  flex  flex-col items-center justify-between"
    >
      <div className="grid max-w-[1900px] items-center gap-32 p-8 lg:grid-cols-[2fr,1fr,2fr]">
        <div className="md:p-12">
          <h2 className="w-3/4 pb-8 pt-24 text-6xl font-bold md:pt-56 lg:pt-20">
            {lang.lastYear.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-lg leading-normal lg:text-xl">
            {lang.lastYear.description}
          </div>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="elevate flex h-[250px] w-[250px] flex-col items-center justify-center rounded-full bg-[var(--black)] p-10 leading-none text-white">
            <div className=" text-6xl font-bold">
              {lang.lastYear.center.stat}
            </div>
            <div className="text-2xl font-normal">
              {lang.lastYear.center.description}
            </div>
          </div>
        </div>
        <div className="cards flex flex-wrap gap-8">
          {lang.lastYear.side.map((i) => (
            <div
              key={i.description}
              className="elevate flex flex-col items-center justify-center rounded-full bg-white p-10 text-6xl font-bold leading-none"
              style={i.style}
            >
              <div className="text-6xl font-bold">{i.stat}</div>
              <div className="text-2xl font-normal">{i.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

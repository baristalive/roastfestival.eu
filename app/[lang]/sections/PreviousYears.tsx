"use client";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import Bar from "@/app/components/Bar";

export const PreviousYears = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray(".cards g").map((c, idx) => {
          gsap.set(c as Element, { y: `+=${4 + idx * .5}rem` });
          gsap.to(c as Element, {
            y: `-=${4 + idx}rem`,
            scrollTrigger: {
              trigger: ref.current,
              scrub: 2,
              start: "top bottom",
              end: "bottom top",
            },
          });
        });
      });
      mm.add("(max-width: 1024px)", () => {
        gsap.utils.toArray(".cards g").map((c, idx) => {
          gsap.set(c as Element, { y: `+=${(idx + 1) * .2}rem` });
          gsap.to(c as Element, {
            y: `-=${(idx + 1) * .5}rem`,
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
      className="previous-year-section watermark4 relative flex flex-col items-center justify-between z-0"
    >
      <div>
      <div className="absolute inset-4 items-center justify-center flex z-10">
        <div className="flex h-full flex-col items-center justify-end lg:justify-center gap-8">
          <div className="elevate flex h-[250px] w-[250px] flex-col items-center justify-center rounded-full bg-[var(--black)] p-10 leading-none text-white">
            <div className=" text-6xl font-bold">
              {lang.lastYear.center.stat}
            </div>
            <div className="text-2xl font-normal">
              {lang.lastYear.center.description}
            </div>
          </div>
        </div>
      </div>
      <div className="grid max-w-[1900px] items-center p-8 pb-24 lg:grid-cols-2 gap-4 z-0">
        <div className="md:p-12 lg:pr-64 z-0">
          <h2 className="w-3/4 pb-8 pt-24 text-2xl lg:text-6xl font-bold md:pt-56 lg:pt-20">
            {lang.lastYear.title}
          </h2>
          <div className="mx-auto max-w-screen-lg space-y-10 text-sm leading-normal lg:text-xl">
            {lang.lastYear.description}
          </div>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
        <div className="cards relative h-full w-full gap-8 z-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="elevate overflow-visible"
          >
            <style>
              {`.large {font-weight: bold;font-size: 0.5rem;fill: currentColor;} .small {font-size: 0.2rem;fill: currentColor;}`}
            </style>

            {lang.lastYear.side.map((i) => (
              <React.Fragment key={i.description}>
                <g>
                  <circle
                    cx={i.props.x}
                    cy={i.props.y}
                    r={i.props.r}
                    fill="white"
                  />
                  <text
                    className="large"
                    x={i.props.x}
                    y={i.props.y}
                    textAnchor="middle"
                    alignmentBaseline="baseline"
                  >
                    {i.stat}
                  </text>
                  <text
                    className="small"
                    x={i.props.x}
                    y={i.props.y + 2}
                    textAnchor="middle"
                    alignmentBaseline="hanging"
                  >
                    {i.description}
                  </text>
                </g>
              </React.Fragment>
            ))}
          </svg>
        </div>
      </div>
      </div>
    </section>
  );
};

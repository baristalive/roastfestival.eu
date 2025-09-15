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

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray(".cards g").map((c, idx) => {
          gsap.set(c as Element, { y: `+=${4 + idx * 0.5}rem` });
          gsap.to(c as Element, {
            scrollTrigger: {
              end: "bottom top",
              scrub: 2,
              start: "top bottom",
              trigger: ref.current,
            },
            y: `-=${4 + idx}rem`,
          });
        });
      });
      mm.add("(max-width: 1024px)", () => {
        gsap.utils.toArray(".cards g").map((c, idx) => {
          gsap.set(c as Element, { y: `+=${(idx + 1) * 0.2}rem` });
          gsap.to(c as Element, {
            scrollTrigger: {
              end: "bottom top",
              scrub: 2,
              start: "top bottom",
              trigger: ref.current,
            },
            y: `-=${(idx + 1) * 0.5}rem`,
          });
        });
      });
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      id="prev-year"
      className="previous-year-section watermark4 relative z-0 flex flex-col items-center justify-between"
    >
      <div>
        <div className="absolute inset-8 z-10 flex items-center justify-center py-12">
          <div className="flex h-full flex-col items-center justify-end gap-8 lg:justify-center">
            <div className="elevate flex h-[250px] w-[250px] flex-col items-center justify-center rounded-full bg-[var(--accent)] p-10 leading-none text-white">
              <div className="text-6xl font-bold">
                {lang.lastYear.center.stat}
              </div>
              <div className="text-2xl font-normal">
                {lang.lastYear.center.description}
              </div>
            </div>
          </div>
        </div>
        <div className="z-0 grid max-w-[1900px] items-center gap-4 p-8 pb-48 lg:grid-cols-2 lg:pb-24">
          <div className="z-0 md:p-12 lg:pr-64">
            <h2 className="w-3/4 pb-8 pt-24 text-3xl font-bold md:pt-0 2xl:pt-20 2xl:text-6xl">
              {lang.lastYear.title}
            </h2>
            <div className="mx-auto max-w-screen-lg space-y-10 pb-24 text-base leading-normal lg:pb-0 2xl:text-xl">
              {lang.lastYear.description}
            </div>
            <Bar />
          </div>
          <div className="cards relative z-10 mx-auto h-full w-full gap-8 text-base sm:w-1/2 md:text-xs lg:w-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="elevate overflow-visible"
            >
              <style>
                {`.large {font-weight: bold;font-size: .6em;fill: currentColor;} .small {font-size: 0.25em;fill: currentColor;}`}
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

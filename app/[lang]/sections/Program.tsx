"use client";
import { useParams } from "next/navigation";
import {
  dictionaries,
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import React, { MouseEvent, useRef, useState } from "react";
import { StationIcon } from "../components/StationIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/all";
import DaySchedule from "../components/DaySchedule";
import ArrowIcon from "@/app/icons/arrow";
import PlusIcon from "@/app/icons/plus";

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <section
      className={`program-section py-8 lg:pb-48 ${lang.program.some((day) => day.schedule.length > 0) ? "h-fit" : ""}`}
      id="program"
    >
      <div className="mx-auto grid max-w-[1900px] gap-12 px-8 pb-12 lg:grid-cols-3 2xl:gap-32">
        <div />
          <div className="card elevate nav md:h-full rounded-2xl p-8 2xl:p-12">
            <a
              href={`/${params.lang}/program`}
              title={lang.colab.sponsors.title}
              rel="next"
              className="flex h-full flex-col justify-between"
            >
              <h3 className="pb-4 text-xl font-bold 2xl:pb-12 2xl:text-3xl">
                {lang.programTile.title}
              </h3>
              <div className="flex gap-2 py-2 md:py-8 text-xl 2xl:text-3xl">
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
              <div className="grow" />
              <div className="text-md mt-2 md:mt-8 text-[var(--black)]">
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

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

export const Program = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const [tab, setTab] = useState(0);

  const changeTabTo =
    (idx: number) =>
    (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
      setTab(idx);
    };
  useGSAP(
    () => {
      gsap.registerPlugin(Flip);
      const selector = gsap.utils.selector(ref);
      const activeBubble = selector<HTMLDivElement>("div.active");
      const activeNav = selector<HTMLAnchorElement>("a.active");
      const state = Flip.getState(".pills");

      if (activeBubble.length !== activeNav.length) {
        console.warn(
          "Something isn't right, program nav do not match in count",
          activeBubble,
          activeNav,
        );
      }
      for (let i = 0; i < activeNav.length; i++) {
        activeNav[i].appendChild(activeBubble[i]);
      }

      Flip.from(state, { duration: 2, ease: "power1.inOut", scale: true });
    },
    { scope: ref, dependencies: [tab] },
  );

  const dayToggle = (
    <ul className="elevate card pills flex rounded-e-full rounded-s-full text-center font-medium">
      {lang.program.map((day, idx) => (
        <li className="relative z-0 w-full p-2" key={day.$ref}>
          {idx === 0 && <div className="active absolute inset-2 z-0" />}
          <a
            href={`#program_day_${idx + 1}`}
            className={`z-10 flex w-full cursor-pointer flex-col whitespace-nowrap px-8 py-2 2xl:px-16 2xl:py-4 ${idx === tab ? "active" : ""} ${idx === 0 ? "rounded-s-full" : ""} ${idx === lang.program.length - 1 ? "rounded-e-full" : ""}`}
            onClick={changeTabTo(idx)}
          >
            <h3 className="z-10 text-xl font-bold 2xl:text-3xl">
              {lang.programDays[day.$ref as keyof typeof lang.programDays].name}
            </h3>
            <span className="z-10 text-base 2xl:text-xl">
              {lang.programDays[day.$ref as keyof typeof lang.programDays].date}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      ref={ref}
      className={`program-section pb-8 lg:pb-48 ${lang.program.some((day) => day.schedule.length > 0) ? "h-fit" : ""}`}
      id="program"
    >
      {lang.program.map((day, idx) => (
        <div key={day.$ref} id={`program_day_${idx + 1}`} />
      ))}
      <div className="mx-auto flex max-w-[1900px] flex-col pb-4 pt-12">
        <div className="flex grid-cols-[1fr,auto,1fr] flex-col items-center lg:grid">
          <h2 className="p-4 text-3xl font-bold lg:pl-20 2xl:text-6xl">
            {lang.programTitle}
          </h2>
          <div className="p-4 lg:hidden xl:block">{dayToggle}</div>
        </div>
        <div className="mx-2 grow grid-cols-2 gap-6 lg:grid xl:block">
          <>
            {lang.program.every((day) => day.schedule.length === 0) && (
              <div className="mx-auto flex h-full w-full items-center justify-center gap-4 p-12 py-48">
                <div className="flex flex-col gap-4 md:flex-row">
                  <StationIcon station="espresso" />
                  <StationIcon station="espresso_milk" />
                </div>
                <div className="flex flex-col">
                  <div className="text-center align-middle text-xl 2xl:text-3xl">
                    {lang.programLoadingText}
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <StationIcon station="brew" />
                  <StationIcon station="lecture" />
                </div>
              </div>
            )}
            {lang.program.map((day, idx) => (
              <DaySchedule
                schedule={day.schedule}
                dayRef={day.$ref as keyof typeof lang.programDays}
                className={idx !== tab ? "hidden lg:flex xl:hidden" : ""}
                key={day.$ref}
              />
            ))}
          </>
        </div>
        {lang.program.every((day) => day.schedule.length === 0) || (
          <div className="mx-auto my-4 lg:hidden">{dayToggle}</div>
        )}
      </div>
    </section>
  );
};

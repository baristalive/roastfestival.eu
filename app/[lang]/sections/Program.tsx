"use client";
import { useParams } from "next/navigation";
import {
  dictionaries,
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import React, { MouseEvent, useRef, useState, CSSProperties } from "react";
import { Modal } from "../components/Modal";
import { StationIcon } from "../components/StationIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/all";

const MINUTE_STRINGS = Array.from(Array(6), (_, idxm) =>
  String(idxm).padEnd(2, "0"),
);
export const GRID_STOPS =
  "[station] 80px [h950] 1fr " +
  Array.from(Array(8), (_, idx) =>
    MINUTE_STRINGS.map((m) => `[h${idx + 10}${m}] 1fr`),
  )
    .flat()
    .join(" ") +
  " [h1800] 1fr [h1810]";
export const HOURS = Array.from(Array(9), (_, idx) => ({
  title: idx + 10 + ":00",
  start: `h${idx + 9}50`,
  end: `h${idx + 10}10`,
  center: `h${idx + 10}00`,
}));

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
              <React.Fragment key={day.$ref}>
                {day.schedule.length > 0 && (
                  <div
                    className={`schedule flex flex-col items-center justify-start gap-2 will-change-auto ${idx !== tab ? "hidden lg:flex xl:hidden" : ""}`}
                  >
                    <div className="hidden text-center lg:block xl:hidden">
                      <h3 className="z-10 text-xl font-bold 2xl:text-3xl">
                        {
                          lang.programDays[
                            day.$ref as keyof typeof lang.programDays
                          ].name
                        }
                      </h3>
                      <span className="z-10 text-base 2xl:text-xl">
                        {
                          lang.programDays[
                            day.$ref as keyof typeof lang.programDays
                          ].date
                        }
                      </span>
                    </div>
                    <div className="card elevate relative flex w-full flex-col justify-between rounded-2xl py-4">
                      <div
                        className="hidden p-4 pt-10 text-center xl:grid"
                        style={{
                          gridTemplateColumns: GRID_STOPS,
                        }}
                      >
                        {HOURS.map((h) => (
                          <div
                            style={{
                              gridColumnStart: h.start,
                              gridColumnEnd: h.end,
                            }}
                            key={h.title}
                          >
                            {h.title}
                          </div>
                        ))}
                      </div>
                      <div
                        className="absolute inset-0 z-0 hidden p-4 mt-10 xl:grid"
                        style={{
                          gridTemplateColumns: GRID_STOPS,
                        }}
                      >
                        {HOURS.map((h, idx) => (
                          <div
                            className="border-r-2 border-dotted border-gray-200"
                            style={{
                              gridColumnStart: h.start,
                              gridColumnEnd: h.center,
                            }}
                            key={h.title}
                          ></div>
                        ))}
                      </div>
                      {day.schedule.map((t) => (
                        <div
                          key={t.track}
                          className={`program-track relative mx-4 xl:grid rounded-2xl py-4 text-xl`}
                          style={{
                            gridTemplateColumns: GRID_STOPS,
                          }}
                        >
                          <div className="col-span-full row-start-1 flex flex-col items-center justify-center p-2 text-center xl:col-start-[station] xl:col-end-[h1000] xl:row-end-5">
                            <StationIcon station={t.track} />
                            <h3>
                              {
                                lang.programCategory[
                                  t.track as keyof typeof lang.programCategory
                                ]
                              }
                            </h3>
                          </div>
                          {t.schedule.flat().map((s, idx) => {
                            const presenter = lang.presenters[
                              s.$ref as keyof typeof lang.presenters
                            ] as Presenter;
                            return (
                              <div
                                className="program-slot-wrapper mx-2 xl:mx-0.5"
                                key={`${lang.program[tab].$ref}_${presenter?.name}_${idx}`}
                                style={
                                  {
                                    gridColumnStart: `h${s.start.replace(":", "")}`,
                                    gridColumnEnd: `h${s.end.replace(":", "")}`,
                                  }
                                }
                              >
                                {presenter === undefined ||
                                !presenter.name ? null : (
                                  <>
                                    <Modal {...presenter}>
                                      <div className="program-slot elevate my-1 overflow-hidden rounded-lg px-3 py-1 text-center md:py-2 xl:text-left">
                                        <div className="col-span-full text-base xl:hidden">
                                          {s.start} - {s.end}
                                        </div>
                                        <h4 className="text-lg font-bold">
                                          {presenter.name}
                                        </h4>
                                        {presenter.subheading && (
                                          <i className="text-base">
                                            {presenter.subheading}
                                          </i>
                                        )}
                                      </div>
                                    </Modal>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                      <div className="mx-auto">{lang.programDisclaimer}</div>
                    </div>
                  </div>
                )}
              </React.Fragment>
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

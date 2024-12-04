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
import { getTimeString } from "@/app/utils/time";

export const HOURS = [...Array(11)].map((_, idx) => idx + 10);

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
      activeNav[0].appendChild(activeBubble[0]);
      activeNav[1].appendChild(activeBubble[1]);

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
      className={`colab-section pb-8 ${lang.program.some((day) => day.schedule.length > 0) ? "h-fit" : ""}`}
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
              <div className="mx-auto flex  h-full w-full items-center justify-center gap-4 p-12 py-48">
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
                      <div className="hidden grid-cols-[repeat(24,_minmax(0,_1fr))] p-4 pt-10 text-center xl:grid">
                        <div className="col-span-2"></div>
                        {HOURS.map((h) => (
                          <div className="col-span-2" key={h}>
                            {h}:00
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 z-0 hidden grid-cols-[repeat(24,_minmax(0,_1fr))] divide-x-2 divide-dotted divide-gray-200 p-4 pt-20 xl:grid">
                        <div className="col-span-3"></div>
                        {HOURS.map((h, idx) => (
                          <div
                            className={
                              idx !== HOURS.length - 1 ? "col-span-2" : ""
                            }
                            key={h}
                          ></div>
                        ))}
                      </div>
                      {day.schedule.map((t) => (
                        <div
                          key={t.track}
                          className="program-track relative mx-4 grid grid-cols-[repeat(24,_minmax(0,_1fr))] rounded-2xl py-4 text-xl"
                        >
                          <div
                            className="col-span-full row-start-1 flex flex-col items-center justify-center p-2 text-center xl:col-span-3"
                            style={{ gridRowEnd: t.schedule.length + 1 }}
                          >
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
                                    "--gridColumnStart": `${(s.start - 10) * 2 + 4}`,
                                    "--gridColumnEnd": `${(s.end - 10) * 2 + 4}`,
                                  } as CSSProperties
                                }
                              >
                                {presenter === undefined ||
                                !presenter.name ? null : (
                                  <>
                                    <Modal {...presenter}>
                                      <div className="program-slot elevate my-1 overflow-hidden rounded-lg px-3 py-1  text-center md:py-2 xl:text-left">
                                        <div className="col-span-full text-base xl:hidden">
                                          {getTimeString(s.start)} -{" "}
                                          {getTimeString(s.end)}
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
        { lang.program.every((day) => day.schedule.length === 0) || <div className="mx-auto my-4 lg:hidden">{dayToggle}</div> }
      </div>
    </section>
  );
};

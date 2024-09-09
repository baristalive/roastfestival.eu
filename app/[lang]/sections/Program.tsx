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

const hours = [...Array(11)].map((_, idx) => idx + 10);

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
          </a>
        </li>
      ))}
    </ul>
    )

  return (
    <section
      ref={ref}
      className={`program-section pb-8 ${lang.program.some((day) => day.schedule.length > 0) ? "h-fit" : ""}`}
      id="program"
    >
      {lang.program.map((day, idx) => (
        <div key={day.$ref} id={`program_day_${idx + 1}`} />
      ))}
      <div className="mx-auto flex max-w-[1900px] flex-col pt-12">
        <div className="flex grid-cols-[1fr,auto,1fr] flex-col items-center lg:grid">
          <h2 className="p-4 pl-8 text-3xl font-bold md:pl-20 2xl:text-6xl">
            Program
          </h2>
          <div className="p-4 lg:hidden xl:block">
            {dayToggle}
          </div>
        </div>
        <div className="grow lg:grid grid-cols-2 xl:block">
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
                    className={`schedule flex justify-start items-center flex-col will-change-auto ${idx !== tab ? "hidden lg:block xl:hidden" : ""}`}
                  >
                    <div className="hidden lg:block xl:hidden text-center">
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
                    </span></div>
                    <div className="card elevate relative m-3 flex flex-col justify-between rounded-2xl py-4">
                      <div className="hidden xl:grid grid-cols-[repeat(24,_minmax(0,_1fr))] p-4 pt-10 text-center">
                        <div className="col-span-2"></div>
                        {hours.map((h) => (
                          <div className="col-span-2" key={h}>
                            {h}:00
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 z-0 hidden xl:grid grid-cols-[repeat(24,_minmax(0,_1fr))] divide-x-2 divide-dotted divide-gray-200 p-4 pt-20">
                        <div className="col-span-3"></div>
                        {hours.map((h, idx) => (
                          <div
                            className={
                              idx !== hours.length - 1 ? "col-span-2" : ""
                            }
                            key={h}
                          ></div>
                        ))}
                      </div>
                      {day.schedule.map(t => (
                        <div
                          key={t.track}
                          className="program-track relative mx-4 grid grid-cols-[repeat(24,_minmax(0,_1fr))] rounded-2xl py-4 text-xl"
                        >
                          <div
                            className="col-span-full xl:col-span-3 row-start-1 flex flex-col items-center justify-center p-2 text-center"
                            style={{ gridRowEnd: t.rows + 1 }}
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
                          {t.schedule.map((s, idx) => {
                            const presenter = lang.presenters[
                              s.$ref as keyof typeof lang.presenters
                            ] as Presenter;
                            return (
                              <div
                                className="mx-2 xl:mx-0.5 program-slot-wrapper"
                                key={`${lang.program[tab].$ref}_${presenter?.name}_${idx}`}
                                style={{
                                  "--gridColumnStart": `${(s.start - 10) * 2 + 4}`,
                                  "--gridColumnEnd": `${(s.end - 10) * 2 + 4}`,
                                } as CSSProperties}
                              >
                                {(presenter === undefined || !presenter.name ) ? (
                                  null
                                ) : (
                                  <>
                                    <Modal {...presenter}>
                                      <div className="program-slot elevate my-1 overflow-hidden rounded-lg px-3 py-1  md:py-2 xl:text-left text-center">
                                        <div className="col-span-full xl:hidden text-base">
                                          {getTimeString(s.start)} - {getTimeString(s.end)}
                                        </div>
                                        <h4 className="font-bold text-lg">{presenter.name}</h4>
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
        <div className="lg:hidden mx-auto mb-4">{dayToggle}</div>
      </div>
    </section>
  );
};

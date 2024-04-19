"use client";
import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import React, { MouseEvent, useRef, useState } from "react";
import { Modal, ProgramItem } from "../components/Modal";
import { StationIcon } from "../components/StationIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/all";

const hours = [...Array(8)].map((_, idx) => `1${idx + 1}`);

type DaySchedule =
  | {
      track: string;
      rows: number;
      schedule: {
        start: number;
        end: number;
        title: string;
      }[];
    }
  | {
      track: string;
      rows: number;
      schedule: {
        start: number;
        end: number;
        title: string;
        speakers: string[];
        description: string;
      }[];
    };

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

      Flip.from(state, { duration: 2, ease: "power1.inOut", scale: true });
    },
    { scope: ref, dependencies: [tab] },
  );

  return (
    <section
      ref={ref}
      className={`program-section mb-20 ${lang.program.some((day) => day.schedule.length > 0) ? "h-screen" : ""}`}
      id="program"
    >
      {lang.program.map((day, idx) => (
        <div key={day.title} id={`program_day_${idx + 1}`} />
      ))}
      <div className="mx-auto flex h-full max-w-[1900px] flex-col pt-12">
        <div className="grid grid-cols-[1fr,auto,1fr] items-center">
          <h2 className="p-4 pl-8 text-6xl font-bold md:pl-20">Program</h2>
          <div className="p-4">
            <ul className="elevate card pills flex rounded-e-full rounded-s-full text-center font-medium">
              {lang.program.map((day, idx) => (
                <li className="relative z-0 w-full p-2" key={day.title}>
                  {idx === 0 && <div className="active absolute inset-2 z-0" />}
                  <a
                    href={`#program_day_${idx + 1}`}
                    className={`z-10 flex w-full cursor-pointer flex-col whitespace-nowrap p-4 px-16 ${idx === tab ? "active" : ""} ${idx === 0 ? "rounded-s-full" : ""} ${idx === lang.program.length - 1 ? "rounded-e-full" : ""}`}
                    onClick={changeTabTo(idx)}
                  >
                    <h3 className="z-10 text-3xl font-bold">{day.title}</h3>
                    <span className="z-10 text-xl">{day.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative grow">
          <>
            {lang.program.every((day) => day.schedule.length === 0) && (
              <div className="mx-auto flex  h-full w-full items-end justify-center  p-12 py-48">
                <div className="p-4 align-middle text-3xl dots" />
                <StationIcon station="espresso" />
                <StationIcon station="espresso_milk" />
                <div className="p-4 align-middle text-3xl">
                  {lang.programLoadingText}
                </div>
                <StationIcon station="brew" />
                <StationIcon station="lecture" />
                <div className="p-4 align-middle text-3xl dots"/>
              </div>
            )}
            {lang.program.map((day, idx) => (
              <React.Fragment key={day.title}>
                {day.schedule.length > 0 && (
                  <div
                    className={`schedule absolute inset-0 top-4 flex flex-col ${idx !== tab ? "opacity-0" : ""}`}
                  >
                    <div className="card elevate relative z-10 m-3 flex flex-col justify-between rounded-2xl pb-4">
                      <div className="grid grid-cols-[repeat(20,_minmax(0,_1fr))] p-4 pt-10 text-center">
                        <div className="col-span-2 col-start-3">10:00</div>
                        {hours.map((h) => (
                          <div className="col-span-2" key={h}>
                            {h}:00
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 z-0 grid grid-cols-[repeat(20,_minmax(0,_1fr))] divide-x-2 divide-dotted divide-gray-200 p-4 pt-20">
                        <div className="col-span-2 col-start-2"></div>
                        {hours.map((h) => (
                          <div className="col-span-2" key={h}></div>
                        ))}
                        <div />
                      </div>
                      {day.schedule.map((t: DaySchedule) => (
                        <div
                          key={t.track}
                          className="program-track relative mx-4 grid grid-cols-[repeat(20,_minmax(0,_1fr))] gap-x-2 rounded-2xl py-4 text-xl"
                        >
                          <div
                            className="col-span-3 row-start-1 flex flex-col items-center justify-center p-2 text-center"
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
                          {t.schedule.map((s, idx) => (
                            <div
                              key={`${lang.program[tab].title}_${s.title}_${idx}`}
                              style={{
                                gridColumnStart: `${(s.start - 10) * 2 + 4}`,
                                gridColumnEnd: `${(s.end - 10) * 2 + 4}`,
                              }}
                            >
                              <Modal
                                title={s.title}
                                description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, facilis quasi repellendus optio possimus non veritatis tenetur illo voluptate quis?"
                                speakers={
                                  "speakers" in s ? s.speakers : undefined
                                }
                                schedule={lang.program.reduce((accP, day) => {
                                  const fromDay = (
                                    day.schedule as DaySchedule[]
                                  ).reduce((accD, track) => {
                                    const fromTrack = track.schedule.reduce(
                                      (accT, item) => {
                                        if (item.title === s.title) {
                                          accT.push({
                                            start: item.start,
                                            end: item.end,
                                            track:
                                              track.track as keyof typeof lang.programCategory,
                                            day: day.title,
                                          });
                                        }
                                        return accT;
                                      },
                                      [] as ProgramItem[],
                                    );
                                    return [...accD, ...fromTrack];
                                  }, [] as ProgramItem[]);
                                  return [...accP, ...fromDay];
                                }, [] as ProgramItem[])}
                              >
                                <div className="program-slot elevate my-1 overflow-hidden rounded-lg px-3 py-1 text-left text-lg font-bold md:py-2">
                                  {s.title}
                                </div>
                              </Modal>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        </div>
      </div>
    </section>
  );
};

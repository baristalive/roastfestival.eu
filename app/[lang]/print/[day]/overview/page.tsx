"use client";
import { use } from 'react';

import { StationIcon } from "@/app/[lang]/components/StationIcon";
import { HOURS } from "@/app/[lang]/sections/Program";
import dictionaries, {
  DayIdsType,
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import { CSSProperties } from "react";
import "./print.css";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
type SchedulePropsType = {
  params: Promise<{ lang: SupportedLanguages; day: DayIdsType }>;
};

const Schedule = (props: SchedulePropsType) => {
  const params = use(props.params);

  const lang = dictionaries[params.lang as SupportedLanguages];

  const day = lang.program.filter((d) => d.$ref === params.day)[0];

  if (day?.schedule === undefined || day.schedule.length <= 0) {
    return null;
  }

  return (
    <div className="flex h-full flex-col  justify-between px-2 pt-2">
      <Header category="overview"/>
      <div className="watermark2 flex h-full grow flex-col items-center justify-start gap-4 pt-12">
        <div className="relative flex w-full flex-col justify-between pt-4">
          <div className="grid grid-cols-[repeat(22,_minmax(0,_1fr))_1.5rem] pb-4 text-center">
            <div className="col-span-"></div>
            {HOURS.slice(0, -1).map((h) => (
              <div className="col-span-2" key={h}>
                {h}:00
              </div>
            ))}
            <div className="col-span-2 text-right">
              {HOURS[HOURS.length - 1]}:00
            </div>
          </div>
          <div className="absolute inset-0 z-0 grid grid-cols-[repeat(22,_minmax(0,_1fr))_1.5rem] divide-x-2 divide-dotted divide-gray-200 pt-12">
            <div className="col-span-2"></div>
            {HOURS.map((h, idx) => (
              <div
                className={idx !== HOURS.length - 1 ? "col-span-2" : ""}
                key={h}
              ></div>
            ))}
          </div>
          {day.schedule.map((t) => (
            <div
              key={t.track}
              className="program-track relative grid grid-cols-[repeat(22,_minmax(0,_1fr))_1.5rem] text-xl"
            >
              <div
                className="col-span-2 row-start-1 flex flex-col items-center justify-center px-2 text-center"
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
                    className="program-slot-wrapper mx-0.5"
                    key={`${presenter?.name}_${idx}`}
                    style={
                      {
                        "--gridColumnStart": `${(s.start - 10) * 2 + 3}`,
                        "--gridColumnEnd": `${(s.end - 10) * 2 + 3}`,
                      } as CSSProperties
                    }
                  >
                    <div
                      className={`program-slot my-1 overflow-hidden rounded-lg px-3 py-1 text-left ${s.noEnd ? "no-end" : ""}`}
                    >
                      <h4 className="text-xl font-bold">{presenter.name}</h4>
                      {presenter.subheading && (
                        <i className="text-lg">{presenter.subheading}</i>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;

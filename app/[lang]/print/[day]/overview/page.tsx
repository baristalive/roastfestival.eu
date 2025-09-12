"use client";
import { use } from "react";

import { StationIcon } from "@/app/[lang]/components/StationIcon";
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
import { GRID_STOPS, HOURS } from "@/app/[lang]/sections/Program";
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
    <div className="flex h-full flex-col justify-between px-2 pt-2">
      <Header category="overview" />
      <div className="watermark2 flex h-full grow flex-col items-center justify-start gap-4 pt-12">
        <div className="relative flex w-full flex-col justify-between pt-4">
          <div
            className="grid pb-4 text-center"
            style={{
              gridTemplateColumns: GRID_STOPS,
            }}
          >
            <div className="col-span-"></div>
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
            className="absolute inset-0 z-0 grid pt-12"
            style={{
              gridTemplateColumns: GRID_STOPS,
            }}
          >
            <div className="col-span-2"></div>
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
              className="program-track relative grid text-xl"
              style={{
                gridTemplateColumns: GRID_STOPS,
              }}
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
                return presenter === undefined || !presenter.name ? null : (
                  <div
                    className="program-slot-wrapper mx-0.5"
                    key={`${presenter?.name}_${idx}`}
                    style={{
                      gridColumnStart: `h${s.start.replace(":", "")}`,
                      gridColumnEnd: `h${s.end.replace(":", "")}`,
                    }}
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

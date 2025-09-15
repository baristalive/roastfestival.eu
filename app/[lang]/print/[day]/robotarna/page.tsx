"use client";
import { use } from "react";

import { StationIcon } from "@/app/[lang]/components/StationIcon";
import dictionaries, {
  Day,
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import "./print.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import BeanCounter from "./BeanCounter";
type SchedulePropsType = {
  params: Promise<{ lang: SupportedLanguages; day: Day }>;
};

const Schedule = (props: SchedulePropsType) => {
  const params = use(props.params);

  const lang = dictionaries[params.lang as SupportedLanguages];

  const day = lang.program.filter((d) => d.$ref === params.day)[0];

  const schedule = day.schedule
    .filter((s) => ["brew", "espresso"].includes(s.track))
    .flatMap((s) =>
      s.schedule.map((t, idx) => ({
        track: s.track,
        idx,
        schedule: t,
      })),
    );

  const special = day.schedule
    .filter((s) => ["espresso_milk"].includes(s.track))
    .flatMap((s) => ({ track: s.track, schedule: s.schedule.flat() }))[0];

  if (day?.schedule === undefined || day.schedule.length <= 0 || special === undefined) {
    return null;
  }

  return (
    <div className="flex h-full flex-col  justify-between px-2 pt-2">
      <Header category="robotarna"/>
      <div className="watermark2 item-center flex h-full flex-col justify-center gap-4 pt-12 text-center">
        <div className="mx-auto text-4xl">
          <StationIcon station={special.track} />
        </div>
        <h3 className="text-2xl">
          {
            lang.programCategory[
              special.track as keyof typeof lang.programCategory
            ]
          }
        </h3>
        <div className="program-track flex flex-col">
          {special.schedule.map((s, idx) => {
            const presenter = lang.presenters[
              s.$ref as keyof typeof lang.presenters
            ] as Presenter;
            return (
              <div
                className="program-slot-wrapper px-2"
                key={`${presenter?.name}_${idx}`}
              >
                <div
                  className={`program-slot my-1 overflow-hidden rounded-lg py-2 text-center ${s.noEnd ? "no-end" : ""}`}
                >
                  <div className="col-span-full text-lg">
                    {s.start} - {s.end}
                  </div>
                  <h4 className="text-2xl font-bold">{presenter.name}</h4>
                  {presenter.subheading && (
                    <i className="text-lg">{presenter.subheading}</i>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full flex-col justify-between pt-12">
          <div
            className="grid pb-4 text-center"
            style={{
              gridTemplateColumns: `repeat(${schedule.length}, minmax(0, 1fr))`,
            }}
          >
            {schedule.map((t) => (
              <div
                key={t.track}
                className="program-track flex flex-col gap-2 px-2 text-xl"
              >
                <div className="flex flex-col items-center justify-center gap-4 px-2 text-center">
                  <div className="flex justify-center gap-3">
                    <div className="text-4xl">
                      <StationIcon station={t.track} />
                    </div>
                    <BeanCounter id={t.idx + 1} />
                  </div>
                  <h3 className="text-2xl">
                    {
                      lang.programCategory[
                        t.track as keyof typeof lang.programCategory
                      ]
                    }{" "}
                    #{t.idx + 1}
                  </h3>
                </div>
                {t.schedule.map((s, idx) => {
                  const presenter = lang.presenters[
                    s.$ref as keyof typeof lang.presenters
                  ] as Presenter;
                  return (
                    <div
                      className="program-slot-wrapper"
                      key={`${presenter?.name}_${idx}`}
                    >
                      <div
                        className={`program-slot my-1 overflow-hidden rounded-lg px-3 py-2 text-center ${s.noEnd ? "no-end" : ""}`}
                      >
                        <div className="col-span-full text-lg">
                          {s.start} - {s.end}
                        </div>
                        <h4 className="text-2xl font-bold">{presenter.name}</h4>
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
        <div className="grow" />
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;

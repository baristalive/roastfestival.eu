"use client";
import { use } from 'react';

import dictionaries, {
  Day,
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import "./print.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ExportedImage from "next-image-export-optimizer";
import { getRoomCategory, RoomCategory } from "./utils";

type SchedulePropsType = {
  params: Promise<{ lang: SupportedLanguages; day: Day; room: RoomCategory }>;
};

const Schedule = (props : SchedulePropsType) => {
  const params = use(props.params);

  const lang = dictionaries[params.lang as SupportedLanguages];

  const day = lang.program.filter((d) => d.$ref === params.day)[0];

  const room = getRoomCategory(params.room);

  if (room === undefined) {
    return null;
  }

  const schedule = day.schedule
    .filter((s) =>
      [room].includes(s.track as keyof typeof dictionaries.en.programCategory),
    )
    .flatMap((s) => s.schedule)[0];

  if (day?.schedule === undefined || day.schedule.length <= 0 || schedule === undefined) {
    return null;
  }

  return (
    <div className="flex h-full flex-col justify-between gap-8 px-2 pt-2">
      <Header category={room} />
      <div className="watermark2 flex h-full flex-col items-stretch justify-stretch pb-10">
        {schedule.map((s) => {
          const presenter = lang.presenters[
            s.$ref as keyof typeof lang.presenters
          ] as Presenter;
          return (
            <div className="row flex gap-10 h-full" key={s.$ref}>
              <div className="logo p-4">
                <div
                  className={`flex h-[240px] w-[240px] items-center justify-center overflow-hidden rounded-full bg-white ${presenter.modalProps?.className !== undefined ? presenter.modalProps?.className : "p-4"}`}
                >
                  <ExportedImage
                    src={`/images/promoted/${presenter.logo}`}
                    alt={presenter.name}
                    width={240}
                    height={240}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 py-2 pr-16 pb-16">
                <div className="text-2xl font-bold">
                  {s.start} - {s.end}
                </div>
                <div className="font-normal">
                  <h6 className="text-2xl">{presenter.subheading}</h6>
                </div>
                <h2 className="text-5xl font-bold">{presenter.name}</h2>
                <div className="font-normal text-justify">
                  {Array.isArray(presenter.annotation) ? (
                    presenter.annotation.map((p) => (
                      <p className="text-lg" key={p}>
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="text-lg text-justify">{presenter.annotation}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;

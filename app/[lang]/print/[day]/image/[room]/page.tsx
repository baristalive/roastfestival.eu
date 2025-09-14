"use client";
import { CSSProperties, use, useCallback, useRef, useState } from "react";

import dictionaries, {
  Day,
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import "./print.css";
import "../../../../../globals.css";
import { toPng } from "html-to-image";
import { getRoomCategory, RoomCategory } from "./utils";

type SchedulePropsType = {
  params: Promise<{ lang: SupportedLanguages; day: Day; room: RoomCategory }>;
};

const Schedule = (props: SchedulePropsType) => {
  const params = use(props.params);
  const ref = useRef(null);
  const [watermark, setWatermark] = useState(2);

  const room = getRoomCategory(params.room);

  const handleButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${params.day}_${room}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  }, [ref, params.day, room]);

  const lang = dictionaries[params.lang as SupportedLanguages];

  const day = lang.program.filter((d) => d.$ref === params.day)[0];


  if (room === undefined) {
    return null;
  }

  const schedule = day.schedule.filter((s) =>
    [room].includes(s.track as keyof typeof dictionaries.en.programCategory),
  );

  if (
    day?.schedule === undefined ||
    day.schedule.length <= 0 ||
    schedule === undefined
  ) {
    return null;
  }


  return (
    <div className="flex h-screen items-center justify-center image">
      <div
        ref={ref}
        className="flex aspect-square h-[1080px] w-[1080px] flex-col justify-center gap-8 bg-[var(--primary)] px-2 pt-10"
        style={{ backgroundImage: `url('/watermark${watermark}.svg')`, backgroundPosition: "center center"}}
      >
        <h1 className="w-full text-center text-9xl font-bold uppercase text-[var(--white)]">
          {lang.programCategory[room]}
        </h1>
        <h2 className="w-full text-center text-8xl font-semibold text-[var(--white)] mb-10">
          {lang.programDays[params.day].name}{" "}
          {lang.programDays[params.day].date}
        </h2>
        {schedule
          .filter((t) => [room].includes(t.track))
          .map((t, idx) => {
            const count = t.schedule.length
            const style = (count === 1 || room === "espresso_milk") ? { display: "flex", flexDirection: "column"} : count > 3 ? { display: "flex" }: { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }
            const lineStyle = count > 3 ? { flexBasis: "25%"} : {}
            return (
              <div
                className="grid gap-10 px-10 items-stretch justify-center flex-wrap"
                key={`${t.track}_${idx}`}
                style={style as CSSProperties}
              >
                {t.schedule.map((i, idx) => (
                  <div className="flex flex-col gap-10" style={lineStyle} key={idx}>
                    {i.map((s) => {
                      const presenter = lang.presenters[s.$ref as keyof typeof lang.presenters] as Presenter;
                      return (
                        <div className="schedule-item elevate my-1 overflow-hidden rounded-lg p-4" key={`${t.track}_${idx}_${s.$ref}`}>
                          <h4 className="mb-3 text-4xl font-bold">
                            {presenter.name}
                          </h4>
                          <i className="text-2xl">
                            {s.start} - {s.end} {presenter.subheading && `| ${presenter.subheading}`}
                          </i>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
      </div>
      <button
        className="elevate absolute left-10 top-10 rounded-lg bg-black px-8 py-4 text-2xl text-white"
        onClick={handleButtonClick}
      >
        Uložit
      </button>
      <select className="elevate absolute left-10 top-32 rounded-lg bg-[var(--primary)] px-8 py-4 text-2xl text-white" id="watermark" name="watermark" onChange={e => setWatermark(Number(e.target.value))}>
        <option value="2">Watermark 2</option>
        <option value="3">Watermark 3</option>
        <option value="4">Watermark 4</option>
        <option value="5">Watermark 5</option>
        <option value="6">Watermark 6</option>
      </select>
    </div>
  );
};

export default Schedule;

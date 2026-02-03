import {
  AllTracks,
  dictionaries,
  Presenter,
  SupportedLanguages,
  Track,
  type RawProgramDay,
} from "@/app/dictionaries/all";
import { useParams } from "next/navigation";
import React from "react";
import { StationIcon } from "./StationIcon";
import Modal from "./Modal";
import { ScheduleViewType } from "../_program/contexts";

const MINUTE_STRINGS = Array.from(Array(6), (_, idxm) =>
  String(idxm).padEnd(2, "0"),
);

const GRID_STOPS_PREFIX = "[station] max(10vw, 100px) ";
const GRID_STOPS =
  "[h950] 1fr max(1vw, 25px) " +
  Array.from(Array(8), (_, idx) =>
    MINUTE_STRINGS.map((m) => `[h${idx + 10}${m}] 1fr max(1vw, 25px)`),
  )
    .flat()
    .join(" ") +
  " [h1800] 1fr max(1vw, 30px) [h1810]";
const HOURS = Array.from(Array(9), (_, idx) => ({
  center: `h${idx + 10}00`,
  end: `h${idx + 10}10`,
  start: `h${idx + 9}50`,
  title: idx + 10 + ":00",
}));

const DaySchedule = ({
  appearance = "loading",
  className = "",
  schedule,
  showTrackHeader = false,
  tracks = AllTracks,
}: {
  className?: string;
  tracks?: Track[];
  showTrackHeader?: boolean;
  appearance?: ScheduleViewType;
} & Pick<RawProgramDay, "schedule">) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  if (schedule.length === 0 || appearance === "loading") {
    return null;
  }
  const gridStops = showTrackHeader
    ? GRID_STOPS_PREFIX + GRID_STOPS
    : GRID_STOPS;

  return (
    <div
      className={`schedule-wrapper relative flex w-full flex-col justify-between py-4 will-change-auto ${className}`}
    >
      <div
        className={`schedule-header p-4 text-center`}
        style={{
          gridTemplateColumns: gridStops,
        }}
      >
        {HOURS.map((h) => (
          <div
            style={{
              gridColumnEnd: h.end,
              gridColumnStart: h.start,
            }}
            key={h.title}
          >
            {h.title}
          </div>
        ))}
      </div>
      <div
        className={`schedule-header absolute inset-0 top-[2.5em] bottom-[2em] z-0 p-4`}
        style={{
          gridTemplateColumns: gridStops,
        }}
      >
        {HOURS.map((h) => (
          <div
            className="border-r-2 border-dotted border-gray-200"
            style={{
              gridColumnEnd: h.center,
              gridColumnStart: h.start,
            }}
            key={h.title}
          ></div>
        ))}
      </div>
      {schedule
        .filter((t) => tracks.includes(t.track))
        .map((t) => (
          <div
            key={t.track}
            className={`schedule-track relative mx-4 rounded-2xl py-4 text-xl`}
            style={{
              gridTemplateColumns: gridStops,
            }}
          >
            <div
              className={`col-span-full col-start-[station] col-end-[h1000] row-start-1 row-end-5 flex flex-col items-center justify-center p-2 text-center ${showTrackHeader ? "" : "hidden"}`}
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
            {t.schedule
              .flat()
              .sort((a, b) =>
                appearance !== "schedule" && a.start < b.start ? -1 : 1,
              )
              .map((s, idx) => {
                const presenter = lang.presenters[
                  s.$ref as keyof typeof lang.presenters
                ] as Presenter;
                return (
                  <div
                    className="schedule-item-wrapper"
                    key={`${presenter?.name}_${idx}`}
                    style={{
                      gridColumnEnd: `h${s.end.replace(":", "")}`,
                      gridColumnStart: `h${s.start.replace(":", "")}`,
                    }}
                  >
                    {presenter === undefined || !presenter.name ? null : (
                      <>
                        <Modal {...presenter}>
                          <div className="schedule-item elevate relative my-1 rounded-lg px-3 py-1 md:py-2">
                            <div
                              className={`schedule-subitem col-span-full text-base`}
                            >
                              {s.start} - {s.end}
                            </div>
                            <h4 className="line-clamp-4 text-lg font-bold">
                              {presenter.name}
                            </h4>
                            {presenter.subheading && (
                              <i className="line-clamp-2 text-base">
                                {presenter.subheading}
                              </i>
                            )}
                            {presenter.lang && (
                              <div className="schedule-item-adornment elevate absolute mr-2 aspect-square rounded-full bg-(--white) p-3 font-bold text-(--black) uppercase">
                                {presenter.lang}
                              </div>
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
  );
};

export default DaySchedule;

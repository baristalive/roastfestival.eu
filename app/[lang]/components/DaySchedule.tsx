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
import { ScheduleViewType } from "../program/contexts";

const MINUTE_STRINGS = Array.from(Array(6), (_, idxm) =>
  String(idxm).padEnd(2, "0"),
);

const GRID_STOPS_PREFIX = "[station] max(10vw, 100px) ";
const GRID_STOPS =
  "[h950] 1fr max(1vw, 30px) " +
  Array.from(Array(8), (_, idx) =>
    MINUTE_STRINGS.map((m) => `[h${idx + 10}${m}] 1fr max(1vw, 30px)`),
  )
    .flat()
    .join(" ") +
  " [h1800] 1fr max(1vw, 30px) [h1810]";
const HOURS = Array.from(Array(9), (_, idx) => ({
  title: idx + 10 + ":00",
  start: `h${idx + 9}50`,
  end: `h${idx + 10}10`,
  center: `h${idx + 10}00`,
}));

const DaySchedule = ({
  schedule,
  className = "",
  showTrackHeader = false,
  appearance = "responsive",
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
      className={`relative flex w-full flex-col justify-between py-4 will-change-auto ${className} `}
    >
      <div
        className={`p-4 text-center schedule_header_style_${appearance}`}
        style={{
          gridTemplateColumns: gridStops,
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
        className={`absolute inset-0 bottom-[2em] top-[2.5em] z-0 p-4 schedule_header_style_${appearance}`}
        style={{
          gridTemplateColumns: gridStops,
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
      {schedule
        .filter((t) => tracks.includes(t.track))
        .map((t) => (
          <div
            key={t.track}
            className={`program-track relative mx-4 rounded-2xl py-4 text-xl schedule_content_style_${appearance}`}
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
                    className="program-slot-wrapper mx-2 xl:mx-0.5"
                    key={`${presenter?.name}_${idx}`}
                    style={{
                      gridColumnStart: `h${s.start.replace(":", "")}`,
                      gridColumnEnd: `h${s.end.replace(":", "")}`,
                    }}
                  >
                    {presenter === undefined || !presenter.name ? null : (
                      <>
                        <Modal {...presenter}>
                          <div className="program-slot elevate my-1 overflow-hidden rounded-lg px-3 py-1 md:py-2">
                            <div
                              className={`col-span-full text-base schedule_item_style_${appearance}`}
                            >
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
  );
};

export default DaySchedule;

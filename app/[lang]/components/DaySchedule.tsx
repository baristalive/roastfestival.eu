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

const MINUTE_STRINGS = Array.from(Array(6), (_, idxm) =>
  String(idxm).padEnd(2, "0"),
);
const GRID_STOPS =
  "[station] 100px [h950] 1fr " +
  Array.from(Array(8), (_, idx) =>
    MINUTE_STRINGS.map((m) => `[h${idx + 10}${m}] 1fr`),
  )
    .flat()
    .join(" ") +
  " [h1800] 1fr [h1810]";
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
  tracks = AllTracks,
}: { className?: string; tracks?: Track[]; showTrackHeader?: boolean } & Pick<
  RawProgramDay,
  "schedule"
>) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  if (schedule.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative flex w-full flex-col justify-between py-4 will-change-auto ${className}`}
    >
      <div
        className="hidden p-4 pt-10 text-center xl:grid"
        style={{
          gridTemplateColumns: GRID_STOPS,
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
        className="absolute inset-0 bottom-[2em] top-[4.5em] z-0 hidden p-4 xl:grid"
        style={{
          gridTemplateColumns: GRID_STOPS,
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
            className={`program-track relative mx-4 rounded-2xl py-4 text-xl xl:grid`}
            style={{
              gridTemplateColumns: GRID_STOPS,
            }}
          >
            {showTrackHeader && (
              <div className="col-span-full row-start-1 flex flex-col items-center justify-center p-2 text-center xl:col-start-[station] xl:col-end-[h1000] xl:row-end-5">
                <StationIcon station={t.track} />
                <h3>
                  {
                    lang.programCategory[
                      t.track as keyof typeof lang.programCategory
                    ]
                  }
                </h3>
              </div>
            )}
            {t.schedule.flat().map((s, idx) => {
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
                        <div className="program-slot elevate my-1 overflow-hidden rounded-lg px-3 py-1 text-center md:py-2 xl:text-left">
                          <div className="col-span-full text-base xl:hidden">
                            {s.start} - {s.end}
                          </div>
                          <h4 className="text-lg font-bold">
                            {presenter.name}
                          </h4>
                          {presenter.subheading && (
                            <i className="text-base">{presenter.subheading}</i>
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

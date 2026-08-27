import {
  AllTracks,
  dictionaries,
  Presenter,
  SupportedLanguages,
  Track,
  type RawProgramDay,
} from "@/app/dictionaries/all";
import { useCallback, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StationIcon } from "@/app/components/StationIcon";
import Modal from "./Modal";
import type { ViewMode } from "../page";

const MINUTE_STRINGS = Array.from(Array(6), (_, idxm) =>
  String(idxm).padEnd(2, "0"),
);

const GRID_STOPS =
  "[h950] 1fr 2px " +
  Array.from(Array(8), (_, idx) =>
    MINUTE_STRINGS.map((m) => `[h${idx + 10}${m}] 1fr 2px`),
  )
    .flat()
    .join(" ") +
  " [h1800] 1fr 4px [h1810]";

const HOURS = Array.from(Array(9), (_, idx) => ({
  center: `h${idx + 10}00`,
  end: `h${idx + 10}10`,
  start: `h${idx + 9}50`,
  title: idx + 10 + ":00",
}));

const TRACK_STYLES: Record<
  string,
  { bg: string; text: string; headerBg: string; edge: string }
> = {
  brew: {
    bg: "bg-white",
    edge: "border-l-black",
    headerBg: "bg-white",
    text: "text-black",
  },
  espresso: {
    bg: "bg-black",
    edge: "border-l-white",
    headerBg: "bg-black",
    text: "text-white",
  },
  espresso_milk: {
    bg: "bg-accent",
    edge: "border-l-black",
    headerBg: "bg-accent",
    text: "text-black",
  },
  lecture: {
    bg: "bg-black",
    edge: "border-l-white",
    headerBg: "bg-black",
    text: "text-white",
  },
  party: {
    bg: "bg-white",
    edge: "border-l-black",
    headerBg: "bg-white",
    text: "text-black",
  },
  workshop: {
    bg: "bg-accent",
    edge: "border-l-black",
    headerBg: "bg-accent",
    text: "text-black",
  },
};

const DaySchedule = ({
  className = "",
  dayBg = "",
  modalBg = "bg-primary",
  schedule,
  tracks = AllTracks,
  view = "list",
}: {
  className?: string;
  dayBg?: string;
  modalBg?: string;
  tracks?: Track[];
  view?: ViewMode;
} & Pick<RawProgramDay, "schedule">) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [tracker, setTracker] = useState<{ x: number; time: string } | null>(
    null,
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    const gridSpan = gridRef.current;
    if (!wrapper || !gridSpan) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const gridRect = gridSpan.getBoundingClientRect();

    const x = e.clientX - wrapperRect.left;
    const gridX = e.clientX - gridRect.left;
    const ratio = gridX / gridRect.width;

    if (ratio < 0 || ratio > 1) {
      setTracker(null);
      return;
    }

    const totalMinutes = 10 * 60 + ratio * 8 * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    setTracker({
      time: `${hours}:${String(minutes).padStart(2, "0")}`,
      x,
    });
  }, []);

  if (schedule.length === 0) return null;

  const style = (track: string) =>
    TRACK_STYLES[track] || {
      bg: "bg-black",
      edge: "border-l-black",
      headerBg: "bg-black",
      text: "text-white",
    };

  if (view === "list") {
    return (
      <div className={`mx-auto max-w-7xl ${className}`}>
        {schedule
          .filter((t) => tracks.includes(t.track))
          .map((t) => {
            const { bg, headerBg, text } = style(t.track);
            const categoryName =
              lang.programCategory[
                t.track as keyof typeof lang.programCategory
              ];
            return (
              <div key={t.track} className="mb-8">
                <div
                  className={`mb-3 flex items-center gap-2 ${headerBg} ${text} punk-border px-4 py-2`}
                >
                  <StationIcon station={t.track} />
                  <h3 className="font-display text-sm font-black uppercase md:text-base">
                    {categoryName}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {t.schedule
                    .flat()
                    .sort((a, b) => (a.start < b.start ? -1 : 1))
                    .map((s, idx) => {
                      const presenter = lang.presenters[
                        s.$ref as keyof typeof lang.presenters
                      ] as Presenter;
                      if (!presenter?.name) return null;
                      return (
                        <Modal
                          {...presenter}
                          headerBg={modalBg}
                          key={`${presenter.name}_${idx}`}
                        >
                          <div className="punk-border cursor-pointer overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-black)]">
                            <div
                              className={`flex items-center justify-between px-4 py-2 ${bg} ${text}`}
                            >
                              <span className="font-display text-sm font-black uppercase">
                                {s.start} – {s.end}
                              </span>
                              {presenter.lang && (
                                <span className="bg-white px-2 py-0.5 text-xs font-black text-black uppercase">
                                  {presenter.lang}
                                </span>
                              )}
                            </div>
                            <div className="bg-white p-4">
                              <h4 className="font-display text-lg leading-tight font-black">
                                {presenter.name}
                              </h4>
                              {presenter.subheading && (
                                <p className="mt-1 text-base text-black/60">
                                  {presenter.subheading}
                                </p>
                              )}
                            </div>
                          </div>
                        </Modal>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`schedule-wrapper relative flex w-full flex-col ${dayBg} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTracker(null)}
    >
      {/* Hidden calibration grid — same px-4 as header/gridlines */}
      <div
        className="pointer-events-none invisible absolute inset-0 grid px-4"
        style={{ gridTemplateColumns: GRID_STOPS }}
      >
        <div
          ref={gridRef}
          style={{ gridColumnEnd: "h1800", gridColumnStart: "h1000" }}
        />
      </div>

      {/* Time tracker line — behind items */}
      {tracker && (
        <div
          className="pointer-events-none absolute top-0 bottom-0 z-0"
          style={{ left: tracker.x }}
        >
          <div className="font-display absolute top-0 -translate-x-1/2 bg-black px-2 py-0.5 text-sm font-black tracking-widest text-white">
            {tracker.time}
          </div>
          <div className="absolute top-7 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-black/50" />
        </div>
      )}

      {/* Hour labels */}
      <div
        className="schedule-header font-display px-4 pb-2 text-center text-sm font-black tracking-widest text-black/50 uppercase"
        style={{ gridTemplateColumns: GRID_STOPS }}
      >
        {HOURS.map((h) => (
          <div
            style={{ gridColumnEnd: h.end, gridColumnStart: h.start }}
            key={h.title}
          >
            {h.title}
          </div>
        ))}
      </div>

      {/* Hour grid lines */}
      <div
        className="schedule-header absolute inset-0 top-7 bottom-0 z-0 px-4"
        style={{ gridTemplateColumns: GRID_STOPS }}
      >
        {HOURS.map((h) => (
          <div
            className="schedule-gridline"
            style={{ gridColumnEnd: h.center, gridColumnStart: h.start }}
            key={h.title}
          />
        ))}
      </div>

      {/* Tracks */}
      {schedule
        .filter((t) => tracks.includes(t.track))
        .map((t) => {
          const { bg, edge, text } = style(t.track);
          return (
            <div
              key={t.track}
              data-track={t.track}
              className="schedule-track relative px-4 py-3"
              style={{ gridTemplateColumns: GRID_STOPS }}
            >
              {t.schedule.flat().map((s, idx) => {
                const presenter = lang.presenters[
                  s.$ref as keyof typeof lang.presenters
                ] as Presenter;
                if (!presenter?.name) return null;
                return (
                  <div
                    className="schedule-item-wrapper"
                    key={`${presenter.name}_${idx}`}
                    style={{
                      gridColumnEnd: `h${s.end.replace(":", "")}`,
                      gridColumnStart: `h${s.start.replace(":", "")}`,
                    }}
                  >
                    <Modal {...presenter} headerBg={modalBg}>
                      <div
                        className={`schedule-item group my-1.5 flex h-full cursor-pointer items-start gap-2 border-l-4 ${edge} px-3 py-3 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-black)] ${bg} ${text}`}
                      >
                        <h4 className="font-display line-clamp-2 grow text-sm leading-tight font-black">
                          {presenter.name}
                        </h4>
                        {presenter.lang && (
                          <span className="bg-primary shrink-0 border-2 border-black px-1.5 py-0.5 text-xs font-black text-white uppercase">
                            {presenter.lang}
                          </span>
                        )}
                      </div>
                    </Modal>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default DaySchedule;

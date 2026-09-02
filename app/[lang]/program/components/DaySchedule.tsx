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
import InlineMarkdown from "@/app/components/InlineMarkdown";
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

const TIMELINE_MIN_WIDTH = "100rem";
const TIMELINE_COLUMNS = {
  gridTemplateColumns: "var(--program-track-width) minmax(0, 1fr)",
};

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
  cupping: {
    bg: "bg-black",
    edge: "border-l-white",
    headerBg: "bg-black",
    text: "text-white",
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
    bg: "bg-white",
    edge: "border-l-black",
    headerBg: "bg-white",
    text: "text-black",
  },
  party: {
    bg: "bg-accent",
    edge: "border-l-black",
    headerBg: "bg-accent",
    text: "text-black",
  },
  workshop: {
    bg: "bg-accent",
    edge: "border-l-black",
    headerBg: "bg-accent",
    text: "text-black",
  },
};

const InProgressBadge = ({
  className = "",
  label,
}: {
  className?: string;
  label: string;
}) => (
  <span
    className={`font-display pointer-events-none absolute z-10 rotate-6 border-2 border-black bg-white px-2 py-1 leading-none font-black tracking-widest whitespace-nowrap text-black uppercase shadow-[4px_4px_0_0_var(--color-black)] ${className}`}
    data-in-progress-label="true"
  >
    {label}
  </span>
);

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
  const headerTimelineRef = useRef<HTMLDivElement>(null);
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

  const handleTimelineScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const headerTimeline = headerTimelineRef.current;
      if (!headerTimeline) return;
      headerTimeline.style.transform = `translate3d(-${e.currentTarget.scrollLeft}px, 0, 0)`;
    },
    [],
  );

  if (schedule.length === 0) return null;

  const altBg = dayBg.includes("bg-primary") ? "bg-secondary" : "bg-primary";

  const style = (track: string) => {
    const base = TRACK_STYLES[track] || {
      bg: "bg-black",
      edge: "border-l-black",
      headerBg: "bg-black",
      text: "text-white",
    };
    if (base.bg === "bg-white") {
      return { ...base, bg: altBg, headerBg: altBg };
    }
    return base;
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
                      const isInProgress = presenter?.in_progress === true;

                      if (!presenter?.name && !isInProgress) return null;

                      const card = (
                        <div
                          className={`punk-border relative overflow-hidden ${isInProgress ? "" : "cursor-pointer transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-black)]"}`}
                          data-in-progress={isInProgress ? "true" : undefined}
                        >
                          {isInProgress && (
                            <InProgressBadge
                              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                              label={lang.programTile.inProgress}
                            />
                          )}
                          <div
                            className={`flex items-center justify-between px-4 py-2 ${bg} ${text}`}
                          >
                            <span className="font-display text-sm font-black uppercase">
                              {s.start} – {s.end}
                            </span>
                            {![
                              Track.Honor,
                              Track.Espresso,
                              Track.Filter,
                            ].includes(t.track) &&
                              presenter.lang && (
                                <span className="bg-white px-2 py-0.5 text-xs font-black text-black uppercase">
                                  {presenter.lang}
                                </span>
                              )}
                          </div>
                          <div className="bg-white p-4">
                            {presenter.name ? (
                              <h4
                                lang={params.lang === "cz" ? "cs" : "en"}
                                className="font-display wrap-break-words text-lg leading-tight font-black hyphens-auto"
                              >
                                <InlineMarkdown>
                                  {presenter.name}
                                </InlineMarkdown>
                              </h4>
                            ) : (
                              <span className="font-display text-sm font-black tracking-widest text-black uppercase">
                                {lang.programTile.inProgress}
                              </span>
                            )}
                            {presenter.subheading && (
                              <p className="mt-1 text-base text-black/60">
                                {presenter.subheading}
                              </p>
                            )}
                          </div>
                        </div>
                      );

                      return isInProgress ? (
                        <div key={`${s.$ref}_${s.start}_${s.end}_${idx}`}>
                          {card}
                        </div>
                      ) : (
                        <Modal
                          {...presenter}
                          headerBg={modalBg}
                          track={t.track}
                          key={`${presenter.name}_${idx}`}
                        >
                          {card}
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
    <div className="schedule-timeline relative">
      {/* Sticky hour labels stay outside the horizontal scroller so they can
          stick to the page while the schedule itself scrolls sideways. */}
      <div
        className={`sticky z-20 grid overflow-hidden ${dayBg}`}
        style={{
          ...TIMELINE_COLUMNS,
          top: "var(--program-toolbar-height, 0px)",
        }}
      >
        <div className="border-r-4 border-black/20" />
        <div className="min-w-0 overflow-hidden">
          <div
            ref={headerTimelineRef}
            className="schedule-header font-display relative grid px-4 py-2 text-center text-sm font-black tracking-widest text-black/50 uppercase will-change-transform"
            style={{
              gridTemplateColumns: GRID_STOPS,
              minWidth: `calc(${TIMELINE_MIN_WIDTH} - var(--program-track-width))`,
            }}
          >
            {HOURS.map((h) => (
              <div
                style={{ gridColumnEnd: h.end, gridColumnStart: h.start }}
                key={h.title}
              >
                {h.title}
              </div>
            ))}
            {tracker && (
              <div
                className="font-display pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-black px-2 py-1 text-sm font-black tracking-widest text-white"
                style={{
                  left: `calc(${tracker.x}px - var(--program-track-width))`,
                }}
              >
                {tracker.time}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto" onScroll={handleTimelineScroll}>
        <div
          ref={wrapperRef}
          className={`schedule-wrapper relative flex w-full flex-col ${dayBg} ${className}`}
          style={{ minWidth: TIMELINE_MIN_WIDTH }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTracker(null)}
        >
          {/* Hidden calibration grid — same px-4 as header/gridlines */}
          <div
            className="pointer-events-none invisible absolute inset-0 grid"
            style={TIMELINE_COLUMNS}
          >
            <div />
            <div
              className="grid px-4"
              style={{ gridTemplateColumns: GRID_STOPS }}
            >
              <div
                ref={gridRef}
                style={{ gridColumnEnd: "h1800", gridColumnStart: "h1000" }}
              />
            </div>
          </div>

          {/* Time tracker line — behind items */}
          {tracker && (
            <div
              className="pointer-events-none absolute top-0 bottom-0 z-0"
              style={{ left: tracker.x }}
            >
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-black/50" />
            </div>
          )}

          {/* Hour grid lines */}
          <div
            className="pointer-events-none absolute inset-0 z-0 grid"
            style={TIMELINE_COLUMNS}
          >
            <div />
            <div
              className="schedule-header grid px-4"
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
          </div>

          {/* Tracks */}
          {schedule
            .filter((t) => tracks.includes(t.track))
            .map((t) => {
              const { bg, edge, headerBg, text } = style(t.track);
              const categoryName =
                lang.programCategory[
                  t.track as keyof typeof lang.programCategory
                ];
              return (
                <div
                  key={t.track}
                  data-track={t.track}
                  className="grid"
                  style={TIMELINE_COLUMNS}
                >
                  <div
                    className={`sticky left-0 z-20 flex flex-col items-center justify-center gap-1 self-stretch border-r-4 border-black px-1 py-3 md:gap-2 md:px-2 md:py-4 ${headerBg} ${text}`}
                  >
                    <StationIcon station={t.track} />
                    <span
                      className="font-display text-center text-[0.65rem] leading-none font-black tracking-widest uppercase"
                      style={{
                        transform: "rotate(180deg)",
                        writingMode: "vertical-rl",
                      }}
                    >
                      {categoryName}
                    </span>
                  </div>
                  <div
                    className="schedule-track relative px-4 py-3"
                    style={{ gridTemplateColumns: GRID_STOPS }}
                  >
                    {t.schedule.flat().map((s, idx) => {
                      const presenter = lang.presenters[
                        s.$ref as keyof typeof lang.presenters
                      ] as Presenter;
                      const isInProgress = presenter?.in_progress === true;

                      if (!presenter?.name && !isInProgress) return null;

                      const item = (
                        <div
                          aria-label={
                            isInProgress
                              ? lang.programTile.inProgress
                              : undefined
                          }
                          className={`schedule-item group relative my-1.5 flex items-start gap-2 border-l-4 ${edge} px-3 py-3 ${bg} ${text} ${isInProgress ? "" : "cursor-pointer transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-black)]"}`}
                          data-in-progress={isInProgress ? "true" : undefined}
                        >
                          {isInProgress && (
                            <InProgressBadge
                              className="-top-4 left-1/2 -translate-x-1/2 text-[0.65rem]"
                              label={lang.programTile.inProgress}
                            />
                          )}
                          <div className="min-w-0 grow">
                            {presenter.name ? (
                              <h4
                                lang={params.lang === "cz" ? "cs" : "en"}
                                className={`font-display wrap-break-words min-w-0 text-sm leading-tight font-black hyphens-auto`}
                              >
                                <InlineMarkdown>
                                  {presenter.name}
                                </InlineMarkdown>
                              </h4>
                            ) : (
                              <span className="font-display text-xs leading-tight font-black tracking-widest uppercase">
                                {lang.programTile.inProgress}
                              </span>
                            )}
                            {presenter.subheading && (
                              <p
                                lang={params.lang === "cz" ? "cs" : "en"}
                                className="wrap-break-words mt-1 text-sm leading-tight hyphens-auto opacity-70"
                              >
                                {presenter.subheading}
                              </p>
                            )}
                          </div>
                          {![
                            Track.Honor,
                            Track.Espresso,
                            Track.Filter,
                          ].includes(t.track) &&
                            presenter.lang && (
                              <span className="bg-primary shrink-0 border-2 border-black px-1.5 py-0.5 text-xs font-black text-white uppercase">
                                {presenter.lang}
                              </span>
                            )}
                        </div>
                      );

                      return (
                        <div
                          className="schedule-item-wrapper"
                          key={`${s.$ref}_${s.start}_${s.end}_${idx}`}
                          style={{
                            gridColumnEnd: `h${s.end.replace(":", "")}`,
                            gridColumnStart: `h${s.start.replace(":", "")}`,
                          }}
                        >
                          {isInProgress ? (
                            item
                          ) : (
                            <Modal
                              {...presenter}
                              headerBg={modalBg}
                              track={t.track}
                            >
                              {item}
                            </Modal>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DaySchedule;

"use client";

import InlineMarkdown from "@/app/components/InlineMarkdown";
import { StationIcon } from "@/app/components/StationIcon";
import {
  dictionaries,
  Presenter,
  SupportedLanguages,
  Track,
  type RawProgramDay,
} from "@/app/dictionaries/all";

const MINUTE_STRINGS = Array.from(Array(6), (_, idxm) =>
  String(idxm).padEnd(2, "0"),
);

const GRID_STOPS =
  "[lane-start] 3.5rem [h950] 1fr 2px " +
  Array.from(Array(8), (_, idx) =>
    MINUTE_STRINGS.map((m) => `[h${idx + 10}${m}] 1fr 2px`),
  )
    .flat()
    .join(" ") +
  " [h1800] 1fr 4px [h1810]";

const TIMELINE_COLUMNS = {
  gridTemplateColumns: "var(--program-track-width) minmax(0, 1fr)",
};
const TIMELINE_TRACKS = [Track.Honor, Track.Espresso, Track.Filter];

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
    edge: "border-black",
    headerBg: "bg-white",
    text: "text-black",
  },
  espresso: {
    bg: "bg-black",
    edge: "border-white",
    headerBg: "bg-black",
    text: "text-white",
  },
  espresso_milk: {
    bg: "bg-accent",
    edge: "border-black",
    headerBg: "bg-accent",
    text: "text-black",
  },
};

const InProgressBadge = ({ label }: { label: string }) => (
  <span className="font-display pointer-events-none absolute z-10 rotate-6 border-2 border-black bg-white px-2 py-1 leading-none font-black tracking-widest whitespace-nowrap text-black uppercase shadow-[4px_4px_0_0_var(--color-black)]">
    {label}
  </span>
);

type PrintTimelineProps = {
  className?: string;
  dayBg?: string;
  langKey: SupportedLanguages;
  schedule: RawProgramDay["schedule"];
};

const PrintTimeline = ({
  className = "",
  dayBg = "",
  langKey,
  schedule,
}: PrintTimelineProps) => {
  const lang = dictionaries[langKey];
  const altBg = dayBg.includes("bg-primary") ? "bg-secondary" : "bg-primary";
  const visibleSchedule = schedule.filter((trackSchedule) =>
    TIMELINE_TRACKS.includes(trackSchedule.track),
  );

  const style = (track: string) => {
    const base = TRACK_STYLES[track] ?? {
      bg: "bg-black",
      edge: "border-black",
      headerBg: "bg-black",
      text: "text-white",
    };

    if (base.bg === "bg-white") {
      return { ...base, bg: altBg, headerBg: altBg };
    }

    return base;
  };

  if (visibleSchedule.length === 0) return null;

  return (
    <div className="schedule-timeline relative">
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
            className="schedule-header font-display relative grid px-4 py-2 text-center text-sm font-black tracking-widest text-black/50 uppercase"
            style={{
              gridTemplateColumns: GRID_STOPS,
            }}
          >
            {HOURS.map((hour) => (
              <div
                style={{
                  gridColumnEnd: hour.end,
                  gridColumnStart: hour.start,
                }}
                key={hour.title}
              >
                {hour.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          className={`schedule-wrapper relative flex w-full flex-col ${dayBg} ${className}`}
        >
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
                style={{
                  gridColumnEnd: "h1800",
                  gridColumnStart: "h1000",
                }}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-0 grid"
            style={TIMELINE_COLUMNS}
          >
            <div />
            <div
              className="schedule-header grid px-4"
              style={{ gridTemplateColumns: GRID_STOPS }}
            >
              {HOURS.map((hour) => (
                <div
                  className="schedule-gridline"
                  style={{
                    gridColumnEnd: hour.center,
                    gridColumnStart: hour.start,
                  }}
                  key={hour.title}
                />
              ))}
            </div>
          </div>

          {visibleSchedule.map((trackSchedule) => {
            const { bg, edge, headerBg, text } = style(trackSchedule.track);
            const categoryName =
              lang.programCategory[
                trackSchedule.track as keyof typeof lang.programCategory
              ];
            const showLaneNumbers = [Track.Espresso, Track.Filter].includes(
              trackSchedule.track,
            );

            return (
              <div
                key={trackSchedule.track}
                data-track={trackSchedule.track}
                className="grid"
                style={TIMELINE_COLUMNS}
              >
                <div
                  className={`sticky left-0 z-20 flex flex-col items-center justify-center gap-2 self-stretch border-r-4 ${edge} px-1 py-3 md:gap-2 md:px-2 md:py-8 ${headerBg} ${text}`}
                >
                  <StationIcon station={trackSchedule.track} />
                  <span
                    className="font-display text-center text-sm leading-none font-black tracking-widest uppercase"
                    style={{
                      transform: "rotate(180deg)",
                      writingMode: "vertical-rl",
                    }}
                  >
                    {categoryName}
                  </span>
                </div>

                <div
                  className="schedule-track relative items-center px-4"
                  style={{ gridTemplateColumns: GRID_STOPS }}
                >
                  {showLaneNumbers &&
                    trackSchedule.schedule.map((_, laneIndex) => (
                      <span
                        aria-hidden="true"
                        className={`font-display pointer-events-none z-10 flex h-full items-center justify-center px-2 text-xl leading-none font-black ${headerBg} ${text}`}
                        key={`${trackSchedule.track}-lane-${laneIndex}`}
                        style={{
                          gridColumnEnd: "h950",
                          gridColumnStart: "lane-start",
                          gridRowEnd: laneIndex + 2,
                          gridRowStart: laneIndex + 1,
                        }}
                      >
                        {laneIndex + 1}
                      </span>
                    ))}

                  {trackSchedule.schedule.flat().map((item, itemIndex) => {
                    const presenter = lang.presenters[
                      item.$ref as keyof typeof lang.presenters
                    ] as Presenter | undefined;
                    const isInProgress = presenter?.in_progress === true;

                    if (!presenter?.name && !isInProgress) return null;

                    return (
                      <div
                        className="schedule-item-wrapper"
                        key={`${item.$ref}_${item.start}_${item.end}_${itemIndex}`}
                        style={{
                          gridColumnEnd: `h${item.end.replace(":", "")}`,
                          gridColumnStart: `h${item.start.replace(":", "")}`,
                        }}
                      >
                        <div
                          aria-label={
                            isInProgress
                              ? lang.programTile.inProgress
                              : undefined
                          }
                          className={`schedule-item group relative my-1.5 flex items-start gap-2 border-l-4 ${edge} px-3 py-4 ${bg} ${text}`}
                          data-in-progress={isInProgress ? "true" : undefined}
                        >
                          {isInProgress && (
                            <InProgressBadge
                              label={lang.programTile.inProgress}
                            />
                          )}
                          <div className="min-w-0 grow">
                            {presenter.name ? (
                              <h4
                                lang={langKey === "cz" ? "cs" : "en"}
                                className="font-display wrap-break-words min-w-0 text-[.9rem] leading-tight font-black hyphens-auto"
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
                                lang={langKey === "cz" ? "cs" : "en"}
                                className="wrap-break-words mt-1 text-sm leading-tight hyphens-auto opacity-70"
                              >
                                {presenter.subheading}
                              </p>
                            )}
                          </div>
                        </div>
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

export default PrintTimeline;

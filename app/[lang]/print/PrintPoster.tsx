"use client";

import { forwardRef } from "react";

import InlineMarkdown from "@/app/components/InlineMarkdown";
import { BeanGrid } from "@/app/[lang]/components/BeanGrid";
import BeanIcon from "@/app/icons/beanicon";
import dictionaries, {
  Day,
  Presenter,
  SupportedLanguages,
  Track,
} from "@/app/dictionaries/all";
import ExportedImage from "next-image-export-optimizer";
import PrintDisplay from "./PrintDisplay";
import PrintTimeline from "./PrintTimeline";
import { getRoomCategory, PrintRoomSlug, RoomCategory } from "./utils";

export const POSTER_BACKGROUNDS = [
  {
    className: "bg-secondary",
    id: "salmon",
    ink: "text-black",
    label: "Salmon",
  },
  {
    className: "bg-primary",
    id: "pink",
    ink: "text-white",
    label: "Pink",
  },
  {
    className: "bg-accent",
    id: "mint",
    ink: "text-black",
    label: "Mint",
  },
] as const;

export const POSTER_PATTERNS = [
  { id: "dots", label: "Dots" },
  { id: "lines", label: "Lines" },
  { id: "beans", label: "Beans" },
] as const;

export type PosterBackgroundId = (typeof POSTER_BACKGROUNDS)[number]["id"];
export type PosterPatternId = (typeof POSTER_PATTERNS)[number]["id"];

export const DEFAULT_BACKGROUND_BY_DAY: Record<Day, PosterBackgroundId> = {
  [Day.Saturday]: "salmon",
  [Day.Sunday]: "pink",
};

export const DEFAULT_PATTERN_BY_DAY: Record<Day, PosterPatternId> = {
  [Day.Saturday]: "dots",
  [Day.Sunday]: "lines",
};

const SINGLE_COLUMN_ROOMS = new Set([
  "espresso_milk",
  "lecture",
  "workshop",
  "cupping",
]);
const TWO_COLUMN_ROOMS = new Set(["brew", "espresso"]);
const ANNOTATION_ROOMS = new Set([
  Track.Cupping,
  Track.Lecture,
  Track.Workshop,
]);
const ITEM_HEADER_STYLES: Record<string, { bg: string; text: string }> = {
  brew: { bg: "bg-white", text: "text-black" },
  cupping: { bg: "bg-black", text: "text-white" },
  espresso: { bg: "bg-black", text: "text-white" },
  espresso_milk: { bg: "bg-accent", text: "text-black" },
  lecture: { bg: "bg-white", text: "text-black" },
  party: { bg: "bg-accent", text: "text-black" },
  workshop: { bg: "bg-accent", text: "text-black" },
};

export type PrintPosterProps = {
  backgroundId: PosterBackgroundId;
  dayKey: Day;
  isA3: boolean;
  isA4: boolean;
  isDigitalDisplay: boolean;
  isDigitalPortrait: boolean;
  langKey: SupportedLanguages;
  patternId: PosterPatternId;
  roomSlug: PrintRoomSlug;
  rowIndex?: number;
  talkRef?: string;
};

const PrintPoster = forwardRef<HTMLDivElement, PrintPosterProps>(
  (
    {
      backgroundId,
      dayKey,
      isA3,
      isA4,
      isDigitalDisplay,
      isDigitalPortrait,
      langKey,
      patternId,
      roomSlug,
      rowIndex,
      talkRef,
    },
    ref,
  ) => {
    const isMergedTimeline = isA3 && roomSlug === "overview";
    const room = getRoomCategory(
      roomSlug === "overview" ? "espresso_milk" : (roomSlug as RoomCategory),
    );
    const lang = dictionaries[langKey];
    const day = lang.program.find((programDay) => programDay.$ref === dayKey);
    const dayDetails = lang.programDays[dayKey];
    const background =
      POSTER_BACKGROUNDS.find(
        (posterBackground) => posterBackground.id === backgroundId,
      ) ?? POSTER_BACKGROUNDS[0];
    const pattern =
      POSTER_PATTERNS.find((posterPattern) => posterPattern.id === patternId) ??
      POSTER_PATTERNS[0];
    const posterBackgroundClassName = isDigitalPortrait
      ? "bg-transparent"
      : background.className;
    const posterInkClassName = isDigitalPortrait
      ? "text-black"
      : background.ink;

    if (!day || !day.schedule.length || !dayDetails) {
      return null;
    }

    const schedule = day.schedule.filter((item) => item.track === room);
    const scheduleRows = schedule.flatMap((track) => track.schedule);
    const isA3Workshop = isA3 && room === Track.Workshop;
    const usesSelectedScheduleRow = isA4 || isA3Workshop;
    const allScheduleItems = scheduleRows.flat();
    const displayItem = isDigitalDisplay
      ? (allScheduleItems.find((item) => item.$ref === talkRef) ??
        allScheduleItems[0])
      : undefined;
    const scheduleItems = usesSelectedScheduleRow
      ? (scheduleRows[rowIndex ?? 0] ?? [])
      : scheduleRows.flat();

    if (
      isDigitalDisplay &&
      displayItem &&
      (lang.presenters[displayItem.$ref as keyof typeof lang.presenters] as
        | Presenter
        | undefined)
    ) {
      return (
        <PrintDisplay
          ref={ref}
          backgroundClassName={background.className}
          backgroundInk={background.ink}
          dayDate={dayDetails.date}
          dayName={dayDetails.name}
          item={displayItem}
          langKey={langKey}
          patternId={pattern.id}
          presenter={
            lang.presenters[
              displayItem.$ref as keyof typeof lang.presenters
            ] as Presenter
          }
        />
      );
    }

    if (
      !isMergedTimeline &&
      (isDigitalDisplay || !schedule.length || !scheduleItems.length)
    ) {
      return null;
    }

    const scheduleColumns = usesSelectedScheduleRow
      ? 1
      : SINGLE_COLUMN_ROOMS.has(room)
        ? 1
        : TWO_COLUMN_ROOMS.has(room)
          ? 2
          : scheduleItems.length <= 1
            ? 1
            : scheduleItems.length <= 4
              ? 2
              : 3;
    const needsCompactSingleColumnSpacing =
      !isA3 &&
      (room === "lecture" || room === "workshop") &&
      scheduleItems.length > 5;
    const needsTopAlignedSingleColumnSpacing =
      !isA3 && SINGLE_COLUMN_ROOMS.has(room) && scheduleItems.length >= 5;
    const needsSelectedRowSpacing = usesSelectedScheduleRow;
    const isHonoredGuests = room === Track.Honor;

    const baseItemHeaderStyle =
      ITEM_HEADER_STYLES[room] ?? ITEM_HEADER_STYLES.espresso;
    const itemHeaderStyle =
      baseItemHeaderStyle.bg === "bg-white"
        ? {
            ...baseItemHeaderStyle,
            bg: background.className.includes("bg-primary")
              ? "bg-secondary"
              : "bg-primary",
          }
        : baseItemHeaderStyle;
    const showPresenterLanguage = ![
      Track.Honor,
      Track.Espresso,
      Track.Filter,
    ].includes(room as Track);
    const showPresenterAnnotation =
      (isA3 || isDigitalPortrait) && ANNOTATION_ROOMS.has(room as Track);
    const posterTitleSize = isDigitalPortrait
      ? "text-[clamp(2rem,4vw,3rem)] leading-none"
      : "text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.2]";
    const posterTitleSpacing = isDigitalPortrait
      ? "pt-[2.25rem]"
      : isA3Workshop
        ? "pt-[4.5rem]"
        : showPresenterAnnotation
          ? "pt-[8.5rem]"
          : isMergedTimeline
            ? "pt-[1.5rem]"
            : isA3
              ? "pt-[10rem]"
              : needsCompactSingleColumnSpacing
                ? "pt-[4rem]"
                : "pt-[4.5rem]";
    const posterTitleMargin = isMergedTimeline
      ? "mt-0"
      : isDigitalPortrait
        ? "mt-2"
        : "mt-7";
    const scheduleContentSpacing = isDigitalPortrait
      ? "content-center gap-4 pt-[3%]"
      : showPresenterAnnotation
        ? "content-center gap-[2%] pt-[3%]"
        : needsSelectedRowSpacing
          ? "content-start gap-[10%] pt-[10%]"
          : needsCompactSingleColumnSpacing
            ? "content-start gap-0.5 pt-2"
            : needsTopAlignedSingleColumnSpacing
              ? "content-start gap-[2%] pt-[6%]"
              : "content-center gap-[2%] pt-[6%]";
    const dayTitleSize = isDigitalPortrait
      ? "text-[clamp(1.5rem,2vw,2rem)]"
      : "text-[clamp(2.5rem,4vw,3.5rem)]";
    const dateSize = isDigitalPortrait
      ? "text-[clamp(0.85rem,1.25vw,1rem)]"
      : "text-[clamp(1.75rem,3vw,2.75rem)]";
    const cardHeaderTextSize = isDigitalPortrait
      ? "text-xs"
      : isHonoredGuests
        ? "text-lg tracking-wide"
        : isA4
          ? "text-xl"
          : "text-sm";
    const cardHeaderPadding = isDigitalPortrait
      ? "px-3 py-1.5"
      : isHonoredGuests
        ? "px-6 py-4"
        : "px-4 py-2";
    const cardBodyClassName = isDigitalPortrait
      ? "bg-white p-2.5 text-black"
      : showPresenterAnnotation
        ? "bg-white p-3 text-black"
        : "bg-white p-4 text-black";
    const presenterNameSize = isDigitalPortrait
      ? "text-base"
      : isA3
        ? "text-lg"
        : isA4
          ? "text-3xl"
          : "text-lg";
    const presenterSubheadingSize = isDigitalPortrait
      ? "mt-1 text-sm"
      : isHonoredGuests
        ? "text-lg"
        : "mt-1 text-base";
    const annotationClassName = isDigitalPortrait
      ? "mt-2 text-[0.65rem] leading-[1.15] text-black/80"
      : "mt-3 text-[0.75rem] leading-[1.2] text-black/80";

    return (
      <div
        ref={ref}
        className={`print-poster relative flex ${isMergedTimeline ? "aspect-[420/297] w-[420mm]" : isA3 ? "aspect-[297/420]" : isA4 ? "aspect-[210/297]" : isDigitalPortrait ? "aspect-[9/16] w-[54rem]" : "aspect-square w-[68rem]"} flex-col overflow-hidden border-4 border-black p-[6%] ${posterBackgroundClassName} ${posterInkClassName}`}
        data-export-format={
          isDigitalPortrait
            ? "display-portrait"
            : isA3
              ? "a3"
              : isA4
                ? "a4"
                : "instagram"
        }
        data-print-layout={
          isMergedTimeline ? "timeline" : isA4 ? "list" : "poster"
        }
      >
        {!isDigitalPortrait && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {pattern.id === "beans" ? (
              <BeanGrid />
            ) : (
              <div
                className={`absolute inset-0 ${pattern.id === "dots" ? "bg-dots" : "bg-lines"}`}
              />
            )}
          </div>
        )}

        {!isDigitalPortrait && (
          <div className="font-display print-poster-brand absolute top-[3%] left-[4%] z-10 flex items-center gap-2 font-black tracking-tight uppercase">
            <span className="block h-[clamp(2.5rem,4vw,3.5rem)] w-[clamp(2.5rem,4vw,3.5rem)]">
              <BeanIcon />
            </span>
          </div>
        )}

        <div className="font-display absolute top-[3%] right-[4%] z-10 text-right font-black uppercase">
          <h2
            className={`print-poster-day ${dayTitleSize} leading-none tracking-[-0.06em]`}
          >
            {dayDetails.name}
          </h2>
          <span
            className={`print-poster-date mt-1 block ${dateSize} leading-none tracking-[-0.06em] opacity-60`}
          >
            {dayDetails.date}
          </span>
        </div>

        <div
          className={`z-10 flex flex-col items-center ${posterTitleSpacing} text-center`}
        >
          {usesSelectedScheduleRow && (
            <span
              className={`font-display print-poster-row-number font-black ${isA3Workshop ? "text-[clamp(5rem,12vw,12rem)]" : "text-[clamp(7rem,30vw,30rem)]"}`}
            >
              {(rowIndex ?? 0) + 1}
            </span>
          )}
          <h1
            className={`font-display print-poster-title ${posterTitleMargin} max-w-full ${isHonoredGuests ? "mx-10" : "max-w-full"} ${posterTitleSize} font-black tracking-[-0.08em] uppercase`}
          >
            {isMergedTimeline
              ? "EXPO"
              : isHonoredGuests
                ? lang.promoted.roasters.honoredTitle
                : lang.programCategory[room]}
          </h1>
        </div>

        {isMergedTimeline ? (
          <div className="print-poster-timeline z-10 min-h-0 w-full flex-1">
            <PrintTimeline
              className="print-poster-timeline-content"
              dayBg={background.className}
              langKey={langKey}
              schedule={day.schedule}
            />
          </div>
        ) : (
          <div
            className={`z-10 grid min-h-0 flex-1 px-[2%] ${scheduleContentSpacing}`}
            style={{
              gridTemplateColumns: `repeat(${scheduleColumns}, minmax(0, 1fr))`,
            }}
          >
            {scheduleItems.map((item, itemIndex) => {
              const presenter = lang.presenters[
                item.$ref as keyof typeof lang.presenters
              ] as Presenter | undefined;
              const isInProgress = presenter?.in_progress === true;
              const presenterAnnotations = presenter?.annotation
                ? Array.isArray(presenter.annotation)
                  ? presenter.annotation.filter((paragraph) => paragraph.trim())
                  : presenter.annotation.trim()
                    ? [presenter.annotation]
                    : []
                : [];

              if (!presenter?.name && !isInProgress) return null;

              return (
                <div
                  className={`print-poster-card punk-border relative min-w-0 ${isHonoredGuests ? "min-h-[24rem] overflow-hidden shadow-[10px_10px_0_0_var(--color-black)]" : ""}`}
                  data-in-progress={isInProgress ? "true" : undefined}
                  key={`${room}_${itemIndex}_${item.$ref}`}
                >
                  {isInProgress && (
                    <span className="font-display pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-6 border-2 border-black bg-white px-2 py-1 leading-none font-black tracking-widest whitespace-nowrap text-black uppercase shadow-[4px_4px_0_0_var(--color-black)]">
                      {lang.programTile.inProgress}
                    </span>
                  )}
                  <div
                    className={`flex items-center justify-between ${isHonoredGuests ? "bg-black text-white" : `${itemHeaderStyle.bg} ${itemHeaderStyle.text}`} ${cardHeaderPadding}`}
                  >
                    <span
                      className={`font-display font-black uppercase ${cardHeaderTextSize}`}
                    >
                      {item.start} – {item.end}
                    </span>
                    {showPresenterLanguage && presenter?.lang && (
                      <span className="bg-white px-2 py-0.5 text-xs font-black text-black uppercase">
                        {presenter.lang}
                      </span>
                    )}
                  </div>
                  <div
                    className={
                      isHonoredGuests
                        ? "bg-accent flex min-h-[24rem] flex-col items-center justify-center gap-6 p-8 text-center text-black"
                        : cardBodyClassName
                    }
                  >
                    {isHonoredGuests && presenter?.logo && (
                      <div className="print-poster-guest-logo flex h-[clamp(11rem,22vw,17rem)] w-[clamp(17rem,34vw,26rem)] items-center justify-center">
                        <ExportedImage
                          alt={presenter.name}
                          className="h-full w-full object-contain"
                          height={232}
                          loading="eager"
                          src={`/images/promoted/${presenter.logo}`}
                          width={282}
                        />
                      </div>
                    )}
                    {!isHonoredGuests &&
                      (presenter?.name ? (
                        <h4
                          lang={langKey === "cz" ? "cs" : "en"}
                          className={`font-display wrap-break-words ${presenterNameSize} leading-tight font-black hyphens-auto`}
                        >
                          <InlineMarkdown>{presenter.name}</InlineMarkdown>
                        </h4>
                      ) : (
                        <span className="font-display text-sm font-black tracking-widest text-black uppercase">
                          {lang.programTile.inProgress}
                        </span>
                      ))}
                    {presenter?.subheading && (
                      <p className={`${presenterSubheadingSize} text-black/60`}>
                        {presenter.subheading}
                      </p>
                    )}
                    {showPresenterAnnotation &&
                      presenterAnnotations.length > 0 && (
                        <div className={annotationClassName}>
                          {presenterAnnotations.map(
                            (paragraph, annotationIndex) => (
                              <p
                                className={
                                  annotationIndex > 0 ? "mt-2" : undefined
                                }
                                key={`${item.$ref}-annotation-${annotationIndex}`}
                              >
                                {paragraph}
                              </p>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

PrintPoster.displayName = "PrintPoster";

export default PrintPoster;

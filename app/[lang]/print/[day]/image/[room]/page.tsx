"use client";

import { use, useCallback, useRef, useState } from "react";

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
import { toPng } from "html-to-image";
import "./print.css";
import { getRoomCategory, RoomCategory } from "./utils";

const POSTER_BACKGROUNDS = [
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

const POSTER_PATTERNS = [
  { id: "dots", label: "Dots" },
  { id: "lines", label: "Lines" },
  { id: "beans", label: "Beans" },
] as const;

type PosterBackgroundId = (typeof POSTER_BACKGROUNDS)[number]["id"];
type PosterPatternId = (typeof POSTER_PATTERNS)[number]["id"];

const DEFAULT_BACKGROUND_BY_DAY: Record<Day, PosterBackgroundId> = {
  [Day.Saturday]: "salmon",
  [Day.Sunday]: "pink",
};

const DEFAULT_PATTERN_BY_DAY: Record<Day, PosterPatternId> = {
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

const ITEM_HEADER_STYLES: Record<string, { bg: string; text: string }> = {
  brew: { bg: "bg-white", text: "text-black" },
  cupping: { bg: "bg-black", text: "text-white" },
  espresso: { bg: "bg-black", text: "text-white" },
  espresso_milk: { bg: "bg-accent", text: "text-black" },
  lecture: { bg: "bg-white", text: "text-black" },
  party: { bg: "bg-accent", text: "text-black" },
  workshop: { bg: "bg-accent", text: "text-black" },
};

type SchedulePropsType = {
  params: Promise<{ lang: SupportedLanguages; day: Day; room: RoomCategory }>;
};

const Schedule = (props: SchedulePropsType) => {
  const params = use(props.params);
  const ref = useRef<HTMLDivElement>(null);
  const room = getRoomCategory(params.room);
  const lang = dictionaries[params.lang];
  const day = lang.program.find((programDay) => programDay.$ref === params.day);
  const [backgroundId, setBackgroundId] = useState<PosterBackgroundId>(
    DEFAULT_BACKGROUND_BY_DAY[params.day],
  );
  const [patternId, setPatternId] = useState<PosterPatternId>(
    DEFAULT_PATTERN_BY_DAY[params.day],
  );
  const background =
    POSTER_BACKGROUNDS.find(
      (posterBackground) => posterBackground.id === backgroundId,
    ) ?? POSTER_BACKGROUNDS[0];
  const pattern =
    POSTER_PATTERNS.find((posterPattern) => posterPattern.id === patternId) ??
    POSTER_PATTERNS[0];
  const handleButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${params.day}_${room}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  }, [params.day, room]);

  if (!day || !day.schedule.length) {
    return null;
  }

  const schedule = day.schedule.filter((item) => item.track === room);
  const dayDetails = lang.programDays[params.day];
  const scheduleItems = schedule.flatMap((track) =>
    track.schedule.flatMap((column) => column),
  );
  const scheduleColumns = SINGLE_COLUMN_ROOMS.has(room)
    ? 1
    : TWO_COLUMN_ROOMS.has(room)
      ? 2
      : scheduleItems.length <= 1
        ? 1
        : scheduleItems.length <= 4
          ? 2
          : 3;
  const needsCompactSingleColumnSpacing =
    (room === "lecture" || room === "workshop") && scheduleItems.length > 5;
  const needsTopAlignedSingleColumnSpacing =
    SINGLE_COLUMN_ROOMS.has(room) && scheduleItems.length >= 5;
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

  if (!schedule.length || !scheduleItems.length || !dayDetails) {
    return null;
  }

  return (
    <main className="image relative flex min-h-screen flex-col items-center gap-6 overflow-x-auto bg-white p-3 md:p-6">
      <div className="print-controls z-50 flex max-w-full flex-col gap-4 pb-4">
        <div className="flex items-center gap-5">
          <button
            className="font-display bg-black px-4 py-2 text-sm font-black tracking-wider text-white uppercase transition-transform hover:-translate-y-1"
            onClick={handleButtonClick}
            type="button"
          >
            {params.lang === "cz" ? "Uložit obrázek" : "Save image"}
          </button>
          <a
            className="font-display text-sm font-black tracking-wider text-black uppercase underline decoration-2 underline-offset-4 transition-transform hover:-translate-y-1"
            href={`/${params.lang}/print`}
          >
            ← {params.lang === "cz" ? "Zpět" : "Back"}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-black uppercase">
            <span className="opacity-60">Background</span>
            <select
              className="min-w-32 cursor-pointer border-b-2 border-black bg-transparent px-0.5 py-1 text-xs font-black tracking-wide uppercase outline-none"
              id="poster-background"
              name="poster-background"
              onChange={(event) =>
                setBackgroundId(event.target.value as PosterBackgroundId)
              }
              value={backgroundId}
            >
              {POSTER_BACKGROUNDS.map((posterBackground) => (
                <option key={posterBackground.id} value={posterBackground.id}>
                  {posterBackground.label}
                </option>
              ))}
            </select>
          </label>
          <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-black uppercase">
            <span className="opacity-60">Pattern</span>
            <select
              className="min-w-32 cursor-pointer border-b-2 border-black bg-transparent px-0.5 py-1 text-xs font-black tracking-wide uppercase outline-none"
              id="poster-pattern"
              name="poster-pattern"
              onChange={(event) =>
                setPatternId(event.target.value as PosterPatternId)
              }
              value={patternId}
            >
              {POSTER_PATTERNS.map((posterPattern) => (
                <option key={posterPattern.id} value={posterPattern.id}>
                  {posterPattern.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div
        ref={ref}
        className={`print-poster relative flex aspect-square w-[68rem] flex-col overflow-hidden border-4 border-black p-[6%] ${background.className} ${background.ink}`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {pattern.id === "beans" ? (
            <BeanGrid />
          ) : (
            <div
              className={`absolute inset-0 ${pattern.id === "dots" ? "bg-dots" : "bg-lines"}`}
            />
          )}
        </div>

        <div className="font-display absolute top-[3%] left-[4%] z-10 flex items-center gap-2 font-black tracking-tight uppercase">
          <span className="block h-[clamp(2.5rem,4vw,3.5rem)] w-[clamp(2.5rem,4vw,3.5rem)]">
            <BeanIcon />
          </span>
        </div>

        <div className="font-display absolute top-[3%] right-[4%] z-10 text-right font-black uppercase">
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.06em]">
            {dayDetails.name}
          </h2>
          <span className="mt-1 block text-[clamp(1.75rem,3vw,2.75rem)] leading-none tracking-[-0.06em] opacity-60">
            {dayDetails.date}
          </span>
        </div>

        <div
          className={`z-10 flex flex-col items-center ${needsCompactSingleColumnSpacing ? "pt-[4rem]" : "pt-[4.5rem]"} text-center`}
        >
          <h1 className="font-display mt-7 max-w-full text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.2] font-black tracking-[-0.08em] uppercase">
            {isHonoredGuests
              ? lang.promoted.roasters.honoredTitle
              : lang.programCategory[room]}
          </h1>
        </div>

        <div
          className={`z-10 grid min-h-0 flex-1 px-[2%] ${needsCompactSingleColumnSpacing ? "content-start gap-0.5 pt-2" : needsTopAlignedSingleColumnSpacing ? "content-start gap-[2%] pt-[6%]" : "content-center gap-[2%] pt-[6%]"}`}
          style={{
            gridTemplateColumns: `repeat(${scheduleColumns}, minmax(0, 1fr))`,
          }}
        >
          {scheduleItems.map((item, itemIndex) => {
            const presenter = lang.presenters[
              item.$ref as keyof typeof lang.presenters
            ] as Presenter | undefined;
            const isInProgress = presenter?.in_progress === true;

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
                  className={`flex items-center justify-between ${isHonoredGuests ? "bg-black px-6 py-4 text-white" : `px-4 py-2 ${itemHeaderStyle.bg} ${itemHeaderStyle.text}`}`}
                >
                  <span
                    className={`font-display font-black uppercase ${isHonoredGuests ? "text-lg tracking-wide" : "text-sm"}`}
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
                      : "bg-white p-4 text-black"
                  }
                >
                  {isHonoredGuests && presenter?.logo && (
                    <div className="flex h-[clamp(11rem,22vw,17rem)] w-[clamp(17rem,34vw,26rem)] items-center justify-center">
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
                        lang={params.lang === "cz" ? "cs" : "en"}
                        className="font-display wrap-break-words text-lg leading-tight font-black hyphens-auto"
                      >
                        <InlineMarkdown>{presenter.name}</InlineMarkdown>
                      </h4>
                    ) : (
                      <span className="font-display text-sm font-black tracking-widest text-black uppercase">
                        {lang.programTile.inProgress}
                      </span>
                    ))}
                  {presenter?.subheading && (
                    <p
                      className={`${isHonoredGuests ? "text-lg" : "mt-1 text-base"} text-black/60`}
                    >
                      {presenter.subheading}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Schedule;

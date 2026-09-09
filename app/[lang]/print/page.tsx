"use client";

import { use, useCallback, useRef, useState } from "react";
import Link from "next/link";

import BeanIcon from "@/app/icons/beanicon";
import dictionaries, { Day, SupportedLanguages } from "@/app/dictionaries/all";
import { toPng } from "html-to-image";
import PrintPoster, {
  DEFAULT_BACKGROUND_BY_DAY,
  DEFAULT_PATTERN_BY_DAY,
  POSTER_BACKGROUNDS,
  POSTER_PATTERNS,
  PosterBackgroundId,
  PosterPatternId,
} from "./PrintPoster";
import { getRoomCategory, PrintRoomSlug } from "./utils";
import "./print.css";

const PRINT_ROOMS = [
  { category: "espresso_milk", slug: "espresso_milk" },
  { category: "espresso", slug: "espresso" },
  { category: "brew", slug: "brew" },
  { category: "cupping", slug: "cupping" },
  { category: "workshop", slug: "stolarna" },
  { category: "lecture", slug: "kaple" },
] as const;

const A3_ROOMS = [
  { category: "overview", slug: "overview" },
  { category: "cupping", slug: "cupping" },
  { category: "workshop", slug: "stolarna" },
  { category: "lecture", slug: "kaple" },
] as const;

const A4_ROOMS = [
  { category: "brew", slug: "brew" },
  { category: "espresso", slug: "espresso" },
] as const;

const DISPLAY_ROOMS = [{ category: "lecture", slug: "kaple" }] as const;

const DIGITAL_PORTRAIT_ROOMS = [
  { category: "cupping", slug: "cupping" },
  { category: "workshop", slug: "stolarna" },
  { category: "lecture", slug: "kaple" },
] as const;

type InstagramRoomSlug = (typeof PRINT_ROOMS)[number]["slug"];
type A3RoomSlug = (typeof A3_ROOMS)[number]["slug"];
type A4RoomSlug = (typeof A4_ROOMS)[number]["slug"];
type DigitalPortraitRoomSlug = (typeof DIGITAL_PORTRAIT_ROOMS)[number]["slug"];

const PRINT_DAYS = [Day.Saturday, Day.Sunday] as const;
type ExportFormat = "instagram" | "a3" | "a4" | "display" | "displayPortrait";

type PrintPropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Print = (props: PrintPropsType) => {
  const params = use(props.params);
  const lang = dictionaries[params.lang];
  const posterRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<Day>(Day.Saturday);
  const [selectedInstagramRoomSlug, setSelectedInstagramRoomSlug] =
    useState<InstagramRoomSlug>("espresso_milk");
  const [selectedA3RoomSlug, setSelectedA3RoomSlug] =
    useState<A3RoomSlug>("overview");
  const [selectedA3RowIndex, setSelectedA3RowIndex] = useState(0);
  const [selectedA4RoomSlug, setSelectedA4RoomSlug] =
    useState<A4RoomSlug>("brew");
  const [selectedA4RowIndex, setSelectedA4RowIndex] = useState(0);
  const [selectedDisplayTalkRef, setSelectedDisplayTalkRef] = useState("");
  const [selectedDigitalPortraitRoomSlug, setSelectedDigitalPortraitRoomSlug] =
    useState<DigitalPortraitRoomSlug>("cupping");
  const [backgroundId, setBackgroundId] = useState<PosterBackgroundId>(
    DEFAULT_BACKGROUND_BY_DAY[Day.Saturday],
  );
  const [patternId, setPatternId] = useState<PosterPatternId>(
    DEFAULT_PATTERN_BY_DAY[Day.Saturday],
  );
  const [exportFormat, setExportFormat] = useState<ExportFormat>("instagram");
  const selectedRoomSlug: PrintRoomSlug =
    exportFormat === "a3"
      ? selectedA3RoomSlug
      : exportFormat === "a4"
        ? selectedA4RoomSlug
        : exportFormat === "display"
          ? "kaple"
          : exportFormat === "displayPortrait"
            ? selectedDigitalPortraitRoomSlug
            : selectedInstagramRoomSlug;
  const roomOptions =
    exportFormat === "a3"
      ? A3_ROOMS
      : exportFormat === "a4"
        ? A4_ROOMS
        : exportFormat === "display"
          ? DISPLAY_ROOMS
          : exportFormat === "displayPortrait"
            ? DIGITAL_PORTRAIT_ROOMS
            : PRINT_ROOMS;
  const isDigitalPortrait = exportFormat === "displayPortrait";
  const isDigitalPreview = exportFormat === "display" || isDigitalPortrait;
  const isTimelinePreview =
    exportFormat === "a3" && selectedA3RoomSlug === "overview";
  const selectedLectureItems =
    lang.program
      .find((programDay) => programDay.$ref === selectedDay)
      ?.schedule.find((track) => track.track === "lecture")
      ?.schedule.flat() ?? [];
  const activeDisplayTalkRef = selectedLectureItems.some(
    (item) => item.$ref === selectedDisplayTalkRef,
  )
    ? selectedDisplayTalkRef
    : selectedLectureItems[0]?.$ref;
  const selectedA4Rows =
    lang.program
      .find((programDay) => programDay.$ref === selectedDay)
      ?.schedule.find(
        (track) => track.track === getRoomCategory(selectedA4RoomSlug),
      )?.schedule ?? [];
  const selectedA3Rows =
    selectedA3RoomSlug === "stolarna"
      ? (lang.program
          .find((programDay) => programDay.$ref === selectedDay)
          ?.schedule.find((track) => track.track === "workshop")?.schedule ??
        [])
      : [];
  const activeA3RowIndex = Math.min(
    selectedA3RowIndex,
    Math.max(selectedA3Rows.length - 1, 0),
  );
  const activeA4RowIndex = Math.min(
    selectedA4RowIndex,
    Math.max(selectedA4Rows.length - 1, 0),
  );

  const handleDayChange = useCallback((nextDay: Day) => {
    setSelectedDay(nextDay);
    setBackgroundId(DEFAULT_BACKGROUND_BY_DAY[nextDay]);
    setPatternId(DEFAULT_PATTERN_BY_DAY[nextDay]);
    setSelectedA3RowIndex(0);
    setSelectedA4RowIndex(0);
    setSelectedDisplayTalkRef("");
  }, []);

  const handleFormatChange = useCallback((nextFormat: ExportFormat) => {
    setExportFormat(nextFormat);
    setSelectedA3RowIndex(0);
    setSelectedA4RowIndex(0);
    if (nextFormat === "display") {
      setSelectedDisplayTalkRef("");
    }
  }, []);

  const handleButtonClick = () => {
    if (posterRef.current === null) {
      return;
    }

    const isPngExport =
      exportFormat === "instagram" ||
      exportFormat === "display" ||
      isDigitalPortrait;

    if (!isPngExport) {
      window.print();
      return;
    }

    const room =
      exportFormat === "display"
        ? "lecture"
        : getRoomCategory(
            isDigitalPortrait
              ? selectedDigitalPortraitRoomSlug
              : selectedInstagramRoomSlug,
          );
    const filename =
      exportFormat === "display"
        ? `${selectedDay}_${room}_${activeDisplayTalkRef ?? "talk"}.png`
        : isDigitalPortrait
          ? `${selectedDay}_${room}_portrait.png`
          : `${selectedDay}_${room}.png`;

    toPng(posterRef.current, {
      backgroundColor: isDigitalPortrait ? "transparent" : undefined,
      cacheBust: true,
      pixelRatio: 2,
      style: {
        border: "none",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  };

  return (
    <main className="relative min-h-screen bg-white text-black">
      <nav className="print-studio-chrome relative z-10 flex justify-between border-b-4 border-black bg-black px-6 py-5 text-white md:py-6">
        <Link
          href={`/${params.lang}`}
          className="group flex items-center gap-3 text-white"
        >
          <span className="text-accent block h-10 w-10 transition-transform group-hover:rotate-12">
            <BeanIcon />
          </span>
          <span className="font-display text-sm font-black tracking-tight uppercase md:text-base">
            Roast! <span className="opacity-50">/ Print studio</span>
          </span>
        </Link>
        <div className="grid grid-cols-3 gap-x-6">
          <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
            <span className="text-white/60">Day</span>
            <select
              className="min-w-32 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
              id="print-day"
              name="print-day"
              onChange={(event) => handleDayChange(event.target.value as Day)}
              value={selectedDay}
            >
              {PRINT_DAYS.map((dayKey) => (
                <option key={dayKey} value={dayKey}>
                  {lang.programDays[dayKey].name}
                </option>
              ))}
            </select>
          </label>

          {!isDigitalPortrait && (
            <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
              <span className="text-white/60">Background</span>
              <select
                className="min-w-32 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
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
          )}
          <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
            <span className="text-white/60">Format</span>
            <select
              className="min-w-32 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
              id="print-format"
              name="print-format"
              onChange={(event) =>
                handleFormatChange(event.target.value as ExportFormat)
              }
              value={exportFormat}
            >
              <option value="instagram">Instagram PNG</option>
              <option value="a3">A3 PDF</option>
              <option value="a4">A4 PDF</option>
              <option value="display">Digital (16:9)</option>
              <option value="displayPortrait">Digital portrait (9:16)</option>
            </select>
          </label>

          <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
            <span className="text-white/60">
              {exportFormat === "a3" ? "View" : "Track"}
            </span>
            <select
              className="min-w-44 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
              id="print-track"
              name="print-track"
              onChange={(event) => {
                if (exportFormat === "a3") {
                  setSelectedA3RoomSlug(event.target.value as A3RoomSlug);
                  setSelectedA3RowIndex(0);
                } else if (exportFormat === "a4") {
                  setSelectedA4RoomSlug(event.target.value as A4RoomSlug);
                  setSelectedA4RowIndex(0);
                } else if (exportFormat === "display") {
                  setSelectedDisplayTalkRef(event.target.value);
                } else if (exportFormat === "displayPortrait") {
                  setSelectedDigitalPortraitRoomSlug(
                    event.target.value as DigitalPortraitRoomSlug,
                  );
                } else {
                  setSelectedInstagramRoomSlug(
                    event.target.value as InstagramRoomSlug,
                  );
                }
              }}
              value={selectedRoomSlug}
            >
              {roomOptions.map(({ category, slug }) => (
                <option key={slug} value={slug}>
                  {
                    lang.programCategory[
                      category as keyof typeof lang.programCategory
                    ]
                  }
                </option>
              ))}
            </select>
          </label>

          {exportFormat === "display" && (
            <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
              <span className="text-white/60">Talk</span>
              <select
                className="max-w-60 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
                id="print-talk"
                name="print-talk"
                onChange={(event) =>
                  setSelectedDisplayTalkRef(event.target.value)
                }
                value={activeDisplayTalkRef ?? ""}
              >
                {selectedLectureItems.map((item) => {
                  const presenter =
                    lang.presenters[item.$ref as keyof typeof lang.presenters];
                  return (
                    <option key={item.$ref} value={item.$ref}>
                      {item.start} · {presenter?.subheading ?? item.$ref}
                    </option>
                  );
                })}
              </select>
            </label>
          )}

          {exportFormat === "a4" && (
            <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
              <span className="text-white/60">Row</span>
              <select
                className="min-w-32 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
                id="print-row"
                name="print-row"
                onChange={(event) =>
                  setSelectedA4RowIndex(Number(event.target.value))
                }
                value={activeA4RowIndex}
              >
                {selectedA4Rows.map((_, rowIndex) => (
                  <option key={rowIndex} value={rowIndex}>
                    Row {rowIndex + 1}
                  </option>
                ))}
              </select>
            </label>
          )}

          {exportFormat === "a3" && selectedA3RoomSlug === "stolarna" && (
            <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
              <span className="text-white/60">Track</span>
              <select
                className="min-w-32 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
                id="print-workshop-track"
                name="print-workshop-track"
                onChange={(event) =>
                  setSelectedA3RowIndex(Number(event.target.value))
                }
                value={activeA3RowIndex}
              >
                {selectedA3Rows.map((_, rowIndex) => (
                  <option key={rowIndex} value={rowIndex}>
                    Track {rowIndex + 1}
                  </option>
                ))}
              </select>
            </label>
          )}

          {!isDigitalPortrait && (
            <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
              <span className="text-white/60">Pattern</span>
              <select
                className="min-w-32 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
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
          )}
        </div>

        <div className="flex items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase md:gap-3 md:text-sm">
            <Link
              href={params.lang === "cz" ? "/en/print" : "/cz/print"}
              hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
              rel="alternate"
              className="font-display border-4 border-white px-3 py-2 tracking-wider text-white hover:-rotate-2"
            >
              {params.lang === "cz" ? "EN" : "CZ"}
            </Link>
          </div>
          <button
            className="font-display bg-accent border-accent w-40 border-4 px-4 py-2 text-sm font-black tracking-wider text-black uppercase transition-transform hover:-translate-y-1"
            onClick={handleButtonClick}
            type="button"
          >
            {params.lang === "cz" ? "Uložit" : "Save"}
          </button>
        </div>
      </nav>

      <section
        className={`image relative z-10 mx-auto flex justify-center overflow-x-auto px-6 pt-8 pb-20 md:pt-12 ${isTimelinePreview ? "print-preview-timeline" : isDigitalPreview ? "print-preview-display" : "max-w-7xl"}`}
      >
        <div className="pb-4">
          <PrintPoster
            ref={posterRef}
            backgroundId={backgroundId}
            dayKey={selectedDay}
            isA3={exportFormat === "a3"}
            isA4={exportFormat === "a4"}
            isDigitalDisplay={exportFormat === "display"}
            isDigitalPortrait={isDigitalPortrait}
            langKey={params.lang}
            patternId={patternId}
            roomSlug={selectedRoomSlug}
            rowIndex={
              exportFormat === "a4"
                ? activeA4RowIndex
                : exportFormat === "a3" && selectedA3RoomSlug === "stolarna"
                  ? activeA3RowIndex
                  : undefined
            }
            talkRef={
              exportFormat === "display" ? activeDisplayTalkRef : undefined
            }
          />
        </div>
      </section>
    </main>
  );
};

export default Print;

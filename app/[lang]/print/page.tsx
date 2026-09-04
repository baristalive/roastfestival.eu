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
import { getRoomCategory, RoomCategory } from "./utils";
import "./print.css";

const PRINT_ROOMS = [
  { category: "espresso_milk", slug: "espresso_milk" },
  { category: "espresso", slug: "espresso" },
  { category: "brew", slug: "brew" },
  { category: "cupping", slug: "cupping" },
  { category: "workshop", slug: "stolarna" },
  { category: "lecture", slug: "kaple" },
] as const;

const PRINT_DAYS = [Day.Saturday, Day.Sunday] as const;

type PrintPropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Print = (props: PrintPropsType) => {
  const params = use(props.params);
  const lang = dictionaries[params.lang];
  const posterRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<Day>(Day.Saturday);
  const [selectedRoomSlug, setSelectedRoomSlug] =
    useState<RoomCategory>("espresso_milk");
  const [backgroundId, setBackgroundId] = useState<PosterBackgroundId>(
    DEFAULT_BACKGROUND_BY_DAY[Day.Saturday],
  );
  const [patternId, setPatternId] = useState<PosterPatternId>(
    DEFAULT_PATTERN_BY_DAY[Day.Saturday],
  );

  const handleDayChange = useCallback((nextDay: Day) => {
    setSelectedDay(nextDay);
    setBackgroundId(DEFAULT_BACKGROUND_BY_DAY[nextDay]);
    setPatternId(DEFAULT_PATTERN_BY_DAY[nextDay]);
  }, []);

  const handleButtonClick = useCallback(() => {
    if (posterRef.current === null) {
      return;
    }

    const room = getRoomCategory(selectedRoomSlug);

    toPng(posterRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${selectedDay}_${room}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  }, [selectedDay, selectedRoomSlug]);

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
        <div className="flex items-center gap-x-6 gap-y-3">
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

          <label className="font-display flex items-center gap-2 text-xs font-black tracking-wider text-white uppercase">
            <span className="text-white/60">Track</span>
            <select
              className="min-w-44 cursor-pointer border-b-2 border-white/60 bg-transparent px-0.5 py-1 text-xs font-black tracking-wide text-white uppercase outline-none"
              id="print-track"
              name="print-track"
              onChange={(event) =>
                setSelectedRoomSlug(event.target.value as RoomCategory)
              }
              value={selectedRoomSlug}
            >
              {PRINT_ROOMS.map(({ category, slug }) => (
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

          <button
            className="font-display bg-accent order-last border-4 border-black px-4 py-2 text-sm font-black tracking-wider text-black uppercase transition-transform hover:-translate-y-1"
            onClick={handleButtonClick}
            type="button"
          >
            {params.lang === "cz" ? "Uložit" : "Save"}
          </button>

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
        </div>
      </nav>

      <section className="image relative z-10 mx-auto flex max-w-7xl justify-center overflow-x-auto px-6 pt-8 pb-20 md:pt-12">
        <div className="pb-4">
          <PrintPoster
            ref={posterRef}
            backgroundId={backgroundId}
            dayKey={selectedDay}
            langKey={params.lang}
            patternId={patternId}
            roomSlug={selectedRoomSlug}
          />
        </div>
      </section>
    </main>
  );
};

export default Print;

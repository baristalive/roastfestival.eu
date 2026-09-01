"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  AllTracks,
  dictionaries,
  SupportedLanguages,
  Track,
} from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";
import Filter from "@/app/icons/filter";
import DaySchedule from "./components/DaySchedule";
import { ProgramHelp } from "./components/ProgramHelp";

export type ViewMode = "schedule" | "list";

const STORAGE_HELP = "program_help_displayed_2026";
const STORAGE_TRACKS = "schedule_filter_tracks_2026";
const STORAGE_VIEW = "schedule_view";

function readStorage<T>(key: string, fallback: T, parse?: (v: string) => T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  return parse ? parse(raw) : (raw.split(",") as T);
}

const TRACK_COLORS: Record<string, string> = {
  brew: "bg-white",
  cupping: "bg-primary",
  espresso: "bg-black",
  espresso_milk: "bg-accent",
  lecture: "bg-black",
  party: "bg-white",
  workshop: "bg-accent",
};

const DAY_THEMES = [
  {
    bg: "bg-secondary",
    bgPattern: "bg-dots",
    modalBg: "bg-primary bg-lines",
    text: "text-black",
  },
  {
    bg: "bg-primary",
    bgPattern: "bg-lines",
    modalBg: "bg-secondary bg-dots",
    text: "text-white",
  },
] as const;

export default function ProgramPage() {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const pageRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const toolbar = toolbarRef.current;
    if (!page || !toolbar) return;

    const updateToolbarHeight = () => {
      page.style.setProperty(
        "--program-toolbar-height",
        `${toolbar.getBoundingClientRect().height}px`,
      );
    };

    updateToolbarHeight();
    const observer = new ResizeObserver(updateToolbarHeight);
    observer.observe(toolbar);

    return () => {
      observer.disconnect();
      page.style.removeProperty("--program-toolbar-height");
    };
  }, []);

  const [tracks, setTracks] = useState(() =>
    readStorage(STORAGE_TRACKS, AllTracks),
  );
  const [showHelp, setShowHelp] = useState(false);
  const [view, setView] = useState<ViewMode>(() =>
    readStorage(
      STORAGE_VIEW,
      (typeof window !== "undefined" && window.innerWidth >= 1024
        ? "schedule"
        : "list") as ViewMode,
      (v) => v as ViewMode,
    ),
  );

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_HELP) === "true") return;
      localStorage.setItem(STORAGE_HELP, "true");
    } catch {
      // Still show the guidance when browser storage is unavailable.
    }
    // Intentional: read local storage after mount to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowHelp(true);
  }, []);

  const toggleTrack = (track: Track) => {
    const next = tracks.includes(track)
      ? tracks.filter((t) => t !== track)
      : [...tracks, track];
    setTracks(next);
    localStorage.setItem(STORAGE_TRACKS, next.join(","));
  };

  const [showFilters, setShowFilters] = useState(false);

  const toggleView = () => {
    const next: ViewMode = view === "list" ? "schedule" : "list";
    setView(next);
    localStorage.setItem(STORAGE_VIEW, next);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-black">
      {/* Sticky toolbar */}
      <div
        ref={toolbarRef}
        className="sticky top-0 z-50 border-y-4 border-black bg-black px-4 py-3 md:px-6 md:py-4"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 md:gap-3">
          {/* Left: home + title */}
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={`/${params.lang}`}
              className="text-accent block h-8 w-8 shrink-0 transition-transform hover:rotate-12"
            >
              <BeanIcon />
            </Link>
            <h1 className="font-display text-md truncate font-black tracking-tighter text-white uppercase md:text-xl">
              {lang.programTile.title}
            </h1>
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Track filters — always visible on md+ */}
            <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3">
              {AllTracks.map((track) => {
                const active = tracks.includes(track);
                return (
                  <button
                    key={track}
                    onClick={() => toggleTrack(track)}
                    className={`flex items-center gap-1.5 text-xs font-bold uppercase transition-all ${
                      active
                        ? "text-white"
                        : "text-white/25 line-through decoration-white/25 hover:text-white/50"
                    }`}
                  >
                    <span
                      className={`inline-block h-2.5 w-2.5 border border-white/40 ${TRACK_COLORS[track] || "bg-white"} ${
                        !active ? "opacity-30" : ""
                      }`}
                    />
                    {
                      lang.programCategory[
                        track as keyof typeof lang.programCategory
                      ]
                    }
                  </button>
                );
              })}
            </div>

            {/* Filter toggle — mobile only */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`relative text-white transition-all md:hidden ${showFilters ? "text-accent" : ""}`}
              aria-label="Toggle filters"
            >
              <Filter />
              {tracks.length < AllTracks.length && (
                <span className="bg-accent absolute -top-1 -right-1 h-2 w-2 rounded-full" />
              )}
            </button>

            <button
              onClick={toggleView}
              className="font-display shrink-0 bg-white/10 p-1.5 text-white transition-all hover:bg-white/20 md:px-3 md:py-1 md:text-xs md:font-black md:uppercase"
              aria-label={view === "list" ? "Timeline" : "List"}
            >
              {view === "list" ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 14"
                    className="h-4 w-5 fill-current md:hidden"
                  >
                    <rect x="0" y="0" width="20" height="2" rx="1" />
                    <rect x="4" y="4" width="16" height="2" rx="1" />
                    <rect x="2" y="8" width="14" height="2" rx="1" />
                    <rect x="6" y="12" width="14" height="2" rx="1" />
                  </svg>
                  <span className="hidden md:inline">Timeline</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 14"
                    className="h-4 w-5 fill-current md:hidden"
                  >
                    <rect x="0" y="0" width="4" height="2" rx="1" />
                    <rect x="6" y="0" width="14" height="2" rx="1" />
                    <rect x="0" y="4" width="4" height="2" rx="1" />
                    <rect x="6" y="4" width="14" height="2" rx="1" />
                    <rect x="0" y="8" width="4" height="2" rx="1" />
                    <rect x="6" y="8" width="14" height="2" rx="1" />
                    <rect x="0" y="12" width="4" height="2" rx="1" />
                    <rect x="6" y="12" width="14" height="2" rx="1" />
                  </svg>
                  <span className="hidden md:inline">List</span>
                </>
              )}
            </button>
            <Link
              href={params.lang === "cz" ? "/en/program" : "/cz/program"}
              hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
              rel="alternate"
              className="border-accent bg-accent font-display shrink-0 border-2 px-2 py-1 text-xs font-black tracking-wider text-black uppercase transition-all hover:-rotate-2 hover:bg-white hover:text-black md:border-4 md:px-4 md:text-sm md:tracking-widest"
            >
              {params.lang === "cz" ? "EN" : "CZ"}
            </Link>
          </div>
        </div>

        {/* Mobile filter panel */}
        {showFilters && (
          <div className="mt-3 flex flex-wrap gap-3 border-t border-white/10 pt-3 md:hidden">
            {AllTracks.map((track) => {
              const active = tracks.includes(track);
              return (
                <button
                  key={track}
                  onClick={() => toggleTrack(track)}
                  className={`flex items-center gap-1.5 text-xs font-bold uppercase transition-all ${
                    active
                      ? "text-white"
                      : "text-white/25 line-through decoration-white/25 hover:text-white/50"
                  }`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 border border-white/40 ${TRACK_COLORS[track] || "bg-white"} ${
                      !active ? "opacity-30" : ""
                    }`}
                  />
                  {
                    lang.programCategory[
                      track as keyof typeof lang.programCategory
                    ]
                  }
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Day sections — each full-width with its own color */}
      <div className={`schedule-style-${view}`}>
        {lang.program.map((day, idx) => {
          const theme = DAY_THEMES[idx % DAY_THEMES.length];
          return (
            <section
              key={day.$ref}
              className={`${theme.bg} ${theme.bgPattern} px-4 pt-10 pb-16 md:px-8`}
            >
              <div className="mx-auto mb-8 max-w-7xl md:mb-12">
                <h2
                  className={`font-display text-4xl font-black uppercase md:text-8xl ${theme.text}`}
                >
                  {lang.programDays[day.$ref].name}
                </h2>
                <span
                  className={`font-display text-3xl font-black md:text-5xl ${theme.text} opacity-60`}
                >
                  {lang.programDays[day.$ref].date}
                </span>
              </div>
              <div className={view === "schedule" ? "-mx-4 md:-mx-8" : ""}>
                <DaySchedule
                  schedule={day.schedule}
                  tracks={tracks}
                  view={view}
                  dayBg={theme.bg}
                  modalBg={theme.modalBg}
                />
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer strip */}
      <div className="border-t-4 border-black bg-black px-4 py-6 text-center">
        <p className="font-display text-xs font-bold tracking-widest text-white/30 uppercase">
          {lang.programDisclaimer}
        </p>
      </div>

      {showHelp && (
        <ProgramHelp
          copy={lang.programHelp}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}

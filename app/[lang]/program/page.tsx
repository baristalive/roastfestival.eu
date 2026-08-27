"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  AllTracks,
  dictionaries,
  SupportedLanguages,
  Track,
} from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";
import DaySchedule from "./components/DaySchedule";

export type ViewMode = "schedule" | "list";

const STORAGE_TRACKS = "schedule_filter_tracks";
const STORAGE_VIEW = "schedule_view";

function readStorage<T>(key: string, fallback: T, parse?: (v: string) => T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  return parse ? parse(raw) : (raw.split(",") as T);
}

const TRACK_COLORS: Record<string, string> = {
  brew: "bg-white",
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

  const [tracks, setTracks] = useState(() =>
    readStorage(STORAGE_TRACKS, AllTracks),
  );
  const [view, setView] = useState<ViewMode>(() =>
    readStorage(
      STORAGE_VIEW,
      (typeof window !== "undefined" && window.innerWidth >= 1024
        ? "schedule"
        : "list") as ViewMode,
      (v) => v as ViewMode,
    ),
  );

  const toggleTrack = (track: Track) => {
    const next = tracks.includes(track)
      ? tracks.filter((t) => t !== track)
      : [...tracks, track];
    setTracks(next);
    localStorage.setItem(STORAGE_TRACKS, next.join(","));
  };

  const toggleView = () => {
    const next: ViewMode = view === "list" ? "schedule" : "list";
    setView(next);
    localStorage.setItem(STORAGE_VIEW, next);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-50 border-y-4 border-black bg-black px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          {/* Left: home + title */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${params.lang}`}
              className="text-accent block h-8 w-8 transition-transform hover:rotate-12"
            >
              <BeanIcon />
            </Link>
            <h1 className="font-display text-lg font-black tracking-tighter text-white uppercase md:text-xl">
              {lang.programTile.title}
            </h1>
          </div>

          {/* Right: track filters + controls */}
          <div className="flex flex-wrap items-center gap-3">
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
            <button
              onClick={toggleView}
              className="font-display ml-2 bg-white/10 px-3 py-1 text-xs font-black text-white uppercase transition-all hover:bg-white/20"
            >
              {view === "list" ? "Timeline" : "List"}
            </button>
            <Link
              href={params.lang === "cz" ? "/en/program" : "/cz/program"}
              hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
              rel="alternate"
              className="border-accent bg-accent font-display border-4 px-4 py-1 text-sm font-black tracking-widest text-black uppercase transition-all hover:-rotate-2 hover:bg-white hover:text-black"
            >
              {params.lang === "cz" ? "EN" : "CZ"}
            </Link>
          </div>
        </div>
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
                  className={`font-display text-5xl font-black uppercase md:text-8xl ${theme.text}`}
                >
                  {lang.programDays[day.$ref].name}
                </h2>
                <span
                  className={`font-display text-3xl font-black md:text-5xl ${theme.text} opacity-60`}
                >
                  {lang.programDays[day.$ref].date}
                </span>
              </div>
              <DaySchedule
                schedule={day.schedule}
                tracks={tracks}
                view={view}
                dayBg={theme.bg}
                modalBg={theme.modalBg}
              />
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
    </div>
  );
}

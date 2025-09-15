"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import dictionaries, {
  AllDays,
  AllTracks,
  Day,
  SupportedLanguages,
  Track,
} from "../../dictionaries/all";
import {
  FilterDays,
  FilterTracks,
  ScheduleView,
  ScheduleViewType,
} from "./contexts";
import ToolBar from "./components/ToolBar";
import { useParams } from "next/navigation";
import DaySchedule from "../components/DaySchedule";

const SCHEDULE_FILTER_DAYS = "schedule_filter_days";
const SCHEDULE_FILTER_TRACKS = "schedule_filter_tracks";
const SCHEDULE_VIEW = "schedule_view";

const Home = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const [selectedDays, setSelectedDays] = useState(AllDays);
  const [selectedTracks, setSelectedTracks] = useState(AllTracks);
  const [scheduleView, setScheduleView] = useState(
    "loading" as ScheduleViewType,
  );

  const handleSelectedDays = (day: Day) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newSelectedDays);
    localStorage.setItem(SCHEDULE_FILTER_DAYS, newSelectedDays.join(","));
  };

  const handleSelectedTracks = (track: Track) => {
    const newSelectedTracks = selectedTracks.includes(track)
      ? selectedTracks.filter((t) => t !== track)
      : [...selectedTracks, track];
    setSelectedTracks(newSelectedTracks);
    localStorage.setItem(SCHEDULE_FILTER_TRACKS, newSelectedTracks.join(","));
  };

  const handleScheduleView = () => {
    if (!window) return;
    const newView = scheduleView === "list" ? "schedule" : "list";
    setScheduleView(newView);
    localStorage.setItem(SCHEDULE_VIEW, newView);
  };

  useEffect(() => {
    const days =
      localStorage.getItem(SCHEDULE_FILTER_DAYS)?.split(",") || AllDays;
    setSelectedDays(days as Day[]);
    const tracks =
      localStorage.getItem(SCHEDULE_FILTER_TRACKS)?.split(",") || AllTracks;
    setSelectedTracks(tracks as Track[]);
    const view =
      localStorage.getItem(SCHEDULE_VIEW) ||
      (window.innerWidth < 1024 ? "list" : "schedule");
    setScheduleView(view as ScheduleViewType);
  }, []);

  return (
    <div className="wrapper watermark2 h-screen">
      <Link
        href={params.lang === "cz" ? "/en/program" : "/cz/program"}
        hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {params.lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <div className="flex flex-col-reverse">
        {scheduleView !== "loading" && (
          <div
            className={`flex overflow-scroll scroll-smooth schedule-style-${scheduleView}`}
          >
            {lang.program
              .filter((day) => selectedDays.includes(day.$ref))
              .map((day, idx) => (
                <div
                  className={`flex flex-col p-4`}
                  key={day.$ref}
                >
                  <div className="sticky flex w-full flex-col">
                    <h3 className="ml-4 text-3xl font-medium">
                      {lang.programDays[day.$ref].name}{" "}
                      {lang.programDays[day.$ref].date}
                    </h3>
                    <div className="mr-2 h-4 rounded-t-lg border-2 border-b-0 border-dotted border-[var(--primary)]" />
                  </div>
                  <DaySchedule
                    schedule={day.schedule}
                    tracks={selectedTracks}
                    showTrackHeader={idx === 0 || scheduleView === "list"}
                    appearance={scheduleView}
                    className=""
                  />
                </div>
              ))}
          </div>
        )}
        <div className="flex grid-cols-[1fr,auto,1fr] flex-col items-center lg:grid">
          <h2 className="p-4 pt-32 text-3xl font-bold 2xl:pt-4 2xl:text-6xl">
            {lang.programTile.title}
          </h2>
        </div>
        <div className="flex justify-center">
          <FilterDays
            value={{ selectedDays, toggleSelectedDays: handleSelectedDays }}
          >
            <FilterTracks
              value={{
                selectedTracks,
                toggleSelectedTracks: handleSelectedTracks,
              }}
            >
              <ScheduleView
                value={{ view: scheduleView, setView: handleScheduleView }}
              >
                <ToolBar />
              </ScheduleView>
            </FilterTracks>
          </FilterDays>
        </div>
      </div>
    </div>
  );
};

export default Home;

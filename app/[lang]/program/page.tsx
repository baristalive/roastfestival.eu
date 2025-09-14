"use client";
import { use, useState } from "react";
import Link from "next/link";

import dictionaries, {
  AllDays,
  AllTracks,
  SupportedLanguages,
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
import NavBar from "@/app/components/NavBar";

type HomePropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Home = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const [selectedDays, setSelectedDays] = useState(AllDays);
  const [selectedTracks, setSelectedTracks] = useState(AllTracks);
  const [scheduleView, setScheduleView] = useState(
    "responsive" as ScheduleViewType,
  );

  return (
    <div className="wrapper watermark2">
      <Link
        href={params.lang === "cz" ? "./en" : "./cz"}
        hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {params.lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <div className="flex flex-col-reverse">
        <div
          className={`flex overflow-x-scroll schedule_style_${scheduleView}`}
        >
          {lang.program
            .filter((day) => selectedDays.includes(day.$ref))
            .map((day, idx) => (
              <div className={`flex flex-col p-4 schedule_item_wrapper_style_${scheduleView}`} key={day.$ref}>
                <div className="flex w-full flex-col sticky">
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
        <div className="flex grid-cols-[1fr,auto,1fr] flex-col items-center lg:grid">
          <h2 className="p-4 pt-32 text-3xl font-bold 2xl:pt-4 2xl:text-6xl">
            {lang.programTile.title}
          </h2>
        </div>
        <div className="flex justify-center">
          <FilterDays value={{ selectedDays, setSelectedDays }}>
            <FilterTracks value={{ selectedTracks, setSelectedTracks }}>
              <ScheduleView
                value={{ view: scheduleView, setView: setScheduleView }}
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

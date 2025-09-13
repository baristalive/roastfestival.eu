"use client";
import { use, useState } from "react";
import Link from "next/link";

import dictionaries, { AllDays, AllTracks, SupportedLanguages } from "../../dictionaries/all";
import { FilterDays, FilterTracks } from "./contexts";
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
        <div className="flex overflow-x-scroll">
          {lang.program.filter(day => selectedDays.includes(day.$ref)).map((day, idx) => (
            <div className="min-w-[min(90vw,_1600px)] flex flex-col p-4" key={day.$ref}>
              <div className="flex flex-col w-full">
                <h3 className="font-medium text-3xl ml-4">{lang.programDays[day.$ref].name} {lang.programDays[day.$ref].date}</h3>
                <div className="h-4 border-2 border-[var(--primary)] border-dotted rounded-t-lg border-b-0 mr-2"/>
              </div>
              <DaySchedule
                schedule={day.schedule}
                tracks={selectedTracks}
                showTrackHeader={idx === 0}
                className=""
              />
            </div>
          ))}
        </div>
        <div className="flex grid-cols-[1fr,auto,1fr] flex-col items-center lg:grid">
          <h2 className="p-4 text-3xl font-bold 2xl:text-6xl pt-32 2xl:pt-4">
            {lang.programTitle}
          </h2>
        </div>
        <div className="flex justify-center">
          <FilterDays value={{ selectedDays, setSelectedDays }}>
            <FilterTracks value={{ selectedTracks, setSelectedTracks }}>
              <ToolBar />
            </FilterTracks>
          </FilterDays>
        </div>
      </div>
    </div>
  );
};

export default Home;

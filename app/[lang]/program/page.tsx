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
    <div className="wrapper">
      <Link
        href={params.lang === "cz" ? "./en" : "./cz"}
        hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {params.lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <div>
        <div className="flex justify-center">
          <FilterDays value={{ selectedDays, setSelectedDays }}>
            <FilterTracks value={{ selectedTracks, setSelectedTracks }}>
              <ToolBar />
            </FilterTracks>
          </FilterDays>
        </div>
        <div className="flex grid-cols-[1fr,auto,1fr] flex-col items-center lg:grid">
          <h2 className="p-4 text-3xl font-bold 2xl:text-6xl">
            {lang.programTitle}
          </h2>
        </div>
        <div className="flex overflow-x-scroll">
          {lang.program.filter(day => selectedDays.includes(day.$ref)).map((day, idx) => (
            <div className="min-w-[min(100vw,_1600px)]" key={day.$ref}>
              <DaySchedule
                schedule={day.schedule}
                tracks={selectedTracks}
                showTrackHeader={idx === 0}
                className="-z-10"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

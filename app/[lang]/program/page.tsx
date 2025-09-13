"use client";
import { use, useState } from "react";
import Link from "next/link";

import dictionaries, { SupportedLanguages } from "../../dictionaries/all";
import { Program } from "../sections/Program";
import { FilterDays, FilterTracks } from "./contexts";
import { AllDays, AllTracks } from "./consts";
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
          <FilterDays value={selectedDays}>
            <FilterTracks value={selectedTracks}>
              <ToolBar />
            </FilterTracks>
          </FilterDays>
        </div>
        <div className="flex grid-cols-[1fr,auto,1fr] flex-col items-center lg:grid">
          <h2 className="p-4 text-3xl font-bold 2xl:text-6xl">
            {lang.programTitle}
          </h2>
        </div>
        {lang.program.map((day) => (
          <DaySchedule
            schedule={day.schedule}
            dayRef={day.$ref as keyof typeof lang.programDays}
            key={day.$ref}
            className="-z-10"
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

"use client";
import { use } from "react";

import dictionaries, {
  Day,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import { CSSProperties } from "react";
import "./print.css";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DaySchedule from "@/app/[lang]/components/DaySchedule";
type SchedulePropsType = {
  params: Promise<{ lang: SupportedLanguages; day: Day }>;
};

const Schedule = (props: SchedulePropsType) => {
  const params = use(props.params);

  const lang = dictionaries[params.lang as SupportedLanguages];

  const day = lang.program.filter((d) => d.$ref === params.day)[0];

  if (day?.schedule === undefined || day.schedule.length <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col px-2 pt-2">
      <Header category="overview" />
      <DaySchedule schedule={day.schedule} className="watermark2" />
      <Footer />
    </div>
  );
};

export default Schedule;

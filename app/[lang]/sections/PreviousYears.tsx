"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";

type YearData = {
  year: number;
  tagline: string;
  stats: {
    roasters: number;
    attendees: number;
  };
};

type Labels = {
  attendees: string;
  roasters: string;
  workshops: string;
};

const YearBlock = ({
  attendees,
  beanCount,
  highlight,
  labels,
  roasters,
  year,
}: {
  attendees: number | string;
  beanCount: number;
  labels: Labels;
  roasters: number | string;
  year: number;
  highlight?: boolean;
}) => {
  return (
    <div
      className={`flex w-full flex-col items-center gap-4 p-12 ${highlight ? "bg-accent bg-lines" : "bg-evergreen"}`}
    >
      {/* Year */}
      <span
        className={`font-display text-5xl font-black lg:text-7xl ${highlight ? "text-evergreen" : "text-secondary"}`}
      >
        {year}
      </span>

      {/* Beans cluster */}
      <div className="flex min-h-16 flex-wrap items-center justify-center gap-1 lg:min-h-20">
        {Array.from({ length: beanCount }).map((_, i) => (
          <div
            key={i}
            className={`h-12 w-12 ${highlight ? "text-evergreen" : "text-primary"}`}
          >
            <BeanIcon />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        className={`flex gap-6 text-center ${highlight ? "text-evergreen" : "text-primary"}`}
      >
        <div>
          <span className="font-display block text-2xl font-black lg:text-3xl">
            {attendees.toLocaleString()}
          </span>
          <span className="text-xs font-bold tracking-tight uppercase">
            {labels.attendees}
          </span>
        </div>
        <div>
          <span className="font-display block text-2xl font-black lg:text-3xl">
            {roasters}
          </span>
          <span className="text-xs font-bold tracking-tight uppercase">
            {labels.roasters}
          </span>
        </div>
      </div>
    </div>
  );
};

export const PreviousYears = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const years = lang.lastYear.years as YearData[];
  const labels = lang.lastYear.labels as Labels;

  return (
    <section id="prev-year" className="bg-primary pt-16 lg:pt-24">
      <div className="mx-auto">
        {/* Title */}
        <div className="mb-16 text-center lg:mb-20">
          <h2 className="font-display text-ivory mb-4 text-5xl leading-[0.85] font-black uppercase md:text-6xl">
            {lang.lastYear.title}
          </h2>
          <p className="text-secondary text-2xl tracking-wider uppercase">
            {lang.lastYear.subtitle}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-stretch xl:flex-row">
        {years.map((yearData, index) => (
          <YearBlock
            key={yearData.year}
            attendees={yearData.stats.attendees}
            beanCount={index + 1}
            labels={labels}
            roasters={yearData.stats.roasters}
            year={yearData.year}
          />
        ))}
        <YearBlock
          attendees="?"
          beanCount={4}
          labels={labels}
          roasters="35+"
          year={2026}
          highlight
        />
      </div>
    </section>
  );
};

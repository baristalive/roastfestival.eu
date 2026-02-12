"use client";

import { useParams } from "next/navigation";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";
import { Section } from "@/app/components/Section";

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

const LOCALE_MAP = { cz: "cs-CZ", en: "en-US" } as const;

const formatNumber = (value: number | string, lang: string) => {
  if (typeof value !== "number") return value;
  const locale = LOCALE_MAP[lang as keyof typeof LOCALE_MAP] ?? "en-US";
  return value.toLocaleString(locale);
};

const YearBlock = ({
  attendees,
  beanCount,
  highlight,
  labels,
  lang,
  roasters,
  year,
}: {
  attendees: number | string;
  beanCount: number;
  labels: Labels;
  lang: string;
  roasters: number | string;
  year: number;
  highlight?: boolean;
}) => {
  return (
    <div
      className={`flex w-full flex-col items-center gap-4 py-12 ${highlight ? "bg-accent bg-lines" : "bg-black"}`}
    >
      {/* Year */}
      <span
        className={`font-display text-5xl font-black lg:text-7xl ${highlight ? "text-black" : "text-secondary"}`}
      >
        {year}
      </span>

      {/* Beans cluster */}
      <div className="flex min-h-16 flex-wrap items-center justify-center gap-1 lg:min-h-20">
        {Array.from({ length: beanCount }).map((_, i) => (
          <div
            key={i}
            className={`h-12 w-12 ${highlight ? "text-black" : "text-primary"}`}
          >
            <BeanIcon />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        className={`flex gap-6 text-center ${highlight ? "text-black" : "text-primary"}`}
      >
        <div>
          <span className="font-display block text-2xl font-black lg:text-3xl">
            {formatNumber(attendees, lang)}
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
  const langKey = params.lang as string;
  const lang = dictionaries[langKey as SupportedLanguages];

  const years = lang.lastYear.years as YearData[];
  const labels = lang.lastYear.labels as Labels;

  return (
    <Section id="prev-year" className="bg-primary pt-16 lg:pt-24">
      <div className="mx-auto">
        {/* Title */}
        <div className="mb-16 text-center lg:mb-20">
          <h2 className="font-display mb-4 text-3xl leading-[0.85] font-black text-white uppercase md:text-6xl">
            {lang.lastYear.title}
          </h2>
          <p className="text-accent text-md tracking-wider uppercase md:text-2xl">
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
            lang={langKey}
            labels={labels}
            roasters={yearData.stats.roasters}
            year={yearData.year}
          />
        ))}
        <YearBlock
          attendees="?"
          beanCount={4}
          lang={langKey}
          labels={labels}
          roasters="30+"
          year={2026}
          highlight
        />
      </div>
    </Section>
  );
};

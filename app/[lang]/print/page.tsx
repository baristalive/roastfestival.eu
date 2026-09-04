"use client";

import React, { use } from "react";
import Link from "next/link";

import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import BeanIcon from "@/app/icons/beanicon";

const PRINT_ROOMS = [
  { category: "espresso_milk", slug: "espresso_milk" },
  { category: "espresso", slug: "espresso" },
  { category: "brew", slug: "brew" },
  { category: "cupping", slug: "cupping" },
  { category: "workshop", slug: "stolarna" },
  { category: "lecture", slug: "kaple" },
] as const;

const DAY_STYLES = [
  {
    card: "bg-white hover:bg-accent",
    number: "bg-black text-white",
    panel: "bg-secondary bg-dots",
  },
  {
    card: "bg-secondary hover:bg-accent",
    number: "bg-accent text-black",
    panel: "bg-primary bg-lines",
  },
] as const;

type PrintPropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Print = (props: PrintPropsType) => {
  const params = use(props.params);
  const lang = dictionaries[params.lang];

  return (
    <main className="relative min-h-screen bg-white text-black">
      <nav className="relative z-10 mx-auto flex items-center justify-between gap-4 border-b-4 border-black bg-black px-6 py-5 text-white md:py-7">
        <Link
          href={`/${params.lang}`}
          className="group flex items-center gap-3 text-white"
        >
          <span className="text-accent block h-10 w-10 transition-transform group-hover:rotate-12">
            <BeanIcon />
          </span>
          <span className="font-display text-sm font-black tracking-tight uppercase md:text-base">
            Roast! <span className="opacity-50">/ Print studio</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-bold uppercase md:gap-3 md:text-sm">
          <Link
            href={`/${params.lang}`}
            className="font-display hidden border-4 border-black bg-white px-3 py-2 tracking-wider text-black transition-transform hover:-translate-y-1 md:block"
          >
            {lang.back}
          </Link>
          <Link
            href={params.lang === "cz" ? "/en/print" : "/cz/print"}
            hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
            rel="alternate"
            className="font-display bg-accent border-4 border-black px-3 py-2 tracking-wider text-black transition-transform hover:-translate-y-1 hover:-rotate-2"
          >
            {params.lang === "cz" ? "EN" : "CZ"}
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-8 pb-20 md:pt-12">
        <div className="space-y-8 md:space-y-12">
          {Object.entries(lang.programDays).map(([dayKey, day], dayIndex) => {
            const style = DAY_STYLES[dayIndex % DAY_STYLES.length];

            return (
              <section
                className={`border-4 border-black p-5 shadow-[10px_10px_0_var(--color-black)] md:p-8 ${style.panel}`}
                key={dayKey}
              >
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-4 border-black pb-5 md:mb-8 md:pb-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className={`font-display flex h-14 w-14 shrink-0 items-center justify-center text-2xl font-black md:h-20 md:w-20 md:text-4xl ${style.number}`}
                    >
                      {String(dayIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display wrap-break-words text-xs font-black tracking-[0.3em] uppercase opacity-60">
                        Instagram / day {dayIndex + 1}
                      </p>
                      <h2 className="font-display text-4xl leading-none font-black uppercase md:text-6xl">
                        {day.name}
                      </h2>
                    </div>
                  </div>
                  <p className="font-display text-2xl font-black uppercase md:text-3xl">
                    {day.date}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PRINT_ROOMS.map(({ category, slug }) => (
                    <Link
                      href={`/${params.lang}/print/${dayKey}/image/${slug}`}
                      className={`group flex justify-between border-4 border-black p-4 text-black shadow-[5px_5px_0_var(--color-black)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-black)] ${style.card}`}
                      key={slug}
                    >
                      <span className="font-display text-lg leading-none font-black uppercase md:text-xl">
                        {
                          lang.programCategory[
                            category as keyof typeof lang.programCategory
                          ]
                        }
                      </span>
                      <span className="font-display text-2xl font-black transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Print;

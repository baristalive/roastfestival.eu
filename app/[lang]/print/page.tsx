"use client";
import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import Link from "next/link";
import React from "react";

type PrintPropsType = {
  params: { lang: SupportedLanguages };
};

const Print = ({ params }: PrintPropsType) => {
  const lang = dictionaries[params.lang as SupportedLanguages];

  return (
    <div className="wrapper mx-auto h-screen">
      <Link
        href={params.lang === "cz" ? "/en/print" : "/cz/print"}
        hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {params.lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <div className="watermark3 flex h-full flex-col items-center justify-center  gap-4">
        {Object.entries(lang.programDays).map(([k, v]) => (
          <React.Fragment key={k}>
            <h2 className="text-3xl">{v.name}</h2>
            <div className="flex gap-4">
              <Link
                href={`./print/${k}/overview`}
                className=" nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                {lang.programCategory.overview}
              </Link>
              <Link
                href={`./print/${k}/robotarna`}
                className=" nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                Robotárna
              </Link>
              <Link
                href={`./print/${k}/stolarna`}
                className=" nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                {lang.programCategory.workshop}
              </Link>
              <Link
                href={`./print/${k}/kaple`}
                className=" nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                {lang.programCategory.lecture}
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Print;

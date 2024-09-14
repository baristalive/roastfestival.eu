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
    <div className="wrapper h-screen mx-auto">
      <Link
        href={params.lang === "cz" ? "./en" : "./cz"}
        hrefLang={params.lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {params.lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <div className="flex h-full flex-col items-center justify-center gap-4  watermark3">
        {Object.entries(lang.programDays).map(([k, v]) => (
          <React.Fragment key={k}>
            <h2 className="text-3xl">{v.name}</h2>
            <Link
              href={`./print/${k}/overview`}
              className=" nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
            >
              Celý den
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Print;

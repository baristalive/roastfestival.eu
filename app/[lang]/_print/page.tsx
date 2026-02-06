"use client";
import React, { use } from "react";

import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import Link from "next/link";

type PrintPropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Print = (props: PrintPropsType) => {
  const params = use(props.params);

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
      <div className="flex h-full flex-col items-center justify-center gap-4">
        {Object.entries(lang.programDays).map(([k, v]) => (
          <React.Fragment key={k}>
            <h2 className="text-3xl">{v.name} [INSTAGRAM]</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`./print/${k}/image/espresso_milk`}
                className="nav rounded-2xl bg-black p-4 px-8 text-lg text-white"
              >
                Čestní hosté
              </Link>
              <Link
                href={`./print/${k}/image/espresso`}
                className="nav rounded-2xl bg-black p-4 px-8 text-lg text-white"
              >
                Espresso bar
              </Link>
              <Link
                href={`./print/${k}/image/brew`}
                className="nav rounded-2xl bg-black p-4 px-8 text-lg text-white"
              >
                Brew bar
              </Link>
              <Link
                href={`./print/${k}/image/stolarna`}
                className="nav rounded-2xl bg-black p-4 px-8 text-lg text-white"
              >
                {lang.programCategory.workshop}
              </Link>
              <Link
                href={`./print/${k}/image/kaple`}
                className="nav rounded-2xl bg-black p-4 px-8 text-lg text-white"
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

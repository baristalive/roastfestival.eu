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
      <div className="watermark3 flex h-full flex-col items-center justify-center gap-4">
        <h2 className="text-3xl">{lang.print.title}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`./print/pricelist/tickets`}
            className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
          >
            {lang.print.categories.tickets}
          </Link>
          <Link
            href={`./print/pricelist/merch`}
            className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
          >
            {lang.print.categories.merch}
          </Link>
          <Link
            href={`./print/pricelist/drinks`}
            className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
          >
            {lang.print.categories.drinks}
          </Link>
          <Link
            href={`./print/pricelist/rental`}
            className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
          >
            {lang.print.categories.rental}
          </Link>
        </div>
        {Object.entries(lang.programDays).map(([k, v]) => (
          <React.Fragment key={k}>
            <h2 className="text-3xl">{v.name}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`./print/${k}/overview`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                {lang.programCategory.overview}
              </Link>
              <Link
                href={`./print/${k}/robotarna`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                Robotárna
              </Link>
              <Link
                href={`./print/${k}/stolarna`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                {lang.programCategory.workshop}
              </Link>
              <Link
                href={`./print/${k}/kaple`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                {lang.programCategory.lecture}
              </Link>
            </div>
            <h2 className="text-3xl">{v.name} [INSTAGRAM]</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`./print/${k}/image/espresso_milk`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                Čestní hosté
              </Link>
              <Link
                href={`./print/${k}/image/espresso`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                Espresso bar
              </Link>
              <Link
                href={`./print/${k}/image/brew`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                Brew bar
              </Link>
              <Link
                href={`./print/${k}/image/stolarna`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
              >
                {lang.programCategory.workshop}
              </Link>
              <Link
                href={`./print/${k}/image/kaple`}
                className="nav rounded-2xl bg-[var(--black)] p-4 px-8 text-lg text-[var(--white)]"
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

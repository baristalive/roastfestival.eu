"use client";
import { use } from 'react';

import Link from "next/link";
import { useEffect, useState } from "react";

import { SupportedLanguages } from "@/app/dictionaries/all";
import { Footer } from "@/app/[lang]/sections/Footer";
import { Info } from "./sections/Info";

type SponsorPropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Sponsor = ({ params }: SponsorPropsType) => {
  const { lang } = use(params);
  const [divClass, toggleDivClass] = useState(false);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        toggleDivClass(!divClass);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [divClass]);

  return (
    <div className={`wrapper ${divClass ? "show" : "hide"}`}>
      <Link
        href={lang === "cz" ? "/en/sponsors" : "/cz/sponsors"}
        hrefLang={lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <Info />
      <Footer />
    </div>
  );
};

export default Sponsor;

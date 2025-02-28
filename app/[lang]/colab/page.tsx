"use client";
import { use } from 'react';
import Link from "next/link";

import { SupportedLanguages } from "@/app/dictionaries/all";
import { Footer } from "@/app/[lang]/sections/Footer";
import { Info } from "./sections/Info";

type ColabPropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Colab = ({ params }: ColabPropsType) => {
  const { lang } = use(params);

  return (
    <>
      <Link
        href={lang === "cz" ? "/en/colab" : "/cz/colab"}
        hrefLang={lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <Info />
      <Footer />
    </>
  );
};

export default Colab;

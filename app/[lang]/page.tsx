"use client";
import Link from "next/link";
import dynamic from "next/dynamic";

import dictionaries, { SupportedLanguages } from "../dictionaries/all";
import { Header } from "./sections/Header";
import { Gallery } from "./sections/Gallery";
import { Program } from "./sections/Program";
import { Info } from "./sections/Info";
import { Colab } from "./sections/Colab";
import { Organizers } from "./sections/Organizers";
import { Footer } from "./sections/Footer";
import { Map } from "./sections/Map";
import { BuyTickets } from "./sections/BuyTickets";
import { OtherServices } from "./sections/OtherServices";
import { useEffect, useState } from "react";
import { PreviousYears } from "./sections/PreviousYears";

const PromotedRoasters = dynamic(() => import("./sections/PromotedRoasters"), {
  ssr: false,
});

type HomePropsType = {
  params: { lang: SupportedLanguages };
};

const Home = ({ params: { lang } }: HomePropsType) => {
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

  const usedLang = dictionaries[lang as SupportedLanguages];

  return (
    <div className={`wrapper ${divClass ? "show" : "hide"}`}>
      <Link
        href={lang === "cz" ? "./en" : "./cz"}
        rel="alternate"
        className="lang inverted text-lg lowercase card z-50"
      >
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <Header />
      <Info />
      <PreviousYears />
      <Gallery />
      <Colab  />
      <Program />
      <Map />

      {/* <About /> */}
      {usedLang.ready && (
        <>
          {/* <BuyTickets className="inverted pt-64" /> */}
          {/* <BuyTickets />
          <OtherServices />
          <BuyTickets className="inverted" />
          <PromotedRoasters /> */}
        </>
      )}
      {/* {usedLang.ready && <BuyTickets className="inverted" />} */}
      <Organizers />
      <Footer />
    </div>
  );
};

export default Home;

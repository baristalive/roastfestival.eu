"use client";
import Link from "next/link";

import  { SupportedLanguages } from "../dictionaries/all";
import { Header } from "./sections/Header";
import { Gallery } from "./sections/Gallery";
import { Program } from "./sections/Program";
import { Info } from "./sections/Info";
import { Colab } from "./sections/Colab";
import { Organizers } from "./sections/Organizers";
import { Footer } from "../components/Footer";
import { Map } from "./sections/Map";
import { useEffect, useState } from "react";
import { PreviousYears } from "./sections/PreviousYears";
import { Tickets } from "./sections/Tickets";
import { WhatToExpect } from "./sections/WhatToExpect";
import { PromotedRoasters } from "./sections/PromotedRoasters";
import { Sponsors } from "./sections/Sponsors";
import InstagramFeed from "./sections/InstagramFeed";

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

  return (
    <div className={`wrapper ${divClass ? "show" : "hide"}`}>
      <Link
        href={lang === "cz" ? "./en" : "./cz"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <Header />
      <PromotedRoasters />
      <InstagramFeed />
      <Program />
      <Info />
      <Tickets />
      <WhatToExpect />
      <PreviousYears />
      <Gallery />
      <Colab />
      <Map />
      <Sponsors />
      <Organizers />
      <Footer />
    </div>
  );
};

export default Home;

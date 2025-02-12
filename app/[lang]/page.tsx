"use client";
import { use } from 'react';
import Link from "next/link";

import  { SupportedLanguages } from "../dictionaries/all";
import { Header } from "./sections/Header";
import { Gallery } from "./sections/Gallery";
import { Program } from "./sections/Program";
import { Info } from "./sections/Info";
import { Colab } from "./sections/Colab";
import { Organizers } from "./sections/Organizers";
import { Footer } from "./sections/Footer";
import { Map } from "./sections/Map";
import { PreviousYears } from "./sections/PreviousYears";
import { Tickets } from "./sections/Tickets";
import { WhatToExpect } from "./sections/WhatToExpect";
import { PromotedRoasters } from "./sections/PromotedRoasters";
import { Sponsors } from "./sections/Sponsors";
import InstagramFeed from "./sections/InstagramFeed";

type HomePropsType = {
  params: Promise<{ lang: SupportedLanguages }>;
};

const Home = ({ params }: HomePropsType) => {
  const { lang } = use(params);

  return (
    <div className="wrapper">
      <Link
        href={lang === "cz" ? "./en" : "./cz"}
        hrefLang={lang === "cz" ? "en-US" : "cs-CZ"}
        rel="alternate"
        className="lang inverted card z-50 text-lg lowercase"
      >
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <Header />
      <InstagramFeed />
      <Info />
      {/* <PromotedRoasters /> */}
      <Tickets />
      <WhatToExpect />
      <PreviousYears />
      <Gallery />
      {/* <Program /> */}
      <Colab />
      <Map />
      {/* <Sponsors /> */}
      <Organizers />
      <Footer />
    </div>
  );
};

export default Home;

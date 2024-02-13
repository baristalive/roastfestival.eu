"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ColorResult, SketchPicker } from "react-color";

import dictionaries, { SupportedLanguages } from "../dictionaries/all";
import { Header } from "./sections/Header";
import { About } from "./sections/About";
import { Filler } from "./sections/Filler";
import { Program } from "./sections/Program";
import { Info } from "./sections/Info";
import { Sponsors } from "./sections/Sponsors";
import { Organizers } from "./sections/Organizers";
import { Footer } from "./sections/Footer";
import { Map } from "./sections/Map";
import { BuyTickets } from "./sections/BuyTickets";
import { OtherServices } from "./sections/OtherServices";
import { useEffect, useState } from "react";

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
  const [color, setColor] = useState("rgb(255, 248, 0)");

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
    document.documentElement.style.setProperty("--accent", color.hex);
  };
  const usedLang = dictionaries[lang as SupportedLanguages];

  return (
    <div className="wrapper">
      <Link
        href={lang === "cz" ? "./en" : "./cz"}
        rel="alternate"
        className="lang inverted lowercase text-lg"
      >
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
      <div className={`fixed right-4 top-16 z-10 ${divClass ? "" : "hidden"}`}>
        <SketchPicker color={color} onChange={handleColorChange} />
      </div>
      <div className={divClass ? "show" : "hide"}>
        <div className="overlay" />
        <div className="with-overlay">
          <Header />
          <About />
          {/* <Filler /> */}
          <Sponsors />
          {usedLang.ready && (
            <>
              <BuyTickets className="inverted pt-64" />
              <Program />
              <BuyTickets />
            <OtherServices />
            <BuyTickets className="inverted" />
            <PromotedRoasters />
            </>
          )}
          <Info />
          {usedLang.ready && <BuyTickets className="inverted" /> }
        </div>
      </div>
      <Map />
      <Organizers />
      <Footer />
    </div>
  );
};

export default Home;

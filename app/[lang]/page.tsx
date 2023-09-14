import Link from "next/link";
import dynamic from "next/dynamic";

import { SupportedLanguages } from "../dictionaries/all";
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

const PromotedRoasters = dynamic(() => import("./sections/PromotedRoasters"), {
  ssr: false,
});

type HomePropsType = {
  params: { lang: SupportedLanguages };
};

const Home = ({ params: { lang } }: HomePropsType) => (
  <div className="wrapper">
    <div className="lang inverted uppercase">
      <Link href={lang === "cz" ? "./en" : "./cz"} rel="alternate">
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
    </div>
    <div>
      <div className="overlay" />
      <div className="with-overlay">
        <Header />
        <About />
        <Filler />
        {/* <Sponsors /> */}
        <BuyTickets className="inverted pt-64" />
        <Program />
        <BuyTickets />
        <OtherServices />
        <BuyTickets className="inverted" />
        <PromotedRoasters />
        <Info />
        <BuyTickets />
      </div>
    </div>
    <Map />
    <Organizers />
    <Footer />
  </div>
);

export default Home;

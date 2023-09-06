import { SupportedLanguages } from "../dictionaries/all";
import Link from "next/link";
import { Header } from "./sections/Header";
import { About } from "./sections/About";
import { Filler } from "./sections/Filler";
import { Program } from "./sections/Program";
import { Info } from "./sections/Info";
import { Sponsors } from "./sections/Sponsors";
import { Organizers } from "./sections/Organizers";
import { Footer } from "./sections/Footer";
import { Map } from "./sections/Map";
import { PromotedRoasters } from "./sections/PromotedRoasters";
import { BuyTickets } from "./sections/BuyTickets";

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
        <Sponsors />
        <Program />
        <BuyTickets />
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

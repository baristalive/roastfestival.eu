import { SupportedLanguages } from "../dictionaries/all";
import Link from "next/link";
import { Header } from "./sections/Header";
import { About } from "./sections/About";
import { Filler } from "./sections/Filler";
import { Program } from "./sections/Program";
import { BuyTickets } from "./sections/BuyTickets";
import { Sponsors } from "./sections/Sponsors";
import { Organizers } from "./sections/Organizers";
import { Footer } from "./sections/Footer";
import { Map } from "./sections/Map";

type HomePropsType = {
  params: { lang: SupportedLanguages };
};

const Home = ({ params: { lang } }: HomePropsType) => (
  <div className="overlay">
    <div className="lang inverted uppercase">
      <Link href={lang === "cz" ? "./en" : "./cz"}>
        {lang === "cz" ? "Switch to English" : "Přepnout do češtiny"}
      </Link>
    </div>
    <Header />
    <About />
    <Filler />
    <Sponsors />
    <Program />
    <BuyTickets />
    <Map />
    <Organizers />
    <Footer />
  </div>
);

export default Home;

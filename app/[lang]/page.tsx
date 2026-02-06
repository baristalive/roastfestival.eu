"use client";
import { Header } from "./sections/Header";
import { Marquee } from "./sections/Marquee";
import { Gallery } from "./sections/Gallery";
import { Program } from "./sections/Program";
import { Navigation } from "@/app/[lang]/components/Navigation";
import { Info } from "./sections/Info";
// import { Organizers } from "./sections/Organizers";
import { Footer } from "./sections/Footer";
import { Map } from "./sections/Map";
import { PreviousYears } from "./sections/PreviousYears";
import { Tickets } from "./sections/Tickets";
import { WhatToExpect } from "./sections/WhatToExpect";
// import { PromotedRoasters } from "./sections/PromotedRoasters";
// import { Sponsors } from "./sections/Sponsors";
import { Colab } from "./sections/Colab";
import { StayTuned } from "./sections/StayTuned";

const Home = () => {
  return (
    <div className="wrapper">
      <Navigation />
      <main>
        <Header />
        <Marquee />
        <Info />
        <Program />
        {/* <PromotedRoasters /> */}
        <Colab />
        <WhatToExpect />
        <StayTuned />
        <Tickets />
        <Map />
        <PreviousYears />
        <Gallery />
        {/* <Sponsors /> */}
        {/* <Organizers /> */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;

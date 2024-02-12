import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LogoSvg from "../../../public/logo-round.svg";

gsap.registerPlugin(ScrollTrigger);

const sharedGsapOptions = (scrollTrigger: Record<string, any>) => ({
  svgOrigin: "582 589",
  scrollTrigger: {
    trigger: '#round_g6',
    scrub: 2,
    once: true,
    ...scrollTrigger
  }
});
const fromOptions = {
  start: "top 80%",
  end: "center center",
}
const toOptions = {
  start: "top 20%",
  end: "top top",
}

const RoundLogo = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from("#round_g0", { rotation: "-=10", ...sharedGsapOptions(fromOptions) });
      gsap.from("#round_g1", { rotation: "+=20", ...sharedGsapOptions(fromOptions) });
      gsap.from("#round_g2", { rotation: "-=30", ...sharedGsapOptions(fromOptions) });
      gsap.from("#round_g3", { rotation: "+=40", ...sharedGsapOptions(fromOptions) });
      gsap.from("#round_g4", { rotation: "-=50", ...sharedGsapOptions(fromOptions) });
      gsap.from("#round_g5", { rotation: "+=60", ...sharedGsapOptions(fromOptions) });
      gsap.from("#round_g6", { rotation: "-=70", ...sharedGsapOptions(fromOptions) });

      // gsap.to("#round_g0", { rotation: "+=10", ...sharedGsapOptions(toOptions) });
      // gsap.to("#round_g1", { rotation: "-=20", ...sharedGsapOptions(toOptions) });
      // gsap.to("#round_g2", { rotation: "+=30", ...sharedGsapOptions(toOptions) });
      // gsap.to("#round_g3", { rotation: "-=40", ...sharedGsapOptions(toOptions) });
      // gsap.to("#round_g4", { rotation: "+=50", ...sharedGsapOptions(toOptions) });
      // gsap.to("#round_g5", { rotation: "-=60", ...sharedGsapOptions(toOptions) });
      // gsap.to("#round_g6", { rotation: "+=70", ...sharedGsapOptions(toOptions) });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div id="round-logo"/>
      <LogoSvg />
    </div>
  );
};

export default RoundLogo;

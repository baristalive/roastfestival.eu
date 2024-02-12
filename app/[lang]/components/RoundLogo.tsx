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
      const tl = gsap.timeline({
        svgOrigin: "582 589",
        scrollTrigger: {
          trigger: '#round_g6',
          scrub: 2,
          start: "center 80%",
          end: "center 20%",
        }
      })
      tl.set("#round_g0", { rotation: "-=10", svgOrigin: "582 589"});
      tl.set("#round_g1", { rotation: "+=20", svgOrigin: "582 589"});
      tl.set("#round_g2", { rotation: "-=30", svgOrigin: "582 589"});
      tl.set("#round_g3", { rotation: "+=40", svgOrigin: "582 589"});
      tl.set("#round_g4", { rotation: "-=50", svgOrigin: "582 589"});
      tl.set("#round_g5", { rotation: "+=60", svgOrigin: "582 589"});
      tl.set("#round_g6", { rotation: "-=70", svgOrigin: "582 589"});

      tl.to("#round_g0", { rotation: 0 }, "<");
      tl.to("#round_g1", { rotation: 0 }, "<");
      tl.to("#round_g2", { rotation: 0 }, "<");
      tl.to("#round_g3", { rotation: 0 }, "<");
      tl.to("#round_g4", { rotation: 0 }, "<");
      tl.to("#round_g5", { rotation: 0 }, "<");
      tl.to("#round_g6", { rotation: 0 }, "<");

      tl.to("#round_g0", { rotation: "+=10" }, "50%");
      tl.to("#round_g1", { rotation: "-=20" }, "50%");
      tl.to("#round_g2", { rotation: "+=30" }, "50%");
      tl.to("#round_g3", { rotation: "-=40" }, "50%");
      tl.to("#round_g4", { rotation: "+=50" }, "50%");
      tl.to("#round_g5", { rotation: "-=60" }, "50%");
      tl.to("#round_g6", { rotation: "+=70" }, "50%");

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

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LogoSvg from "../../../public/logo-round.svg";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const svgOrigin = "582 606";
const groups = [20,10,80,130,20,60,160]

const RoundLogo = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        svgOrigin,
        scrollTrigger: {
          trigger: '#round_g6',
          scrub: 2,
          start: "center 90%",
          end: "center 20%",
        }
      })

      groups.map((r,i) =>
        gsap.set(`#round_g${i}`, { rotation: `${i%2 ? "+" : "-"}=${r}`, svgOrigin})
      )
      groups.map((_,i) =>
        tl.to(`#round_g${i}`, { rotation: 0 }, "<")
      )
      groups.map((r,i) =>
        tl.to(`#round_g${i}`, { rotation: `${i%2 ? "-" : "+"}=${r}`}, "60%")
      )
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

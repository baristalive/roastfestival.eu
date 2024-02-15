import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LogoSvg from "../../../public/logo-round.svg";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const svgOrigin = "582 606";
const groups = Array(6)

const RoundLogo = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      groups.map((_,i) =>
        gsap.to(`#round_g${i}`, { rotation: 360, delay: "random(0,1)", repeat: -1, duration: "random(3,8)", svgOrigin, ease: "none" })
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

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LogoSvg from "../../../public/logo-round.svg";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const svgOrigin = "582 606";
const groups = Array(7).fill(0)

const RoundLogo = () => {
  const ref = useRef(null);

  // useGSAP(
  //   () => {
  //     groups.map((_,i) =>
  //       gsap.to(`#round_g${i}`, { rotation: 360, delay: "random(0,1)", repeat: -1, duration: "random(3,8)", svgOrigin, ease: "none" })
  //     )}
  //   ,
  //   { scope: ref },
  // );

  return (
    <div ref={ref}>
      <div className="w-32">
        <LogoSvg />
      </div>
    </div>
  );
};

export default RoundLogo;

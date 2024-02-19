import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LogoSvg from "../../../public/logo.svg";

const sharedGsapOptions = {
  duration: 1.5,
  svgOrigin: "1082 1082",
};

const Logo = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from("#g0", {
        rotation: "-=10",
        ...sharedGsapOptions,
      });
      gsap.from("#g1", {
        rotation: "+=10",
        ...sharedGsapOptions,
      });
      gsap.from("#g2", {
        rotation: "-=20",
        ...sharedGsapOptions,
      });
      gsap.from("#g3", {
        rotation: "+=15",
        ...sharedGsapOptions,
      });
      gsap.set("path", {opacity: 0})
      gsap.to("path", { opacity: 0.8, stagger: { each: 0.02, from: "random" }, ease: "elastic.inOut" });
      gsap.to("path", { opacity: 1, delay: 1.5, ease: "none"})
      // gsap.utils.toArray('.bean').forEach(b => gsap.to(b, {delay: "random(4.2,5.2)", duration: 1, opacity: 0.5, repeatDelay: 0, repeat: -1, yoyo: true}))
      // gsap.utils.toArray("path").forEach(p => gsap.to(p, { opacity: 0.2, delay: "random(3,4)", duration: 3, ease: "elastic.inOut", repeat: -1, repeatDelay: 0, yoyo: true }));
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <LogoSvg />
    </div>
  );
};

export default Logo;

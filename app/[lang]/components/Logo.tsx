import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LogoSvg from "@/app/../public/logo.svg";

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
      gsap.set("path", { opacity: 0 });
      gsap.to("path", {
        opacity: 0.8,
        stagger: { each: 0.02, from: "random" },
        ease: "elastic.inOut",
      });
      gsap.to("path", { opacity: 1, delay: 1.5, ease: "none" });
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

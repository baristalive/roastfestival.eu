import React, { MutableRefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const Bar = ({ mountRef }: { mountRef: MutableRefObject<null> }) => {
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(".bar", {
          width: "6rem",
          scrollTrigger: {
            trigger: mountRef.current,
            scrub: 2,
            start: "top center",
            end: "top top",
          },
        });
      });
    },
    { scope: mountRef },
  );
  return (
    <div className="bar mt-12 hidden h-3 w-3 rounded-full bg-[var(--accent)] md:block" />
  );
};

export default Bar;

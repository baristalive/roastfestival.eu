import React, { MutableRefObject, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const Bar = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(".bar", {
          width: "6rem",
          scrollTrigger: {
            trigger: ref.current,
            start: "bottom bottom",
            end: "bottom center"
          },
        });
      });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="bar mt-12 hidden h-3 w-3 rounded-full bg-[var(--accent)] md:block" />
  );
};

export default Bar;

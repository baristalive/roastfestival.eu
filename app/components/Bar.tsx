import React, { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { ContextSafeFunc, useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const Bar = ({
  mountRef,
  contextSafe,
}: {
  mountRef: RefObject<null>;
  contextSafe: ContextSafeFunc;
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      contextSafe(() => {
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          gsap.to(ref.current, {
            width: "6rem",
            scrollTrigger: {
              trigger: mountRef.current,
              scrub: 2,
              start: "top center",
              end: "top top"
            },
          });
        });
      });
    }
  });
  return (
    <div
      ref={ref}
      className="bar mt-12 hidden h-2 w-2 rounded-full bg-[var(--accent)] md:block 2xl:h-3 2xl:w-3"
    />
  );
};

export default Bar;

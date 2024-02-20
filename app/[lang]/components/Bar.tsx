import React, { MutableRefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { ContextSafeFunc, useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const Bar = ({
  mountRef,
  contextSafe,
}: {
  mountRef: MutableRefObject<null>;
  contextSafe: ContextSafeFunc;
}) => {
  const ref = useRef(null);
  useEffect(() =>
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
            end: "top top",
          },
        });
      });
    }),
  );
  return (
    <div
      ref={ref}
      className="bar mt-12 hidden h-3 w-3 rounded-full bg-[var(--accent)] md:block"
    />
  );
};

export default Bar;

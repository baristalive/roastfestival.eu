import { useRef } from "react";
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
        gsap.to(ref.current, {
          width: "6rem",
          scrollTrigger: {
            trigger: ref.current,
            scrub: 2,
            start: "bottom bottom",
            end: "top 20%",
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="bar mt-12 hidden h-2 w-2 rounded-full bg-[var(--accent)] md:block 2xl:h-3 2xl:w-3"
    />
  );
};

export default Bar;

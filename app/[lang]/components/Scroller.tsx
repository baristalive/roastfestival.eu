"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/all";

export const Scroller = ({ useRef, animation }: {animation: gsap.core.Timeline}) => {
  const [hash, setHash] = useState("");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollToPlugin);

      if (hash.startsWith("#program_")) {
        gsap.to(window, { duration: 0.1, scrollTo: "#program" })
        // gsap.to(window, { duration: 0.5, scrollTo: hash === "#program_day_1" ? getScrollPosition(animation, -1) : getScrollPosition(animation, 1)})
      } else {
        gsap.to(window, { duration: 0.5, scrollTo: hash })
      }
    },
    { scope: useRef, dependencies: [hash] },
  );

  window.addEventListener("hashchange", () => setHash(window.location.hash));

  console.log(hash);
  return null;
};

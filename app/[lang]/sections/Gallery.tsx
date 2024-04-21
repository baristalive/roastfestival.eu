"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import "react-medium-image-zoom/dist/styles.css";
import { LANDSCAPE, PORTRAIT, ZoomableImage } from "../../components/ZoomableImage";


const images = [
  [
    { src: "/photos/220-_DSC0453.jpg", ...LANDSCAPE },
    { src: "/photos/280-_DSC0568.jpg", ...PORTRAIT },
  ],
  [
    { src: "/photos/260-_DSC0526.jpg", ...LANDSCAPE },
    { src: "/photos/318-_DSC0639.jpg", ...LANDSCAPE },
    { src: "/photos/198-_DSC0389.jpg", ...LANDSCAPE },
  ],
  [
    { src: "/photos/94-_DSC0192.jpg", ...LANDSCAPE },
    { src: "/photos/300-_DSC0610.jpg", ...PORTRAIT },
  ],
  [
    { src: "/photos/364-_DSC0717.jpg", ...PORTRAIT },
    { src: "/photos/132-_DSC0253.jpg", ...LANDSCAPE },
  ],
  [
    { src: "/photos/359-_DSC0712.jpg", ...LANDSCAPE },
    { src: "/photos/64-_DSC0125.jpg", ...PORTRAIT },
  ],
];

export const Gallery = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".cards", { y: "+=30rem" });
        gsap.to(".cards", {
          y: "-=40rem",
          scrollTrigger: {
            trigger: ref.current,
            scrub: 2,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="gallery-section watermark3 ">
      <div className="cards mx-auto flex max-w-[1900px] items-center gap-4 p-12">
        {images.map((col, idx) => (
          <div className="grid gap-4" key={`col_${idx}`}>
            {col.map((i, idx) => (
              <ZoomableImage key={`img_${idx}`} {...i} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

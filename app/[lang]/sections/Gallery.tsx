"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import "react-medium-image-zoom/dist/styles.css";
import { LANDSCAPE, PORTRAIT, ZoomableImage } from "../../components/ZoomableImage";


const largeWallImages = [
  [
    { src: "/photos/116-_DSC0230.jpg", ...LANDSCAPE },
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
const smallWallImages = [
  [
    { src: "/photos/94-_DSC0192.jpg", ...LANDSCAPE },
    { src: "/photos/116-_DSC0230.jpg", ...LANDSCAPE },
    { src: "/photos/280-_DSC0568.jpg", ...PORTRAIT },
    { src: "/photos/260-_DSC0526.jpg", ...LANDSCAPE },
    { src: "/photos/64-_DSC0125.jpg", ...PORTRAIT },
    { src: "/photos/359-_DSC0712.jpg", ...LANDSCAPE },
  ],
  [
    { src: "/photos/318-_DSC0639.jpg", ...LANDSCAPE },
    { src: "/photos/300-_DSC0610.jpg", ...PORTRAIT },
    { src: "/photos/198-_DSC0389.jpg", ...LANDSCAPE },
    { src: "/photos/364-_DSC0717.jpg", ...PORTRAIT },
    { src: "/photos/132-_DSC0253.jpg", ...LANDSCAPE },
  ],
];

export const Gallery = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".cards", { y: "+=10rem" });
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
      <div className="cards mx-auto md:flex max-w-[1900px] items-center gap-4 px-12 pb-12 hidden ">
        {largeWallImages.map((col, idx) => (
          <div className="gap-1 md:gap-4 flex md:grid" key={`col_${idx}`}>
            {col.map((i, idx) => (
              <ZoomableImage key={`img_${idx}`} {...i} />
            ))}
          </div>
        ))}
      </div>
      <div className="cards mx-auto flex max-w-[1900px] items-center gap-1 pb-12 md:hidden ">
        {smallWallImages.map((col, idx) => (
          <div className="gap-1 flex flex-col md:grid" key={`col_${idx}`}>
            {col.map((i, idx) => (
              <ZoomableImage key={`img_${idx}`} {...i} />
            ))}
          </div>
        ))}
      </div>

    </section>
  );
};

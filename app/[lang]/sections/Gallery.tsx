"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import ExportedImage from "next-image-export-optimizer";


const landscape = { width: 512, height: 348 }
const portrait = { width: 512, height: 768 }

const images = [
  [{ src: "/photos/220-_DSC0453.jpg", ...landscape}, {src: "/photos/280-_DSC0568.jpg", ...portrait}],
  [{ src: "/photos/260-_DSC0526.jpg", ...landscape}, {src: "/photos/318-_DSC0639.jpg", ...landscape}, {src: "/photos/198-_DSC0389.jpg", ...landscape}],
  [{ src: "/photos/94-_DSC0192.jpg", ...landscape}, {src: "/photos/300-_DSC0610.jpg", ...portrait}],
  [{ src: "/photos/364-_DSC0717.jpg", ...portrait}, {src: "/photos/132-_DSC0253.jpg", ...landscape}],
  [{ src: "/photos/359-_DSC0712.jpg", ...landscape}, {src: "/photos/64-_DSC0125.jpg", ...portrait}]
]
export const Gallery = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".cards", { y: "+=5rem"})
        gsap.to(".cards",{
          y: '-=10rem',
          scrollTrigger: {
            trigger: ref.current,
            scrub: 2,
            start: "top bottom",
            end: "bottom top"
          }
        })
      })
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="gallery-section watermark3">
      <div className="flex items-center gap-4 p-12 max-w-full cards">
        {images.map((col, idx) => (
          <div className="grid gap-4" key={`col_${idx}`}>
            {col.map((i, idx) => <div className="card elevate rounded-2xl" key={`img_${idx}`}>
              <ExportedImage className="h-auto max-w-full rounded-2xl" {...i} alt="" />
            </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

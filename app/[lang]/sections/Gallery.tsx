"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";


const images = [
  ["/photos/220-_DSC0453.jpg", "/photos/280-_DSC0568.jpg"],
  ["/photos/260-_DSC0526.jpg", "/photos/318-_DSC0639.jpg", "/photos/198-_DSC0389.jpg"],
  ["/photos/331-_DSC0669.jpg", "/photos/300-_DSC0610.jpg"],
  ["/photos/364-_DSC0717.jpg", "/photos/132-_DSC0253.jpg"],
  ["/photos/359-_DSC0712.jpg", "/photos/64-_DSC0125.jpg"]
]
export const Gallery = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(".card", { y: "+=30rem"})
        gsap.to(".card",{
          y: '-=50rem',
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
      <div className="flex items-center gap-4 p-12 max-w-full">
        {images.map((col, idx) => (
          <div className="grid gap-4" key={`col_${idx}`}>
            {col.map((i, idx) => <div className="card elevate rounded-2xl" key={`img_${idx}`}>
              <img className="h-auto max-w-full rounded-2xl" src={i} alt="" />
            </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

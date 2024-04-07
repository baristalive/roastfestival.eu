"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const landscape = {
  small: { width: 512, height: 348 },
  zoomed: { width: 1080, height: 1623 },
};
const portrait = {
  small: { width: 512, height: 768 },
  zoomed: { width: 1080, height: 720 },
};

const images = [
  [
    { src: "/photos/220-_DSC0453.jpg", ...landscape },
    { src: "/photos/280-_DSC0568.jpg", ...portrait },
  ],
  [
    { src: "/photos/260-_DSC0526.jpg", ...landscape },
    { src: "/photos/318-_DSC0639.jpg", ...landscape },
    { src: "/photos/198-_DSC0389.jpg", ...landscape },
  ],
  [
    { src: "/photos/94-_DSC0192.jpg", ...landscape },
    { src: "/photos/300-_DSC0610.jpg", ...portrait },
  ],
  [
    { src: "/photos/364-_DSC0717.jpg", ...portrait },
    { src: "/photos/132-_DSC0253.jpg", ...landscape },
  ],
  [
    { src: "/photos/359-_DSC0712.jpg", ...landscape },
    { src: "/photos/64-_DSC0125.jpg", ...portrait },
  ],
];

type Image = (typeof images)[0][0];

export const ZoomableImage = (
  props: Omit<ExportedImageProps, "alt" | "children"> & Image,
) => {
  const ref = useRef(null);
  return (
    <>
      <ExportedImage
        ref={ref}
        className="hidden"
        src={props.src}
        height={props.zoomed.height}
        width={props.zoomed.width}
        alt=""
      />
      <Zoom
        zoomMargin={16}
        classDialog="zoom"
        zoomImg={{
          src: props.src,
          height: props.zoomed.height,
          width: props.zoomed.width,
          alt: "here",
          srcSet:
            (ref.current as HTMLImageElement | null)?.getAttribute("srcset") ||
            "",
        }}
      >
        <div className="card elevate img rounded-2xl">
          <ExportedImage
            className="h-auto max-w-full rounded-2xl"
            src={props.src}
            height={props.small.height}
            width={props.small.width}
            alt=""
          />
        </div>
      </Zoom>
    </>
  );
};

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
    <section ref={ref} className="gallery-section watermark3 min-h-screen">
      <div className="cards flex max-w-full items-center gap-4 p-12">
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

"use client";
import Bar from "@/app/components/Bar";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { useGSAP } from "@gsap/react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { ZoomableImage } from "../components/ZoomableImage";

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
    { src: "/photos/DSC_3562.jpg", ...portrait },
    { src: "/photos/3166.jpg", ...landscape },
  ],
  [
    { src: "/photos/DSC_3346.jpg", ...landscape },
    { card: 0 },
    { src: "/photos/167-_DSC0331.jpg", ...portrait },
  ],
  [
    { src: "/photos/58-_DSC0116.jpg", ...portrait },
    { card: 1 },
    { src: "/photos/DSC_3536.jpg", ...landscape },
  ],
  [
    { src: "/photos/DSC_3481.jpg", ...landscape },
    { card: 2 },
    { src: "/photos/DSC_3298.jpg", ...portrait },
  ],
  [
    { src: "/photos/DSC_3263.jpg", ...portrait },
    { src: "/photos/60-_DSC0120.jpg", ...landscape },
  ],
];

export const Organizers = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });
  return (
    <section ref={ref} className="about-us watermark4 p-12 pt-20">
      <div className="md:p-12">
        <h2 className="w-3/4 pb-8 pt-24 text-6xl font-bold md:pt-56 lg:pt-20">
          {lang.organizers.title}
        </h2>
        <Bar mountRef={ref} contextSafe={contextSafe} />
      </div>
      <div className="cards mx-auto flex max-w-[1900px] items-center gap-4">
        {images.map((col, idx) => (
          <div className="grid max-w-[20%] gap-4" key={`col_${idx}`}>
            {col.map((i, idx) => {
              if ("card" in i && i.card !== undefined) {
                return (
                  <div
                    key={`card_${i.card}`}
                    className="card elevate rounded-2xl p-12 text-lg leading-normal lg:text-xl"
                  >
                    <p>{lang.organizers.text[i.card]}</p>
                  </div>
                );
              }
              return <ZoomableImage key={`img_${idx}`} {...i} />;
            })}
          </div>
        ))}
        <div className="flex items-center"></div>
      </div>
    </section>
  );
};

"use client";
import Bar from "@/app/components/Bar";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { useGSAP } from "@gsap/react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import {
  LANDSCAPE,
  PORTRAIT,
  ZoomableImage,
} from "../../components/ZoomableImage";

const images = [
  [
    { src: "/photos/DSC_3562.jpg", ...PORTRAIT },
    { src: "/photos/3166.jpg", ...LANDSCAPE },
  ],
  [
    { src: "/photos/DSC_3346.jpg", ...LANDSCAPE },
    { card: 0 },
    { src: "/photos/167-_DSC0331.jpg", ...PORTRAIT },
  ],
  [
    { src: "/photos/58-_DSC0116.jpg", ...PORTRAIT },
    { card: 1 },
    { src: "/photos/DSC_3536.jpg", ...LANDSCAPE },
  ],
  [
    { src: "/photos/DSC_3481.jpg", ...LANDSCAPE },
    { card: 2 },
    { src: "/photos/DSC_3298.jpg", ...PORTRAIT },
  ],
  [
    { src: "/photos/DSC_3263.jpg", ...PORTRAIT },
    { src: "/photos/60-_DSC0120.jpg", ...LANDSCAPE },
  ],
];

export const Organizers = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: ref });
  return (
    <section ref={ref} className="about-us watermark4 pt-20">
      <div className="mx-auto max-w-[1900px]">
        <div className="p-12 md:p-24">
          <h2 className="w-3/4 font-bold md:pt-56 lg:pt-24 text-3xl 2xl:pb-8 2xl:text-6xl">
            {lang.organizers.title}
          </h2>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
        <div className="cards mx-auto flex items-center gap-1 md:gap-4 md:p-12">
          {images.map((col, idx) => (
            <div
              className={`gap-2 md:max-w-[20%] md:gap-4 ${idx > 2 || idx === 0 ? "hidden md:grid" : "grid"}`}
              key={`col_${idx}`}
            >
              {col.map((i, idx) => {
                if ("card" in i && i.card !== undefined) {
                  return (
                    <div
                      key={`card_${i.card}`}
                      className="card elevate rounded-lg lg:rounded-2xl px-6 py-8 text-base 2xl:p-12 2xl:text-xl"
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
      </div>
    </section>
  );
};

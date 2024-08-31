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

const largeWallImages = [
  [
    { src: "DSC_3562.jpg", ...PORTRAIT.lg },
    { src: "3166.jpg", ...LANDSCAPE.lg },
  ],
  [
    { src: "DSC_3346.jpg", ...LANDSCAPE.lg },
    { card: 0 },
    { src: "167-_DSC0331.jpg", ...PORTRAIT.lg },
  ],
  [
    { src: "58-_DSC0116.jpg", ...PORTRAIT.lg },
    { card: 1 },
    { src: "DSC_3536.jpg", ...LANDSCAPE.lg },
  ],
  [
    { src: "DSC_3481.jpg", ...LANDSCAPE.lg },
    { card: 2 },
    { src: "DSC_3298.jpg", ...PORTRAIT.lg },
  ],
  [
    { src: "DSC_3263.jpg", ...PORTRAIT.lg },
    { src: "60-_DSC0120.jpg", ...LANDSCAPE.lg },
  ],
];
const smallWallImages = [
  [
    { src: "DSC_3562.jpg", ...PORTRAIT.sm },
    { src: "3166.jpg", ...LANDSCAPE.sm },
    { src: "DSC_3346.jpg", ...LANDSCAPE.sm },
    { card: 0 },
    { src: "DSC_3263.jpg", ...PORTRAIT.sm },
    { src: "167-_DSC0331.jpg", ...PORTRAIT.sm },
  ],
  [
    { src: "DSC_3536.jpg", ...LANDSCAPE.sm },
    { src: "58-_DSC0116.jpg", ...PORTRAIT.sm },
    { card: 1 },
    { src: "DSC_3481.jpg", ...LANDSCAPE.sm },
    { src: "DSC_3298.jpg", ...PORTRAIT.sm },
    { card: 2 },
    { src: "60-_DSC0120.jpg", ...LANDSCAPE.sm },
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
          <h2 className="w-3/4 text-3xl font-bold md:pt-56 lg:pt-24 2xl:pb-8 2xl:text-6xl">
            {lang.organizers.title}
          </h2>
          <Bar mountRef={ref} contextSafe={contextSafe} />
        </div>
        <div className="cards mx-auto hidden items-center gap-4 p-12 md:flex">
          {largeWallImages.map((col, idx) => (
            <div className="grid max-w-[20%] gap-4" key={`col_${idx}`}>
              {col.map((i, idx2) => {
                if ("card" in i && i.card !== undefined) {
                  return (
                    <div
                      key={`card_${i.card}`}
                      className="card elevate rounded-lg px-6 py-8 text-base lg:rounded-2xl 2xl:p-12 2xl:text-xl"
                    >
                      <p>{lang.organizers.text[i.card]}</p>
                    </div>
                  );
                }
                return (
                  <ZoomableImage
                    key={`img_${idx2}`}
                    alt={`${lang.organizers.title}: ${params.lang === "cz" ? "Foto" : "Photo"} #${idx}${idx2}`}
                    {...i}
                    src={`/images/photos/${i.src}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="cards mx-auto flex items-center gap-1 p-2 md:hidden">
          {smallWallImages.map((col, idx) => (
            <div className="grid gap-2" key={`col_${idx}`}>
              {col.map((i, idx2) => {
                if ("card" in i && i.card !== undefined) {
                  return (
                    <div
                      key={`card_${i.card}`}
                      className="card elevate rounded-lg px-6 py-8 text-base lg:rounded-2xl 2xl:p-12 2xl:text-xl"
                    >
                      <p>{lang.organizers.text[i.card]}</p>
                    </div>
                  );
                }
                return (
                  <ZoomableImage
                    key={`col_${idx2}img_${idx}`}
                    alt={`${lang.organizers.title}: ${params.lang === "cz" ? "Foto" : "Photo"} #${idx}${idx2}`}
                    {...i}
                    src={`/images/photos/${i.src}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

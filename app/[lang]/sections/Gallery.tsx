"use client";
import { useParams } from "next/navigation";
import "react-medium-image-zoom/dist/styles.css";
import {
  LANDSCAPE,
  PORTRAIT,
  ZoomableImage,
} from "../../components/ZoomableImage";
import { dictionaries, SupportedLanguages } from "@/app/dictionaries/all";
import { Section } from "@/app/components/Section";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

const largeWallImages = [
  [
    { src: "141-_DSC0855.jpg", ...LANDSCAPE.lg },
    { src: "188-_DSC1128.jpg", ...PORTRAIT.lg },
  ],
  [
    { src: "626-_DSC2221.jpg", ...PORTRAIT.lg },
    { src: "734-_DSC2432.jpg", ...LANDSCAPE.lg },
  ],
  [
    { src: "_MG_9521.jpg", ...LANDSCAPE.lg },
    { src: "_MG_1071.JPG", ...LANDSCAPE.lg },
    { src: "_MG_9283.JPG", ...LANDSCAPE.lg },
  ],
  [
    { src: "_MG_9283.JPG", ...LANDSCAPE.lg },
    { src: "509-_DSC1990.jpg", ...PORTRAIT.lg },
  ],
  [
    { src: "_MG_0371.JPG", ...PORTRAIT.lg },
    { src: "_MG_0579.JPG", ...LANDSCAPE.lg },
  ],
];
const smallWallImages = [
  [
    { src: "188-_DSC1128.jpg", ...PORTRAIT.sm },
    { src: "141-_DSC0855.jpg", ...LANDSCAPE.sm },
    { src: "734-_DSC2432.jpg", ...LANDSCAPE.sm },
    { src: "_MG_0371.JPG", ...PORTRAIT.sm },
    { src: "_MG_9521.jpg", ...LANDSCAPE.sm },
    { src: "_MG_1071.JPG", ...LANDSCAPE.sm },
  ],
  [
    { src: "_MG_9283.JPG", ...LANDSCAPE.sm },
    { src: "509-_DSC1990.jpg", ...PORTRAIT.sm },
    { src: "_MG_9283.JPG", ...LANDSCAPE.sm },
    { src: "626-_DSC2221.jpg", ...PORTRAIT.sm },
    { src: "_MG_0579.JPG", ...LANDSCAPE.sm },
  ],
];

export const Gallery = () => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Before hydration (undefined), render both layouts with CSS visibility
  // to match the static HTML output. After mount, conditionally render only
  // the active layout to reduce the number of mounted ZoomableImage components.

  const MobileView = (
    <div className="mx-auto flex items-center justify-center gap-3 p-2 pb-12">
      {smallWallImages.map((col, idx) => (
        <div className="flex flex-col gap-3" key={`col_${idx}`}>
          {col.map((i, idx2) => (
            <ZoomableImage
              key={`img_${idx2}`}
              alt={`${lang.lastYear.title}: ${params.lang === "cz" ? "Foto" : "Photo"} #${idx}${idx2}`}
              {...i}
              src={`/images/photos/${i.src}`}
            />
          ))}
        </div>
      ))}
    </div>
  );

  const DesktopView = (
    <div className="mx-auto flex items-center justify-center gap-8 p-12">
      {largeWallImages.map((col, idx) => (
        <div className="flex min-w-0 shrink flex-col gap-8" key={`col_${idx}`}>
          {col.map((i, idx2) => (
            <ZoomableImage
              key={`img_${idx2}`}
              alt={`${lang.lastYear.title}: ${params.lang === "cz" ? "Foto" : "Photo"} #${idx}${idx2}`}
              {...i}
              src={`/images/photos/${i.src}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
  if (isMobile !== undefined) {
    return (
      <Section className="bg-secondary">
        {isMobile ? MobileView : DesktopView}
      </Section>
    );
  }

  // SSR / hydration fallback: render both, let CSS handle visibility
  return (
    <Section className="bg-secondary">
      {DesktopView}
      {MobileView}
    </Section>
  );
};

"use client";
import { useRef } from "react";
import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";
import Zoom from "react-medium-image-zoom";

export const LANDSCAPE = {
  small: { width: 512, height: 348 },
  zoomed: { width: 1080, height: 720 },
};
export const PORTRAIT = {
  small: { width: 512, height: 768 },
  zoomed: { width: 1080, height: 1623 },
};

type Image = {
  small: {
      width: number;
      height: number;
  };
  zoomed: {
      width: number;
      height: number;
  };
  src: string;
  alt?: string;
}

export const ZoomableImage = (
  props: Omit<ExportedImageProps, "alt" | "children"> & Image
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
        alt={props.alt || ""} />
      <Zoom
        zoomMargin={16}
        classDialog="zoom"
        wrapElement="span"
        zoomImg={{
          src: props.src,
          height: props.zoomed.height,
          width: props.zoomed.width,
          alt: props.alt || "",
          srcSet: (ref.current as HTMLImageElement | null)?.getAttribute("srcset") ||
            "",
        }}
      >
        <span className="card inline-block elevate img-overlay img-zoomable rounded-2xl">
          <ExportedImage
            className="h-auto max-w-full rounded-2xl"
            src={props.src}
            height={props.small.height}
            width={props.small.width}
            alt={props.alt || ""} />
        </span>
      </Zoom>
    </>
  );
};

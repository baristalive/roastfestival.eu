"use client";
import { useRef } from "react";
import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";
import Zoom from "react-medium-image-zoom";

export const LANDSCAPE = {
  sm: {
    small: { width: 256, height: 170 },
    zoomed: { width: 512, height: 342 },
  },
  lg: {
    small: { width: 512, height: 342 },
    zoomed: { width: 1080, height: 720 },
  }
};
export const PORTRAIT = {
  sm: {
    small: { width: 256, height: 348 },
    zoomed: { width: 512, height: 768 },
  },
  lg: {
    small: { width: 512, height: 768 },
    zoomed: { width: 1080, height: 1623 },
  }
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
};

export const ZoomableImage = (
  props: Omit<ExportedImageProps, "alt" | "children"> & Image,
) => {
  const ref = useRef(null);
  if (!props.src || props.src === "") {
    return null;
  }

  return (
    <>
      <ExportedImage
        ref={ref}
        className="hidden"
        src={props.src}
        height={props.zoomed.height}
        width={props.zoomed.width}
        alt={props.alt || ""}
      />
      <Zoom
        zoomMargin={16}
        classDialog="zoom"
        zoomImg={{
          src: props.src,
          height: props.zoomed.height,
          width: props.zoomed.width,
          alt: props.alt || "",
          srcSet:
            (ref.current as HTMLImageElement | null)?.getAttribute("srcset") ||
            "",
        }}
      >
        <span className="card elevate img-overlay block rounded-lg lg:rounded-2xl">
          <ExportedImage
            className="h-auto max-w-full rounded-lg lg:rounded-2xl"
            src={props.src}
            height={props.small.height}
            width={props.small.width}
            alt={props.alt || ""}
          />
        </span>
      </Zoom>
    </>
  );
};

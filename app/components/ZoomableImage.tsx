"use client";
import { useRef } from "react";
import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";
import Zoom from "react-medium-image-zoom";

export const LANDSCAPE = {
  lg: {
    small: { height: 342, width: 512 },
    zoomed: { height: 720, width: 1080 },
  },
  sm: {
    small: { height: 170, width: 256 },
    zoomed: { height: 342, width: 512 },
  }
};
export const PORTRAIT = {
  lg: {
    small: { height: 768, width: 512 },
    zoomed: { height: 1623, width: 1080 },
  },
  sm: {
    small: { height: 348, width: 256 },
    zoomed: { height: 768, width: 512 },
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
          alt: props.alt || "",
          height: props.zoomed.height,
          src: props.src,
          srcSet:
            (ref.current as HTMLImageElement | null)?.getAttribute("srcset") ||
            "",
          width: props.zoomed.width,
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

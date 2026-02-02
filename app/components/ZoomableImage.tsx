"use client";
import { useCallback, useState } from "react";
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
  },
};
export const PORTRAIT = {
  lg: {
    small: { height: 768, width: 512 },
    zoomed: { height: 1623, width: 1080 },
  },
  sm: {
    small: { height: 348, width: 256 },
    zoomed: { height: 768, width: 512 },
  },
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
  const [srcSet, setSrcSet] = useState("");

  const ref = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      setSrcSet(node.getAttribute("srcset") || "");
    }
  }, []);

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
          className: "punk-border",
          height: props.zoomed.height,
          src: props.src,
          srcSet,
          width: props.zoomed.width,
        }}
      >
        <span className="img-overlay punk-border pop-shadow animate-pop block">
          <ExportedImage
            className="punk-border pop-shadow animate-pop h-auto max-w-full"
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

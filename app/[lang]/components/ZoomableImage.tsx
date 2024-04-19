"use client";
import { useRef } from "react";
import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";
import Zoom from "react-medium-image-zoom";

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
        alt="" />
      <Zoom
        zoomMargin={16}
        classDialog="zoom"
        zoomImg={{
          src: props.src,
          height: props.zoomed.height,
          width: props.zoomed.width,
          alt: "here",
          srcSet: (ref.current as HTMLImageElement | null)?.getAttribute("srcset") ||
            "",
        }}
      >
        <div className="card elevate img-overlay img-zoomable rounded-2xl">
          <ExportedImage
            className="h-auto max-w-full rounded-2xl"
            src={props.src}
            height={props.small.height}
            width={props.small.width}
            alt="" />
        </div>
      </Zoom>
    </>
  );
};

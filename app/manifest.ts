import type { MetadataRoute } from "next";
import dictionaries from "./dictionaries/all";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#f51978",
    description: dictionaries.en.metadata.description,
    display: "browser",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/icon-light-512.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "any",
        src: "/icon-light.svg",
        type: "image/svg+xml",
      },
      {
        purpose: "monochrome",
        sizes: "any",
        src: "/icon-dark.svg",
        type: "image/svg+xml",
      },
    ],
    name: "Roast!",
    short_name: "Roast!",
    start_url: "/",
    theme_color: "#fff",
  };
}

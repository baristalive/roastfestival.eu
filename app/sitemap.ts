import type { MetadataRoute } from "next";
import { dictionaries } from "./dictionaries/all";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://roastfestival.eu/",
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          Object.keys(dictionaries).map((l) => [
            l === "cz" ? "cs" : l,
            `https://roastfestival.eu/${l}`,
          ]),
        ),
      },
    },
  ];
}

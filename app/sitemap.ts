import type { MetadataRoute } from "next";
import { dictionaries } from "./dictionaries/all";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(dictionaries).map((l) => ({
    alternates: {
      languages: Object.fromEntries(
        Object.keys(dictionaries).map((alternateLang) => [
          alternateLang === "cz" ? "cs" : alternateLang,
          `https://roastfestival.eu/${alternateLang}`,
        ]),
      ),
    },
    lastModified: new Date(),
    url: `https://roastfestival.eu/${l}`,
  }));
}

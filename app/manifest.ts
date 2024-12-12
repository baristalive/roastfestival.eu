import type { MetadataRoute } from 'next'
import dictionaries from "./dictionaries/all";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Roast!',
    short_name: 'Roast!',
    description: dictionaries.en.metadata.description,
    start_url: '/',
    display: 'browser',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: "/icon-light-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icon-light-1024.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icon-light.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/icon-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "monochrome"
      }
    ],
  }

}

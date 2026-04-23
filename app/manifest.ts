import type {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bike Sofia",
    short_name: "Bike Sofia",
    description:
      "Safer cycling routes, official Sofia bike layers and community signals in a mobile-friendly companion.",
    start_url: "/bg",
    scope: "/",
    display: "standalone",
    background_color: "#edf4fb",
    theme_color: "#edf4fb",
    orientation: "portrait",
    categories: ["maps", "navigation", "travel", "sports"],
    lang: "bg",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-icon?size=180",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}

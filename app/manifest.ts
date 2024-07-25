import { appDescription, appTitle } from "@/api/constants";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appTitle,
    short_name: appTitle,
    description: appDescription,
    start_url: "/app",
    display: "standalone",
    background_color: "#fcfbfc",
    theme_color: "#fcfbfc",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16",
        type: "image/x-icon",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { src: "/sportgalaxy-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/sportgalaxy-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    lang: "en",
  };
}

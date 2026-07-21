import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Școala 13 Botoșani — Monitorul lucrărilor",
    short_name: "Școala 13",
    description:
      "Monitorizarea publică a lucrărilor de reabilitare de la Școala Gimnazială nr. 13 Botoșani.",
    start_url: "/",
    display: "standalone",
    background_color: "#14151a",
    theme_color: "#14151a",
    lang: "ro",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

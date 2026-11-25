import type { MetadataRoute } from "next";

// Name, colours and icons for "Add to Home Screen" and Android's browser chrome.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KOKOY Pool Club · Unawatuna",
    short_name: "KOKOY",
    description: "Pool club in Unawatuna, Sri Lanka: free pool access, all-day brunch, cocktails and DJs.",
    start_url: "/",
    display: "standalone",
    background_color: "#25232B",
    theme_color: "#25232B",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}

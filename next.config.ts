import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Placeholder photography is resized on Unsplash's CDN, so nothing is
    // optimised (or cached to disk) by the Next server. Swap for local images later.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [70, 80],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

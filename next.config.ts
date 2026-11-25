import type { NextConfig } from "next";

// Standard protections for every response. HSTS only takes effect over HTTPS.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

// Photos and films keep their names when re-encoded, so they are cached for a day (served stale
// for a week while it refreshes) rather than forever.
const MEDIA_CACHE = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];

const nextConfig: NextConfig = {
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
    // The root layout sits under [lang], so unmatched URLs use app/global-not-found.tsx.
    globalNotFound: true,
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      { source: "/video/:file*", headers: MEDIA_CACHE },
      { source: "/photos/:file*", headers: MEDIA_CACHE },
    ];
  },
  images: {
    // The shoot photography lives in /public/photos and is resized by Next's own optimiser;
    // nothing else may be optimised.
    qualities: [70, 80],
    localPatterns: [{ pathname: "/photos/**", search: "" }],
  },
  turbopack: {
    // Pin the project root: a stray package-lock.json in the home folder otherwise confuses it.
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { LOCALES } from "@/lib/i18n";

// Every page in every language, each listing its translations so search engines pair them
// (and show Russian speakers the Russian page).
const PAGES = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/menu", priority: 0.8, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((lang) => ({
      url: `${SITE.url}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}${path}`])),
          "x-default": `${SITE.url}/en${path}`,
        },
      },
    })),
  );
}

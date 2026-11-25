// Structured data (schema.org JSON-LD) for search engines. It tells Google, Bing and Yandex what
// KOKOY is (a pool club: restaurant and bar with a free-to-use pool), where it is, when it is open,
// where the menu lives and which social profiles are its own, so it can show up as a rich local
// result. Built from the same content as the page, so the two never disagree.

import { IMG, SITE } from "./content";
import type { Dict, Locale } from "./i18n";

const abs = (path: string) => `${SITE.url}${path}`;
const BUSINESS_ID = `${SITE.url}/#kokoy`;

/** The business itself, shared by every page (other nodes point at it by @id). */
function business(t: Dict, lang: Locale) {
  return {
    "@type": ["Restaurant", "BarOrPub"],
    "@id": BUSINESS_ID,
    name: "KOKOY Pool Club",
    alternateName: "KOKOY",
    description: t.meta.description,
    url: abs(`/${lang}`),
    logo: abs("/brand/kokoy-logo-brown.png"),
    image: [abs("/og.jpg"), abs(IMG.poolTropic), abs(IMG.brunchSpread), abs(IMG.cheers)],
    // TODO(confirm): add streetAddress and "geo" (exact coordinates) once confirmed; a wrong pin
    // does more harm than none.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Unawatuna",
      addressRegion: "Southern Province",
      postalCode: "80600",
      addressCountry: "LK",
    },
    areaServed: ["Unawatuna", "Galle", "Sri Lanka"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: SITE.opens,
        closes: SITE.closes,
      },
    ],
    servesCuisine: ["Brunch", "Seafood", "International", "Sri Lankan", "Cocktails"],
    priceRange: "$$",
    currenciesAccepted: "LKR",
    acceptsReservations: false,
    hasMenu: abs(`/${lang}/menu`),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming pool (free, no minimum spend)", value: true },
      { "@type": "LocationFeatureSpecification", name: "Walk-ins welcome", value: true },
      { "@type": "LocationFeatureSpecification", name: "Live DJ music", value: true },
    ],
    publicAccess: true,
    isAccessibleForFree: true,
    sameAs: SITE.social.map((s) => s.url),
    ...(SITE.whatsapp ? { telephone: `+${SITE.whatsapp}` } : {}),
    ...(SITE.email ? { email: SITE.email } : {}),
  };
}

function website(lang: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: "KOKOY Pool Club",
    inLanguage: lang,
    publisher: { "@id": BUSINESS_ID },
  };
}

/** Home page: the business, the site, and the FAQ (answers can appear straight in search). */
export function homeJsonLd(t: Dict, lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(t, lang),
      website(lang),
      {
        "@type": "FAQPage",
        "@id": abs(`/${lang}#faq`),
        inLanguage: lang,
        mainEntity: t.visit.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** Menu page: the business plus a breadcrumb (Home › Menu) for the search result. */
export function menuJsonLd(t: Dict, lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(t, lang),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "KOKOY Pool Club", item: abs(`/${lang}`) },
          { "@type": "ListItem", position: 2, name: t.menuPage.label, item: abs(`/${lang}/menu`) },
        ],
      },
    ],
  };
}

/** Renders JSON-LD safely: "<" is escaped so the data can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

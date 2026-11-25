import type { Metadata } from "next";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/sections/Footer";
import MenuPage from "@/components/menu/MenuPage";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { JsonLd, menuJsonLd } from "@/lib/seo";

// Pages are validated on their own, so the layout's `instant = false` does not cover this one;
// see the note in ../layout.tsx.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/menu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.menuPage.meta.title,
    description: t.menuPage.meta.description,
    alternates: {
      canonical: `/${lang}/menu`,
      languages: { en: "/en/menu", ru: "/ru/menu", "x-default": "/en/menu" },
    },
    openGraph: {
      title: t.menuPage.meta.title,
      description: t.menuPage.meta.description,
      url: `/${lang}/menu`,
      siteName: "KOKOY Pool Club",
      locale: lang === "ru" ? "ru_RU" : "en_GB",
      alternateLocale: lang === "ru" ? ["en_GB"] : ["ru_RU"],
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "KOKOY Pool Club, Unawatuna" }],
    },
    twitter: { card: "summary_large_image", title: t.menuPage.meta.title, description: t.menuPage.meta.description, images: ["/og.jpg"] },
  };
}

// The drinks menu. The layout above validates the language and provides the dictionary.
export default async function Menu({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;

  return (
    <>
      <JsonLd data={menuJsonLd(getDictionary(lang), lang)} />
      <Header docked />
      <main id="main">
        <MenuPage />
      </main>
      <Footer />
      <MobileMenu />
    </>
  );
}

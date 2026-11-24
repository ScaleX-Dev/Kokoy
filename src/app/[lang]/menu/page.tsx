import type { Metadata } from "next";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/sections/Footer";
import MenuPage from "@/components/menu/MenuPage";
import { getDictionary, hasLocale } from "@/lib/i18n";

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
      locale: lang === "ru" ? "ru_RU" : "en_GB",
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

// The drinks menu. The layout above validates the language and provides the dictionary.
export default function Menu() {
  return (
    <>
      <Header docked />
      <main id="main">
        <MenuPage />
      </main>
      <Footer />
      <MobileMenu />
    </>
  );
}

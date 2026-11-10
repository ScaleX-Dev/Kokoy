import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Onest, Unbounded } from "next/font/google";
import "lenis/dist/lenis.css";
import "../globals.css";
import Providers from "@/components/Providers";
import { SITE } from "@/lib/content";
import { LOCALES, getDictionary, hasLocale } from "@/lib/i18n";

// Both faces cover Cyrillic, which Russian requires (brand foundation §04).
const display = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const sans = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Dev-only instant validation renders this layout with a placeholder `lang` that is not a
// real locale, so notFound() below aborts it. Every real locale is prerendered by
// generateStaticParams, so the route is already fully static.
export const instant = false;

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ru: "/ru", "x-default": "/en" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "ru" ? "ru_RU" : "en_GB",
      type: "website",
      images: [{ url: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1200&h=630&q=70", width: 1200, height: 630 }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#25232B",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hold the hero until GSAP runs, without hiding it when JS is off. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Providers t={getDictionary(lang)} lang={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

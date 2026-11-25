import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Menu from "@/components/sections/Menu";
import Vibe from "@/components/sections/Vibe";
import Day from "@/components/sections/Day";
import Brunch from "@/components/sections/Brunch";
import Drinks from "@/components/sections/Drinks";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import Footer from "@/components/sections/Footer";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { JsonLd, homeJsonLd } from "@/lib/seo";

// "Make a day of it" (one day, four moods) is hidden for now, not removed.
// It is left out of the render rather than hidden with CSS: its pinned scroll would
// otherwise still reserve several screens of empty scrolling. Set to true to bring it back.
const SHOW_DAY = false;

// Pages are validated on their own, so the layout's `instant = false` does not cover this one;
// see the note in ./layout.tsx.
export const instant = false;

// Homepage flow from the brand foundation, §07.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;

  return (
    <>
      <JsonLd data={homeJsonLd(getDictionary(lang), lang)} />
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Menu />
        <Vibe />
        {SHOW_DAY && <Day />}
        <Brunch />
        <Drinks />
        <Events />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <MobileMenu />
    </>
  );
}

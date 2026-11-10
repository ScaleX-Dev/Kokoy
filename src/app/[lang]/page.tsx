import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import WhatsAppFab from "@/components/WhatsAppFab";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Menu from "@/components/sections/Menu";
import Vibe from "@/components/sections/Vibe";
import Intro from "@/components/sections/Intro";
import Day from "@/components/sections/Day";
import Pool from "@/components/sections/Pool";
import Brunch from "@/components/sections/Brunch";
import Drinks from "@/components/sections/Drinks";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import Footer from "@/components/sections/Footer";

// "Make a day of it" (one day, four moods) is hidden for now, not removed.
// It is left out of the render rather than hidden with CSS: its pinned scroll would
// otherwise still reserve several screens of empty scrolling. Set to true to bring it back.
const SHOW_DAY = false;

// Homepage flow from the brand foundation, §07.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Menu />
        <Vibe />
        <Intro />
        {SHOW_DAY && <Day />}
        <Pool />
        <Brunch />
        <Drinks />
        <Events />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <WhatsAppFab />
      <MobileMenu />
    </>
  );
}

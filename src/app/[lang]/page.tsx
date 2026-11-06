import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import WhatsAppFab from "@/components/WhatsAppFab";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Intro from "@/components/sections/Intro";
import Day from "@/components/sections/Day";
import Pool from "@/components/sections/Pool";
import Brunch from "@/components/sections/Brunch";
import Drinks from "@/components/sections/Drinks";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import Footer from "@/components/sections/Footer";

// Homepage flow from the brand foundation, §07.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Intro />
        <Day />
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

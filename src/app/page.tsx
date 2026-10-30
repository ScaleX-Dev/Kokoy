import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import BookingDrawer from "@/components/BookingDrawer";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ArchReveal from "@/components/sections/ArchReveal";
import Story from "@/components/sections/Story";
import Spaces from "@/components/sections/Spaces";
import Day from "@/components/sections/Day";
import Marquee from "@/components/sections/Marquee";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Intro />
        <ArchReveal />
        <Story />
        <Spaces />
        <Day />
        <Marquee />
        <Menu />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <MenuOverlay />
      <BookingDrawer />
      <Cursor />
    </>
  );
}

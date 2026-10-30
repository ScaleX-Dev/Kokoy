"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type BookingKind = "pool" | "table";

type UI = {
  ready: boolean;
  setReady: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  booking: BookingKind | null;
  openBooking: (kind: BookingKind) => void;
  closeBooking: () => void;
  scrollTo: (target: string | number) => void;
};

const UIContext = createContext<UI | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <Providers>");
  return ctx;
}

export default function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState<BookingKind | null>(null);

  // Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger stays in lockstep.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Freeze the page while an overlay is open (and until the preloader finishes).
  const locked = menuOpen || booking !== null || !ready;
  useEffect(() => {
    const lenis = lenisRef.current;
    if (locked) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = locked ? "hidden" : "";
    // Pins measured while locked need re-measuring once the page can scroll again.
    if (!locked) ScrollTrigger.refresh();
  }, [locked]);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, { duration: 1.8 });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target });
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  }, []);

  const value = useMemo<UI>(
    () => ({
      ready,
      setReady,
      menuOpen,
      setMenuOpen,
      booking,
      openBooking: (kind) => {
        setMenuOpen(false);
        setBooking(kind);
      },
      closeBooking: () => setBooking(null),
      scrollTo,
    }),
    [ready, menuOpen, booking, scrollTo],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

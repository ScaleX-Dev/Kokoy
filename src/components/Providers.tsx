"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Dict, Locale } from "@/lib/i18n";

type UI = {
  t: Dict;
  lang: Locale;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (target: string | number) => void;
};

const UIContext = createContext<UI | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <Providers>");
  return ctx;
}

export const SCROLL_KEY = "kokoy:scroll";

export default function Providers({ t, lang, children }: { t: Dict; lang: Locale; children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger stays in lockstep.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (x) => 1 - Math.pow(1 - x, 4) });
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

  // Pins are measured with fallback fonts first; re-measure once the real ones arrive.
  // Then return to where the visitor was if they just switched language.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      let saved: string | null = null;
      try {
        saved = sessionStorage.getItem(SCROLL_KEY);
        sessionStorage.removeItem(SCROLL_KEY);
      } catch {}
      if (saved) {
        const y = Number(saved);
        if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo({ top: y });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    const offset = typeof target === "string" ? -64 : 0;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, { duration: 1.6, offset });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target });
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  }, []);

  const value = useMemo<UI>(() => ({ t, lang, menuOpen, setMenuOpen, scrollTo }), [t, lang, menuOpen, scrollTo]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

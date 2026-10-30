"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// A soft trailing ring for mouse users; grows over photos and anything clickable.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const el = ring.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const t = e.target as HTMLElement;
      const big = !!t.closest("a, button, [data-tile]");
      gsap.to(el, { scale: big ? 2.2 : 1, opacity: 1, duration: 0.4, overwrite: "auto" });
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[95] size-7 rounded-full border border-white mix-blend-difference"
    />
  );
}

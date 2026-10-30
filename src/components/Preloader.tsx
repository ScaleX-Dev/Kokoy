"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUI } from "./Providers";

const WORD = "kokoy";

export default function Preloader() {
  const { setReady } = useUI();
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReady(true);
        setGone(true);
        return;
      }
      const count = { v: 0 };
      const counter = root.current!.querySelector<HTMLElement>("[data-count]")!;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-char]", { yPercent: 115, duration: 1.4, stagger: 0.07 })
        .to(
          count,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => (counter.textContent = String(Math.round(count.v)).padStart(3, "0")),
          },
          0,
        )
        .from("[data-line]", { scaleX: 0, duration: 1.6, ease: "power2.inOut" }, 0)
        .to("[data-char]", { yPercent: -115, duration: 0.9, stagger: 0.04, ease: "expo.in" }, 1.8)
        .to("[data-meta]", { opacity: 0, duration: 0.4 }, 1.8)
        .add(() => setReady(true), 2.35)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "expo.inOut" }, 2.3)
        .add(() => setGone(true));
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night text-paper"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden="true"
    >
      <div className="display flex overflow-hidden pb-[0.08em] text-[26vw] md:text-[15vw]">
        {WORD.split("").map((c, i) => (
          <span key={i} data-char className="inline-block">
            {c}
          </span>
        ))}
      </div>
      <div data-meta className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 md:inset-x-10">
        <span className="label">A courtyard of water &amp; straw</span>
        <span data-line className="mb-1 hidden h-px flex-1 origin-left bg-paper/40 md:block" />
        <span data-count className="font-serif text-3xl tabular-nums">000</span>
      </div>
    </div>
  );
}

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
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-char]", { yPercent: 115, duration: 1.2, stagger: 0.06 })
        .add(() => setReady(true), 1.35)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "expo.inOut" }, 1.3)
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
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GALLERY, IMG } from "@/lib/content";

const soft = [0.2, 0.7, 0.1, 1] as const;
const COLS = [
  { idx: [0, 3, 6], speed: -10, pad: "" },
  { idx: [1, 4, 7], speed: 8, pad: "md:pt-28" },
  { idx: [2, 5, 8], speed: -16, pad: "md:pt-56" },
];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-col]").forEach((col, i) => {
          gsap.to(col, {
            yPercent: COLS[i].speed,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        gsap.to("[data-band-img]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: "[data-band]", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-tile]").forEach((t) => {
          gsap.fromTo(t, { clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }, {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: { trigger: t, start: "top 92%" },
          });
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") setOpen((o) => (o + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o + GALLERY.length - 1) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section ref={root} id="gallery" className="relative">
      {/* Full-bleed breathing band */}
      <div data-band className="relative h-[80svh] overflow-hidden md:h-[110svh]">
        <div data-band-img className="absolute inset-x-0 -top-[18%] h-[136%]">
          <Image src={IMG.terraces} alt="Rice terraces glowing in late sun" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-night/25" />
        <div className="absolute inset-x-4 bottom-10 text-paper md:inset-x-10 md:bottom-16">
          <span className="label">( 05 ) &nbsp;Gallery</span>
          <h2 className="display mt-4 text-[18vw] md:text-[11vw]">
            Look <span className="italic">closer</span>
          </h2>
        </div>
      </div>

      <div className="px-4 pt-20 pb-32 md:px-10 md:pb-56">
        <p className="mb-12 max-w-[36ch] text-mute md:mb-0 md:ml-auto md:text-right">
          Tap any photo to open it. Daytime pool shots, coffee close-ups and people swimming are coming soon.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
          {COLS.map((c, ci) => (
            <div key={ci} data-col className={clsx("flex flex-col gap-4 md:gap-8", c.pad, ci === 2 && "col-span-2 grid grid-cols-2 md:col-span-1 md:flex")}>
              {c.idx.map((i) => {
                const g = GALLERY[i];
                return (
                  <button
                    key={i}
                    type="button"
                    data-tile
                    onClick={() => setOpen(i)}
                    aria-label={`Open photo: ${g.alt}`}
                    className={clsx("group relative block w-full overflow-hidden", g.h, g.arch ? "shape-arch" : "rounded-[4px]")}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 46vw"
                      className="object-cover transition-transform duration-[1.6s] ease-soft group-hover:scale-105"
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open >= 0 && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[85] flex flex-col bg-night/95 text-paper backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            data-lenis-prevent
          >
            <div className="flex h-[72px] items-center justify-between px-4 md:h-[84px] md:px-10">
              <span className="label tabular-nums">
                {open + 1} / {GALLERY.length}
              </span>
              <button type="button" onClick={() => setOpen(-1)} className="label flex min-h-11 items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
                Close
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-between gap-2 px-2 pb-6 md:gap-6 md:px-10 md:pb-10">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => setOpen((o) => (o + GALLERY.length - 1) % GALLERY.length)}
                className="z-10 grid size-12 shrink-0 place-items-center rounded-full border border-paper/30 hover:bg-paper hover:text-ink"
              >
                <Arrow flip />
              </button>
              <div className="relative h-full flex-1">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.figure
                    key={open}
                    className="absolute inset-0 flex flex-col"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: soft }}
                  >
                    <div className="relative flex-1">
                      <Image src={GALLERY[open].src} alt={GALLERY[open].alt} fill sizes="90vw" quality={80} className="object-contain" />
                    </div>
                    <figcaption className="mt-4 text-center text-sm text-paper/70">{GALLERY[open].alt}</figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setOpen((o) => (o + 1) % GALLERY.length)}
                className="z-10 grid size-12 shrink-0 place-items-center rounded-full border border-paper/30 hover:bg-paper hover:text-ink"
              >
                <Arrow />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M2 9h14M11 4l5 5-5 5" />
    </svg>
  );
}

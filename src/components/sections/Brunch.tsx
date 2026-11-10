"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { BRUNCH_IMG, IMG } from "@/lib/content";
import { useUI } from "../Providers";
import SpinBadge from "../ui/SpinBadge";
import { WhatsAppButton } from "../ui/Buttons";
import { ArrowIcon, Burst } from "../ui/Icons";

const STICKERS = ["bg-orange", "bg-pink", "bg-coral"];
const TILT = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"];

export default function Brunch() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-brunch-in]", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from("[data-dish]", {
          x: 120,
          opacity: 0,
          duration: 1.3,
          stagger: 0.08,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: rail.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  // Rail progress, edge state and mouse drag (touch scrolls natively).
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      // Progress is written straight to the DOM so scrolling never re-renders the rail.
      if (thumb.current) thumb.current.style.transform = `translateX(${(max > 0 ? el.scrollLeft / max : 0) * 300}%)`;
      const next = { start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 };
      setEdge((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let down = false;
    let moved = false;
    let x0 = 0;
    let s0 = 0;
    let settle = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = el.scrollLeft;
      window.clearTimeout(settle);
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = s0 - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      // Glide to the nearest card, then hand control back to scroll-snap.
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-dish]"));
      const margin = cards[0] ? parseFloat(getComputedStyle(cards[0]).scrollMarginLeft) || 0 : 0;
      const snapOf = (c: HTMLElement) => Math.min(c.offsetLeft - margin, el.scrollWidth - el.clientWidth);
      const target = cards.reduce((best, c) => (Math.abs(snapOf(c) - el.scrollLeft) < Math.abs(snapOf(best) - el.scrollLeft) ? c : best), cards[0]);
      if (target) el.scrollTo({ left: snapOf(target), behavior: "smooth" });
      settle = window.setTimeout(() => {
        el.style.scrollSnapType = "";
      }, 600);
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      window.clearTimeout(settle);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-dish]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 24), behavior: "smooth" });
  };

  return (
    <section ref={root} id="brunch" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="pad grid gap-10 md:grid-cols-12 md:items-end">
        <div className="relative md:col-span-7">
          <p data-brunch-in className="eyebrow flex items-center gap-2 text-charcoal/70">
            <span className="size-2.5 rounded-full bg-orange" aria-hidden="true" />
            {t.brunch.label}
          </p>
          <h2 data-brunch-in className="display mt-5 text-[clamp(2.4rem,6.4vw,6.5rem)] font-extrabold">
            {t.brunch.title}
          </h2>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p data-brunch-in className="text-lg leading-relaxed text-charcoal/75">
            {t.brunch.body}
          </p>
          <div data-brunch-in className="mt-6 flex flex-wrap items-center gap-4">
            <WhatsAppButton message={t.wa.brunch} tone="charcoal">
              {t.brunch.cta}
            </WhatsAppButton>
          </div>
        </div>
      </div>

      <div className="relative mt-14 md:mt-20">
        <div className="absolute -top-16 right-[8vw] z-10 hidden md:block lg:-top-24">
          <SpinBadge text={t.brunch.badge} className="w-36 bg-orange text-charcoal lg:w-44">
            <Burst className="size-10" />
          </SpinBadge>
        </div>

        <ul
          ref={rail}
          className="pad relative flex cursor-grab snap-x snap-mandatory overscroll-x-contain gap-6 overflow-x-auto pb-6 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          // Only sideways gestures belong to the rail; vertical wheel still scrolls the page smoothly.
          data-lenis-prevent-horizontal
          aria-label={t.brunch.label}
        >
          {t.brunch.items.map((d, i) => (
            <li
              key={d.name}
              data-dish
              className="w-[78vw] shrink-0 snap-start scroll-ml-[var(--pad)] sm:w-[46vw] lg:w-[30vw] xl:w-[25vw]"
            >
              <div className="relative aspect-[4/5] transform-gpu overflow-hidden rounded-[32px] bg-sand">
                <Image
                  src={IMG[BRUNCH_IMG[i]]}
                  alt={t.alt[BRUNCH_IMG[i]]}
                  fill
                  draggable={false}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                  className="object-cover transition-transform duration-[1.4s] ease-soft hover:scale-105"
                />
                <span
                  className={clsx(
                    "absolute top-4 left-4 rounded-full px-4 py-2 text-[13px] font-bold text-charcoal shadow-[0_6px_16px_-6px_rgb(37_35_43/0.5)]",
                    STICKERS[i % STICKERS.length],
                    TILT[i % TILT.length],
                  )}
                >
                  {d.tag}
                </span>
              </div>
              <h3 className="display mt-5 text-[1.6rem] leading-tight">{d.name}</h3>
              <p className="mt-2 leading-relaxed text-charcoal/75">{d.desc}</p>
            </li>
          ))}
          <li aria-hidden="true" className="w-1 shrink-0 md:w-4" />
        </ul>

        <div className="pad mt-6 flex items-center gap-6">
          <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-charcoal/10" aria-hidden="true">
            <div ref={thumb} className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-orange will-change-transform" />
          </div>
          <p className="hidden text-sm text-charcoal/70 sm:block">{t.brunch.note}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={edge.start}
              aria-label={t.a11y.prev}
              className="grid size-12 place-items-center rounded-full border-2 border-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
            >
              <ArrowIcon dir="left" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={edge.end}
              aria-label={t.a11y.next}
              className="grid size-12 place-items-center rounded-full border-2 border-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
            >
              <ArrowIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

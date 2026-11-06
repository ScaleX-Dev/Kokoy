"use client";

import Image from "next/image";
import clsx from "clsx";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DRINK_STYLE, IMG } from "@/lib/content";
import { useUI } from "../Providers";
import SpinBadge from "../ui/SpinBadge";
import { WhatsAppButton } from "../ui/Buttons";

const soft = [0.2, 0.7, 0.1, 1] as const;

/** Pick a drink and the whole section takes on its colour. */
export default function Drinks() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const drink = t.drinks.items[active];
  const style = DRINK_STYLE[active];
  const n = t.drinks.items.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-drinks-in]", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 65%" },
        });
        gsap.from("[data-drink-orb]", {
          scale: 0.6,
          rotate: -25,
          opacity: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 65%" },
        });
      });
    },
    { scope: root },
  );

  const onKey = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + n) % n;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={root}
      id="drinks"
      className="relative overflow-hidden py-24 text-charcoal transition-colors duration-700 ease-soft md:py-32 lg:min-h-[100svh]"
      style={{ backgroundColor: style.color }}
    >
      <div className="pad grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-6">
          <p data-drinks-in className="eyebrow flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-charcoal" aria-hidden="true" />
            {t.drinks.label}
          </p>
          <h2 data-drinks-in className="display mt-5 max-w-[14ch] text-[clamp(2.2rem,4.6vw,4.5rem)] font-extrabold">
            {t.drinks.title}
          </h2>

          <div data-drinks-in className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label={t.drinks.label} onKeyDown={onKey}>
            {t.drinks.items.map((d, i) => (
              <button
                key={d.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`drink-tab-${i}`}
                aria-selected={active === i}
                aria-controls="drink-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={clsx(
                  "flex min-h-12 items-center gap-2 rounded-full border-2 border-charcoal px-5 text-[15px] font-semibold transition-colors duration-300",
                  active === i ? "bg-charcoal text-cream" : "hover:bg-charcoal/10",
                )}
              >
                <span className="size-3 rounded-full border-2 border-current" style={{ backgroundColor: DRINK_STYLE[i].color }} aria-hidden="true" />
                {d.name}
              </button>
            ))}
          </div>

          <div id="drink-panel" role="tabpanel" aria-labelledby={`drink-tab-${active}`} className="relative mt-10 min-h-[230px] md:min-h-[260px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: soft }}
              >
                <p className="font-display text-sm font-bold tabular-nums opacity-60">
                  0{active + 1} / 0{n}
                </p>
                <h3 className="mt-2 font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.92] font-black tracking-[-0.04em] uppercase">
                  {drink.name}
                </h3>
                <p className="mt-5 text-lg font-medium md:text-xl">{drink.spec}</p>
                <p className="mt-2 text-lg opacity-75">{drink.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div data-drinks-in className="mt-4">
            <WhatsAppButton message={t.wa.drinks} tone="charcoal">
              {t.drinks.cta}
            </WhatsAppButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:col-span-5 lg:col-start-8">
          <div data-drink-orb className="relative aspect-square">
            {/* Rings that echo the sun motif. */}
            <div className="absolute -inset-[6%] rounded-full border-2 border-charcoal/15" aria-hidden="true" />
            <div className="absolute -inset-[14%] hidden rounded-full border-2 border-dashed border-charcoal/10 sm:block" aria-hidden="true" />
            <div className="relative size-full overflow-hidden rounded-full bg-charcoal/10 shadow-[0_30px_80px_-30px_rgb(37_35_43/0.6)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ clipPath: "circle(0% at 50% 100%)" }}
                  animate={{ clipPath: "circle(100% at 50% 100%)" }}
                  transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
                >
                  <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: soft }}>
                    <Image src={IMG[style.img]} alt={t.alt[style.img]} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-2 -left-2">
              <SpinBadge text={t.drinks.badge} className="w-28 bg-charcoal text-cream sm:w-36" speed={14}>
                <span className="font-display text-xl font-black">0{active + 1}</span>
              </SpinBadge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

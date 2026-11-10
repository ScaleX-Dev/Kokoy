"use client";

import Image from "next/image";
import clsx from "clsx";
import { Fragment, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { BRUNCH_IMG, DRINK_STYLE, IMG, type ImgKey } from "@/lib/content";
import { useUI } from "../Providers";
import Marquee from "../ui/Marquee";
import Rich from "../ui/Rich";
import SpinBadge from "../ui/SpinBadge";
import { WhatsAppButton } from "../ui/Buttons";
import { Burst } from "../ui/Icons";

type Tab = "food" | "drinks";
type Shot = { name: string; note: string; img: ImgKey };

const TILT = ["-rotate-[4deg]", "rotate-[3deg]", "-rotate-[2deg]", "rotate-[4deg]", "-rotate-[3deg]", "rotate-[2deg]"];
const LIFT = ["translate-y-6", "-translate-y-4", "translate-y-10", "-translate-y-2", "translate-y-4", "-translate-y-6"];
// Brand props tucked behind the polaroids, after the shot at that index.
const PROPS: Partial<Record<number, "sun" | "badge" | "burst">> = { 0: "sun", 2: "badge", 4: "burst" };

/**
 * The menu teaser, after the reference: a heading with a Food / Drinks switch and one
 * clear action, then a drifting row of polaroids showing what's actually on the menu.
 */
export default function Menu() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<Tab>("food");

  const shots: Record<Tab, Shot[]> = {
    food: t.brunch.items.map((d, i) => ({ name: d.name, note: d.desc, img: BRUNCH_IMG[i] })),
    drinks: t.drinks.items.map((d, i) => ({ name: d.name, note: d.spec, img: DRINK_STYLE[i].img })),
  };
  const tabs: Tab[] = ["food", "drinks"];
  // A short list (four drinks) is repeated so one copy of the row is always wider than
  // the screen; otherwise the endless loop would show a gap on wide displays.
  const row = shots[tab].length < 6 ? [...shots[tab], ...shots[tab]] : shots[tab];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-menu-in]", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = tab === "food" ? "drinks" : "food";
    setTab(next);
    document.getElementById(`menu-tab-${next}`)?.focus();
  };

  return (
    <section ref={root} id="menu" className="section-y relative overflow-hidden bg-cream">
      <div className="pad flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <h2 data-menu-in className="title">
            <Rich text={t.eats.title} className="font-black" />
          </h2>
          <p data-menu-in className="mt-5 max-w-[46ch] text-lg leading-relaxed text-charcoal/75">
            {t.eats.body}
          </p>
        </div>

        {/* The switch picks what the row shows; the button asks for that menu on WhatsApp. */}
        <div data-menu-in className="flex flex-wrap items-center gap-3">
          <div role="tablist" aria-label={t.eats.label} onKeyDown={onKey} className="inline-flex rounded-full border-2 border-charcoal p-1">
            {tabs.map((k) => (
              <button
                key={k}
                id={`menu-tab-${k}`}
                type="button"
                role="tab"
                aria-selected={tab === k}
                aria-controls="menu-panel"
                tabIndex={tab === k ? 0 : -1}
                onClick={() => setTab(k)}
                className={clsx(
                  "min-h-10 rounded-full px-5 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-300",
                  tab === k ? "bg-charcoal text-cream" : "hover:bg-charcoal/10",
                )}
              >
                {t.eats[k]}
              </button>
            ))}
          </div>
          <WhatsAppButton message={tab === "food" ? t.wa.brunch : t.wa.drinks} tone="coral">
            {t.eats.cta}
          </WhatsAppButton>
        </div>
      </div>

      <div id="menu-panel" role="tabpanel" aria-labelledby={`menu-tab-${tab}`} className="mt-6 md:mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}>
            {/* Polaroids drift past; scrolling speeds them up, like the ticker. */}
            <Marquee duration={row.length * 10} trackClassName="py-14 md:py-16">
              {row.map((s, i) => (
                <Fragment key={`${s.name}-${i}`}>
                  <figure
                    aria-hidden={i >= shots[tab].length || undefined}
                    className={clsx(
                      "group relative z-10 mx-3 w-[clamp(210px,22vw,330px)] shrink-0 rounded-[8px] bg-white p-3 pb-4 shadow-[0_28px_50px_-26px_rgb(37_35_43/0.6)] transition-[rotate] duration-700 ease-soft hover:rotate-0 md:mx-5 md:p-4 md:pb-5",
                      TILT[i % TILT.length],
                      LIFT[i % LIFT.length],
                    )}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-sand">
                      <Image src={IMG[s.img]} alt={t.alt[s.img]} fill sizes="(min-width: 768px) 22vw, 210px" className="object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105" />
                    </div>
                    <figcaption className="mt-3 px-0.5">
                      <span className="block font-display text-[15px] leading-tight font-bold tracking-[-0.01em] uppercase md:text-[17px]">{s.name}</span>
                      <span className="mt-1 block truncate text-[13px] text-charcoal/65 md:text-sm">{s.note}</span>
                    </figcaption>
                  </figure>
                  {PROPS[i] && (
                    <div aria-hidden="true" className="relative z-0 -mx-[7vw] w-[clamp(130px,15vw,230px)] shrink-0 translate-y-[30%]">
                      {PROPS[i] === "sun" && <span className="sun block aspect-square w-full rounded-full" />}
                      {PROPS[i] === "burst" && <Burst className="block w-full -rotate-12 text-coral" />}
                      {PROPS[i] === "badge" && (
                        <SpinBadge text={t.brunch.badge} className="w-full bg-orange text-charcoal">
                          <Burst className="size-[30%]" />
                        </SpinBadge>
                      )}
                    </div>
                  )}
                </Fragment>
              ))}
            </Marquee>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

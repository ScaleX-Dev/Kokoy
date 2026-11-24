"use client";

import Image from "next/image";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/content";
import { useUI } from "../Providers";
import Marquee from "../ui/Marquee";
import Rich from "../ui/Rich";
import SpinBadge from "../ui/SpinBadge";
import { LinkButton } from "../ui/Buttons";
import { Burst } from "../ui/Icons";

const TILT = ["-rotate-[4deg]", "rotate-[3deg]", "-rotate-[2deg]", "rotate-[4deg]", "-rotate-[3deg]", "rotate-[2deg]"];
const LIFT = ["translate-y-6", "-translate-y-4", "translate-y-10", "-translate-y-2", "translate-y-4", "-translate-y-6"];
// Brand props tucked behind the polaroids, after the shot at that index.
const PROPS: Partial<Record<number, "sun" | "badge" | "burst">> = { 0: "sun", 4: "badge", 8: "burst" };

// The KOKOY aesthetic in one drifting row: food, drinks, the pool and the people, alternating so
// no two of a kind sit side by side. Twelve shots keep one copy of the row wider than any screen.
const SHOTS: ImgKey[] = [
  "underwater", // a guest at the pool edge with her drink
  "pancakes", // the KOKOY burger
  "poolTropic", // the curved pool
  "pinkDrink", // a guest sipping a pink cocktail
  "eggsToast", // baked eggs
  "spritz", // a cocktail being poured
  "friendsSunset", // a couple at a table by the pool
  "lemonade", // the lemongrass cooler
  "lights", // the courtyard pool at night
  "frenchToast", // grilled skewers served
  "cheers", // friends clinking glasses
  "poolDeck", // the outdoor shower by the pool
];

/**
 * The menu teaser, after the reference: a heading and one clear action (the full menu), then
 * a drifting row of polaroids showing the KOKOY aesthetic.
 */
export default function Menu() {
  const { t, lang } = useUI();
  const root = useRef<HTMLElement>(null);

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

  return (
    <section ref={root} id="menu" className="section-y relative overflow-hidden bg-cream">
      {/* Title, copy and the one action stacked on a single left edge, so nothing floats alone. */}
      <div className="pad">
        <h2 data-menu-in className="title">
          <Rich text={t.eats.title} className="font-black" />
        </h2>
        <p data-menu-in className="mt-5 max-w-[46ch] text-lg leading-relaxed text-charcoal/75">
          {t.eats.body}
        </p>
        <div data-menu-in className="mt-7">
          <LinkButton href={`/${lang}/menu`} tone="coral">
            {t.eats.cta}
          </LinkButton>
        </div>
      </div>

      {/* Polaroids drift past; scrolling speeds them up, like the ticker. */}
      <div className="mt-2 md:mt-4">
        <Marquee duration={SHOTS.length * 10} trackClassName="py-14 md:py-16">
          {SHOTS.map((img, i) => (
            <Fragment key={img}>
              <figure
                className={clsx(
                  "group relative z-10 mx-3 w-[clamp(210px,22vw,330px)] shrink-0 rounded-[8px] bg-white p-3 pb-10 shadow-[0_28px_50px_-26px_rgb(37_35_43/0.6)] transition-[rotate] duration-700 ease-soft hover:rotate-0 md:mx-5 md:p-4 md:pb-14",
                  TILT[i % TILT.length],
                  LIFT[i % LIFT.length],
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-sand">
                  <Image src={IMG[img]} alt={t.alt[img]} fill sizes="(min-width: 768px) 22vw, 210px" className="object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105" />
                </div>
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
      </div>
    </section>
  );
}

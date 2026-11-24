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

const TILT = ["-rotate-[5deg]", "rotate-[3deg]", "-rotate-[2deg]", "rotate-[5deg]", "-rotate-[3deg]", "rotate-[2deg]"];
const LIFT = ["translate-y-4", "-translate-y-6", "translate-y-8", "-translate-y-2", "translate-y-6", "-translate-y-8"];
// Every print gets its own size and shape (big landscapes, small squares, tall portraits) so the
// row reads like a real pile of prints rather than a grid. `vw` feeds next/image `sizes`.
type Frame = { w: string; ratio: string; vw: number; min: number };
const FRAMES: Frame[] = [
  { w: "w-[clamp(300px,34vw,520px)]", ratio: "aspect-[4/3]", vw: 34, min: 300 }, // big landscape
  { w: "w-[clamp(210px,20vw,300px)]", ratio: "aspect-[4/5]", vw: 20, min: 210 }, // portrait
  { w: "w-[clamp(240px,24vw,360px)]", ratio: "aspect-square", vw: 24, min: 240 }, // square
  { w: "w-[clamp(190px,17vw,260px)]", ratio: "aspect-[3/4]", vw: 17, min: 190 }, // small portrait
  { w: "w-[clamp(280px,30vw,460px)]", ratio: "aspect-[3/2]", vw: 30, min: 280 }, // wide landscape
  { w: "w-[clamp(230px,23vw,340px)]", ratio: "aspect-[2/3]", vw: 23, min: 230 }, // tall portrait
  { w: "w-[clamp(200px,18vw,270px)]", ratio: "aspect-square", vw: 18, min: 200 }, // small square
  { w: "w-[clamp(270px,28vw,420px)]", ratio: "aspect-[5/4]", vw: 28, min: 270 }, // landscape
  { w: "w-[clamp(220px,21vw,310px)]", ratio: "aspect-[4/5]", vw: 21, min: 220 }, // portrait
  { w: "w-[clamp(300px,32vw,500px)]", ratio: "aspect-[3/2]", vw: 32, min: 300 }, // big wide
  { w: "w-[clamp(220px,22vw,330px)]", ratio: "aspect-square", vw: 22, min: 220 }, // square
  { w: "w-[clamp(200px,19vw,290px)]", ratio: "aspect-[2/3]", vw: 19, min: 200 }, // tall
];

// Brand props laid over the row, after the shot at that index. The arch stickers are the KOKOY
// mark die-cut like a beach sticker; they and the badge sit in front and overlap both
// neighbours, the sun hangs behind.
type Prop = { kind: "arch"; tone: "coral" | "orange" | "pink"; tilt: string } | { kind: "sun" | "badge" | "burst" };
const PROPS: Partial<Record<number, Prop>> = {
  0: { kind: "arch", tone: "coral", tilt: "rotate-[9deg]" },
  2: { kind: "sun" },
  4: { kind: "badge" },
  6: { kind: "arch", tone: "orange", tilt: "-rotate-[8deg]" },
  8: { kind: "burst" },
  10: { kind: "arch", tone: "pink", tilt: "rotate-[6deg]" },
};

const ARCH_TONE = {
  coral: "bg-coral text-cream",
  orange: "bg-orange text-charcoal",
  pink: "bg-pink text-cream",
};

// The brand SVGs paint in currentColor, which an <img> cannot pass in, so they are used as
// masks over a block of the ink colour instead.
const maskOf = (src: string) => ({
  WebkitMaskImage: `url(${src})`,
  maskImage: `url(${src})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
});

// A white die-cut edge and a soft drop, so the props read as stickers lying on the prints.
const STICKER = "[filter:drop-shadow(0_0_0_#fff)_drop-shadow(5px_0_0_#fff)_drop-shadow(-5px_0_0_#fff)_drop-shadow(0_5px_0_#fff)_drop-shadow(0_-5px_0_#fff)_drop-shadow(0_22px_24px_rgb(37_35_43/0.35))]";

function ArchSticker({ tone, tilt }: { tone: keyof typeof ARCH_TONE; tilt: string }) {
  return (
    <div className={clsx("w-full", tilt, STICKER)}>
      <div className={clsx("flex aspect-[3/4] flex-col items-center justify-center gap-[7%] rounded-t-full rounded-b-[14px] px-[16%] pt-[14%]", ARCH_TONE[tone])}>
        <span className="block aspect-[340/454] w-[46%] bg-current" style={maskOf("/brand/kokoy-mark.svg")} />
        <span className="block aspect-[505/120] w-full bg-current" style={maskOf("/brand/kokoy-wordmark.svg")} />
      </div>
    </div>
  );
}

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
        <Marquee duration={SHOTS.length * 10} trackClassName="py-12 md:py-14">
          {SHOTS.map((img, i) => {
            const frame = FRAMES[i % FRAMES.length];
            const prop = PROPS[i];
            return (
              <Fragment key={img}>
                <figure
                  className={clsx(
                    "group relative z-10 mx-2 shrink-0 rounded-[8px] bg-white p-3 pb-10 shadow-[0_28px_50px_-26px_rgb(37_35_43/0.6)] transition-[rotate] duration-700 ease-soft hover:rotate-0 md:mx-4 md:p-4 md:pb-14",
                    frame.w,
                    TILT[i % TILT.length],
                    LIFT[i % LIFT.length],
                  )}
                >
                  <div className={clsx("relative overflow-hidden rounded-[3px] bg-sand", frame.ratio)}>
                    <Image
                      src={IMG[img]}
                      alt={t.alt[img]}
                      fill
                      sizes={`(min-width: 768px) ${frame.vw}vw, ${frame.min}px`}
                      className="object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105"
                    />
                  </div>
                </figure>
                {prop && (
                  <div
                    aria-hidden="true"
                    className={clsx(
                      "pointer-events-none relative shrink-0",
                      // The sun hangs behind the prints; everything else lies on top and
                      // overlaps the prints either side.
                      prop.kind === "sun"
                        ? "z-0 -mx-[clamp(90px,9vw,150px)] w-[clamp(170px,18vw,280px)] -translate-y-[38%]"
                        : "z-20 -mx-[clamp(56px,5.5vw,96px)]",
                      prop.kind === "arch" && "w-[clamp(130px,13vw,210px)] translate-y-[22%]",
                      prop.kind === "badge" && "w-[clamp(130px,12vw,190px)] -translate-y-[45%]",
                      prop.kind === "burst" && "w-[clamp(84px,8vw,130px)] translate-y-[60%]",
                    )}
                  >
                    {prop.kind === "arch" && <ArchSticker tone={prop.tone} tilt={prop.tilt} />}
                    {prop.kind === "sun" && <span className="sun block aspect-square w-full rounded-full" />}
                    {prop.kind === "burst" && <Burst className={clsx("block w-full -rotate-12 text-pink", STICKER)} />}
                    {prop.kind === "badge" && (
                      <SpinBadge text={t.brunch.badge} className={clsx("w-full -rotate-6 bg-orange text-charcoal", STICKER)}>
                        <Burst className="size-[30%]" />
                      </SpinBadge>
                    )}
                  </div>
                )}
              </Fragment>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}

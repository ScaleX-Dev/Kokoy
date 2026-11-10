"use client";

import { Fragment } from "react";
import { useUI } from "../Providers";
import Marquee from "../ui/Marquee";
import { Burst } from "../ui/Icons";

/** Two crossing bands, the first thing after the hero. */
export default function Ticker() {
  const { t } = useUI();
  const words = t.ticker;

  return (
    <section aria-label={words.join(", ")} className="relative z-10 -mt-px overflow-hidden bg-cream py-10 md:py-14">
      <div className="relative">
        <div className="relative z-10 -mx-4 -rotate-[2.5deg] bg-coral py-3 text-charcoal shadow-[0_18px_40px_-24px_rgb(37_35_43/0.5)] md:py-5">
          <Marquee duration={28}>
            {words.map((w) => (
              <Fragment key={w}>
                <span className="px-5 font-display text-[clamp(2rem,6vw,5.5rem)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap uppercase md:px-8">
                  {w}
                </span>
                <Burst className="size-[clamp(1.6rem,4vw,3.5rem)] shrink-0 text-cream" />
              </Fragment>
            ))}
          </Marquee>
        </div>
        <div className="-mx-4 -mt-2 rotate-[1.8deg] bg-charcoal py-2.5 text-cream md:py-3">
          <Marquee duration={40} reverse>
            {words.map((w, i) => (
              <Fragment key={w}>
                <span className="px-4 text-[15px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase md:text-lg">{w}</span>
                <span className={i % 2 ? "size-2.5 shrink-0 rounded-full bg-pink" : "size-2.5 shrink-0 rounded-full bg-orange"} aria-hidden="true" />
              </Fragment>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

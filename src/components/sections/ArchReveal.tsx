"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG } from "@/lib/content";

export default function ArchReveal() {
  const root = useRef<HTMLElement>(null);

  // Pinned: a small arched doorway opens until the photo fills the screen.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
          if (!motion) return;
          const side = desktop ? 37 : 22;
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", scrub: 1, pin: true },
            })
            .fromTo(
              "[data-arch]",
              { clipPath: `inset(16% ${side}% 10% ${side}% round 50vw 50vw 0px 0px)` },
              { clipPath: "inset(0% 0% 0% 0% round 0vw 0vw 0px 0px)", duration: 1 },
            )
            .fromTo("[data-arch-img]", { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
            .to("[data-split-l]", { xPercent: -60, opacity: 0, duration: 0.6 }, 0)
            .to("[data-split-r]", { xPercent: 60, opacity: 0, duration: 0.6 }, 0)
            .from("[data-arch-cap] > *", { y: 40, opacity: 0, stagger: 0.08, duration: 0.3 }, 0.75);
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-paper">
      <div data-arch className="absolute inset-0 overflow-hidden">
        <div data-arch-img className="absolute inset-0">
          <Image
            src={IMG.infinity}
            alt="An infinity pool deck shaded by tropical trees"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 motion-reduce:hidden md:px-10" aria-hidden="true">
        <span data-split-l className="display text-[19vw] text-ink md:text-[12vw]">
          step
        </span>
        <span data-split-r className="display text-[19vw] italic text-ink md:text-[12vw]">
          inside
        </span>
      </div>

      <div data-arch-cap className="absolute inset-x-4 bottom-10 flex flex-col gap-4 text-paper md:inset-x-10 md:bottom-14 md:flex-row md:items-end md:justify-between">
        <p className="display max-w-[16ch] text-5xl md:text-7xl">Twelve lanterns, one long pool, and nowhere you need to be.</p>
      </div>
    </section>
  );
}

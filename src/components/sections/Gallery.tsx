"use client";

import Image from "next/image";
import clsx from "clsx";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GALLERY_ROWS, IMG, SITE } from "@/lib/content";
import { useUI } from "../Providers";
import Rich from "../ui/Rich";
import Marquee from "../ui/Marquee";
import { LinkButton } from "../ui/Buttons";

// Playful geometric frames: rounded rectangle, circle, arch, pill.
const SHAPES = [
  "aspect-[4/5] w-[56vw] rounded-[32px] sm:w-[34vw] md:w-[22vw]",
  "aspect-square w-[46vw] rounded-full sm:w-[28vw] md:w-[17vw]",
  "aspect-[3/4] w-[50vw] rounded-t-full rounded-b-[32px] sm:w-[30vw] md:w-[19vw]",
  "aspect-[5/4] w-[64vw] rounded-full sm:w-[40vw] md:w-[26vw]",
];

export default function Gallery() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-gal-in]", {
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
    <section ref={root} id="gallery" className="section-y relative overflow-hidden bg-cream">
      <div className="pad mx-auto max-w-4xl text-center">
        <h2 data-gal-in className="title">
          <Rich text={t.gallery.title} className="font-black" />
        </h2>
        <p data-gal-in className="mx-auto mt-5 max-w-[40ch] text-lg text-charcoal/75">
          {t.gallery.body}
        </p>
        <div data-gal-in className="mt-7">
          <LinkButton href={SITE.instagram.url} external tone="charcoal">
            {t.gallery.cta} {SITE.instagram.handle}
          </LinkButton>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 md:mt-14 md:gap-6">
        {GALLERY_ROWS.map((row, r) => (
          <Marquee key={r} duration={r ? 55 : 45} reverse={r === 1}>
            {row.map((g) => (
              <figure key={g.src} className={clsx("relative mx-2 shrink-0 overflow-hidden md:mx-3", SHAPES[g.shape])}>
                <Image src={IMG[g.src]} alt={t.alt[g.src]} fill sizes="(min-width: 768px) 26vw, 64vw" className="object-cover" />
              </figure>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GALLERY_ROWS, IMG, SITE } from "@/lib/content";
import { useUI } from "../Providers";
import Marquee from "../ui/Marquee";
import { LinkButton } from "../ui/Buttons";
import { Burst } from "../ui/Icons";

// A tight full-bleed wall: 3 × 3 on phones, 5 × 2 from tablets up.
const TILES = GALLERY_ROWS.flat().slice(0, 10);

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
        gsap.from("[data-gal-tile]", {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          stagger: { each: 0.05, from: "random" },
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-gal-grid]", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="gallery" className="relative overflow-hidden bg-cream pt-24 md:pt-32">
      <div className="pad flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-4xl">
          <p data-gal-in className="eyebrow flex items-center gap-2 text-charcoal/70">
            <span className="size-2.5 rounded-full bg-pink" aria-hidden="true" />
            {t.gallery.label}
          </p>
          <h2 data-gal-in className="display mt-5 text-[clamp(2.4rem,6vw,6rem)] font-extrabold">
            {t.gallery.title}
          </h2>
          <p data-gal-in className="mt-5 max-w-[40ch] text-lg text-charcoal/75">
            {t.gallery.body}
          </p>
        </div>
        <div data-gal-in className="shrink-0">
          <LinkButton href={SITE.instagram.url} external tone="charcoal">
            {t.gallery.cta} {SITE.instagram.handle}
          </LinkButton>
        </div>
      </div>

      <ul data-gal-grid className="mt-14 grid grid-cols-3 gap-1 md:mt-20 md:grid-cols-5">
        {TILES.map((g, i) => (
          <li key={g.src} data-gal-tile className={clsx("group relative aspect-square overflow-hidden bg-sand", i === 9 && "hidden md:block")}>
            <Image
              src={IMG[g.src]}
              alt={t.alt[g.src]}
              fill
              sizes="(min-width: 768px) 20vw, 33vw"
              className="object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105"
            />
          </li>
        ))}
      </ul>

      {/* The sign-off strip: one running link to Instagram. */}
      <a
        href={SITE.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.gallery.cta} ${SITE.instagram.handle}`}
        className="block bg-coral py-3 text-charcoal transition-colors duration-300 hover:bg-orange md:py-4"
      >
        <Marquee duration={30}>
          {[0, 1, 2, 3].map((k) => (
            <Fragment key={k}>
              <span className="px-6 font-display text-[clamp(1.1rem,2.2vw,1.75rem)] font-extrabold tracking-[-0.02em] whitespace-nowrap uppercase md:px-8">
                {t.gallery.cta} {SITE.instagram.handle}
              </span>
              <Burst className="size-5 shrink-0 md:size-6" />
            </Fragment>
          ))}
        </Marquee>
      </a>
    </section>
  );
}

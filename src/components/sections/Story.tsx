"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FIGURES, SITE } from "@/lib/content";

const LAYOUT = [
  { box: "md:col-span-5 md:col-start-1", frame: "aspect-[4/5]", speed: -8 },
  { box: "md:col-span-4 md:col-start-8 md:mt-56", frame: "aspect-[3/4] shape-arch", speed: 10 },
  { box: "md:col-span-5 md:col-start-3 md:-mt-16", frame: "aspect-[5/4]", speed: -5 },
];

export default function Story() {
  const root = useRef<HTMLElement>(null);

  // Each figure unveils upward, then drifts at its own pace for depth.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-fig]").forEach((fig, i) => {
          const frame = fig.querySelector("[data-frame]");
          const img = fig.querySelector("[data-img]");
          gsap.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: fig, start: "top 85%" } },
          );
          gsap.fromTo(img, { scale: 1.4 }, { scale: 1.08, duration: 2.2, ease: "expo.out", scrollTrigger: { trigger: fig, start: "top 85%" } });
          gsap.to(fig, {
            yPercent: LAYOUT[i].speed,
            ease: "none",
            scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.from(fig.querySelector("figcaption"), {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            scrollTrigger: { trigger: fig, start: "top 80%" },
          });
        });
        gsap.from("[data-quote] [data-qline]", {
          yPercent: 110,
          duration: 1.4,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-quote]", start: "top 75%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative px-4 pb-32 md:px-10 md:pb-48">
      <div className="grid gap-16 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        {FIGURES.map((f, i) => (
          <figure key={f.src} data-fig className={LAYOUT[i].box}>
            <div data-frame className={`relative overflow-hidden ${LAYOUT[i].frame}`}>
              <div data-img className="absolute inset-0">
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
              </div>
            </div>
            <figcaption className="mt-4 max-w-[44ch] text-sm text-mute">{f.cap}</figcaption>
          </figure>
        ))}
      </div>

      <blockquote data-quote className="mx-auto mt-32 max-w-5xl text-center md:mt-48">
        <p className="display text-[11vw] leading-[0.95] md:text-[6.2vw]">
          {["“We wanted a place", "where the loudest", "thing is the water.”"].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <span data-qline className={`block ${i === 2 ? "italic" : ""}`}>
                {l}
              </span>
            </span>
          ))}
        </p>
        <footer className="label mt-10 text-mute">— {SITE.owner}, founder</footer>
      </blockquote>
    </section>
  );
}

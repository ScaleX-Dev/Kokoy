"use client";

import Image from "next/image";
import { useRef } from "react";
import clsx from "clsx";
import { gsap, useGSAP } from "@/lib/gsap";
import { SPACES } from "@/lib/content";

export default function Spaces() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Desktop: vertical scroll walks a horizontal rail through the rooms.
  // Phone: a plain swipeable row with snap points.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const rail = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo("[data-progress]", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-space-img]").forEach((img) => {
          gsap.fromTo(img, { xPercent: -12 }, {
            xPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: rail, start: "left right", end: "right left", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="spaces" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-stone py-24 md:py-0">
      <div className="px-4 md:hidden">
        <span className="label text-mute">Spaces</span>
        <h2 className="display mt-4 text-6xl">
          Walk <span className="italic">through</span>
        </h2>
      </div>

      <div className="mt-12 overflow-x-auto snap-x snap-mandatory md:mt-0 md:overflow-visible" data-lenis-prevent-touch>
        <div ref={track} className="flex w-max items-end gap-5 px-4 md:gap-14 md:pl-10 md:pr-[10vw]">
          {/* On desktop the heading rides the rail, so photos never slide under it. */}
          <div className="hidden w-[30vw] shrink-0 self-center md:block">
            <span className="label text-mute">Spaces</span>
            <h2 className="display mt-6 text-[8vw]">
              Walk <span className="italic">through</span>
            </h2>
          </div>
          {SPACES.map((s) => (
            <article key={s.n} className="group snap-start">
              <div
                className={clsx(
                  "relative overflow-hidden",
                  s.w,
                  s.h,
                  s.shape === "arch" && "shape-arch",
                  s.shape === "bowl" && "shape-bowl",
                  s.shape === "rect" && "rounded-[4px]",
                )}
              >
                <div data-space-img className="absolute inset-[-14%_-14%] transition-transform duration-[1.6s] ease-soft group-hover:scale-105">
                  <Image src={s.src} alt="" fill sizes="(min-width: 768px) 45vw, 80vw" className="object-cover" />
                </div>
              </div>
              <div className="mt-5">
                <h3 className="display text-4xl md:text-5xl">{s.name}</h3>
                <p className="mt-2 max-w-[30ch] text-mute">{s.line}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-10 bottom-10 hidden h-px bg-ink/15 md:block" aria-hidden="true">
        <div data-progress className="h-full origin-left bg-ink" />
      </div>
    </section>
  );
}

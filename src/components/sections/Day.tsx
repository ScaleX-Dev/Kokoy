"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOMENTS } from "@/lib/content";

export default function Day() {
  const root = useRef<HTMLElement>(null);

  // Pinned: the page itself moves from morning paper to lantern-lit night.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const moments = gsap.utils.toArray<HTMLElement>("[data-moment]");
        const imgs = gsap.utils.toArray<HTMLElement>("[data-day-img]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");
        gsap.set(moments.slice(1), { autoAlpha: 0, y: 40 });
        gsap.set(imgs.slice(1), { autoAlpha: 0, scale: 1.12 });
        gsap.set(dots.slice(1), { opacity: 0.25 });
        gsap.set(root.current, { backgroundColor: MOMENTS[0].bg, color: MOMENTS[0].fg });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=320%", scrub: 1, pin: true },
        });
        tl.fromTo("[data-day-bar]", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: MOMENTS.length - 1 + 0.6 }, 0);
        for (let i = 1; i < MOMENTS.length; i++) {
          const at = i - 0.6;
          tl.to(moments[i - 1], { autoAlpha: 0, y: -40 }, at)
            .to(moments[i], { autoAlpha: 1, y: 0 }, at + 0.3)
            .to(imgs[i], { autoAlpha: 1, scale: 1 }, at)
            .to(dots[i], { opacity: 1 }, at)
            .to(root.current, { backgroundColor: MOMENTS[i].bg, color: MOMENTS[i].fg }, at);
        }
        tl.to({}, { duration: 0.6 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="day" className="relative overflow-hidden bg-paper motion-safe:md:h-[100svh]">
      <div className="grid h-full gap-10 px-4 py-24 md:grid-cols-12 md:items-center md:gap-6 md:px-10 md:py-0">
        <div className="md:col-span-5">
          <span className="label opacity-70">( 03 ) &nbsp;A day here</span>
          <div className="relative mt-8 motion-safe:md:h-[52vh]">
            {MOMENTS.map((m) => (
              <div
                key={m.time}
                data-moment
                className="mb-14 motion-safe:md:absolute motion-safe:md:inset-0 motion-safe:md:mb-0"
              >
                <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[4px] md:hidden">
                  <Image src={m.src} alt="" fill sizes="92vw" className="object-cover" />
                </div>
                <p className="display text-[22vw] tabular-nums md:text-[10vw]">{m.time}</p>
                <h3 className="display mt-6 text-4xl italic md:text-5xl">{m.title}</h3>
                <p className="mt-4 max-w-[36ch] text-lg opacity-75">{m.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center md:col-span-1 md:flex" aria-hidden="true">
          <div className="relative h-[52vh] w-px bg-current/20">
            <div data-day-bar className="absolute inset-0 origin-top bg-current" />
            {MOMENTS.map((m, i) => (
              <span
                key={m.time}
                data-dot
                className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-current"
                style={{ top: `${(i / (MOMENTS.length - 1)) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div className="relative hidden md:col-span-6 md:block md:h-[76vh]">
          <div className="shape-arch absolute inset-0 overflow-hidden">
            {MOMENTS.map((m) => (
              <div key={m.time} data-day-img className="absolute inset-0">
                <Image src={m.src} alt="" fill sizes="50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

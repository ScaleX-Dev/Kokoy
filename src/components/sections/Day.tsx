"use client";

import Image from "next/image";
import clsx from "clsx";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DAY_IMG, DAY_SKY, IMG } from "@/lib/content";
import { useUI } from "../Providers";

// Sun position along a half-circle arc, 0 = sunrise (left), 1 = below the horizon (right).
function arcPoint(p: number) {
  const a = Math.PI * (1 - p * 1.08);
  return { x: 50 + 46 * Math.cos(a), y: 100 - 92 * Math.sin(a) };
}

export default function Day() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  const stops = t.day.stops;

  // Desktop: pinned. Scrolling moves the sun across the sky and the day through four moods.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const texts = gsap.utils.toArray<HTMLElement>("[data-day-text]");
        const imgs = gsap.utils.toArray<HTMLElement>("[data-day-img]");
        const ticks = gsap.utils.toArray<HTMLElement>("[data-day-tick]");
        const sun = root.current!.querySelector<HTMLElement>("[data-day-sun]")!;
        const setSun = (p: number) => {
          const { x, y } = arcPoint(p);
          sun.style.left = `${x}%`;
          sun.style.top = `${y}%`;
        };
        setSun(0.02);

        gsap.set(texts.slice(1), { autoAlpha: 0, y: 50 });
        gsap.set(imgs.slice(1), { clipPath: "circle(0% at 50% 50%)" });
        gsap.set(ticks.slice(1), { opacity: 0.35 });

        // Each moment holds, then hands over to the next; scrolling snaps to the holds.
        const n = stops.length;
        const HOLD = 0.6;
        const MOVE = 1;
        const total = HOLD + (n - 1) * (MOVE + HOLD);
        const holds = Array.from({ length: n }, (_, i) => (i * (MOVE + HOLD) + HOLD / 2) / total);
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${n * 85}%`,
            scrub: 0.8,
            pin: true,
            snap: { snapTo: holds, duration: { min: 0.2, max: 0.6 }, delay: 0.1, ease: "power1.inOut" },
            onUpdate: (self) => setSun(0.02 + self.progress * 0.96),
          },
        });
        for (let i = 1; i < n; i++) {
          const at = HOLD + (i - 1) * (MOVE + HOLD);
          tl.to(texts[i - 1], { autoAlpha: 0, y: -50, duration: MOVE * 0.4 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: MOVE * 0.5 }, at + MOVE * 0.5)
            .to(imgs[i], { clipPath: "circle(75% at 50% 50%)", duration: MOVE }, at)
            .to(ticks[i - 1], { opacity: 0.35, duration: MOVE }, at)
            .to(ticks[i], { opacity: 1, duration: MOVE }, at)
            .to(root.current, { backgroundColor: DAY_SKY[i].bg, color: DAY_SKY[i].fg, duration: MOVE }, at);
        }
        tl.to({}, { duration: HOLD }, total - HOLD);
      });
    },
    { scope: root, dependencies: [stops.length] },
  );

  return (
    <section ref={root} id="day" className="relative overflow-hidden bg-cream text-charcoal lg:h-[100svh]">
      {/* ── Desktop: pinned sky ── */}
      <div className="pad relative hidden h-full flex-col pt-28 pb-10 lg:flex">
        {/* The sky: a horizon line, the sun's arc and the sun itself. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[12vh] h-[64vh]" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            <path d="M4 100 A46 92 0 0 1 96 100" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="1 5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-px bg-current opacity-20" />
          <div data-day-sun className="sun absolute size-14 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_60px_10px_rgb(255_157_56/0.45)]" style={{ left: "4%", top: "100%" }} />
        </div>
        <div className="relative flex items-start justify-between gap-8">
          <div>
            <p className="eyebrow opacity-70">{t.day.label}</p>
            <h2 className="display mt-4 text-[clamp(2rem,3.4vw,3.5rem)]">{t.day.title}</h2>
          </div>
          <ol className="flex gap-8 pt-2" aria-hidden="true">
            {stops.map((s) => (
              <li key={s.time} data-day-tick className="font-display text-lg font-bold tabular-nums">
                {s.time}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative z-10 grid flex-1 grid-cols-12 items-center gap-6">
          <div className="relative col-span-5 h-[46vh]">
            {stops.map((s) => (
              <div key={s.time} data-day-text className="absolute inset-0 flex flex-col justify-center">
                <p className="font-display text-[clamp(4rem,9vw,9.5rem)] leading-none font-black tracking-[-0.05em] tabular-nums">{s.time}</p>
                <h3 className="display mt-6 text-[clamp(1.75rem,2.6vw,2.75rem)]">{s.title}</h3>
                <p className="mt-4 max-w-[34ch] text-lg leading-relaxed opacity-80">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="relative col-span-5 col-start-8 aspect-square w-[min(38vw,56vh)] justify-self-center">
            <div className="relative size-full overflow-hidden rounded-full">
              {stops.map((s, i) => (
                <div key={s.time} data-day-img className="absolute inset-0">
                  <Image src={IMG[DAY_IMG[i]]} alt={t.alt[DAY_IMG[i]]} fill sizes="40vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Phone & tablet: stacked sticky cards, each in its own colour ── */}
      <div className="pad py-20 md:py-28 lg:hidden">
        <p className="eyebrow opacity-70">{t.day.label}</p>
        <h2 className="display mt-4 text-[clamp(2rem,7vw,3.5rem)]">{t.day.title}</h2>
        <ol className="mt-10 flex flex-col gap-4">
          {stops.map((s, i) => (
            <li
              key={s.time}
              className={clsx("sticky overflow-hidden rounded-[32px] p-5 shadow-[0_-12px_30px_-18px_rgb(37_35_43/0.4)] sm:p-7")}
              style={{ top: `${88 + i * 14}px`, backgroundColor: i === 0 ? "#FFE4B8" : DAY_SKY[i].bg, color: DAY_SKY[i].fg }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-[clamp(3rem,15vw,5rem)] leading-none font-black tracking-[-0.05em] tabular-nums">{s.time}</p>
                  <h3 className="display mt-4 text-2xl sm:text-3xl">{s.title}</h3>
                </div>
                <div className="relative mt-1 size-24 shrink-0 overflow-hidden rounded-full sm:size-32">
                  <Image src={IMG[DAY_IMG[i]]} alt={t.alt[DAY_IMG[i]]} fill sizes="128px" className="object-cover" />
                </div>
              </div>
              <p className="mt-3 max-w-[40ch] text-base leading-relaxed opacity-85">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

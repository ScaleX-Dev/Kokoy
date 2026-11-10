"use client";

import Image from "next/image";
import { useRef } from "react";
import clsx from "clsx";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/content";
import { useUI } from "../Providers";
import { WhatsAppButton } from "../ui/Buttons";

const FEATURE_IMG: ImgKey[] = ["poolLounger", "poolDeck", "poolSunset"];
const FEATURE_SHAPE = ["rounded-[36px]", "rounded-t-full rounded-b-[36px]", "rounded-full"];

export default function Pool() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
          if (!motion) return;
          const r0 = desktop ? 13 : 24;
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: desktop
                ? { trigger: "[data-pool-stage]", start: "top top", end: "+=150%", scrub: 1, pin: true }
                : { trigger: "[data-pool-stage]", start: "top 80%", end: "bottom bottom", scrub: 1 },
            })
            .fromTo("[data-pool-mask]", { clipPath: `circle(${r0}% at 50% 64%)` }, { clipPath: "circle(80% at 50% 50%)", duration: 1 })
            .fromTo("[data-pool-img]", { scale: 1.4 }, { scale: 1, duration: 1 }, 0)
            .to("[data-pool-top]", { yPercent: -120, opacity: 0, duration: 0.5 }, 0)
            .to("[data-pool-bot]", { yPercent: 120, opacity: 0, duration: 0.5 }, 0)
            .from("[data-pool-cap] > *", { y: 40, opacity: 0, stagger: 0.06, duration: 0.25 }, 0.7);

          gsap.from("[data-feature]", {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-features]", start: "top 85%" },
          });
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="pool" className="relative bg-cream">
      <div data-pool-stage className="relative h-[100svh] min-h-[600px] overflow-hidden">
        <div data-pool-mask className="absolute inset-0 overflow-hidden">
          <div data-pool-img className="absolute inset-0">
            <Image src={IMG.poolSunset} alt={t.alt.poolSunset} fill sizes="100vw" quality={80} className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(37_35_43/0.1)_30%,rgb(37_35_43/0.85)_100%)]" />
        </div>

        <p
          data-pool-top
          aria-hidden="true"
          className="display pointer-events-none absolute inset-x-0 top-[12%] text-center text-[clamp(2.5rem,8vw,8rem)] font-black motion-reduce:hidden"
        >
          {t.pool.before}
        </p>
        <p
          data-pool-bot
          aria-hidden="true"
          className="display pointer-events-none absolute inset-x-0 bottom-[6%] text-center text-[clamp(2.5rem,8vw,8rem)] font-black motion-reduce:hidden"
        >
          <span className="inline-block -rotate-2 rounded-[0.3em] bg-coral px-[0.25em] pb-[0.08em]">{t.pool.after}</span>
        </p>

        <div data-pool-cap className="pad absolute inset-x-0 bottom-0 grid gap-6 pb-10 text-cream md:grid-cols-12 md:items-end md:pb-14">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-2 text-cream/90">
              <span className="size-2.5 rounded-full bg-coral" aria-hidden="true" />
              {t.pool.label}
            </p>
            <h2 className="display mt-4 text-[clamp(2.25rem,5.6vw,5.5rem)] font-extrabold">{t.pool.title}</h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed text-cream/90">{t.pool.body}</p>
            <WhatsAppButton message={t.wa.pool} className="mt-6">
              {t.pool.cta}
            </WhatsAppButton>
          </div>
        </div>
      </div>

      <ul data-features className="pad grid gap-10 py-20 sm:grid-cols-3 sm:gap-6 md:py-28 lg:gap-10">
        {t.pool.features.map((f, i) => (
          <li key={f.title} data-feature className={clsx(i === 1 && "sm:mt-16", i === 2 && "sm:mt-32")}>
            <div className={clsx("relative overflow-hidden", FEATURE_SHAPE[i], i === 2 ? "aspect-square" : "aspect-[4/5]")}>
              <Image src={IMG[FEATURE_IMG[i]]} alt={t.alt[FEATURE_IMG[i]]} fill sizes="(min-width: 640px) 30vw, 92vw" className="object-cover transition-transform duration-[1.4s] ease-soft hover:scale-105" />
            </div>
            <div className="mt-6 flex gap-4">
              <span className="font-display text-sm font-bold text-charcoal/50 tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="display text-2xl md:text-[1.75rem]">{f.title}</h3>
                <p className="mt-2 max-w-[32ch] leading-relaxed text-charcoal/75">{f.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, type ImgKey } from "@/lib/content";
import { useUI } from "../Providers";

const FEATURE_IMG: ImgKey[] = ["poolLounger", "poolDeck", "poolSunset"];

/** The pool: three arches (loungers, poolside service, sunset swims). Phones swipe through them. */
export default function Pool() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          if (!(ctx.conditions as { motion: boolean }).motion) return;
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
      {/* Phones swipe through the three; wider screens see them side by side. They follow the
          intro statement straight on, so only the bottom carries section spacing. */}
      <ul data-features data-lenis-prevent-horizontal className="pad flex pb-[var(--sy)] snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:grid sm:overflow-visible [&::-webkit-scrollbar]:hidden gap-4 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {t.pool.features.map((f, i) => (
          <li key={f.title} data-feature className="w-[78vw] shrink-0 snap-start scroll-ml-[var(--pad)] sm:w-auto">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[36px]">
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

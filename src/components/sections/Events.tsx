"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EVENT_IMG, IMG } from "@/lib/content";
import { useUI } from "../Providers";
import Rich from "../ui/Rich";
import { WhatsAppButton } from "../ui/Buttons";

/** The weekly line-up as a row of cards; one "What's on this week?" action covers them all. */
export default function Events() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-ev-in]", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from("[data-ev-card]", {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: { trigger: list.current, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="events" className="section-y relative overflow-hidden bg-charcoal text-cream">
      {/* Heading on the left, the general action on the right. */}
      <div className="pad flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-4xl">
          <h2 data-ev-in className="title">
            <Rich text={t.events.title} className="font-black text-coral" />
          </h2>
          <p data-ev-in className="mt-5 max-w-[52ch] text-lg leading-relaxed text-cream/75">
            {t.events.body}
          </p>
        </div>
        <div data-ev-in className="shrink-0">
          <WhatsAppButton message={t.wa.events} tone="outline-cream">
            {t.events.cta}
          </WhatsAppButton>
        </div>
      </div>

      {/* Phones swipe through the week; tablets and up see the grid. */}
      <ul ref={list} data-lenis-prevent-horizontal className="pad mt-10 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:grid sm:overflow-visible [&::-webkit-scrollbar]:hidden gap-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 md:mt-14 lg:grid-cols-4">
        {t.events.rows.map((r, i) => (
          <li key={r.name} data-ev-card className="group flex w-[80vw] shrink-0 snap-start scroll-ml-[var(--pad)] flex-col sm:w-auto">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-cream/5">
              <Image
                src={IMG[EVENT_IMG[i]]}
                alt={t.alt[EVENT_IMG[i]]}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                className="object-cover transition-transform duration-[1.4s] ease-soft group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-full bg-coral px-3.5 py-1.5 font-display text-sm font-black tracking-[-0.02em] text-charcoal">
                {r.day}
              </span>
            </div>
            <h3 className="mt-6 font-display text-[clamp(1.4rem,1.9vw,1.9rem)] leading-tight font-bold tracking-[-0.03em]">{r.name}</h3>
            <p className="mt-2 flex-1 text-cream/75">{r.detail}</p>
            <p className="eyebrow mt-4 text-coral">{r.tag}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

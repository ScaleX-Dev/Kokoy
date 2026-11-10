"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUI } from "../Providers";
import Rich from "../ui/Rich";
import { WhatsAppButton } from "../ui/Buttons";

function SoundBars({ label }: { label: string }) {
  return (
    <span className="inline-flex h-4 items-end gap-[3px]" role="img" aria-label={label}>
      {[0.9, 0.5, 1.1, 0.7].map((d, i) => (
        <span
          key={i}
          className="h-full w-[3px] origin-bottom rounded-full bg-coral"
          style={{ animation: `kk-eq ${d}s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
    </span>
  );
}

export default function Events() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);

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
        gsap.from("[data-ev-row]", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: list.current, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="events" className="relative overflow-hidden bg-charcoal py-24 text-cream md:py-36">
      <div className="pad grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p data-ev-in className="eyebrow flex items-center gap-3 text-cream/80">
            <SoundBars label={t.a11y.sound} />
            {t.events.label}
          </p>
          <h2 data-ev-in className="display mt-5 text-[clamp(2.3rem,6vw,6rem)] font-extrabold">
            <Rich text={t.events.title} />
          </h2>
        </div>
        <p data-ev-in className="text-lg leading-relaxed text-cream/75 md:col-span-4">
          {t.events.body}
        </p>
      </div>

      <div ref={list} className="pad relative mt-16 md:mt-24">
        <ul className="relative">
        {t.events.rows.map((r) => (
          <li
            key={r.name}
            data-ev-row
            className="group relative border-t border-cream/15 last:border-b"
          >
            <div className="relative z-10 grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 py-6 transition-[padding] duration-500 ease-soft md:grid-cols-[9rem_1fr_auto] md:py-9 md:group-hover:pl-6">
              <span className="row-span-2 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-coral md:row-span-1">
                {r.day}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(1.35rem,3vw,2.75rem)] leading-tight font-bold tracking-[-0.03em]">{r.name}</h3>
                <p className="mt-1 text-cream/75 md:text-lg">{r.detail}</p>
              </div>
              <span className="col-start-2 justify-self-start rounded-full border border-cream/30 px-3 py-1 text-[13px] font-semibold md:col-start-3 md:justify-self-end">
                {r.tag}
              </span>
            </div>
          </li>
        ))}
        </ul>
      </div>

      <div className="pad mt-10 flex justify-end">
        <WhatsAppButton message={t.wa.events} tone="outline-cream">
          {t.events.cta}
        </WhatsAppButton>
      </div>
    </section>
  );
}

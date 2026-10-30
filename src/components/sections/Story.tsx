"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DETAILS, SITE } from "@/lib/content";

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-detail]", {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-details]", start: "top 80%" },
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
    <section ref={root} className="relative px-4 pt-28 pb-32 md:px-10 md:pt-40 md:pb-48">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <h2 className="display text-6xl md:col-span-4 md:text-7xl">
          Built <span className="italic">by hand</span>
        </h2>
        <div data-details className="grid gap-10 sm:grid-cols-3 md:col-span-8 md:gap-8">
          {DETAILS.map((d) => (
            <div key={d.title} data-detail className="border-t border-ink/20 pt-6">
              <h3 className="font-serif text-3xl leading-tight">{d.title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{d.body}</p>
            </div>
          ))}
        </div>
      </div>

      <blockquote data-quote className="mx-auto mt-32 max-w-5xl text-center md:mt-48">
        <p className="display text-[11vw] leading-[0.95] md:text-[6.2vw]">
          {["“We wanted a place", "where the loudest", "thing is the water.”"].map((l, i) => (
            <span key={l} className="-mb-[0.06em] block overflow-hidden pb-[0.12em]">
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

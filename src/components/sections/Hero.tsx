"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, SITE } from "@/lib/content";
import { useUI } from "../Providers";

export default function Hero() {
  const { ready } = useUI();
  const root = useRef<HTMLElement>(null);

  // Scroll: the photo sinks and the wordmark lifts away — a slow, layered exit.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-img]", { yPercent: 22, scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-word]", { yPercent: -40, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-fade]", { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "40% top" } });
        gsap.to("[data-hero-shade]", { opacity: 0.6, ease: "none", scrollTrigger: st });
      });
    },
    { scope: root },
  );

  // Entrance, once the preloader lifts.
  useGSAP(
    () => {
      if (!ready) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo("[data-hero-zoom]", { scale: 1.35 }, { scale: 1, duration: 2.6 }, 0)
        .from("[data-hero-char]", { yPercent: 110, duration: 1.6, stagger: 0.06 }, 0.25)
        .from("[data-hero-in]", { y: 24, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.7);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-night text-paper">
      <div data-hero-img className="absolute inset-0 will-change-transform">
        <div data-hero-zoom className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="A courtyard pool among palms, under straw-thatched roofs"
            fill
            preload
            quality={80}
            sizes="100vw"
            className="object-cover object-[50%_65%]"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/20 to-night/50" />
      <div data-hero-shade className="absolute inset-0 bg-night opacity-0" />

      <div className="absolute inset-x-0 bottom-0 px-3 md:px-6">
        <div data-hero-fade className="mb-4 flex items-end justify-between gap-6 px-1 md:mb-0 md:px-4">
          <p data-hero-in className="max-w-[26ch] font-serif text-2xl italic leading-tight md:text-[34px]">
            {SITE.tagline}
          </p>
          <p data-hero-in className="label hidden md:block">{SITE.place}</p>
        </div>
        <h1 data-hero-word className="display flex justify-between overflow-hidden pb-[0.2em] text-[min(33vw,62svh)] leading-[0.78]">
          {"kokoy".split("").map((c, i) => (
            <span key={i} data-hero-char className="inline-block">
              {c}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

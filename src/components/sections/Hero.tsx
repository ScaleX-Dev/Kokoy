"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, SITE } from "@/lib/content";
import { useUI } from "../Providers";
import SpinBadge from "../ui/SpinBadge";
import { LinkButton, WhatsAppButton, useAnchor } from "../ui/Buttons";
import { ArrowIcon } from "../ui/Icons";

export default function Hero() {
  const { t } = useUI();
  const anchor = useAnchor();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-await]", { visibility: "visible" });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-hero-zoom]", { scale: 1.25 }, { scale: 1, duration: 2.8 }, 0)
          .from("[data-hero-char]", { yPercent: 105, duration: 1.4, stagger: 0.07 }, 0.15)
          .from("[data-hero-line]", { yPercent: 110, duration: 1.2, stagger: 0.08 }, 0.45)
          .from("[data-hero-in]", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.7)
          .from("[data-hero-badge]", { scale: 0, rotate: -120, duration: 1.4, ease: "back.out(1.6)" }, 0.9);

        // Leaving: the footage sinks, the wordmark lifts, everything warms toward the next section.
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-media]", { yPercent: 25, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-word]", { yPercent: -35, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-copy]", { opacity: 0, y: -40, ease: "none", scrollTrigger: { ...st, end: "45% top" } });
      });
    },
    { scope: root },
  );

  const titleWords = t.hero.title.split(" ");

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal text-cream">
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <div data-hero-zoom className="absolute inset-0">
          {SITE.heroVideo ? (
            <video
              className="absolute inset-0 size-full object-cover"
              src={SITE.heroVideo}
              poster={`${IMG.hero}?auto=format&fit=crop&w=1920&q=70`}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          ) : (
            <Image src={IMG.hero} alt={t.alt.hero} fill preload quality={80} sizes="100vw" className="object-cover object-[50%_60%]" />
          )}
        </div>
      </div>

      {/* Sunset grade: warms any footage and keeps the type readable. */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_0%,rgb(255_157_56/0.55),transparent_60%)] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(37_35_43/0.55)_0%,rgb(37_35_43/0)_22%,rgb(37_35_43/0.5)_52%,rgb(37_35_43/0.92)_100%)]" />

      <div data-await className="pad relative z-10 flex h-full flex-col justify-end pb-5 md:pb-6">
        <div data-hero-badge className="absolute top-[19%] right-[var(--pad)] hidden md:block">
          <SpinBadge text={t.hero.badge} className="sun w-[clamp(120px,11vw,170px)] text-charcoal">
            <ArrowIcon dir="down" className="size-8" />
          </SpinBadge>
        </div>
        <div data-hero-copy className="grid items-end gap-8 pb-4 md:grid-cols-12 md:pb-6">
          <div className="md:col-span-7">
            <p data-hero-in className="eyebrow mb-5 flex items-center gap-2 text-cream/90">
              <span className="sun inline-block size-2.5 rounded-full" aria-hidden="true" />
              {t.hero.kicker}
            </p>
            <h1 className="display text-[clamp(2.5rem,5.4vw,5.5rem)] font-extrabold">
              <span className="sr-only">KOKOY Pool Club. </span>
              {titleWords.map((w, i) => (
                <span key={i} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <span data-hero-line className="inline-block">
                    {w}
                    {i < titleWords.length - 1 ? " " : ""}
                  </span>
                </span>
              ))}
            </h1>
          </div>
          <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <p data-hero-in className="max-w-[42ch] text-[17px] leading-relaxed text-cream [text-shadow:0_1px_18px_rgb(37_35_43/0.7)] md:text-lg">
              {t.hero.sub}
            </p>
            <div data-hero-in className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton message={t.wa.general}>{t.cta.whatsapp}</WhatsAppButton>
              <LinkButton href="#visit" onClick={anchor("visit")} tone="outline-cream">
                {t.cta.plan}
              </LinkButton>
            </div>
          </div>
        </div>

        <div className="relative">
          <p
            data-hero-word
            aria-hidden="true"
            className="wordmark-fit flex justify-between overflow-hidden select-none"
          >
            {"KOKOY".split("").map((c, i) => (
              <span key={i} data-hero-char className="inline-block pb-[0.06em]">
                {c}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

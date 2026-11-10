"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG } from "@/lib/content";
import { useUI } from "../Providers";
import SpinBadge from "../ui/SpinBadge";
import { LinkButton, useAnchor } from "../ui/Buttons";
import { Burst } from "../ui/Icons";

/**
 * The vibe, after the reference. Desktop: a polaroid in the corner, the headline in one
 * huge line across the water and over a round shot on the right, the copy beneath it.
 * Phones: the copy on top, then the round shot with the headline stacked big across it.
 */
export default function Vibe() {
  const { t } = useUI();
  const anchor = useAnchor();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 20%", scrub: 1 },
          })
          .fromTo("[data-vibe-img]", { scale: 1.2 }, { scale: 1.05, duration: 1 }, 0)
          .from("[data-vibe-porthole]", { scale: 0.6, rotate: -15, opacity: 0, duration: 0.6 }, 0.1)
          .from("[data-vibe-polaroid]", { y: -60, rotate: -20, opacity: 0, duration: 0.5 }, 0.2)
          .from("[data-vibe-line]", { yPercent: 60, opacity: 0, stagger: 0.12, duration: 0.5 }, 0.25)
          .from("[data-vibe-cap] > *, [data-vibe-cta]", { y: 24, opacity: 0, stagger: 0.08, duration: 0.4 }, 0.5);

        // Leaving: the water drifts slower than the page.
        gsap.to("[data-vibe-img]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  // One word or phrase per entry, the last in the coral accent (light, then black: the site's
  // title style). Desktop runs them on one line; phones stack them.
  const headline = t.vibe.lines.map((line, i) => (
    // A margin, not a space character, separates the words on desktop: a space inside the
    // clipped wrapper would fall onto its own hidden line. The top padding (offset by a
    // negative margin) keeps accents above capitals, like the breve on Й, from being clipped.
    <span key={i} className="-mt-[0.16em] block overflow-hidden pt-[0.16em] pb-[0.04em] md:mr-[0.28em] md:inline-block md:align-bottom md:last:mr-0">
      <span data-vibe-line className={i === t.vibe.lines.length - 1 ? "block font-black text-coral" : "block"}>
        {line}
      </span>
    </span>
  ));

  return (
    <section ref={root} id="vibe" className="relative overflow-hidden bg-charcoal text-cream">
      <div data-vibe-img className="absolute inset-0 will-change-transform">
        <Image src={IMG.poolLounger} alt="" fill sizes="100vw" quality={80} className="object-cover" />
      </div>
      {/* Darkened where the copy sits: the top on phones, the left and foot from md up. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(37_35_43/0.85)_0%,rgb(37_35_43/0.35)_45%,rgb(37_35_43/0.55)_100%)] md:bg-[linear-gradient(90deg,rgb(37_35_43/0.78)_0%,rgb(37_35_43/0.45)_50%,rgb(37_35_43/0.2)_100%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgb(37_35_43/0)_55%,rgb(37_35_43/0.65)_100%)] md:block" />

      {/* A polaroid with a sun for a tab, pinned to the top-left corner (desktop only). */}
      <div
        data-vibe-polaroid
        className="absolute top-[9%] left-[var(--pad)] z-20 hidden w-[clamp(110px,10vw,160px)] -rotate-[6deg] bg-white p-2 pb-7 shadow-[0_20px_40px_-18px_rgb(0_0_0/0.7)] md:block"
      >
        <span className="sun absolute -top-3.5 left-1/2 size-7 -translate-x-1/2 rounded-full" aria-hidden="true" />
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={IMG.poolTropic} alt={t.alt.poolTropic} fill sizes="160px" className="object-cover" />
        </div>
      </div>

      {/* Phones, after the reference: copy first, then the round shot with the headline stacked
          big across it, then the link. Desktop, after the reference: the headline in one huge
          line across the middle, crossing the round shot on the right, with the copy beneath. */}
      <div className="pad relative z-10 flex min-h-[min(100svh,900px)] flex-col gap-10 py-20 md:justify-end md:gap-0 md:pt-28 md:pb-[12vh]">
        <div className="relative order-2 md:static md:order-none">
          <div className="relative mx-auto mb-[16vw] w-[min(80vw,420px)] md:absolute md:top-1/2 md:right-[7vw] md:mb-0 md:w-[min(32vw,56vh)] md:-translate-y-1/2">
            <div data-vibe-porthole className="relative aspect-square overflow-hidden rounded-full ring-[10px] ring-cream/20">
              <Image src={IMG.underwater} alt={t.alt.underwater} fill sizes="(min-width: 768px) 32vw, 80vw" className="object-cover" />
            </div>
            <div className="absolute -top-4 -right-2 w-[30%] md:-top-6 md:-right-4" aria-hidden="true">
              <SpinBadge text={t.hero.badge} className="sun w-full text-charcoal">
                <Burst className="size-[34%]" />
              </SpinBadge>
            </div>
            {/* Phone headline: stacked huge and centred, wider than the picture and crossing it. */}
            <h2 className="title absolute bottom-[-18%] left-1/2 w-[calc(100vw_-_var(--pad)_*_2)] -translate-x-1/2 text-center text-[12.5vw] leading-[0.86] [text-shadow:0_4px_28px_rgb(37_35_43/0.5)] md:hidden">
              {headline}
            </h2>
          </div>
        </div>

        {/* Desktop headline (only one of the two is ever displayed). */}
        <h2 className="title relative hidden text-[clamp(3rem,5.6vw,7.25rem)] leading-[0.9] whitespace-nowrap [text-shadow:0_6px_40px_rgb(37_35_43/0.35)] md:block md:pl-[6vw]">
          {headline}
        </h2>

        <div data-vibe-cap className="order-1 md:order-none md:mt-8 md:pl-[6vw]">
          {t.vibe.body.map((para, i) => (
            <p key={i} className={`${i ? "mt-3" : ""} max-w-[46ch] text-[15px] leading-snug tracking-[0.01em] text-cream/90 uppercase md:text-[17px]`}>
              {para}
            </p>
          ))}
        </div>

        <div data-vibe-cta className="order-3 flex flex-wrap gap-3 md:order-none md:mt-8 md:pl-[6vw]">
          <LinkButton href="#pool" onClick={anchor("pool")} tone="outline-cream">
            {t.pool.label}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

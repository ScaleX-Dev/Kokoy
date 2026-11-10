"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG } from "@/lib/content";
import { useUI } from "../Providers";
import SpinBadge from "../ui/SpinBadge";
import { LinkButton, WhatsAppButton, useAnchor } from "../ui/Buttons";
import { Burst } from "../ui/Icons";

/**
 * The vibe, after the reference but kept calm: copy on the left over a darkened side of
 * the water, a round shot on the right, and the headline just crossing into it. Nothing
 * sits on top of the text, so it reads in one glance.
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
          .from("[data-vibe-cap] > *", { y: 24, opacity: 0, stagger: 0.08, duration: 0.4 }, 0.5);

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

  return (
    <section ref={root} id="vibe" className="relative overflow-hidden bg-charcoal text-cream">
      <div data-vibe-img className="absolute inset-0 will-change-transform">
        <Image src={IMG.poolLounger} alt="" fill sizes="100vw" quality={80} className="object-cover" />
      </div>
      {/* Darker on the copy side and at the foot, so the type always reads. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(37_35_43/0.88)_0%,rgb(37_35_43/0.6)_45%,rgb(37_35_43/0.15)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(37_35_43/0)_60%,rgb(37_35_43/0.6)_100%)]" />

      <div className="pad relative z-10 grid min-h-[min(100svh,880px)] items-center gap-12 py-24 md:grid-cols-12 md:gap-6 md:py-28">
        <div className="relative z-10 md:col-span-7">
          {/* A polaroid with a sun for a tab, set above the headline rather than under it. */}
          <div data-vibe-polaroid className="relative mb-10 w-[clamp(96px,10vw,150px)] -rotate-[6deg] bg-white p-2 pb-6 shadow-[0_20px_40px_-18px_rgb(0_0_0/0.7)] md:mb-12">
            <span className="sun absolute -top-3.5 left-1/2 size-7 -translate-x-1/2 rounded-full" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={IMG.poolTropic} alt={t.alt.poolTropic} fill sizes="150px" className="object-cover" />
            </div>
          </div>

          {/* Light, then black in coral: the same title tactic as every section. */}
          <h2 className="title text-[clamp(3rem,8.4vw,8.75rem)] md:-mr-[10vw]">
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-vibe-line className="block">
                {t.vibe.lead}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-vibe-line className="block font-black text-coral">
                {t.vibe.accent}
              </span>
            </span>
          </h2>

          <div data-vibe-cap>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-cream/90">{t.vibe.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton message={t.wa.pool}>{t.pool.cta}</WhatsAppButton>
              <LinkButton href="#pool" onClick={anchor("pool")} tone="outline-cream">
                {t.pool.label}
              </LinkButton>
            </div>
          </div>
        </div>

        {/* The round shot, with the brand badge riding its edge. */}
        <div className="relative mx-auto w-[min(78vw,420px)] md:col-span-5 md:mr-0 md:w-full md:max-w-[480px]">
          <div data-vibe-porthole className="relative aspect-square overflow-hidden rounded-full ring-[10px] ring-cream/20">
            <Image src={IMG.underwater} alt={t.alt.underwater} fill sizes="(min-width: 768px) 36vw, 78vw" className="object-cover" />
          </div>
          <div className="absolute -top-4 -right-2 w-[30%] md:-top-6 md:-right-4" aria-hidden="true">
            <SpinBadge text={t.hero.badge} className="sun w-full text-charcoal">
              <Burst className="size-[34%]" />
            </SpinBadge>
          </div>
        </div>
      </div>
    </section>
  );
}

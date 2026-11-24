"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/content";
import { useUI } from "../Providers";
import Marquee from "../ui/Marquee";
import LangSwitch from "../ui/LangSwitch";
import { LogoMark, LogoWord } from "../ui/Wordmark";
import Film from "../ui/Film";
import { Burst } from "../ui/Icons";

/**
 * Full-bleed opener: a running strip on top, the KOKOY lockup in the
 * middle, opening hours and the headline in the bottom corners. The floating nav pill
 * (see Header) rests between those corners on wide screens and below them otherwise.
 */
/** Splits a title into words, marking those inside "*…*" as accent (set in black). */
function accentWords(title: string) {
  const words: { text: string; accent: boolean }[] = [];
  let inside = false;
  for (const raw of title.split(" ")) {
    if (raw.startsWith("*")) inside = true;
    words.push({ text: raw.replace(/\*/g, ""), accent: inside });
    if (raw.endsWith("*")) inside = false;
  }
  return words;
}

export default function Hero() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  // Which file to play depends on the screen shape, so the video mounts only once that is known.
  const [film, setFilm] = useState<string>();

  useEffect(() => {
    const aspect = window.matchMedia("(min-aspect-ratio: 1/1)");
    const pick = () => setFilm(aspect.matches ? SITE.heroVideo.wide : SITE.heroVideo.src);
    pick();
    aspect.addEventListener("change", pick);
    return () => aspect.removeEventListener("change", pick);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-await]", { visibility: "visible" });
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-hero-zoom]", { scale: 1.25 }, { scale: 1, duration: 2.8 }, 0)
          .from("[data-hero-sun]", { yPercent: 25, scale: 0.85, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.15)
          .from("[data-hero-char]", { yPercent: 110, duration: 1.4, stagger: 0.07 }, 0.25)
          .from("[data-hero-line]", { yPercent: 110, duration: 1.2, stagger: 0.08 }, 0.6)
          .from("[data-hero-in]", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.7);

        // Leaving: the photo sinks, the lockup lifts away and the corners fade.
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-media]", { yPercent: 25, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-lockup]", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "70% top" } });
        gsap.to("[data-hero-corners]", { opacity: 0, y: -30, ease: "none", scrollTrigger: { ...st, end: "40% top" } });
      });
    },
    { scope: root },
  );

  const titleWords = accentWords(t.hero.title);

  return (
    <section ref={root} id="top" className="relative flex h-[100svh] min-h-[var(--hero-min)] flex-col overflow-hidden bg-charcoal text-cream">
      {/* ── Top: a running strip ── */}
      <div className="relative z-20 shrink-0 bg-coral text-charcoal">
        <div className="py-2.5 md:py-3" aria-hidden="true">
          <Marquee duration={45}>
            {t.hero.strip.map((w) => (
              <Fragment key={w}>
                <span className="px-5 text-[13px] font-bold tracking-[0.14em] whitespace-nowrap uppercase md:px-7 md:text-[15px]">{w}</span>
                <Burst className="size-3.5 shrink-0 md:size-4" />
              </Fragment>
            ))}
          </Marquee>
        </div>
      </div>

      {/* ── Stage ── */}
      <div className="relative flex-1 overflow-hidden">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <div data-hero-zoom className="absolute inset-0">
            {/* Which file plays depends on the screen shape (see content.ts). */}
            {film && <Film key={film} className="hero-film" src={film} poster={SITE.heroVideo.poster} />}
          </div>
        </div>

        {/* Sunset grade: warms any footage and keeps the type readable. */}
        {/* A plain translucent glow, not a blend mode: blending recomposites the whole screen
            against the moving photo on every scroll frame, which phones feel. */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_0%,rgb(255_157_56/0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_50%,rgb(37_35_43/0.38),transparent_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(37_35_43/0.35)_0%,rgb(37_35_43/0)_25%,rgb(37_35_43/0)_55%,rgb(37_35_43/0.85)_100%)]" />

        <div data-await className="pad relative z-10 flex h-full flex-col">
          <div className="flex justify-end pt-4 md:pt-6">
            <LangSwitch />
          </div>

          {/* Centre: the lockup */}
          <div data-hero-lockup className="relative flex flex-1 flex-col items-center justify-center py-6 text-center">
            {/* A soft, see-through shade just behind the logo so it reads over any shot of the film. The
                logo itself is 80% opaque (text-cream/80 below) so the film shows through it. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[min(60vh,30rem)] w-[min(92vw,62rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_35_43/0.26),rgb(37_35_43/0.1)_60%,transparent)]"
            />
            <p
              role="img"
              aria-label="KOKOY"
              className="flex items-center gap-[0.22em] text-cream/80 font-display text-[clamp(2.9rem,14vw,13rem)] leading-none select-none lg:text-[clamp(4rem,10vw,10.5rem)] [filter:drop-shadow(0_6px_40px_rgb(37_35_43/0.35))]"
            >
              <span data-hero-sun className="flex">
                <LogoMark className="h-[1.15em]" />
              </span>
              <span className="flex overflow-hidden py-[0.04em]">
                <span data-hero-char className="flex">
                  <LogoWord className="h-[0.78em]" />
                </span>
              </span>
            </p>
            <p data-hero-in className="eyebrow mt-4 text-cream md:mt-6 md:text-[13px]">
              {t.hero.kicker}
            </p>
          </div>

          {/* Bottom corners, one row on every screen: hours on the left, the headline on the right.
              From 1440px they flank the nav pill; otherwise they sit above it. */}
          <div
            data-hero-corners
            className="flex items-end justify-between gap-4 pb-[calc(var(--pill-h)_+_var(--pill-gap)_*_2)] sm:gap-8 min-[1440px]:pb-[var(--pill-gap)]"
          >
            <div data-hero-in className="shrink-0 min-[1440px]:max-w-[calc(50%_-_var(--pill-w)_/_2_-_1.5rem)]">
              <p className="eyebrow text-cream/85">{t.hero.hoursLabel}</p>
              <p className="mt-1.5 font-display text-[clamp(1rem,4.6vw,1.375rem)] leading-none sm:text-[clamp(1.375rem,3vw,2.25rem)] font-extrabold tracking-[-0.03em] tabular-nums min-[1440px]:text-[clamp(1.25rem,1.6vw,2.5rem)]">
                {t.hero.hours}
              </p>
            </div>
            <h1 className="title max-w-[12ch] min-w-0 text-right text-[clamp(1.25rem,6vw,2rem)] sm:text-[clamp(2rem,4vw,2.75rem)] min-[1440px]:max-w-[calc(50%_-_var(--pill-w)_/_2_-_1.5rem)] min-[1440px]:text-[clamp(1.375rem,2vw,3rem)]">
              <span className="sr-only">KOKOY Pool Club. </span>
              {/* The space sits between the clipping wrappers: inside an inline-block it collapses. */}
              {titleWords.map((w, i) => (
                <Fragment key={i}>
                  <span className="-mt-[0.16em] -mb-[0.1em] inline-block overflow-hidden pt-[0.16em] pb-[0.1em] align-bottom">
                    <span data-hero-line className={w.accent ? "inline-block font-black" : "inline-block"}>
                      {w.text}
                    </span>
                  </span>
                  {i < titleWords.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

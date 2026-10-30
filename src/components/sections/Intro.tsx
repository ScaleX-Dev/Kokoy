"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, SITE, STORY_TEXT } from "@/lib/content";
import { useUI } from "../Providers";

const ITALIC = new Set(["pool", "hear", "see", "nowhere"]);

export default function Intro() {
  const { openBooking } = useUI();
  const root = useRef<HTMLElement>(null);
  const words = STORY_TEXT.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Words light up one by one as you read down the page.
        gsap.fromTo(
          "[data-w]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: "[data-sentence]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        // The arch opens upward, the photo settles, then drifts slowly with the page.
        gsap.fromTo(
          "[data-intro-frame]",
          { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0px 0px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 999px 999px 0px 0px)",
            duration: 1.8,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-intro-frame]", start: "top 85%" },
          },
        );
        gsap.fromTo("[data-intro-img]", { scale: 1.3 }, {
          scale: 1.08,
          duration: 2.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-intro-frame]", start: "top 85%" },
        });
        gsap.fromTo("[data-intro-img]", { yPercent: -4 }, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from("[data-intro-in]", {
          y: 30,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-intro-facts]", start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" className="relative px-4 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-6">
        <figure className="order-2 md:order-1 md:col-span-5">
          <div data-intro-frame className="shape-arch relative aspect-[4/5] overflow-hidden bg-stone">
            <div data-intro-img className="absolute inset-0 scale-[1.08]">
              <Image
                src={IMG.hero}
                alt="A thatched cabana with linen curtains beside the pool"
                fill
                sizes="(min-width: 768px) 40vw, 92vw"
                className="object-cover object-[88%_60%]"
              />
            </div>
          </div>
        </figure>

        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <span className="label text-mute">Our story</span>
          <p data-sentence className="display mt-8 text-[10vw] leading-[1.02] md:mt-10 md:text-[4.2vw]">
            {words.map((w, i) => (
              <span key={i}>
                <span data-w className={ITALIC.has(w.replace(/[.,]/g, "")) ? "italic" : undefined}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </p>

          <div data-intro-facts className="mt-12 border-t border-ink/15 pt-8 md:mt-16">
            <p data-intro-in className="max-w-[46ch] text-lg leading-relaxed text-mute">
              A pool, a small café and a quiet courtyard in {SITE.place}. Open every day, from first light until the
              lanterns go out.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {SITE.hours.map(([k, v]) => (
                <div key={k} data-intro-in>
                  <dt className="label text-mute">{k}</dt>
                  <dd className="mt-2 font-serif text-2xl">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              data-intro-in
              type="button"
              onClick={() => openBooking("pool")}
              className="label mt-10 min-h-12 rounded-full border border-ink px-7 transition-colors duration-500 hover:bg-ink hover:text-paper"
            >
              Book a day by the water
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

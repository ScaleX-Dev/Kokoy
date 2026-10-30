"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, STORY_TEXT } from "@/lib/content";

const ITALIC = new Set(["pool", "hear", "see", "nowhere"]);
// Small photo "pebbles" set into the sentence after these words.
const PEBBLES: Record<number, { src: string; shape: string }> = {
  5: { src: IMG.jungle, shape: "rounded-full" },
  10: { src: IMG.gates, shape: "shape-arch" },
  16: { src: IMG.infinity, shape: "rounded-full" },
};

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const words = STORY_TEXT.split(" ");

  // Words light up one by one as you read down the page.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-w]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: "[data-sentence]", start: "top 78%", end: "bottom 42%", scrub: true },
          },
        );
        gsap.from("[data-pebble]", {
          scale: 0,
          ease: "back.out(1.6)",
          duration: 1.1,
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-sentence]", start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" className="relative px-4 pt-28 pb-24 md:px-10 md:pt-44 md:pb-36">
      <div className="mb-12 flex items-center justify-between md:mb-20">
        <span className="label text-mute">( 01 ) &nbsp;Our story</span>
        <span className="label hidden text-mute md:inline">Built in 2026, by hand</span>
      </div>
      <p data-sentence className="display max-w-[22ch] text-[11.5vw] leading-[1] md:text-[6.4vw]">
        {words.map((w, i) => (
          <span key={i}>
            <span data-w className={ITALIC.has(w.replace(/[.,]/g, "")) ? "italic" : undefined}>
              {w}
            </span>{" "}
            {PEBBLES[i] && (
              <span
                data-pebble
                className={`relative mr-[0.25em] inline-block h-[0.72em] w-[1.5em] overflow-hidden align-[-0.04em] ${PEBBLES[i].shape}`}
              >
                <Image src={PEBBLES[i].src} alt="" fill sizes="160px" className="object-cover" />
              </span>
            )}
          </span>
        ))}
      </p>
      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
        <p className="text-lg leading-relaxed text-mute md:col-span-4 md:col-start-7">
          A pool, a small café and a quiet courtyard. Open every day, from first light until the lanterns go out. We keep
          numbers small so it stays slow, soft and quiet.
        </p>
        <p className="text-lg leading-relaxed text-mute md:col-span-2">
          No rush.
          <br />
          No dress code.
          <br />
          Just water.
        </p>
      </div>
    </section>
  );
}

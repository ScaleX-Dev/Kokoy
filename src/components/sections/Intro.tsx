"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE, STORY_TEXT } from "@/lib/content";

const ITALIC = new Set(["pool", "hear", "see", "nowhere"]);

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
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" className="relative px-4 pt-28 pb-24 md:px-10 md:pt-44 md:pb-36">
      <span className="label mb-12 block text-mute md:mb-20">Our story</span>
      <p data-sentence className="display max-w-[22ch] text-[11.5vw] leading-[1] md:text-[6.4vw]">
        {words.map((w, i) => (
          <span key={i}>
            <span data-w className={ITALIC.has(w.replace(/[.,]/g, "")) ? "italic" : undefined}>
              {w}
            </span>{" "}
          </span>
        ))}
      </p>
      <p className="mt-16 max-w-[44ch] text-lg leading-relaxed text-mute md:mt-24 md:ml-[50%]">
        A pool, a small café and a quiet courtyard in {SITE.place}. Open every day, from first light until the lanterns
        go out.
      </p>
    </section>
  );
}

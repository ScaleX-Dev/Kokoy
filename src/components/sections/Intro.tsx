"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUI } from "../Providers";

type Token = { kind: "word"; text: string } | { kind: "hl"; words: string[] };

// "*a few words*" one coral-marked phrase.
function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let group: string[] | null = null;
  for (const raw of src.split(/\s+/)) {
    if (raw.startsWith("*")) group = [];
    const word = raw.replace(/\*/g, "");
    if (group) {
      group.push(word);
      if (/\*[.,!?]?$/.test(raw)) {
        out.push({ kind: "hl", words: group });
        group = null;
      }
    } else out.push({ kind: "word", text: word });
  }
  if (group) out.push({ kind: "hl", words: group });
  return out;
}

export default function Intro() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);
  const tokens = tokenize(t.intro.statement);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: "[data-statement]", start: "top 82%", end: "bottom 50%", scrub: true };
        gsap.fromTo("[data-w]", { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: st });
        gsap.fromTo("[data-hl]", { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", ease: "none", scrollTrigger: st });
        gsap.to("[data-intro-sun]", {
          yPercent: -30,
          rotate: 40,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from("[data-intro-in]", {
          y: 30,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-intro-foot]", start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="pad section-y relative overflow-hidden bg-cream">
      {/* An oversized half sun peeking in from the edge. */}
      <div
        data-intro-sun
        aria-hidden="true"
        className="sun pointer-events-none absolute -right-[22vw] bottom-[-18vw] size-[52vw] rounded-full opacity-90 md:-right-[12vw] md:bottom-[-14vw] md:size-[34vw]"
      />

      <p className="eyebrow relative flex items-center gap-2 text-charcoal/70">
        <span className="size-2.5 rounded-full bg-coral" aria-hidden="true" />
        {t.intro.label}
      </p>

      <h2
        data-statement
        className="relative mt-8 max-w-[22ch] hyphens-manual font-display text-[clamp(1.85rem,4.9vw,5rem)] leading-[1.12] font-semibold tracking-[-0.03em] md:mt-10"
      >
        {tokens.map((tok, i) =>
          tok.kind === "hl" ? (
            <span key={i}>
              <span
                data-hl
                className="rounded-[0.2em] bg-[linear-gradient(var(--color-coral),var(--color-coral))] box-decoration-clone bg-[length:100%_100%] bg-left bg-no-repeat px-[0.12em]"
              >
                {tok.words.map((w, j) => (
                  <span key={j}>
                    <span data-w>{w}</span>
                    {j < tok.words.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>{" "}
            </span>
          ) : (
            <span key={i}>
              <span data-w>{tok.text}</span>{" "}
            </span>
          ),
        )}
      </h2>

      <div data-intro-foot className="relative mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
        <p data-intro-in className="max-w-[48ch] text-lg leading-relaxed text-charcoal/75 md:col-span-6 md:col-start-6 md:text-xl">
          {t.intro.body}
        </p>
      </div>
    </section>
  );
}

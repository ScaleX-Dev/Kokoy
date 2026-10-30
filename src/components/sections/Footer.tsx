"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/content";
import { useUI } from "../Providers";

const SOCIAL = ["Instagram", "TripAdvisor", "WhatsApp", "Email"];

export default function Footer() {
  const { scrollTo } = useUI();
  const root = useRef<HTMLElement>(null);

  // The wordmark rises out of the floor as the page ends.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-foot-char]", {
          yPercent: 100,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 1 },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-night px-4 pt-20 text-paper md:px-10 md:pt-28">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <address className="text-sm not-italic leading-relaxed text-paper/75">
          {SITE.address.join(", ")}
          <br />
          WhatsApp {SITE.whatsapp} · {SITE.email}
        </address>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {SOCIAL.map((s) => (
            <li key={s}>
              <a href="#" className="link-line label inline-flex min-h-11 items-center">
                {s}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => scrollTo(0)} className="label link-line min-h-11 self-start">
          Back to top ↑
        </button>
      </div>

      <div className="display mt-16 flex justify-between overflow-hidden pb-[0.2em] text-[34vw] leading-[0.8] md:mt-10" aria-hidden="true">
        {"kokoy".split("").map((c, i) => (
          <span key={i} data-foot-char className="inline-block">
            {c}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-paper/15 py-6 text-xs text-paper/60 md:flex-row md:justify-between">
        <span>© 2026 kokoy. All rights reserved.</span>
        <span>Website by ScaleX</span>
      </div>
    </footer>
  );
}

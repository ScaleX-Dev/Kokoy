"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/content";
import { useUI } from "../Providers";
import Rich from "../ui/Rich";
import LangSwitch from "../ui/LangSwitch";
import { useAnchor } from "../ui/Buttons";
import { ArrowIcon } from "../ui/Icons";

/** Everything centred on one axis: sign-off, links, address, socials, then the sunset wordmark. */
export default function Footer() {
  const { t, scrollTo } = useUI();
  const anchor = useAnchor();
  const root = useRef<HTMLElement>(null);

  // As the page ends the sun sets behind the wordmark.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: "[data-foot-stage]", start: "top bottom", end: "bottom bottom", scrub: 1 };
        gsap.fromTo("[data-foot-sun]", { yPercent: 0 }, { yPercent: 30, ease: "none", scrollTrigger: st });
        gsap.from("[data-foot-char]", { yPercent: 100, ease: "none", stagger: 0.05, scrollTrigger: st });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-charcoal pt-[var(--sy)] text-cream">
      <div className="pad flex flex-col items-center text-center">
        <h2 className="title">
          <Rich text={t.footer.title} className="font-black text-coral" />
        </h2>
        {/* No buttons here: the Visit section right above already offers WhatsApp and directions. */}
        <nav aria-label={t.footer.explore} className="mt-10 md:mt-14">
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {t.nav.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={anchor(l.id)}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[14px] font-bold tracking-[0.12em] uppercase transition-colors duration-300 hover:bg-cream/10 hover:text-coral"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="mt-10 grid gap-8 text-[16px] leading-relaxed not-italic sm:grid-cols-2 sm:gap-16">
          <div>
            <p className="eyebrow text-cream/60">{t.footer.visit}</p>
            <p className="mt-3">{t.visit.address.join(", ")}</p>
          </div>
          <div>
            <p className="eyebrow text-cream/60">{t.visit.contactLabel}</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 inline-flex min-h-11 items-center break-all hover:text-coral">
              {SITE.email}
            </a>
          </div>
        </address>

        <div className="mt-10">
          <p className="eyebrow text-cream/60">{t.footer.follow}</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {SITE.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-cream/25 px-5 text-[15px] font-semibold transition-colors duration-300 hover:border-coral hover:text-coral"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-foot-stage className="wordmark-stage relative mt-16 overflow-hidden pt-[6vw] md:mt-24" aria-hidden="true">
        <div data-foot-sun className="sun absolute top-0 left-1/2 aspect-square w-[58vw] -translate-x-1/2 rounded-full md:w-[40vw]" />
        <p className="pad wordmark-fit relative flex justify-between overflow-hidden select-none">
          {"KOKOY".split("").map((c, i) => (
            <span key={i} data-foot-char className="inline-block pb-[0.05em]">
              {c}
            </span>
          ))}
        </p>
      </div>

      <div className="pad relative flex flex-col items-center gap-4 border-t border-cream/15 bg-charcoal py-6 text-center text-sm text-cream/70 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          <span>{t.footer.rights}</span>
          <span>{t.footer.credit}</span>
        </div>
        <div className="flex items-center gap-4">
          <LangSwitch />
          <button type="button" onClick={() => scrollTo(0)} className="inline-flex min-h-11 items-center gap-2 font-semibold text-cream hover:text-coral">
            {t.footer.top}
            <ArrowIcon dir="up" className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

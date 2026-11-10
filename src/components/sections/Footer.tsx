"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/content";
import { useUI } from "../Providers";
import LangSwitch from "../ui/LangSwitch";
import { LinkButton, WhatsAppButton, useAnchor } from "../ui/Buttons";
import { ArrowIcon } from "../ui/Icons";

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
    <footer ref={root} className="relative overflow-hidden bg-charcoal pt-24 text-cream md:pt-32">
      <div className="pad grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="display text-[clamp(2.6rem,6.4vw,6.5rem)] font-black">{t.footer.title}</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton message={t.wa.general}>{t.cta.whatsapp}</WhatsAppButton>
            <LinkButton href={SITE.maps} external tone="outline-cream">
              {t.cta.directions}
            </LinkButton>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6" aria-label={t.footer.explore}>
          <div>
            <h3 className="eyebrow text-cream/60">{t.footer.explore}</h3>
            <ul className="mt-4 space-y-1">
              {t.nav.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={anchor(l.id)} className="inline-flex min-h-9 items-center text-[17px] font-medium hover:text-coral">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-cream/60">{t.footer.follow}</h3>
            <ul className="mt-4 space-y-1">
              {SITE.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center text-[17px] font-medium hover:text-coral">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="eyebrow text-cream/60">{t.footer.visit}</h3>
            <address className="mt-4 text-[17px] leading-relaxed not-italic">
              {t.visit.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={`mailto:${SITE.email}`} className="mt-2 block break-all hover:text-coral">
                {SITE.email}
              </a>
            </address>
          </div>
        </nav>
      </div>

      <div data-foot-stage className="wordmark-stage relative mt-20 overflow-hidden pt-[6vw] md:mt-28" aria-hidden="true">
        <div
          data-foot-sun
          className="sun absolute top-0 left-1/2 aspect-square w-[58vw] -translate-x-1/2 rounded-full md:w-[40vw]"
        />
        <p className="pad wordmark-fit relative flex justify-between overflow-hidden select-none">
          {"KOKOY".split("").map((c, i) => (
            <span key={i} data-foot-char className="inline-block pb-[0.05em]">
              {c}
            </span>
          ))}
        </p>
      </div>

      <div className="pad relative flex flex-col gap-4 border-t border-cream/15 bg-charcoal py-6 text-sm text-cream/70 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
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

"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE, waLink } from "@/lib/content";
import { useUI } from "../Providers";
import { LinkButton, WhatsAppButton } from "../ui/Buttons";
import { PinIcon } from "../ui/Icons";

/** Illustrative map of the bay. Not to scale; Google Maps carries the real pin. */
function BayMap() {
  const { t } = useUI();
  const m = t.visit.map;
  return (
    <a
      href={SITE.maps}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[5/4] overflow-hidden rounded-[40px] bg-charcoal text-cream"
      aria-label={`${t.cta.directions}: ${t.visit.address.join(", ")}`}
    >
      <svg viewBox="0 0 500 400" className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <pattern id="kk-waves" width="28" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 q7 -6 14 0 t14 0" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />
          </pattern>
        </defs>
        {/* Land */}
        <path d="M0 0H500V175C455 170 430 205 400 240C372 272 330 285 290 282C240 278 205 250 180 230C150 206 120 205 95 222C70 240 40 250 0 245Z" fill="#FFF1D9" fillOpacity="0.08" />
        {/* Sea */}
        <path d="M0 245C40 250 70 240 95 222C120 205 150 206 180 230C205 250 240 278 290 282C330 285 372 272 400 240C430 205 455 170 500 175V400H0Z" fill="url(#kk-waves)" />
        {/* Shoreline */}
        <path d="M0 245C40 250 70 240 95 222C120 205 150 206 180 230C205 250 240 278 290 282C330 285 372 272 400 240C430 205 455 170 500 175" fill="none" stroke="#FF9D38" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
        {/* Road */}
        <path d="M0 120C80 110 140 140 210 150C300 162 380 120 500 95" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
        <text x="250" y="352" textAnchor="middle" className="fill-current text-[15px] font-semibold tracking-[0.2em] uppercase" fillOpacity="0.5">
          {m.ocean}
        </text>
        <text x="250" y="305" textAnchor="middle" className="fill-current text-[15px] font-semibold" fillOpacity="0.75">
          {m.bay}
        </text>
        <g fillOpacity="0.7" className="fill-current text-[15px] font-semibold">
          <circle cx="40" cy="116" r="4" />
          <text x="40" y="100" textAnchor="start">← {m.galle}</text>
          <circle cx="455" cy="182" r="4" />
          <text x="470" y="160" textAnchor="end">{m.jungle}</text>
        </g>
      </svg>

      {/* The pin: a sun that pulses */}
      <div className="absolute top-[52%] left-[56%] -translate-x-1/2 -translate-y-1/2">
        <span className="sun absolute inset-0 rounded-full" style={{ animation: "kk-ping 2s ease-out infinite" }} aria-hidden="true" />
        <span className="sun relative grid size-14 place-items-center rounded-full text-charcoal shadow-[0_0_40px_rgb(255_101_79/0.6)] transition-transform duration-500 ease-pop group-hover:scale-110">
          <PinIcon className="size-6" />
        </span>
        <span className="absolute top-1/2 left-full ml-3 -translate-y-1/2 rounded-full bg-cream px-3 py-1.5 font-display text-sm font-extrabold whitespace-nowrap text-charcoal">
          KOKOY
        </span>
      </div>

      <p className="absolute inset-x-6 bottom-5 text-xs text-cream/60">{m.note}</p>
    </a>
  );
}

export default function Visit() {
  const { t } = useUI();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-visit-in]", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from("[data-visit-map]", {
          y: 80,
          rotate: -3,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-visit-map]", start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="visit" className="relative bg-coral pt-24 pb-10 text-charcoal md:pt-36 md:pb-14">
      <div className="pad grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p data-visit-in className="eyebrow flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-charcoal" aria-hidden="true" />
            {t.visit.label}
          </p>
          <h2 data-visit-in className="display mt-5 text-[clamp(2.6rem,7vw,7rem)] font-black">
            {t.visit.title}
          </h2>
          <p data-visit-in className="mt-6 max-w-[44ch] text-lg leading-relaxed md:text-xl">
            {t.visit.body}
          </p>
          <div data-visit-in className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton message={t.wa.general} tone="charcoal">
              {t.cta.whatsapp}
            </WhatsAppButton>
            <LinkButton href={SITE.maps} external tone="outline-charcoal">
              {t.cta.directions}
            </LinkButton>
          </div>

          <dl className="mt-14 grid gap-8 border-t-2 border-charcoal/15 pt-8 sm:grid-cols-3 lg:gap-6">
            <div data-visit-in>
              <dt className="eyebrow opacity-75">{t.visit.addressLabel}</dt>
              <dd className="mt-3 text-lg leading-snug font-semibold">
                {t.visit.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </dd>
            </div>
            <div data-visit-in>
              <dt className="eyebrow opacity-75">{t.visit.hoursLabel}</dt>
              <dd className="mt-3 space-y-1">
                {t.visit.hours.map(([k, v]) => (
                  <span key={k} className="flex justify-between gap-3 text-[15px]">
                    <span>{k}</span>
                    <span className="font-semibold tabular-nums">{v}</span>
                  </span>
                ))}
              </dd>
            </div>
            <div data-visit-in>
              <dt className="eyebrow opacity-75">{t.visit.contactLabel}</dt>
              <dd className="mt-3 space-y-1 text-[15px] font-semibold">
                <a href={waLink(t.wa.general)} target="_blank" rel="noopener noreferrer" className="block underline-offset-4 hover:underline">
                  WhatsApp
                </a>
                <a href={`mailto:${SITE.email}`} className="block break-all underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
                <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="block underline-offset-4 hover:underline">
                  {SITE.instagram.handle}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div data-visit-map className="lg:col-span-6 lg:pt-10">
          <BayMap />
        </div>
      </div>

      {/* FAQ */}
      <div className="pad mt-20 md:mt-28">
        <div className="grid gap-8 rounded-[40px] bg-cream p-6 sm:p-10 md:grid-cols-12 md:p-14">
          <div className="md:col-span-4">
            <h3 className="display text-[clamp(2rem,3.6vw,3.25rem)] font-extrabold">{t.visit.faqTitle}</h3>
            <div className="mt-6">
              <WhatsAppButton message={t.wa.question} tone="coral">
                {t.cta.ask}
              </WhatsAppButton>
            </div>
          </div>
          <div className="md:col-span-8">
            {t.visit.faq.map((f) => (
              <details key={f.q} name="faq" className="faq group border-b-2 border-charcoal/10 first:border-t-2">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 font-display text-lg font-bold tracking-[-0.02em] md:text-xl">
                  {f.q}
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-charcoal/5 transition-[background-color,rotate] duration-500 ease-soft group-open:rotate-45 group-open:bg-coral"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M8 2v12M2 8h12" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-6 text-[17px] leading-relaxed text-charcoal/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

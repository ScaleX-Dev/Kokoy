"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SITE, mapApps } from "@/lib/content";
import { useUI } from "../Providers";
import Rich from "../ui/Rich";
import { MapButtons, WhatsAppButton } from "../ui/Buttons";

// MapLibre is ~1 MB, so it is fetched only when the visitor nears this section.
const KokoyMap = dynamic(() => import("../ui/KokoyMap"), { ssr: false });

/** A real map of Unawatuna in brand colours. The sun pin shows until the map is ready. */
function VisitMap() {
  const { t, lang } = useUI();
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="relative aspect-[5/4] overflow-hidden rounded-[40px] bg-[#34313B] shadow-[0_30px_60px_-30px_rgb(37_35_43/0.6)]">
      <a
        href={SITE.maps[mapApps(lang)[0]]}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.cta.directions}: ${t.visit.address.join(", ")}`}
        className="absolute inset-0 grid place-items-center"
      >
        <span className="kk-pin" aria-hidden="true">
          <span className="kk-pin-ping" />
          <span className="kk-pin-sun" />
          <span className="kk-pin-label">KOKOY</span>
        </span>
      </a>
      {near && <KokoyMap lang={lang} gestureHelp={t.visit.mapHelp} />}
    </div>
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
    <section ref={root} id="visit" className="relative bg-coral pt-[var(--sy)] pb-10 text-charcoal md:pb-14">
      <div className="pad max-w-5xl">
        <p data-visit-in className="eyebrow flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-charcoal" aria-hidden="true" />
          {t.visit.label}
        </p>
        <h2 data-visit-in className="title mt-5">
          <Rich text={t.visit.title} className="font-black" />
        </h2>
        <p data-visit-in className="mt-6 max-w-[44ch] text-lg leading-relaxed md:text-xl">
          {t.visit.body}
        </p>
      </div>

      {/* The map as the big picture, with an info card laid over its edge. */}
      <div className="pad mt-12 md:mt-16">
        <div className="grid items-center lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div data-visit-in className="relative z-10 rounded-[32px] bg-cream p-6 shadow-[0_30px_60px_-30px_rgb(37_35_43/0.6)] sm:p-8 lg:-mr-12">
            <dl className="divide-y-2 divide-charcoal/10">
              <div className="pb-5">
                <dt className="eyebrow text-charcoal/70">{t.visit.addressLabel}</dt>
                <dd className="mt-2 text-lg leading-snug font-semibold">
                  {t.visit.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="py-5">
                <dt className="eyebrow text-charcoal/70">{t.visit.hoursLabel}</dt>
                <dd className="mt-3 space-y-1.5">
                  {t.visit.hours.map(([k, v]) => (
                    <span key={k} className="flex justify-between gap-3 text-[15px]">
                      <span>{k}</span>
                      <span className="font-semibold tabular-nums">{v}</span>
                    </span>
                  ))}
                </dd>
              </div>
              <div className="py-5">
                <dt className="eyebrow text-charcoal/70">{t.visit.contactLabel}</dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-semibold">
                  <a href={`mailto:${SITE.email}`} className="break-all underline-offset-4 hover:underline">
                    {SITE.email}
                  </a>
                  <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {SITE.instagram.handle}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-2 flex flex-col gap-3">
              <WhatsAppButton message={t.wa.general} tone="charcoal" className="w-full">
                {t.cta.whatsapp}
              </WhatsAppButton>
              <p className="eyebrow mt-3 text-charcoal/70">{t.cta.directions}</p>
              <div className="grid grid-cols-2 gap-3">
                <MapButtons tone="outline-charcoal" className="w-full px-3 whitespace-nowrap" />
              </div>
            </div>
          </div>

          <div data-visit-map className="-mt-8 lg:mt-0">
            <VisitMap />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="pad mt-14 md:mt-20">
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

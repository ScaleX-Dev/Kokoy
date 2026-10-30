"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, SITE } from "@/lib/content";
import { useUI } from "../Providers";

export default function Visit() {
  const { openBooking } = useUI();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-visit-line]", {
          yPercent: 110,
          duration: 1.4,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        gsap.from("[data-visit-in]", {
          y: 30,
          opacity: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-visit-grid]", start: "top 85%" },
        });
        gsap.fromTo("[data-visit-img]", { clipPath: "inset(0% 50% 0% 50% round 999px 999px 0 0)" }, {
          clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)",
          ease: "none",
          scrollTrigger: { trigger: "[data-visit-img]", start: "top 90%", end: "center 55%", scrub: true },
        });
      });
    },
    { scope: root },
  );

  const info = [
    { label: "Address", body: [...SITE.address], link: { text: "Open in Maps", href: "#" } },
    { label: "Hours", body: SITE.hours.map(([k, v]) => `${k} ${v}`) },
    { label: "From", body: ["[x] min from [landmark]", "[x] min from [beach / station]"] },
    { label: "Talk to us", body: [`WhatsApp ${SITE.whatsapp}`, SITE.email] },
  ];

  return (
    <section ref={root} id="visit" className="relative px-4 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12 md:items-end md:gap-6">
        <div className="md:col-span-7">
          <span className="label text-mute">Getting here</span>
          <h2 className="display mt-6 text-[19vw] leading-[0.85] md:text-[10vw]">
            <span className="-mb-[0.09em] block overflow-hidden pb-[0.14em]">
              <span data-visit-line className="block">Come as</span>
            </span>
            <span className="-mb-[0.09em] block overflow-hidden pb-[0.14em]">
              <span data-visit-line className="block italic">you are.</span>
            </span>
          </h2>
          <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-mute">
            We keep numbers small so it stays quiet. Book ahead, or walk in. If there&apos;s room, there&apos;s always room for you.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openBooking("pool")}
              className="label min-h-12 rounded-full bg-ink px-7 text-paper transition-transform duration-500 ease-soft hover:-translate-y-0.5"
            >
              Book pool
            </button>
            <button
              type="button"
              onClick={() => openBooking("table")}
              className="label min-h-12 rounded-full border border-ink px-7 transition-colors duration-500 hover:bg-ink hover:text-paper"
            >
              Book table
            </button>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <div data-visit-img className="shape-arch relative aspect-[3/4] overflow-hidden">
            <Image src={IMG.palmPool} alt="Palms around the pool at golden hour" fill sizes="(min-width: 768px) 32vw, 92vw" className="object-cover" />
          </div>
        </div>
      </div>

      <dl data-visit-grid className="mt-24 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-2 md:mt-32 md:grid-cols-4">
        {info.map((b) => (
          <div key={b.label} data-visit-in>
            <dt className="label text-mute">{b.label}</dt>
            <dd className="mt-4 font-serif text-2xl leading-snug">
              {b.body.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {b.link && (
                <a href={b.link.href} className="link-line mt-3 inline-block font-sans text-sm">
                  {b.link.text} →
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

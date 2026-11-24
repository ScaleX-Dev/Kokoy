"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG } from "@/lib/content";
import { MENU, formatPrice, type MenuItem, type MenuSection } from "@/lib/menu";
import { useUI } from "../Providers";
import Rich from "../ui/Rich";
import SpinBadge from "../ui/SpinBadge";
import { WhatsAppButton } from "../ui/Buttons";
import { ArrowIcon, Burst } from "../ui/Icons";

// Clears the sticky section tabs (they sit under the nav pill) when jumping to a section.
const TABS_OFFSET = 64;

const TONES = {
  dark: { bg: "bg-charcoal text-cream", soft: "text-cream/70", line: "border-cream/15", spec: "text-coral" },
  light: { bg: "bg-cream text-charcoal", soft: "text-charcoal/70", line: "border-charcoal/12", spec: "text-coral" },
  sand: { bg: "bg-sand text-charcoal", soft: "text-charcoal/70", line: "border-charcoal/12", spec: "text-coral" },
} as const;

/**
 * The full drinks menu: an opening with the arch photo and the service note, sticky section
 * tabs that follow the reader, feature sections (name, price, ingredients, a line about each
 * drink) for the cocktails, zero-proof and smoothies, compact price lists for the rest, and a
 * hand-off to WhatsApp for the day's food.
 */
export default function MenuPage() {
  const { t, lang, scrollTo } = useUI();
  const m = t.menuPage;
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(MENU[0].id);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-mp-hero]", { y: 40, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.1)
          .from("[data-mp-arch]", { y: 60, opacity: 0, scale: 0.94, duration: 1.4 }, 0.2);
        gsap.utils.toArray<HTMLElement>("[data-mp-in]").forEach((el) =>
          gsap.from(el, { y: 32, opacity: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } }),
        );
      });
    },
    { scope: root },
  );

  // Highlight the tab of the section being read, and keep that tab in view on narrow screens.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace("menu-", ""));
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    MENU.forEach((s) => {
      const el = document.getElementById(`menu-${s.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const bar = tabs.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (bar && tab) bar.scrollTo({ left: tab.offsetLeft - bar.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(`#menu-${id}`, TABS_OFFSET);
  };

  const features = MENU.filter((s) => s.style === "feature");
  const lists = MENU.filter((s) => s.style === "list");

  return (
    <div ref={root}>
      {/* ── Opening ── */}
      <section className="relative overflow-hidden bg-cream pt-[calc(var(--pill-h)_+_var(--pill-gap)_*_2_+_2.5rem)] pb-14 md:pb-20">
        <div className="pad grid items-end gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16">
          <div>
            <a
              data-mp-hero
              href={`/${lang}`}
              className="inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-charcoal/70 transition-colors hover:text-coral"
            >
              <ArrowIcon dir="left" className="size-4" />
              {m.back}
            </a>
            <p data-mp-hero className="eyebrow mt-8 text-coral">
              {m.label}
            </p>
            <h1 data-mp-hero className="title mt-4 text-[clamp(3rem,9vw,8.5rem)]">
              <Rich text={m.title} className="font-black text-coral" />
            </h1>
            <p data-mp-hero className="display mt-6 max-w-[22ch] text-[clamp(1.4rem,2.4vw,2.1rem)] font-bold">
              {m.tagline}
            </p>
            <p data-mp-hero className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-charcoal/65">
              {m.service}
            </p>
          </div>

          <div data-mp-arch className="relative mx-auto w-[min(78vw,420px)] md:mx-0 md:ml-auto">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[36px] bg-sand shadow-[0_40px_70px_-40px_rgb(37_35_43/0.7)]">
              <Image src={IMG.spritz} alt={t.alt.spritz} fill priority sizes="(min-width: 768px) 34vw, 78vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-[32%] md:-left-10" aria-hidden="true">
              <SpinBadge text={t.drinks.badge} className="sun w-full text-charcoal">
                <Burst className="size-[34%]" />
              </SpinBadge>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section tabs: stuck under the nav pill, following the reader ── */}
      <nav
        aria-label={m.jump}
        className="sticky top-[calc(var(--pill-h)_+_1.25rem)] z-40 border-y border-charcoal/10 bg-cream/90 backdrop-blur-md md:top-[calc(var(--pill-h)_+_1.5rem)]"
      >
        <div ref={tabs} className="pad flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MENU.map((s) => (
            <a
              key={s.id}
              data-tab={s.id}
              href={`#menu-${s.id}`}
              onClick={go(s.id)}
              aria-current={active === s.id ? "true" : undefined}
              className={clsx(
                "inline-flex min-h-10 shrink-0 items-center rounded-full px-4 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300",
                active === s.id ? "bg-charcoal text-cream" : "text-charcoal hover:bg-charcoal/[0.07]",
              )}
            >
              {s.title[lang]}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Feature sections ── */}
      {features.map((s, i) => (
        <FeatureSection key={s.id} section={s} index={i + 1} count={m.count.replace("{n}", String(s.items.length))} />
      ))}

      {/* ── The rest: compact price lists ── */}
      <section className="section-y bg-cream text-charcoal">
        <div className="pad grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {lists.map((s) => (
            <section
              key={s.id}
              id={`menu-${s.id}`}
              data-mp-in
              className="rounded-[28px] bg-white/70 p-6 ring-1 ring-charcoal/[0.07] md:p-8"
            >
              <h2 className="display text-[1.6rem] font-extrabold">{s.title[lang]}</h2>
              <ul className="mt-5">
                {s.items.map((it) => (
                  <li key={it.name.en} className="flex items-baseline gap-3 py-2 text-[16px]">
                    <span className="font-medium">{it.name[lang]}</span>
                    <span className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-charcoal/30" aria-hidden="true" />
                    <span className="shrink-0 font-display text-[15px] font-bold tabular-nums">{formatPrice(it.price, lang)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="pad mt-10 text-center text-[14px] text-charcoal/60">{m.service}</p>
      </section>

      {/* ── Food: the kitchen menu changes, so it is asked for ── */}
      <section className="section-y bg-coral text-charcoal">
        <div data-mp-in className="pad flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="title">
              <Rich text={m.foodTitle} className="font-black" />
            </h2>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-charcoal/80">{m.foodBody}</p>
          </div>
          <WhatsAppButton message={t.wa.brunch} tone="charcoal">
            {m.foodCta}
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}

function FeatureSection({ section: s, index, count }: { section: MenuSection; index: number; count: string }) {
  const { t, lang } = useUI();
  const tone = TONES[s.tone ?? "light"];
  // The title's last word in black, the site's headline style.
  const words = s.title[lang].split(" ");
  return (
    <section id={`menu-${s.id}`} className={clsx("section-y", tone.bg)}>
      <div className="pad grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:gap-24">
        <header className="md:sticky md:top-[calc(var(--pill-h)_+_6.5rem)] md:self-start">
          <p data-mp-in className={clsx("eyebrow", tone.soft)}>
            {String(index).padStart(2, "0")} · {count}
          </p>
          <h2 data-mp-in className="title mt-4 text-[clamp(2.4rem,5vw,5rem)]">
            {words.slice(0, -1).join(" ")} <span className="font-black">{words.at(-1)}</span>
          </h2>
          {s.img && (
            <div data-mp-in className="relative mt-8 hidden aspect-[4/5] w-[min(100%,340px)] overflow-hidden rounded-t-full rounded-b-[32px] md:block">
              <Image src={IMG[s.img]} alt={t.alt[s.img]} fill sizes="340px" className="object-cover" />
            </div>
          )}
        </header>

        <ul>
          {s.items.map((it) => (
            <Item key={it.name.en} item={it} tone={tone} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Item({ item, tone }: { item: MenuItem; tone: (typeof TONES)[keyof typeof TONES] }) {
  const { lang } = useUI();
  return (
    <li data-mp-in className={clsx("border-t py-6 first:border-t-0 first:pt-0 md:py-7", tone.line)}>
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="display text-[1.45rem] font-extrabold md:text-[1.75rem]">{item.name[lang]}</h3>
        <span className="shrink-0 font-display text-[1.05rem] font-bold tabular-nums md:text-[1.2rem]">{formatPrice(item.price, lang)}</span>
      </div>
      {item.spec && <p className={clsx("mt-2.5 text-[12px] font-bold tracking-[0.12em] uppercase", tone.spec)}>{item.spec[lang].join(" · ")}</p>}
      {item.desc && <p className={clsx("mt-2.5 max-w-[54ch] leading-relaxed", tone.soft)}>{item.desc[lang]}</p>}
    </li>
  );
}

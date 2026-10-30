"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MENUS, type MenuKey } from "@/lib/content";
import { useUI } from "../Providers";

const soft = [0.2, 0.7, 0.1, 1] as const;
const KEYS = Object.keys(MENUS) as MenuKey[];

export default function Menu() {
  const { openBooking } = useUI();
  const [tab, setTab] = useState<MenuKey>("morning");
  const root = useRef<HTMLElement>(null);
  const menu = MENUS[tab];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-menu-in]", {
          y: 50,
          opacity: 0,
          duration: 1.3,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="menu" className="relative px-4 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6 md:pr-10">
          <span data-menu-in className="label block text-mute">Café &amp; bar</span>
          <h2 data-menu-in className="display mt-4 text-6xl md:text-8xl">
            Small menu, <span className="italic">made with care</span>
          </h2>

          <div data-menu-in className="mt-12 flex gap-8 border-b border-ink/15" role="tablist" aria-label="Menu by time of day">
            {KEYS.map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={clsx(
                  "label relative min-h-12 transition-colors duration-500",
                  tab === k ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                {MENUS[k].label}
                {tab === k && (
                  <motion.span layoutId="menu-tab" className="absolute inset-x-0 -bottom-px h-px bg-ink" transition={{ duration: 0.6, ease: soft }} />
                )}
              </button>
            ))}
          </div>

          <div className="relative min-h-[380px]" role="tabpanel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={tab} initial="hide" animate="show" exit="out" className="divide-y divide-ink/10">
                {menu.items.map((m, i) => (
                  <motion.li
                    key={m.name}
                    className="flex items-baseline justify-between gap-6 py-6"
                    variants={{
                      hide: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: soft, delay: i * 0.07 } },
                      out: { opacity: 0, y: -12, transition: { duration: 0.3, delay: i * 0.03 } },
                    }}
                  >
                    <div>
                      <h3 className="font-serif text-3xl leading-tight md:text-4xl">{m.name}</h3>
                      <p className="mt-1 text-mute">{m.desc}</p>
                    </div>
                    <span className="shrink-0 text-sm tabular-nums text-mute">{m.price}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <button
            data-menu-in
            type="button"
            onClick={() => openBooking("table")}
            className="label mt-10 min-h-12 rounded-full border border-ink px-7 transition-colors duration-500 hover:bg-ink hover:text-paper"
          >
            Book a table
          </button>
        </div>

        <div data-menu-in className="md:sticky md:top-24 md:col-span-5 md:col-start-8 md:h-fit">
          <div className="shape-arch relative aspect-[3/4] overflow-hidden bg-stone">
            <AnimatePresence initial={false}>
              <motion.div
                key={tab}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
              >
                <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: soft }}>
                  <Image src={menu.img} alt={menu.alt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="label mt-4 text-mute">{menu.cap}</p>
        </div>
      </div>
    </section>
  );
}

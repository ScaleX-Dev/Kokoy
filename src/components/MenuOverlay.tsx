"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, SITE } from "@/lib/content";
import { useUI } from "./Providers";

const ease = [0.7, 0, 0.2, 1] as const;
const soft = [0.2, 0.7, 0.1, 1] as const;

export default function MenuOverlay() {
  const { menuOpen, setMenuOpen, openBooking, scrollTo } = useUI();
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex bg-paper text-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0% 0)" }}
          transition={{ duration: 1, ease }}
        >
          <div className="flex flex-1 flex-col px-4 pb-8 md:px-10">
            <div className="flex h-[72px] items-center justify-between md:h-[84px]">
              <button type="button" onClick={() => setMenuOpen(false)} className="label flex min-h-11 items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
                Close
              </button>
              <span className="font-serif text-[30px] leading-none md:hidden">kokoy</span>
            </div>

            <nav className="mt-6 flex flex-1 flex-col justify-center md:mt-0" aria-label="Sections">
              <ul>
                {NAV.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-ink/10 first:border-t">
                    <motion.a
                      href={l.href}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        setTimeout(() => scrollTo(l.href), 650);
                      }}
                      className="group block py-2 md:py-3"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.1, ease: soft, delay: 0.35 + i * 0.06 }}
                    >
                      <span
                        className="display inline-block pb-[0.12em] text-[13vw] transition-[transform,color,font-style] duration-700 ease-soft group-hover:italic md:text-[5.6vw]"
                        style={{ color: hover === i ? "var(--color-ink)" : "var(--color-mute)" }}
                      >
                        {l.label}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-8 grid gap-6 text-sm text-mute sm:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <p>
                {SITE.address.join(", ")}
                <br />
                Open daily
              </p>
              <p>
                WhatsApp {SITE.whatsapp}
                <br />
                {SITE.email}
              </p>
              <div className="flex gap-2 sm:justify-end">
                <button type="button" onClick={() => openBooking("pool")} className="label min-h-11 rounded-full bg-ink px-5 text-paper">
                  Book pool
                </button>
                <button type="button" onClick={() => openBooking("table")} className="label min-h-11 rounded-full border border-ink px-5">
                  Book table
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative hidden w-[38vw] overflow-hidden md:block"
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            transition={{ duration: 1.2, ease, delay: 0.25 }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={hover}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: soft }}
              >
                <Image src={NAV[hover].img} alt="" fill sizes="38vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

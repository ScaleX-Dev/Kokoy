"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/lib/content";
import { useUI } from "./Providers";
import Wordmark from "./ui/Wordmark";
import LangSwitch from "./ui/LangSwitch";
import { WhatsAppButton, useAnchor } from "./ui/Buttons";

const snap = [0.7, 0, 0.2, 1] as const;
const soft = [0.2, 0.7, 0.1, 1] as const;

export default function MobileMenu() {
  const { t, menuOpen, setMenuOpen } = useUI();
  const anchor = useAnchor();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus();
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
          aria-label={t.menu}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-coral text-charcoal"
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.8, ease: snap }}
          data-lenis-prevent
        >
          <div className="pad flex h-16 shrink-0 items-center justify-between md:h-[76px]">
            <span className="text-[22px]">
              <Wordmark sub={false} mono />
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={t.a11y.closeMenu}
              className="grid size-11 place-items-center rounded-full bg-charcoal text-cream"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>

          <nav className="pad flex flex-1 flex-col justify-center py-8" aria-label={t.menu}>
            <ul>
              {t.nav.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={anchor(l.id)}
                    className="group flex items-center gap-4 py-1.5"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: soft, delay: 0.25 + i * 0.06 }}
                  >
                    <span className="font-display text-[11vw] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-[8vw]">{l.label}</span>
                    <span className="size-4 shrink-0 scale-0 rounded-full bg-charcoal transition-transform duration-300 ease-pop group-hover:scale-100" aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="pad flex flex-col gap-5 pb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <WhatsAppButton message={t.wa.general} tone="charcoal" className="w-full">
              {t.cta.whatsapp}
            </WhatsAppButton>
            <div className="flex items-center justify-between gap-4 text-sm font-medium">
              <span>
                {t.visit.address[0]} · {SITE.email}
              </span>
              <LangSwitch tone="dark" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

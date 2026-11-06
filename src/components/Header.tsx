"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { waLink } from "@/lib/content";
import { useUI } from "./Providers";
import Wordmark from "./ui/Wordmark";
import LangSwitch from "./ui/LangSwitch";
import { ArrowIcon, WhatsAppIcon } from "./ui/Icons";
import { useAnchor } from "./ui/Buttons";

export default function Header() {
  const { t, setMenuOpen, scrollTo } = useUI();
  const anchor = useAnchor();
  const [scrolled, setScrolled] = useState(false);
  const [solid, setSolid] = useState(false);

  // Always visible. Transparent over the hero, a cream bar everywhere else.
  // The announcement strip folds away as soon as the visitor starts scrolling.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setSolid(window.scrollY > window.innerHeight * 0.82);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-cream px-4 py-2 font-semibold text-charcoal focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {t.a11y.skip}
      </a>

      {/* Announcement strip */}
      <div className={clsx("grid transition-[grid-template-rows] duration-500 ease-soft", scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]")}>
        <div className="overflow-hidden">
          <a
            href="#events"
            onClick={anchor("events")}
            tabIndex={scrolled ? -1 : 0}
            className="pad group flex min-h-10 items-center justify-center gap-3 bg-coral py-2 text-center text-[13px] font-semibold text-charcoal"
          >
            <span className="relative flex size-2 shrink-0" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-charcoal" style={{ animation: "kk-ping 1.6s ease-out infinite" }} />
              <span className="relative size-2 rounded-full bg-charcoal" />
            </span>
            <span className="truncate">{t.announcement.text}</span>
            <span className="hidden items-center gap-1 underline decoration-2 underline-offset-4 sm:inline-flex">
              {t.announcement.link}
              <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>

      <div
        className={clsx(
          "transition-[background-color,color,box-shadow] duration-500 ease-soft",
          solid ? "bg-cream/90 text-charcoal shadow-[0_1px_0_rgb(37_35_43/0.08)] backdrop-blur-md" : "text-cream",
        )}
      >
        <div className="pad mx-auto flex h-16 items-center justify-between gap-4 md:h-[76px]">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            aria-label={t.a11y.home}
            className="text-[22px] md:text-[26px]"
          >
            <Wordmark />
          </a>

          <nav className="hidden lg:block" aria-label={t.menu}>
            <ul className="flex items-center gap-1">
              {t.nav.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={anchor(l.id)}
                    className="relative inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-medium transition-colors duration-300 hover:bg-current/10"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch tone={solid ? "dark" : "light"} />
            <a
              href={waLink(t.wa.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center gap-2 rounded-full bg-coral px-5 text-[14px] font-semibold text-charcoal transition-colors duration-300 hover:bg-orange sm:inline-flex"
            >
              <WhatsAppIcon className="size-[18px]" />
              {t.cta.chat}
              <span className="sr-only">({t.a11y.newTab})</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.a11y.openMenu}
              className="grid size-11 place-items-center rounded-full bg-current/10 lg:hidden"
            >
              <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
                <span className="h-[2px] w-full rounded bg-current" />
                <span className="h-[2px] w-3/4 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

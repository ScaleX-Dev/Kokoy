"use client";

import { waLink } from "@/lib/content";
import { useUI } from "./Providers";
import Wordmark from "./ui/Wordmark";
import { WhatsAppIcon } from "./ui/Icons";
import { useAnchor } from "./ui/Buttons";

/**
 * A floating pill nav. It rests at the foot of the hero, rides up with it, then sticks
 * to the top of the screen for the rest of the page.
 *
 * The header is an invisible track running from the pill's resting place to the end of
 * the page, and the pill is `sticky` inside it. That keeps the hand-off entirely in CSS,
 * so it moves on the compositor and never lags behind the scroll.
 */
export default function Header() {
  const { t, setMenuOpen, scrollTo } = useUI();
  const anchor = useAnchor();

  return (
    <header className="pointer-events-none absolute inset-x-0 top-[calc(max(100svh,var(--hero-min))_-_var(--pill-h)_-_var(--pill-gap))] bottom-0 z-50">
      <a
        href="#main"
        className="pointer-events-auto sr-only rounded-full bg-cream px-4 py-2 font-semibold text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
      >
        {t.a11y.skip}
      </a>

      <nav
        aria-label={t.menu}
        className="pointer-events-auto sticky top-3 mx-[var(--pad)] flex h-[var(--pill-h)] items-center justify-between gap-3 rounded-full bg-cream pr-1.5 pl-5 text-charcoal shadow-[0_14px_40px_-14px_rgb(37_35_43/0.5)] ring-1 ring-charcoal/5 motion-safe:animate-[kk-rise_1s_var(--ease-soft)_1.1s_both] md:top-4 md:pr-2 md:pl-6 xl:mx-auto xl:w-[var(--pill-w)]"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0);
          }}
          aria-label={t.a11y.home}
          className="shrink-0 text-[20px] md:text-[22px]"
        >
          <Wordmark sub={false} />
        </a>

        <ul className="hidden items-center lg:flex">
          {t.nav.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={anchor(l.id)}
                className="inline-flex min-h-11 items-center rounded-full px-3 whitespace-nowrap text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-300 hover:bg-charcoal/[0.07] xl:px-2.5 xl:tracking-[0.06em]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={waLink(t.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[calc(var(--pill-h)_-_12px)] shrink-0 items-center whitespace-nowrap gap-2 rounded-full bg-coral px-4 text-[13px] font-bold tracking-[0.1em] text-charcoal uppercase transition-colors duration-300 hover:bg-orange md:h-[calc(var(--pill-h)_-_16px)] md:px-5 xl:tracking-[0.06em]"
          >
            <WhatsAppIcon className="size-[18px] shrink-0" />
            <span className="hidden sm:inline">{t.cta.chat}</span>
            <span className="sr-only">
              <span className="sm:hidden">{t.cta.chat} </span>({t.a11y.newTab})
            </span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t.a11y.openMenu}
            className="grid size-11 place-items-center rounded-full bg-charcoal/[0.07] lg:hidden"
          >
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <span className="h-[2px] w-full rounded bg-current" />
              <span className="h-[2px] w-3/4 rounded bg-current" />
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}

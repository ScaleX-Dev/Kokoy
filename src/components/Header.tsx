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
        className="pointer-events-auto sticky top-3 mx-[var(--pad)] flex h-[var(--pill-h)] items-stretch justify-between gap-4 overflow-hidden rounded-full bg-cream pl-5 text-charcoal shadow-[0_12px_32px_-14px_rgb(37_35_43/0.45)] ring-1 ring-charcoal/5 motion-safe:animate-[kk-rise_1s_var(--ease-soft)_1.1s_both] md:top-4 lg:mx-auto lg:w-fit lg:max-w-[var(--pill-w)] lg:gap-6"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0);
          }}
          aria-label={t.a11y.home}
          className="flex shrink-0 items-center text-[17px] md:text-[18px]"
        >
          <Wordmark sub={false} />
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {t.nav.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={anchor(l.id)}
                className="inline-flex min-h-9 items-center rounded-full px-2.5 text-[12px] font-semibold tracking-[0.04em] whitespace-nowrap uppercase transition-colors duration-300 hover:bg-charcoal/[0.07]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-stretch">
          <a
            href={waLink(t.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="order-2 inline-flex shrink-0 items-center gap-2 bg-coral px-4 text-[12px] font-semibold tracking-[0.04em] whitespace-nowrap text-charcoal uppercase transition-colors duration-300 hover:bg-orange md:px-6"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            <span className="hidden sm:inline">{t.cta.chat}</span>
            <span className="sr-only">
              <span className="sm:hidden">{t.cta.chat} </span>({t.a11y.newTab})
            </span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t.a11y.openMenu}
            className="order-1 mr-1.5 grid size-10 place-items-center self-center rounded-full bg-charcoal/[0.07] lg:hidden"
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

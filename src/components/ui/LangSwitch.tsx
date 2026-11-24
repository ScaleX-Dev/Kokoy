"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { SCROLL_KEY, useUI } from "../Providers";

const NAMES: Record<Locale, string> = { en: "English", ru: "Русский" };

function remember(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  try {
    sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)));
  } catch {}
}

/** EN / RU pill. Remembers the choice and keeps the visitor on the same page, at the same place. */
export default function LangSwitch({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const { lang, t } = useUI();
  // The same page in the other language: /en/menu <-> /ru/menu.
  const rest = (usePathname() ?? "").replace(/^\/(en|ru)(?=\/|$)/, "");

  return (
    <nav aria-label={t.a11y.language} className={clsx("flex rounded-full p-1 text-[12px] font-bold tracking-[0.12em]", tone === "light" ? "bg-cream/15" : "bg-charcoal/10", className)}>
      {LOCALES.map((l) => {
        const active = l === lang;
        return (
          <a
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={NAMES[l]}
            onClick={() => !active && remember(l)}
            className={clsx(
              "grid min-h-11 min-w-11 place-items-center rounded-full px-2.5 uppercase transition-colors duration-300",
              active ? (tone === "light" ? "bg-cream text-charcoal" : "bg-charcoal text-cream") : "hover:bg-current/10",
            )}
          >
            {l}
          </a>
        );
      })}
    </nav>
  );
}

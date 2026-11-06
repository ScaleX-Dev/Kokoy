import en, { type Dict } from "./en";
import ru from "./ru";

export const LOCALES = ["en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

const dictionaries: Record<Locale, Dict> = { en, ru };
export const getDictionary = (locale: Locale): Dict => dictionaries[locale];

export type { Dict };

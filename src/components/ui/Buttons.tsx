"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { waLink } from "@/lib/content";
import { useUI } from "../Providers";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

type Tone = "coral" | "charcoal" | "cream" | "outline-cream" | "outline-charcoal";

const TONES: Record<Tone, string> = {
  coral: "bg-coral text-charcoal hover:bg-orange",
  charcoal: "bg-charcoal text-cream hover:bg-black",
  cream: "bg-cream text-charcoal hover:bg-white",
  "outline-cream": "border-2 border-cream/80 text-cream hover:bg-cream hover:text-charcoal",
  "outline-charcoal": "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
};

export const pill =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-semibold transition-[background-color,color,transform] duration-300 ease-soft active:scale-[0.97]";

export function WhatsAppButton({
  message,
  children,
  tone = "coral",
  className,
}: {
  message: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const { t } = useUI();
  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={clsx(pill, TONES[tone], className)}>
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>{children}</span>
      <span className="sr-only">({t.a11y.newTab})</span>
    </a>
  );
}

export function LinkButton({
  href,
  children,
  tone = "outline-charcoal",
  className,
  external,
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={clsx(pill, TONES[tone], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <ArrowIcon dir={external ? "ne" : "right"} className="size-4 shrink-0 transition-transform duration-300 ease-soft group-hover/btn:translate-x-0.5" />
    </a>
  );
}

/** In-page anchor that hands the scroll to Lenis. */
export function useAnchor() {
  const { scrollTo, setMenuOpen } = useUI();
  return (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(`#${id}`);
  };
}

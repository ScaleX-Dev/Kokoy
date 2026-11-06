"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { waLink } from "@/lib/content";
import { useUI } from "./Providers";
import { WhatsAppIcon } from "./ui/Icons";

/** Always-reachable WhatsApp enquiry, once the hero's own buttons are out of view. */
export default function WhatsAppFab() {
  const { t, menuOpen } = useUI();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 160;
      setShow(window.scrollY > window.innerHeight * 0.7 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = show && !menuOpen;

  return (
    <a
      href={waLink(t.wa.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.cta.whatsapp} (${t.a11y.newTab})`}
      tabIndex={visible ? 0 : -1}
      className={clsx(
        "group fixed right-4 bottom-4 z-40 flex h-14 items-center gap-0 rounded-full bg-coral pr-[18px] pl-[18px] text-charcoal shadow-[0_10px_30px_-8px_rgb(37_35_43/0.45)] transition-[transform,opacity,gap,padding] duration-500 ease-soft hover:gap-2.5 hover:pr-6 md:right-8 md:bottom-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="absolute inset-0 rounded-full bg-coral" style={{ animation: "kk-ping 2.4s ease-out infinite" }} aria-hidden="true" />
      <WhatsAppIcon className="relative size-6 shrink-0" />
      <span className="relative grid grid-cols-[0fr] text-[15px] font-semibold whitespace-nowrap transition-[grid-template-columns] duration-500 ease-soft group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden">{t.cta.chat}</span>
      </span>
    </a>
  );
}

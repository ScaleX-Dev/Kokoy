"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useUI } from "./Providers";

export default function Header() {
  const { ready, setMenuOpen, openBooking, scrollTo } = useUI();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Transparent over the hero; a soft paper bar afterwards that tucks away on scroll-down.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.85);
      setHidden(y > window.innerHeight && y > last + 2);
      if (Math.abs(y - last) > 2) last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,opacity] duration-700 ease-soft",
        solid ? "bg-paper/85 text-ink backdrop-blur-md" : "text-paper",
        hidden ? "-translate-y-full" : "translate-y-0",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="mx-auto grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[84px] md:px-10">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="group flex min-h-11 items-center gap-3 justify-self-start"
        >
          <span className="flex w-7 flex-col gap-[6px]" aria-hidden="true">
            <span className="h-px w-full bg-current transition-transform duration-500 ease-soft group-hover:scale-x-75 origin-left" />
            <span className="h-px w-full bg-current transition-transform duration-500 ease-soft group-hover:scale-x-110 origin-left" />
          </span>
          <span className="label">Menu</span>
        </button>

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0);
          }}
          className="font-serif text-[30px] leading-none tracking-tight md:text-[36px]"
          aria-label="kokoy, back to top"
        >
          kokoy
        </a>

        <div className="flex items-center gap-2 justify-self-end">
          <button
            type="button"
            onClick={() => openBooking("table")}
            className="label hidden min-h-11 rounded-full px-5 transition-colors duration-500 hover:bg-current/10 md:block"
          >
            Book table
          </button>
          <button
            type="button"
            onClick={() => openBooking("pool")}
            className={clsx(
              "label min-h-11 rounded-full border px-5 transition-colors duration-500",
              solid
                ? "border-ink bg-ink text-paper hover:bg-transparent hover:text-ink"
                : "border-paper/70 hover:bg-paper hover:text-ink",
            )}
          >
            Book pool
          </button>
        </div>
      </div>
    </header>
  );
}

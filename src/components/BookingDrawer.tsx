"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { SITE } from "@/lib/content";
import { useUI, type BookingKind } from "./Providers";

const soft = [0.2, 0.7, 0.1, 1] as const;

const COPY: Record<BookingKind, { title: string; slotLabel: string; slots: string[]; note: string; price: string }> = {
  pool: {
    title: "A day by the water",
    slotLabel: "Session",
    slots: ["Morning · 7–12", "Afternoon · 12–5", "Sunset · 5–7"],
    note: "Per guest · towel & one drink",
    price: "LKR [3,500]",
  },
  table: {
    title: "A table for you",
    slotLabel: "Time",
    slots: ["18:30", "19:30", "20:30", "21:30"],
    note: "No minimum spend",
    price: "Free",
  },
};

export default function BookingDrawer() {
  const { booking, openBooking, closeBooking } = useUI();
  const [slot, setSlot] = useState(0);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);

  useEffect(() => {
    if (!booking) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBooking();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booking, closeBooking]);

  const c = COPY[booking ?? "pool"];
  const activeSlot = Math.min(slot, c.slots.length - 1);
  const guests = [
    { label: "Adults", note: "Ages 13+", v: adults, set: setAdults, min: 1, max: 12 },
    { label: "Children", note: "Ages 2–12", v: kids, set: setKids, min: 0, max: 8 },
  ];

  return (
    <AnimatePresence>
      {booking && (
        <motion.div key="drawer" className="fixed inset-0 z-[80]" initial="hide" animate="show" exit="hide">
          <motion.button
            type="button"
            aria-label="Close booking"
            onClick={closeBooking}
            className="absolute inset-0 bg-night/50 backdrop-blur-[2px]"
            variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.6 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col overflow-y-auto bg-paper px-6 pb-8 text-ink md:px-10"
            variants={{ hide: { x: "100%" }, show: { x: 0 } }}
            transition={{ duration: 0.9, ease: soft }}
            data-lenis-prevent
          >
            <div className="flex h-[72px] items-center justify-between md:h-[84px]">
              <span className="label text-mute">Reserve</span>
              <button type="button" onClick={closeBooking} className="label flex min-h-11 items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
                Close
              </button>
            </div>

            <h2 id="booking-title" className="display mt-6 text-6xl md:text-7xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={booking}
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: soft }}
                >
                  {c.title}
                </motion.span>
              </AnimatePresence>
            </h2>

            <div className="mt-8 grid grid-cols-2 rounded-full border border-ink/20 p-1" role="tablist" aria-label="Booking type">
              {(["pool", "table"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={booking === k}
                  onClick={() => openBooking(k)}
                  className={clsx(
                    "label min-h-11 rounded-full transition-colors duration-500",
                    booking === k ? "bg-ink text-paper" : "text-ink hover:bg-ink/5",
                  )}
                >
                  {k === "pool" ? "Pool pass" : "Table"}
                </button>
              ))}
            </div>

            <label className="mt-8 block">
              <span className="label text-mute">Date</span>
              <input
                type="date"
                className="mt-2 block min-h-12 w-full border-b border-ink/30 bg-transparent font-serif text-2xl outline-none focus:border-ink"
              />
            </label>

            <fieldset className="mt-8">
              <legend className="label text-mute">{c.slotLabel}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.slots.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={activeSlot === i}
                    onClick={() => setSlot(i)}
                    className={clsx(
                      "min-h-11 rounded-full border px-4 text-sm transition-colors duration-300",
                      activeSlot === i ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {guests.map((g) => (
                <div key={g.label} className="flex items-center justify-between py-4">
                  <div>
                    <div className="text-base">{g.label}</div>
                    <div className="text-sm text-mute">{g.note}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label={`Fewer ${g.label.toLowerCase()}`}
                      onClick={() => g.set(Math.max(g.min, g.v - 1))}
                      className="grid size-11 place-items-center rounded-full border border-ink/25 hover:border-ink"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-serif text-2xl tabular-nums" aria-live="polite">
                      {g.v}
                    </span>
                    <button
                      type="button"
                      aria-label={`More ${g.label.toLowerCase()}`}
                      onClick={() => g.set(Math.min(g.max, g.v + 1))}
                      className="grid size-11 place-items-center rounded-full border border-ink/25 hover:border-ink"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-baseline justify-between">
              <span className="text-sm text-mute">{c.note}</span>
              <span className="font-serif text-3xl">{c.price}</span>
            </div>

            <div className="mt-auto pt-10">
              <button type="button" className="label min-h-14 w-full rounded-full bg-ink text-paper transition-opacity hover:opacity-90">
                Check availability
              </button>
              <p className="mt-4 text-center text-sm text-mute">
                Or message us on WhatsApp {SITE.whatsapp}
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

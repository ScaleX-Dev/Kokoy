"use client";

import clsx from "clsx";
import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * An endless row. Scrolling speeds it up and flips its direction,
 * so the page feels like it is moving with you. Static with reduced motion.
 */
export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  className,
  trackClassName,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.fromTo(
          "[data-track]",
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
        );
        // Start far from zero so scrolling up can run it backwards indefinitely.
        tween.totalTime(duration * 1000);

        // Speed is eased through one reusable setter, so scrolling creates no new tweens
        // (it used to spawn two per scroll event, per strip, which added up on phones).
        let dir = 1;
        const speed = { v: 1 };
        const setSpeed = gsap.quickTo(speed, "v", { duration: 0.4, ease: "power2.out", onUpdate: () => void tween.timeScale(speed.v) });
        const settle = gsap.delayedCall(0.25, () => setSpeed(dir)).pause();

        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
          onUpdate: (self) => {
            const v = self.getVelocity();
            if (Math.abs(v) > 40) dir = v > 0 ? 1 : -1;
            setSpeed(dir * (1 + Math.min(Math.abs(v) / 400, 5)));
            settle.restart(true);
          },
        });
        // Strips that start off screen stay still until they scroll into view.
        if (!st.isActive) tween.pause();
        return () => {
          st.kill();
          settle.kill();
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={clsx("overflow-hidden", className)}>
      <div data-track className={clsx("flex w-max will-change-transform", trackClassName)}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

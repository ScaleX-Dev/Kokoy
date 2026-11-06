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
        let dir = 1;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
          onUpdate: (self) => {
            const v = self.getVelocity();
            if (Math.abs(v) > 40) dir = v > 0 ? 1 : -1;
            const boost = 1 + Math.min(Math.abs(v) / 400, 5);
            gsap.to(tween, { timeScale: dir * boost, duration: 0.2, overwrite: true });
            gsap.to(tween, { timeScale: dir, duration: 1, delay: 0.25, ease: "power2.out" });
          },
        });
        return () => st.kill();
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

"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

/**
 * A muted, looping background film that starts on its own, with no play button.
 *
 * Browsers only autoplay video they can see is muted and inline before it loads, and React does
 * not write the `muted` attribute, so those flags are set on the element first and the source
 * is attached after. Play is then requested on mount, whenever the video can play, when the tab
 * becomes visible again, and if the browser still refuses (Safari in Low Power Mode, or a
 * site set to "never autoplay"), on the visitor's first scroll, tap or key press. Safari's own
 * start button is hidden in globals.css (.film) so a film never shows a play overlay.
 */
export default function Film({ src, className, poster }: { src: string; className?: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.autoplay = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    if (v.getAttribute("src") !== src) {
      v.src = src;
      v.load();
    }

    const kick = () => {
      if (v.paused && !document.hidden) v.play().catch(() => {});
    };
    const gestures = ["pointerdown", "touchstart", "keydown", "scroll", "wheel"] as const;
    const retry = () => {
      kick();
      if (!v.paused) gestures.forEach((g) => window.removeEventListener(g, retry));
    };
    kick();
    v.addEventListener("loadeddata", kick);
    v.addEventListener("canplay", kick);
    document.addEventListener("visibilitychange", kick);
    gestures.forEach((g) => window.addEventListener(g, retry, { passive: true }));
    return () => {
      v.removeEventListener("loadeddata", kick);
      v.removeEventListener("canplay", kick);
      document.removeEventListener("visibilitychange", kick);
      gestures.forEach((g) => window.removeEventListener(g, retry));
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={clsx("film", className)}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

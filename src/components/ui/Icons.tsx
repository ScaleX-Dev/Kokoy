type P = { className?: string };

export function WhatsAppIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function ArrowIcon({ className, dir = "right" }: P & { dir?: "right" | "left" | "up" | "down" | "ne" }) {
  const rot = { right: 0, down: 90, left: 180, up: -90, ne: -45 }[dir];
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ rotate: `${rot}deg` }}>
      <path d="M3 10h14M11.5 4.5 17 10l-5.5 5.5" />
    </svg>
  );
}

export function PinIcon({ className }: P) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M10 18s6-5.5 6-10A6 6 0 0 0 4 8c0 4.5 6 10 6 10Z" />
      <circle cx="10" cy="8" r="2.2" />
    </svg>
  );
}

/** Eight-point sun used as a separator in tickers and badges. */
export function Burst({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20 0l3.2 12.3L33.5 5l-6.3 11 12.8.8-11.8 4.5L38 30l-12-3.2L23 40l-3-12.5L17 40l-3-13.2L2 30l9.8-8.7L0 16.8l12.8-.8L6.5 5l10.3 7.3Z" />
    </svg>
  );
}

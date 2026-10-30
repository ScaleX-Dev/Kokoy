const WORDS = ["Swim", "Sip", "Linger", "Read", "Swim again", "Slow down"];

function Sun() {
  return (
    <svg viewBox="0 0 24 24" className="mx-[0.35em] inline-block size-[0.42em] align-middle" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v4M12 19v4M1 12h4M19 12h4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M4.2 19.8 7 17M17 7l2.8-2.8" />
    </svg>
  );
}

export default function Marquee() {
  const row = (
    <span className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={w} className={i % 2 ? "italic" : undefined}>
          {w}
          <Sun />
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden border-y border-ink/10 py-6 md:py-8" aria-hidden="true">
      <div className="marquee-track display flex w-max text-[14vw] leading-none md:text-[7vw]">
        {row}
        {row}
      </div>
    </div>
  );
}

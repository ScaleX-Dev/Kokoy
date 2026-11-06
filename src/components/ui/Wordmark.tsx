import clsx from "clsx";

// Typographic stand-in for the owner's logo. When the refined logo arrives,
// swap this component for the SVG; everything else picks it up.
export default function Wordmark({ className, sub = true, mono = false }: { className?: string; sub?: boolean; mono?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2 leading-none", className)}>
      <span className={clsx("inline-block size-[0.9em] shrink-0 rounded-full", mono ? "bg-current" : "sun")} aria-hidden="true" />
      <span className="font-display text-[1em] font-extrabold tracking-[-0.02em]">KOKOY</span>
      {sub && <span className="hidden font-sans text-[0.42em] font-semibold tracking-[0.2em] uppercase opacity-80 sm:inline">Pool club</span>}
    </span>
  );
}

import clsx from "clsx";
import { useId, type ReactNode } from "react";

/** A circular sticker with text running around its edge. Decorative. */
export default function SpinBadge({
  text,
  className,
  children,
  speed = 18,
}: {
  text: string;
  className?: string;
  children?: ReactNode;
  speed?: number;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={clsx("relative grid aspect-square place-items-center rounded-full", className)} aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full"
        style={{ animation: `kk-spin ${speed}s linear infinite` }}
      >
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-display text-[17px] font-bold tracking-[0.12em]">
          <textPath href={`#${id}`} textLength="488" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

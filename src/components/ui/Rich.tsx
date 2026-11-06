import { Fragment } from "react";

/** Renders `*word*` as a highlighted span. Used for single-accent headlines. */
export default function Rich({ text, className = "text-coral" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className={className}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

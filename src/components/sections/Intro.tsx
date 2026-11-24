"use client";

import { useUI } from "../Providers";

export default function Intro() {
  const { t } = useUI();
  // The copy marks emphasis with *asterisks*; here it is just plain text.
  const statement = t.intro.statement.replace(/\*/g, "");

  return (
    <section id="about" className="pad section-y bg-cream">
      {/* One centred statement: who KOKOY is, in a single line of thought. */}
      <h2 className="mx-auto max-w-[26ch] text-center font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-balance">
        {statement}
      </h2>
    </section>
  );
}

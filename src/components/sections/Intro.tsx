"use client";

import { useUI } from "../Providers";

export default function Intro() {
  const { t } = useUI();
  // The copy marks emphasis with *asterisks*; here it is just plain text.
  const statement = t.intro.statement.replace(/\*/g, "");

  return (
    <section id="about" className="pad section-y bg-cream">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <h2 className="max-w-[26ch] font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.2] font-semibold tracking-[-0.02em] md:col-span-7">
          {statement}
        </h2>
        <p className="max-w-[44ch] text-lg leading-relaxed text-charcoal/70 md:col-span-4 md:col-start-9 md:pt-2">
          {t.intro.body}
        </p>
      </div>
    </section>
  );
}

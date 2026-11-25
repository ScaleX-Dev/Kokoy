// The 404 page for any address that matches no page (e.g. /en/old-link). The root layout lives under
// [lang], so this page brings its own <html>, styles and fonts. It is bilingual because the visitor's
// language is not known here.
import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LogoMark, LogoWord } from "@/components/ui/Wordmark";

const display = Unbounded({ variable: "--font-unbounded", subsets: ["latin", "cyrillic"], display: "swap" });
const sans = Onest({ variable: "--font-onest", subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  title: "Page not found · KOKOY Pool Club",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-charcoal text-cream">
        <main className="pad flex min-h-[100svh] flex-col items-center justify-center gap-8 text-center">
          <p role="img" aria-label="KOKOY" className="flex items-center gap-[0.2em] text-[clamp(2.5rem,9vw,5rem)] leading-none text-cream/90">
            <LogoMark className="h-[1.15em]" />
            <LogoWord className="h-[0.78em]" />
          </p>
          <div className="space-y-3">
            <h1 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em]">This page has gone for a swim.</h1>
            <p className="text-cream/70" lang="ru">
              Эта страница ушла поплавать.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-3">
            <Link href="/en" className="inline-flex min-h-12 items-center rounded-full bg-coral px-7 font-semibold text-charcoal transition-colors duration-300 hover:bg-orange">
              Back to KOKOY
            </Link>
            <Link href="/ru" lang="ru" className="inline-flex min-h-12 items-center rounded-full border-2 border-cream/30 px-7 font-semibold transition-colors duration-300 hover:border-coral hover:text-coral">
              На главную
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}

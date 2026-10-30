"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    return `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 70}`;
  }
  return src;
}

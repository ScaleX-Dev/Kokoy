// Language-neutral content: imagery, contact details and links.
// Anything marked TODO(confirm) is a placeholder listed under "Items to confirm"
// in the brand foundation, and must be replaced before launch.

const p = (n: number) => `/photos/kokoy-${n}.webp`;

// Photography from the KOKOY shoot (Drive: KOKOY POOL CLUB / PHOTOS, PHOTOS-2, PHOTOS-03), named by
// the camera's frame number (LKJ_<n>.NEF). The keys are slots the sections ask for; what each one
// shows is described by its alt text in the dictionaries.
export const IMG = {
  // Pool & property
  hero: p(5094),
  poolSunset: p(5091),
  poolLounger: p(5094),
  poolTropic: p(5087),
  poolVilla: p(5096),
  poolDeck: p(5095),
  poolInfinity: p(4727),
  underwater: p(4487),
  sandLegs: p(4489),
  // Sunlit pool water from straight above. Generated (procedural caustics in the KOKOY turquoise),
  // not shot: the shoot has no clean water-surface frame.
  poolWater: "/photos/kokoy-pool-water.webp",
  // Food
  brunchSpread: p(4618),
  pancakes: p(4653),
  eggsToast: p(4608),
  brunchPlate: p(4703),
  fruitBowl: p(4685),
  frenchToast: p(4669),
  longTable: p(4566),
  coffee: p(5117),
  // Drinks & bar
  pinkDrink: p(4545),
  spritz: p(4527),
  amber: p(4505),
  lemonade: p(5133),
  barPrep: p(4511),
  cheers: p(4565),
  trio: p(4522),
  // Evenings & guests
  dj: p(4740),
  lights: p(4757),
  crowdSunset: p(4755),
  confetti: p(4578),
  toast: p(4629),
  friendsSunset: p(4555),
  friends: p(4589),
  beachSunset: p(5173),
  // Daytime dish and drink shoot (Drive "New folder", DSC_ frames, 5 and 7 Nov 2026), cropped to the dish.
  benedict: "/photos/kokoy-dsc-0181-benedict.webp",
  blissBowl: "/photos/kokoy-dsc-0211-bliss-bowl.webp",
  chickenDeluxe: "/photos/kokoy-dsc-0352-chicken-deluxe.webp",
  fishChips: "/photos/kokoy-dsc-0377-fish-chips.webp",
  flameChicken: "/photos/kokoy-dsc-0390-flame-chicken.webp",
  croquettes: "/photos/kokoy-dsc-0296-croquettes.webp",
  amberGlow: "/photos/kokoy-dsc-0667-amber-glow.webp",
  islandEspresso: "/photos/kokoy-dsc-0775-island-espresso.webp",
  pineappleHellfire: "/photos/kokoy-dsc-0791-pineapple-hellfire.webp",
  monsoonMelon: "/photos/kokoy-dsc-0424-monsoon-melon.webp",
} as const;

export type ImgKey = keyof typeof IMG;

export const SITE = {
  name: "KOKOY",
  // The live address, used for canonical links, hreflang, the sitemap, social previews and the
  // structured data, so it must be the real domain. Set NEXT_PUBLIC_SITE_URL (e.g.
  // "https://kokoy.lk") in the host's environment; on Vercel the production domain is picked up on
  // its own. Localhost is only a fallback for local development.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  // Opening hours in schema.org form, for search engines (the visible hours are in the dictionaries).
  opens: "10:00",
  closes: "21:00",
  // KOKOY's WhatsApp, +94 74 363 0607: digits only with the country code, as wa.me links need. Every
  // WhatsApp button opens a chat with this number, and it is the phone number in the structured data.
  whatsapp: "94743630607",
  // The same number as shown to visitors (tap to call).
  phone: "+94 74 363 0607",
  // TODO(confirm): official email. Empty hides it everywhere: the old placeholder (hello@kokoy.lk)
  // is on a domain that does not exist, so mail to it would bounce.
  email: "",
  // TODO(confirm): exact Google Maps place link.
  // TODO(confirm): exact place links once KOKOY is listed on Google Maps and Yandex Maps.
  // Russian visitors mostly use Yandex, so they are offered it first (see mapApps).
  maps: {
    google: "https://www.google.com/maps/search/?api=1&query=Unawatuna%2C%20Sri%20Lanka",
    yandex: "https://yandex.com/maps/?text=Unawatuna%2C%20Sri%20Lanka",
  },
  // The hero film: the KOKOY reel (pool, bar, cocktails, kitchen, the menu, the logo wall, guests),
  // full-bleed on every screen. Every file is cut from the 1080p/60fps master KOKOY_WEB_VID1 at half
  // speed: its 12s of quick cuts become a 24s loop of smooth slow motion, each real 60fps frame shown
  // once at 30fps. "wide" (1920x1080) plays on landscape screens, `src` on portrait ones: a 608x1080
  // window of the master (no upscaling) reframed shot by shot onto each subject, the way a vertical
  // edit is cut, and following subjects that drift or zoom within a shot. It jumps on hard cuts and
  // glides through dissolves. The master and the framing keyframes (hero-portrait-keys.py) live
  // outside the repo, in ~/Documents/KOKOY-media. Each comes as HEVC, near the master's quality at under
  // half the size, for browsers that play it, and as H.264 (same quality, larger) for the rest.
  // The poster is the master's first frame.
  heroVideo: {
    src: "/video/kokoy-hero.mp4",
    srcHevc: "/video/kokoy-hero-hevc.mp4",
    wide: "/video/kokoy-hero-wide.mp4",
    wideHevc: "/video/kokoy-hero-wide-hevc.mp4",
    poster: "/video/kokoy-hero-poster.jpg",
  },
  // The polaroid in "Pool side paradise": a guest at the pool edge, snacking and laughing. A 5.8s
  // 4:5 loop from the same shoot, its end crossfaded into its start so it never jumps. It plays from
  // its first frame (also the poster) once scrolled into view.
  vibeVideo: { src: "/video/pool-girl.mp4", poster: "/video/pool-girl.jpg" },
  instagram: { handle: "@kokoy.unawatuna", url: "https://www.instagram.com/kokoy.unawatuna" },
  social: [
    { label: "Instagram", url: "https://www.instagram.com/kokoy.unawatuna" },
    { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61596286547699" },
  ],
} as const;

export type MapApp = keyof typeof SITE.maps;

/** Map apps in the order this visitor is most likely to use them. */
export function mapApps(lang: string): MapApp[] {
  return lang === "ru" ? ["yandex", "google"] : ["google", "yandex"];
}

export function waLink(message: string) {
  const text = encodeURIComponent(message);
  return SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

// The dishes and drinks the home page features, named exactly as on the menu (src/lib/menu.ts).
// Their names, descriptions and ingredients are read from the menu, never written here, so the
// home page can't drift from it (see src/lib/featured.ts). Each is paired with its own photo.
export const FEATURED_FOOD: { name: string; img: ImgKey }[] = [
  { name: "Classic Royale Benedict", img: "benedict" },
  { name: "Tropical Bliss Bowl", img: "blissBowl" },
  { name: "Crispy Chicken Deluxe", img: "chickenDeluxe" },
  { name: "Beer-Battered Fish & Chips", img: "fishChips" },
  { name: "Coastal Flame Chicken", img: "flameChicken" },
  { name: "Cheese & potato croquettes, sriracha mayo", img: "croquettes" },
];

// The four signature cocktails; each drives the colour of the section while it is picked.
// TODO(confirm): the Monsoon Melon photo (watermelon, rosemary) could also be the Watermelon Heatwave mocktail.
export const FEATURED_DRINKS: { name: string; img: ImgKey; color: string }[] = [
  { name: "Monsoon Melon", img: "monsoonMelon", color: "#FF4F91" },
  { name: "Pineapple Hellfire", img: "pineappleHellfire", color: "#FF9D38" },
  { name: "The Amber Glow", img: "amberGlow", color: "#FF654F" },
  { name: "Island Espresso", img: "islandEspresso", color: "#FFF1D9" },
];
export const DAY_IMG: ImgKey[] = ["poolLounger", "brunchSpread", "poolSunset", "lights"];
export const DAY_SKY = [
  { bg: "#FFF1D9", fg: "#25232B" },
  { bg: "#FF9D38", fg: "#25232B" },
  { bg: "#FF654F", fg: "#25232B" },
  { bg: "#25232B", fg: "#FFF1D9" },
] as const;
export const EVENT_IMG: ImgKey[] = ["dj", "confetti", "longTable", "lights"];

// Image keys plus a shape index (see Gallery). Alt text lives in the dictionaries.
export const GALLERY_ROWS: { src: ImgKey; shape: number }[][] = [
  [
    { src: "friendsSunset", shape: 0 },
    { src: "pinkDrink", shape: 1 },
    { src: "poolTropic", shape: 2 },
    { src: "toast", shape: 3 },
    { src: "underwater", shape: 0 },
    { src: "pancakes", shape: 1 },
  ],
  [
    { src: "lights", shape: 3 },
    { src: "poolLounger", shape: 2 },
    { src: "cheers", shape: 0 },
    { src: "sandLegs", shape: 1 },
    { src: "brunchSpread", shape: 2 },
    { src: "beachSunset", shape: 3 },
  ],
];

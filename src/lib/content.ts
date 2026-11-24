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
} as const;

export type ImgKey = keyof typeof IMG;

export const SITE = {
  name: "KOKOY",
  // TODO(confirm): production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO(confirm): official WhatsApp number, digits only with country code (e.g. "9477…").
  // Left empty on purpose so no visitor messages a wrong number. While empty,
  // WhatsApp opens its contact picker with the message pre-filled.
  whatsapp: "",
  // TODO(confirm): official email.
  email: "hello@kokoy.lk",
  // TODO(confirm): exact Google Maps place link.
  // TODO(confirm): exact place links once KOKOY is listed on Google Maps and Yandex Maps.
  // Russian visitors mostly use Yandex, so they are offered it first (see mapApps).
  maps: {
    google: "https://www.google.com/maps/search/?api=1&query=Unawatuna%2C%20Sri%20Lanka",
    yandex: "https://yandex.com/maps/?text=Unawatuna%2C%20Sri%20Lanka",
  },
  // The hero film: a 32s graded loop cut from the shoot (pool, bar, kitchen, food, guests, drone),
  // full-bleed on every screen. It is cut twice from the same edit: a 16:9 version for landscape
  // screens ("wide", 1080p) and a 9:16 one for portrait screens (720x1280), each framed per shot.
  heroVideo: { src: "/video/hero.mp4", wide: "/video/hero-wide.mp4", poster: "/video/hero-poster.jpg" },
  // The polaroid in "Pool side paradise": a guest at the pool edge, snacking and laughing. A 5.8s
  // 4:5 loop from the same shoot and grade, its end crossfaded into its start so it never jumps.
  vibeVideo: { src: "/video/pool-girl.mp4", poster: "/video/pool-girl.jpg" },
  // TODO(confirm): social handles and links.
  instagram: { handle: "@kokoy.poolclub", url: "https://www.instagram.com/" },
  social: [
    { label: "Instagram", url: "https://www.instagram.com/" },
    { label: "TikTok", url: "https://www.tiktok.com/" },
    { label: "TripAdvisor", url: "https://www.tripadvisor.com/" },
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

// The four signature drinks drive the colour of their section.
export const DRINK_STYLE: { color: string; img: ImgKey }[] = [
  { color: "#FF4F91", img: "pinkDrink" },
  { color: "#FF9D38", img: "spritz" },
  { color: "#FF654F", img: "amber" },
  { color: "#FFF1D9", img: "lemonade" },
];

export const BRUNCH_IMG: ImgKey[] = ["pancakes", "eggsToast", "brunchSpread", "fruitBowl", "frenchToast", "brunchPlate"];
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

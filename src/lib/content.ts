// Language-neutral content: imagery, contact details and links.
// Anything marked TODO(confirm) is a placeholder listed under "Items to confirm"
// in the brand foundation, and must be replaced before launch.

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

// Placeholder photography until the KOKOY shoot is delivered.
export const IMG = {
  // Pool & property
  hero: u("1563911302283-d2bc129e7570"),
  poolSunset: u("1600011689032-8b628b8a8747"),
  poolLounger: u("1586611292717-f828b167408c"),
  poolTropic: u("1617859047452-8510bcf207fd"),
  poolVilla: u("1582610116397-edb318620f90"),
  poolDeck: u("1572331165267-854da2b10ccc"),
  poolInfinity: u("1584132967334-10e028bd69f7"),
  underwater: u("1528495612343-9ca9f4a4de28"),
  sandLegs: u("1591017403286-fd8493524e1e"),
  // Food & brunch
  brunchSpread: u("1504754524776-8f4f37790ca0"),
  pancakes: u("1567620905732-2d1ec7ab7445"),
  eggsToast: u("1525351484163-7529414344d8"),
  brunchPlate: u("1495214783159-3503fd1b572d"),
  fruitBowl: u("1490474418585-ba9bad8fd0ea"),
  frenchToast: u("1484723091739-30a097e8f929"),
  longTable: u("1528605248644-14dd04022da1"),
  coffee: u("1509042239860-f550ce710b93"),
  // Drinks
  pinkDrink: u("1609951651556-5334e2706168"),
  spritz: u("1560512823-829485b8bf24"),
  amber: u("1514362545857-3bc16c4c7d1b"),
  lemonade: u("1621263764928-df1444c5e859"),
  barPrep: u("1609345265499-2133bbeb6ce5"),
  cheers: u("1541532713592-79a0317b6b77"),
  trio: u("1551024709-8f23befc6f87"),
  // Events & lifestyle
  dj: u("1470225620780-dba8ba36b745"),
  lights: u("1517457373958-b7bdd4587205"),
  crowdSunset: u("1524368535928-5b5e00ddc76b"),
  confetti: u("1492684223066-81342ee5ff30"),
  toast: u("1527529482837-4698179dc6ce"),
  friendsSunset: u("1506869640319-fe1a24fd76dc"),
  friends: u("1529156069898-49953e39b3ac"),
  beachSunset: u("1507525428034-b723cf961d3e"),
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
  // TODO(confirm): drop the hero film (16:9, muted loop) in /public/video and set the path, e.g. "/video/hero.mp4".
  heroVideo: "",
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

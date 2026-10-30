// All copy and imagery lives here so real details can be dropped in later.
// Square-bracketed values are placeholders waiting for real info.

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const IMG = {
  hero: u("1563911302283-d2bc129e7570"),
  infinity: u("1584132967334-10e028bd69f7"),
  deck: u("1582719508461-905c673771fd"),
  balcony: u("1615880484746-a134be9a6ecf"),
  resortPool: u("1520250497591-112f2f40a3f4"),
  palmPool: u("1600011689032-8b628b8a8747"),
  cabana: u("1571003123894-1f0594d2b5d9"),
  courtyard: u("1535827841776-24afc1e255ac"),
  lagoon: u("1552733407-5d5c46c3bb3b"),
  edgePool: u("1571896349842-33c89424de2d"),
  woodPool: u("1566073771259-6a8506099945"),
  terraces: u("1559628233-100c798642d4"),
  jungle: u("1555400038-63f5ba517a47"),
  temple: u("1537996194471-e657df975ab4"),
  palms: u("1506953823976-52e1fdc0149a"),
  beach: u("1519046904884-53103b34b206"),
  aerial: u("1578922746465-3a80a228f223"),
  coffee: u("1509042239860-f550ce710b93"),
  coffeeCheers: u("1495474472287-4d71bcdd2085"),
  bowl: u("1546069901-ba9599a7e63c"),
  cocktail: u("1514362545857-3bc16c4c7d1b"),
  cocktails: u("1551024709-8f23befc6f87"),
} as const;

export const SITE = {
  name: "kokoy",
  tagline: "A courtyard of water & straw",
  place: "[Town], Sri Lanka",
  address: ["[Street address]", "[Town], Sri Lanka"],
  hours: [
    ["Pool", "[7:00 – 19:00]"],
    ["Café & bar", "[8:00 – 23:00]"],
  ],
  whatsapp: "[+94 …]",
  email: "hello@[kokoy].lk",
  owner: "[Owner name]",
};

export const NAV = [
  { label: "Our story", href: "#story", img: IMG.balcony },
  { label: "The spaces", href: "#spaces", img: IMG.resortPool },
  { label: "A day here", href: "#day", img: IMG.deck },
  { label: "Café & bar", href: "#menu", img: IMG.cocktails },
  { label: "Gallery", href: "#gallery", img: IMG.lagoon },
  { label: "Getting here", href: "#visit", img: IMG.courtyard },
];

export const STORY_TEXT =
  "It began with an empty plot, a stair that went nowhere, and the idea of a pool you could hear before you could see it.";

export const DETAILS = [
  { title: "The stair wall", body: "The old stair wall. We kept it, softened its edges and painted it the colour of milk." },
  { title: "Breeze blocks", body: "Terracotta breeze blocks, laid one by one to let the air through." },
  { title: "The straw ceiling", body: "A ceiling of dried straw, tied by hand in small bundles." },
];

export const SPACES = [
  { n: "01", name: "The pool", line: "One long, lit pool under a ceiling of woven straw.", src: IMG.resortPool, shape: "rect", w: "w-[78vw] md:w-[44vw]", h: "h-[52vh] md:h-[62vh]" },
  { n: "02", name: "The arches", line: "A lantern-lit walk from the street to the water.", src: IMG.courtyard, shape: "arch", w: "w-[64vw] md:w-[26vw]", h: "h-[52vh] md:h-[56vh]" },
  { n: "03", name: "The bar", line: "Coffee by day, slow drinks at night.", src: IMG.cabana, shape: "rect", w: "w-[74vw] md:w-[34vw]", h: "h-[44vh] md:h-[46vh]" },
  { n: "04", name: "The shower", line: "Rain from above, inside a tiled arch.", src: IMG.lagoon, shape: "arch", w: "w-[60vw] md:w-[22vw]", h: "h-[54vh] md:h-[62vh]" },
  { n: "05", name: "The façade", line: "Arched windows above a quiet street.", src: IMG.woodPool, shape: "bowl", w: "w-[66vw] md:w-[26vw]", h: "h-[48vh] md:h-[52vh]" },
  { n: "06", name: "The edge", line: "A soft curve of stone to sit on, feet in the water.", src: IMG.edgePool, shape: "rect", w: "w-[78vw] md:w-[36vw]", h: "h-[52vh] md:h-[60vh]" },
] as const;

export const MOMENTS = [
  { time: "07:00", title: "First light swim", body: "The water is still, the courtyard empty. Slow lengths before the day begins.", src: IMG.infinity, bg: "#F3EEE4", fg: "#23241F" },
  { time: "10:30", title: "Coffee under the arches", body: "Iced coconut lattes, a book, a long table in the shade.", src: IMG.coffee, bg: "#ECE2CF", fg: "#23241F" },
  { time: "16:00", title: "A long, lazy afternoon", body: "Swim, dry off on the rattan chairs, swim again. No one is in a hurry.", src: IMG.deck, bg: "#C9A27E", fg: "#1F1D18" },
  { time: "19:30", title: "Lanterns on", body: "The straw ceiling glows, the bar opens, the water turns to glass.", src: IMG.cabana, bg: "#1B1C17", fg: "#F3EEE4" },
];

export const MENUS = {
  morning: {
    label: "Morning",
    cap: "Served 8:00 – 12:00",
    img: IMG.coffeeCheers,
    alt: "Three flat whites raised together",
    items: [
      { name: "Iced coconut latte", desc: "Espresso, young coconut, palm sugar", price: "LKR 1,250" },
      { name: "Ceylon cold brew", desc: "Eighteen-hour steep, orange peel", price: "LKR 1,100" },
      { name: "Smashed avocado toast", desc: "Sourdough, chilli oil, lime", price: "LKR 1,900" },
      { name: "Mango & kithul bowl", desc: "Yoghurt, granola, kithul treacle", price: "LKR 1,700" },
    ],
  },
  day: {
    label: "Day",
    cap: "Served poolside, 12:00 – 18:00",
    img: IMG.bowl,
    alt: "A bright poke bowl from above",
    items: [
      { name: "King coconut", desc: "In the shell, very cold", price: "LKR 600" },
      { name: "Hopper tacos", desc: "Crisp hoppers, devilled prawns, pol sambol", price: "LKR 2,600" },
      { name: "Butterfly-pea lemonade", desc: "Lime, mint, soda", price: "LKR 950" },
      { name: "Green papaya salad", desc: "Peanut, chilli, lime leaf", price: "LKR 1,800" },
    ],
  },
  evening: {
    label: "Evening",
    cap: "Bar open 18:00 – 23:00",
    img: IMG.cocktail,
    alt: "An amber cocktail on a dark bar",
    items: [
      { name: "Arrack sour", desc: "Coconut arrack, tamarind, egg white", price: "LKR 2,200" },
      { name: "Lemongrass spritz", desc: "Passionfruit, lemongrass, soda", price: "LKR 1,400" },
      { name: "Grilled seer fish", desc: "Curry leaf butter, charred lime", price: "LKR 3,400" },
      { name: "Watalappan", desc: "Jaggery custard, cashew crumb", price: "LKR 1,200" },
    ],
  },
} as const;

export type MenuKey = keyof typeof MENUS;

export const GALLERY = [
  { src: IMG.aerial, alt: "A small boat on clear turquoise water", h: "aspect-[4/5]" },
  { src: IMG.temple, alt: "Lake temple at dawn", h: "aspect-[3/4]", arch: true },
  { src: IMG.palmPool, alt: "Pool lined with palms at sunset", h: "aspect-[4/5]" },
  { src: IMG.beach, alt: "Palm leaning over a white beach", h: "aspect-square" },
  { src: IMG.jungle, alt: "Rice terraces cut into the jungle", h: "aspect-[4/5]" },
  { src: IMG.cocktails, alt: "Three tropical cocktails on the bar", h: "aspect-[3/4]", arch: true },
  { src: IMG.infinity, alt: "Infinity pool deck under the trees", h: "aspect-[3/4]", arch: true },
  { src: IMG.palms, alt: "Palm fronds against a soft sky", h: "aspect-[4/5]" },
  { src: IMG.edgePool, alt: "A pool lit blue at dusk", h: "aspect-square" },
];

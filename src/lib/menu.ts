// The KOKOY drinks menu, from "KOKOY MENU" (the printed menu, Russian edition).
// Russian is as printed, with obvious typos fixed; English is translated from it.
// Prices are in Sri Lankan rupees; a 10% service charge is added on the bill.

import type { ImgKey } from "./content";

type L = { en: string; ru: string };

export type MenuItem = {
  name: L;
  /** Ingredients, shown separated by dots. */
  spec?: { en: string[]; ru: string[] };
  desc?: L;
  price: number;
};

export type MenuSection = {
  id: string;
  title: L;
  /** "feature": full entries with ingredients and a description. "list": name and price only. */
  style: "feature" | "list";
  /** Feature sections only. */
  tone?: "dark" | "light" | "sand";
  img?: ImgKey;
  items: MenuItem[];
};

const n = (en: string, ru: string): L => ({ en, ru });
const sp = (en: string[], ru: string[]) => ({ en, ru });

export const MENU: MenuSection[] = [
  {
    id: "signature",
    title: n("Signature cocktails", "Фирменные коктейли"),
    style: "feature",
    tone: "dark",
    img: "spritz",
    items: [
      {
        name: n("Amber Glow", "Янтарное сияние"),
        spec: sp(["Cinnamon-infused arrack", "house spiced syrup", "lime"], ["Аррак, настоянный на корице", "фирменный пряный сироп", "лайм"]),
        desc: n(
          "Sri Lankan spice. Golden hour in a glass: aged island arrack meets warm local spices and a bright twist of citrus.",
          "Шри-ланкийские специи. Золотой час в бокале: выдержанный островной аррак встречается с тёплыми местными специями и яркой цитрусовой ноткой.",
        ),
        price: 1900,
      },
      {
        name: n("Island Espresso", "Островной эспрессо"),
        spec: sp(["Coconut-infused vodka", "espresso", "coconut liqueur"], ["Водка, настоянная на кокосе", "эспрессо", "кокосовый ликёр"]),
        desc: n(
          "Rich espresso softened by the sunny taste of coconut. The perfect drink for a midnight beach hang.",
          "Насыщенный эспрессо смягчён солнечным вкусом кокоса. Идеальный напиток для полуночного отдыха на пляже.",
        ),
        price: 2100,
      },
      {
        name: n("Monsoon Melon", "Муссонная дыня"),
        spec: sp(["Gin", "watermelon", "rosemary", "lime", "chilli flakes"], ["Джин", "арбуз", "розмарин", "лайм", "хлопья чили"]),
        desc: n(
          "Refreshing. Sweet iced watermelon meets an aromatic, herbal gin and a slowly building heat.",
          "Освежающий. Сладкий ледяной арбуз сочетается с ароматным травяным джином и медленно раскрывающейся остротой.",
        ),
        price: 2300,
      },
      {
        name: n("Pineapple Inferno", "Ананасовый ад"),
        spec: sp(["White rum", "spiced pineapple", "house chilli syrup", "lime"], ["Белый ром", "пряный ананас", "фирменный сироп чили", "лайм"]),
        desc: n(
          "Spicy. Tropical thunder: roasted island pineapple on the fine line between sweet and fire.",
          "Острый. Тропический гром: поджаренный островной ананас на тонкой грани сладости и огня.",
        ),
        price: 2200,
      },
      {
        name: n("KOKOY Nut", "Ореховый коктейль KOKOY"),
        spec: sp(["House peanut butter", "gin", "coconut milk", "lime"], ["Домашняя арахисовая паста", "джин", "кокосовое молоко", "лайм"]),
        desc: n(
          "Silky, savoury and wonderfully rich: an unexpected take on tropical creaminess.",
          "Шёлковистый, пикантный и невероятно насыщенный вкус — необычная интерпретация тропической сливочности.",
        ),
        price: 2300,
      },
      {
        name: n("Coriander Fiesta", "Кориандровая фиеста"),
        desc: n(
          "Agave lifted with muddled fresh coriander and bright tropical citrus.",
          "Агава дополняется растёртым свежим кориандром и яркими тропическими цитрусовыми нотами.",
        ),
        price: 2400,
      },
    ],
  },
  {
    id: "classics",
    title: n("Classic cocktails", "Классические коктейли"),
    style: "feature",
    tone: "light",
    img: "amber",
    items: [
      { name: n("Margarita", "Маргарита"), spec: sp(["Tequila", "triple sec", "lime", "sugar"], ["Текила", "трипл-сек", "лайм", "сахар"]), price: 2650 },
      {
        name: n("Long Island Iced Tea", "Лонг-айленд айс-ти"),
        spec: sp(["Rum", "gin", "tequila", "vodka", "triple sec", "Coca-Cola"], ["Ром", "джин", "текила", "водка", "трипл-сек", "Coca-Cola"]),
        price: 3800,
      },
      { name: n("Whisky Sour", "Виски сауэр"), spec: sp(["Bourbon", "sweet and sour", "egg white"], ["Бурбон", "кисло-сладкая смесь", "яичный белок"]), price: 2450 },
      { name: n("Classic Mojito", "Классический мохито"), spec: sp(["Rum", "lime", "sugar", "soda"], ["Ром", "лайм", "сахар", "содовая"]), price: 2300 },
      { name: n("Gin & Tonic", "Джин-тоник"), price: 2300 },
    ],
  },
  {
    id: "zero",
    title: n("Zero-proof", "Безалкогольные коктейли"),
    style: "feature",
    tone: "sand",
    img: "lemonade",
    items: [
      {
        name: n("Ginger Forest", "Имбирный лес"),
        spec: sp(["Rosemary", "ginger", "lime", "soda"], ["Розмарин", "имбирь", "лайм", "содовая"]),
        desc: n(
          "Woodland herbs meet fiery ginger root. Deep, aromatic and elegantly dry.",
          "Лесные травы встречаются с жгучим корнем имбиря. Глубокий, ароматный и изысканно сухой вкус.",
        ),
        price: 1400,
      },
      {
        name: n("Watermelon Heat", "Арбузная жара"),
        spec: sp(["Watermelon", "rosemary", "ginger", "lime", "soda", "coconut water"], ["Арбуз", "розмарин", "имбирь", "лайм", "содовая", "кокосовая вода"]),
        desc: n(
          "Refreshing coconut water and juicy watermelon, lifted with herbs and a kick of ginger.",
          "Освежающая кокосовая вода и сочный арбуз дополнены травяным ароматом и пряностью имбиря.",
        ),
        price: 1500,
      },
      {
        name: n("Citrus Spritz", "Цитрусовый спритц"),
        spec: sp(["Calamondin (local narang)", "curry leaves", "citrus blend", "soda"], ["Каламондин (местный наранг)", "листья карри", "смесь цитрусовых", "содовая"]),
        desc: n(
          "Local narang citrus meets fragrant curry leaves. Bright, sparkling and a little earthy.",
          "Местный цитрус наранг сочетается с ароматными листьями карри. Яркий, игристый и с земляными нотками.",
        ),
        price: 1450,
      },
      {
        name: n("Lime & Mint", "Лайм и мята"),
        spec: sp(["Lime", "fresh mint", "cane sugar", "soda"], ["Лайм", "свежая мята", "тростниковый сахар", "содовая"]),
        desc: n(
          "A true coastal classic: fresh mint muddled by hand with unrefined cane sugar and sparkling water.",
          "Настоящая прибрежная классика: свежая мята, растёртая вручную с нерафинированным тростниковым сахаром и газированной водой.",
        ),
        price: 1350,
      },
    ],
  },
  {
    id: "smoothies",
    title: n("Smoothies", "Смузи"),
    style: "feature",
    tone: "light",
    items: [
      {
        name: n("Tropical Cream", "Тропический сливочный смузи"),
        spec: sp(["Avocado", "banana", "fresh milk", "yoghurt", "natural honey"], ["Авокадо", "банан", "свежее молоко", "йогурт", "натуральный мёд"]),
        desc: n(
          "Creamy local avocado blended with sweet banana and island honey. Velvety in every sip.",
          "Нежный местный авокадо взбивается со сладким бананом и островным мёдом. Бархатистый вкус в каждом глотке.",
        ),
        price: 1550,
      },
      {
        name: n("Mango Smoothie", "Манговый смузи"),
        spec: sp(["Fresh island mango", "banana", "yoghurt", "milk", "honey"], ["Свежий островной манго", "банан", "йогурт", "молоко", "мёд"]),
        desc: n(
          "Ripe tropical mango blended with cool yoghurt and a light touch of local honey.",
          "Спелый тропический манго смешивается с прохладным йогуртом и лёгкой ноткой местного мёда.",
        ),
        price: 1450,
      },
      {
        name: n("Oreo Smoothie", "Смузи Oreo"),
        spec: sp(["Crushed Oreo", "banana", "creamy milk", "honey"], ["Крошка Oreo", "банан", "сливочное молоко", "мёд"]),
        desc: n(
          "Crunchy chocolate meets sweet island banana. Thick, cold and properly indulgent.",
          "Хрустящий шоколадный вкус сочетается со сладким островным бананом. Густой, прохладный и по-настоящему насыщенный.",
        ),
        price: 1400,
      },
      {
        name: n("Papaya Smoothie", "Смузи из папайи"),
        spec: sp(["Fresh papaya", "yoghurt", "milk", "honey"], ["Свежая папайя", "йогурт", "молоко", "мёд"]),
        desc: n(
          "Juicy red papaya balanced by tangy house yoghurt. Light, refreshing and full of sunshine.",
          "Сочная красная папайя сбалансирована пикантным домашним йогуртом. Лёгкий, освежающий напиток с солнечным настроением.",
        ),
        price: 1350,
      },
    ],
  },
  {
    id: "juice",
    title: n("Fresh juice", "Соки"),
    style: "list",
    items: [
      { name: n("Passion fruit", "Маракуйя"), price: 1000 },
      { name: n("Mango & passion fruit", "Манго и маракуйя"), price: 1000 },
      { name: n("Pineapple", "Ананас"), price: 900 },
      { name: n("Watermelon", "Арбуз"), price: 800 },
      { name: n("Mango", "Манго"), price: 1000 },
    ],
  },
  {
    id: "coffee",
    title: n("Coffee", "Кофе"),
    style: "list",
    items: [
      { name: n("Espresso", "Эспрессо"), price: 600 },
      { name: n("Cappuccino", "Капучино"), price: 900 },
      { name: n("Latte", "Латте"), price: 950 },
      { name: n("Americano", "Американо"), price: 700 },
      { name: n("Flat white", "Флэт уайт"), price: 1000 },
      { name: n("Honey cinnamon latte", "Латте с мёдом и корицей"), price: 1250 },
      { name: n("Caramel latte", "Карамельный латте"), price: 1250 },
      { name: n("Hot chocolate", "Горячий шоколад"), price: 1100 },
      { name: n("Iced latte", "Айс-латте"), price: 950 },
      { name: n("Iced chocolate", "Холодный шоколад"), price: 1100 },
    ],
  },
  {
    id: "tea",
    title: n("Tea", "Чай"),
    style: "list",
    items: [
      { name: n("Black tea", "Чёрный чай"), price: 700 },
      { name: n("Green tea", "Зелёный чай"), price: 800 },
      { name: n("Iced tea", "Холодный чай"), price: 800 },
    ],
  },
  {
    id: "shorts",
    title: n("Local shorts", "Крепкие напитки"),
    style: "list",
    items: [
      { name: n("Arrack", "Аррак"), price: 1200 },
      { name: n("Gin", "Джин"), price: 1200 },
      { name: n("Vodka", "Водка"), price: 1200 },
      { name: n("White rum", "Белый ром"), price: 1200 },
    ],
  },
  {
    id: "beer-wine",
    title: n("Beer & wine", "Пиво и вино"),
    style: "list",
    items: [
      { name: n("Lion Lager (small)", "Lion Lager (малое)"), price: 900 },
      { name: n("Red wine (glass)", "Красное вино (бокал)"), price: 2200 },
      { name: n("White wine (glass)", "Белое вино (бокал)"), price: 2200 },
    ],
  },
  {
    id: "cold",
    title: n("Cold drinks", "Холодные напитки"),
    style: "list",
    items: [
      { name: n("King coconut", "Королевский кокос"), price: 500 },
      { name: n("Sprite", "Sprite"), price: 450 },
      { name: n("Coca-Cola", "Coca-Cola"), price: 450 },
      { name: n("Ginger beer", "Имбирное пиво"), price: 450 },
      { name: n("Soda", "Содовая"), price: 400 },
      { name: n("Tonic", "Тоник"), price: 400 },
      { name: n("Water", "Вода"), price: 300 },
    ],
  },
];

/** "Rs 1,900" in English, "1 900 Rs" in Russian. */
export function formatPrice(price: number, lang: "en" | "ru") {
  return lang === "ru" ? `${price.toLocaleString("ru-RU")} Rs` : `Rs ${price.toLocaleString("en-GB")}`;
}

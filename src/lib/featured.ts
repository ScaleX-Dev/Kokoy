// The home page's featured dishes and drinks, looked up on the menu by their exact name. All text
// (name, description, ingredients, section) comes from src/lib/menu.ts unchanged. A name that is
// not on the menu fails the build rather than showing made-up text.

import { FEATURED_DRINKS, FEATURED_FOOD, type ImgKey } from "./content";
import { DRINKS, FOOD, type MenuItem, type MenuSection } from "./menu";
import type { Locale } from "./i18n";

function find(sections: MenuSection[], name: string): { item: MenuItem; section: MenuSection } {
  for (const section of sections) {
    const item = section.items.find((i) => i.name.en === name);
    if (item) return { item, section };
  }
  throw new Error(`Featured item "${name}" is not on the menu (src/lib/menu.ts).`);
}

export type FeaturedDish = { name: string; desc?: string; section: string; img: ImgKey };
export type FeaturedDrink = { name: string; spec: string; desc: string; img: ImgKey; color: string };

export function featuredFood(lang: Locale): FeaturedDish[] {
  return FEATURED_FOOD.map(({ name, img }) => {
    const { item, section } = find(FOOD, name);
    return { name: item.name[lang], desc: item.desc?.[lang], section: section.title[lang], img };
  });
}

export function featuredDrinks(lang: Locale): FeaturedDrink[] {
  return FEATURED_DRINKS.map(({ name, img, color }) => {
    const { item } = find(DRINKS, name);
    return { name: item.name[lang], spec: (item.spec?.[lang] ?? []).join(", "), desc: item.desc?.[lang] ?? "", img, color };
  });
}

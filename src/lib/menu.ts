// The KOKOY menus, from the printed menus (Downloads, 24 Nov 2026):
//   food   — "White and Beige … Food Menu Landscape" (English + Russian on one sheet)
//   drinks — "Green Modern Food Menu" (English edition) and its Russian edition
// Text is as printed, with obvious typos fixed (stray letters, "Plane omelet", "parmesan.poached").
// Where the Russian was unreadable or did not match the dish it is rewritten from the English;
// those spots are marked TODO(confirm). Prices are in Sri Lankan rupees; a 10% service charge is
// added to the bill.

import type { ImgKey } from "./content";

type L = { en: string; ru: string };

export type MenuItem = {
  name: L;
  /** A short label beside the name ("Spicy", "Sri Lankan spices"). */
  tag?: L;
  /** Ingredients, shown separated by dots. */
  spec?: { en: string[]; ru: string[] };
  desc?: L;
  /** Omitted when the dish is only sold by variant (e.g. fried rice with chicken or prawn). */
  price?: number;
  /** Choices with their own price ("with chicken Rs 2,400"). */
  variants?: { label: L; price: number }[];
};

export type MenuSection = {
  id: string;
  title: L;
  /** "feature": full entries with descriptions. "list": name and price only. */
  style: "feature" | "list";
  tone?: "dark" | "light" | "sand";
  img?: ImgKey;
  items: MenuItem[];
};

export type MenuGroup = "food" | "drinks";

const n = (en: string, ru: string): L => ({ en, ru });
const sp = (en: string[], ru: string[]) => ({ en, ru });
const v = (en: string, ru: string, price: number) => ({ label: n(en, ru), price });

export const FOOD: MenuSection[] = [
  {
    id: "brunch",
    title: n("Brunch menu", "Меню бранча"),
    style: "feature",
    tone: "light",
    img: "eggsToast",
    items: [
      {
        name: n("Classic Royale Benedict", "Классический бенедикт Рояль"),
        desc: n(
          "Homemade English muffin topped with roasted potato, smoked bacon, a perfectly poached egg and silky hollandaise sauce, finished with parmesan.",
          "Домашний английский маффин с запечённым картофелем, копчёным беконом, идеально приготовленным яйцом пашот и нежным голландским соусом, с пармезаном.",
        ),
        price: 2200,
      },
      {
        name: n("Fire Roasted Shakshuka", "Шакшука на огне"),
        desc: n(
          "Moroccan-style tomato stew with fire-roasted tomatoes, poached eggs, pan-roasted potatoes and peppers, served with sourdough bread.",
          "Ароматное рагу в марокканском стиле с томатами, запечёнными на огне, яйцами пашот, обжаренным картофелем и перцем. Подаётся с хлебом на закваске.",
        ),
        price: 2100,
      },
      {
        name: n("Tropical Bliss Bowl", "Тропическая чаша «Блаженство»"),
        desc: n(
          "A vibrant bowl of seasonal creamy fruits, crunchy granola, fresh banana, mixed berries and golden syrup.",
          "Яркая чаша из сезонных сливочных фруктов, хрустящей гранолы, свежего банана, ягод и золотистого сиропа.",
        ),
        price: 2800,
      },
      {
        name: n("KOKOY Big Breakki", "Большой завтрак KOKOY"),
        desc: n(
          "A hearty free-range egg (fried or over easy) served with toast, crispy bacon, sausage, sautéed mushroom, grilled tomato and baked beans.",
          "Сытный завтрак: яйцо от кур свободного выгула (жареное или глазунья), тосты, хрустящий бекон, сосиска, обжаренные грибы, помидор на гриле и запечённая фасоль.",
        ),
        price: 2300,
      },
      {
        name: n("Pecan French Toast", "Френчтосты с пеканом"),
        desc: n(
          "Golden melted brioche French toast topped with roasted pecans, a hint of cinnamon, vanilla ice cream and a rich caramel sauce.",
          "Золотистые французские тосты из бриоши с обжаренными орехами пекан, ноткой корицы, ванильным мороженым и насыщенным карамельным соусом.",
        ),
        price: 2300,
      },
      {
        name: n("Ceylon Grand Breakfast", "Большой цейлонский завтрак"),
        desc: n(
          "A Sri Lankan-inspired breakfast of creamy coconut milk rice (kiribath), fish, a fried egg and seeni sambol.",
          "Завтрак в шри-ланкийском стиле: рис с кокосовым молоком (кирибат), рыба абул тиял, жареное яйцо и сини самбол.",
        ),
        price: 2300,
      },
    ],
  },
  {
    id: "stacked",
    title: n("Stacked & stuffed", "Сэндвичи и бургеры"),
    style: "feature",
    tone: "dark",
    img: "pancakes",
    items: [
      {
        name: n("KOKOY Club Sandwich", "Клубный сэндвич KOKOY"),
        desc: n(
          "A classic triple-decker with toasted bread, fresh vegetables, egg, grilled chicken, crispy bacon and our signature homemade crisps.",
          "Классический трёхслойный сэндвич с поджаренным хлебом, свежими овощами, яйцом, курицей на гриле, хрустящим беконом и фирменными домашними чипсами.",
        ),
        price: 2200,
      },
      {
        name: n("Crispy Chicken Deluxe", "Хрустящий куриный делюкс"),
        desc: n(
          "Golden crispy chicken fillet with our signature burger killer sauce, homemade sweet pickles, fresh lettuce and tomato, served in a soft bun with house-made crisps.",
          "Золотистое хрустящее куриное филе с фирменным соусом, домашними сладкими маринованными огурчиками, свежим салатом и помидором. Подаётся в мягкой булочке с домашними чипсами.",
        ),
        price: 2500,
      },
      {
        name: n("Taco Tinga", "Тако тинга"),
        desc: n(
          "Soft homemade tacos filled with slow-pulled chicken in our house BBQ sauce, topped with fresh slaw and herbs.",
          // TODO(confirm): the printed Russian described a "wedding-style" coleslaw; rewritten from the English.
          "Мягкие домашние тако с томлёной курицей в фирменном соусе барбекю, со свежим салатом коул-слоу и зеленью.",
        ),
        price: 2200,
      },
      {
        // TODO(confirm): the printed Russian names this "Фиеста фахита" but describes the Caesar roll.
        name: n("The Caesar Roll", "Цезарь-ролл"),
        desc: n(
          "A hearty Caesar with grilled chicken, crisp lettuce, baby corn, baked bean shavings and crunchy homemade crisps, served in a tortilla wrap.",
          "Сытный «Цезарь» с курицей-гриль, хрустящим салатом, мини-кукурузой, стружкой из запечённых бобовых и домашними сухариками — в пшеничной лепёшке (тортилье).",
        ),
        price: 2300,
      },
    ],
  },
  {
    id: "nibbles",
    title: n("Nibbles", "Закуски"),
    style: "list",
    items: [
      { name: n("Garlic bread", "Чесночный хлеб"), price: 1100 },
      { name: n("Tomato basil bruschetta", "Брускетта с томатами и базиликом"), price: 1400 },
      { name: n("Crispy calamari rings, tartare sauce", "Хрустящие кольца кальмара с соусом тартар"), price: 1700 },
      { name: n("French fries", "Картофель фри"), price: 1100 },
      { name: n("Cheese & potato croquettes, sriracha mayo", "Сырно-картофельные крокеты с майонезом шрирача"), price: 1800 },
    ],
  },
  {
    id: "soups",
    title: n("Soup kettle", "Супы"),
    style: "list",
    items: [
      { name: n("Cream of mushroom soup", "Грибной крем-суп"), price: 1300 },
      { name: n("Chicken & noodle soup", "Куриный суп с лапшой"), price: 1500 },
      { name: n("Rustic pumpkin delight", "Рустикальный тыквенный суп"), price: 1400 },
      { name: n("Tom yum royale", "Том ям рояль"), price: 1900 },
    ],
  },
  {
    id: "salads",
    title: n("Salads", "Салаты"),
    style: "feature",
    tone: "sand",
    items: [
      {
        name: n("Classic Caesar Salad", "Классический салат «Цезарь»"),
        desc: n(
          "Crispy romaine lettuce tossed in a creamy Caesar dressing, topped with parmesan and crunchy croutons, with your choice of:",
          "Хрустящий салат ромэн с кремовой заправкой «Цезарь», пармезаном и хрустящими крутонами. На выбор:",
        ),
        price: 2100,
        variants: [v("Chicken", "Курица", 2400), v("Prawn", "Креветки", 2500)],
      },
      { name: n("KOKOY House Salad", "Фирменный салат KOKOY"), price: 2100 },
      { name: n("Mango Prawn Salad", "Салат с креветками и манго"), price: 1900 },
    ],
  },
  {
    id: "grub",
    title: n("The grub", "Основные блюда"),
    style: "feature",
    tone: "light",
    img: "frenchToast",
    items: [
      {
        name: n("Hot Butter Cuttlefish", "Каракатица в горячем масле"),
        desc: n("With mixed salad and French fries.", "С овощным салатом и картофелем фри."),
        price: 2500,
      },
      {
        name: n("Hot Butter Prawns", "Креветки в остром масле"),
        desc: n("With mixed salad and French fries.", "С овощным салатом и картофелем фри."),
        price: 2700,
      },
      { name: n("Beer-Battered Fish & Chips", "Рыба в пивном кляре с картофелем фри"), price: 2600 },
      {
        name: n("Coco Jumbo", "Коко джамбо"),
        desc: n(
          "Prawns cooked in fresh coconut milk, seasoned with local herbs and spices, served with saffron rice and a seasonal salad.",
          // TODO(confirm): the printed Russian was unreadable; rewritten from the English.
          "Креветки, приготовленные в свежем кокосовом молоке с местными травами и специями. Подаются с шафрановым рисом и сезонным салатом.",
        ),
        price: 2800,
      },
      {
        name: n("Coastal Flame Chicken", "Курица «Прибрежное пламя»"),
        desc: n("Grilled chicken served with mashed potato and boiled vegetables.", "Курица-гриль, подаётся с картофельным пюре и отварными овощами."),
        price: 2600,
      },
      {
        name: n("Asian-Style Tuna Steak", "Стейк из тунца в азиатском стиле"),
        desc: n(
          "Grilled tuna steak with Asian-inspired flavours, served with saffron rice, bell peppers, fresh mango salsa and a lemon-butter sauce.",
          "Стейк из тунца на гриле с азиатскими ароматами. Подаётся с шафрановым рисом, болгарским перцем, свежей манговой сальсой и лимонно-масляным соусом.",
        ),
        price: 2800,
      },
      {
        name: n("KOKOY Special Fried Rice", "Фирменный жареный рис KOKOY"),
        variants: [v("Chicken", "С курицей", 1800), v("Prawn", "С креветками", 2100)],
      },
    ],
  },
  {
    id: "italian",
    title: n("Italian touch", "Итальянские блюда"),
    style: "feature",
    tone: "dark",
    items: [
      {
        name: n("Chicken Alfredo (fettuccine)", "Курица альфредо (феттучине)"),
        desc: n(
          "A creamy sauce with tender grilled chicken and sautéed mushrooms, finished with fresh herbs.",
          "Сливочный соус с нежной курицей-гриль и обжаренными грибами, дополненный свежей зеленью.",
        ),
        price: 2700,
      },
      {
        name: n("Penne all'Arrabbiata", "Пенне аль арраббьята"),
        tag: n("Spicy", "Острое"),
        desc: n(
          "Made with a fiery tomato, garlic, red chilli and pepper sauce, with fresh parsley sautéed in extra virgin olive oil.",
          "С пикантными томатами, чесноком и красным перцем чили. Свежая петрушка обжарена на оливковом масле первого холодного отжима.",
        ),
        price: 1900,
        variants: [v("Chicken", "Курица", 2300), v("Prawn", "Креветки", 2500)],
      },
      {
        name: n("Pizza Margherita", "Пицца Маргарита"),
        desc: n(
          "The classic Italian favourite with a rich tomato sauce, fresh basil, melted mozzarella and a drizzle of olive oil.",
          "Классическая итальянская пицца с насыщенным томатным соусом, свежим базиликом, расплавленной моцареллой и каплей оливкового масла.",
        ),
        price: 2700,
      },
      {
        name: n("KOKOY House Special Manchurian Pizza", "Фирменная пицца KOKOY с маньчжурским соусом"),
        desc: n(
          "Our signature fusion pizza with your choice of chicken, prawn, calamari or sausage, topped with bold Manchurian sauce, melted cheese, spring onions and fresh herbs.",
          "Фирменная пицца-фьюжн на выбор: курица, креветки, кальмар или сосиски; сверху — пикантный маньчжурский соус, расплавленный сыр, зелёный лук и свежая зелень.",
        ),
        price: 3100,
      },
    ],
  },
  {
    id: "dessert",
    title: n("Dessert", "Десерт"),
    style: "list",
    items: [
      { name: n("Banana or pineapple fritters with ice cream", "Оладьи с бананом или ананасом и мороженым"), price: 1400 },
      { name: n("Ice cream (vanilla or chocolate)", "Мороженое (ванильное или шоколадное)"), price: 1000 },
    ],
  },
  {
    id: "addons",
    title: n("Add-ons", "Добавки"),
    style: "list",
    items: [
      { name: n("Toast", "Тост"), price: 400 },
      { name: n("Cheese omelette", "Омлет с сыром"), price: 900 },
      { name: n("Plain omelette", "Обычный омлет"), price: 600 },
      { name: n("Boiled egg", "Варёное яйцо"), price: 400 },
      { name: n("Chicken", "Курица"), price: 400 },
      { name: n("Prawn", "Креветка"), price: 550 },
      { name: n("Calamari", "Кальмары"), price: 500 },
    ],
  },
];

export const DRINKS: MenuSection[] = [
  {
    id: "signature",
    title: n("Signature cocktails", "Фирменные коктейли"),
    style: "feature",
    tone: "dark",
    img: "spritz",
    items: [
      {
        name: n("The Amber Glow", "Янтарное сияние"),
        tag: n("Sri Lankan spices", "Шри-ланкийские специи"),
        spec: sp(["Cinnamon-infused arrack", "house spice syrup", "lime"], ["Аррак, настоянный на корице", "фирменный пряный сироп", "лайм"]),
        desc: n(
          "Golden hour in a glass. Island-aged arrack meets warm native spice and a sharp citrus edge.",
          "Золотой час в бокале: выдержанный островной аррак встречается с тёплыми местными специями и яркой цитрусовой ноткой.",
        ),
        price: 1900,
      },
      {
        name: n("Island Espresso", "Островной эспрессо"),
        spec: sp(["Coconut-infused vodka", "espresso", "coconut liqueur"], ["Водка, настоянная на кокосе", "эспрессо", "кокосовый ликёр"]),
        desc: n(
          "Dark-roasted espresso softened by sun-soaked coconut. The ultimate midnight beach pick-up.",
          "Насыщенный эспрессо смягчён солнечным вкусом кокоса. Идеальный напиток для полуночного отдыха на пляже.",
        ),
        price: 2100,
      },
      {
        name: n("Monsoon Melon", "Муссонная дыня"),
        tag: n("Refreshing", "Освежающий"),
        spec: sp(["Gin", "watermelon", "rosemary", "lime", "chilli flakes"], ["Джин", "арбуз", "розмарин", "лайм", "хлопья чили"]),
        desc: n(
          "Sweet, icy watermelon cut with piney botanical gin and a slow-burning coastal heat.",
          "Сладкий ледяной арбуз сочетается с ароматным травяным джином и медленно раскрывающейся остротой.",
        ),
        price: 2300,
      },
      {
        name: n("Pineapple Hellfire", "Ананасовый ад"),
        tag: n("Spicy", "Острый"),
        spec: sp(["White rum", "spiced pineapple", "house chilli syrup", "lime"], ["Белый ром", "пряный ананас", "фирменный сироп чили", "лайм"]),
        desc: n(
          "Tropic thunder. Charred island pineapple, balanced on a knife-edge of sweet and fire.",
          "Тропический гром: поджаренный островной ананас на тонкой грани сладости и огня.",
        ),
        price: 2200,
      },
      {
        name: n("KOKOY Nuts", "Ореховый коктейль KOKOY"),
        spec: sp(["House peanut butter", "gin", "coconut milk", "lime"], ["Домашняя арахисовая паста", "джин", "кокосовое молоко", "лайм"]),
        desc: n(
          "Silky, savoury and unforgettably lush. An avant-garde twist on tropical creaminess.",
          "Шёлковистый, пикантный и невероятно насыщенный вкус — необычная интерпретация тропической сливочности.",
        ),
        price: 2300,
      },
      {
        name: n("Coriander Fiesta", "Кориандровая фиеста"),
        spec: sp(["Tequila", "triple sec", "pineapple", "fresh coriander", "lime"], ["Текила", "трипл-сек", "ананас", "свежий кориандр", "лайм"]),
        desc: n(
          "Agave spirit elevated by crushed garden coriander and vibrant tropical citrus.",
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
      {
        name: n("Whiskey Sour", "Виски сауэр"),
        spec: sp(["Bourbon whiskey", "sweet and sour", "egg white"], ["Бурбон", "кисло-сладкая смесь", "яичный белок"]),
        price: 2450,
      },
      { name: n("Classic Mojito", "Классический мохито"), spec: sp(["Rum", "lime", "sugar", "soda"], ["Ром", "лайм", "сахар", "содовая"]), price: 2300 },
      { name: n("Gin & Tonic", "Джин-тоник"), price: 2300 },
    ],
  },
  {
    id: "mocktails",
    title: n("Mocktails", "Безалкогольные коктейли"),
    style: "feature",
    tone: "sand",
    img: "lemonade",
    items: [
      {
        name: n("Ginger Woods", "Имбирный лес"),
        spec: sp(["Rosemary", "ginger", "lime", "soda"], ["Розмарин", "имбирь", "лайм", "содовая"]),
        desc: n(
          "Woodland herb meets fiery ginger root. Deep, aromatic and sophisticatedly dry.",
          "Лесные травы встречаются с жгучим корнем имбиря. Глубокий, ароматный и изысканно сухой вкус.",
        ),
        price: 1400,
      },
      {
        name: n("Watermelon Heatwave", "Арбузная жара"),
        spec: sp(["Watermelon", "rosemary", "ginger", "lime", "soda", "coconut water"], ["Арбуз", "розмарин", "имбирь", "лайм", "содовая", "кокосовая вода"]),
        desc: n(
          "Hydrating coconut water and crisp melon, lifted by herbal aroma and ginger spice.",
          "Освежающая кокосовая вода и сочный арбуз дополнены травяным ароматом и пряностью имбиря.",
        ),
        price: 1500,
      },
      {
        name: n("Citrus Grove Spritz", "Цитрусовый спритц"),
        spec: sp(["Calamansi narang", "curry leaves", "citrus blend", "soda"], ["Каламондин (местный наранг)", "листья карри", "смесь цитрусовых", "содовая"]),
        desc: n(
          "Wild local narang paired with flash-slapped curry leaves. Bright, bubbly and earthy.",
          "Местный цитрус наранг сочетается с ароматными листьями карри. Яркий, игристый и с земляными нотками.",
        ),
        price: 1450,
      },
      {
        name: n("Lime & Mint", "Лайм и мята"),
        spec: sp(["Lime", "garden mint", "cane sugar", "soda"], ["Лайм", "свежая мята", "тростниковый сахар", "содовая"]),
        desc: n(
          "Pure coastal classic. Hand-crushed garden mint and raw cane sugar, charged with sparkle.",
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
        name: n("Tropical Cream Delish Smoothie", "Тропический сливочный смузи"),
        spec: sp(["Avocado", "banana", "fresh milk", "yogurt", "wild honey"], ["Авокадо", "банан", "свежее молоко", "йогурт", "натуральный мёд"]),
        desc: n(
          "Rich, buttery local avocado whipped with sweet banana and island honey. Pure velvet in a glass.",
          "Нежный местный авокадо взбивается со сладким бананом и островным мёдом. Бархатистый вкус в каждом глотке.",
        ),
        price: 1550,
      },
      {
        name: n("Mango Smoothie", "Манговый смузи"),
        spec: sp(["Fresh island mango", "banana", "yogurt", "milk", "honey"], ["Свежий островной манго", "банан", "йогурт", "молоко", "мёд"]),
        desc: n(
          "Sun-ripened tropical mango blended smoothly with cool yogurt and a hint of local nectar.",
          "Спелый тропический манго смешивается с прохладным йогуртом и лёгкой ноткой местного мёда.",
        ),
        price: 1450,
      },
      {
        name: n("Oreo Smoothie", "Смузи Oreo"),
        spec: sp(["Oreo crumb", "banana", "creamy milk", "honey"], ["Крошка Oreo", "банан", "сливочное молоко", "мёд"]),
        desc: n(
          "Dark cocoa crunch meets sweet island banana. Decadent, chilled and indulgently thick.",
          "Хрустящий шоколадный вкус сочетается со сладким островным бананом. Густой, прохладный и по-настоящему насыщенный.",
        ),
        price: 1400,
      },
      {
        name: n("Papaya Smoothie", "Смузи из папайи"),
        spec: sp(["Fresh papaya", "yogurt", "milk", "honey"], ["Свежая папайя", "йогурт", "молоко", "мёд"]),
        desc: n(
          "Lush red papaya balanced with tangy house yogurt. Light, refreshing and full of sunshine.",
          "Сочная красная папайя сбалансирована пикантным домашним йогуртом. Лёгкий, освежающий напиток с солнечным настроением.",
        ),
        price: 1350,
      },
    ],
  },
  {
    id: "juice",
    title: n("Juice", "Соки"),
    style: "list",
    items: [
      { name: n("Passion juice", "Маракуйя"), price: 1000 },
      { name: n("Mango & passion juice", "Манго и маракуйя"), price: 1000 },
      { name: n("Pineapple juice", "Ананас"), price: 900 },
      { name: n("Watermelon juice", "Арбуз"), price: 800 },
      { name: n("Mango juice", "Манго"), price: 1000 },
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
    title: n("Cold beverages", "Холодные напитки"),
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

export const MENUS: Record<MenuGroup, MenuSection[]> = { food: FOOD, drinks: DRINKS };

/** "Rs 1,900" in English, "1 900 Rs" in Russian. */
export function formatPrice(price: number, lang: "en" | "ru") {
  return lang === "ru" ? `${price.toLocaleString("ru-RU")} Rs` : `Rs ${price.toLocaleString("en-GB")}`;
}

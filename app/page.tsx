"use client";

import { useMemo, useState } from "react";

type MealType = "Breakfast" | "Lunch" | "Dinner";
type Skill = "Easy" | "Medium" | "Go all out";
type StoreId =
  | "instacart"
  | "walmart"
  | "kroger"
  | "safeway"
  | "costco"
  | "target";

type Store = {
  id: StoreId;
  name: string;
  label: string;
  factor: number;
  deliveryUrl: string;
};

type Grocery = {
  name: string;
  unit: string;
  baseQty: number;
  basePrice: number;
};

type Meal = {
  id: string;
  title: string;
  type: MealType;
  minutes: number;
  calories: number;
  skill: Skill;
  costPerServing: number;
  dietary: string[];
  focus: string[];
  ingredients: string[];
  avoidTags: string[];
  photo: string;
};

type Profile = {
  zip: string;
  people: number;
  mealsPerWeek: number;
  mealTypes: MealType[];
  budget: number;
  dietary: string[];
  avoid: string[];
  timeLimit: number;
  skill: Skill;
  calories: string;
  focus: string;
};

const stores: Store[] = [
  {
    id: "instacart",
    name: "Instacart",
    label: "Instacart partners",
    factor: 1.07,
    deliveryUrl: "https://www.instacart.com/store",
  },
  {
    id: "walmart",
    name: "Walmart",
    label: "Walmart",
    factor: 0.92,
    deliveryUrl: "https://www.walmart.com/cp/grocery/976759",
  },
  {
    id: "kroger",
    name: "Kroger",
    label: "Kroger",
    factor: 1,
    deliveryUrl: "https://www.kroger.com/",
  },
  {
    id: "safeway",
    name: "Safeway",
    label: "Safeway / Albertsons",
    factor: 1.04,
    deliveryUrl: "https://www.safeway.com/",
  },
  {
    id: "costco",
    name: "Costco",
    label: "Costco",
    factor: 0.88,
    deliveryUrl: "https://www.costco.com/grocery-household.html",
  },
  {
    id: "target",
    name: "Target",
    label: "Target",
    factor: 1.02,
    deliveryUrl: "https://www.target.com/c/grocery/-/N-5xt1a",
  },
];

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free / lactose intolerant" },
  { id: "nut-free", label: "Nut-free" },
  { id: "low-carb", label: "Low-carb" },
  { id: "halal", label: "Halal" },
  { id: "kosher", label: "Kosher" },
  { id: "allergy-aware", label: "Allergy-aware" },
];

const avoidOptions = [
  { id: "shellfish", label: "Shellfish" },
  { id: "nuts", label: "Nuts" },
  { id: "mushrooms", label: "Mushrooms" },
  { id: "spicy", label: "Spicy" },
  { id: "cilantro", label: "Cilantro" },
];

const focusOptions = [
  { id: "budget", label: "Spend less" },
  { id: "healthy", label: "Healthy" },
  { id: "fast", label: "Fast" },
  { id: "high-protein", label: "High protein" },
  { id: "family", label: "Family-friendly" },
  { id: "variety", label: "Variety" },
];

const foodPhotos = Array.from(
  { length: 36 },
  (_, index) => `/assets/meals/meal-${String(index + 1).padStart(2, "0")}.jpg`,
);

const groceryCatalog: Record<string, Grocery> = {
  eggs: { name: "Large eggs", unit: "dozen", baseQty: 1, basePrice: 4.49 },
  greekYogurt: { name: "Greek yogurt", unit: "32 oz tub", baseQty: 1, basePrice: 5.49 },
  oats: { name: "Rolled oats", unit: "canister", baseQty: 1, basePrice: 3.99 },
  berries: { name: "Mixed berries", unit: "pint", baseQty: 1, basePrice: 4.99 },
  spinach: { name: "Baby spinach", unit: "5 oz bag", baseQty: 1, basePrice: 3.79 },
  tortillas: { name: "Tortillas", unit: "pack", baseQty: 1, basePrice: 3.49 },
  chickenBreast: { name: "Chicken breast", unit: "lb", baseQty: 3, basePrice: 11.49 },
  salmon: { name: "Salmon fillets", unit: "lb", baseQty: 1.5, basePrice: 14.99 },
  groundTurkey: { name: "Ground turkey", unit: "lb", baseQty: 1, basePrice: 5.99 },
  turkeySlices: { name: "Turkey slices", unit: "pack", baseQty: 1, basePrice: 6.49 },
  blackBeans: { name: "Canned black beans", unit: "can", baseQty: 2, basePrice: 2.58 },
  rice: { name: "Brown rice", unit: "lb", baseQty: 2, basePrice: 4.19 },
  quinoa: { name: "Quinoa", unit: "lb", baseQty: 1, basePrice: 6.49 },
  pasta: { name: "Whole wheat pasta", unit: "box", baseQty: 1, basePrice: 2.49 },
  tofu: { name: "Extra firm tofu", unit: "block", baseQty: 1, basePrice: 2.99 },
  broccoli: { name: "Broccoli crowns", unit: "lb", baseQty: 1.5, basePrice: 3.99 },
  chickpeas: { name: "Chickpeas", unit: "can", baseQty: 2, basePrice: 2.78 },
  lentils: { name: "Dry lentils", unit: "lb", baseQty: 1, basePrice: 2.99 },
  shrimp: { name: "Shrimp", unit: "lb", baseQty: 1, basePrice: 9.99 },
  avocado: { name: "Avocados", unit: "ct", baseQty: 3, basePrice: 4.5 },
  tuna: { name: "Tuna", unit: "can", baseQty: 2, basePrice: 3.98 },
  cucumber: { name: "Cucumbers", unit: "ct", baseQty: 2, basePrice: 1.98 },
  lettuce: { name: "Romaine lettuce", unit: "head", baseQty: 1, basePrice: 2.49 },
  cheese: { name: "Shredded cheese", unit: "bag", baseQty: 1, basePrice: 3.99 },
  mushrooms: { name: "Mushrooms", unit: "8 oz pack", baseQty: 1, basePrice: 3.49 },
  peppers: { name: "Bell peppers", unit: "ct", baseQty: 3, basePrice: 4.47 },
  sweetPotato: { name: "Sweet potatoes", unit: "lb", baseQty: 2, basePrice: 3.58 },
  beef: { name: "Lean beef", unit: "lb", baseQty: 1, basePrice: 7.99 },
  cod: { name: "Cod fillets", unit: "lb", baseQty: 1.25, basePrice: 10.49 },
  potatoes: { name: "Baby potatoes", unit: "lb", baseQty: 2, basePrice: 4.49 },
  pork: { name: "Pork tenderloin", unit: "lb", baseQty: 1.5, basePrice: 8.99 },
  pesto: { name: "Basil pesto", unit: "jar", baseQty: 1, basePrice: 4.79 },
  gnocchi: { name: "Gnocchi", unit: "pack", baseQty: 1, basePrice: 3.49 },
  cauliflower: { name: "Cauliflower", unit: "head", baseQty: 1, basePrice: 3.99 },
  coconutMilk: { name: "Coconut milk", unit: "can", baseQty: 1, basePrice: 2.99 },
  ramen: { name: "Ramen noodles", unit: "pack", baseQty: 2, basePrice: 3.49 },
  noodles: { name: "Rice noodles", unit: "pack", baseQty: 1, basePrice: 3.69 },
  couscous: { name: "Couscous", unit: "box", baseQty: 1, basePrice: 3.29 },
  hummus: { name: "Hummus", unit: "tub", baseQty: 1, basePrice: 4.29 },
  bread: { name: "Whole grain bread", unit: "loaf", baseQty: 1, basePrice: 4.49 },
  peanutButter: { name: "Peanut butter", unit: "jar", baseQty: 1, basePrice: 3.99 },
  chia: { name: "Chia seeds", unit: "bag", baseQty: 1, basePrice: 6.99 },
  bananas: { name: "Bananas", unit: "bunch", baseQty: 1, basePrice: 1.89 },
  cottageCheese: { name: "Cottage cheese", unit: "tub", baseQty: 1, basePrice: 4.49 },
  herbs: { name: "Fresh herb bundle", unit: "bunch", baseQty: 1, basePrice: 2.49 },
  tikkaSauce: { name: "Tikka simmer sauce", unit: "jar", baseQty: 1, basePrice: 4.99 },
  salsa: { name: "Salsa", unit: "jar", baseQty: 1, basePrice: 3.49 },
  cilantro: { name: "Cilantro", unit: "bunch", baseQty: 1, basePrice: 1.29 },
  sesameSauce: { name: "Sesame teriyaki sauce", unit: "bottle", baseQty: 1, basePrice: 4.29 },
  tomatoSauce: { name: "Tomato sauce", unit: "jar", baseQty: 1, basePrice: 3.29 },
  cherryTomatoes: { name: "Cherry tomatoes", unit: "pint", baseQty: 1, basePrice: 3.29 },
};

const photoIndexFor = (
  title: string,
  type: MealType,
  ingredients: string[],
  fallback = 0,
) => {
  const haystack = `${title} ${type} ${ingredients.join(" ")}`.toLowerCase();
  const has = (...terms: string[]) =>
    terms.some((term) => haystack.includes(term));

  if (has("waffle", "pancake")) return 24;
  if (has("oat", "parfait", "yogurt", "berry bowl", "chia")) return 0;
  if (has("smoothie")) return 14;
  if (has("grain bowl", "quinoa", "greek grain", "power salad")) return 2;
  if (has("avocado toast", "cottage cheese toast", "chickpea toast", "toast with eggs")) return 1;
  if (has("breakfast burrito", "brunch burrito", "burrito")) return 12;
  if (has("shakshuka")) return 13;
  if (type === "Breakfast" && has("hash", "scramble", "frittata", "egg muffin", "egg bowl", "skillet")) return 25;
  if (type === "Breakfast" && has("egg")) return 1;

  if (has("chicken noodle")) return 26;
  if (has("ramen")) return 16;
  if (has("soup", "stew") && has("lentil")) return 20;
  if (has("chili")) return 30;
  if (has("soup", "white bean")) return 7;

  if (has("stuffed pepper")) return 28;
  if (has("cod")) return 27;
  if (has("pork")) return 32;
  if (has("steak")) return 17;
  if (has("shrimp")) return 18;
  if (has("tuna")) return 23;
  if (has("salmon salad")) return 31;
  if (has("salmon")) return 4;

  if (has("pesto gnocchi", "gnocchi")) return 22;
  if (has("pesto", "pasta", "bolognese")) return 6;
  if (has("meatball")) return 15;
  if (has("burger")) return 10;

  if (has("tofu curry")) return 29;
  if (has("curry")) return 9;
  if (has("tofu", "stir fry", "sesame")) return 8;
  if (has("roasted veggie", "veggie platter")) return 19;

  if (has("taco bowl", "fajita bowl")) return 11;
  if (has("taco", "enchilada")) return has("black bean", "veggie") ? 34 : 5;
  if (has("pita", "wrap")) return 21;
  if (has("couscous")) return 33;
  if (has("rice bowl", "chicken bowl", "teriyaki", "honey garlic", "tikka")) return 35;
  if (has("chicken", "turkey")) return 3;
  if (has("bean", "chickpea", "lentil")) return 2;

  return fallback % foodPhotos.length;
};

const meal = (
  id: string,
  title: string,
  type: MealType,
  minutes: number,
  calories: number,
  skill: Skill,
  costPerServing: number,
  dietary: string[],
  focus: string[],
  ingredients: string[],
  avoidTags: string[] = [],
  photoIndex = 0,
): Meal => ({
  id,
  title,
  type,
  minutes,
  calories,
  skill,
  costPerServing,
  dietary,
  focus,
  ingredients,
  avoidTags,
  photo: foodPhotos[photoIndexFor(title, type, ingredients, photoIndex)],
});

const meals: Meal[] = [
  meal("greek-yogurt-parfait", "Greek yogurt parfait", "Breakfast", 10, 310, "Easy", 2.8, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "healthy", "budget"], ["greekYogurt", "berries", "chia"], [], 10),
  meal("veggie-egg-scramble", "Veggie egg scramble", "Breakfast", 15, 360, "Easy", 3.2, ["vegetarian", "gluten-free", "dairy-free", "nut-free", "low-carb", "halal", "kosher"], ["fast", "healthy", "high-protein"], ["eggs", "spinach", "peppers"], [], 11),
  meal("overnight-oats", "Berry overnight oats", "Breakfast", 8, 340, "Easy", 2.1, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "budget", "healthy"], ["oats", "berries", "greekYogurt"], [], 3),
  meal("turkey-breakfast-tacos", "Turkey breakfast tacos", "Breakfast", 20, 440, "Easy", 3.9, ["nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "eggs", "tortillas", "salsa"], [], 9),
  meal("smoothie-bowl", "Green smoothie bowl", "Breakfast", 10, 390, "Easy", 3.4, ["vegetarian", "gluten-free", "dairy-free", "nut-free"], ["fast", "healthy"], ["bananas", "spinach", "berries", "chia"], [], 5),
  meal("avocado-toast-eggs", "Avocado toast with eggs", "Breakfast", 15, 420, "Easy", 3.8, ["vegetarian", "nut-free", "kosher"], ["fast", "healthy"], ["bread", "avocado", "eggs"], [], 11),
  meal("cottage-berry-bowl", "Cottage cheese berry bowl", "Breakfast", 8, 330, "Easy", 3.1, ["vegetarian", "gluten-free", "nut-free", "low-carb", "kosher"], ["fast", "high-protein"], ["cottageCheese", "berries", "chia"], [], 10),
  meal("protein-pancakes", "Banana protein pancakes", "Breakfast", 25, 470, "Medium", 3.6, ["vegetarian", "nut-free", "kosher"], ["family", "high-protein"], ["bananas", "eggs", "oats", "greekYogurt"], [], 3),
  meal("tofu-breakfast-hash", "Tofu breakfast hash", "Breakfast", 25, 360, "Easy", 3.2, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget"], ["tofu", "potatoes", "peppers", "spinach"], [], 15),
  meal("quinoa-breakfast-bowl", "Quinoa breakfast bowl", "Breakfast", 20, 410, "Easy", 3.5, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["quinoa", "eggs", "spinach"], [], 0),
  meal("peanut-chia-oats", "Peanut butter chia oats", "Breakfast", 8, 430, "Easy", 2.6, ["vegetarian", "gluten-free", "dairy-free"], ["fast", "budget"], ["oats", "peanutButter", "chia", "bananas"], ["nuts"], 5),
  meal("apple-oatmeal", "Apple cinnamon oatmeal", "Breakfast", 12, 320, "Easy", 2.2, ["vegetarian", "vegan", "dairy-free", "nut-free", "kosher"], ["fast", "budget", "family"], ["oats", "bananas", "chia"], [], 3),
  meal("salmon-bagel-plate", "Salmon breakfast plate", "Breakfast", 12, 460, "Easy", 5.2, ["nut-free", "kosher"], ["high-protein", "fast"], ["salmon", "bread", "cottageCheese"], [], 6),
  meal("breakfast-burrito", "Freezer breakfast burrito", "Breakfast", 30, 510, "Medium", 3.8, ["nut-free", "halal"], ["family", "budget"], ["tortillas", "eggs", "blackBeans", "cheese", "salsa"], [], 9),
  meal("mushroom-frittata", "Mushroom spinach frittata", "Breakfast", 35, 390, "Medium", 3.7, ["vegetarian", "gluten-free", "nut-free", "low-carb", "kosher"], ["healthy", "high-protein"], ["eggs", "mushrooms", "spinach", "cheese"], ["mushrooms"], 11),
  meal("egg-muffins", "Low-carb egg muffins", "Breakfast", 25, 280, "Easy", 3.1, ["gluten-free", "nut-free", "low-carb", "halal", "kosher"], ["healthy", "fast", "high-protein"], ["eggs", "spinach", "turkeySlices"], [], 11),
  meal("tropical-yogurt-bowl", "Tropical yogurt bowl", "Breakfast", 10, 350, "Easy", 3, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "healthy"], ["greekYogurt", "bananas", "chia"], [], 5),
  meal("greek-grain-bowl", "Greek grain bowl", "Lunch", 15, 380, "Easy", 4.1, ["vegetarian", "nut-free", "kosher"], ["fast", "healthy", "variety"], ["quinoa", "chickpeas", "cherryTomatoes", "greekYogurt"], [], 0),
  meal("chicken-caesar-wrap", "Chicken Caesar wrap", "Lunch", 20, 520, "Easy", 4.8, ["nut-free", "halal"], ["family", "high-protein"], ["chickenBreast", "tortillas", "lettuce", "cheese"], [], 8),
  meal("lentil-soup", "Lentil vegetable soup", "Lunch", 30, 340, "Easy", 2.7, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "healthy"], ["lentils", "spinach", "tomatoSauce", "herbs"], [], 2),
  meal("turkey-lettuce-cups", "Turkey lettuce cups", "Lunch", 20, 360, "Easy", 4.2, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal"], ["fast", "high-protein"], ["groundTurkey", "lettuce", "peppers", "sesameSauce"], [], 1),
  meal("black-bean-tacos", "Black bean tacos", "Lunch", 20, 360, "Easy", 2.5, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "family", "fast"], ["blackBeans", "tortillas", "salsa", "avocado"], [], 9),
  meal("tuna-rice-bowl", "Tuna rice bowl", "Lunch", 15, 430, "Easy", 3.4, ["dairy-free", "nut-free", "halal", "kosher"], ["fast", "high-protein", "budget"], ["tuna", "rice", "avocado", "cucumber"], [], 6),
  meal("chickpea-pita", "Chickpea salad pita", "Lunch", 15, 390, "Easy", 2.9, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["fast", "budget", "healthy"], ["chickpeas", "bread", "lettuce", "cherryTomatoes"], [], 1),
  meal("veggie-sushi-bowl", "Veggie sushi bowl", "Lunch", 25, 420, "Medium", 3.7, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"], ["healthy", "variety"], ["rice", "avocado", "tofu", "cucumber"], [], 0),
  meal("chicken-quinoa-salad", "Chicken quinoa salad", "Lunch", 20, 470, "Easy", 4.9, ["gluten-free", "dairy-free", "nut-free", "halal"], ["healthy", "high-protein", "fast"], ["chickenBreast", "quinoa", "spinach", "cherryTomatoes"], [], 8),
  meal("tofu-noodle-salad", "Tofu noodle salad", "Lunch", 25, 440, "Easy", 3.5, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal"], ["healthy", "variety"], ["tofu", "noodles", "spinach", "sesameSauce"], [], 7),
  meal("caprese-pesto-sandwich", "Caprese pesto sandwich", "Lunch", 15, 500, "Easy", 3.8, ["vegetarian", "nut-free", "kosher"], ["fast", "family"], ["bread", "pesto", "cheese", "cherryTomatoes"], [], 4),
  meal("shrimp-avocado-salad", "Shrimp avocado salad", "Lunch", 20, 410, "Easy", 5.8, ["gluten-free", "dairy-free", "nut-free", "low-carb"], ["healthy", "high-protein", "fast"], ["shrimp", "avocado", "lettuce", "cherryTomatoes"], ["shellfish"], 16),
  meal("bean-sweet-potato-chili", "Bean and sweet potato chili", "Lunch", 35, 430, "Medium", 2.9, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "family", "healthy"], ["blackBeans", "sweetPotato", "tomatoSauce", "salsa"], [], 2),
  meal("hummus-veggie-box", "Hummus veggie lunch box", "Lunch", 10, 360, "Easy", 3.1, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["fast", "healthy"], ["hummus", "peppers", "bread", "cherryTomatoes"], [], 1),
  meal("salmon-salad-bowl", "Salmon salad bowl", "Lunch", 20, 470, "Easy", 6.1, ["gluten-free", "dairy-free", "nut-free", "low-carb", "kosher"], ["healthy", "high-protein"], ["salmon", "lettuce", "avocado", "cherryTomatoes"], [], 6),
  meal("lemon-herb-chicken", "Lemon herb chicken", "Dinner", 25, 420, "Easy", 4.6, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal", "kosher"], ["fast", "high-protein", "family"], ["chickenBreast", "potatoes", "broccoli", "herbs"], [], 15),
  meal("sheet-pan-salmon", "Sheet pan salmon", "Dinner", 25, 440, "Easy", 6.4, ["gluten-free", "dairy-free", "nut-free", "low-carb", "kosher"], ["fast", "healthy", "high-protein"], ["salmon", "sweetPotato", "broccoli", "herbs"], [], 6),
  meal("turkey-bolognese", "Turkey bolognese", "Dinner", 35, 510, "Medium", 4.1, ["nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "pasta", "tomatoSauce", "spinach"], [], 13),
  meal("chicken-tikka", "Chicken tikka rice bowls", "Dinner", 40, 480, "Medium", 4.7, ["gluten-free", "nut-free", "halal"], ["family", "high-protein"], ["chickenBreast", "tikkaSauce", "rice", "greekYogurt"], ["spicy"], 14),
  meal("veggie-stir-fry", "Veggie stir fry", "Dinner", 20, 340, "Easy", 3.1, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["fast", "healthy", "budget"], ["tofu", "broccoli", "peppers", "rice", "sesameSauce"], [], 7),
  meal("white-bean-soup", "White bean soup", "Dinner", 30, 310, "Easy", 2.8, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "healthy"], ["chickpeas", "spinach", "tomatoSauce", "herbs"], [], 2),
  meal("salmon-quinoa", "Salmon quinoa plate", "Dinner", 30, 520, "Medium", 6.5, ["gluten-free", "dairy-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["salmon", "quinoa", "spinach", "herbs"], [], 6),
  meal("beef-broccoli", "Beef and broccoli", "Dinner", 25, 530, "Medium", 5.2, ["dairy-free", "nut-free", "low-carb", "halal", "kosher"], ["fast", "high-protein", "family"], ["beef", "broccoli", "rice", "sesameSauce"], [], 15),
  meal("cauliflower-curry", "Cauliflower chickpea curry", "Dinner", 30, 450, "Medium", 3.3, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget", "variety"], ["cauliflower", "chickpeas", "coconutMilk", "rice"], ["spicy"], 14),
  meal("shrimp-fajita-bowls", "Shrimp fajita bowls", "Dinner", 25, 460, "Easy", 5.9, ["gluten-free", "dairy-free", "nut-free"], ["fast", "high-protein"], ["shrimp", "peppers", "rice", "salsa"], ["shellfish", "spicy"], 16),
  meal("turkey-meatballs", "Turkey meatballs", "Dinner", 35, 490, "Medium", 4.2, ["nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "pasta", "tomatoSauce", "cheese"], [], 13),
  meal("chicken-fajita-skillet", "Chicken fajita skillet", "Dinner", 25, 430, "Easy", 4.4, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "peppers", "salsa", "avocado"], ["spicy"], 9),
  meal("pork-tenderloin", "Pork tenderloin dinner", "Dinner", 40, 540, "Medium", 5.4, ["gluten-free", "dairy-free", "nut-free", "low-carb"], ["family", "high-protein"], ["pork", "potatoes", "broccoli", "herbs"], [], 15),
  meal("tofu-green-curry", "Tofu green curry", "Dinner", 35, 470, "Medium", 3.6, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"], ["healthy", "variety"], ["tofu", "coconutMilk", "broccoli", "rice"], ["spicy"], 14),
  meal("black-bean-enchilada", "Black bean enchilada skillet", "Dinner", 30, 480, "Easy", 3.2, ["vegetarian", "nut-free", "halal", "kosher"], ["family", "budget"], ["blackBeans", "tortillas", "cheese", "salsa"], ["spicy"], 9),
  meal("miso-salmon", "Miso salmon rice bowls", "Dinner", 30, 510, "Medium", 6.3, ["dairy-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["salmon", "rice", "broccoli", "sesameSauce"], [], 6),
  meal("lentil-bolognese", "Lentil bolognese", "Dinner", 35, 440, "Medium", 2.9, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "family", "healthy"], ["lentils", "pasta", "tomatoSauce", "spinach"], [], 13),
  meal("greek-chicken-pitas", "Greek chicken pitas", "Dinner", 25, 490, "Easy", 4.6, ["nut-free", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "bread", "greekYogurt", "cherryTomatoes"], [], 4),
  meal("pesto-gnocchi", "Pesto veggie gnocchi", "Dinner", 25, 560, "Easy", 4.1, ["vegetarian", "nut-free", "kosher"], ["fast", "family"], ["gnocchi", "pesto", "spinach", "cherryTomatoes"], [], 13),
  meal("chicken-noodle-soup", "Chicken noodle soup", "Dinner", 35, 380, "Easy", 3.8, ["dairy-free", "nut-free", "halal"], ["family", "healthy", "budget"], ["chickenBreast", "noodles", "spinach", "herbs"], [], 2),
  meal("veggie-burgers", "Black bean veggie burgers", "Dinner", 30, 520, "Medium", 3.4, ["vegetarian", "dairy-free", "nut-free", "halal", "kosher"], ["family", "budget"], ["blackBeans", "bread", "lettuce", "avocado"], [], 17),
  meal("teriyaki-chicken", "Teriyaki chicken bowls", "Dinner", 25, 540, "Easy", 4.5, ["dairy-free", "nut-free", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "rice", "broccoli", "sesameSauce"], [], 15),
  meal("cod-potatoes", "Cod with herbed potatoes", "Dinner", 30, 430, "Easy", 5.6, ["gluten-free", "dairy-free", "nut-free", "low-carb", "kosher"], ["healthy", "high-protein"], ["cod", "potatoes", "spinach", "herbs"], [], 6),
  meal("steak-taco-salad", "Steak taco salad", "Dinner", 25, 500, "Easy", 5.7, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal"], ["fast", "high-protein"], ["beef", "lettuce", "salsa", "avocado"], ["spicy"], 1),
  meal("spaghetti-squash-turkey", "Turkey spaghetti squash bake", "Dinner", 45, 460, "Go all out", 4.4, ["gluten-free", "nut-free", "low-carb", "halal"], ["healthy", "family", "high-protein"], ["groundTurkey", "tomatoSauce", "cheese", "spinach"], [], 13),
  meal("sesame-tofu-rice", "Sesame tofu rice bowls", "Dinner", 25, 470, "Easy", 3.5, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal"], ["fast", "healthy"], ["tofu", "rice", "broccoli", "sesameSauce"], [], 7),
  meal("honey-garlic-chicken", "Honey garlic chicken", "Dinner", 25, 520, "Easy", 4.2, ["dairy-free", "nut-free", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "rice", "broccoli", "herbs"], [], 15),
  meal("roasted-veggie-couscous", "Roasted veggie couscous", "Dinner", 30, 410, "Easy", 3.1, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget"], ["couscous", "chickpeas", "peppers", "spinach"], [], 0),
  meal("stuffed-peppers", "Turkey stuffed peppers", "Dinner", 40, 480, "Medium", 4.5, ["gluten-free", "nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "peppers", "rice", "tomatoSauce"], [], 15),
  meal("ramen-eggs", "Easy ramen eggs bowl", "Dinner", 20, 450, "Easy", 2.8, ["vegetarian", "dairy-free", "nut-free"], ["fast", "budget"], ["ramen", "eggs", "spinach", "sesameSauce"], [], 7),
];

meals.push(
  meal("savory-cottage-toast", "Savory cottage cheese toast", "Breakfast", 10, 520, "Easy", 4.2, ["vegetarian", "nut-free", "kosher"], ["fast", "high-protein"], ["cottageCheese", "bread", "cherryTomatoes", "herbs"], [], 12),
  meal("southwest-breakfast-skillet", "Southwest breakfast skillet", "Breakfast", 30, 720, "Medium", 4.4, ["nut-free", "halal"], ["family", "high-protein"], ["eggs", "blackBeans", "peppers", "cheese", "salsa"], ["spicy"], 13),
  meal("salmon-avocado-toast", "Salmon avocado toast", "Breakfast", 12, 610, "Easy", 5.7, ["nut-free", "kosher"], ["fast", "high-protein"], ["salmon", "bread", "avocado", "cottageCheese"], [], 14),
  meal("peanut-banana-power-oats", "Peanut banana power oats", "Breakfast", 8, 680, "Easy", 2.9, ["vegetarian", "gluten-free", "dairy-free"], ["budget", "high-protein"], ["oats", "peanutButter", "bananas", "chia"], ["nuts"], 15),
  meal("tofu-scramble-tacos", "Tofu scramble tacos", "Breakfast", 25, 560, "Easy", 3.3, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["family", "healthy"], ["tofu", "tortillas", "peppers", "salsa", "spinach"], [], 16),
  meal("protein-yogurt-oats", "Protein yogurt oats", "Breakfast", 10, 640, "Easy", 3.5, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "high-protein"], ["greekYogurt", "oats", "berries", "chia"], [], 17),
  meal("breakfast-grain-bowl", "Breakfast grain bowl", "Breakfast", 25, 700, "Medium", 4.2, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["healthy", "variety"], ["quinoa", "eggs", "sweetPotato", "spinach"], [], 18),
  meal("turkey-egg-pita", "Turkey egg pita", "Breakfast", 20, 760, "Easy", 4.8, ["nut-free", "halal"], ["family", "high-protein"], ["turkeySlices", "eggs", "bread", "cheese"], [], 19),
  meal("avocado-chickpea-toast", "Avocado chickpea toast", "Breakfast", 15, 590, "Easy", 3.1, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "fast"], ["chickpeas", "bread", "avocado", "cherryTomatoes"], [], 20),
  meal("cottage-cheese-pancakes", "Cottage cheese pancakes", "Breakfast", 25, 650, "Medium", 3.8, ["vegetarian", "nut-free", "kosher"], ["family", "high-protein"], ["cottageCheese", "eggs", "oats", "berries"], [], 21),
  meal("big-brunch-burritos", "Big brunch burritos", "Breakfast", 35, 930, "Medium", 4.7, ["nut-free", "halal"], ["family", "high-protein"], ["tortillas", "eggs", "groundTurkey", "blackBeans", "cheese", "salsa"], ["spicy"], 22),
  meal("low-carb-turkey-scramble", "Low-carb turkey scramble", "Breakfast", 18, 430, "Easy", 3.9, ["gluten-free", "nut-free", "low-carb", "halal"], ["fast", "high-protein"], ["turkeySlices", "eggs", "spinach", "peppers"], [], 23),
  meal("yogurt-chia-parfait", "Yogurt chia parfait", "Breakfast", 8, 480, "Easy", 3.2, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "healthy"], ["greekYogurt", "berries", "chia", "bananas"], [], 24),
  meal("steak-breakfast-hash", "Steak breakfast hash", "Breakfast", 35, 850, "Medium", 5.6, ["gluten-free", "dairy-free", "nut-free", "halal"], ["high-protein", "family"], ["beef", "potatoes", "eggs", "peppers"], [], 25),
  meal("mediterranean-egg-bowl", "Mediterranean egg bowl", "Breakfast", 18, 540, "Easy", 3.7, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["healthy", "fast"], ["eggs", "chickpeas", "cucumber", "cherryTomatoes"], [], 26),
  meal("loaded-oatmeal-bowl", "Loaded oatmeal bowl", "Breakfast", 12, 720, "Easy", 3.1, ["vegetarian", "gluten-free"], ["budget", "family"], ["oats", "peanutButter", "berries", "bananas", "chia"], ["nuts"], 27),
  meal("chicken-hummus-wrap", "Chicken hummus wrap", "Lunch", 15, 680, "Easy", 4.8, ["nut-free", "halal"], ["fast", "high-protein"], ["chickenBreast", "tortillas", "hummus", "lettuce", "cucumber"], [], 28),
  meal("salmon-pesto-pasta-salad", "Salmon pesto pasta salad", "Lunch", 20, 790, "Easy", 6.2, ["nut-free"], ["high-protein", "variety"], ["salmon", "pasta", "pesto", "cherryTomatoes", "spinach"], [], 29),
  meal("beef-taco-bowl", "Beef taco bowl", "Lunch", 25, 820, "Medium", 5.1, ["gluten-free", "nut-free", "halal"], ["family", "high-protein"], ["beef", "rice", "blackBeans", "salsa", "avocado"], ["spicy"], 30),
  meal("tofu-curry-rice-lunch", "Tofu curry rice lunch", "Lunch", 25, 650, "Easy", 3.5, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"], ["healthy", "budget"], ["tofu", "coconutMilk", "rice", "broccoli"], ["spicy"], 31),
  meal("turkey-avocado-sandwich", "Turkey avocado sandwich", "Lunch", 10, 620, "Easy", 4.5, ["nut-free", "halal"], ["fast", "high-protein"], ["turkeySlices", "bread", "avocado", "lettuce"], [], 32),
  meal("lentil-couscous-bowl", "Lentil couscous bowl", "Lunch", 20, 560, "Easy", 2.9, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget"], ["lentils", "couscous", "cherryTomatoes", "spinach"], [], 33),
  meal("shrimp-noodle-bowl", "Shrimp noodle bowl", "Lunch", 20, 720, "Easy", 5.4, ["dairy-free", "nut-free"], ["fast", "high-protein"], ["shrimp", "noodles", "sesameSauce", "broccoli"], ["shellfish"], 34),
  meal("tuna-melt-plate", "Tuna melt plate", "Lunch", 15, 690, "Easy", 3.9, ["nut-free"], ["fast", "family"], ["tuna", "bread", "cheese", "lettuce"], [], 35),
  meal("greek-chicken-salad", "Greek chicken salad", "Lunch", 20, 520, "Easy", 4.8, ["gluten-free", "nut-free", "halal"], ["healthy", "high-protein"], ["chickenBreast", "lettuce", "cucumber", "cherryTomatoes", "greekYogurt"], [], 12),
  meal("loaded-veggie-burger-lunch", "Loaded veggie burger lunch", "Lunch", 25, 760, "Medium", 3.7, ["vegetarian", "dairy-free", "nut-free", "halal", "kosher"], ["family", "budget"], ["blackBeans", "bread", "avocado", "lettuce", "sweetPotato"], [], 13),
  meal("pork-rice-bowl", "Pork rice bowl", "Lunch", 25, 810, "Medium", 5.2, ["gluten-free", "dairy-free", "nut-free"], ["family", "high-protein"], ["pork", "rice", "broccoli", "sesameSauce"], [], 14),
  meal("white-bean-pasta-lunch", "White bean pasta lunch", "Lunch", 25, 640, "Easy", 3.2, ["vegetarian", "nut-free"], ["budget", "healthy"], ["chickpeas", "pasta", "spinach", "tomatoSauce"], [], 15),
  meal("family-chicken-plate", "Family chicken plate", "Lunch", 20, 900, "Easy", 5.6, ["nut-free", "halal"], ["family", "high-protein"], ["chickenBreast", "potatoes", "broccoli", "cheese"], [], 16),
  meal("avocado-quinoa-power-salad", "Avocado quinoa power salad", "Lunch", 15, 600, "Easy", 4.1, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"], ["healthy", "fast"], ["quinoa", "avocado", "chickpeas", "cucumber"], [], 17),
  meal("mushroom-turkey-lettuce-bowl", "Mushroom turkey lettuce bowl", "Lunch", 20, 530, "Easy", 4.2, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal"], ["healthy", "high-protein"], ["groundTurkey", "mushrooms", "lettuce", "peppers"], ["mushrooms"], 18),
  meal("cottage-tuna-lunch-box", "Cottage tuna lunch box", "Lunch", 10, 580, "Easy", 4.3, ["gluten-free", "nut-free"], ["fast", "high-protein"], ["cottageCheese", "tuna", "cucumber", "cherryTomatoes"], [], 19),
  meal("creamy-pesto-chicken-pasta", "Creamy pesto chicken pasta", "Dinner", 35, 980, "Medium", 5.4, ["nut-free"], ["family", "high-protein"], ["chickenBreast", "pasta", "pesto", "cheese", "spinach"], [], 20),
  meal("steak-and-potatoes-dinner", "Steak and potatoes dinner", "Dinner", 40, 1050, "Medium", 6.4, ["gluten-free", "nut-free"], ["family", "high-protein"], ["beef", "potatoes", "broccoli", "herbs"], [], 21),
  meal("salmon-avocado-rice-bowl", "Salmon avocado rice bowl", "Dinner", 25, 760, "Easy", 6.2, ["gluten-free", "dairy-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["salmon", "rice", "avocado", "cucumber"], [], 22),
  meal("turkey-taco-casserole", "Turkey taco casserole", "Dinner", 40, 920, "Medium", 4.5, ["nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "tortillas", "blackBeans", "cheese", "salsa"], ["spicy"], 23),
  meal("coconut-shrimp-curry", "Coconut shrimp curry", "Dinner", 30, 880, "Medium", 5.8, ["gluten-free", "dairy-free", "nut-free"], ["variety", "high-protein"], ["shrimp", "coconutMilk", "rice", "broccoli"], ["shellfish", "spicy"], 24),
  meal("pork-couscous-platter", "Pork couscous platter", "Dinner", 35, 870, "Medium", 5.1, ["dairy-free", "nut-free"], ["family", "high-protein"], ["pork", "couscous", "peppers", "herbs"], [], 25),
  meal("vegan-ramen-tofu-bowl", "Vegan ramen tofu bowl", "Dinner", 25, 680, "Easy", 3.6, ["vegetarian", "vegan", "dairy-free", "nut-free"], ["fast", "healthy"], ["tofu", "ramen", "spinach", "sesameSauce"], [], 26),
  meal("cod-pesto-gnocchi", "Cod pesto gnocchi", "Dinner", 30, 740, "Medium", 5.2, ["nut-free"], ["variety", "high-protein"], ["cod", "gnocchi", "pesto", "cherryTomatoes"], [], 27),
  meal("beef-bolognese-pasta", "Beef bolognese pasta", "Dinner", 40, 970, "Medium", 5.4, ["nut-free", "halal"], ["family", "high-protein"], ["beef", "pasta", "tomatoSauce", "cheese"], [], 28),
  meal("chicken-tikka-rice-dinner", "Chicken tikka rice dinner", "Dinner", 35, 850, "Medium", 4.9, ["gluten-free", "nut-free", "halal"], ["family", "high-protein"], ["chickenBreast", "tikkaSauce", "rice", "greekYogurt"], ["spicy"], 29),
  meal("cauliflower-lentil-curry", "Cauliflower lentil curry", "Dinner", 35, 620, "Medium", 3.4, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget"], ["lentils", "cauliflower", "coconutMilk", "rice"], ["spicy"], 30),
  meal("salmon-potato-plate", "Salmon potato plate", "Dinner", 35, 820, "Easy", 6.2, ["gluten-free", "dairy-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["salmon", "potatoes", "spinach", "herbs"], [], 31),
  meal("stuffed-pepper-rice-bake", "Stuffed pepper rice bake", "Dinner", 45, 780, "Medium", 4.6, ["gluten-free", "nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "peppers", "rice", "tomatoSauce", "cheese"], [], 32),
  meal("veggie-gnocchi-skillet", "Veggie gnocchi skillet", "Dinner", 25, 720, "Easy", 4.1, ["vegetarian", "nut-free", "kosher"], ["fast", "family"], ["gnocchi", "pesto", "spinach", "mushrooms"], ["mushrooms"], 33),
  meal("chicken-noodle-ramen-dinner", "Chicken noodle ramen dinner", "Dinner", 20, 760, "Easy", 4.2, ["dairy-free", "nut-free", "halal"], ["fast", "family"], ["chickenBreast", "ramen", "eggs", "spinach"], [], 34),
  meal("big-family-taco-night", "Big family taco night", "Dinner", 30, 1100, "Easy", 5.4, ["nut-free", "halal"], ["family", "high-protein"], ["tortillas", "beef", "blackBeans", "cheese", "salsa", "avocado"], ["spicy"], 35),
);

const initialProfile: Profile = {
  zip: "80202",
  people: 4,
  mealsPerWeek: 7,
  mealTypes: ["Breakfast", "Lunch", "Dinner"],
  budget: 150,
  dietary: [],
  avoid: [],
  timeLimit: 45,
  skill: "Medium",
  calories: "Unlimited",
  focus: "variety",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const priceFor = (basePrice: number, storeId: StoreId) => {
  const store = stores.find((candidate) => candidate.id === storeId) ?? stores[0];
  return basePrice * store.factor;
};

const updateList = <T extends string>(items: T[], value: T) =>
  items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];

const matchesDietary = (mealOption: Meal, dietary: string[]) =>
  dietary.every((restriction) => {
    if (restriction === "vegetarian") {
      return mealOption.dietary.includes("vegetarian") || mealOption.dietary.includes("vegan");
    }

    if (restriction === "allergy-aware") {
      return mealOption.avoidTags.length === 0;
    }

    return mealOption.dietary.includes(restriction);
  });

const sortMeals = (options: Meal[], focus: string) => {
  const copy = [...options];

  if (focus === "budget") {
    return copy.sort((a, b) => a.costPerServing - b.costPerServing);
  }

  if (focus === "fast") {
    return copy.sort((a, b) => a.minutes - b.minutes);
  }

  if (focus === "healthy") {
    return copy.sort((a, b) => a.calories - b.calories);
  }

  if (focus === "high-protein" || focus === "family") {
    return copy.sort(
      (a, b) =>
        Number(b.focus.includes(focus)) - Number(a.focus.includes(focus)) ||
        a.costPerServing - b.costPerServing,
    );
  }

  return copy.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title));
};

export default function Home() {
  const [screen, setScreen] = useState<"profile" | "meals" | "groceries" | "sent">("profile");
  const [question, setQuestion] = useState(0);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [activeType, setActiveType] = useState<MealType | "All">("All");
  const [selectedMealIds, setSelectedMealIds] = useState<string[]>([]);
  const [storeFilter, setStoreFilter] = useState<"all" | StoreId>("all");
  const [cartSelection, setCartSelection] = useState<Record<string, StoreId>>({});
  const [checkoutNotice, setCheckoutNotice] = useState(
    "Prototype checkout links are simulated for safe scoring.",
  );

  const selectedMeals = useMemo(
    () => meals.filter((mealOption) => selectedMealIds.includes(mealOption.id)),
    [selectedMealIds],
  );

  const visibleMeals = useMemo(() => {
    const calorieLimit =
      profile.calories === "Unlimited" ? Number.POSITIVE_INFINITY : Number(profile.calories);
    const matching = meals.filter((mealOption) => {
      const mealTypeMatch = profile.mealTypes.includes(mealOption.type);
      const timeMatch = mealOption.minutes <= profile.timeLimit;
      const skillMatch =
        profile.skill === "Go all out" ||
        mealOption.skill === "Easy" ||
        (profile.skill === "Medium" && mealOption.skill !== "Go all out");
      const calorieMatch = mealOption.calories <= calorieLimit;
      const avoidMatch = profile.avoid.every((avoid) => !mealOption.avoidTags.includes(avoid));

      return (
        mealTypeMatch &&
        timeMatch &&
        skillMatch &&
        calorieMatch &&
        avoidMatch &&
        matchesDietary(mealOption, profile.dietary)
      );
    });

    return sortMeals(matching.length >= 6 ? matching : meals, profile.focus);
  }, [profile]);

  const typeMeals = visibleMeals.filter((mealOption) => mealOption.type === activeType);
  const galleryMeals = activeType === "All" ? visibleMeals : typeMeals.length > 0 ? typeMeals : visibleMeals;

  const groceryItems = useMemo(() => {
    const counts = selectedMeals.reduce<Record<string, number>>((current, mealOption) => {
      mealOption.ingredients.forEach((ingredient) => {
        current[ingredient] = (current[ingredient] ?? 0) + 1;
      });
      return current;
    }, {});

    const peopleMultiplier = Math.max(0.75, profile.people / 4);

    return Object.entries(counts)
      .map(([key, count]) => {
        const grocery = groceryCatalog[key];
        const quantity = Math.max(1, grocery.baseQty * count * peopleMultiplier);

        return {
          key,
          name: grocery.name,
          quantity: `${Number.isInteger(quantity) ? quantity : quantity.toFixed(1)} ${grocery.unit}`,
          basePrice: grocery.basePrice * count * peopleMultiplier,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [profile.people, selectedMeals]);

  const cartTotal = groceryItems.reduce((total, item) => {
    const selectedStore = cartSelection[item.key] ?? cheapestStore(item.basePrice);
    return total + priceFor(item.basePrice, selectedStore);
  }, 0);

  const cartBreakdown = stores
    .map((store) => {
      const items = groceryItems.filter(
        (item) => (cartSelection[item.key] ?? cheapestStore(item.basePrice)) === store.id,
      );
      const total = items.reduce((sum, item) => sum + priceFor(item.basePrice, store.id), 0);
      return { ...store, items, total };
    })
    .filter((store) => store.items.length > 0);

  const setProfileValue = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const selectMeal = (id: string) => {
    setSelectedMealIds((current) => {
      if (current.includes(id)) {
        return current.filter((mealId) => mealId !== id);
      }

      if (current.length >= profile.mealsPerWeek) {
        return current;
      }

      return [...current, id];
    });
  };

  const prepareCart = () => {
    const nextCart = groceryItems.reduce<Record<string, StoreId>>((current, item) => {
      current[item.key] = cheapestStore(item.basePrice);
      return current;
    }, {});

    setCartSelection(nextCart);
    setScreen("groceries");
  };

  const autoPickCheapest = () => {
    setCartSelection(
      groceryItems.reduce<Record<string, StoreId>>((current, item) => {
        current[item.key] = cheapestStore(item.basePrice);
        return current;
      }, {}),
    );
  };

  const resetPlan = () => {
    setQuestion(0);
    setSelectedMealIds([]);
    setCartSelection({});
    setCheckoutNotice("Prototype checkout links are simulated for safe scoring.");
    setScreen("profile");
  };

  const progress = screen === "profile" ? 1 : screen === "meals" ? 2 : screen === "groceries" ? 3 : 4;
  const underBudget = profile.budget - cartTotal;

  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="topbar">
          <div>
            <img className="brand-logo" src="/assets/forkcast-logo.svg" alt="ForkCast" />
          </div>
          <div className="zip-pill">
            <span>ZIP</span>
            <strong>{profile.zip}</strong>
          </div>
        </header>

        <Progress current={progress} />

        {screen === "profile" && (
          <ProfileWizard
            question={question}
            setQuestion={setQuestion}
            profile={profile}
            setProfileValue={setProfileValue}
            onComplete={() => {
              setActiveType("All");
              setScreen("meals");
            }}
          />
        )}

        {screen === "meals" && (
          <section className="screen-section">
            <div className="section-heading">
              <button className="ghost-button" onClick={() => setScreen("profile")}>
                Back
              </button>
              <div>
                <p className="eyebrow">{visibleMeals.length} meals match your profile</p>
                <h2>Choose this week&apos;s meals</h2>
              </div>
            </div>

            <div className="meal-toolbar">
              <div className="segmented">
                {(["All", ...profile.mealTypes] as Array<MealType | "All">).map((type) => (
                  <button
                    className={activeType === type ? "active" : ""}
                    key={type}
                    onClick={() => setActiveType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p>
                Select up to {profile.mealsPerWeek} meals. {selectedMealIds.length} selected.
              </p>
            </div>

            <div className="meal-grid">
              {galleryMeals.map((mealOption) => {
                const selected = selectedMealIds.includes(mealOption.id);
                return (
                  <button
                    className={`meal-card ${selected ? "selected" : ""}`}
                    key={mealOption.id}
                    onClick={() => selectMeal(mealOption.id)}
                  >
                    <img src={mealOption.photo} alt="" />
                    <span className="meal-type">{mealOption.type}</span>
                    <div className="meal-card-body">
                      <h3>{mealOption.title}</h3>
                      <p>
                        {mealOption.minutes} min - {mealOption.calories} cal -{" "}
                        {formatCurrency(mealOption.costPerServing)}/serving
                      </p>
                      <div className="tag-row">
                        {mealOption.focus.slice(0, 2).map((tag) => (
                          <span key={tag}>{tag.replace("-", " ")}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="sticky-action">
              <div>
                <strong>{selectedMealIds.length} meals selected</strong>
                <span>
                  Estimated plan cost:{" "}
                  {formatCurrency(
                    selectedMeals.reduce((sum, mealOption) => sum + mealOption.costPerServing * profile.people, 0),
                  )}
                </span>
              </div>
              <button
                className="primary-button"
                disabled={selectedMealIds.length === 0}
                onClick={prepareCart}
              >
                View recipes + shopping list
              </button>
            </div>
          </section>
        )}

        {screen === "groceries" && (
          <section className="screen-section">
            <div className="section-heading">
              <button className="ghost-button" onClick={() => setScreen("meals")}>
                Back
              </button>
              <div>
                <p className="eyebrow">Sample prices near {profile.zip}</p>
                <h2>Shopping list</h2>
              </div>
            </div>

            <div className="selected-recipes">
              {selectedMeals.map((mealOption) => (
                <article key={mealOption.id}>
                  <img src={mealOption.photo} alt="" />
                  <div>
                    <strong>{mealOption.title}</strong>
                    <span>
                      {mealOption.minutes} min - {mealOption.skill}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="store-filter">
              <button
                className={storeFilter === "all" ? "active" : ""}
                onClick={() => setStoreFilter("all")}
              >
                All stores
              </button>
              {stores.map((store) => (
                <button
                  className={storeFilter === store.id ? "active" : ""}
                  key={store.id}
                  onClick={() => setStoreFilter(store.id)}
                >
                  {store.name}
                </button>
              ))}
            </div>

            <div className="shopping-list">
              {groceryItems.map((item) => (
                <div className="shopping-row" key={item.key}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.quantity}</span>
                  </div>
                  <div className="price-buttons">
                    {stores
                      .filter((store) => storeFilter === "all" || storeFilter === store.id)
                      .map((store) => (
                        <button
                          className={cartSelection[item.key] === store.id ? "selected" : ""}
                          key={store.id}
                          onClick={() =>
                            setCartSelection((current) => ({
                              ...current,
                              [item.key]: store.id,
                            }))
                          }
                        >
                          {store.name} {formatCurrency(priceFor(item.basePrice, store.id))}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-panel">
              <div>
                <p className="eyebrow">Your cart breakdown</p>
                {cartBreakdown.length === 0 ? (
                  <span>No items selected yet.</span>
                ) : (
                  <div className="breakdown-list">
                    {cartBreakdown.map((store) => (
                      <span key={store.id}>
                        {store.name}: {store.items.length} items, {formatCurrency(store.total)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="total-box">
                <span>Estimated total</span>
                <strong>{formatCurrency(cartTotal)}</strong>
                <em className={underBudget >= 0 ? "good" : "over"}>
                  {underBudget >= 0
                    ? `${formatCurrency(underBudget)} under budget`
                    : `${formatCurrency(Math.abs(underBudget))} over budget`}
                </em>
              </div>
            </div>

            <div className="button-row">
              <button className="secondary-button" onClick={autoPickCheapest}>
                Auto-pick cheapest
              </button>
              <button className="primary-button" onClick={() => setScreen("sent")}>
                Send to grocery stores
              </button>
            </div>
          </section>
        )}

        {screen === "sent" && (
          <section className="sent-screen">
            <div className="cart-icon">Cart ready</div>
            <h2>Cart sent!</h2>
            <p>
              Your selected items have been prepared for grocery checkout. Open Instacart
              first, or use another store link for pickup and delivery.
            </p>

            <div className="checkout-links">
              <button
                className="primary-link"
                onClick={() => setCheckoutNotice(`Ready to open: ${stores[0].deliveryUrl}`)}
              >
                Open Instacart cart ({groceryItems.length} items, {formatCurrency(cartTotal)})
              </button>
              {cartBreakdown.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setCheckoutNotice(`Ready to open: ${store.deliveryUrl}`)}
                >
                  Open {store.name} cart ({store.items.length} items, {formatCurrency(store.total)})
                </button>
              ))}
            </div>
            <p className="checkout-note">{checkoutNotice}</p>

            <div className="final-total">
              <span>Estimated total: {formatCurrency(cartTotal)}</span>
              <strong className={underBudget >= 0 ? "good" : "over"}>
                {underBudget >= 0
                  ? `${formatCurrency(underBudget)} under budget`
                  : `${formatCurrency(Math.abs(underBudget))} over budget`}
              </strong>
            </div>

            <button className="ghost-button" onClick={resetPlan}>
              Plan next week
            </button>
          </section>
        )}
      </div>
    </main>
  );

  function cheapestStore(basePrice: number): StoreId {
    return stores.reduce((best, store) =>
      priceFor(basePrice, store.id) < priceFor(basePrice, best.id) ? store : best,
    ).id;
  }
}

function Progress({ current }: { current: number }) {
  return (
    <div className="progress" aria-label={`Step ${current} of 4`}>
      {[1, 2, 3, 4].map((step) => (
        <span className={step <= current ? "complete" : ""} key={step} />
      ))}
    </div>
  );
}

function ProfileWizard({
  question,
  setQuestion,
  profile,
  setProfileValue,
  onComplete,
}: {
  question: number;
  setQuestion: (value: number | ((current: number) => number)) => void;
  profile: Profile;
  setProfileValue: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  onComplete: () => void;
}) {
  const questions = [
    {
      eyebrow: "Location",
      title: "What ZIP code should we use for grocery prices?",
      helper: "This prototype uses the ZIP to label nearby sample store pricing.",
      content: (
        <input
          className="large-input"
          inputMode="numeric"
          maxLength={5}
          onChange={(event) => setProfileValue("zip", event.target.value)}
          value={profile.zip}
        />
      ),
    },
    {
      eyebrow: "Household",
      title: "How many people are you cooking for?",
      helper: "Ingredient quantities and weekly totals scale with your answer.",
      content: (
        <Stepper
          min={1}
          max={12}
          value={profile.people}
          onChange={(value) => setProfileValue("people", value)}
          suffix="people"
        />
      ),
    },
    {
      eyebrow: "Weekly plan",
      title: "How many meals do you need, and which meal types?",
      helper: "Choose breakfast, lunch, dinner, or any combination.",
      content: (
        <div className="stack">
          <Stepper
            min={1}
            max={21}
            value={profile.mealsPerWeek}
            onChange={(value) => setProfileValue("mealsPerWeek", value)}
            suffix="meals"
          />
          <div className="choice-grid three">
            {(["Breakfast", "Lunch", "Dinner"] as MealType[]).map((type) => (
              <button
                className={profile.mealTypes.includes(type) ? "choice selected" : "choice"}
                key={type}
                onClick={() => {
                  const next = updateList(profile.mealTypes, type);
                  setProfileValue("mealTypes", next.length > 0 ? next : [type]);
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      eyebrow: "Budget",
      title: "What is your weekly grocery budget?",
      helper: "The cart screen will show whether your plan is under or over budget.",
      content: (
        <label className="money-input">
          <span>$</span>
          <input
            inputMode="numeric"
            onChange={(event) => setProfileValue("budget", Number(event.target.value))}
            value={profile.budget}
          />
        </label>
      ),
    },
    {
      eyebrow: "Dietary restrictions",
      title: "Any dietary needs, allergies, or lactose intolerance?",
      helper: "Select as many as apply. You can leave this blank.",
      content: (
        <div className="choice-grid">
          {dietaryOptions.map((option) => (
            <button
              className={profile.dietary.includes(option.id) ? "choice selected" : "choice"}
              key={option.id}
              onClick={() => setProfileValue("dietary", updateList(profile.dietary, option.id))}
            >
              {option.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "Dislikes",
      title: "Anything you want to avoid?",
      helper: "These remove meals with the matching ingredient or flavor profile.",
      content: (
        <div className="choice-grid">
          {avoidOptions.map((option) => (
            <button
              className={profile.avoid.includes(option.id) ? "choice selected" : "choice"}
              key={option.id}
              onClick={() => setProfileValue("avoid", updateList(profile.avoid, option.id))}
            >
              {option.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "Cooking time",
      title: "How much time can each meal take?",
      helper: "Meals over this time are hidden from your gallery.",
      content: (
        <div className="range-block">
          <input
            max={60}
            min={10}
            onChange={(event) => setProfileValue("timeLimit", Number(event.target.value))}
            step={5}
            type="range"
            value={profile.timeLimit}
          />
          <strong>{profile.timeLimit} min</strong>
        </div>
      ),
    },
    {
      eyebrow: "Cooking skill",
      title: "How comfortable are you in the kitchen?",
      helper: "This keeps the recipes aligned with the amount of effort you want.",
      content: (
        <div className="choice-grid three">
          {(["Easy", "Medium", "Go all out"] as Skill[]).map((skill) => (
            <button
              className={profile.skill === skill ? "choice selected" : "choice"}
              key={skill}
              onClick={() => setProfileValue("skill", skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "Calories",
      title: "Do you have a calorie limit per meal?",
      helper: "Pick a target or keep every meal available.",
      content: (
        <div className="choice-grid">
          {["500", "650", "800", "1000", "1500", "Unlimited"].map((calories) => (
            <button
              className={profile.calories === calories ? "choice selected" : "choice"}
              key={calories}
              onClick={() => setProfileValue("calories", calories)}
            >
              {calories === "Unlimited" ? calories : `Under ${calories}`}
            </button>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "Recommendation style",
      title: "What should the app optimize for first?",
      helper: "This controls how your visual meal gallery is sorted.",
      content: (
        <div className="choice-grid">
          {focusOptions.map((option) => (
            <button
              className={profile.focus === option.id ? "choice selected" : "choice"}
              key={option.id}
              onClick={() => setProfileValue("focus", option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ),
    },
  ];

  const active = questions[question];
  const canContinue = profile.zip.length >= 5 && profile.mealTypes.length > 0;

  return (
    <section className="profile-layout">
      <div className="question-card">
        <p className="eyebrow">
          {active.eyebrow} - question {question + 1} of {questions.length}
        </p>
        <h2>{active.title}</h2>
        <p>{active.helper}</p>
        <div className="question-content">{active.content}</div>
        <div className="wizard-actions">
          <button
            className="ghost-button"
            disabled={question === 0}
            onClick={() => setQuestion((current) => Math.max(0, current - 1))}
          >
            Back
          </button>
          <button
            className="primary-button"
            disabled={!canContinue}
            onClick={() => {
              if (question === questions.length - 1) {
                onComplete();
              } else {
                setQuestion((current) => current + 1);
              }
            }}
          >
            {question === questions.length - 1 ? "Build my meal plan" : "Continue"}
          </button>
        </div>
      </div>

      <aside className="profile-summary">
        <p className="eyebrow">Current profile</p>
        <h3>{profile.people} people, {profile.mealsPerWeek} meals</h3>
        <dl>
          <div>
            <dt>Budget</dt>
            <dd>{formatCurrency(profile.budget)} / week</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{profile.timeLimit} min or less</dd>
          </div>
          <div>
            <dt>Meal types</dt>
            <dd>{profile.mealTypes.join(", ")}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{focusOptions.find((option) => option.id === profile.focus)?.label}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}

function Stepper({
  min,
  max,
  value,
  onChange,
  suffix,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  suffix: string;
}) {
  return (
    <div className="stepper">
      <button onClick={() => onChange(Math.max(min, value - 1))}>-</button>
      <strong>
        {value} <span>{suffix}</span>
      </strong>
      <button onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

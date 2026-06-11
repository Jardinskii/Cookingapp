const stores = [
  ["instacart", "Instacart", 1.07, "https://www.instacart.com/store"],
  ["walmart", "Walmart", 0.92, "https://www.walmart.com/cp/grocery/976759"],
  ["kroger", "Kroger", 1, "https://www.kroger.com/"],
  ["safeway", "Safeway", 1.04, "https://www.safeway.com/"],
  ["costco", "Costco", 0.88, "https://www.costco.com/grocery-household.html"],
  ["target", "Target", 1.02, "https://www.target.com/c/grocery/-/N-5xt1a"],
].map(([id, name, factor, url]) => ({ id, name, factor, url }));

const photos = [
  "assets/meals/meal-01.jpg",
  "assets/meals/meal-02.jpg",
  "assets/meals/meal-03.jpg",
  "assets/meals/meal-04.jpg",
  "assets/meals/meal-05.jpg",
  "assets/meals/meal-06.jpg",
  "assets/meals/meal-07.jpg",
  "assets/meals/meal-08.jpg",
  "assets/meals/meal-09.jpg",
  "assets/meals/meal-10.jpg",
  "assets/meals/meal-11.jpg",
  "assets/meals/meal-12.jpg",
];

const catalog = {
  eggs: ["Large eggs", "dozen", 1, 4.49],
  greekYogurt: ["Greek yogurt", "32 oz tub", 1, 5.49],
  oats: ["Rolled oats", "canister", 1, 3.99],
  berries: ["Mixed berries", "pint", 1, 4.99],
  spinach: ["Baby spinach", "5 oz bag", 1, 3.79],
  tortillas: ["Tortillas", "pack", 1, 3.49],
  chickenBreast: ["Chicken breast", "lb", 3, 11.49],
  salmon: ["Salmon fillets", "lb", 1.5, 14.99],
  groundTurkey: ["Ground turkey", "lb", 1, 5.99],
  turkeySlices: ["Turkey slices", "pack", 1, 6.49],
  blackBeans: ["Canned black beans", "can", 2, 2.58],
  rice: ["Brown rice", "lb", 2, 4.19],
  quinoa: ["Quinoa", "lb", 1, 6.49],
  pasta: ["Whole wheat pasta", "box", 1, 2.49],
  tofu: ["Extra firm tofu", "block", 1, 2.99],
  broccoli: ["Broccoli crowns", "lb", 1.5, 3.99],
  chickpeas: ["Chickpeas", "can", 2, 2.78],
  lentils: ["Dry lentils", "lb", 1, 2.99],
  shrimp: ["Shrimp", "lb", 1, 9.99],
  avocado: ["Avocados", "ct", 3, 4.5],
  tuna: ["Tuna", "can", 2, 3.98],
  cucumber: ["Cucumbers", "ct", 2, 1.98],
  lettuce: ["Romaine lettuce", "head", 1, 2.49],
  cheese: ["Shredded cheese", "bag", 1, 3.99],
  mushrooms: ["Mushrooms", "8 oz pack", 1, 3.49],
  peppers: ["Bell peppers", "ct", 3, 4.47],
  sweetPotato: ["Sweet potatoes", "lb", 2, 3.58],
  beef: ["Lean beef", "lb", 1, 7.99],
  cod: ["Cod fillets", "lb", 1.25, 10.49],
  potatoes: ["Baby potatoes", "lb", 2, 4.49],
  pork: ["Pork tenderloin", "lb", 1.5, 8.99],
  pesto: ["Basil pesto", "jar", 1, 4.79],
  gnocchi: ["Gnocchi", "pack", 1, 3.49],
  cauliflower: ["Cauliflower", "head", 1, 3.99],
  coconutMilk: ["Coconut milk", "can", 1, 2.99],
  ramen: ["Ramen noodles", "pack", 2, 3.49],
  noodles: ["Rice noodles", "pack", 1, 3.69],
  couscous: ["Couscous", "box", 1, 3.29],
  hummus: ["Hummus", "tub", 1, 4.29],
  bread: ["Whole grain bread", "loaf", 1, 4.49],
  peanutButter: ["Peanut butter", "jar", 1, 3.99],
  chia: ["Chia seeds", "bag", 1, 6.99],
  bananas: ["Bananas", "bunch", 1, 1.89],
  cottageCheese: ["Cottage cheese", "tub", 1, 4.49],
  herbs: ["Fresh herb bundle", "bunch", 1, 2.49],
  tikkaSauce: ["Tikka simmer sauce", "jar", 1, 4.99],
  salsa: ["Salsa", "jar", 1, 3.49],
  cilantro: ["Cilantro", "bunch", 1, 1.29],
  sesameSauce: ["Sesame teriyaki sauce", "bottle", 1, 4.29],
  tomatoSauce: ["Tomato sauce", "jar", 1, 3.29],
  cherryTomatoes: ["Cherry tomatoes", "pint", 1, 3.29],
};

function makeMeal(id, title, type, minutes, calories, skill, cost, dietary, focus, ingredients, avoid = [], photo = 0) {
  return { id, title, type, minutes, calories, skill, cost, dietary, focus, ingredients, avoid, photo: photos[photo % photos.length] };
}

const meals = [
  makeMeal("greek-yogurt-parfait", "Greek yogurt parfait", "Breakfast", 10, 310, "Easy", 2.8, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "healthy", "budget"], ["greekYogurt", "berries", "chia"], [], 10),
  makeMeal("veggie-egg-scramble", "Veggie egg scramble", "Breakfast", 15, 360, "Easy", 3.2, ["vegetarian", "gluten-free", "dairy-free", "nut-free", "low-carb", "halal", "kosher"], ["fast", "healthy", "high-protein"], ["eggs", "spinach", "peppers"], [], 11),
  makeMeal("overnight-oats", "Berry overnight oats", "Breakfast", 8, 340, "Easy", 2.1, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "budget", "healthy"], ["oats", "berries", "greekYogurt"], [], 3),
  makeMeal("turkey-breakfast-tacos", "Turkey breakfast tacos", "Breakfast", 20, 440, "Easy", 3.9, ["nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "eggs", "tortillas", "salsa"], [], 9),
  makeMeal("smoothie-bowl", "Green smoothie bowl", "Breakfast", 10, 390, "Easy", 3.4, ["vegetarian", "gluten-free", "dairy-free", "nut-free"], ["fast", "healthy"], ["bananas", "spinach", "berries", "chia"], [], 5),
  makeMeal("avocado-toast-eggs", "Avocado toast with eggs", "Breakfast", 15, 420, "Easy", 3.8, ["vegetarian", "nut-free", "kosher"], ["fast", "healthy"], ["bread", "avocado", "eggs"], [], 11),
  makeMeal("cottage-berry-bowl", "Cottage cheese berry bowl", "Breakfast", 8, 330, "Easy", 3.1, ["vegetarian", "gluten-free", "nut-free", "low-carb", "kosher"], ["fast", "high-protein"], ["cottageCheese", "berries", "chia"], [], 10),
  makeMeal("protein-pancakes", "Banana protein pancakes", "Breakfast", 25, 470, "Medium", 3.6, ["vegetarian", "nut-free", "kosher"], ["family", "high-protein"], ["bananas", "eggs", "oats", "greekYogurt"], [], 3),
  makeMeal("tofu-breakfast-hash", "Tofu breakfast hash", "Breakfast", 25, 360, "Easy", 3.2, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget"], ["tofu", "potatoes", "peppers", "spinach"], [], 15),
  makeMeal("quinoa-breakfast-bowl", "Quinoa breakfast bowl", "Breakfast", 20, 410, "Easy", 3.5, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["quinoa", "eggs", "spinach"], [], 0),
  makeMeal("peanut-chia-oats", "Peanut butter chia oats", "Breakfast", 8, 430, "Easy", 2.6, ["vegetarian", "gluten-free", "dairy-free"], ["fast", "budget"], ["oats", "peanutButter", "chia", "bananas"], ["nuts"], 5),
  makeMeal("apple-oatmeal", "Apple cinnamon oatmeal", "Breakfast", 12, 320, "Easy", 2.2, ["vegetarian", "vegan", "dairy-free", "nut-free", "kosher"], ["fast", "budget", "family"], ["oats", "bananas", "chia"], [], 3),
  makeMeal("salmon-bagel-plate", "Salmon breakfast plate", "Breakfast", 12, 460, "Easy", 5.2, ["nut-free", "kosher"], ["high-protein", "fast"], ["salmon", "bread", "cottageCheese"], [], 6),
  makeMeal("breakfast-burrito", "Freezer breakfast burrito", "Breakfast", 30, 510, "Medium", 3.8, ["nut-free", "halal"], ["family", "budget"], ["tortillas", "eggs", "blackBeans", "cheese", "salsa"], [], 9),
  makeMeal("mushroom-frittata", "Mushroom spinach frittata", "Breakfast", 35, 390, "Medium", 3.7, ["vegetarian", "gluten-free", "nut-free", "low-carb", "kosher"], ["healthy", "high-protein"], ["eggs", "mushrooms", "spinach", "cheese"], ["mushrooms"], 11),
  makeMeal("egg-muffins", "Low-carb egg muffins", "Breakfast", 25, 280, "Easy", 3.1, ["gluten-free", "nut-free", "low-carb", "halal", "kosher"], ["healthy", "fast", "high-protein"], ["eggs", "spinach", "turkeySlices"], [], 11),
  makeMeal("tropical-yogurt-bowl", "Tropical yogurt bowl", "Breakfast", 10, 350, "Easy", 3, ["vegetarian", "gluten-free", "nut-free", "kosher"], ["fast", "healthy"], ["greekYogurt", "bananas", "chia"], [], 5),
  makeMeal("greek-grain-bowl", "Greek grain bowl", "Lunch", 15, 380, "Easy", 4.1, ["vegetarian", "nut-free", "kosher"], ["fast", "healthy", "variety"], ["quinoa", "chickpeas", "cherryTomatoes", "greekYogurt"], [], 0),
  makeMeal("chicken-caesar-wrap", "Chicken Caesar wrap", "Lunch", 20, 520, "Easy", 4.8, ["nut-free", "halal"], ["family", "high-protein"], ["chickenBreast", "tortillas", "lettuce", "cheese"], [], 8),
  makeMeal("lentil-soup", "Lentil vegetable soup", "Lunch", 30, 340, "Easy", 2.7, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "healthy"], ["lentils", "spinach", "tomatoSauce", "herbs"], [], 2),
  makeMeal("turkey-lettuce-cups", "Turkey lettuce cups", "Lunch", 20, 360, "Easy", 4.2, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal"], ["fast", "high-protein"], ["groundTurkey", "lettuce", "peppers", "sesameSauce"], [], 1),
  makeMeal("black-bean-tacos", "Black bean tacos", "Lunch", 20, 360, "Easy", 2.5, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "family", "fast"], ["blackBeans", "tortillas", "salsa", "avocado"], [], 9),
  makeMeal("tuna-rice-bowl", "Tuna rice bowl", "Lunch", 15, 430, "Easy", 3.4, ["dairy-free", "nut-free", "halal", "kosher"], ["fast", "high-protein", "budget"], ["tuna", "rice", "avocado", "cucumber"], [], 6),
  makeMeal("chickpea-pita", "Chickpea salad pita", "Lunch", 15, 390, "Easy", 2.9, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["fast", "budget", "healthy"], ["chickpeas", "bread", "lettuce", "cherryTomatoes"], [], 1),
  makeMeal("veggie-sushi-bowl", "Veggie sushi bowl", "Lunch", 25, 420, "Medium", 3.7, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"], ["healthy", "variety"], ["rice", "avocado", "tofu", "cucumber"], [], 0),
  makeMeal("chicken-quinoa-salad", "Chicken quinoa salad", "Lunch", 20, 470, "Easy", 4.9, ["gluten-free", "dairy-free", "nut-free", "halal"], ["healthy", "high-protein", "fast"], ["chickenBreast", "quinoa", "spinach", "cherryTomatoes"], [], 8),
  makeMeal("tofu-noodle-salad", "Tofu noodle salad", "Lunch", 25, 440, "Easy", 3.5, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal"], ["healthy", "variety"], ["tofu", "noodles", "spinach", "sesameSauce"], [], 7),
  makeMeal("caprese-pesto-sandwich", "Caprese pesto sandwich", "Lunch", 15, 500, "Easy", 3.8, ["vegetarian", "nut-free", "kosher"], ["fast", "family"], ["bread", "pesto", "cheese", "cherryTomatoes"], [], 4),
  makeMeal("shrimp-avocado-salad", "Shrimp avocado salad", "Lunch", 20, 410, "Easy", 5.8, ["gluten-free", "dairy-free", "nut-free", "low-carb"], ["healthy", "high-protein", "fast"], ["shrimp", "avocado", "lettuce", "cherryTomatoes"], ["shellfish"], 16),
  makeMeal("bean-sweet-potato-chili", "Bean and sweet potato chili", "Lunch", 35, 430, "Medium", 2.9, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "family", "healthy"], ["blackBeans", "sweetPotato", "tomatoSauce", "salsa"], [], 2),
  makeMeal("hummus-veggie-box", "Hummus veggie lunch box", "Lunch", 10, 360, "Easy", 3.1, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["fast", "healthy"], ["hummus", "peppers", "bread", "cherryTomatoes"], [], 1),
  makeMeal("salmon-salad-bowl", "Salmon salad bowl", "Lunch", 20, 470, "Easy", 6.1, ["gluten-free", "dairy-free", "nut-free", "low-carb", "kosher"], ["healthy", "high-protein"], ["salmon", "lettuce", "avocado", "cherryTomatoes"], [], 6),
  makeMeal("lemon-herb-chicken", "Lemon herb chicken", "Dinner", 25, 420, "Easy", 4.6, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal", "kosher"], ["fast", "high-protein", "family"], ["chickenBreast", "potatoes", "broccoli", "herbs"], [], 15),
  makeMeal("sheet-pan-salmon", "Sheet pan salmon", "Dinner", 25, 440, "Easy", 6.4, ["gluten-free", "dairy-free", "nut-free", "low-carb", "kosher"], ["fast", "healthy", "high-protein"], ["salmon", "sweetPotato", "broccoli", "herbs"], [], 6),
  makeMeal("turkey-bolognese", "Turkey bolognese", "Dinner", 35, 510, "Medium", 4.1, ["nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "pasta", "tomatoSauce", "spinach"], [], 13),
  makeMeal("chicken-tikka", "Chicken tikka rice bowls", "Dinner", 40, 480, "Medium", 4.7, ["gluten-free", "nut-free", "halal"], ["family", "high-protein"], ["chickenBreast", "tikkaSauce", "rice", "greekYogurt"], ["spicy"], 14),
  makeMeal("veggie-stir-fry", "Veggie stir fry", "Dinner", 20, 340, "Easy", 3.1, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["fast", "healthy", "budget"], ["tofu", "broccoli", "peppers", "rice", "sesameSauce"], [], 7),
  makeMeal("white-bean-soup", "White bean soup", "Dinner", 30, 310, "Easy", 2.8, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "healthy"], ["chickpeas", "spinach", "tomatoSauce", "herbs"], [], 2),
  makeMeal("salmon-quinoa", "Salmon quinoa plate", "Dinner", 30, 520, "Medium", 6.5, ["gluten-free", "dairy-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["salmon", "quinoa", "spinach", "herbs"], [], 6),
  makeMeal("beef-broccoli", "Beef and broccoli", "Dinner", 25, 530, "Medium", 5.2, ["dairy-free", "nut-free", "low-carb", "halal", "kosher"], ["fast", "high-protein", "family"], ["beef", "broccoli", "rice", "sesameSauce"], [], 15),
  makeMeal("cauliflower-curry", "Cauliflower chickpea curry", "Dinner", 30, 450, "Medium", 3.3, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget", "variety"], ["cauliflower", "chickpeas", "coconutMilk", "rice"], ["spicy"], 14),
  makeMeal("shrimp-fajita-bowls", "Shrimp fajita bowls", "Dinner", 25, 460, "Easy", 5.9, ["gluten-free", "dairy-free", "nut-free"], ["fast", "high-protein"], ["shrimp", "peppers", "rice", "salsa"], ["shellfish", "spicy"], 16),
  makeMeal("turkey-meatballs", "Turkey meatballs", "Dinner", 35, 490, "Medium", 4.2, ["nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "pasta", "tomatoSauce", "cheese"], [], 13),
  makeMeal("chicken-fajita-skillet", "Chicken fajita skillet", "Dinner", 25, 430, "Easy", 4.4, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "peppers", "salsa", "avocado"], ["spicy"], 9),
  makeMeal("pork-tenderloin", "Pork tenderloin dinner", "Dinner", 40, 540, "Medium", 5.4, ["gluten-free", "dairy-free", "nut-free", "low-carb"], ["family", "high-protein"], ["pork", "potatoes", "broccoli", "herbs"], [], 15),
  makeMeal("tofu-green-curry", "Tofu green curry", "Dinner", 35, 470, "Medium", 3.6, ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"], ["healthy", "variety"], ["tofu", "coconutMilk", "broccoli", "rice"], ["spicy"], 14),
  makeMeal("black-bean-enchilada", "Black bean enchilada skillet", "Dinner", 30, 480, "Easy", 3.2, ["vegetarian", "nut-free", "halal", "kosher"], ["family", "budget"], ["blackBeans", "tortillas", "cheese", "salsa"], ["spicy"], 9),
  makeMeal("miso-salmon", "Miso salmon rice bowls", "Dinner", 30, 510, "Medium", 6.3, ["dairy-free", "nut-free", "kosher"], ["healthy", "high-protein"], ["salmon", "rice", "broccoli", "sesameSauce"], [], 6),
  makeMeal("lentil-bolognese", "Lentil bolognese", "Dinner", 35, 440, "Medium", 2.9, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["budget", "family", "healthy"], ["lentils", "pasta", "tomatoSauce", "spinach"], [], 13),
  makeMeal("greek-chicken-pitas", "Greek chicken pitas", "Dinner", 25, 490, "Easy", 4.6, ["nut-free", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "bread", "greekYogurt", "cherryTomatoes"], [], 4),
  makeMeal("pesto-gnocchi", "Pesto veggie gnocchi", "Dinner", 25, 560, "Easy", 4.1, ["vegetarian", "nut-free", "kosher"], ["fast", "family"], ["gnocchi", "pesto", "spinach", "cherryTomatoes"], [], 13),
  makeMeal("chicken-noodle-soup", "Chicken noodle soup", "Dinner", 35, 380, "Easy", 3.8, ["dairy-free", "nut-free", "halal"], ["family", "healthy", "budget"], ["chickenBreast", "noodles", "spinach", "herbs"], [], 2),
  makeMeal("veggie-burgers", "Black bean veggie burgers", "Dinner", 30, 520, "Medium", 3.4, ["vegetarian", "dairy-free", "nut-free", "halal", "kosher"], ["family", "budget"], ["blackBeans", "bread", "lettuce", "avocado"], [], 17),
  makeMeal("teriyaki-chicken", "Teriyaki chicken bowls", "Dinner", 25, 540, "Easy", 4.5, ["dairy-free", "nut-free", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "rice", "broccoli", "sesameSauce"], [], 15),
  makeMeal("cod-potatoes", "Cod with herbed potatoes", "Dinner", 30, 430, "Easy", 5.6, ["gluten-free", "dairy-free", "nut-free", "low-carb", "kosher"], ["healthy", "high-protein"], ["cod", "potatoes", "spinach", "herbs"], [], 6),
  makeMeal("steak-taco-salad", "Steak taco salad", "Dinner", 25, 500, "Easy", 5.7, ["gluten-free", "dairy-free", "nut-free", "low-carb", "halal"], ["fast", "high-protein"], ["beef", "lettuce", "salsa", "avocado"], ["spicy"], 1),
  makeMeal("spaghetti-squash-turkey", "Turkey spaghetti squash bake", "Dinner", 45, 460, "Go all out", 4.4, ["gluten-free", "nut-free", "low-carb", "halal"], ["healthy", "family", "high-protein"], ["groundTurkey", "tomatoSauce", "cheese", "spinach"], [], 13),
  makeMeal("sesame-tofu-rice", "Sesame tofu rice bowls", "Dinner", 25, 470, "Easy", 3.5, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal"], ["fast", "healthy"], ["tofu", "rice", "broccoli", "sesameSauce"], [], 7),
  makeMeal("honey-garlic-chicken", "Honey garlic chicken", "Dinner", 25, 520, "Easy", 4.2, ["dairy-free", "nut-free", "halal"], ["fast", "family", "high-protein"], ["chickenBreast", "rice", "broccoli", "herbs"], [], 15),
  makeMeal("roasted-veggie-couscous", "Roasted veggie couscous", "Dinner", 30, 410, "Easy", 3.1, ["vegetarian", "vegan", "dairy-free", "nut-free", "halal", "kosher"], ["healthy", "budget"], ["couscous", "chickpeas", "peppers", "spinach"], [], 0),
  makeMeal("stuffed-peppers", "Turkey stuffed peppers", "Dinner", 40, 480, "Medium", 4.5, ["gluten-free", "nut-free", "halal"], ["family", "high-protein"], ["groundTurkey", "peppers", "rice", "tomatoSauce"], [], 15),
  makeMeal("ramen-eggs", "Easy ramen eggs bowl", "Dinner", 20, 450, "Easy", 2.8, ["vegetarian", "dairy-free", "nut-free"], ["fast", "budget"], ["ramen", "eggs", "spinach", "sesameSauce"], [], 7),
];

const dietaryOptions = [
  ["vegetarian", "Vegetarian"],
  ["vegan", "Vegan"],
  ["gluten-free", "Gluten-free"],
  ["dairy-free", "Dairy-free / lactose intolerant"],
  ["nut-free", "Nut-free"],
  ["low-carb", "Low-carb"],
  ["halal", "Halal"],
  ["kosher", "Kosher"],
  ["allergy-aware", "Allergy-aware"],
];

const avoidOptions = [
  ["shellfish", "Shellfish"],
  ["nuts", "Nuts"],
  ["mushrooms", "Mushrooms"],
  ["spicy", "Spicy"],
  ["cilantro", "Cilantro"],
];

const focusOptions = [
  ["budget", "Spend less"],
  ["healthy", "Healthy"],
  ["fast", "Fast"],
  ["high-protein", "High protein"],
  ["family", "Family-friendly"],
  ["variety", "Variety"],
];

const state = {
  screen: "profile",
  question: 0,
  activeType: "All",
  storeFilter: "all",
  selectedMeals: [],
  cart: {},
  profile: {
    zip: "80202",
    people: 4,
    mealsPerWeek: 7,
    mealTypes: ["Breakfast", "Lunch", "Dinner"],
    budget: 150,
    dietary: [],
    avoid: [],
    timeLimit: 45,
    skill: "Medium",
    calories: "No limit",
    focus: "variety",
  },
};

const app = document.querySelector("#app");
const progress = document.querySelector("#progress");
const zipDisplay = document.querySelector("#zip-display");

function currency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function priceFor(base, storeId) {
  return base * stores.find((store) => store.id === storeId).factor;
}

function cheapestStore(base) {
  return stores.reduce((best, store) => (priceFor(base, store.id) < priceFor(base, best.id) ? store : best)).id;
}

function toggle(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function dietaryMatch(meal, dietary) {
  return dietary.every((restriction) => {
    if (restriction === "vegetarian") return meal.dietary.includes("vegetarian") || meal.dietary.includes("vegan");
    if (restriction === "allergy-aware") return meal.avoid.length === 0;
    return meal.dietary.includes(restriction);
  });
}

function visibleMeals() {
  const profile = state.profile;
  const calorieLimit = profile.calories === "No limit" ? Infinity : Number(profile.calories);
  const filtered = meals.filter((meal) => {
    const skillMatch =
      profile.skill === "Go all out" ||
      meal.skill === "Easy" ||
      (profile.skill === "Medium" && meal.skill !== "Go all out");

    return (
      profile.mealTypes.includes(meal.type) &&
      meal.minutes <= profile.timeLimit &&
      meal.calories <= calorieLimit &&
      skillMatch &&
      profile.avoid.every((avoid) => !meal.avoid.includes(avoid)) &&
      dietaryMatch(meal, profile.dietary)
    );
  });

  const list = filtered.length >= 6 ? filtered : meals;
  return list.sort((a, b) => {
    if (profile.focus === "budget") return a.cost - b.cost;
    if (profile.focus === "fast") return a.minutes - b.minutes;
    if (profile.focus === "healthy") return a.calories - b.calories;
    if (profile.focus === "high-protein" || profile.focus === "family") {
      return Number(b.focus.includes(profile.focus)) - Number(a.focus.includes(profile.focus)) || a.cost - b.cost;
    }
    return a.type.localeCompare(b.type) || a.title.localeCompare(b.title);
  });
}

function selectedMealObjects() {
  return meals.filter((meal) => state.selectedMeals.includes(meal.id));
}

function groceries() {
  const counts = {};
  selectedMealObjects().forEach((meal) => {
    meal.ingredients.forEach((key) => {
      counts[key] = (counts[key] || 0) + 1;
    });
  });

  const peopleFactor = Math.max(0.75, state.profile.people / 4);
  return Object.entries(counts)
    .map(([key, count]) => {
      const [name, unit, qty, basePrice] = catalog[key];
      const quantity = Math.max(1, qty * count * peopleFactor);
      return {
        key,
        name,
        unit,
        quantity: `${Number.isInteger(quantity) ? quantity : quantity.toFixed(1)} ${unit}`,
        base: basePrice * count * peopleFactor,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function cartTotal(items = groceries()) {
  return items.reduce((sum, item) => sum + priceFor(item.base, state.cart[item.key] || cheapestStore(item.base)), 0);
}

function cartBreakdown(items = groceries()) {
  return stores
    .map((store) => {
      const storeItems = items.filter((item) => (state.cart[item.key] || cheapestStore(item.base)) === store.id);
      return {
        ...store,
        items: storeItems,
        total: storeItems.reduce((sum, item) => sum + priceFor(item.base, store.id), 0),
      };
    })
    .filter((store) => store.items.length);
}

function setProgress(step) {
  progress.setAttribute("aria-label", `Step ${step} of 4`);
  progress.innerHTML = [1, 2, 3, 4]
    .map((item) => `<span class="${item <= step ? "complete" : ""}"></span>`)
    .join("");
}

function render() {
  zipDisplay.textContent = state.profile.zip || "-----";
  setProgress(state.screen === "profile" ? 1 : state.screen === "meals" ? 2 : state.screen === "groceries" ? 3 : 4);

  if (state.screen === "profile") renderProfile();
  if (state.screen === "meals") renderMeals();
  if (state.screen === "groceries") renderGroceries();
  if (state.screen === "sent") renderSent();
}

function renderProfile() {
  const questions = [
    {
      eyebrow: "Location",
      title: "What ZIP code should we use for grocery prices?",
      helper: "This prototype uses the ZIP to label nearby sample store pricing.",
      content: `<input class="large-input" data-input="zip" inputmode="numeric" maxlength="5" value="${state.profile.zip}">`,
    },
    {
      eyebrow: "Household",
      title: "How many people are you cooking for?",
      helper: "Ingredient quantities and weekly totals scale with your answer.",
      content: stepper("people", state.profile.people, "people", 1, 12),
    },
    {
      eyebrow: "Weekly plan",
      title: "How many meals do you need, and which meal types?",
      helper: "Choose breakfast, lunch, dinner, or any combination.",
      content: `
        <div class="stack">
          ${stepper("mealsPerWeek", state.profile.mealsPerWeek, "meals", 1, 21)}
          <div class="choice-grid three">
            ${["Breakfast", "Lunch", "Dinner"].map((type) => choice(type, state.profile.mealTypes.includes(type), "meal-type")).join("")}
          </div>
        </div>
      `,
    },
    {
      eyebrow: "Budget",
      title: "What is your weekly grocery budget?",
      helper: "The cart screen will show whether your plan is under or over budget.",
      content: `<label class="money-input"><span>$</span><input data-input="budget" inputmode="numeric" value="${state.profile.budget}"></label>`,
    },
    {
      eyebrow: "Dietary restrictions",
      title: "Any dietary needs, allergies, or lactose intolerance?",
      helper: "Select as many as apply. You can leave this blank.",
      content: `<div class="choice-grid">${dietaryOptions.map(([id, label]) => choice(label, state.profile.dietary.includes(id), "dietary", id)).join("")}</div>`,
    },
    {
      eyebrow: "Dislikes",
      title: "Anything you want to avoid?",
      helper: "These remove meals with the matching ingredient or flavor profile.",
      content: `<div class="choice-grid">${avoidOptions.map(([id, label]) => choice(label, state.profile.avoid.includes(id), "avoid", id)).join("")}</div>`,
    },
    {
      eyebrow: "Cooking time",
      title: "How much time can each meal take?",
      helper: "Meals over this time are hidden from your gallery.",
      content: `
        <div class="range-block">
          <input data-input="timeLimit" type="range" min="10" max="60" step="5" value="${state.profile.timeLimit}">
          <strong>${state.profile.timeLimit} min</strong>
        </div>
      `,
    },
    {
      eyebrow: "Cooking skill",
      title: "How comfortable are you in the kitchen?",
      helper: "This keeps recipes aligned with the effort you want.",
      content: `<div class="choice-grid three">${["Easy", "Medium", "Go all out"].map((skill) => choice(skill, state.profile.skill === skill, "skill")).join("")}</div>`,
    },
    {
      eyebrow: "Calories",
      title: "Do you have a calorie limit per meal?",
      helper: "Pick a target or keep every meal available.",
      content: `<div class="choice-grid">${["No limit", "350", "450", "550"].map((cal) => choice(cal === "No limit" ? cal : `Under ${cal} cal`, state.profile.calories === cal, "calories", cal)).join("")}</div>`,
    },
    {
      eyebrow: "Recommendation style",
      title: "What should the app optimize for first?",
      helper: "This controls how your visual meal gallery is sorted.",
      content: `<div class="choice-grid">${focusOptions.map(([id, label]) => choice(label, state.profile.focus === id, "focus", id)).join("")}</div>`,
    },
  ];
  const active = questions[state.question];
  app.innerHTML = `
    <section class="profile-layout">
      <div class="question-card">
        <p class="eyebrow">${active.eyebrow} - question ${state.question + 1} of ${questions.length}</p>
        <h2>${active.title}</h2>
        <p>${active.helper}</p>
        <div class="question-content">${active.content}</div>
        <div class="wizard-actions">
          <button class="ghost-button" data-action="question-back" ${state.question === 0 ? "disabled" : ""}>Back</button>
          <button class="primary-button" data-action="${state.question === questions.length - 1 ? "complete-profile" : "question-next"}" ${state.profile.zip.length < 5 ? "disabled" : ""}>
            ${state.question === questions.length - 1 ? "Build my meal plan" : "Continue"}
          </button>
        </div>
      </div>
      <aside class="profile-summary">
        <p class="eyebrow">Current profile</p>
        <h3>${state.profile.people} people, ${state.profile.mealsPerWeek} meals</h3>
        <dl>
          <div><dt>Budget</dt><dd>${currency(state.profile.budget)} / week</dd></div>
          <div><dt>Time</dt><dd>${state.profile.timeLimit} min or less</dd></div>
          <div><dt>Meal types</dt><dd>${state.profile.mealTypes.join(", ")}</dd></div>
          <div><dt>Focus</dt><dd>${focusOptions.find(([id]) => id === state.profile.focus)[1]}</dd></div>
        </dl>
      </aside>
    </section>
  `;
}

function renderMeals() {
  const matches = visibleMeals();
  const typeMeals = matches.filter((meal) => meal.type === state.activeType);
  const gallery = state.activeType === "All" ? matches : typeMeals.length ? typeMeals : matches;
  const selected = selectedMealObjects();
  const est = selected.reduce((sum, meal) => sum + meal.cost * state.profile.people, 0);

  app.innerHTML = `
    <section class="screen-section">
      <div class="section-heading">
        <button class="ghost-button" data-screen="profile">Back</button>
        <div>
          <p class="eyebrow">${matches.length} meals match your profile</p>
          <h2>Choose this week's meals</h2>
        </div>
      </div>
      <div class="meal-toolbar">
        <div class="segmented">
          ${["All", ...state.profile.mealTypes].map((type) => `<button class="${state.activeType === type ? "active" : ""}" data-active-type="${type}">${type}</button>`).join("")}
        </div>
        <p>Select up to ${state.profile.mealsPerWeek} meals. ${state.selectedMeals.length} selected.</p>
      </div>
      <div class="meal-grid">
        ${gallery.map(renderMealCard).join("")}
      </div>
      <div class="sticky-action">
        <div>
          <strong>${state.selectedMeals.length} meals selected</strong>
          <span>Estimated plan cost: ${currency(est)}</span>
        </div>
        <button class="primary-button" data-action="prepare-cart" ${state.selectedMeals.length === 0 ? "disabled" : ""}>View recipes + shopping list</button>
      </div>
    </section>
  `;
}

function renderMealCard(meal) {
  const selected = state.selectedMeals.includes(meal.id);
  return `
    <button class="meal-card ${selected ? "selected" : ""}" data-meal="${meal.id}">
      <img src="${meal.photo}" alt="">
      <span class="meal-type">${meal.type}</span>
      <div class="meal-card-body">
        <h3>${meal.title}</h3>
        <p>${meal.minutes} min - ${meal.calories} cal - ${currency(meal.cost)}/serving</p>
        <div class="tag-row">${meal.focus.slice(0, 2).map((tag) => `<span>${tag.replace("-", " ")}</span>`).join("")}</div>
      </div>
    </button>
  `;
}

function renderGroceries() {
  const items = groceries();
  const breakdown = cartBreakdown(items);
  const total = cartTotal(items);
  const under = state.profile.budget - total;
  app.innerHTML = `
    <section class="screen-section">
      <div class="section-heading">
        <button class="ghost-button" data-screen="meals">Back</button>
        <div>
          <p class="eyebrow">Sample prices near ${state.profile.zip}</p>
          <h2>Shopping list</h2>
        </div>
      </div>
      <div class="selected-recipes">
        ${selectedMealObjects().map((meal) => `
          <article>
            <img src="${meal.photo}" alt="">
            <div><strong>${meal.title}</strong><span>${meal.minutes} min - ${meal.skill}</span></div>
          </article>
        `).join("")}
      </div>
      <div class="store-filter">
        <button class="${state.storeFilter === "all" ? "active" : ""}" data-store-filter="all">All stores</button>
        ${stores.map((store) => `<button class="${state.storeFilter === store.id ? "active" : ""}" data-store-filter="${store.id}">${store.name}</button>`).join("")}
      </div>
      <div class="shopping-list">
        ${items.map(renderGroceryRow).join("")}
      </div>
      <div class="cart-panel">
        <div>
          <p class="eyebrow">Your cart breakdown</p>
          <div class="breakdown-list">
            ${breakdown.map((store) => `<span>${store.name}: ${store.items.length} items, ${currency(store.total)}</span>`).join("")}
          </div>
        </div>
        <div class="total-box">
          <span>Estimated total</span>
          <strong>${currency(total)}</strong>
          <em class="${under >= 0 ? "good" : "over"}">${under >= 0 ? `${currency(under)} under budget` : `${currency(Math.abs(under))} over budget`}</em>
        </div>
      </div>
      <div class="button-row">
        <button class="secondary-button" data-action="auto-cheapest">Auto-pick cheapest</button>
        <button class="primary-button" data-screen="sent">Send to grocery stores</button>
      </div>
    </section>
  `;
}

function renderGroceryRow(item) {
  return `
    <div class="shopping-row">
      <div><strong>${item.name}</strong><span>${item.quantity}</span></div>
      <div class="price-buttons">
        ${stores
          .filter((store) => state.storeFilter === "all" || state.storeFilter === store.id)
          .map((store) => `
            <button class="${(state.cart[item.key] || cheapestStore(item.base)) === store.id ? "selected" : ""}" data-cart-store="${store.id}" data-item="${item.key}">
              ${store.name} ${currency(priceFor(item.base, store.id))}
            </button>
          `).join("")}
      </div>
    </div>
  `;
}

function renderSent() {
  const items = groceries();
  const breakdown = cartBreakdown(items);
  const total = cartTotal(items);
  const under = state.profile.budget - total;
  app.innerHTML = `
    <section class="sent-screen">
      <div class="cart-icon">Cart ready</div>
      <h2>Cart sent!</h2>
      <p>Your selected items have been prepared for grocery checkout. Open Instacart first, or use another store link for pickup and delivery.</p>
      <div class="checkout-links">
        <a class="primary-link" href="${stores[0].url}" target="_blank" rel="noreferrer">Open Instacart cart (${items.length} items, ${currency(total)})</a>
        ${breakdown.map((store) => `<a href="${store.url}" target="_blank" rel="noreferrer">Open ${store.name} cart (${store.items.length} items, ${currency(store.total)})</a>`).join("")}
      </div>
      <div class="final-total">
        <span>Estimated total: ${currency(total)}</span>
        <strong class="${under >= 0 ? "good" : "over"}">${under >= 0 ? `${currency(under)} under budget` : `${currency(Math.abs(under))} over budget`}</strong>
      </div>
      <button class="ghost-button" data-action="reset">Plan next week</button>
    </section>
  `;
}

function stepper(key, value, suffix, min, max) {
  return `
    <div class="stepper">
      <button data-stepper="${key}" data-delta="-1" data-min="${min}" data-max="${max}">-</button>
      <strong>${value} <span>${suffix}</span></strong>
      <button data-stepper="${key}" data-delta="1" data-min="${min}" data-max="${max}">+</button>
    </div>
  `;
}

function choice(label, selected, group, value = label) {
  return `<button class="choice ${selected ? "selected" : ""}" data-choice-group="${group}" data-choice-value="${value}">${label}</button>`;
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target || target.tagName === "A") return;

  const action = target.dataset.action;
  if (action === "question-next") state.question += 1;
  if (action === "question-back") state.question = Math.max(0, state.question - 1);
  if (action === "complete-profile") {
    state.activeType = "All";
    state.screen = "meals";
  }
  if (action === "prepare-cart") {
    state.cart = Object.fromEntries(groceries().map((item) => [item.key, cheapestStore(item.base)]));
    state.screen = "groceries";
  }
  if (action === "auto-cheapest") {
    state.cart = Object.fromEntries(groceries().map((item) => [item.key, cheapestStore(item.base)]));
  }
  if (action === "reset") {
    state.screen = "profile";
    state.question = 0;
    state.selectedMeals = [];
    state.cart = {};
  }

  if (target.dataset.screen) state.screen = target.dataset.screen;
  if (target.dataset.activeType) state.activeType = target.dataset.activeType;
  if (target.dataset.storeFilter) state.storeFilter = target.dataset.storeFilter;
  if (target.dataset.cartStore) state.cart[target.dataset.item] = target.dataset.cartStore;

  if (target.dataset.stepper) {
    const key = target.dataset.stepper;
    const next = state.profile[key] + Number(target.dataset.delta);
    state.profile[key] = Math.min(Number(target.dataset.max), Math.max(Number(target.dataset.min), next));
  }

  if (target.dataset.meal) {
    const id = target.dataset.meal;
    if (state.selectedMeals.includes(id)) {
      state.selectedMeals = state.selectedMeals.filter((mealId) => mealId !== id);
    } else if (state.selectedMeals.length < state.profile.mealsPerWeek) {
      state.selectedMeals.push(id);
    }
  }

  if (target.dataset.choiceGroup) {
    const group = target.dataset.choiceGroup;
    const value = target.dataset.choiceValue;
    if (group === "meal-type") {
      const next = toggle(state.profile.mealTypes, value);
      state.profile.mealTypes = next.length ? next : [value];
    }
    if (group === "dietary") state.profile.dietary = toggle(state.profile.dietary, value);
    if (group === "avoid") state.profile.avoid = toggle(state.profile.avoid, value);
    if (group === "skill") state.profile.skill = value;
    if (group === "calories") state.profile.calories = value;
    if (group === "focus") state.profile.focus = value;
  }

  render();
});

app.addEventListener("input", (event) => {
  const target = event.target;
  if (!target.dataset.input) return;

  const key = target.dataset.input;
  if (key === "zip") state.profile.zip = target.value.replace(/\D/g, "").slice(0, 5);
  if (key === "budget") state.profile.budget = Math.max(0, Number(target.value || 0));
  if (key === "timeLimit") state.profile.timeLimit = Number(target.value);
  render();
});

render();

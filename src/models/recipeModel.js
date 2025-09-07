import { v4 as uuidv4 } from "uuid";

// Seed data for recipes
let recipes = [
  {
    id: "r-1001",
    title: "Easy Tomato Pasta",
    description: "Simple pasta with tomatoes and basil.",
    ingredients: ["pasta", "tomatoes", "basil", "olive oil"],
    instructions: ["Boil pasta", "Make sauce", "Combine and serve"],
    cookingTime: 20,
    servings: 2,
    difficulty: "easy",
    rating: 4.3,
    createdAt: "2025-01-01T12:00:00.000Z"
  },
  {
    id: "r-1002",
    title: "Grilled Chicken Salad",
    description: "Light salad with grilled chicken and greens.",
    ingredients: ["chicken", "lettuce", "cucumber", "vinaigrette"],
    instructions: ["Grill chicken", "Slice veggies", "Toss with dressing"],
    cookingTime: 25,
    servings: 2,
    difficulty: "easy",
    rating: 4.6,
    createdAt: "2025-01-03T09:15:00.000Z"
  },
  {
    id: "r-1003",
    title: "Beef Stir Fry",
    description: "Quick wok-fried beef with vegetables.",
    ingredients: ["beef", "broccoli", "soy sauce", "ginger"],
    instructions: ["Slice beef", "Stir-fry veg", "Add sauce and beef"],
    cookingTime: 30,
    servings: 3,
    difficulty: "medium",
    rating: 4.1,
    createdAt: "2025-01-05T18:30:00.000Z"
  },
  {
    id: "r-1004",
    title: "Chocolate Soufflé",
    description: "Delicate dessert with rich chocolate flavor.",
    ingredients: ["chocolate", "eggs", "sugar", "butter"],
    instructions: ["Make base", "Whip whites", "Fold and bake"],
    cookingTime: 40,
    servings: 4,
    difficulty: "hard",
    rating: 4.8,
    createdAt: "2025-01-08T20:00:00.000Z"
  },
  {
    id: "r-1005",
    title: "Veggie Omelette",
    description: "Fluffy omelette packed with vegetables.",
    ingredients: ["eggs", "bell pepper", "onion", "spinach"],
    instructions: ["Beat eggs", "Sauté veg", "Cook omelette"],
    cookingTime: 10,
    servings: 1,
    difficulty: "easy",
    rating: 4.0,
    createdAt: "2025-01-10T07:45:00.000Z"
  }
];

export const RecipeModel = {
  findAll(filters = {}) {
    let result = [...recipes];

    // difficulty filter (exact match)
    if (filters.difficulty) {
      result = result.filter(r => r.difficulty === filters.difficulty);
    }

    // maxCookingTime (<=)
    if (filters.maxCookingTime != null) {
      const max = Number(filters.maxCookingTime);
      result = result.filter(r => r.cookingTime <= max);
    }

    // search in title + description (case-insensitive)
    if (filters.search) {
      const q = String(filters.search).toLowerCase();
      result = result.filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }

    return result;
  },

  findById(id) {
    return recipes.find(r => r.id === id);
  },

  createRecipe(data) {
  const newRecipe = {
    id: uuidv4(),
    title: data.title,
    description: data.description,
    ingredients: data.ingredients,
    instructions: data.instructions,
    cookingTime: data.cookingTime,
    servings: data.servings,
    difficulty: data.difficulty,
    rating: data.rating ?? 0, // default 0 if not provided
    createdAt: new Date().toISOString(),
  };

  recipes.push(newRecipe);
  return newRecipe;
},

updateRecipe(id, data) {
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return null;

  // keep existing recipe, overwrite with new fields
  recipes[index] = {
    ...recipes[index],
    ...data,
    id, // ensure ID is not changed
  };

  return recipes[index];
}
};

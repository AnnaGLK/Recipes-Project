import { v4 as uuidv4 } from "uuid";
import { readRecipes, writeRecipes } from "../helpers/fileHelper.js";

// // Seed data for recipes
// let recipes = [
//   {
//     id: "r-1001",
//     title: "Easy Tomato Pasta",
//     description: "Simple pasta with tomatoes and basil.",
//     ingredients: ["pasta", "tomatoes", "basil", "olive oil"],
//     instructions: ["Boil pasta", "Make sauce", "Combine and serve"],
//     cookingTime: 20,
//     servings: 2,
//     difficulty: "easy",
//     rating: 4.3,
//     createdAt: "2025-01-01T12:00:00.000Z",
//   },
//   {
//     id: "r-1002",
//     title: "Grilled Chicken Salad",
//     description: "Light salad with grilled chicken and greens.",
//     ingredients: ["chicken", "lettuce", "cucumber", "vinaigrette"],
//     instructions: ["Grill chicken", "Slice veggies", "Toss with dressing"],
//     cookingTime: 25,
//     servings: 2,
//     difficulty: "easy",
//     rating: 4.6,
//     createdAt: "2025-01-03T09:15:00.000Z",
//   },
//   {
//     id: "r-1003",
//     title: "Beef Stir Fry",
//     description: "Quick wok-fried beef with vegetables.",
//     ingredients: ["beef", "broccoli", "soy sauce", "ginger"],
//     instructions: ["Slice beef", "Stir-fry veg", "Add sauce and beef"],
//     cookingTime: 30,
//     servings: 3,
//     difficulty: "medium",
//     rating: 4.1,
//     createdAt: "2025-01-05T18:30:00.000Z",
//   },
//   {
//     id: "r-1004",
//     title: "Chocolate Soufflé",
//     description: "Delicate dessert with rich chocolate flavor.",
//     ingredients: ["chocolate", "eggs", "sugar", "butter"],
//     instructions: ["Make base", "Whip whites", "Fold and bake"],
//     cookingTime: 40,
//     servings: 4,
//     difficulty: "hard",
//     rating: 4.8,
//     createdAt: "2025-01-08T20:00:00.000Z",
//   },
//   {
//     id: "r-1005",
//     title: "Veggie Omelette",
//     description: "Fluffy omelette packed with vegetables.",
//     ingredients: ["eggs", "bell pepper", "onion", "spinach"],
//     instructions: ["Beat eggs", "Sauté veg", "Cook omelette"],
//     cookingTime: 10,
//     servings: 1,
//     difficulty: "easy",
//     rating: 4.0,
//     createdAt: "2025-01-10T07:45:00.000Z",
//   },
// ];

export const RecipeModel = {
  async findAll(filters = {}) {
    let recipes = await readRecipes();
    let result = [...recipes];
    // const { difficulty, maxCookingTime, minRating, search, sort, order } = filters;

    // difficulty filter (exact match)
    if (filters.difficulty) {
      result = result.filter((r) => r.difficulty === filters.difficulty);
    }

    // maxCookingTime (<=)
    if (filters.maxCookingTime != null) {
      const max = Number(filters.maxCookingTime);
      result = result.filter((r) => r.cookingTime <= max);
    }

    // filter by minimum rating
    if (filters.minRating) {
      result = result.filter((r) => r.rating >= Number(filters.minRating));
    }

    // search in title + description (case-insensitive)
    if (filters.search) {
      const q = String(filters.search).toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }

    //  sorting
    if (filters.sort) {
      const validFields = ["createdAt", "rating", "cookingTime"];
      if (validFields.includes(filters.sort)) {
        result.sort((a, b) => {
          if (filters.sort === "createdAt") {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
          return a[filters.sort] - b[filters.sort];
        });
        // apply order (desc → reverse)
        if (filters.order === "desc") {
          result.reverse();
        }
      }
    }

    return result;
  },

  async findById(id) {
    const recipes = await readRecipes();
    return recipes.find((r) => r.id === id);
  },

  async createRecipe(data) {
    const recipes = await readRecipes();

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
    await writeRecipes(recipes);
    return newRecipe;
  },

  async updateRecipe(id, data) {
    const recipes = await readRecipes();
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return null;

    // keep existing recipe, overwrite with new fields
    recipes[index] = {
      ...recipes[index],
      ...data,
      id, // ensure ID is not changed
    };
    await writeRecipes(recipes);
    return recipes[index];
  },

  async deleteRecipe(id) {
    const recipes = await readRecipes();
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return false;

    recipes.splice(index, 1); // remove recipe
    await writeRecipes(recipes);
    return true;
  },

  async getStats() {
    const recipes = await readRecipes();
    const totalRecipes = recipes.length;

    const avgCookingTime =
      totalRecipes > 0
        ? recipes.reduce((sum, r) => sum + r.cookingTime, 0) / totalRecipes
        : 0;

    // group by difficulty
    const recipesByDifficulty = recipes.reduce((acc, r) => {
      acc[r.difficulty] = (acc[r.difficulty] || 0) + 1;
      return acc;
    }, {});

    // bonus: most common ingredients
    const ingredientCount = {};
    recipes.forEach((r) => {
      r.ingredients.forEach((ing) => {
        ingredientCount[ing] = (ingredientCount[ing] || 0) + 1;
      });
    });

    const mostCommonIngredients = Object.entries(ingredientCount)
      .sort((a, b) => b[1] - a[1]) // sort by frequency
      .slice(0, 5) // top 5
      .map(([ingredient, count]) => ({ ingredient, count }));

    return {
      totalRecipes,
      avgCookingTime: Number(avgCookingTime.toFixed(2)),
      recipesByDifficulty,
      mostCommonIngredients,
    };
  },

  async updateRating(id, newRating) {
    const recipes = await readRecipes();
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return null;

    recipes[index].rating = newRating; // overwrite rating
    await writeRecipes(recipes);
    return recipes[index];
  },
};

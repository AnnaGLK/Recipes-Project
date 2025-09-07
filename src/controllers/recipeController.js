import { RecipeModel } from "../models/recipeModel.js";

export const getRecipes = (req, res) => {
  const { difficulty, maxCookingTime, search } = req.query;
  const recipes = RecipeModel.findAll({ difficulty, maxCookingTime, search });
  // 200 OK even if it's an empty list
  return res.status(200).json(recipes);
};

export const getRecipeById = (req, res) => {
  const { id } = req.params;
  const recipe = RecipeModel.findById(id);

  if (!recipe) {
    return res.status(404).json({ message: `Recipe with id '${id}' not found` });
  }

  return res.status(200).json(recipe);
};
import express from "express";
import { RecipeModel } from "../models/recipeModel.js";
import { validateRecipe } from "../middleware/validateRecipe.js";
import { validateQuery } from "../middleware/validateQuery.js";
import { validateRating } from "../middleware/validateRating.js";

const router = express.Router();

// ✅ GET all recipes (with filters)
router.get("/", validateQuery, async (req, res, next) => {
  try {
    const recipes = await RecipeModel.findAll(req.query);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

// ✅ GET recipe stats
router.get("/stats", async (req, res, next) => {
  try {
    const stats = await RecipeModel.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// ✅ GET one recipe by ID
router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        error: true,
        message: "Recipe not found",
        statusCode: 404,
      });
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

// ✅ POST create new recipe
router.post("/", validateRecipe, async (req, res, next) => {
  try {
    const newRecipe = await RecipeModel.createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
});

// ✅ PUT update recipe
router.put("/:id", validateRecipe, async (req, res, next) => {
  try {
    const updatedRecipe = await RecipeModel.updateRecipe(req.params.id, req.body);
    if (!updatedRecipe) {
      return res.status(404).json({
        error: true,
        message: "Recipe not found",
        statusCode: 404,
      });
    }
    res.json(updatedRecipe);
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE recipe
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await RecipeModel.deleteRecipe(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        error: true,
        message: "Recipe not found",
        statusCode: 404,
      });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/rating", validateRating, async (req, res, next) => {
  try {
    const updatedRecipe = await RecipeModel.updateRating(req.params.id, req.body.rating);
    if (!updatedRecipe) {
      return res.status(404).json({
        error: true,
        message: "Recipe not found",
        statusCode: 404
      });
    }
    res.json(updatedRecipe);
  } catch (err) {
    next(err);
  }
});

export default router;

import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeStats
} from "../controllers/recipeController.js";
import { validateQuery } from "../middleware/validateQuery.js";
import { validateRecipe } from "../middleware/validateRecipe.js";

const router = express.Router();

// GET /api/recipes with filters
router.get("/", validateQuery, getRecipes);
router.get("/stats", getRecipeStats);
router.get("/:id", getRecipeById);
router.post("/", validateRecipe, createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);


export default router;

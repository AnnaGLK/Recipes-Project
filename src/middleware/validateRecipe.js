const ALLOWED_DIFFICULTY = ["easy", "medium", "hard"];
export const validateRecipe = (req, res, next) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
  } = req.body;

  // title is required
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  // must be a string
  if (typeof title !== "string") {
    return res.status(400).json({ message: "Title must be a string" });
  }

  // length check
  if (title.length < 3 || title.length > 100) {
    return res
      .status(400)
      .json({ message: "Title must be between 3 and 100 characters" });
  }

  // description is required
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  // description must be a string
  if (typeof description !== "string") {
    return res.status(400).json({ message: "Description must be a string" });
  }

  // description length check
  if (description.length < 10 || description.length > 500) {
    return res.status(400).json({
      message: "Description must be between 10 and 500 characters",
    });
  }

  // ingredients is required
  if (!ingredients) {
    return res.status(400).json({ message: "Ingredients are required" });
  }

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ message: "Ingredients must be an array" });
  }

  if (ingredients.length < 1) {
    return res.status(400).json({
      message: "Ingredients array must contain at least 1 item",
    });
  }

  // instructions is required
  if (!instructions) {
    return res.status(400).json({ message: "Instructions are required" });
  }

  if (!Array.isArray(instructions)) {
    return res.status(400).json({ message: "Instructions must be an array" });
  }

  if (instructions.length < 1) {
    return res.status(400).json({
      message: "Instructions array must contain at least 1 item",
    });
  }

  // cookingTime is required
  if (cookingTime === undefined || cookingTime === null) {
    return res.status(400).json({ message: "Cooking time is required" });
  }

  if (typeof cookingTime !== "number" || cookingTime <= 0) {
    return res
      .status(400)
      .json({ message: "Cooking time must be a positive number" });
  }

  // servings is required
  if (servings === undefined || servings === null) {
    return res.status(400).json({ message: "Servings is required" });
  }

  if (!Number.isInteger(servings) || servings <= 0) {
    return res
      .status(400)
      .json({ message: "Servings must be a positive integer" });
  }

  // 🆕 difficulty is required
  if (!difficulty) {
    return res.status(400).json({ message: "Difficulty is required" });
  }

  // 🆕 must be one of allowed values
  if (!ALLOWED_DIFFICULTY.includes(difficulty)) {
    return res.status(400).json({
      message: `Difficulty must be one of: ${ALLOWED_DIFFICULTY.join(", ")}`,
    });
  }

  // ✅ all good → move on
  next();
};

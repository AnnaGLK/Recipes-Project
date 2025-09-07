export const validateRecipe = (req, res, next) => {
  const { title, description, ingredients } = req.body;

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

  // ✅ all good → move on
  next();
};

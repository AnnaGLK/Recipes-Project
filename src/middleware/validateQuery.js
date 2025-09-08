const ALLOWED_DIFFICULTY = ["easy", "medium", "hard"];

export const validateQuery = (req, res, next) => {
  const { difficulty, maxCookingTime, search, minRating, sort, order } = req.query;

  // difficulty must be one of allowed (if present)
  if (difficulty && !ALLOWED_DIFFICULTY.includes(difficulty)) {
    return res.status(400).json({
      error: true,
      message: `Invalid difficulty. Allowed: ${ALLOWED_DIFFICULTY.join(", ")}`,
      statusCode: 400
    });
  }

  // maxCookingTime must be a positive number (if present)
  if (maxCookingTime !== undefined) {
    const n = Number(maxCookingTime);
    if (!Number.isFinite(n) || n <= 0) {
      return res
        .status(400)
        .json({ message: "maxCookingTime must be a positive number" });
    }
  }

  if (minRating && (isNaN(minRating) || minRating < 0 || minRating > 5)) {
    return res.status(400).json({
      error: true,
      message: "minRating must be a number between 0 and 5",
      statusCode: 400,
    });
  }
  
  // search: optional string (no strict validation needed)
  if (search !== undefined && typeof search !== "string") {
    return res.status(400).json({ message: "search must be a string" });
  }

  if (sort && !["createdAt", "rating", "cookingTime"].includes(sort)) {
    return res.status(400).json({ message: "Invalid sort field. Allowed: createdAt, rating, cookingTime" });
  }

  if (order && !["asc", "desc"].includes(order)) {
    return res.status(400).json({ message: "order must be 'asc' or 'desc'" });
  }

  next();
};

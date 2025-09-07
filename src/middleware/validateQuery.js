const ALLOWED_DIFFICULTY = ["easy", "medium", "hard"];

export const validateQuery = (req, res, next) => {
  const { difficulty, maxCookingTime, search } = req.query;

  // difficulty must be one of allowed (if present)
  if (difficulty && !ALLOWED_DIFFICULTY.includes(difficulty)) {
    return res.status(400).json({
      message: `Invalid difficulty. Allowed: ${ALLOWED_DIFFICULTY.join(", ")}`
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

  // search: optional string (no strict validation needed)
  if (search !== undefined && typeof search !== "string") {
    return res.status(400).json({ message: "search must be a string" });
  }

  next();
};

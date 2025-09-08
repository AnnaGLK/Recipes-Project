export const validateRating = (req, res, next) => {
  const { rating } = req.body;

  if (rating === undefined || rating === null) {
    return res.status(400).json({ 
      message: "Rating is required" 
    });
  }

  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return res.status(400).json({ 
      message: "Rating must be a number between 0 and 5" 
    });
  }

  next();
};

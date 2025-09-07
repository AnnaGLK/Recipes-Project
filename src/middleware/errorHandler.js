export const errorHandler = (err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
    statusCode,
  });
};

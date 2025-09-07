import express from "express";
import { logger } from "./middleware/logger.js";
import recipeRoutes from "./src/routes/recipeRoutes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Logging middleware (before all routes)
app.use(logger);

// Routes
app.use("/api/recipes", recipeRoutes);

// Error handler (keep LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "recipes.json");

export const readRecipes = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ Error reading recipes.json:", err);
    throw new Error("Failed to read recipes data");
  }
};

export const writeRecipes = async (recipes) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(recipes, null, 2), "utf-8");
  } catch (err) {
    console.error("❌ Error writing recipes.json:", err);
    throw new Error("Failed to write recipes data");
  }
};

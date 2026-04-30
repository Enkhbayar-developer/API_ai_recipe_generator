import dotenv from "dotenv";

dotenv.config();

import express, { application } from "express";
import cors from "cors";

// Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import pantryRoutes from "./routes/pantry.js";
import recipeRoutes from "./routes/recipes.js";
import mealPlansRoutes from "./routes/mealPlans.js";
import shoppingListRoutes from "./routes/shoppingList.js";

const app = express();

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // React development server
      "https://ai-recipe-generator-mauve.vercel.app", // Deployed frontend
    ],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test route
app.get("/", (req, res) => {
  res.json({ message: "AI recipe generator backend is running!" });
});

//API routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/pantry", pantryRoutes);
app.use("/recipes", recipeRoutes);
app.use("/meal-plans", mealPlansRoutes);
app.use("/shopping-list", shoppingListRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  console.log(`Environment:" + ${process.env.NODE_ENV || "development"}`);
});

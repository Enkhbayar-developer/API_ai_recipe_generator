import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

async function runMigration() {
  const client = await pool.connect();

  try {
    console.log("Running database migration...");

    //Read the schema file
    const schemaPath = path.join(__dirname, "config", "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");

    //Execute the schema
    await client.query(schemaSql);
    console.log("Database migration completed successfully!");
    console.log("Table created:");
    console.log(
      "users, user_preferences, pantry_items, recipes, recipe_ingredients, recipe_nutrition, meal_plans, shopping_list_items",
    );
  } catch (err) {
    console.error("Error during database migration:", err);
    process.exit(-1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();

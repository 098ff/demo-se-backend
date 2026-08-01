import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { ProductModel } from "./models/productModel.js";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  try {
    const connString = process.env.MONGODB_URI;
    if (!connString) {
      console.error("[Seed] Error: MONGODB_URI is not defined in .env file.");
      process.exit(1);
    }

    console.log("[Seed] Connecting to MongoDB...");
    await mongoose.connect(connString);
    console.log("[Seed] Connected successfully.");

    // Read mock-data.json
    const mockDataPath = path.join(__dirname, "../mock-data.json");
    const rawData = fs.readFileSync(mockDataPath, "utf-8");
    const products = JSON.parse(rawData);

    // Clear existing products
    console.log("[Seed] Clearing existing products...");
    await ProductModel.deleteMany({});

    // Insert mock data
    console.log(`[Seed] Inserting ${products.length} products...`);
    await ProductModel.insertMany(products);

    console.log("[Seed] Database seeded successfully! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("[Seed] Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

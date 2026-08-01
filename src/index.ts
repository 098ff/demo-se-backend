import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "🚀 Express Mongoose TypeScript REST API is running smoothly!",
    documentation: "/api/products",
  });
});

// API Routes
app.use("/api/products", productRoutes);

// Global Error Handler Middleware
app.use(errorHandler);

// Start HTTP Server
app.listen(PORT, () => {
  console.log(`[Server] Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
});

export default app;

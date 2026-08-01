import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const connString = process.env.MONGODB_URI || "mongodb://localhost:27017/product_db";
    mongoose.set("strictQuery", true);
    
    await mongoose.connect(connString);
    console.log(`[Database] MongoDB connected successfully to ${mongoose.connection.host}`);
  } catch (error) {
    console.error("[Database] Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

import mongoose from "mongoose";

async function connectDB() {
  const connectionString = process.env.DB_CONNECTION_STRING!;
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
}

export default connectDB;

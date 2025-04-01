import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/bookkeeper-bots",
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      },
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;

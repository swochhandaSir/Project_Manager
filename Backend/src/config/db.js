// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const DB_URI = process.env.MONGO_URL;
// const connectDB = async () => {
//     console.log(DB_URI);
// mongoose
//   .connect(DB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(" MongoDB connection error:", err));};

// export default connectDB;

import mongoose from "mongoose";

export default async function connectDb() {
  try {
    console.log("Connecting to DB...");

    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

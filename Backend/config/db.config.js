import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDb = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((err) => {
      console.log("Database connection failed. ERROR:" + err);
    });
};

export default connectDb;

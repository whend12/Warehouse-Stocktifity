import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";


const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        throw error;
    }
}

app.listen(5000, () => {
    connect();
    console.log("Server is running on port 5000");
})
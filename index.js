import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/index.js";


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

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
    connect();
    console.log("Server is running on port 5000");
})
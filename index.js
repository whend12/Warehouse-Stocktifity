import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import  productRoutes from "./routes/index.js"
import  supplierRoutes from "./routes/index.js"
import  userRoutes from "./routes/index.js"
import cookieParser from "cookie-parser";




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


app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/", productRoutes, supplierRoutes, userRoutes);



app.listen(5000, () => {
    connect();
    console.log("Server is running on port 5000");
})


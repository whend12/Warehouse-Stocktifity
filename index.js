import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import productRoutes from "./routes/product.js"
import supplierRoutes from "./routes/supplier.js"
import userRoutes from "./routes/user.js"
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


app.use((cookieParser));
app.use(express.json());
app.use("/api/v1", productRoutes);
app.use("/api/v1", supplierRoutes);
app.use("/api/v1", userRoutes);

app.listen(5000, () => {
    connect();
    console.log("Server is running on port 5000");
})
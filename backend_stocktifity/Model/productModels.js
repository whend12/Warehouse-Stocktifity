import mongoose from "mongoose";


const productSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Please enter product name"],
        unique: [true, "Product name already exists"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    quantity: {
        type: Number,
        required: [true, "Please enter product quantity"],
        maxLength: [5, "Product name cannot exceed 5 characters"],
        default: 0
    },
    sku: {
        type: String,
        required: [true, "Please enter product sku"],
        unique: [true, "Product sku already exists"],
        maxLength: [5, "Product sku cannot exceed 5 characters"],
        default: 0
    },
    category: {
        type: String,
        required: [true, "Please enter product category"],
        trim: true,
        maxLength: [100, "Product category cannot exceed 100 characters"]
    },
},
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema);

export default Product;
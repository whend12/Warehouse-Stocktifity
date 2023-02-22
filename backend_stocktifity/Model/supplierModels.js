import mongoose from "mongoose";


const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter supplier name"],
        trim: true,
        maxLength: [100, "Supplier name cannot exceed 100 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter supplier email"],
        trim: true,
        maxLength: [100, "Supplier email cannot exceed 100 characters"]
    },
    phone: {
        type: Number,
        required: [true, "Please enter supplier phone"],
        trim: true,
        maxLength: [100, "Supplier phone cannot exceed 100 characters"]
    },
    address: {
        type: String,
        required: [true, "Please enter supplier address"],
        trim: true,
        maxLength: [100, "Supplier address cannot exceed 100 characters"]
    }   
},
    {
        timestamps: true,
    }
)


const Supplier = mongoose.model("Supplier", supplierSchema);


export default Supplier;
import mongoose from "mongoose";

const inboundHistorySchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    sku: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: "Supplier",
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  const inboundHistory = mongoose.model("inboundHistory", inboundHistorySchema)

  export default inboundHistory;
import mongoose from 'mongoose';


const outboundHistorySchema = new mongoose.Schema({
  product: {
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
      validate: {
        validator: async function (v) {
          const supplier = await mongoose.model('Supplier').findById(v);
          return supplier !== null;
        },
        message: 'Supplier is not valid',
      },
    },
  },
  quantity: {
    type: Number,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const outboundHistory = mongoose.model('outboundHistory', outboundHistorySchema);

export default outboundHistory;

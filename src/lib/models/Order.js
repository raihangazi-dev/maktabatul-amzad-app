import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: String,
  mail: String,
  fullAddress: {
    district: String,
    city: String,
    zip: String,
    moreDetails: String,
  },
  phone: String,
  orders: [
    {
      bookId: String,
      title: [String],
      items: Number,
      price: Number,
    },
  ],
  deliveryCharge: Number,
  status: { type: String, default: "pending" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema, "carts");

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    email: String,
    fullAddress: {
      district: String,
      city: String,
      zip: String,
      moreDetails: String,
    },
    phone: String,
    items: [
      {
        bookId: String,
        title: [String],
        qty: Number,
        price: Number,
      },
    ],
    deliveryCharge: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema, "carts");

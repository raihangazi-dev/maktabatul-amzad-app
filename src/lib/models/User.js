import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    image: String,
    address: {
      district: String,
      city: String,
      zip: String,
      moreDetails: String,
    },
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema, "users");

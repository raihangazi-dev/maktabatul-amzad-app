import mongoose from "mongoose";

const PublisherSchema = new mongoose.Schema({
  publisherId: { type: String, unique: true },
  name: [String],
  desc: [String],
  image: String,
}, { timestamps: true });

export default mongoose.models.Publisher || mongoose.model("Publisher", PublisherSchema, "publishers");

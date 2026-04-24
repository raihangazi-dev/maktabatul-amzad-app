import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  thumb: String,
  title: [String],
  text: [String],
  isActive: { type: Boolean, default: true },
});

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema, "banners");

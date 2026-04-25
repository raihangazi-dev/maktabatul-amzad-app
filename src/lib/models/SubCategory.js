import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
  subCategoryId: { type: String, unique: true },
  mainCategory: String,
  name: [String],
  desc: [String],
  image: String,
});

export default mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategorySchema, "subcategories");

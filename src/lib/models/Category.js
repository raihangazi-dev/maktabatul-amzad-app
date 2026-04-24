import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  categoryId: { type: String, unique: true },
  name: [String],
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema, "categories");

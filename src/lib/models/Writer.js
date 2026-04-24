import mongoose from "mongoose";

const WriterSchema = new mongoose.Schema({
  writerId: { type: String, unique: true },
  name: [String],
  desc: [String],
  image: String,
});

export default mongoose.models.Writer || mongoose.model("Writer", WriterSchema, "writers");

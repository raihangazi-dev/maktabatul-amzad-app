import mongoose from "mongoose";

const EditorSchema = new mongoose.Schema({
  editorId: { type: String, unique: true },
  name: [String],
  desc: [String],
  image: String,
});

export default mongoose.models.Editor || mongoose.model("Editor", EditorSchema, "editors");

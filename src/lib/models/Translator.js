import mongoose from "mongoose";

const TranslatorSchema = new mongoose.Schema({
  translatorId: { type: String, unique: true },
  name: String,
});

export default mongoose.models.Translator || mongoose.model("Translator", TranslatorSchema, "translators");

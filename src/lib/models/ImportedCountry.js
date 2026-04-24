import mongoose from "mongoose";

const ImportedCountrySchema = new mongoose.Schema({
  countryId: { type: String, unique: true },
  name: String,
});

export default mongoose.models.ImportedCountry || mongoose.model("ImportedCountry", ImportedCountrySchema, "importedCountries");

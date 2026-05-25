import mongoose from "mongoose";

const URI = "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

await mongoose.connect(URI);
const db = mongoose.connection;

const collections = ["books", "writers", "publishers", "categories", "banners"];
for (const name of collections) {
  const count = await db.collection(name).countDocuments();
  const sample = await db.collection(name).findOne();
  console.log(`\n--- ${name} (${count} docs) ---`);
  if (sample) {
    const keys = Object.keys(sample);
    console.log("Fields:", keys.join(", "));
  }
}

await mongoose.disconnect();

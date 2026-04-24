import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/lib/models/Book";
import Writer from "@/lib/models/Writer";
import Translator from "@/lib/models/Translator";
import Editor from "@/lib/models/Editor";
import Publisher from "@/lib/models/Publisher";
import Category from "@/lib/models/Category";
import SubCategory from "@/lib/models/SubCategory";
import ImportedCountry from "@/lib/models/ImportedCountry";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "";
    const sort = parseInt(searchParams.get("sort")) || 1;
    const gte = parseInt(searchParams.get("gte")) || 0;
    const lte = parseInt(searchParams.get("lte")) || 50000;
    const page = parseInt(searchParams.get("page")) || 0;
    const size = parseInt(searchParams.get("size")) || 10;

    const query = {
      price: { $gte: gte, $lte: lte },
    };
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const books = await Book.find(query)
      .sort({ price: sort })
      .skip(page * size)
      .limit(size)
      .lean();

    const enriched = await enrichBooks(books);
    return NextResponse.json(enriched);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const book = await Book.create(body);
    return NextResponse.json({ insertedId: book._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function enrichBooks(books) {
  const writerIds = [...new Set(books.flatMap((b) => b.writer || []))];
  const translatorIds = [...new Set(books.flatMap((b) => b.translator || []))];
  const editorIds = [...new Set(books.flatMap((b) => b.editor || []))];
  const publisherIds = [...new Set(books.map((b) => b.publisher).filter(Boolean))];
  const categoryIds = [...new Set(books.map((b) => b.category).filter(Boolean))];
  const subCategoryIds = [...new Set(books.map((b) => b.subCategory).filter(Boolean))];
  const countryIds = [...new Set(books.map((b) => b.importedCountry).filter(Boolean))];

  const [writers, translators, editors, publishers, categories, subCategories, countries] =
    await Promise.all([
      Writer.find({ writerId: { $in: writerIds } }).lean(),
      Translator.find({ translatorId: { $in: translatorIds } }).lean(),
      Editor.find({ editorId: { $in: editorIds } }).lean(),
      Publisher.find({ publisherId: { $in: publisherIds } }).lean(),
      Category.find({ categoryId: { $in: categoryIds } }).lean(),
      SubCategory.find({ subCategoryId: { $in: subCategoryIds } }).lean(),
      ImportedCountry.find({ countryId: { $in: countryIds } }).lean(),
    ]);

  return books.map((book) => ({
    ...book,
    writerDetails: (book.writer || []).map((id) => writers.find((w) => w.writerId === id)).filter(Boolean),
    translatorDetails: (book.translator || []).map((id) => translators.find((t) => t.translatorId === id)).filter(Boolean),
    editorDetails: (book.editor || []).map((id) => editors.find((e) => e.editorId === id)).filter(Boolean),
    publisherDetails: publishers.filter((p) => p.publisherId === book.publisher),
    categoryDetails: categories.filter((c) => c.categoryId === book.category),
    subCategoryDetails: subCategories.filter((sc) => sc.subCategoryId === book.subCategory),
    importedCountryDetails: countries.filter((c) => c.countryId === book.importedCountry),
  }));
}

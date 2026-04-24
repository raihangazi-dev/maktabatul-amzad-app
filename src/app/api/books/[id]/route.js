import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/lib/models/Book";
import { enrichBooks } from "../route";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const book = await Book.findById(params.id).lean();
    if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const [enriched] = await enrichBooks([book]);
    return NextResponse.json(enriched);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const book = await Book.findByIdAndUpdate(params.id, { $set: body }, { new: true });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Book.findByIdAndDelete(params.id);
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

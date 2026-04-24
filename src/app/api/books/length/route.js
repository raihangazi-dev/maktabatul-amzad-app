import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Book from "@/lib/models/Book";

export async function GET() {
  try {
    await connectDB();
    const totalBooks = await Book.countDocuments();
    return NextResponse.json({ totalBooks });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

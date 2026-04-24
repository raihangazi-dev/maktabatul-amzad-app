import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Writer from "@/lib/models/Writer";

export async function GET() {
  try {
    await connectDB();
    const writers = await Writer.find().lean();
    return NextResponse.json(writers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const writer = await Writer.create(body);
    return NextResponse.json({ insertedId: writer._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Writer from "@/lib/models/Writer";

export async function GET(request, { params }) {
  try {
    const { writerId } = await params;
    await connectDB();
    const writer = await Writer.findOne({ writerId }).lean();
    if (!writer) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(writer);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { writerId } = await params;
    await connectDB();
    const { name, desc, image } = await request.json();
    const writer = await Writer.findOneAndUpdate(
      { writerId },
      { $set: { name, desc, image } },
      { new: true, upsert: true }
    );
    return NextResponse.json(writer);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { writerId } = await params;
    await connectDB();
    await Writer.findOneAndDelete({ writerId });
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

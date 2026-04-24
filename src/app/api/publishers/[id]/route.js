import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Publisher from "@/lib/models/Publisher";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const publisher = await Publisher.findOne({ publisherId: params.id }).lean();
    if (!publisher) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(publisher);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { name, image } = await request.json();
    const publisher = await Publisher.findByIdAndUpdate(
      params.id,
      { $set: { name, image } },
      { new: true }
    );
    return NextResponse.json(publisher);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Publisher.findByIdAndDelete(params.id);
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

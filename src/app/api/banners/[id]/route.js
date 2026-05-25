import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/lib/models/Banner";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const banner = await Banner.findById(id).lean();
    if (!banner) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const banner = await Banner.findByIdAndUpdate(id, { $set: body }, { new: true });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    await Banner.findByIdAndDelete(id);
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/lib/models/Banner";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const banner = await Banner.findById(params.id).lean();
    if (!banner) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const banner = await Banner.findByIdAndUpdate(params.id, { $set: body }, { new: true });
    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Banner.findByIdAndDelete(params.id);
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

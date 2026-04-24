import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/lib/models/Banner";

export async function GET() {
  try {
    await connectDB();
    const banners = await Banner.find().lean();
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const banner = await Banner.create(body);
    return NextResponse.json({ insertedId: banner._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Publisher from "@/lib/models/Publisher";

export async function GET() {
  try {
    await connectDB();
    const publishers = await Publisher.find().lean();
    return NextResponse.json(publishers);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const publisher = await Publisher.create(body);
    return NextResponse.json({ insertedId: publisher._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

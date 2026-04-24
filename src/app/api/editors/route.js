import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Editor from "@/lib/models/Editor";

export async function GET() {
  try {
    await connectDB();
    const editors = await Editor.find().lean();
    return NextResponse.json(editors);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const editor = await Editor.create(body);
    return NextResponse.json({ insertedId: editor._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

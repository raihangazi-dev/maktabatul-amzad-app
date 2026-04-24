import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Translator from "@/lib/models/Translator";

export async function GET() {
  try {
    await connectDB();
    const translators = await Translator.find().lean();
    return NextResponse.json(translators);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const translator = await Translator.create(body);
    return NextResponse.json({ insertedId: translator._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

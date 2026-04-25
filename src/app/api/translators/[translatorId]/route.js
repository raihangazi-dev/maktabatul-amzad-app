import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Translator from "@/lib/models/Translator";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const translator = await Translator.findOne({ translatorId: params.translatorId }).lean();
    if (!translator) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(translator);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const translator = await Translator.findOneAndUpdate(
      { translatorId: params.translatorId },
      { $set: body },
      { new: true }
    );
    return NextResponse.json(translator);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Translator.findOneAndDelete({ translatorId: params.translatorId });
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

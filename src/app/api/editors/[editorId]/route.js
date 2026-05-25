import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Editor from "@/lib/models/Editor";

export async function GET(request, { params }) {
  try {
    const { editorId } = await params;
    await connectDB();
    const editor = await Editor.findOne({ editorId }).lean();
    if (!editor) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(editor);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { editorId } = await params;
    await connectDB();
    const { name } = await request.json();
    const editor = await Editor.findOneAndUpdate(
      { editorId },
      { $set: { name } },
      { new: true, upsert: true }
    );
    return NextResponse.json(editor);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { editorId } = await params;
    await connectDB();
    await Editor.findOneAndDelete({ editorId });
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

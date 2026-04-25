import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Editor from "@/lib/models/Editor";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const editor = await Editor.findOne({ editorId: params.editorId }).lean();
    if (!editor) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(editor);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const editor = await Editor.findOneAndUpdate(
      { editorId: params.editorId },
      { $set: body },
      { new: true }
    );
    return NextResponse.json(editor);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Editor.findOneAndDelete({ editorId: params.editorId });
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

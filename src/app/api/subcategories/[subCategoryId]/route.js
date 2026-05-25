import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SubCategory from "@/lib/models/SubCategory";

export async function GET(request, { params }) {
  try {
    const { subCategoryId } = await params;
    await connectDB();
    const subCategory = await SubCategory.findOne({ subCategoryId }).lean();
    if (!subCategory) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(subCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { subCategoryId } = await params;
    await connectDB();
    const { name, mainCategory } = await request.json();
    const subCategory = await SubCategory.findOneAndUpdate(
      { subCategoryId },
      { $set: { name, mainCategory } },
      { new: true, upsert: true }
    );
    return NextResponse.json(subCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { subCategoryId } = await params;
    await connectDB();
    await SubCategory.findOneAndDelete({ subCategoryId });
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

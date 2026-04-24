import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/lib/models/Category";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const category = await Category.findOne({ categoryId: params.categoryId }).lean();
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { name } = await request.json();
    const category = await Category.findOneAndUpdate(
      { categoryId: params.categoryId },
      { $set: { name } },
      { new: true, upsert: true }
    );
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Category.findOneAndDelete({ categoryId: params.categoryId });
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

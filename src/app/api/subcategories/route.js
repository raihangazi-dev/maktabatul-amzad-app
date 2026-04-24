import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SubCategory from "@/lib/models/SubCategory";
import Category from "@/lib/models/Category";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const mainCategory = searchParams.get("mainCategory");

    const query = mainCategory ? { mainCategory } : {};
    const subCategories = await SubCategory.find(query).lean();

    if (!mainCategory) {
      const categoryIds = [...new Set(subCategories.map((sc) => sc.mainCategory))];
      const categories = await Category.find({ categoryId: { $in: categoryIds } }).lean();
      const enriched = subCategories.map((sc) => ({
        ...sc,
        mainCategoryDetails: categories.filter((c) => c.categoryId === sc.mainCategory),
      }));
      return NextResponse.json(enriched);
    }

    return NextResponse.json(subCategories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const subCategory = await SubCategory.create(body);
    return NextResponse.json({ insertedId: subCategory._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

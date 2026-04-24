import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ImportedCountry from "@/lib/models/ImportedCountry";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const country = await ImportedCountry.findById(params.id).lean();
    if (!country) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(country);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { name } = await request.json();
    const country = await ImportedCountry.findByIdAndUpdate(
      params.id,
      { $set: { name } },
      { new: true }
    );
    return NextResponse.json(country);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await ImportedCountry.findByIdAndDelete(params.id);
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ImportedCountry from "@/lib/models/ImportedCountry";

export async function GET() {
  try {
    await connectDB();
    const countries = await ImportedCountry.find().lean();
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const country = await ImportedCountry.create(body);
    return NextResponse.json({ insertedId: country._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

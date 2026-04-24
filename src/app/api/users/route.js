import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (email) {
      const user = await User.findOne({ email }).select("-password").lean();
      return NextResponse.json(user);
    }
    const users = await User.find().select("-password").sort({ _id: -1 }).lean();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const existing = await User.findOne({ email: body.email });
    if (existing) return NextResponse.json({ message: "User Already Exist" });
    if (body.password) {
      body.password = await bcrypt.hash(String(body.password), 10);
    }
    const user = await User.create(body);
    return NextResponse.json({ insertedId: user._id }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/users] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

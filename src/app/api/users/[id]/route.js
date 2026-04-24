import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { name, address, phone } = await request.json();
    const user = await User.findByIdAndUpdate(
      params.id,
      { $set: { name, address, phone } },
      { new: true, upsert: true }
    ).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

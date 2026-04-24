import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const allowed = ["name", "address", "phone", "role"];
    const update = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
    const user = await User.findByIdAndUpdate(params.id, { $set: update }, { new: true }).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

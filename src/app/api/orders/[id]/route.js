import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { editedStatus } = await request.json();
    const order = await Order.findByIdAndUpdate(
      params.id,
      { $set: { status: editedStatus } },
      { new: true }
    );
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Order.findByIdAndDelete(params.id);
    return NextResponse.json({ deletedCount: 1 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

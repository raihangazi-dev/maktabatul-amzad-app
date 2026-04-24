import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const query = email ? { mail: email } : {};
    const orders = await Order.find(query).sort({ timestamp: -1 }).lean();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    body.timestamp = new Date();
    const order = await Order.create(body);
    return NextResponse.json({ insertedId: order._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

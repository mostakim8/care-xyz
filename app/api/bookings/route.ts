import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    const role = searchParams.get("role");

    let query = {};
    // আপনার MongoDB-তে ফিল্ডের নাম 'userId'
    if (role !== "admin" && uid) {
      query = { userId: uid };
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

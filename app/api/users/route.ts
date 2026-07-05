import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newUser = await User.create(body);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Database save failed" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

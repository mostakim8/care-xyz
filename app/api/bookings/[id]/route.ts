import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, 
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 },
      );
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete API Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
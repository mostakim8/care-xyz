import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDatabase from "@/lib/mongodb";
import Booking from "@/models/Booking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
  try {
    const { paymentIntentId } = await req.json();

    // ১. Stripe থেকে পেমেন্ট ইন্টেন্ট ডিটেইলস নিয়ে আসা
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const bookingData = intent.metadata;

    if (!bookingData) {
      return NextResponse.json(
        { error: "No booking data found" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    // ২. ডাটাবেসে নতুন বুকিং সেভ করা
    const newBooking = await Booking.create({
      userId: bookingData.userId,
      serviceId: bookingData.serviceId,
      duration: Number(bookingData.duration),
      totalCost: Number(bookingData.totalCost),
      division: bookingData.division,
      district: bookingData.district,
      city: bookingData.city,
      area: bookingData.area,
      address: bookingData.address,
      status: "Confirmed",
    });

    return NextResponse.json({ success: true, data: newBooking });
  } catch (error: any) {
    console.error("Finalize Booking Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

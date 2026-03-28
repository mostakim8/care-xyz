import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
  try {
    const { bookingData } = await req.json();

    if (!bookingData) {
      return NextResponse.json({ error: "No booking data" }, { status: 400 });
    }

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(bookingData.totalCost * 100),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userId: String(bookingData.userId),
        serviceId: String(bookingData.serviceId),
        duration: String(bookingData.duration),
        totalCost: String(bookingData.totalCost),
        division: String(bookingData.division || ""),
        district: String(bookingData.district || ""),
        city: String(bookingData.city || ""),
        area: String(bookingData.area || ""),
        address: String(bookingData.address || ""),
      },
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
    });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

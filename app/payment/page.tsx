"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

// card input styling for stripe elements
const inputStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": { color: "#aab7c4" },
      backgroundColor: "transparent",
    },
    invalid: { color: "#9e2146" },
  },
};

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !bookingData) return;

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingData }),
      });

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.error || "Failed to initiate payment");

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) throw new Error("Card elements not found");

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        result.clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: { name: "Customer" },
          },
        },
      );

      if (error) throw new Error(error.message);

      if (paymentIntent?.status === "succeeded") {
        const confirmRes = await fetch("/api/bookings/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: result.paymentIntentId }),
        });

        if (confirmRes.ok) {
          localStorage.removeItem("bookingData");
          router.push("/my-bookings");
        } else {
          throw new Error("Failed to save booking");
        }
      }
    } catch (error: any) {
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) return <div className="text-center mt-20">Loading...</div>;

  // Dynamic calculation for summary
  const duration = Number(bookingData.duration) || 0;
  const total = Number(bookingData.totalCost) || 0;
  const perDayRate = duration > 0 ? (total / duration).toFixed(2) : 0;

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar: Card Details */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 shadow-2xl rounded-3xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
            Payment Method
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">
                Card Number
              </label>
              <div className="p-4 border rounded-2xl bg-gray-50 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <CardNumberElement options={inputStyle} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500">
                  Expiry Date
                </label>
                <div className="p-4 border rounded-2xl bg-gray-50 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <CardExpiryElement options={inputStyle} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500">
                  CVC
                </label>
                <div className="p-4 border rounded-2xl bg-gray-50 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <CardCvcElement options={inputStyle} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !stripe}
              className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold text-lg shadow-xl shadow-blue-100 dark:shadow-none disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Processing..." : `Confirm & Pay $${total}`}
            </button>
          </form>
        </div>

        {/* Right Sidebar: Dynamic Summary */}
        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl h-fit sticky top-10">
          <h3 className="text-xl font-bold mb-6 border-b border-blue-400 pb-4">
            Booking Summary
          </h3>

          <div className="space-y-5">
            <div>
              <p className="text-blue-100 text-sm">Service Name</p>
              <p className="text-lg font-semibold">
                {bookingData.serviceName || "Care Service"}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 text-sm">Rate</p>
                <p className="font-medium">${perDayRate} / day</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Duration</p>
                <p className="font-medium">{duration} Days</p>
              </div>
            </div>

            <div className="bg-blue-700 p-4 rounded-2xl space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Subtotal ({perDayRate} × {duration})
                </span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-2 border-t border-blue-500">
                <span>Total Bill</span>
                <span>${total}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-blue-100 bg-blue-500/30 p-3 rounded-xl">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Guaranteed secure checkout by Stripe
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

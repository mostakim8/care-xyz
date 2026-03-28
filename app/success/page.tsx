"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("paymentIntentId");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paymentIntentId) {
      const finalizeBooking = async () => {
        try {
          const res = await fetch("/api/bookings/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIntentId }),
          });

          if (res.ok) {
            setLoading(false);
            // Auto redirect to my-bookings after 2 seconds
            setTimeout(() => {
              router.push("/my-bookings");
            }, 2000);
          } else {
            console.error("Booking failed to save");
          }
        } catch (error) {
          console.error("Error finalizing booking:", error);
        }
      };

      finalizeBooking();
    }
  }, [paymentIntentId, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          {loading ? "Confirming Payment..." : "Payment Successful!"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {loading
            ? "Please wait while we finalize your booking record."
            : "Your care service has been booked successfully. Our team will contact you soon."}
        </p>

        {!loading && (
          <div className="flex flex-col gap-3">
            <Link
              href="/my-bookings"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              View My Bookings
            </Link>
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 font-medium"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

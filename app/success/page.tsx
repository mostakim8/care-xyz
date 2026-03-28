"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("paymentIntentId");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paymentIntentId) {
      const finalizeBooking = async () => {
        try {
          // লোডারটি স্পষ্টভাবে দেখার জন্য ১ সেকেন্ড আর্টিফিশিয়াল ডিলে (ঐচ্ছিক)
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const res = await fetch("/api/bookings/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIntentId }),
          });

          if (res.ok) {
            setLoading(false);
            toast.success("Booking Confirmed Successfully!", {
              duration: 4000,
              position: "top-center",
              style: {
                borderRadius: "15px",
                background: "#10b981", // Green background for toast
                color: "#fff",
                fontWeight: "bold",
              },
            });

            setTimeout(() => {
              router.push("/my-bookings");
            }, 3000);
          } else {
            setLoading(false);
            toast.error("Failed to save booking details.");
          }
        } catch (error) {
          setLoading(false);
          toast.error("Something went wrong!");
        }
      };

      finalizeBooking();
    }
  }, [paymentIntentId, router]);

  return (
    <div className="bg-white dark:bg-gray-900 p-10 rounded-[32px] shadow-2xl text-center max-w-md border-2 border-sky-50 dark:border-gray-800 transition-all">
      <Toaster />

      {loading ? (
        /* --- Enhanced Sky & Green Premium Loader --- */
        <div className="flex flex-col items-center py-12">
          <div className="relative w-24 h-24">
            {/* Outer Ring - Sky Blue */}
            <div className="absolute inset-0 border-[6px] border-sky-100 dark:border-sky-900/20 rounded-full"></div>
            <div className="absolute inset-0 border-[6px] border-sky-500 rounded-full border-t-transparent animate-spin"></div>

            {/* Inner Ring - Green (Opposite Spin) */}
            <div className="absolute inset-4 border-[4px] border-green-100 dark:border-green-900/20 rounded-full"></div>
            <div className="absolute inset-4 border-[4px] border-green-500 rounded-full border-b-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>

            {/* Center Glow */}
            <div className="absolute inset-8 bg-sky-400/20 rounded-full animate-pulse"></div>
          </div>

          <div className="mt-10 space-y-2">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-500 tracking-tight animate-pulse">
              Processing...
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Finalizing your payment
            </p>
          </div>
        </div>
      ) : (
        /* --- Success Content --- */
        <div className="animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-100 dark:border-green-500/20">
            <svg
              className="w-10 h-10 text-green-500"
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

          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Success!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
            Your payment was processed. Redirecting to your bookings...
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/my-bookings"
              className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              Go to My Bookings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8fafc] dark:bg-gray-950">
      <Suspense
        fallback={
          <div className="text-sky-500 font-black animate-bounce">CARE.XYZ</div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}

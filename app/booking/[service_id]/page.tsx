"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Stripe লোড করা
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

function InnerBookingPage() {
  const { service_id } = useParams();
  const {service_name} = useParams();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form States
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  const serviceChargePerHour = 150;
  const totalCost = duration * serviceChargePerHour;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handlePayment = async () => {
    if (!stripe || !elements || !user) return;

    setLoading(true);
    const bookingData = {
      userId: user.uid,
      serviceId: service_id,
      serviceName: service_name ,
      duration,
      totalCost,
      ...location,
    };

    try {
      // ১. পেমেন্ট ইন্টেন্ট তৈরি
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingData }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment session failed");
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        throw new Error("Card element not found");
      }

      // ২. পেমেন্ট কনফার্ম
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: user.displayName || user.email || "Customer",
              email: user.email,
            },
          },
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent?.status === "succeeded") {
        // ৩. সাকসেস পেজে রিডাইরেক্ট
        router.push(`/success?paymentIntentId=${data.paymentIntentId}`);
      }
    } catch (err: any) {
      console.error("Payment Error:", err);
      alert(err.message || "Payment initiation failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        {step === 1 ? "Service Details" : "Confirm & Pay"}
      </h2>

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (Hours)
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              placeholder="Duration (Hours)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Division"
              className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={location.division}
              onChange={(e) =>
                setLocation({ ...location, division: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="District"
              className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={location.district}
              onChange={(e) =>
                setLocation({ ...location, district: e.target.value })
              }
              required
            />
          </div>
          <input
            type="text"
            placeholder="City"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            value={location.city}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
            required
          />
          <textarea
            placeholder="Full Address"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            rows={3}
            value={location.address}
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
            required
          />

          <button
            onClick={() => {
              const bookingData = {
                userId: user.uid,
                serviceId: service_id,
                duration,
                totalCost,
                ...location,
              };
              localStorage.setItem("bookingData", JSON.stringify(bookingData));
              router.push("/payment");
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Continue to Payment
          </button>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <p className="text-gray-600 dark:text-gray-400">
              Total Amount to Pay
            </p>
            <h3 className="text-4xl font-black text-blue-600">${totalCost}</h3>
            <p className="mt-2 text-sm text-gray-500">
              Service ID: {service_id}
            </p>
          </div>

          <div className="pt-2">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Card Details:
            </label>
            <CardElement
              className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={loading || !stripe}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Pay & Confirm Booking"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  const { service_id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Form States
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  const serviceChargePerHour = 150;
  const totalCost = duration * serviceChargePerHour;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Service Details
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Duration (Hours)
          </label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            placeholder="Duration (Hours)"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Division"
            className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            value={location.division}
            onChange={(e) =>
              setLocation({ ...location, division: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="District"
            className="p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            value={location.district}
            onChange={(e) =>
              setLocation({ ...location, district: e.target.value })
            }
            required
          />
        </div>
        <input
          type="text"
          placeholder="City"
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
          required
        />
        <textarea
          placeholder="Full Address"
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          rows={3}
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
          required
        />

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">Total Amount</p>
          <h3 className="text-2xl font-black text-blue-600">${totalCost}</h3>
        </div>

        <button
          onClick={() => {
            const bookingData = {
              userId: user.uid,
              serviceId: service_id,
              duration,
              totalCost,
              ...location,
            };
            localStorage.setItem("bookingData", JSON.stringify(bookingData));
            router.push("/payment");
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

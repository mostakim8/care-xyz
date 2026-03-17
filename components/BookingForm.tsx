"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function BookingForm({ pricePerDay }: { pricePerDay: number }) {
  const router = useRouter();
  const params = useParams() as { id?: string; service_id?: string };
  const [duration, setDuration] = useState<number>(1);
  const [user, setUser] = useState<{ uid: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        alert("Please login first!");
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Calculation logic: Price × Duration
  const totalCost = duration * pricePerDay;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const serviceId = params?.id || params?.service_id || "general-service";
      const bookingData = {
        userId: user.uid,
        serviceId,
        duration,
        totalCost,
        ...formData,
        status: "Pending",
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Booking confirmed! Total cost: $" + totalCost);
        router.push("/my-bookings");
      } else {
        alert("Booking failed: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl space-y-4 mt-8 shadow-sm"
    >
      <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
        Booking Form
      </h3>

      {/* Location Fields */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Division"
          value={formData.division}
          onChange={(e) => handleInputChange("division", e.target.value)}
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="District"
          value={formData.district}
          onChange={(e) => handleInputChange("district", e.target.value)}
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Area"
          value={formData.area}
          onChange={(e) => handleInputChange("area", e.target.value)}
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
      </div>

      <input
        type="text"
        placeholder="Full Address"
        value={formData.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
        className="w-full p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
        required
      />

      {/* Duration and Calculation */}
      <div className="pt-2">
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Duration (Days):
        </label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value) || 0)}
          className="w-full p-3 rounded border dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Total Cost:
        </span>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ${totalCost}
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </button>
    </form>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function BookingPage() {
  const { id } = useParams(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
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

  const serviceNames: { [key: string]: string } = {
    "1": "Baby Sitting",
    "2": "Elderly Care",
    "3": "Sick People Service",
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      userId: user?.uid,
      serviceId: id, 
      duration,
      totalCost,
      ...location,
      status: "Pending",
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Booking Successful!");
        router.push("/my-bookings");
      } else {
        alert("Booking Failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Booking POST error:", error);
      alert("Something went wrong with the server connection!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p className="animate-pulse">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-xl mx-auto p-8 bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Book{" "}
          <span className="text-blue-500">
            {serviceNames[id as string] || "Service"}
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Duration (Hours)
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Division"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              onChange={(e) =>
                setLocation({ ...location, division: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="District"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-400"
              onChange={(e) =>
                setLocation({ ...location, district: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-400"
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Area"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-400"
              onChange={(e) =>
                setLocation({ ...location, area: e.target.value })
              }
              required
            />
          </div>

          <textarea
            placeholder="Full Address Details"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white h-24 focus:outline-none focus:border-blue-400"
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
            required
          />

          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg flex justify-between items-center">
            <span className="text-gray-300">Total Cost:</span>
            <span className="text-2xl font-bold text-blue-400">
              ${totalCost}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all disabled:bg-gray-700 shadow-lg shadow-blue-600/20"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

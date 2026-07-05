"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const serviceNames: { [key: string]: string } = {
    "1": "Baby Care",
    "2": "Elderly Care",
    "3": "Sick People Service",
  };

  useEffect(() => {
    // onAuthStateChanged is used, it will wait for Firebase's confirmation.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // API call
          const res = await fetch(`/api/my-bookings?userId=${user.uid}`);
          const result = await res.json();

          // important: Api call is sending data in properties 
          if (result.success && result.data) {
            setBookings(result.data);
          }
        } catch (err) {
          console.error("Fetch Error:", err);
        } finally {
          setLoading(false);
        }
      } else {
        // when user is not logged in, redirect to login page
        setLoading(false);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // handleCancel function to cancel a booking
  const handleCancel = async (id: string) => {
    if (!id) return;
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok && result.success) {
        alert("Booking Cancelled successfully!");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert(`Error: ${result.error || "Failed to delete"}`);
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-white">Verifying your session...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 pl-4 border-l-4 border-blue-600">
        My Bookings
      </h1>

      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-5 font-semibold">Service</th>
                <th className="p-5 font-semibold">Location</th>
                <th className="p-5 font-semibold">Cost</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="p-5 font-medium">
                      {serviceNames[booking.serviceId] ||
                        booking.serviceId ||
                        "General Service"}
                    </td>
                    <td className="p-5 text-gray-400">
                      {booking.city}, {booking.district}
                    </td>
                    <td className="p-5 text-blue-400 font-bold">
                      ${booking.totalCost}
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-yellow-900/30 text-yellow-500 py-1 px-3 rounded-full text-xs font-semibold">
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="text-red-500 hover:text-red-700 transition-all font-medium border border-red-500/20 px-3 py-1 rounded-md hover:bg-red-500/10"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-gray-500 italic"
                  >
                    You have no active bookings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

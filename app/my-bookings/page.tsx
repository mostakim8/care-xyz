"use client"; // যেহেতু স্টেট ব্যবহার করছি
import { useState } from "react";

export default function MyBookings() {
  const initialBookings = [
    { id: 1, service: "Baby Care", date: "2026-03-20", status: "Confirmed" },
    {
      id: 2,
      service: "Elderly Service",
      date: "2026-03-22",
      status: "Pending",
    },
    { id: 3, service: "Sick Care", date: "2026-03-25", status: "Completed" },
  ];

  const [bookings, setBookings] = useState(initialBookings);

  // বুকিং ডিলিট করার ফাংশন (Real-time update)
  const handleCancel = (id: number) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
        My Bookings
      </h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {bookings.map((booking) => (
              <tr key={booking.id} className="text-black dark:text-gray-300">
                <td className="p-4">{booking.service}</td>
                <td className="p-4">{booking.date}</td>
                <td className="p-4 font-semibold">{booking.status}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer underline"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

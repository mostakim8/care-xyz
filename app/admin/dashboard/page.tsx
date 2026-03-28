"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard - Payment Histories
      </h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4">User ID</th>
              <th className="p-4">Service</th>
              <th className="p-4">Cost</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: any) => (
              <tr
                key={booking._id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-4">{booking.userId}</td>
                <td className="p-4">{booking.serviceId}</td>
                <td className="p-4">${booking.totalCost}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

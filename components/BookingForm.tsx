"use client";
import { useState } from "react";

export default function BookingForm({ pricePerDay }: { pricePerDay: number }) {
  const [duration, setDuration] = useState(1);
  const totalCost = duration * pricePerDay;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking Confirmed! Total Cost: $${totalCost}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl space-y-4 mt-8"
    >
      <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
        Book This Service
      </h3>

      {/* Location Fields */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Division"
          className="p-3 rounded border dark:bg-gray-900"
          required
        />
        <input
          type="text"
          placeholder="District"
          className="p-3 rounded border dark:bg-gray-900"
          required
        />
        <input
          type="text"
          placeholder="City"
          className="p-3 rounded border dark:bg-gray-900"
          required
        />
        <input
          type="text"
          placeholder="Area"
          className="p-3 rounded border dark:bg-gray-900"
          required
        />
      </div>

      <input
        type="text"
        placeholder="Full Address"
        className="w-full p-3 rounded border dark:bg-gray-900"
        required
      />

      {/* Duration & Cost */}
      <div>
        <label className="block mb-2">Duration (Days):</label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full p-3 rounded border dark:bg-gray-900"
        />
      </div>

      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        Total Cost: ${totalCost}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </form>
  );
}

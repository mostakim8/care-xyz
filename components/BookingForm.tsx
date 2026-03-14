"use client";
import { useState } from "react";

export default function BookingForm({ pricePerDay }: { pricePerDay: number }) {
  const [duration, setDuration] = useState<number>(1);

  // Calculation logic: Price × Duration
  const totalCost = duration * pricePerDay;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add logic to send booking data to your database
    alert(`Booking confirmed! Total cost: $${totalCost}`);
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
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="District"
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="City"
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Area"
          className="p-3 rounded border dark:bg-gray-900 dark:border-gray-700"
          required
        />
      </div>

      <input
        type="text"
        placeholder="Full Address"
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
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold shadow-md cursor-pointer"
      >
        Confirm Booking
      </button>
    </form>
  );
}

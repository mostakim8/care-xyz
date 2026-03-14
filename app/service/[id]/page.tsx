"use client"; // এটি যোগ করেছি কারণ আমরা এখন ইন্টারঅ্যাক্টিভিটি (onClick) ব্যবহার করছি
import { services } from "@/data/services";
import { notFound } from "next/navigation";
import { use } from "react"; // Next.js 15+ এ params হ্যান্ডেল করার জন্য

export default function ServiceDetails({
  params,
}: {
  params: Promise<{ id: string }>; // params এখন Promise টাইপ
}) {
  const { id } = use(params); // use() হুক দিয়ে প্যারামস আনছি
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const handleBooking = () => {
    alert(`Successfully booked: ${service.title}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 bg-white dark:bg-black transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        {service.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
        {service.desc}
      </p>
      <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
        Price: {service.price}
      </p>

      {/* কনফার্ম বুকিং বাটন এখন ডাইনামিক */}
      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-300"
      >
        Confirm Booking
      </button>
    </div>
  );
}

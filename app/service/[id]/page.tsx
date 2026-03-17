"use client";
import { services } from "@/data/services";
import { notFound } from "next/navigation";
import { use } from "react";
import BookingForm from "@/components/BookingForm"; 

export default function ServiceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  
  const priceValue = parseInt(service.price.replace(/[^0-9]/g, "")) || 0;

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 bg-white dark:bg-black transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        {service.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
        {service.desc}
      </p>
      <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
        Price: {service.price} per day
      </p>

      
      <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
        <BookingForm pricePerDay={priceValue} />
      </div>
    </div>
  );
}

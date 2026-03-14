// app/page.tsx
import { services } from "@/data/services";
import Link from "next/link";

export default function Home() {
  return (
    // dark:bg-gray-950 যোগ করা হয়েছে পুরো পেজের ব্যাকগ্রাউন্ডের জন্য
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Banner Section */}
      <section className="bg-blue-600 dark:bg-blue-900 text-white py-20 px-6 text-center transition-colors duration-300">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Quality Care for Your Loved Ones
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Professional care services at your doorstep.
        </p>
        <button className="bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-8 py-3 rounded-full font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          Book a Service
        </button>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              // কার্ডের ব্যাকগ্রাউন্ড লাইট মোডে সাদা এবং ডার্ক মোডে ধূসর
              className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {service.desc}
              </p>

              <Link
                href={`/service/${service.id}`}
                className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

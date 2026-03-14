"use client";

export default function ContactUs() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Have questions or need assistance? Our team is here to help you
            24/7. Feel free to reach out to us through the form or our contact
            details.
          </p>
          <div className="text-gray-600 dark:text-gray-300">
            <p>
              <strong>Email:</strong> support@care.xyz
            </p>
            <p>
              <strong>Phone:</strong> +880 1234-567890
            </p>
            <p>
              <strong>Address:</strong> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

// app/about/page.tsx
export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
        About Care.xyz
      </h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-300">
        <p className="text-lg leading-relaxed">
          <strong>Care.xyz</strong> is a trusted platform dedicated to ensuring
          the highest quality of care for your loved ones. We believe that
          everyone deserves to be treated with dignity and receive the
          professional care they need.
        </p>

        <p className="text-lg leading-relaxed">
          Through our platform, you can easily find experienced and skilled
          caregivers from the comfort of your home. Our services include
          specialized baby care, elderly support, and 24/7 assistance for
          patients in need of medical attention.
        </p>

        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">
            Our Mission
          </h3>
          <p className="leading-relaxed">
            Our mission is to leverage technology to make caregiving services
            accessible, reliable, and convenient for everyone. Every caregiver
            on our platform undergoes a rigorous screening and background
            verification process to ensure your peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
}

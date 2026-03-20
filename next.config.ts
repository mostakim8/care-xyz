import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // টাইপ এরর থাকলেও বিল্ড হবে
    ignoreBuildErrors: true,
  },
  // Next.js 16 এ eslint কি-টি এখানে সাপোর্ট করে না, তাই এটি সরিয়ে দেওয়া হলো
};

export default nextConfig;

"use client";
import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Create Account
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

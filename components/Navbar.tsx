"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 shadow-md transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <h1 className="text-xl font-bold cursor-pointer">Care.xyz</h1>

        {/* Desktop Menu - মাঝখানে আনার জন্য flex-1 এবং justify-center */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            href="/my-bookings"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            My Bookings
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About Us
          </Link>
        </div>

        {/* Login & Theme Toggle (ডান পাশে) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger Button + Theme Toggle (ডান পাশে) */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-center bg-gray-100 dark:bg-gray-800 py-4 transition-all duration-300">
          <Link href="/" className="py-2" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            href="/my-bookings"
            className="py-2"
            onClick={() => setIsOpen(false)}
          >
            My Bookings
          </Link>
          <Link href="/about" className="py-2" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white mx-10 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 shadow-md transition-colors duration-300 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        <Link
          href="/"
          className="text-xl font-bold cursor-pointer text-blue-600 dark:text-blue-400"
        >
          Care.xyz
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>

          
          {user ? (
            <Link
              href="/my-bookings"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              My Bookings
            </Link>
          ) : (
            <Link
              href="/#services"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              All Services
            </Link>
          )}

          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About Us
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 hidden lg:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-center bg-gray-50 dark:bg-gray-800 py-6 rounded-xl">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          {user ? (
            <Link href="/my-bookings" onClick={() => setIsOpen(false)}>
              My Bookings
            </Link>
          ) : (
            <Link href="/#services" onClick={() => setIsOpen(false)}>
              All Services
            </Link>
          )}

          <Link href="/about" onClick={() => setIsOpen(false)}>
            About Us
          </Link>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mx-10">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-block w-full bg-blue-600 text-white py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

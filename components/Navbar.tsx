"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          Care.xyz
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/#services" className="hover:text-blue-600 transition">
            All Services
          </Link>

          {/* ইউজার লগইন থাকলে My Bookings দেখাবে */}
          {!authLoading && user && (
            <Link
              href="/my-bookings"
              className="hover:text-blue-600 transition"
            >
              My Bookings
            </Link>
          )}

          <Link href="/about" className="hover:text-blue-600 transition">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {!authLoading &&
            (user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 hidden lg:block">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
}

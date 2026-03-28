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

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter"
        >
          Care.xyz
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 items-center font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/#services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* Desktop Right Side (Profile Part) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {!authLoading &&
            (user ? (
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl border dark:border-gray-700">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 pl-2 group"
                >
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                      Profile
                    </p>
                    <p className="text-xs font-black truncate max-w-[80px] dark:text-white">
                      {user.displayName || user.email?.split("@")[0]}
                    </p>
                  </div>
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.email}&background=0D8ABC&color=fff`
                    }
                    className="w-10 h-10 rounded-xl border-2 border-white dark:border-gray-900 shadow-sm group-hover:scale-105 transition"
                    alt="User"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white dark:bg-gray-900 p-2 rounded-xl text-red-500 hover:text-red-700 shadow-sm transition hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Logout"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition"
              >
                Login
              </Link>
            ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* --- Mobile Side Drawer --- */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeMenu}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-gray-900 z-[70] transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8 border-b dark:border-gray-800 pb-4">
            <span className="text-xl font-black text-blue-600">Care.xyz</span>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-gray-50 dark:bg-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col space-y-4 font-semibold">
            {user && (
              <Link
                href="/profile"
                onClick={closeMenu}
                className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800"
              >
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.email}`
                  }
                  className="w-12 h-12 rounded-xl border-2 border-white dark:border-gray-800"
                  alt="Profile"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-black truncate">
                    {user.displayName || "User Profile"}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </Link>
            )}

            <Link
              href="/"
              onClick={closeMenu}
              className="p-2 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/#services"
              onClick={closeMenu}
              className="p-2 hover:text-blue-600 transition"
            >
              Services
            </Link>
            <Link
              href="/profile"
              onClick={closeMenu}
              className="p-2 hover:text-blue-600 transition"
            >
              My Profile
            </Link>
            <Link
              href="/my-bookings"
              onClick={closeMenu}
              className="p-2 hover:text-blue-600 transition"
            >
              Booking History
            </Link>

            <div className="pt-4 border-t dark:border-gray-800">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-50 dark:bg-red-900/10 text-red-600 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-2xl block text-center font-bold shadow-lg shadow-blue-100 dark:shadow-none"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

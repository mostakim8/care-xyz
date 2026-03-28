"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const res = await fetch(`/api/users?uid=${currentUser.uid}`);
          const data = await res.json();
          setUserRole(data.role);
        } catch (error) {
          console.error("Error:", error);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      setShowDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navLinkClass = (path: string) =>
    `transition-all duration-200 font-bold text-sm px-2 py-1 cursor-pointer ${
      pathname === path
        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
        : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter cursor-pointer"
          >
            Care.xyz
          </Link>
        </div>

        {/* Center Menu - Large Display */}
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-10">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link href="/#services" className={navLinkClass("/#services")}>
            Services
          </Link>
          {user && (
            <Link href="/my-bookings" className={navLinkClass("/my-bookings")}>
              {userRole === "admin" ? "Booking List" : "My Bookings"}
            </Link>
          )}
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center space-x-5 flex-shrink-0">
          <div className="cursor-pointer">
            <ThemeToggle />
          </div>
          {!authLoading &&
            (user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center focus:outline-none hover:scale-105 transition-transform cursor-pointer"
                >
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.email}&background=0D8ABC&color=fff`
                    }
                    className="w-9 h-9 rounded-full border-2 border-blue-100 dark:border-gray-700 shadow-sm"
                    alt="user"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2">
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                      <p className="text-sm font-black text-gray-900 dark:text-white capitalize truncate">
                        {user.displayName || user.email?.split("@")[0]}
                      </p>
                      <p className="text-[11px] text-blue-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                Login
              </Link>
            ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex items-center space-x-3">
          <div className="cursor-pointer">
            <ThemeToggle />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-2xl p-2 bg-gray-50 dark:bg-gray-800 rounded-xl cursor-pointer"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-white dark:bg-gray-900 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-10 pb-4 border-b dark:border-gray-800">
              <span className="text-xl font-black text-blue-600">Care.xyz</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col space-y-5 font-bold text-gray-800 dark:text-gray-200">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                Home
              </Link>
              <Link
                href="/#services"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                Services
              </Link>
              {user && (
                <Link
                  href="/my-bookings"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  My Bookings
                </Link>
              )}
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                About Us
              </Link>
              {user && (
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  Profile
                </Link>
              )}
              <div className="pt-6 border-t dark:border-gray-800">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-500 w-full text-left cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 cursor-pointer"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

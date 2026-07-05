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
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      } else {
        setUserRole(null);
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

  const navLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `relative text-sm font-medium tracking-wide transition-all duration-300 py-1.5 px-3 rounded-xl cursor-pointer ${
      isActive
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold"
        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/40"
    }`;
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 px-6 py-4 border-b ${
        isScrolled
          ? "bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-gray-200/40 dark:border-gray-800/40 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight cursor-pointer flex items-center group"
          >
            <span className="text-blue-600 dark:text-blue-500 group-hover:scale-105 transition-transform duration-300">
              Care
            </span>
            <span className="text-gray-900 dark:text-white transition-colors duration-300">
              .xyz
            </span>
          </Link>
        </div>

        {/* Center Menu - Pill Shape Floating effect */}
        <div className="hidden lg:flex items-center space-x-2 bg-gray-100/40 dark:bg-gray-900/40 p-1.5 rounded-2xl border border-gray-200/20 dark:border-gray-800/20 backdrop-blur-md">
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
        <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
          <div className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-xl transition-colors">
            <ThemeToggle />
          </div>

          {!authLoading &&
            (user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center focus:outline-none ring-2 ring-gray-200/50 dark:ring-gray-800 hover:ring-blue-500/50 rounded-full p-0.5 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${user.email}&background=2563EB&color=fff&bold=true`
                    }
                    className="w-9 h-9 rounded-full object-cover"
                    alt="user"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800/80 p-2 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="px-3 py-2.5 mb-1 bg-gray-50/50 dark:bg-gray-800/40 rounded-xl border border-gray-100/50 dark:border-gray-800/20">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize truncate max-w-[120px]">
                          {user.displayName || user.email?.split("@")[0]}
                        </p>
                        {userRole && (
                          <span className="text-[9px] tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-lg font-bold uppercase">
                            {userRole}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-xl transition-colors cursor-pointer"
                    >
                      👤 My Profile
                    </Link>

                    <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer"
                    >
                      ➜] Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gray-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-gray-900 dark:hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Login
              </Link>
            ))}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[290px] bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl p-6 shadow-2xl flex flex-col justify-between border-l border-gray-100 dark:border-gray-900 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-900">
                <span className="text-xl font-black text-blue-600">
                  Care.xyz
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-colors cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 font-medium transition-all cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  href="/#services"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 font-medium transition-all cursor-pointer"
                >
                  Services
                </Link>
                {user && (
                  <Link
                    href="/my-bookings"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 font-medium transition-all cursor-pointer"
                  >
                    {userRole === "admin" ? "Booking List" : "My Bookings"}
                  </Link>
                )}
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 font-medium transition-all cursor-pointer"
                >
                  About Us
                </Link>
                {user && (
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 font-medium transition-all cursor-pointer"
                  >
                    Profile
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Footer Button */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-900">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-blue-400 hover:bg-blue-300 text-white py-3 rounded-xl font-semibold shadow-md transition-all cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

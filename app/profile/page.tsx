"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // ১. ইউজারের বেসিক প্রোফাইল ডাটা ফেচ (MongoDB API থেকে)
          const res = await fetch(`/api/users?uid=${user.uid}`);
          if (!res.ok) throw new Error("Failed to fetch profile");
          const userData = await res.json();

          setUserProfile({
            ...userData,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            uid: user.uid,
          });

          // ২. বুকিং হিস্ট্রি রিয়েল-টাইম লিসেনার (Firestore থেকে)
          // এখানে collection(db, "bookings") আপনার Firestore কালেকশনের নাম হতে হবে
          const q = query(
            collection(db, "bookings"),
            where("userId", "==", user.uid),
          );

          const unsubscribeBookings = onSnapshot(
            q,
            (snapshot) => {
              const bookingsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setBookings(bookingsData);
              setLoading(false);
            },
            (err) => {
              console.error("Firestore Error:", err);
              setLoading(false);
            },
          );

          return () => unsubscribeBookings();
        } catch (err) {
          console.error("Profile Load Error:", err);
          setError("Could not load profile data.");
          setLoading(false);
        }
      } else {
        setLoading(false);
        router.push("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen animate-pulse font-bold text-blue-600">
        Loading Your Profile...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* --- Profile Card Section --- */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                userProfile?.photoURL ||
                `https://ui-avatars.com/api/?name=${userProfile?.email}&background=0D8ABC&color=fff`
              }
              alt="Profile"
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900"></div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div>
              <h2 className="text-3xl font-black text-black dark:text-white">
                {userProfile?.displayName || "Care User"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {userProfile?.email}
              </p>
            </div>

            {/* Dynamic Details: Age, Gender, Location */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800 text-center min-w-[90px]">
                <p className="text-[10px] uppercase text-blue-500 font-bold tracking-wider">
                  Age
                </p>
                <p className="font-black dark:text-blue-100">
                  {userProfile?.age || "N/A"}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-xl border border-purple-100 dark:border-purple-800 text-center min-w-[90px]">
                <p className="text-[10px] uppercase text-purple-500 font-bold tracking-wider">
                  Gender
                </p>
                <p className="font-black dark:text-purple-100">
                  {userProfile?.gender || "N/A"}
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-xl border border-orange-100 dark:border-orange-800 text-center min-w-[90px]">
                <p className="text-[10px] uppercase text-orange-500 font-bold tracking-wider">
                  Location
                </p>
                <p className="font-black dark:text-orange-100 truncate max-w-[100px]">
                  {userProfile?.location || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-8 py-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all font-bold border border-red-100 shadow-sm self-center md:self-start"
          >
            Logout
          </button>
        </div>

        {/* --- Booking History Section --- */}
        <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
            <h3 className="text-xl font-bold tracking-tight">
              Booking History
            </h3>
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
              {bookings.length} Bookings
            </span>
          </div>

          <div className="overflow-x-auto">
            {bookings.length > 0 ? (
              <table className="w-full text-left">
                <thead className="text-gray-400 text-[11px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-8 py-4">Service Details</th>
                    <th className="px-8 py-4 text-center">Status</th>
                    <th className="px-8 py-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <p className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                          {booking.serviceName || "Premium Service"}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">
                          Order ID: {booking.id.toUpperCase()}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            booking.status === "succeeded" ||
                            booking.status === "paid" ||
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20"
                          }`}
                        >
                          {booking.status || "Processing"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right font-black text-blue-600 text-lg">
                        ${booking.totalCost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-20 text-center">
                <div className="text-4xl mb-4">empty</div>
                <p className="text-gray-400 font-medium italic">
                  You haven't made any bookings yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

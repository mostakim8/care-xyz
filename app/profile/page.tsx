"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          
          const res = await fetch(`/api/users?uid=${user.uid}`);

          if (!res.ok) throw new Error("Failed to fetch profile");

          const data = await res.json();
          setUserProfile(data);
        } catch (err) {
          setError("Could not load profile data.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("Please login to view your profile.");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading Profile...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          User Profile
        </h2>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Email:</strong> {userProfile?.email}
          </p>
          <p>
            <strong>Age:</strong> {userProfile?.age}
          </p>
          <p>
            <strong>Gender:</strong> {userProfile?.gender}
          </p>
          <p>
            <strong>Location:</strong> {userProfile?.location}
          </p>
        </div>

        <button
          onClick={() =>
            auth.signOut().then(() => (window.location.href = "/login"))
          }
          className="w-full mt-8 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [name, setName] = useState(""); 
  const [nid, setNid] = useState(""); 
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Password validation function/logic
  const validatePassword = (pass: string) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const isLongEnough = pass.length >= 6;
    return hasUpperCase && hasLowerCase && isLongEnough;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert(
        "Password must be 6+ characters, with at least 1 uppercase and 1 lowercase letter.",
      );
      return;
    }

    setLoading(true);
    try {
      // create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Update the user's display name in Firebase Authentication
      await updateProfile(user, { displayName: name });

      // Save additional user data to MongoDB via API
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name,
          nid, 
          contact, 
          email,
          age: Number(age),
          gender,
          location,
          role: "user",
        }),
      });

      if (!res.ok) throw new Error("Failed to save profile data");

      alert("Registration Successful!");
      router.push("/login");
    } catch (error: any) {
      alert("Registration Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* name */}
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />

          {/* email */}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />

          {/* nid no... */}
          <input
            type="text"
            placeholder="NID Number"
            onChange={(e) => setNid(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />

          {/* Contact Number */}
          <input
            type="text"
            placeholder="Contact Number"
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (6+ char, A-Z, a-z)"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              required
            />

            <select
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 text-gray-500"
              required
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 font-bold"
          >
            {loading ? "Processing..." : "Sign Up"}
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

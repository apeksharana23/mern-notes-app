"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const formData = {
      name,
      email,
      phone,
      password,
      confirmPassword,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.status) {
        setError(data.message);
      } else {
        alert("User registered successfully");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        toast.success("User registered successfully");
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full flex-1 mt-8" onSubmit={handleSubmit}>
      <div className="mx-auto max-w-xs flex flex-col gap-4">
        <input
          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="tel"
          placeholder="Enter your phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
        <input
          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <input
          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="mt-5 tracking-wide font-semibold bg-[#5C4033] text-gray-100 w-full py-4 rounded-lg hover:bg-[#A67B6D] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          disabled={loading}
        >
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3">{loading ? "Signing Up..." : "Sign Up"}</span>
        </button>
        <p className="mt-6 text-xs text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#A67B6D] font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
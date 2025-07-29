"use client";

import React, { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { useSetCookie } from 'cookies-next/client';
import { AuthContext } from "@/app/providers/AuthProvider";
import toast from "react-hot-toast";



export default function SignIn() {
    const { setIsLoggedIn, setUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const setCookie = useSetCookie();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = {
            email,
            password,
        };

        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            
            if (response.status === 200) {
                setEmail("");
                setPassword("");
                e.target.reset();
                setError(data.message);
                
                console.log("Sign-in successful, token received:", data?.token);
                setCookie("token", data?.token, {
                    expires: new Date(Date.now() + 60 * 60 * 24 * 7),
                    path: '/',
                });
                setIsLoggedIn(true);
                setUser(data.data); 
                toast.success("Sign-in successful");
                router.push("/dashboard");
            }else{
                console.log(response.status);
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
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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

                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-[#5C4033] text-gray-100 w-full py-4 rounded-lg hover:bg-[#A67B6D] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loading}
                >
                    <span className="ml-3">{loading ? "Signing In..." : "Sign In"}</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                    Don't have an account?{" "}
                    <a href="/sign-up" className="text-[#A67B6D] font-semibold">
                        Sign Up
                    </a>
                </p>
            </div>
        </form>
    );
}
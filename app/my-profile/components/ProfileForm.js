"use client";

    
import React, { useContext, useEffect, useState } from 'react';
import {AuthContext} from '@/app/providers/AuthProvider';

export default function ProfileForm({token}) {
    const [user, setAuthUser] = useState({ name: '', email: '', phone: '' });
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);


    useEffect(() => {
        const fetchUser = async () => {
         console.log("Token:", token);
            try {
                const response = await fetch('/api/me', {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data && data.user) {
                    setAuthUser({ id: data.user._id, name: data.user.name, email: data.user.email, phone: data.user.phone });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } 
        };
        fetchUser();
    }, []);

    const handleSubmissionForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('profile', profile);

        try {
            const res = await fetch("/api/edit-profile", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.status) {
                setUser(data.data);
                alert(data.message);
            } else {
                alert("Error updating profile: " + data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmissionForm}
            className="max-w-md mx-auto space-y-6 "
            encType="multipart/form-data"
        >
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Your Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={user.name}
                    placeholder="John Doe"
                    onChange={(e) => setAuthUser({ ...user, name: e.target.value })}
                    required
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Your Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    placeholder="name@example.com"
                    onChange={(e) => setAuthUser({ ...user, email: e.target.value })}
                    required
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
            </div>
            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                >
                    Your Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={user.phone}
                    placeholder="+1 (123) 456-7890"
                    onChange={(e) => setAuthUser({ ...user, phone: e.target.value })}
                    required
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
            </div>
            <div>
                <label
                    htmlFor="profile"
                    className="block text-sm font-medium text-gray-700"
                >
                    Your Profile Image
                </label>
                <input
                    type="file"
                    id="profile"
                    accept="image/*"
                    onChange={(e) => setProfile(e.target.files[0])}
                    className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors duration-200"
                />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" disabled={loading}>
                    {
                        loading ? (
                            <>
                                Please wait
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 ms-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </>
                        ) : `Update Profile`
                    }
                </button>
        </form>
    );
}
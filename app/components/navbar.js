'use client';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { AuthContext } from '../providers/AuthProvider';
import Image from 'next/image';

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const checkAuth = async () => {
      const token = await getCookie('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteCookie('token');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/signin');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between w-full">

      <ul className="flex items-center space-x-6 text-gray-700">

        {isLoggedIn ? (
          <>
            <li>
              <Link href="/my-profile" className="text-base font-medium hover:text-blue-600 transition-colors duration-200">
                My Profile
              </Link>
            </li>
            <li>
              <a
                href="#"
                onClick={handleLogout}
                className="text-base font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
              >
                Sign Out
              </a>
            </li>
            <li><Link href="/my-profile" className="hover:text-purple-400 flex gap-x-4"><Image src={user && user.profile ? user.profile:'/uploads/dummy-user.png'} alt="" height="30" width="30" className='profileImage' /> {user?.name || 'User'} 
            </Link>
            </li>

            <li>
              <Link href="/dashboard" className="text-base font-medium hover:text-blue-600 transition-colors duration-200">
                Dashboard
              </Link>
            </li>

          </>
        ) : (
          <>
            <li>
              <Link href="/sign-up" className="text-base font-medium text-[#5C4033] transition-colors duration-200">
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                href="/signin"
                className="text-base font-medium text-white  px-4 py-2 rounded-md !bg-[#5C4033] !hover:bg-[#A67B6D] transition-colors duration-200"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/" className="text-base font-medium text-[#5C4033] transition-colors duration-200">
                Home
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
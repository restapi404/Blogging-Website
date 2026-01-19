"use client";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { Typewriter } from "react-simple-typewriter";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-[#4A0000] dark:bg-[#08081C] text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center shadow transition-colors duration-300">
      <div>
        <div className="text-2xl font-bold">
          <Link href="/">Blog Showcase</Link>
        </div>
        <div className="text-[#EDE587] text-sm mt-1">
          <Typewriter
            words={['Discover, Learn, Create', 'Read Amazing Blogs.', 'Inspire the Community']}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1200}
          />
        </div>
      </div>
      <div className="space-x-4 mt-2 md:mt-0 flex flex-wrap items-center">
        <Link href="/" className="hover:text-yellow-400 transition-colors duration-200">Home</Link>
        <Link href="/blogs" className="hover:text-yellow-400 transition-colors duration-200">Blogs</Link>
        
        {!loading && (
          user ? (
            <>
              <Link href="/dashboard" className="hover:text-yellow-400 transition-colors duration-200">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border border-white px-3 py-1 rounded hover:bg-[#6B0000] dark:hover:bg-[#1a1a2e] transition-colors duration-200"
              >
                Logout ({user.name})
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-yellow-400 transition-colors duration-200">
                Login
              </Link>
              <Link href="/auth/register" className="hover:text-yellow-400 transition-colors duration-200">
                Sign Up
              </Link>
            </>
          )
        )}
        <DarkModeToggle/>
      </div>
    </nav>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/edufinder-logo.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/");
  };

 
  

   const links = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/colleges" >Colleges</Link></li>
      <li><Link href="/admission" >Admission</Link></li>
      <li><Link href="/my-college" >My College</Link></li>
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur
      ${scrolled ? "bg-base-200 shadow" : "bg-white/40"}
      px-4`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 `} fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50 ">
            {links}
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost normal-case text-xl  items-center gap-2 hidden sm:flex">
          <Image src={logo} alt="EduFinder Logo" width={60} height={60} />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold">{links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end space-x-2">
        {user ? (
          <>
            <Link href="/profile" className={`btn btn-sm btn-outline btn-primary`}>
              {user.displayName || "Profile"}
            </Link>
            <button onClick={handleLogout} className={`btn btn-sm btn-outline btn-primary`}>Logout</button>
          </>
        ) : (
          <Link href="/login" className={`btn btn-sm `}>Login</Link>
        )}
      </div>
    </div>
  );
}

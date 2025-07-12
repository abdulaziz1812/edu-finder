"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import SocialLogin from "../components/SocialLogin";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await loginUser(email, password);
      router.push("/");
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Swal.fire("Input Required", "Please enter your email above first.", "warning");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire("Sent!", "Password reset email sent successfully.", "success");
    } catch (err) {
      Swal.fire("Oops!", err.message, "error");
    }
  };

  const handleTestLogin = async () => {
    const testEmail = "admin@edufinder.com";
    const testPassword = "123456";

    setEmail(testEmail);
    setPassword(testPassword);

    try {
      await loginUser(testEmail, testPassword);
      Swal.fire("Success", "Logged in as Test Admin!", "success");
      router.push("/");
    } catch (err) {
      Swal.fire("Oops!", err.message || "Test login failed", "error");
    }
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-base-100 px-4">
      <motion.div
        className="max-w-md w-full p-8 bg-white shadow-xl rounded-xl space-y-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back!
        </motion.h2>
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Login to continue your journey with EduFinder.
        </motion.p>
        {msg && <p className="text-red-500 text-center text-sm">{msg}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn bg-white text-black border-gray-300 flex items-center gap-2 justify-center w-full hover:shadow-md transition"
          >
            <svg
              aria-label="Email icon"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            Login with Email
          </button>
        </form>
        <SocialLogin />

        <div className="text-center text-sm space-y-1">
          <p>
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 underline">
              Register
            </a>
          </p>
          <p>
            Forgot password?{" "}
            <button
              onClick={handlePasswordReset}
              className="text-blue-600 underline"
              type="button"
            >
              Reset
            </button>
          </p>
          <div className="text-center">
          <button
            type="button"
            className="btn btn-outline w-full btn-dash mt-2"
            onClick={handleTestLogin}
          >
             Test Login 
          </button>
        </div>
        </div>
      </motion.div>
    </div>
  );
}

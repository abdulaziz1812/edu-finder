"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import SocialLogin from "../components/SocialLogin";

export default function RegisterPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];

    try {
      const imageForm = new FormData();
      imageForm.append("image", imageFile);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: imageForm,
        }
      );

      const imgData = await imgRes.json();
      const photoURL = imgData?.data?.url;
      if (!photoURL) throw new Error("Image upload failed");

      const userCredential = await registerUser(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL,
      });

      const userInfo = {
        name,
        email,
        photo: photoURL,
        createdAt: new Date(),
      };

      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "You can now login.",
        confirmButtonColor: "#3b82f6",
      }).then(() => {
        router.push("/login");
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.message || "Something went wrong.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <motion.div
        className="max-w-md w-full p-8 bg-white shadow-xl rounded-xl space-y-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300  "
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
          Create an Account
        </motion.h2>

        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Join EduFinder and explore your future college.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            required
          />

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <SocialLogin />
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

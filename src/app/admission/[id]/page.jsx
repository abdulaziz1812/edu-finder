"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdmissionForm() {
  const { id } = useParams();
  const router = useRouter();
  const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const [userEmail, setUserEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        setUserEmail(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchCollegeName() {
      try {
        const res = await fetch(`/api/colleges/${id}`);
        const data = await res.json();
        setCollegeName(data?.name || "");
      } catch (error) {
        console.error("Failed to fetch college name:", error);
      }
    }
    if (id) fetchCollegeName();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const imageFile = formData.get("image");
    const imgbbForm = new FormData();
    imgbbForm.append("image", imageFile);

    const imgbbRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      {
        method: "POST",
        body: imgbbForm,
      }
    );

    const imgbbData = await imgbbRes.json();
    const imageUrl = imgbbData?.data?.url;

    if (!imageUrl) {
      Swal.fire("Error", "Image upload failed!", "error");
      return;
    }

    const finalData = {
      name: formData.get("name"),
      subject: formData.get("subject"),
      email: userEmail,
      phone: formData.get("phone"),
      address: formData.get("address"),
      dob: formData.get("dob"),
      image: imageUrl,
      collegeId: id,
      collegeName,
    };

    const res = await fetch("/api/admissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (res.ok) {
      Swal.fire("Success", "Admission submitted!", "success");
      router.push("/my-college");
    } else {
      Swal.fire("Error", "Failed to submit admission.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 mt-10 py-10">
      <div className="mb-6">
        <Link
          href="/admission"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Admission Page
        </Link>
      </div>

      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-primary">Admission Form</h2>
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Please fill out the form carefully to complete your admission to{" "}
          <strong>{collegeName || "the selected college"}</strong>.
        </motion.p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Candidate Name</label>
          <input name="name" className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            name="subject"
            className="input input-bordered w-full"
            
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            name="phone"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            name="address"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {userEmail && (
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {userEmail}
          </p>
        )}

        {collegeName && (
          <p className="text-sm text-gray-600">
            <strong>College:</strong> {collegeName}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Submit Admission
        </button>
      </form>
    </div>
  );
}

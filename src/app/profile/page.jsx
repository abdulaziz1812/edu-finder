"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function Spinner() {
  return (
    <div className="flex justify-center items-center py-20 min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
    photoURL: "",
  });
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const res = await fetch(`/api/users/${currentUser.uid}`);
          const data = await res.json();
          setForm({
            name: data.name || "",
            email: data.email || "",
            university: data.university || "",
            address: data.address || "",
            photoURL: data.photoURL || currentUser.photoURL || "",
          });
        } catch (err) {
          console.error("Failed to load user profile:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoURL = form.photoURL;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          photoURL = data.data.url;
        } else {
          Swal.fire("Oops!", "Image upload failed.", "error");
          return;
        }
      } catch {
        Swal.fire("Oops!", "Image upload error.", "error");
        return;
      }
    }

    try {
      const res = await fetch(`/api/users/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, photoURL }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      document.getElementById("edit_modal").close();
      Swal.fire("Success", "Profile updated!", "success");

      setForm((prev) => ({ ...prev, photoURL }));
      setPreview("");
      setSelectedFile(null);
    } catch (error) {
      Swal.fire("Oops!", error.message || "Update failed", "error");
    }
  };

  if (loading) return <Spinner />;

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        Please log in to view your profile.
      </p>
    );

  return (
    <section className="max-w-xl mx-auto px-4 py-12 mt-10">
      <motion.h1
        className="text-3xl font-bold text-center mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Profile
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        View and update your personal information
      </motion.p>

      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={preview || form.photoURL || "/default-profile.png"}
          alt="Profile"
          className="mx-auto w-28 h-28 rounded-full border mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold mb-2">
          {form.name || "No Name"}
        </h2>
        <p className="mb-1">
          <strong>Email:</strong> {form.email || "N/A"}
        </p>
        <p className="mb-1">
          <strong>University:</strong> {form.university || "N/A"}
        </p>
        <p className="mb-4">
          <strong>Address:</strong> {form.address || "N/A"}
        </p>

        <button
          className="btn btn-outline btn-primary"
          onClick={() => document.getElementById("edit_modal").showModal()}
        >
          Edit Profile
        </button>
      </motion.div>

      {/* Modal */}
      <dialog id="edit_modal" className="modal">
        <form
          onSubmit={handleSubmit}
          className="modal-box space-y-4"
          method="dialog"
        >
          <h3 className="text-lg font-bold">Edit Profile</h3>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="university"
            placeholder="University"
            value={form.university}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          <div className="modal-action flex justify-between">
            <button type="submit" className="btn btn-primary w-1/2">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary w-1/2"
              onClick={() => {
                setPreview("");
                setSelectedFile(null);
                document.getElementById("edit_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
}

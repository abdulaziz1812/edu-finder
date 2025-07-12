"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function Spinner() {
  return (
    <div className="flex justify-center items-center py-20 min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

export default function MyCollegePage() {
  const [user, setUser] = useState(null);
  const [admissions, setAdmissions] = useState([]);
  const [reviews, setReviews] = useState({});
  const [reviewInputs, setReviewInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        const email = currentUser.email;

        try {
          const admissionRes = await fetch(`/api/admissions?email=${email}`);
          const admissionData = admissionRes.ok ? await admissionRes.json() : [];
          setAdmissions(admissionData);

          const reviewRes = await fetch(`/api/reviews?email=${email}`);
          const reviewData = reviewRes.ok ? await reviewRes.json() : [];

          const mapped = {};
          reviewData.forEach((r) => {
            mapped[r.collegeId] = {
              review: r.review,
              rating: r.rating?.toString() || "5",
              name: r.name || email,
            };
          });

          setReviews(mapped);
          setReviewInputs(mapped);
        } catch (error) {
          console.error("Failed to load data:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleReviewChange = (collegeId, field, value) => {
    setReviewInputs((prev) => ({
      ...prev,
      [collegeId]: {
        ...prev[collegeId],
        [field]: value,
      },
    }));
  };

  const submitReview = async (collegeId) => {
    const input = reviewInputs[collegeId] || {};
    const review = input.review?.trim();
    const rating = parseInt(input.rating) || 5;

    if (!review) {
      Swal.fire("Error", "Review cannot be empty.", "warning");
      return;
    }

    const admit = admissions.find((a) => a.collegeId === collegeId);
    const collegeName = admit?.collegeName || admit?.name || "";

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        collegeId,
        collegeName,
        review,
        rating,
        name: user.displayName || user.email,
        photo: user.photoURL || null,
      }),
    });

    if (res.ok) {
      Swal.fire("Success", "Review submitted!", "success");
      setReviews((prev) => ({
        ...prev,
        [collegeId]: {
          review,
          rating: rating.toString(),
          name: user.displayName || user.email,
        },
      }));
    } else {
      Swal.fire("Error", "Failed to submit review.", "error");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <motion.h1
        className="text-3xl font-bold mb-3 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My College
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        View your admission and submit a review about your experience.
      </motion.p>

      {admissions.length === 0 && (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          No admissions found.
        </motion.p>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {admissions.map((admit, index) => (
          <motion.div
            key={admit._id}
            className="bg-white shadow p-4 rounded border border-gray-200 mb-6 hover:shadow-xl hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <img
                src={admit.image}
                alt="Candidate"
                className="w-24 h-24 rounded border object-cover"
              />
              <div>
                <p><strong>Name:</strong> {admit.name}</p>
                <p><strong>Subject:</strong> {admit.subject}</p>
                <p><strong>College:</strong> {admit.collegeName || admit.name}</p>
              </div>
            </div>

            <div className="mt-4">
              {reviews[admit.collegeId]?.name && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Reviewed by:</strong> {reviews[admit.collegeId].name}
                </p>
              )}

              <label className="block font-semibold mb-1">Your Review:</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="3"
                value={reviewInputs[admit.collegeId]?.review || ""}
                onChange={(e) =>
                  handleReviewChange(admit.collegeId, "review", e.target.value)
                }
                placeholder="Write your review here..."
              />

              <label className="block font-semibold mt-3 mb-1">Rating (1–5):</label>
              <select
                className="select select-bordered w-full max-w-xs"
                value={reviewInputs[admit.collegeId]?.rating || "5"}
                onChange={(e) =>
                  handleReviewChange(admit.collegeId, "rating", e.target.value)
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <div className="flex justify-end mt-4">
                <button
                  className="btn btn-primary btn-outline"
                  onClick={() => submitReview(admit.collegeId)}
                >
                  {reviews[admit.collegeId] ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

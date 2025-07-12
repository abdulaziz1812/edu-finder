"use client";

import React, { useEffect, useState } from "react";

// ⭐ Star component to show rating stars
function Stars({ count }) {
  return (
    <div className="flex space-x-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? "fill-current" : "text-gray-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.785.57-1.84-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewSection({ collegeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      if (!collegeId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/reviews?collegeId=${collegeId}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [collegeId]);

  return (
    <section className="py-12  mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold  mb-8 text-center">
          College Reviews & Feedback
        </h2>

        {loading && (
          <div className="text-center text-gray-500">
            <span className="loading loading-spinner loading-xl min-h-screen"></span>
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}

        {!loading && reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt={review.name || review.email}
                        className="w-10 h-10 rounded-full border object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        ?
                      </div>
                    )}
                    <h3 className="font-semibold text-lg">
                      {review.name || review.email}
                    </h3>
                  </div>
                  <Stars count={review.rating || 0} />
                </div>

                <p className="text-gray-700">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

export default function HomepageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviewsAndColleges() {
      try {
        const [reviewsRes, collegesRes] = await Promise.all([
          fetch("/api/reviews"),
          fetch("/api/colleges"),
        ]);

        const [reviewData, collegeData] = await Promise.all([
          reviewsRes.json(),
          collegesRes.json(),
        ]);

        const mergedReviews = reviewData.map((review) => {
          const college = collegeData.find(
            (c) => c._id === review.collegeId || c._id?.$oid === review.collegeId
          );
          return {
            ...review,
            collegeImage: college?.image || null,
          };
        });

        setReviews(mergedReviews);
      } catch (err) {
        console.error("Error loading reviews or colleges:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviewsAndColleges();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (reviews.length === 0)
    return <p className="text-center text-gray-500">No reviews yet.</p>;

  return (
    <section id="reviews" className="py-12  mt-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-gray-600 max-w-md">
              Hear from students who’ve experienced our colleges firsthand. Reviews are collected after admission and reflect real feedback.
            </p>
          </div>

          {/* Right */}
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="w-full shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="bg-white p-6 rounded-lg  border border-gray-200  h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {review.photo ? (
                        <img
                          src={review.photo}
                          alt={review.name || review.email}
                          className="w-10 h-10 rounded-full object-cover border"
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

                  <p className="text-gray-700 mb-3">{review.review}</p>

                  {review.collegeImage && (
                    <div className="flex items-center space-x-3 mt-4">
                      <img
                        src={review.collegeImage}
                        alt={review.collegeName}
                        className="w-12 h-12 rounded object-cover border border-gray-200"
                      />
                      <p className="text-sm text-gray-500">{review.collegeName}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
